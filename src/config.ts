
// Site configuration with TypeScript types
export interface SiteConfig {
  site: string;
  title: string;
  description: string;
  author: string;
  language: string;
  theme: "minimal" | "oxygen";
  layout: {
    contentWidth: string;
  };
  postsPerPage: number;
  recentPostsCount: number;
  seo: {
    defaultOgImageAlt: string;
  };
  homeBlurb?: {
    enabled?: boolean;
    placement?: "above" | "below";
  };
  footer: {
    content: string;
  };
  features: {
    readingTime: boolean;
    wordCount: boolean;
    tableOfContents: boolean;
    tags: boolean;
    linkedMentions: boolean;
    scrollToTop: boolean;
    darkModeToggleButton: boolean;
    showCoverImages: "all" | "latest" | "home" | "posts" | "latest-and-posts" | "none";
    showSocialIconsInFooter: boolean;
    commandPalette: boolean;
    postNavigation: boolean;
    showLatestPost: boolean;
  };
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
    style: "minimal" | "traditional";
    showMobileMenu: boolean;
    pages: Array<{ title: string; url: string }>;
    social: Array<{ title: string; url: string; icon: string }>;
  };
}

// Set your values HERE
export const siteConfig: SiteConfig = {
  site: "https://astro-modular.netlify.app",
  title: "Astro Modular",
  description: "A modular Astro blog.",
  author: "David V. Kimball",
  language: "en",

  theme: "oxygen", // "minimal" or "oxygen"
  layout: {
    contentWidth: "45rem",
  },
  postsPerPage: 6,
  recentPostsCount: 7,
  seo: {
    defaultOgImageAlt: "Astro Modular logo.",
  },
  homeBlurb: {
    enabled: true,
    placement: "below", // 'above' (before latest post) or 'below' (after recent posts)
  },
  footer: {
    content: `© 2025 {author}. Built with the <a href="https://astro-modular.netlify.app/" class="hover:text-highlight-600 dark:hover:text-highlight-400 transition-colors" target="_blank">Astro Modular</a> theme.`,
  },

  features: {
    readingTime: true,
    wordCount: true,
    tableOfContents: true,
    tags: true,
    linkedMentions: true,
    scrollToTop: true,
    darkModeToggleButton: true,
    commandPalette: true,
    postNavigation: true,
    showLatestPost: true,
    showSocialIconsInFooter: true,
    showCoverImages: "latest-and-posts", // "all" | "latest" | "home" | "posts" | "latest-and-posts" | "none"
  },

  commandPalette: {
    shortcut: "ctrl+K",
    placeholder: "Search posts",
    sections: {
      quickActions: true,
      pages: true,
      social: true,
    },
  },

  navigation: {
    showNavigation: true,
    style: "traditional", // 'minimal' or 'traditional'
    showMobileMenu: true,
    pages: [
      { title: "Posts", url: "/posts" },
      { title: "About", url: "/about" },
      { title: "Website", url: "https://davidvkimball.com" },
    ],
    social: [
      {
        title: "GitHub",
        url: "https://github.com/davidvkimball",
        icon: "github",
      },
      {
        title: "Twitter",
        url: "https://x.com/davidvkimball",
        icon: "x-twitter",
      },
    ],
  },
};

// Utility functions
export function getFeature(feature: keyof SiteConfig["features"]): boolean {
  return siteConfig.features[feature];
}

export function getCommandPaletteShortcut(): string {
  return siteConfig.commandPalette.shortcut;
}

export function getContentWidth(): string {
  return siteConfig.layout.contentWidth;
}

export function getTheme(): "minimal" | "oxygen" {
  return siteConfig.theme;
}

// Validation function for siteConfig
function validateSiteConfig(config: SiteConfig): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Required fields
  if (!config.site || !config.site.startsWith('http')) {
    errors.push('site must be a valid URL starting with http or https');
  }
  if (!config.title || config.title.trim() === '') {
    errors.push('title is required and cannot be empty');
  }
  if (!config.description || config.description.trim() === '') {
    errors.push('description is required and cannot be empty');
  }
  if (!config.author || config.author.trim() === '') {
    errors.push('author is required and cannot be empty');
  }

  // Theme validation
  if (!['minimal', 'oxygen'].includes(config.theme)) {
    errors.push('theme must be either "minimal" or "oxygen"');
  }

  // Numeric validations
  if (config.postsPerPage < 1 || config.postsPerPage > 50) {
    errors.push('postsPerPage must be between 1 and 50');
  }
  if (config.recentPostsCount < 1 || config.recentPostsCount > 20) {
    errors.push('recentPostsCount must be between 1 and 20');
  }

  // Content width validation
  if (!config.layout.contentWidth || !config.layout.contentWidth.match(/^\d+(\.\d+)?(rem|px|em)$/)) {
    errors.push('layout.contentWidth must be a valid CSS length value');
  }

  // Navigation style validation
  if (!['minimal', 'traditional'].includes(config.navigation.style)) {
    errors.push('navigation.style must be either "minimal" or "traditional"');
  }

  // Cover image options validation
  const validCoverImageOptions = ['all', 'latest', 'home', 'posts', 'latest-and-posts', 'none'];
  if (!validCoverImageOptions.includes(config.features.showCoverImages)) {
    errors.push(`features.showCoverImages must be one of: ${validCoverImageOptions.join(', ')}`);
  }

  // Home blurb placement validation
  if (config.homeBlurb?.enabled && config.homeBlurb.placement && !['above', 'below'].includes(config.homeBlurb.placement)) {
    errors.push('homeBlurb.placement must be either "above" or "below"');
  }

  // Language validation
  if (!config.language || !config.language.match(/^[a-z]{2}(-[A-Z]{2})?$/)) {
    errors.push('language must be a valid language code (e.g., "en", "en-US")');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

// Validate configuration on import
const validation = validateSiteConfig(siteConfig);
if (!validation.isValid) {
  console.error('❌ Site configuration validation failed:');
  validation.errors.forEach(error => console.error(`  • ${error}`));
  throw new Error(`Site configuration is invalid. Please fix the following issues:\n${validation.errors.join('\n')}`);
}

// Export the configuration as default
export default siteConfig;
