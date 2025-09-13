# Astro Modular

A flexible blog theme designed for Obsidian users.

<img width="2124" height="2830" alt="Astro Modular with the Oxygen theme applied, homepage." src="https://github.com/user-attachments/assets/3d325cdd-4e07-4b20-8766-395dab8a4b7e" />

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

## Features

- **Use Obsidian as your CMS**: write in a dedicated vault with preconfigured plugins to accelerate post publishing.
- **Flexible & Customizable**: each feature can be enabled/disabled independently with 10+ different color options.
- **Extended Markdown**: link your posts with wikilinks, use collapsible callouts, create beautiful tables and much more.
- **Automation & SEO**: open graph & metadata support, intuitive redirect logic using frontmatter, and automatic RSS, sitemap, robots, and llms.txt generation.

## Quick Start

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/davidvkimball/astro-modular)

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

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
