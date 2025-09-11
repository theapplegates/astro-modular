import type { Post, WikilinkMatch } from '@/types';
import { visit } from 'unist-util-visit';

// Remark plugin for processing wikilinks
export function remarkWikilinks() {
  return function transformer(tree: any, file: any) {
    const nodesToReplace: Array<{ parent: any; index: number; newChildren: any[] }> = [];

    visit(tree, 'text', (node: any, index: any, parent: any) => {
      if (!node.value || typeof node.value !== 'string') {
        return;
      }

      // Skip wikilink processing if we're inside a code block
      if (isInsideCodeBlock(parent, tree)) {
        return;
      }

      // Process both link wikilinks [[...]] and image wikilinks ![[...]]
      const wikilinkRegex = /!?\[\[([^\]]+)\]\]/g;
      let match;
      const newChildren: any[] = [];
      let lastIndex = 0;
      let hasWikilinks = false;
      

      while ((match = wikilinkRegex.exec(node.value)) !== null) {
        hasWikilinks = true;
        const [fullMatch, content] = match;
        const isImageWikilink = fullMatch.startsWith('!');
        const [link, displayText] = content.includes('|')
          ? content.split('|', 2)
          : [content, null]; // null means we'll resolve it later

        // Add text before the wikilink
        if (match.index > lastIndex) {
          newChildren.push({
            type: 'text',
            value: node.value.slice(lastIndex, match.index)
          });
        }

        const linkText = link.trim();
        const finalDisplayText = displayText ? displayText.trim() : linkText;

        if (isImageWikilink) {
          // Process image wikilink - convert to markdown image syntax
          // Use the image path as-is (Obsidian doesn't use ./ by default)
          const imagePath = linkText;
          const altText = displayText || linkText;
          
          // Create a proper image node that Astro can process
          newChildren.push({
            type: 'image',
            url: imagePath,
            alt: altText,
            title: null,
            data: {
              hName: 'img',
              hProperties: {
                src: imagePath,
                alt: altText
              }
            }
          });
        } else {
          // Process link wikilink
          const slugifiedLink = createSlugFromTitle(linkText);

          // Add the wikilink as a link node
          // We'll use the link text as placeholder - the actual resolution happens in PostLayout
          newChildren.push({
            type: 'link',
            url: `/posts/${slugifiedLink}`,
            title: null,
            data: {
              hName: 'a',
              hProperties: {
                className: ['wikilink'],
                'data-wikilink': link.trim(),
                'data-display-override': displayText
              }
            },
            children: [{
              type: 'text',
              value: displayText || link.trim()
            }]
          });
        }

        lastIndex = wikilinkRegex.lastIndex;
      }

      // Add remaining text
      if (lastIndex < node.value.length) {
        newChildren.push({
          type: 'text',
          value: node.value.slice(lastIndex)
        });
      }

      if (hasWikilinks && parent && parent.children) {
        nodesToReplace.push({
          parent,
          index,
          newChildren
        });
      }
    });

    // Process existing link nodes to add wikilink data attributes for internal links
    visit(tree, 'link', (node: any) => {
      if (node.url && isInternalLink(node.url)) {
        const linkText = extractLinkTextFromUrl(node.url);
        if (linkText) {
          // Add wikilink data attributes to make it work with linked mentions
          if (!node.data) {
            node.data = {};
          }
          if (!node.data.hProperties) {
            node.data.hProperties = {};
          }

          // Add wikilink class and data attributes
          const existingClasses = node.data.hProperties.className || [];
          node.data.hProperties.className = Array.isArray(existingClasses)
            ? [...existingClasses, 'wikilink']
            : [existingClasses, 'wikilink'].filter(Boolean);

          node.data.hProperties['data-wikilink'] = linkText;
          // For standard markdown links, we don't have a display override
          node.data.hProperties['data-display-override'] = null;
        }
      }
    });

    // Replace nodes with wikilinks
    nodesToReplace.reverse().forEach(({ parent, index, newChildren }) => {
      if (parent && parent.children && Array.isArray(parent.children)) {
        parent.children.splice(index, 1, ...newChildren);
      }
    });
  };
}

