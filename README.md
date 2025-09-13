# Astro Modular

A flexible blog theme designed for Obsidian users.

<img width="2124" height="2830" alt="Astro Modular with the Oxygen theme applied, homepage." src="https://github.com/user-attachments/assets/3d325cdd-4e07-4b20-8766-395dab8a4b7e" />

## Features

- **Use Obsidian as your CMS**: write in a dedicated vault with preconfigured plugins to accelerate post publishing.
- **Flexible & Customizable**: each feature can be enabled/disabled independently with 10+ different color options.
- **Extended Markdown**: link your posts with wikilinks, use collapsible callouts, create beautiful tables and much more.
- **Automation & SEO**: open graph & metadata support, intuitive redirect logic using frontmatter, and automatic RSS, sitemap, robots, and llms.txt generation.

## Quick Start

### Prerequisites
- Node.js 18 or higher
- pnpm (recommended) or npm

### Setup

1. **Install:**
   ```bash
   pnpm install
   ```

2. **Preview:**
   ```bash
   pnpm dev # or pnpm preview
   ```

   Your blog will be available at `http://localhost:5000`

3. **Build for production:**
   ```bash
   pnpm build
   ```

### Configuration

Edit `src/config.ts` to customize your site.

## Documentation

For detailed guides, see the included blog posts:
- **[Getting Started](src/content/posts/getting-started.md)** - complete setup and workflow guide
- **[Formatting Reference](src/content/posts/formatting-reference.md)** - comprehensive formatting reference  
- **[Astro Suite Vault Guide](src/content/posts/astro-suite-vault-modular-guide.md)** - Obsidian vault walkthrough

**For AI Agents & Developers:** See [AGENTS.md](AGENTS.md) for comprehensive technical documentation.

## Contributing

This is an open-source project. Feel free to submit feature requests, report bugs, or contribute improvements.

## License

MIT License
