# Astro Modular

A flexible blog theme designed for Obsidian users. 

<img width="1920" height="1080" alt="Astro Modular with the Oxygen theme applied, homepage." src="https://github.com/user-attachments/assets/ec62b1d0-8cc6-4481-aaee-038fdf9168ea" />

<img width="1920" height="1080" alt="Astro Modular Obsidian vault." src="https://github.com/user-attachments/assets/5a47699b-5cb0-4d52-a15f-82c92d7e79a2" />


## Badges

[![Netlify Status](https://api.netlify.com/api/v1/badges/3f849f7a-71e6-463b-84af-01c523012348/deploy-status)](https://app.netlify.com/sites/astro-modular/deploys)
[![GitHub last commit](https://img.shields.io/github/last-commit/davidvkimball/astro-modular)](https://github.com/davidvkimball/astro-modular)
[![GitHub commit activity](https://img.shields.io/github/commit-activity/m/davidvkimball/astro-modular)](https://github.com/davidvkimball/astro-modular)
[![Obsidian Compatible](https://img.shields.io/badge/Obsidian-Compatible-7C3AED?logo=obsidian&logoColor=white)](https://obsidian.md/)
[![Markdown Support](https://img.shields.io/badge/Markdown-Extended-000000?logo=markdown&logoColor=white)](https://daringfireball.net/projects/markdown/)

### Tech Stack
[![Astro](https://img.shields.io/badge/Astro-5.13.4-FF5D01?logo=astro&logoColor=white)](https://astro.build/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![pnpm](https://img.shields.io/badge/pnpm-8+-F69220?logo=pnpm&logoColor=white)](https://pnpm.io/)

## Why Astro Modular?

- **Obsidian As A CMS**: Works with Obsidian out of the box, write and publish instantly
- **Highly Customizable**: Every feature can be enabled/disabled independently
- **Performance-Focused**: Assets are highly optimized for lightning-fast loading
- **SEO-Ready**: Automatic sitemap, RSS feed, and Open Graph image generation

## Features

### Design & Customization
- **Theme Selection**: Choose from 17+ color palettes with light and dark mode support
- **Custom Typography**: Separate font configuration for headings and body text
- **Responsive Design**: Perfect on desktop, tablet, and mobile
- **Modular Features**: Toggle any feature on/off through configuration

### Content Management
- **Native Obsidian Features**: Wikilinks, callouts, and bracket syntax work seamlessly
- **Folder-Based Posts**: Organize content and assets together
- **Draft Support**: Show drafts in development, hide in production
- **Automatic Redirects**: Rename posts without breaking links

### Performance & Accessibility
- **Lightning Fast**: Built on Astro for optimal performance
- **Image Optimization**: Automatic WebP conversion and responsive images
- **Built-in Labels**: Comprehensive ARIA labels and alt text support
- **Keyboard Navigation**: Full keyboard support throughout

## Quick Start

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/davidvkimball/astro-modular)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/davidvkimball/astro-modular)

### Prerequisites
- Node.js 18 or higher
- pnpm (recommended) or npm

> [!NOTE]
> While this theme works great with any markdown editor, it's specifically optimized for Obsidian use. See the [Astro Suite Vault Guide](src/content/posts/astro-suite-vault-modular-guide.md) for Obsidian-specific features.

### Setup

1. **Install:**
   ```bash
   pnpm install
   ```

2. **Preview:**
   ```bash
   pnpm dev
   ```
   Your blog will be available at `http://localhost:5000`

3. **Build for production:**
   ```bash
   pnpm build
   ```

4. **Update theme (optional):**
   ```bash
   pnpm run update-theme
   ```
   
   This command helps you keep your theme up to date with the latest features and fixes.

### Configuration

Edit `src/config.ts` to customize your site - change the theme, enable/disable features, and configure all settings.

## Deployment

Set your deployment platform once in `src/config.ts` under `deployment.platform` ("netlify", "vercel", or "github-pages"). The build process automatically generates the correct configuration files for your chosen platform - no environment variables needed!

## Documentation

For detailed guides, see the included blog posts:
- **[Getting Started](src/content/posts/getting-started.md)** - complete setup and workflow guide
- **[Formatting Reference](src/content/posts/formatting-reference.md)** - comprehensive formatting reference  
- **[Astro Suite Vault Guide](src/content/posts/astro-suite-vault-modular-guide.md)** - Obsidian vault walkthrough

**For AI Agents & Developers:** See [AGENTS.md](AGENTS.md) for comprehensive technical documentation.

## Contributing

This is an open-source project. Feel free to submit feature requests, report bugs, or contribute improvements.

## License

[MIT License](https://github.com/davidvkimball/astro-modular?tab=MIT-1-ov-file)