// Create slug from title for wikilink resolution
function createSlugFromTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Extract wikilinks and standard markdown links from content
export function extractWikilinks(content: string): WikilinkMatch[] {
  const matches: WikilinkMatch[] = [];

  // Extract wikilinks [[...]] and image wikilinks ![[...]]
  const wikilinkRegex = /!?\[\[([^\]]+)\]\]/g;
  let wikilinkMatch;

  while ((wikilinkMatch = wikilinkRegex.exec(content)) !== null) {
    const [fullMatch, linkContent] = wikilinkMatch;
    const isImageWikilink = fullMatch.startsWith('!');

    // Skip if wikilink is inside backticks (code)
    if (isWikilinkInCode(content, wikilinkMatch.index)) {
      continue;
    }

    // Only process link wikilinks for linked mentions, not image wikilinks
    if (!isImageWikilink) {
      const [link, displayText] = linkContent.includes('|')
        ? linkContent.split('|', 2)
        : [linkContent, linkContent];

      matches.push({
        link: link.trim(),
        display: displayText.trim(),
        slug: createSlugFromTitle(link.trim())
      });
    }
  }

  // Extract standard markdown links [text](url) that point to internal posts
  const markdownLinkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  let markdownMatch;

  while ((markdownMatch = markdownLinkRegex.exec(content)) !== null) {
    const [fullMatch, displayText, url] = markdownMatch;

    // Skip if markdown link is inside backticks (code)
    if (isWikilinkInCode(content, markdownMatch.index)) {
      continue;
    }

    // Check if this is an internal link (relative path or pointing to a post)
    if (isInternalLink(url)) {
      const linkText = extractLinkTextFromUrl(url);
      if (linkText) {
        matches.push({
          link: linkText,
          display: displayText.trim(),
          slug: createSlugFromTitle(linkText)
        });
      }
    }
  }

  return matches;
}

// Find linked mentions (backlinks) for a post
export function findLinkedMentions(posts: Post[], targetSlug: string) {
  const mentions = posts
    .filter(post => post.slug !== targetSlug)
    .map(post => {
      const wikilinks = extractWikilinks(post.body);
      const matchingLinks = wikilinks.filter(link => link.slug === targetSlug);

      if (matchingLinks.length > 0) {
        return {
          title: post.data.title,
          slug: post.slug,
          excerpt: createExcerptAroundWikilink(post.body, matchingLinks[0].link)
        };
      }
      return null;
    })
    .filter(Boolean);

  return mentions;
}

// Create excerpt around wikilink for context
function createExcerptAroundWikilink(content: string, linkText: string): string {
  // Remove frontmatter
  const withoutFrontmatter = content.replace(/^---\n[\s\S]*?\n---\n/, '');

  // Try to find wikilink pattern first
  const wikilinkPattern = `\\[\\[${linkText}[^\\]]*\\]\\]`;
  const wikilinkRegex = new RegExp(wikilinkPattern, 'i');

  let match;
  let searchStart = 0;

  // Find the wikilink that's not in code
  while ((match = wikilinkRegex.exec(withoutFrontmatter.slice(searchStart))) !== null) {
    const actualIndex = searchStart + match.index!;

    // Check if this wikilink is inside backticks
    if (!isWikilinkInCode(withoutFrontmatter, actualIndex)) {
      return extractExcerptAtPosition(withoutFrontmatter, actualIndex, match[0].length);
    }

    searchStart = actualIndex + match[0].length;
    wikilinkRegex.lastIndex = 0; // Reset regex for next search
  }

  // If no wikilink found, try to find standard markdown links that point to this linkText
  const markdownLinkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  let markdownMatch;

  while ((markdownMatch = markdownLinkRegex.exec(withoutFrontmatter)) !== null) {
    const [fullMatch, displayText, url] = markdownMatch;

    // Check if this markdown link is inside backticks
    if (!isWikilinkInCode(withoutFrontmatter, markdownMatch.index)) {
      // Check if this URL points to our target linkText
      if (isInternalLink(url)) {
        const urlLinkText = extractLinkTextFromUrl(url);
        if (urlLinkText === linkText) {
          return extractExcerptAtPosition(withoutFrontmatter, markdownMatch.index, fullMatch.length);
        }
      }
    }
  }

  return '';
}

// Helper function to extract excerpt at a specific position
function extractExcerptAtPosition(content: string, position: number, linkLength: number): string {
  const contextLength = 100;

  // Get context around the match
  const start = Math.max(0, position - contextLength);
  const end = Math.min(content.length, position + linkLength + contextLength);

  let excerpt = content.slice(start, end);

  // Clean up excerpt
  excerpt = excerpt
    .replace(/^\S*\s*/, '') // Remove partial word at start
    .replace(/\s*\S*$/, '') // Remove partial word at end
    .replace(/\n+/g, ' ') // Replace newlines with spaces
    .trim();

  return excerpt;
}

