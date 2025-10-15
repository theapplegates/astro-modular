// Site configuration with TypeScript types

// Aspect ratio options for post cards
export type AspectRatio = 
  | "16:9" 
  | "4:3"
  | "3:2"
  | "og"
  | "square"
  | "golden"
  | "custom";

export interface SiteConfig {
  // Site Information
  site: string;
  title: string;
  description: string;
  author: string;
  language: string;
  
  // Global Settings
  theme: "minimal" | "oxygen" | "atom" | "ayu" | "catppuccin" | "charcoal" | "dracula" | "everforest" | "flexoki" | "gruvbox" | "macos" | "nord" | "obsidian" | "rose-pine" | "sky" | "solarized" | "things" | "custom";
  customThemeFile?: string; // Filename in src/themes/custom/ (e.g., "my-cool-theme" for my-cool-theme.ts)
  fonts: {
    source: "local" | "cdn";
    families: {
      body: string;
      heading: string;
      mono: string;
    };
    display: "swap" | "fallback" | "optional";
  };
  layout: {
    contentWidth: string;
  };
  footer: {
    enabled: boolean;
    content: string;
    showSocialIconsInFooter: boolean;
  };
  scrollToTop: boolean;
    darkModeToggleButton: "navigation" | "commandPalette" | "both";
  seo: {
    defaultOgImageAlt: string;
  };
  deployment: {
    platform: "netlify" | "vercel" | "github-pages";
  };
  
  // Command Palette
  commandPalette: {
    enabled: boolean;
    shortcut: string;
    placeholder: string;
    search: {
      posts: boolean;
      pages: boolean;
      projects: boolean;
      docs: boolean;
    };
    sections: {
      quickActions: boolean;
      pages: boolean;
      social: boolean;
    };
  };
  
  // Profile Picture
  profilePicture: {
    enabled: boolean;
    image: string;
    alt: string;
    size: "sm" | "md" | "lg";
    url?: string;
    placement: "footer" | "header";
    style: "circle" | "square" | "none";
  };
  
  // Navigation
  navigation: {
    showNavigation: boolean;
    style: "minimal" | "traditional";
    showMobileMenu: boolean;
    pages: Array<{ title: string; url: string }>;
    social: Array<{ title: string; url: string; icon: string }>;
  };
  
  // Home Options
  homeOptions: {
    featuredPost: {
      enabled: boolean;
      type: "latest" | "featured";
      slug?: string; // Only used when type is "featured"
    };
    recentPosts: {
      enabled: boolean;
      count: number;
    };
    projects: {
      enabled: boolean;
      count: number;
    };
    docs: {
      enabled: boolean;
      count: number;
    };
    blurb: {
      placement: "above" | "below" | "none";
    };
  };
  
