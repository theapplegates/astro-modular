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
  site: string;
  title: string;
  description: string;
  author: string;
  language: string;
  theme: "minimal" | "oxygen" | "atom" | "ayu" | "catppuccin" | "charcoal" | "dracula" | "everforest" | "flexoki" | "gruvbox" | "macos" | "nord" | "obsidian" | "rose-pine" | "sky" | "solarized" | "things" | "custom";
  customThemeFile?: string; // Filename in src/themes/custom/ (e.g., "my-cool-theme" for my-cool-theme.ts)
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
    enabled: boolean;
    content: string;
  };
  profilePicture: {
    enabled: boolean;
    image: string;
    alt: string;
    size: "sm" | "md" | "lg";
    url?: string;
    placement: "footer" | "header";
    style: "circle" | "square" | "none";
  };
  features: {
    readingTime: boolean;
    wordCount: boolean;
    tableOfContents: boolean;
    tags: boolean;
    linkedMentions: boolean;
    linkedMentionsCompact: boolean;
    scrollToTop: boolean;
    darkModeToggleButton: boolean;
    showCoverImages: "all" | "latest" | "home" | "posts" | "latest-and-posts" | "none";
    showSocialIconsInFooter: boolean;
    commandPalette: boolean;
    postNavigation: boolean;
    showLatestPost: boolean;
    comments: boolean;
    postCardAspectRatio: AspectRatio;
    customAspectRatio?: string; 
  };
  typography: {
    headingFont: string;
    proseFont: string;
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
  description: "A flexible blog theme designed for Obsidian users.",
  author: "David V. Kimball",
  language: "en",

  theme: "oxygen", // Available themes: "minimal" | "oxygen" | "atom" | "ayu" | "catppuccin" | "charcoal" | "dracula" | "everforest" | "flexoki" | "gruvbox" | "macos" | "nord" | "obsidian" | "rose-pine" | "sky" | "solarized" | "things" | "custom"
  customThemeFile: "custom", // Only used if theme is set to "custom" above. Filename in src/themes/custom/ (without .ts extension)
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
    placement: "below", // 'above' (at the top of the homepage) or 'below' (after the list of homepage posts)
  },
  footer: {
    enabled: true,
    content: `© 2025 {author}. Built with the <a href="https://github.com/davidvkimball/astro-modular" target="_blank">Astro Modular</a> theme.`,
  },

  profilePicture: {
    enabled: false, 
    image: "/profile.jpg", // Path to your profile image (place in public/ directory)
    alt: "Profile picture",
    style: "circle", // "circle", "square", or "none"
    placement: "footer", // "footer" or "header"
    size: "md", // "sm" (32px), "md" (48px), or "lg" (64px) - only affects footer placement
    url: "/about", // Optional
  },

  features: {
    readingTime: true,
    wordCount: true,
    tableOfContents: true,
    tags: true,
    linkedMentions: true,
    linkedMentionsCompact: false,
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
  },

  typography: {
    headingFont: "Inter", // Font for headings (h1, h2, h3, h4, h5, h6), most Google fonts are supported. Default is Inter
    proseFont: "Inter",   // Font for body text and prose content, most Google fonts are supported. Default is Inter
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

export function getTheme(): "minimal" | "oxygen" | "atom" | "ayu" | "catppuccin" | "charcoal" | "dracula" | "everforest" | "flexoki" | "gruvbox" | "macos" | "nord" | "obsidian" | "rose-pine" | "sky" | "solarized" | "things" | "custom" {
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

export function getHeadingFont(): string {
  return siteConfig.typography.headingFont;
}

export function getProseFont(): string {
  return siteConfig.typography.proseFont;
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

export function getGoogleFontsUrl(headingFont: string, proseFont: string): string {
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
  if (googleFonts.includes(proseFont)) {
    fonts.add(proseFont);
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

  // Footer validation
  if (typeof config.footer.enabled !== 'boolean') {
    errors.push('footer.enabled must be a boolean value');
  }
  if (config.footer.enabled && (!config.footer.content || config.footer.content.trim() === '')) {
    errors.push('footer.content is required when footer.enabled is true');
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