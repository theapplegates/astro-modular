import type { Post, PostData, ReadingTime, Heading } from '@/types';
import { siteConfig } from '@/config';

// Process markdown content and extract data
export function processMarkdown(content: string): {
  excerpt: string;
  wordCount: number;
  hasMore: boolean;
} {
  // Remove frontmatter
  const withoutFrontmatter = content.replace(/^---\n[\s\S]*?\n---\n/, '');
  
  // Remove markdown syntax for word counting and excerpt
  const plainText = withoutFrontmatter
    .replace(/!\[.*?\]\(.*?\)/g, '') // Images
    .replace(/\[.*?\]\(.*?\)/g, '$1') // Links
    .replace(/`{1,3}.*?`{1,3}/gs, '') // Code
    .replace(/#{1,6}\s+/g, '') // Headers
    .replace(/[*_~`]/g, '') // Emphasis
    .replace(/\n+/g, ' ') // Line breaks
    .trim();

  const words = plainText.split(/\s+/).filter(word => word.length > 0);
  const wordCount = words.length;
  
  // Create excerpt (first 150 words or until first heading)
  const excerptWords = words.slice(0, 150);
  const excerpt = excerptWords.join(' ');
  const hasMore = wordCount > 150;

  return {
    excerpt: hasMore ? excerpt + '...' : excerpt,
    wordCount,
    hasMore
  };
}

// Calculate reading time manually
export function calculateReadingTime(content: string): ReadingTime {
  // Remove frontmatter and markdown syntax for accurate word counting
  const plainText = content
    .replace(/^---\n[\s\S]*?\n---\n/, '') // Remove frontmatter
    .replace(/!\[.*?\]\(.*?\)/g, '') // Images
    .replace(/\[.*?\]\(.*?\)/g, '$1') // Links
    .replace(/`{1,3}.*?`{1,3}/gs, '') // Code blocks
    .replace(/#{1,6}\s+/g, '') // Headers
    .replace(/[*_~`]/g, '') // Emphasis
    .replace(/\n+/g, ' ') // Line breaks
    .trim();

  const words = plainText.split(/\s+/).filter(word => word.length > 0);
  const wordCount = words.length;
  
  // Average reading speed is 200-250 words per minute, using 225
  const wordsPerMinute = 225;
  const minutes = Math.max(1, Math.ceil(wordCount / wordsPerMinute));
  
  return {
    text: `${minutes} min read`,
    minutes: minutes,
    time: minutes * 60 * 1000, // in milliseconds
    words: wordCount
  };
}

// Extract reading time from remark plugin or calculate manually
export function getReadingTime(remarkData: any, content?: string): ReadingTime | null {
  // Try to get from remark plugin first
  if (remarkData?.readingTime) {
    return {
      text: remarkData.readingTime.text || `${Math.ceil(remarkData.readingTime.minutes || 1)} min read`,
      minutes: remarkData.readingTime.minutes || 1,
      time: remarkData.readingTime.time || 60000,
      words: remarkData.readingTime.words || 200
    };
  }
  
  // Fallback to manual calculation if content is provided
  if (content) {
    return calculateReadingTime(content);
  }
  
  return null;
}



// Generate table of contents from headings
export function generateTOC(headings: Heading[]): Heading[] {
  return headings.filter(heading => heading.depth >= 2 && heading.depth <= 4);
}

// Process post data for display
export async function processPost(post: Post) {
  const { Content, headings, remarkPluginFrontmatter } = await post.render();
  const { excerpt, wordCount, hasMore } = processMarkdown(post.body);
  const readingTime = getReadingTime(remarkPluginFrontmatter);
  const toc = generateTOC(headings);

  return {
    ...post,
    Content,
    headings,
    excerpt,
    wordCount,
    hasMore,
    readingTime,
    toc,
    remarkPluginFrontmatter
  };
}

// Format date for display
export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// Format date for ISO string
export function formatDateISO(date: Date): string {
  return date.toISOString();
}

// Check if a post should be shown in production
export function shouldShowPost(post: Post, isDev: boolean = false): boolean {
  const { draft, title, date } = post.data;
  
  // In development, show all posts (even drafts)
  if (isDev) {
    return true;
  }
  
  // In production, hide drafts and posts without required fields
  if (draft || !title || !date) {
    return false;
  }
  
  return true;
}

// Sort posts by date (newest first)
export function sortPostsByDate<T extends { data: { date: Date } }>(posts: T[]): T[] {
  return posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

// Get next and previous posts
export function getAdjacentPosts(posts: Post[], currentSlug: string) {
  const sortedPosts = sortPostsByDate(posts);
  const currentIndex = sortedPosts.findIndex(post => post.slug === currentSlug);
  
  return {
    prev: currentIndex > 0 ? sortedPosts[currentIndex - 1] : null,
    next: currentIndex < sortedPosts.length - 1 ? sortedPosts[currentIndex + 1] : null
  };
}

// Extract tags from posts
export function extractTags(posts: Post[]): string[] {
  const tags = new Set<string>();
  
  posts.forEach(post => {
    if (post.data.tags) {
      post.data.tags.forEach(tag => tags.add(tag));
    }
  });
  
  return Array.from(tags).sort();
}

// Filter posts by tag
export function filterPostsByTag(posts: Post[], tag: string): Post[] {
  return posts.filter(post => 
    post.data.tags && post.data.tags.includes(tag)
  );
}

// Create post slug from title
export function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Validate post data
export function validatePostData(data: Partial<PostData>): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  
  if (!data.title) {
    errors.push('Title is required');
  }
  
  if (!data.date) {
    errors.push('Date is required');
  }
  
  if (!data.description) {
    errors.push('Description is required');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}
