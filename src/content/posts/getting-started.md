---
title: Getting Started
date: 2024-01-20
description: Everything you need to know to set up, configure, and customize Astro Modular.
tags:
  - tutorial
  - setup
  - configuration
  - astro
  - blog
  - obsidian
image: "[[images/sunset.jpg]]"
imageAlt: Sunset skyline.
imageOG: true
hideCoverImage: false
targetKeyword: astro blog setup
draft: false
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

Configure everything in `src/config.ts`. The configuration is organized in logical sections:

```typescript
export const siteConfig = {
  site: 'https://yourdomain.com',
  title: 'Your Blog Title',
  description: 'Your blog description',
  author: 'Your Name',
  language: 'en',
}
```
## Customization

### Theme & Layout

Select theme and layout options in the config:

```
theme: "oxygen",
layout: {
  contentWidth: "45rem",
},
postsPerPage: 5,
recentPostsCount: 3,
seo: {
    defaultOgImageAlt: "Astro Modular logo.",
  },
homeBlurb: {
  enabled: true,
  placement: "below", // 'above' or 'below'
},
footer: {
  content: `© 2025 {author}. Built with Astro Modular.`,
}
```

The theme options are currently Oxygen, Minimal, Atom, Ayu, Catppuccin, Charcoal, Dracula, Everforest, Flexoki, Gruvbox, macOS, Nord, Obsidian, Rosé Pine, Sky, Solarized, and Things. You may need to do a hard refresh (`CTRL + SHIFT + R`) to see the changes.

### Modular Features

Adjust modular features in the config: 

```
features: {
    flags: {
      readingTime: true,
      wordCount: true,
      tableOfContents: true,
      tags: true,
      linkedMentions: true,
      scrollToTop: true,
      darkModeToggleButton: true,
      commandPalette: true,
      postNavigation: true,
      showLatestPost: true,
      showSocialIconsInFooter: true,
    },
    showCoverImages: "latest-and-posts",
  },
```

**Cover Image Options:**
- `"all"` - Show cover images everywhere
- `"latest"` - Show only on the latest post section and featured posts
- `"home"` - Show on homepage sections (latest and recent)
- `"posts"` - Show only on posts pages, tag pages, and post listings
- `"latest-and-posts"` - Show on latest post section AND posts pages/tags (but not recent posts section)
- `"none"` - Never show cover images

### Navigtation

Navigation is also set in the config:

```
navigation: {
  showNavigation: true,
  style: 'traditional', // or 'minimal'
  showMobileMenu: true,
  pages: [
    { title: 'Posts', url: '/posts' },
    { title: 'About', url: '/about' }
  ],
  social: [
    { title: 'GitHub', url: 'https://github.com/username', icon: 'github' }
  ],
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
tags:
  - tutorial
  - astro
image: "images/cover.jpg"
imageAlt: "Alt text"
imageOG: true
hideCoverImage: false
targetKeyword: "keyword"
draft: true
---

## Start with H2 Headings

Write using markdown with enhanced features.

Use [[wikilinks]] to connect posts.

> [!note] Obsidian Callouts
> Work exactly like in Obsidian!
```

## Creating Pages 

The About page represents a standard page you can duplicate easily. Its frontmatter looks like this: 

```markdown
---
title: "Your Post Title"
description: "Meta & open graph description"
noIndex: false
---

# Start with H1 Headings

Write using markdown with enhanced features.
```

Use the `noIndex` frontmatter Boolean to decide whether or not `<meta name="robots" content="noindex, nofollow">` gets placed on the page. This will tell search engines not to index the page. 

The Contact page has an optional form embedded into it, which leads to the Thank You page when filled out. It's preconfigured to work with Netlify out of the box, you just have to [enable form detection](https://docs.netlify.com/manage/forms/setup/) on your project.

Optional Privacy Policy page can be edited or removed by deleting it if you don't want it. 

`index.md` controls what goes on the homepage blurb. Adding content to `404.md` will display on any "not found" page.
## Obsidian Integration

### Using the Included Vault

1. Open `src/content/` in Obsidian
2. Trust author and enable plugins (Astro Composer, Minimal theme)
3. Start writing

The vault provides:
- **Preconfigured plugins** optimized for this Astro blog
- **Adjustable theme** for distraction-free writing
- **Optional CSS snippets** to customize your experience
- **Custom hotkeys** for accelerating post creation and publishing

Read [the guide](posts/astro-suite-vault-modular-guide.md) for more detailed information.

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