// Resolve wikilink to actual post
export function resolveWikilink(posts: Post[], linkText: string): Post | null {
  const targetSlug = createSlugFromTitle(linkText);

  // First try exact slug match
  let post = posts.find(p => p.slug === targetSlug);

  // If not found, try title match
  if (!post) {
    post = posts.find(p =>
      createSlugFromTitle(p.data.title) === targetSlug
    );
  }

  return post || null;
}

// Validate wikilinks in content
export function validateWikilinks(posts: Post[], content: string): {
  valid: WikilinkMatch[];
  invalid: WikilinkMatch[];
} {
  const wikilinks = extractWikilinks(content);
  const valid: WikilinkMatch[] = [];
  const invalid: WikilinkMatch[] = [];

  wikilinks.forEach(wikilink => {
    const resolved = resolveWikilink(posts, wikilink.link);
    if (resolved) {
      valid.push(wikilink);
    } else {
      invalid.push(wikilink);
    }
  });

  return { valid, invalid };
}

// Helper function to check if a node is inside a code block
function isInsideCodeBlock(parent: any, tree: any): boolean {
  // Check if the immediate parent is a code-related node
  if (!parent) return false;

  // Check for inline code or code blocks
  if (parent.type === 'inlineCode' || parent.type === 'code') {
    return true;
  }

  // Walk up the AST to check for code block ancestors
  let currentNode = parent;
  while (currentNode) {
    if (currentNode.type === 'inlineCode' || currentNode.type === 'code') {
      return true;
    }
    // Try to find the parent node in the tree (simplified check)
    currentNode = currentNode.parent;
  }

  return false;
}

// Helper function to check if a wikilink is inside backticks in raw content
function isWikilinkInCode(content: string, wikilinkIndex: number): boolean {
  // Find all backtick pairs in the content
  const backtickRegex = /`([^`]*)`/g;
  let match;

  while ((match = backtickRegex.exec(content)) !== null) {
    const codeStart = match.index;
    const codeEnd = match.index + match[0].length;

    // Check if the wikilink is inside this code block
    if (wikilinkIndex >= codeStart && wikilinkIndex < codeEnd) {
      return true;
    }
  }

  return false;
}

// Helper function to check if a URL is an internal link
function isInternalLink(url: string): boolean {
  // Remove any leading/trailing whitespace
  url = url.trim();

  // Skip external URLs (http/https)
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return false;
  }

  // Skip email links
  if (url.startsWith('mailto:')) {
    return false;
  }

  // Skip anchors only
  if (url.startsWith('#')) {
    return false;
  }

  // Check if it's a post link (ends with .md or is a slug)
  return url.endsWith('.md') || url.startsWith('/posts/') || !url.includes('/');
}

// Helper function to extract link text from URL for internal links
function extractLinkTextFromUrl(url: string): string | null {
  url = url.trim();

  // Handle .md files
  if (url.endsWith('.md')) {
    return url.replace(/\.md$/, '');
  }

  // Handle /posts/ URLs
  if (url.startsWith('/posts/')) {
    return url.replace('/posts/', '');
  }

  // If it's just a slug (no slashes), use it directly
  if (!url.includes('/')) {
    return url;
  }

  return null;
}

// Process HTML content to resolve wikilink display text with post titles
export function processWikilinksInHTML(posts: Post[], html: string): string {
  // Just return the HTML unchanged - let client-side handle all display text logic
  return html;
}

// Custom remark plugin to handle folder-based post images
export function remarkFolderImages() {
  return function transformer(tree: any, file: any) {
    visit(tree, 'image', (node: any) => {
      // Check if this is a folder-based post by looking at the file path
      const isFolderPost = file.path && file.path.includes('/posts/') && file.path.endsWith('/index.md');
      
      if (isFolderPost && node.url && !node.url.startsWith('/') && !node.url.startsWith('http')) {
        // Extract the post slug from the file path
        const pathParts = file.path.split('/');
        const postsIndex = pathParts.indexOf('posts');
        const postSlug = pathParts[postsIndex + 1];
        
        // Handle both relative paths and subdirectory paths
        let imagePath = node.url;
        
        // Remove leading './' if present
        if (imagePath.startsWith('./')) {
          imagePath = imagePath.slice(2);
        }
        
        // Update the image URL to point to the correct folder (preserving subdirectory structure)
        node.url = `/posts/${postSlug}/${imagePath}`;
        
        // Also update the hProperties if they exist (for wikilink images)
        if (node.data && node.data.hProperties) {
          node.data.hProperties.src = node.url;
        }
      }
    });
  };
}
