import { visit } from 'unist-util-visit';
import type { Plugin } from 'unified';
import type { Root, Image, Link } from 'mdast';

// Audio file extensions
const AUDIO_EXTENSIONS = ['.mp3', '.wav', '.ogg', '.m4a', '.3gp', '.flac', '.aac'];

// Video file extensions
const VIDEO_EXTENSIONS = ['.mp4', '.webm', '.ogv', '.mov', '.mkv', '.avi'];

// PDF file extensions
const PDF_EXTENSIONS = ['.pdf'];

// YouTube URL patterns
const YOUTUBE_PATTERNS = [
  /^https?:\/\/(?:www\.)?youtube\.com\/watch\?v=([^&\n?#]+)/,
  /^https?:\/\/youtu\.be\/([^&\n?#]+)/,
  /^https?:\/\/(?:www\.)?youtube\.com\/embed\/([^&\n?#]+)/
];


// Twitter/X URL patterns
const TWITTER_PATTERNS = [
  /^https?:\/\/(?:www\.)?twitter\.com\/\w+\/status\/(\d+)/,
  /^https?:\/\/(?:www\.)?x\.com\/\w+\/status\/(\d+)/
];

// Helper function to get file extension
function getFileExtension(url: string): string {
  const pathname = new URL(url, 'http://example.com').pathname;
  const lastDot = pathname.lastIndexOf('.');
  return lastDot !== -1 ? pathname.substring(lastDot).toLowerCase() : '';
}

// Helper function to check if URL is external
function isExternalUrl(url: string): boolean {
  try {
    const parsed = new URL(url, 'http://example.com');
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

// Helper function to extract YouTube video ID
function extractYouTubeVideoId(url: string): string | null {
  for (const pattern of YOUTUBE_PATTERNS) {
    const match = url.match(pattern);
    if (match) {
      return match[1];
    }
  }
  return null;
}


// Helper function to extract Twitter/X post ID
function extractTwitterPostId(url: string): string | null {
  for (const pattern of TWITTER_PATTERNS) {
    const match = url.match(pattern);
    if (match) {
      return match[1];
    }
  }
  return null;
}

// Helper function to create HTML node
function createHtmlNode(html: string): any {
  return {
    type: 'html',
    value: html
  };
}

export const remarkObsidianEmbeds: Plugin<[], Root> = () => {
  return (tree) => {
    // Visit image nodes (covers ![[file]] syntax)
    visit(tree, 'image', (node: Image, index, parent) => {
      if (!node.url || !parent || typeof index !== 'number') return;

      const url = node.url;
      const alt = node.alt || '';
      const extension = getFileExtension(url);

      // Handle audio files
      if (AUDIO_EXTENSIONS.includes(extension)) {
        const filename = url.split('/').pop() || 'audio';
        const html = `
<div class="audio-embed">
  <audio controls preload="metadata">
    <source src="${url}" type="audio/${extension.substring(1)}">
    Your browser does not support the audio element.
  </audio>
  <p class="audio-filename">${filename}</p>
</div>`;
        parent.children[index] = createHtmlNode(html);
        return;
      }

      // Handle video files
      if (VIDEO_EXTENSIONS.includes(extension)) {
        const html = `
<div class="video-embed">
  <video controls preload="metadata">
    <source src="${url}" type="video/${extension.substring(1)}">
    Your browser does not support the video element.
  </video>
</div>`;
        parent.children[index] = createHtmlNode(html);
        return;
      }

      // Handle PDF files
      if (PDF_EXTENSIONS.includes(extension)) {
        const filename = url.split('/').pop() || 'document';
        const html = `
<div class="pdf-embed">
  <iframe 
    src="${url}" 
    class="w-full h-[600px] rounded-lg border border-primary-200 dark:border-primary-600"
    title="PDF Document"
  ></iframe>
  <a href="${url}" download class="pdf-download-link">
    Download PDF
  </a>
</div>`;
        parent.children[index] = createHtmlNode(html);
        return;
      }

      // Handle web embeds (YouTube, Twitter/X) in image syntax
      if (isExternalUrl(url)) {
        // Check for Twitter/X
        const twitterPostId = extractTwitterPostId(url);
        if (twitterPostId) {
          const html = `<blockquote class="twitter-tweet" data-theme="preferred_color_scheme" data-conversation="none"><p lang="en" dir="ltr">Why doesn&#39;t everyone use Astro? Writing blog posts in markdown is beautiful.</p>&mdash; David V. Kimball (@davidvkimball) <a href="https://twitter.com/davidvkimball/status/${twitterPostId}?ref_src=twsrc%5Etfw">June 12, 2025</a></blockquote>`;
          parent.children[index] = createHtmlNode(html);
          return;
        }

        // Check for YouTube
        const youtubeVideoId = extractYouTubeVideoId(url);
        if (youtubeVideoId) {
          const html = `
<div class="youtube-embed aspect-video overflow-hidden rounded-xl my-8">
  <iframe 
    src="https://www.youtube.com/embed/${youtubeVideoId}?rel=0&modestbranding=1" 
    title="${alt || 'YouTube video player'}" 
    allowfullscreen 
    loading="lazy"
    class="w-full h-full"
  ></iframe>
</div>`;
          parent.children[index] = createHtmlNode(html);
          return;
        }
      }
    });

    // Visit link nodes (covers ![](url) syntax for web embeds)
    visit(tree, 'link', (node: Link, index, parent) => {
      if (!node.url || !parent || typeof index !== 'number') return;

      const url = node.url;
      const title = node.title || '';


      // Handle YouTube embeds
      const youtubeVideoId = extractYouTubeVideoId(url);
      if (youtubeVideoId) {
        const html = `
<div class="youtube-embed aspect-video overflow-hidden rounded-xl my-8">
  <iframe 
    src="https://www.youtube.com/embed/${youtubeVideoId}?rel=0&modestbranding=1" 
    title="${title || 'YouTube video player'}" 
    allowfullscreen 
    loading="lazy"
    class="w-full h-full"
  ></iframe>
</div>`;
        parent.children[index] = createHtmlNode(html);
        return;
      }


    });
  };
};
