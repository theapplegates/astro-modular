
// Site configuration with TypeScript types
export interface SiteConfig {
  site: string;
  title: string;
  description: string;
  author: string;
  language: string;
  layout: {
    contentWidth: string;
  };
  postsPerPage: number;
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
    showCoverImages: boolean;
    showSocialIconsInFooter: boolean;
    commandPalette: boolean;
    postNavigation: boolean;
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
  
  layout: {
    contentWidth: "45rem",
  },
  postsPerPage: 5,
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
    showCoverImages: true,
    showSocialIconsInFooter: true,
    commandPalette: true,
    postNavigation: true,
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

// Export the configuration as default
export default siteConfig;
