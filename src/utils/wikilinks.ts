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

      const wikilinkRegex = /\[\[([^\]]+)\]\]/g;
      let match;
      const newChildren: any[] = [];
      let lastIndex = 0;
      let hasWikilinks = false;

      while ((match = wikilinkRegex.exec(node.value)) !== null) {
        hasWikilinks = true;
        const [fullMatch, content] = match;
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

// Extract wikilinks from content
export function extractWikilinks(content: string): WikilinkMatch[] {
  const wikilinkRegex = /\[\[([^\]]+)\]\]/g;
  const matches: WikilinkMatch[] = [];
  let match;

  while ((match = wikilinkRegex.exec(content)) !== null) {
    const [, content] = match;
    const [link, displayText] = content.includes('|')
      ? content.split('|', 2)
      : [content, content];

    matches.push({
      link: link.trim(),
      display: displayText.trim(),
      slug: createSlugFromTitle(link.trim())
    });
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
  const wikilinkPattern = `\\[\\[${linkText}[^\\]]*\\]\\]`;
  const regex = new RegExp(wikilinkPattern, 'i');

  // Remove frontmatter
  const withoutFrontmatter = content.replace(/^---\n[\s\S]*?\n---\n/, '');

  const match = withoutFrontmatter.match(regex);
  if (!match) return '';

  const matchIndex = match.index || 0;
  const contextLength = 100;

  // Get context around the match
  const start = Math.max(0, matchIndex - contextLength);
  const end = Math.min(withoutFrontmatter.length, matchIndex + match[0].length + contextLength);

  let excerpt = withoutFrontmatter.slice(start, end);

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

// Process HTML content to resolve wikilink display text with post titles
export function processWikilinksInHTML(posts: Post[], html: string): string {
  // Find all wikilink elements and update their display text
  return html.replace(
    /<a[^>]*class="[^"]*wikilink[^"]*"[^>]*data-wikilink="([^"]*)"[^>]*data-display-override="([^"]*)"[^>]*>([^<]*)<\/a>/g,
    (match, linkText, displayOverride, currentDisplay) => {
      const resolved = resolveWikilink(posts, linkText);

      if (resolved) {
        // Use display override if provided, otherwise use the post title
        const finalDisplay = displayOverride && displayOverride !== 'null'
          ? displayOverride
          : resolved.data.title;

        return match.replace(`>${currentDisplay}<`, `>${finalDisplay}<`);
      } else {
        // Broken link - keep original display but mark as broken
        return match.replace('class="', 'class="wikilink-broken ');
      }
    }
  );
}