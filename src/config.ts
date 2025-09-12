// Site configuration with TypeScript types
import { logger } from './utils/logger';

// Aspect ratio options for post cards
export type AspectRatio = 
  | "16:9"        // 1.78:1 - Standard widescreen
  | "4:3"         // 1.33:1 - Traditional
  | "3:2"         // 1.5:1 - Classic photography
  | "og"          // 1.91:1 - OpenGraph standard
  | "square"      // 1:1 - Square
  | "golden"      // 1.618:1 - Golden ratio
  | "custom";     // Custom ratio

export interface SiteConfig {
  site: string;
  title: string;
  description: string;
  author: string;
  language: string;
  theme: "minimal" | "oxygen" | "atom" | "ayu" | "catppuccin" | "charcoal" | "dracula" | "everforest" | "flexoki" | "gruvbox" | "macos" | "nord" | "obsidian" | "rose-pine" | "sky" | "solarized" | "things";
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
    comments: boolean;
    postCardAspectRatio: AspectRatio;
    customAspectRatio?: string; // For custom ratio (e.g., "2.5/1")
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
  comments: {
    provider: string;
    repo: string;
    repoId: string;
    category: string;
    categoryId: string;
    mapping: string;
    strict: string;
    reactions: string;
    metadata: string;
    inputPosition: string;
    theme: string;
    lang: string;
    loading: string;
  };
}

// Set your values HERE
export const siteConfig: SiteConfig = {
  site: "https://astro-modular.netlify.app",
  title: "Astro Modular",
  description: "A modular Astro blog.",
  author: "David V. Kimball",
  language: "en",

  theme: "oxygen", // Valid themes: "minimal" | "oxygen" | "atom" | "ayu" | "catppuccin" | "charcoal" | "dracula" | "everforest" | "flexoki" | "gruvbox" | "macos" | "nord" | "obsidian" | "rose-pine" | "sky" | "solarized" | "things"
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
    content: `© 2025 {author}. Built with the <a href="https://github.com/davidvkimball/astro-modular" target="_blank">Astro Modular</a> theme.`,
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
    postCardAspectRatio: "og", // "16:9" | "4:3" | "3:2" | "og" | "square" | "golden" | "custom"
    customAspectRatio: "2.5/1", // Only used when postCardAspectRatio is "custom" (e.g., "2.5/1")
    comments: false,
    
    // Aspect ratio options:
    // - "16:9" (1.78:1) - Standard widescreen
    // - "4:3" (1.33:1) - Traditional
    // - "3:2" (1.5:1) - Classic photography
    // - "og" (1.91:1) - OpenGraph standard (default)
    // - "square" (1:1) - Square
    // - "golden" (1.618:1) - Golden ratio
    // - "custom" - Use customAspectRatio field (e.g., "2.5/1")
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

  comments: {
    provider: "giscus",
    repo: "davidvkimball/astro-modular",
    repoId: "R_kgDOPllfKw",
    category: "General",
    categoryId: "DIC_kwDOPllfK84CvUpx",
    mapping: "pathname",
    strict: "0",
    reactions: "1",
    metadata: "0",
    inputPosition: "bottom",
    theme: "preferred_color_scheme",
    lang: "en",
    loading: "lazy",
  },

  navigation: {
    showNavigation: true,
    style: "traditional", // 'minimal' or 'traditional'
    showMobileMenu: true,
    pages: [
      { title: "Posts", url: "/posts" },
      { title: "About", url: "/about" },
      { title: "Contact", url: "/contact" },
      { title: "GitHub", url: "https://github.com/davidvkimball/astro-modular" },
    ],
    social: [
      {
        title: "X",
        url: "https://x.com/davidvkimball",
        icon: "x-twitter",
      },
      {
        title: "GitHub",
        url: "https://github.com/davidvkimball",
        icon: "github",
      },
    ],
  },
};

// Utility functions
export function getFeature(feature: keyof Omit<SiteConfig["features"], "showCoverImages" | "postCardAspectRatio" | "customAspectRatio">): boolean {
  return siteConfig.features[feature];
}

export function getCommandPaletteShortcut(): string {
  return siteConfig.commandPalette.shortcut;
}

export function getContentWidth(): string {
  return siteConfig.layout.contentWidth;
}

export function getTheme(): "minimal" | "oxygen" | "atom" | "ayu" | "catppuccin" | "charcoal" | "dracula" | "everforest" | "flexoki" | "gruvbox" | "macos" | "nord" | "obsidian" | "rose-pine" | "sky" | "solarized" | "things" {
  return siteConfig.theme;
}

export function getPostCardAspectRatio(): string {
  const { postCardAspectRatio, customAspectRatio } = siteConfig.features;
  
  switch (postCardAspectRatio) {
    case "16:9":
      return "16 / 9";
    case "4:3":
      return "4 / 3";
    case "3:2":
      return "3 / 2";
    case "og":
      return "1.91 / 1";
    case "square":
      return "1 / 1";
    case "golden":
      return "1.618 / 1";
    case "custom":
      return customAspectRatio || "1.91 / 1"; // Fallback to OpenGraph if custom not provided
    default:
      return "1.91 / 1"; // Default to OpenGraph
  }
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
  const validThemes = ['minimal', 'oxygen', 'atom', 'ayu', 'catppuccin', 'charcoal', 'dracula', 'everforest', 'flexoki', 'gruvbox', 'macos', 'nord', 'obsidian', 'rose-pine', 'sky', 'solarized', 'things'];
  if (!validThemes.includes(config.theme)) {
    errors.push(`theme must be one of: ${validThemes.join(', ')}`);
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

  // Aspect ratio validation
  const validAspectRatios = ['16:9', '4:3', '3:2', 'og', 'square', 'golden', 'custom'];
  if (!validAspectRatios.includes(config.features.postCardAspectRatio)) {
    errors.push(`features.postCardAspectRatio must be one of: ${validAspectRatios.join(', ')}`);
  }

  // Custom aspect ratio validation
  if (config.features.postCardAspectRatio === 'custom') {
    if (!config.features.customAspectRatio || !config.features.customAspectRatio.match(/^\d+(\.\d+)?\s*\/\s*\d+(\.\d+)?$/)) {
      errors.push('features.customAspectRatio must be provided and in format "width / height" (e.g., "2.5 / 1") when postCardAspectRatio is "custom"');
    }
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
  logger.error('❌ Site configuration validation failed:');
  validation.errors.forEach(error => logger.error(`  • ${error}`));
  throw new Error(`Site configuration is invalid. Please fix the following issues:\n${validation.errors.join('\n')}`);
}

// Export the configuration as default
export default siteConfig;