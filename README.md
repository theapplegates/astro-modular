# Astro Modular

A powerful, modular blog theme for Astro specifically designed for Obsidian users who want to seamlessly publish their notes and content to the web. This theme bridges the gap between your Obsidian vault and a production-ready blog with minimal friction.

<img width="2124" height="2830" alt="Astro Modular with the Oxygen theme applied, homepage." src="https://github.com/user-attachments/assets/3d325cdd-4e07-4b20-8766-395dab8a4b7e" />

## Features

- **Built for Obsidian Users**: write in a dedicated vault, publish to your blog with wikilinks, callouts, and seamless integration.
- **Modular & Customizable**: each feature can be enabled/disabled independently with 10+ themes.
- **Content-First**: markdown-first with folder-based posts, image optimization, and automatic SEO features.
- **Developer-Friendly**: TypeScript throughout, command palette navigation, and comprehensive documentation.

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

## Documentation

For detailed guides, see the included blog posts:
- **[Getting Started](posts/getting-started.md)** - Complete setup and workflow guide
- **[Formatting Reference](posts/formatting-reference.md)** - Comprehensive formatting reference  
- **[Astro Suite Vault Guide](posts/astro-suite-vault-modular-guide.md)** - Obsidian vault walkthrough

**For AI Agents & Developers:** See [AGENTS.md](AGENTS.md) for comprehensive technical documentation.

## Contributing

This is an open-source project. Feel free to submit feature requests, report bugs, or contribute improvements.

## License

MIT License - Use this for your own blog or as a starting point for your projects.
