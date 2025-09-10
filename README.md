# Astro Modular

A powerful, modular blog theme for Astro specifically designed for Obsidian users who want to seamlessly publish their notes and content to the web. This theme bridges the gap between your Obsidian vault and a production-ready blog with minimal friction.

<img width="1920" height="1200" alt="Astro Modular with the Oxygen theme applied, homepage." src="https://github.com/user-attachments/assets/6222d307-6c49-4337-8097-1e1ba08ad0f2" />


## What Makes Astro Modular Special

### Built for Obsidian Users
- **Direct Obsidian integration** - Write in a dedicated vault, publish to your blog
- **Wikilinks support** - `[[Internal Links]]` and `[[Link|Custom Text]]` work seamlessly
- **Obsidian callouts** - Full support for `> [!note]`, `> [!tip]`, `> [!warning]` and more
- **Tag compatibility** - Your Obsidian tags become blog tags automatically
- **Frontmatter sync** - Compatible metadata structure between Obsidian and Astro
- **Folder-based organization** - Keep content and assets together in dedicated folders
- **Obsidian bracket syntax** - Support for `[[image.jpg]]` syntax in image references
- **[Astro Suite Obsidian Vault](https://github.com/davidvkimball/obsidian-astro-suite) built-in** - Includes Obsidian vault configuration for streamlined publishing including [Astro Composer](https://github.com/davidvkimball/obsidian-astro-composer)

### Flexible & Customizeable 
- **Modular design** - Each feature can be enabled/disabled independently
- **Multiple color options** - Select from a variety of prebuilt themes
- **95+ Lighthouse scores** across all metrics with TypeScript throughout
- **Command palette** - Press `Ctrl+K` (or custom hotkey) for instant navigation and search
- **Responsive image grids** - Automatic layouts for multiple consecutive images
- **Dark/light themes** - System preference detection with manual toggle
- **SEO ready** - Automatic sitemaps, RSS feeds, and Open Graph images

## Core Features

### Content Management
- **Markdown-first** with enhanced processing and reading time estimation
- **Folder-based posts** - Organize content and assets in dedicated folders (like Fuwari)
- **Draft support** - Show drafts in development, hide in production
- **Image optimization** with WebP format priority and responsive layouts
- **Table of contents** auto-generation from headings

### Navigation & Discovery
- **Fuzzy search** through all content via command palette
- **Linked mentions** - See which posts reference each other
- **Tag filtering** and next/previous navigation between posts

## Quick Start

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

Edit `src/config.ts` to customize your site.

### Build Commands

```bash
# Development
pnpm dev

# Production build
pnpm build

# Preview production build
pnpm preview
```


## Theme Previews

### Post Body Example (Oxygen Theme)

<img width="1920" height="1200" alt="Astro Modular with the Oxygen theme applied, post example." src="https://github.com/user-attachments/assets/7d33274f-44eb-4e39-a793-e98743e3dff6" />

### Minimal Color Scheme

#### Homepage

<img width="1920" height="1200" alt="Astro Modular with the Minimal theme applied, homepage." src="https://github.com/user-attachments/assets/d0b4897c-49fa-4dbe-b39b-c0e1aca145f8" />


#### Post Body

<img width="1920" height="1200" alt="Astro Modular with Minimal theme applied, post example." src="https://github.com/user-attachments/assets/e6a6a560-924e-43c7-8b46-d03a9cbee4a1" />

## Documentation

For detailed guides, see the included blog posts:
- **Getting Started** - Complete setup and workflow guide
- **Markdown Features** - Comprehensive formatting reference
- **Astro Suite Vault (Modular) Guide** - Walkthrough of the included Obsidian vault and configuration

## Contributing

This is an open-source project. Feel free to submit feature requests, report bugs, or contribute improvements.

## License

MIT License - Use this for your own blog or as a starting point for your projects.