  // Post Options
  postOptions: {
    postsPerPage: number;
    readingTime: boolean;
    wordCount: boolean;
    tableOfContents: boolean;
    tags: boolean;
    linkedMentions: {
      enabled: boolean;
      linkedMentionsCompact: boolean;
    };
    graphView: {
      enabled: boolean;
      showInSidebar: boolean;
      showInCommandPalette: boolean;
      maxNodes: number;
      showOrphanedPosts: boolean;
    };
    postNavigation: boolean;
    showPostCardCoverImages: "all" | "featured" | "home" | "posts" | "featured-and-posts" | "none";
    postCardAspectRatio: AspectRatio;
    customPostCardAspectRatio?: string;
    comments: {
      enabled: boolean;
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
  };
  
  // Optional Content Types
  optionalContentTypes: {
    projects: boolean;
    docs: boolean;
  };
}

// ═══════════════════════════════════════════════════════════════════════════════
// ASTRO MODULAR CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════════
// 
// ⚠️ IMPORTANT: Comment markers like // [CONFIG:KEY] are used by the Astro Modular
// Settings Obsidian plugin. Do not remove these markers or the plugin will not be
// able to update your configuration automatically.
// 
// Most settings have helpful comments explaining what they do.
// 
// ═══════════════════════════════════════════════════════════════════════════════
export const siteConfig: SiteConfig = {
  // Site Information
  // [CONFIG:SITE_URL]
  site: "https://astro-modular.netlify.app",
  // [CONFIG:SITE_TITLE]
  title: "Astro Modular",
  // [CONFIG:SITE_DESCRIPTION]
  description: "A flexible blog theme designed for Obsidian users.",
  // [CONFIG:SITE_AUTHOR]
  author: "David V. Kimball",
  // [CONFIG:SITE_LANGUAGE]
  language: "en",

  // Global Settings
  // [CONFIG:THEME]
  theme: "oxygen", // Available themes: "minimal" | "oxygen" | "atom" | "ayu" | "catppuccin" | "charcoal" | "dracula" | "everforest" | "flexoki" | "gruvbox" | "macos" | "nord" | "obsidian" | "rose-pine" | "sky" | "solarized" | "things" | "custom"
  customThemeFile: "custom", // Only used if theme is set to "custom" above. Filename in src/themes/custom/ (without .ts extension)
  fonts: {
    // [CONFIG:FONT_SOURCE]
    source: "local", // "local" for self-hosted @fontsource fonts, "cdn" for Google Fonts CDN
    families: {
      // [CONFIG:FONT_BODY]
      body: "Inter",      // Body text font family
      // [CONFIG:FONT_HEADING]
      heading: "Inter",   // Heading font family  
      // [CONFIG:FONT_MONO]
      mono: "JetBrains Mono", // Monospace font family
    },
    display: "swap", // Font display strategy: "swap" (recommended), "fallback", or "optional"
  },
  layout: {
    // [CONFIG:LAYOUT_CONTENT_WIDTH]
    contentWidth: "45rem",
  },
  footer: {
    // [CONFIG:FOOTER_ENABLED]
    enabled: true,
    content: `© 2025 {author}. Built with the <a href="https://github.com/davidvkimball/astro-modular" target="_blank">Astro Modular</a> theme.`,
    // [CONFIG:FOOTER_SHOW_SOCIAL_ICONS]
    showSocialIconsInFooter: true,
  },
  // [CONFIG:SCROLL_TO_TOP]
  scrollToTop: true,
  // [CONFIG:DARK_MODE_TOGGLE_BUTTON]
  darkModeToggleButton: "both", // "navigation" | "commandPalette" | "both"
  seo: {
    defaultOgImageAlt: "Astro Modular logo.", // Alt text for the default Open Graph image, public/open-graph.png
  },
  deployment: {
    // [CONFIG:DEPLOYMENT_PLATFORM]
    platform: "netlify", // "netlify" | "vercel" | "github-pages" - sets redirect configuration for the chosen platform
  },

  // Command Palette
  commandPalette: {
    // [CONFIG:COMMAND_PALETTE_ENABLED]
    enabled: true,
    // [CONFIG:COMMAND_PALETTE_SHORTCUT]
    shortcut: "ctrl+K",
    // [CONFIG:COMMAND_PALETTE_PLACEHOLDER]
    placeholder: "Search posts",
    search: {
      // [CONFIG:COMMAND_PALETTE_SEARCH_POSTS]
      posts: true,
      // [CONFIG:COMMAND_PALETTE_SEARCH_PAGES]
      pages: false,
      // [CONFIG:COMMAND_PALETTE_SEARCH_PROJECTS]
      projects: false,
      // [CONFIG:COMMAND_PALETTE_SEARCH_DOCS]
      docs: false,
    },
    sections: {
      // [CONFIG:COMMAND_PALETTE_SECTIONS_QUICK_ACTIONS]
      quickActions: true,
      // [CONFIG:COMMAND_PALETTE_SECTIONS_PAGES]
      pages: true,
      // [CONFIG:COMMAND_PALETTE_SECTIONS_SOCIAL]
      social: true,
    },
  },

  // Profile Picture
  profilePicture: {
    // [CONFIG:PROFILE_PICTURE_ENABLED]
    enabled: false, 
    // [CONFIG:PROFILE_PICTURE_IMAGE]
    image: "/profile.jpg", // Path to your profile image (place in public/ directory)
    // [CONFIG:PROFILE_PICTURE_ALT]
    alt: "Profile picture",
    // [CONFIG:PROFILE_PICTURE_SIZE]
    size: "md", // "sm" (32px), "md" (48px), or "lg" (64px) - only affects footer placement
    // [CONFIG:PROFILE_PICTURE_URL]
    url: "/about", // Optional
    // [CONFIG:PROFILE_PICTURE_PLACEMENT]
    placement: "footer", // "footer" or "header"
    // [CONFIG:PROFILE_PICTURE_STYLE]
    style: "circle", // "circle", "square", or "none"
  },

  // Navigation
  navigation: {
    // [CONFIG:NAVIGATION_SHOW_NAVIGATION]
    showNavigation: true,
    // [CONFIG:NAVIGATION_STYLE]
    style: "traditional", // 'minimal' or 'traditional'
    // [CONFIG:NAVIGATION_SHOW_MOBILE_MENU]
    showMobileMenu: true,
    // [CONFIG:NAVIGATION_PAGES]
    pages: [
      { title: "Posts", url: "/posts" },
      { title: "Projects", url: "/projects" },
      { title: "Docs", url: "/docs" },
      { title: "About", url: "/about" },
      { title: "GitHub", url: "https://github.com/davidvkimball/astro-modular" },
    ],
    // [CONFIG:NAVIGATION_SOCIAL]
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

  // Optional Content Types - Enable/disable optional content sections (takes priority over homeOptions)
  optionalContentTypes: {
    // [CONFIG:OPTIONAL_CONTENT_TYPES_PROJECTS]
    projects: true, // Enable projects section
    // [CONFIG:OPTIONAL_CONTENT_TYPES_DOCS]
    docs: true, // Enable documentation section
  },

  // Home Options
  homeOptions: {
    featuredPost: {
      // [CONFIG:HOME_OPTIONS_FEATURED_POST_ENABLED]
      enabled: true, // Show featured post on homepage
      // [CONFIG:HOME_OPTIONS_FEATURED_POST_TYPE]
      type: "latest", // "latest" or "featured"
      // [CONFIG:HOME_OPTIONS_FEATURED_POST_SLUG]
      slug: "getting-started", // Slug of post after '/posts/' to be featured (e.g. "post-title"). Only used when type is "featured"
    },
    recentPosts: {
      // [CONFIG:HOME_OPTIONS_RECENT_POSTS_ENABLED]
      enabled: true, // Show recent posts on homepage
      // [CONFIG:HOME_OPTIONS_RECENT_POSTS_COUNT]
      count: 7, // Number of recent posts to show
    },
    projects: {
      // [CONFIG:HOME_OPTIONS_PROJECTS_ENABLED]
      enabled: true, // Show featured projects on homepage
      // [CONFIG:HOME_OPTIONS_PROJECTS_COUNT]
      count: 2, // Number of projects to show
    },
    docs: {
      // [CONFIG:HOME_OPTIONS_DOCS_ENABLED]
      enabled: true, // Show featured docs on homepage
      // [CONFIG:HOME_OPTIONS_DOCS_COUNT]
      count: 3, // Number of docs to show
    },
    blurb: {
      // [CONFIG:HOME_OPTIONS_BLURB_PLACEMENT]
      placement: "below", // 'above' (at the top), 'below' (after content), or 'none' (disabled)
    },
  },

  // Post Options
  postOptions: {
    // [CONFIG:POST_OPTIONS_POSTS_PER_PAGE]
    postsPerPage: 6,
    // [CONFIG:POST_OPTIONS_READING_TIME]
    readingTime: true,
    // [CONFIG:POST_OPTIONS_WORD_COUNT]
    wordCount: true,
    // [CONFIG:POST_OPTIONS_TABLE_OF_CONTENTS]
    tableOfContents: true,
    // [CONFIG:POST_OPTIONS_TAGS]
    tags: true,
    linkedMentions: {
      // [CONFIG:POST_OPTIONS_LINKED_MENTIONS_ENABLED]
      enabled: true,
      // [CONFIG:POST_OPTIONS_LINKED_MENTIONS_COMPACT]
      linkedMentionsCompact: false,
    },
    graphView: {
    // [CONFIG:POST_OPTIONS_GRAPH_VIEW_ENABLED]
    enabled: true,
      // [CONFIG:POST_OPTIONS_GRAPH_VIEW_SHOW_IN_SIDEBAR]
      showInSidebar: true,
      // [CONFIG:POST_OPTIONS_GRAPH_VIEW_SHOW_IN_COMMAND_PALETTE]
      showInCommandPalette: true,
      // [CONFIG:POST_OPTIONS_GRAPH_VIEW_MAX_NODES]
      maxNodes: 100,
      // [CONFIG:POST_OPTIONS_GRAPH_VIEW_SHOW_ORPHANED_POSTS]
      showOrphanedPosts: true,
    },
    // [CONFIG:POST_OPTIONS_POST_NAVIGATION]
    postNavigation: true,
    // [CONFIG:POST_OPTIONS_SHOW_POST_CARD_COVER_IMAGES]
    showPostCardCoverImages: "featured-and-posts", // "all" | "featured" | "home" | "posts" | "featured-and-posts" | "none"
    // [CONFIG:POST_OPTIONS_POST_CARD_ASPECT_RATIO]
    postCardAspectRatio: "og", // "16:9" | "4:3" | "3:2" | "og" | "square" | "golden" | "custom"
    // [CONFIG:POST_OPTIONS_CUSTOM_POST_CARD_ASPECT_RATIO]
    customPostCardAspectRatio: "2.5/1", // Only used when postCardAspectRatio is "custom" (e.g., "2.5/1")
    comments: {
      // [CONFIG:POST_OPTIONS_COMMENTS_ENABLED]
      enabled: false,
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
  },
};

// Utility functions
export function getFeature(feature: keyof Omit<SiteConfig["postOptions"], "postsPerPage" | "showPostCardCoverImages" | "postCardAspectRatio" | "customPostCardAspectRatio" | "linkedMentions" | "graphView" | "comments">): boolean {
  return siteConfig.postOptions[feature];
}

export function getCommandPaletteShortcut(): string {
  return siteConfig.commandPalette.shortcut;
}

export function getContentWidth(): string {
  return siteConfig.layout.contentWidth;
}

export function getTheme(): "minimal" | "oxygen" | "atom" | "ayu" | "catppuccin" | "charcoal" | "dracula" | "everforest" | "flexoki" | "gruvbox" | "macos" | "nord" | "obsidian" | "rose-pine" | "sky" | "solarized" | "things" | "custom" {
  return siteConfig.theme;
}

export function getPostCardAspectRatio(): string {
  const { postCardAspectRatio, customPostCardAspectRatio } = siteConfig.postOptions;
  
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
      return customPostCardAspectRatio || "1.91 / 1"; // Fallback to OpenGraph if custom not provided
    default:
      return "1.91 / 1"; // Default to OpenGraph
  }
}

export function getHeadingFont(): string {
  return siteConfig.fonts.families.heading;
}

export function getProseFont(): string {
  return siteConfig.fonts.families.body;
}

export function getFontFamily(fontName: string): string {
  // Convert font name to CSS font-family with fallbacks
  const fontMap: Record<string, string> = {
    'Inter': "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    'Roboto': "'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    'Open Sans': "'Open Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    'Lato': "'Lato', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    'Poppins': "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    'Source Sans Pro': "'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    'Nunito': "'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    'Montserrat': "'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    'Playfair Display': "'Playfair Display', Georgia, 'Times New Roman', serif",
    'Merriweather': "'Merriweather', Georgia, 'Times New Roman', serif",
    'Lora': "'Lora', Georgia, 'Times New Roman', serif",
    'Crimson Text': "'Crimson Text', Georgia, 'Times New Roman', serif",
    'PT Serif': "'PT Serif', Georgia, 'Times New Roman', serif",
    'Libre Baskerville': "'Libre Baskerville', Georgia, 'Times New Roman', serif",
    'Fira Code': "'Fira Code', 'Monaco', 'Consolas', 'Courier New', monospace",
    'JetBrains Mono': "'JetBrains Mono', 'Monaco', 'Consolas', 'Courier New', monospace",
    'Source Code Pro': "'Source Code Pro', 'Monaco', 'Consolas', 'Courier New', monospace",
    'IBM Plex Mono': "'IBM Plex Mono', 'Monaco', 'Consolas', 'Courier New', monospace",
    'Cascadia Code': "'Cascadia Code', 'Monaco', 'Consolas', 'Courier New', monospace",
  };
  
  return fontMap[fontName] || `'${fontName}', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`;
}

export function getGoogleFontsUrl(headingFont: string, bodyFont: string): string {
  // Google Fonts that are commonly used and available
  const googleFonts = [
    'Inter', 'Roboto', 'Open Sans', 'Lato', 'Poppins', 'Source Sans Pro', 
    'Nunito', 'Montserrat', 'Playfair Display', 'Merriweather', 'Lora', 
    'Crimson Text', 'PT Serif', 'Libre Baskerville', 'Fira Code', 
    'JetBrains Mono', 'Source Code Pro', 'IBM Plex Mono', 'Cascadia Code'
  ];
  
  const fonts = new Set<string>();
  
  // Add fonts if they're Google Fonts
  if (googleFonts.includes(headingFont)) {
    fonts.add(headingFont);
  }
  if (googleFonts.includes(bodyFont)) {
    fonts.add(bodyFont);
  }
  
  // If no Google Fonts are needed, return empty string
  if (fonts.size === 0) {
    return '';
  }
  
  // Generate Google Fonts URL
  const fontList = Array.from(fonts).map(font => {
    // Add common weights for each font
    const weights = font.includes('Mono') ? '300;400;500;600;700' : '300;400;500;600;700';
    return `${font.replace(/\s+/g, '+')}:wght@${weights}`;
  }).join('&family=');
  
  return `https://fonts.googleapis.com/css2?family=${fontList}&display=swap`;
}

// Font loading utilities
export function getFontSource(): "local" | "cdn" {
  return siteConfig.fonts.source;
}

export function getFontDisplay(): "swap" | "fallback" | "optional" {
  return siteConfig.fonts.display;
}

export function getFontFamilies() {
  return siteConfig.fonts.families;
}

export function shouldLoadLocalFonts(): boolean {
  return siteConfig.fonts.source === "local";
}

export function shouldLoadCdnFonts(): boolean {
  return siteConfig.fonts.source === "cdn";
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
  const validThemes = ['minimal', 'oxygen', 'atom', 'ayu', 'catppuccin', 'charcoal', 'dracula', 'everforest', 'flexoki', 'gruvbox', 'macos', 'nord', 'obsidian', 'rose-pine', 'sky', 'solarized', 'things', 'custom'];
  if (!validThemes.includes(config.theme)) {
    errors.push(`theme must be one of: ${validThemes.join(', ')}`);
  }
  if (config.theme === 'custom') {
    if (!config.customThemeFile || config.customThemeFile.trim() === '') {
      errors.push('customThemeFile is required when theme is "custom"');
    }
  }

  // Font configuration validation
  if (!['local', 'cdn'].includes(config.fonts.source)) {
    errors.push('fonts.source must be either "local" or "cdn"');
  }
  if (!config.fonts.families.body || config.fonts.families.body.trim() === '') {
    errors.push('fonts.families.body is required');
  }
  if (!config.fonts.families.heading || config.fonts.families.heading.trim() === '') {
    errors.push('fonts.families.heading is required');
  }
  if (!config.fonts.families.mono || config.fonts.families.mono.trim() === '') {
    errors.push('fonts.families.mono is required');
  }
  if (!['swap', 'fallback', 'optional'].includes(config.fonts.display)) {
    errors.push('fonts.display must be one of: swap, fallback, optional');
  }

  // Numeric validations
  if (config.postOptions.postsPerPage < 1 || config.postOptions.postsPerPage > 50) {
    errors.push('postOptions.postsPerPage must be between 1 and 50');
  }
  if (config.homeOptions.recentPosts.count < 1) {
    errors.push('homeOptions.recentPosts.count must be at least 1');
  }
  if (config.homeOptions.projects.count < 1) {
    errors.push('homeOptions.projects.count must be at least 1');
  }
  if (config.homeOptions.docs.count < 1) {
    errors.push('homeOptions.docs.count must be at least 1');
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
  const validCoverImageOptions = ['all', 'featured', 'home', 'posts', 'featured-and-posts', 'none'];
  if (!validCoverImageOptions.includes(config.postOptions.showPostCardCoverImages)) {
    errors.push(`postOptions.showPostCardCoverImages must be one of: ${validCoverImageOptions.join(', ')}`);
  }

  // Aspect ratio validation
  const validAspectRatios = ['16:9', '4:3', '3:2', 'og', 'square', 'golden', 'custom'];
  if (!validAspectRatios.includes(config.postOptions.postCardAspectRatio)) {
    errors.push(`postOptions.postCardAspectRatio must be one of: ${validAspectRatios.join(', ')}`);
  }

  // Custom aspect ratio validation
  if (config.postOptions.postCardAspectRatio === 'custom') {
    if (!config.postOptions.customPostCardAspectRatio || !config.postOptions.customPostCardAspectRatio.match(/^\d+(\.\d+)?\s*\/\s*\d+(\.\d+)?$/)) {
      errors.push('postOptions.customPostCardAspectRatio must be provided and in format "width / height" (e.g., "2.5 / 1") when postCardAspectRatio is "custom"');
    }
  }

  // Home options validation
  if (!['above', 'below', 'none'].includes(config.homeOptions.blurb.placement)) {
    errors.push('homeOptions.blurb.placement must be either "above", "below", or "none"');
  }
  
  // Featured post validation
  if (!['latest', 'featured'].includes(config.homeOptions.featuredPost.type)) {
    errors.push('homeOptions.featuredPost.type must be either "latest" or "featured"');
  }
  
  // Only validate slug when type is "featured" - slug is optional when type is "latest"
  if (config.homeOptions.featuredPost.type === 'featured' && (!config.homeOptions.featuredPost.slug || config.homeOptions.featuredPost.slug.trim() === '')) {
    errors.push('homeOptions.featuredPost.slug is required when type is "featured"');
  }

  // Language validation
  if (!config.language || !config.language.match(/^[a-z]{2}(-[A-Z]{2})?$/)) {
    errors.push('language must be a valid language code (e.g., "en", "en-US")');
  }

  // Footer validation
  if (typeof config.footer.enabled !== 'boolean') {
    errors.push('footer.enabled must be a boolean value');
  }
  if (config.footer.enabled && (!config.footer.content || config.footer.content.trim() === '')) {
    errors.push('footer.content is required when footer.enabled is true');
  }
  if (typeof config.footer.showSocialIconsInFooter !== 'boolean') {
    errors.push('footer.showSocialIconsInFooter must be a boolean value');
  }

  // Profile picture validation
  if (config.profilePicture.enabled) {
    if (!config.profilePicture.image || config.profilePicture.image.trim() === '') {
      errors.push('profilePicture.image is required when profilePicture.enabled is true');
    }
    if (!config.profilePicture.alt || config.profilePicture.alt.trim() === '') {
      errors.push('profilePicture.alt is required when profilePicture.enabled is true');
    }
    if (!['sm', 'md', 'lg'].includes(config.profilePicture.size)) {
      errors.push('profilePicture.size must be one of: sm, md, lg');
    }
    if (!['footer', 'header'].includes(config.profilePicture.placement)) {
      errors.push('profilePicture.placement must be either "footer" or "header"');
    }
    if (!['circle', 'square', 'none'].includes(config.profilePicture.style)) {
      errors.push('profilePicture.style must be one of: circle, square, none');
    }
        if (config.profilePicture.url && !config.profilePicture.url.startsWith('/') && !config.profilePicture.url.startsWith('http')) {
          errors.push('profilePicture.url must be a valid URL starting with / or http');
        }
        if (config.profilePicture.url && config.profilePicture.url.trim() === '') {
          errors.push('profilePicture.url cannot be empty if provided');
        }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

// Validate configuration on import
const validation = validateSiteConfig(siteConfig);
if (!validation.isValid) {
  throw new Error(`Site configuration is invalid. Please fix the following issues:\n${validation.errors.join('\n')}`);
}

// Export the configuration as default
export default siteConfig;