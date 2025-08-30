
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

  layout: {
    contentWidth: string;
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
    showSocialIconsInFooter: boolean;
  };

  postsPerPage: number;

  commandPalette: {
    shortcut: string;
    placeholder: string;
    sections: {
      quickActions: boolean;
      pages: boolean;
      social: boolean;
    };
  };

  navigation: {
    showNavigation: boolean;
    style: 'minimal' | 'traditional';
    showMobileMenu: boolean;
    pages: Array<{ title: string; url: string; }>;
    social: Array<{ title: string; url: string; icon: string; }>;
    external: Array<any>;
  };

  seo: {
    generateOgImages: boolean;
    schemaType: string;
  };

  homeBlurb?: {
    enabled?: boolean;
    placement?: 'above' | 'below';
    title?: string;
    description?: string;
  };
}

export const siteConfig: SiteConfig = {
  site: 'https://astro-flow.netlify.app',
  title: 'Astro Flow',
  description: 'A modular Astro blog.',
  author: 'David V. Kimball',
  language: 'en',
  theme: {
    highlightColor: 'slate',
    fonts: {
      heading: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      body: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }
  },
  layout: {
    contentWidth: '40rem'
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
    showCoverImages: true,
    postNavigation: true,
    showSocialIconsInFooter: true
  },
  postsPerPage: 5,
  commandPalette: {
    shortcut: 'ctrl+K',
    placeholder: 'Search all posts...',
    sections: {
      quickActions: true,
      pages: true,
      social: true
    }
  },
  navigation: {
    showNavigation: true,
    style: 'minimal', // 'minimal' or 'traditional'
    showMobileMenu: true,
    pages: [
      { title: 'Posts', url: '/posts' },
      { title: 'About', url: '/about' },
      { title: 'Website', url: 'https://davidvkimball.com' }
    ],
    social: [
      { title: 'GitHub', url: 'https://github.com/davidvkimball', icon: 'github' },
      { title: 'Twitter', url: 'https://x.com/davidvkimball', icon: 'x-twitter' }
    ],
    external: []
  },
  seo: {
    generateOgImages: true,
    schemaType: 'blog'
  },
  homeBlurb: {
    enabled: true,
    placement: 'below' // 'above' (before latest post) or 'below' (after recent posts)
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

export function getContentWidth(): string {
  return siteConfig.layout.contentWidth;
}

// Export the configuration as default
export default siteConfig;
