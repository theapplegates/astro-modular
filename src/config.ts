
// Site configuration with TypeScript types
export interface SiteConfig {
  site: string;
  title: string;
  description: string;
  author: string;
  language: string;

  theme: {
    highlightColor: string;
    fonts: {
      heading: string;
      body: string;
    };
  };

  features: {
    readingTime: boolean;
    wordCount: boolean;
    tableOfContents: boolean;
    tags: boolean;
    linkedMentions: boolean;
    commandPalette: boolean;
    scrollToTop: boolean;
    darkModeToggleButton: boolean;
    showCoverImages: boolean;
    postNavigation: boolean;
  };

  postsPerPage: number;

  commandPalette: {
    shortcut: string;
    placeholder: string;
  };

  navigation: {
    showTraditionalNav: boolean;
    pages: Array<{ title: string; url: string; }>;
    social: Array<{ title: string; url: string; icon: string; }>;
    external: Array<any>;
  };

  seo: {
    generateOgImages: boolean;
    schemaType: string;
  };

  footer: {
    title?: string;
    description?: string;
  };
}

export const siteConfig: SiteConfig = {
  site: 'https://localhost:5000',
  title: 'Obsidian Blog',
  description: 'A minimal blog inspired by Obsidian',
  author: 'Blog Author',
  language: 'en',
  theme: {
    highlightColor: 'slate',
    fonts: {
      heading: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      body: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }
  },
  features: {
    readingTime: true,
    wordCount: true,
    tableOfContents: true,
    tags: true,
    linkedMentions: true,
    commandPalette: true,
    scrollToTop: true,
    darkModeToggleButton: true,
    showCoverImages: false,
    postNavigation: true
  },
  postsPerPage: 10,
  commandPalette: {
    shortcut: 'ctrl+k',
    placeholder: 'Search all posts...'
  },
  navigation: {
    showTraditionalNav: false,
    pages: [
      { title: 'About', url: '/about' },
      { title: 'Posts', url: '/posts' }
    ],
    social: [
      { title: 'GitHub', url: 'https://github.com', icon: 'github' },
      { title: 'Twitter', url: 'https://twitter.com', icon: 'twitter' }
    ],
    external: []
  },
  seo: {
    generateOgImages: true,
    schemaType: 'blog'
  },
  footer: {
    title: "Thanks for Reading",
    description: "Hope you enjoyed exploring these thoughts and ideas. Feel free to connect with me through the links above or check out more posts."
  }
};

// Utility functions
export function getFeature(feature: keyof SiteConfig['features']): boolean {
  return siteConfig.features[feature];
}

export function getHighlightColor(): string {
  return siteConfig.theme.highlightColor;
}

export function getCommandPaletteShortcut(): string {
  return siteConfig.commandPalette.shortcut;
}

// Export the configuration as default
export default siteConfig;
