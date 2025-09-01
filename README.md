# Astro Modular Blog

A powerful, modular blog theme for Astro specifically designed for Obsidian users who want to seamlessly publish their notes and content to the web. This theme bridges the gap between your Obsidian vault and a production-ready blog with minimal friction.

## ✨ What Makes This Special

### 🧠 Built for Obsidian Workflows
- **Direct Obsidian integration** - Write in your vault, publish to your blog
- **Wikilinks support** - `[[Internal Links]]` and `[[Link|Custom Text]]` work seamlessly
- **Obsidian callouts** - Full support for `> [!note]`, `> [!tip]`, `> [!warning]` and more
- **Tag compatibility** - Your Obsidian tags become blog tags automatically
- **Frontmatter sync** - Compatible metadata structure between Obsidian and Astro
- **Astro Composer plugin ready** - Includes vault configuration for streamlined publishing

### ⚡ Modern Performance & Features
- **Modular design** - Each feature can be enabled/disabled independently
- **95+ Lighthouse scores** across all metrics with TypeScript throughout
- **Command palette** - Press `Ctrl+K` for instant navigation and search
- **Responsive image grids** - Automatic layouts for multiple consecutive images
- **Dark/light themes** - System preference detection with manual toggle
- **SEO ready** - Automatic sitemaps, RSS feeds, and Open Graph images

## 🛠️ Core Features

### Content Management
- **Markdown-first** with enhanced processing and reading time estimation
- **Draft support** - Show drafts in development, hide in production
- **Image optimization** with WebP format priority and responsive layouts
- **Table of contents** auto-generation from headings

### Navigation & Discovery
- **Fuzzy search** through all content via command palette
- **Linked mentions** - See which posts reference each other
- **Tag filtering** and next/previous navigation between posts

## 🚀 Quick Start

### Prerequisites
- Node.js 18 or higher
- pnpm (recommended) or npm

### Setup

1. **Install and start:**
   ```bash
   pnpm install
   pnpm run dev
   ```
   Your blog will be available at `http://localhost:5000`

2. **Build for production:**
   ```bash
   pnpm run build
   ```

### Configuration

Edit `src/config.ts` to customize your site:

```typescript
export const siteConfig = {
  site: 'https://yourdomain.com',
  title: 'Your Blog Title',
  description: 'Your blog description',
  author: 'Your Name',

  features: {
    readingTime: true,
    wordCount: true,
    tableOfContents: true,
    tags: true,
    linkedMentions: true,
    commandPalette: true,
    darkModeToggleButton: true,
    // ... more options
  }
}
```

## 📁 Content Structure

```
src/content/
├── posts/           # Blog posts
│   ├── images/      # Post images
│   └── *.md         # Markdown files
├── pages/           # Static pages
│   ├── images/      # Page images
│   └── *.md         # Markdown files
└── .obsidian/       # Obsidian vault configuration
```

### Writing Posts

Create a new post in `src/content/posts/`:

```markdown
---
title: "Your Post Title"
date: 2024-01-20
description: "Brief description for SEO"
image: "images/cover-image.jpg"
imageAlt: "Description of the image"
tags:
  - tutorial
  - astro
---

Your content here...

Use [[wikilinks]] to reference other posts.

> [!note] Obsidian Callouts
> These work exactly like in Obsidian!
```

## 🎯 Obsidian Integration

### Included Vault Setup

The `src/content/.obsidian/` folder contains a complete Obsidian vault configuration with:

- **Astro Composer** plugin for seamless publishing
- **Minimal theme** for distraction-free writing
- **Custom hotkeys** optimized for blog workflows
- **Publishing shortcuts** - Save with `Ctrl+S` to auto-format for web

### Workflow

1. **Write in Obsidian** using your normal workflow with wikilinks and properties
2. **Save** - Auto-formatting prepares content for web
3. **Publish** - Content appears immediately on your blog

### Supported Features

- ✅ **Wikilinks** - `[[Internal Links]]` and `[[Link|Custom Text]]`
- ✅ **Callouts** - All standard types with proper styling
- ✅ **Tags** - Direct compatibility with Obsidian tag format
- ✅ **Images** - Drag and drop with automatic optimization
- ✅ **Tables, Code blocks, Math** - Full markdown support with syntax highlighting

## 🎨 Customization

### Theme Colors

Modify CSS custom properties in `src/styles/global.css`:

```css
:root {
  --color-highlight: 14 165 233; /* Your accent color */
  --color-background: 255 255 255;
  --color-foreground: 15 23 42;
}
```

### Component Configuration

All components in `src/components/` are modular and can be styled, enabled/disabled, or replaced independently through the configuration file.

## 📊 Performance & SEO

- **Automatic sitemap and RSS generation** with full content and images
- **Open Graph images** auto-generated for social sharing
- **Schema.org markup** for rich snippets
- **Lazy loading** and optimized file sizes for improved page speed

## 🚀 Deployment

### Deploy on Replit

This template is optimized for Replit deployment:

1. **Fork this project** on Replit
2. **Configure your domain** in the deployment settings
3. **Push changes** and deploy instantly

### Build Commands

```bash
# Development
pnpm run dev

# Production build
pnpm run build

# Preview production build
pnpm run preview
```

## 🔧 Advanced Configuration

### Toggle Features

Customize functionality in `src/config.ts`:

```typescript
features: {
  readingTime: true,        // Show estimated reading time
  tableOfContents: true,    // Auto-generate TOC
  linkedMentions: true,     // Show backlinks
  commandPalette: true,     // Global search (Ctrl+K)
  darkModeToggleButton: true, // Theme switcher
  showCoverImages: true,    // Post cover images
}
```

### Command Palette

Customize shortcuts and search behavior:

```typescript
commandPalette: {
  shortcut: 'ctrl+K',  // or 'cmd+K' for Mac
  placeholder: 'Search posts and pages...',
}
```

## 📚 Documentation

For detailed guides, see the included blog posts:
- **Getting Started** - Complete setup and workflow guide
- **Markdown Features** - Comprehensive formatting reference

## 🤝 Contributing

This is an open-source project. Feel free to submit feature requests, report bugs, or contribute improvements.

## 📄 License

MIT License - Use this for your own blog or as a starting point for your projects.

---

**Ready to start blogging?** Set up your Obsidian vault, configure your site settings, and start writing. Your thoughts deserve a beautiful home on the web.