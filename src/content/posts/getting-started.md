---
title: Complete Setup Guide for Your Modular Astro Blog
date: 2024-01-20
description: Everything you need to know to set up, configure, and customize your modular Astro blog built for Obsidian users. From installation to advanced features and workflow optimization.
image: images/pexels-fotios-photos-1107717.jpg
imageAlt: Minimalist workspace with computer and notebook representing digital writing
imageOG: true
hideCoverImage: false
draft: false
tags:
  - tutorial
  - setup
  - configuration
  - astro
  - blog
  - obsidian
targetKeyword: astro blog setup
---
This guide covers everything needed to set up and customize your modular Astro blog—designed for Obsidian users who want to publish content with minimal friction.

## Prerequisites & Setup

You'll need:
- **Node.js 18+**
- **pnpm** (recommended) or npm
- Basic markdown familiarity
- Obsidian (optional, for enhanced workflow)

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm run dev
# Available at http://localhost:5000

# Build for production
pnpm run build
```

## Configuration

### Core Settings

Configure everything in `src/config.ts`. Enable only the features you need:

```typescript
export const siteConfig = {
  site: 'https://yourdomain.com',
  title: 'Your Blog Title',
  description: 'Your blog description',
  author: 'Your Name',
  
  features: {
    readingTime: true,          // Show reading time
    tableOfContents: true,      // Auto-generate TOCs
    tags: true,                 // Enable tag system
    linkedMentions: true,       // Show post connections
    commandPalette: true,       // Enable Ctrl+K search
    darkModeToggleButton: true, // Theme switcher
    showCoverImages: true,      // Display post images
  },
  
  postsPerPage: 5,
}
```

### Theme & Navigation

Customize colors in `src/styles/global.css`:

```css
:root {
  --color-highlight: 14 165 233; /* Your accent color */
  --color-background: 255 255 255;
  --color-foreground: 15 23 42;
}
```

Configure navigation in the config:

```typescript
navigation: {
  style: 'minimal', // or 'traditional'
  pages: [
    { title: 'Posts', url: '/posts' },
    { title: 'About', url: '/about' }
  ],
  social: [
    { title: 'GitHub', url: 'https://github.com/username', icon: 'github' }
  ]
}
```

## Content Structure

```
src/content/
├── posts/           # Blog posts
│   ├── images/      # Post images
│   └── *.md         # Markdown files
├── pages/           # Static pages
│   └── *.md         # Markdown files
└── .obsidian/       # Obsidian vault setup
```

## Writing Posts

Create posts in `src/content/posts/` with this frontmatter:

```markdown
---
title: "Your Post Title"
date: 2024-01-20
description: "SEO description"
image: "images/cover.jpg"
imageAlt: "Alt text"
tags:
  - tutorial
  - astro
---

Write using markdown with enhanced features.

Use [[wikilinks]] to connect posts.

> [!note] Obsidian Callouts
> Work exactly like in Obsidian!
```

## Obsidian Integration

### Using the Included Vault

1. **Open `src/content/` in Obsidian**
2. **Install recommended plugins** (Astro Composer, Minimal theme)
3. **Write using your normal workflow**
4. **Publish directly** using Astro Composer

The vault provides:
- **Minimal theme** for distraction-free writing
- **Custom hotkeys** for blogging tasks
- **Auto-formatting** on save
- **Publishing shortcuts**

## Key Features

### Command Palette
Press `Ctrl+K` for instant navigation, search, and theme switching.

### Wikilinks & Connections
- `[[Post Title]]` - Standard wikilink
- `[[Post Title|Custom Text]]` - Custom display text
- **Linked mentions** show post connections automatically

### Image Optimization
- **WebP conversion** for performance
- **Responsive grids** for multiple images
- **Lazy loading** built-in

### SEO & Performance
- **Automatic sitemaps** and RSS feeds
- **Open Graph** meta tags
- **95+ Lighthouse scores**
- **Static generation**

## Content Organization

### Tags
Tags sync between Obsidian and your blog, creating:
- Tag pages for related posts
- Command palette filtering
- Organized navigation

### Drafts
- **Development**: All posts visible
- **Production**: Only published posts
- Use `draft: true` in frontmatter to hide

## Deployment

```bash
pnpm run build
```

Generates a static site ready for any hosting platform with automatic optimization.

## Customization

### Modular Features
```typescript
features: {
  readingTime: false,        // Disable if not needed
  commandPalette: true,      // Keep search
  linkedMentions: true,      // Show connections
}
```

### Styling
- **CSS custom properties** for colors
- **Font configuration** options
- **Layout width** settings
- **Component-level** customization

## Troubleshooting

Common issues:
- **Image paths**: Check folder structure in `src/content/posts/images/`
- **Wikilinks**: Ensure target posts exist and are published
- **Build errors**: Verify frontmatter syntax

## Next Steps

1. **Customize** `src/config.ts`
2. **Write** your first post
3. **Explore** [[Markdown Features]]
4. **Set up** Obsidian vault workflow
5. **Deploy** and share

Your modular Astro blog is ready for your content!
