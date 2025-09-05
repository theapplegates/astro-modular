---
title: Getting Started
date: 2024-01-20
description: Everything you need to know to set up, configure, and customize Astro Modular.
image: "[[images/sunset.jpg]]"
imageAlt: Sunset skyline.
imageOG: true
hideCoverImage: false
tags:
  - tutorial
  - setup
  - configuration
  - astro
  - blog
  - obsidian
draft: false
targetKeyword: astro blog setup
---
This guide covers everything needed to set up and customize your modular Astro blog, designed for Obsidian users who want to publish content with minimal friction.

## Prerequisites & Setup

You'll need:
- **Node.js 18+**
- **pnpm** (recommended) or npm
- Basic markdown familiarity
- Obsidian (optional)

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

  seo: {
    defaultOgImageAlt: "Astro Modular logo.",
  },
}
```

## Customization

### Theme & Navigation

Configure theme and navigation in the config:

```TypeScript
 theme: {
    fonts: {
      heading:
        'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      body: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    },
  },
  layout: {
    contentWidth: "40rem",
  }
```

```typescript
navigation: {
  style: 'minimal', // or 'traditional'
  pages: [
    { title: 'Posts', url: '/posts' },
    { title: 'About', url: '/about' }
  ],
  social: [
    { title: 'GitHub', url: 'https://github.com/username', icon: 'github' }
  ],
  homeBlurb: {
    enabled: true,
    placement: "below", 
  },
}
```

Customize colors in `src/styles/global.css`:

```css
:root {
  --color-highlight: 14 165 233; /* Your accent color */
  --color-background: 255 255 255;
  --color-foreground: 15 23 42;
}
```
### Modular Features

Toggle modular features in the config: 
```typescript
features: {
  readingTime: false,
  commandPalette: true,
  linkedMentions: true,
  wordCount: true,
  tableOfContents: true,
  tags: true,
  scrollToTop: true,
  darkModeToggleButton: true,
  showCoverImages: true,
  postNavigation: true,
  showSocialIconsInFooter: false,
},
postsPerPage: 5,
  commandPalette: {
    shortcut: "ctrl+K",
    placeholder: "Search all posts...",
    sections: {
      quickActions: true,
      pages: true,
      social: true,
    },
  }
```

## Content Structure

```
src/content/
├── posts/           # Blog posts
│   ├── images/      # Post images
│   └── *.md         # Markdown files
├── pages/           # Static pages
│   ├── images/      # Page images
│   └── *.md         # Markdown files
└── .obsidian/       # Obsidian vault setup
```

## Writing Posts

Create posts in `src/content/posts/` with this frontmatter:

```markdown
---
title: "Your Post Title"
date: 2024-01-20
description: "Meta & open graph description"
image: "images/cover.jpg"
imageAlt: "Alt text"
imageOG: true
hideCoverImage: false
tags:
  - tutorial
  - astro
draft: true
targetKeyword: "keyword"
---

## Start with H2 Headings

Write using markdown with enhanced features.

Use [[wikilinks]] to connect posts.

> [!note] Obsidian Callouts
> Work exactly like in Obsidian!
```

## Obsidian Integration

### Using the Included Vault

1. **Open `src/content/` in Obsidian**
2. **Trust author and enable plugins** (Astro Composer, Minimal theme)
3. **Write using your normal workflow**
4. **Publish directly by enabling the Git community plugin**

The vault provides:
- **Minimal theme** for distraction-free writing
- **Optional CSS snippets** to customize your experience
- **Custom hotkeys** for accelerating post creation and publishing

To remove Obsidian, simply delete the `.obsidian` folder.

## Key Features

### Command Palette
Press `Ctrl+K` (or custom hotkey) for instant navigation, search, and theme switching.

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
## Troubleshooting

Common issues:
- **Image paths**: Check folder structure in `src/content/posts/images/`
- **Wikilinks**: Ensure target posts exist and are published
- **Build errors**: Verify frontmatter syntax

## Next Steps

1. **Customize** `src/config.ts`
2. **Write** your first post
3. **Explore** [Markdown Features](formatting-reference.md)
4. **Set up** Obsidian vault workflow
5. **Deploy** and share

Your modular Astro blog is ready for your content!
