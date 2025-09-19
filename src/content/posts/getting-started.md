---
title: Getting Started
date: 2025-09-07
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
# Available at http://localhost:5000 (or next available port)

# Build for production
pnpm run build
```

## Configuration

### Core Settings

Configure everything in `src/config.ts`. The configuration is organized in sections:

```typescript
export const siteConfig = {
  site: 'https://yourdomain.com',
  title: 'Your Blog Title',
  description: 'Your blog description',
  author: 'Your Name',  // Global author for all posts
  language: 'en',
}
```

## Customization

### Theme & Layout

Select theme and layout options in the config:

```typescript
// Global Settings
theme: "oxygen",
customThemeFile: "custom",
typography: {
  headingFont: "Inter",
  proseFont: "Inter",
},
layout: {
  contentWidth: "45rem",
},
footer: {
  enabled: true,
  content: `© 2025 {author}. Built with Astro Modular.`,
  showSocialIconsInFooter: true,
},
scrollToTop: true,
darkModeToggleButton: true,
seo: {
  defaultOgImageAlt: "Astro Modular logo.",
},
deployment: {
  platform: "netlify",
},
```

The theme options are currently Oxygen, Minimal, Atom, Ayu, Catppuccin, Charcoal, Dracula, Everforest, Flexoki, Gruvbox, macOS, Nord, Obsidian, Rosé Pine, Sky, Solarized, Things, and Custom. Theme changes are visible in real-time with `pnpm dev`.

### Custom Themes

You can create your own custom themes by:

1. **Rename the template**: Rename `src/themes/custom/custom.ts` to whatever you want
2. **Modify colors**: Update the color scales to match your design
3. **Update config**: 
   - Set `theme: "custom"` in `src/config.ts`
   - Set `customThemeFile: "your-theme-name"` (filename without .ts extension)
4. **Test**: Use `pnpm dev` to see your theme changes in real-time

The system automatically finds and uses your custom theme!

See `src/themes/custom/README.md` for detailed instructions and best practices.

### Typography Configuration

Customize fonts for headings and body text:

```typescript
typography: {
  headingFont: "Inter", // Font for headings (h1, h2, h3, h4, h5, h6)
  proseFont: "Inter",   // Font for body text and prose content
}
```

**Suggested Font Combinations:**
- **Default**: `headingFont: "Inter"`, `proseFont: "Inter"`
- **Modern: `headingFont: "Montserrat"`, `proseFont: "Lato"`
- **Elegant: `headingFont: "Playfair Display"`, `proseFont: "Source Sans Pro"`
- **Serif: `headingFont: "Merriweather"`, `proseFont: "Merriweather"`

**Supported Fonts:**
- **Sans-Serif**: Inter, Roboto, Open Sans, Lato, Poppins, Source Sans Pro, Nunito, Montserrat
- **Serif**: Playfair Display, Merriweather, Lora, Crimson Text, PT Serif, Libre Baskerville
- **Monospace**: Fira Code, JetBrains Mono, Source Code Pro, IBM Plex Mono, Cascadia Code

The system automatically loads Google Fonts when needed and provides fallbacks to system fonts for optimal performance.

### Command Palette

The command palette provides instant navigation and search functionality:

```typescript
commandPalette: {
  enabled: true,
  shortcut: "ctrl+K",
  placeholder: "Search posts",
  sections: {
    quickActions: true,
    pages: true,
    social: true,
  },
}
```

**Features:**
- **Instant Search**: Press `Ctrl+K` to search posts, pages, and projects
- **Quick Actions**: Theme switching, navigation shortcuts
- **Customizable**: Change shortcut, placeholder text, and enabled sections

### Profile Picture

Add a personal touch with a configurable profile picture:

```typescript
profilePicture: {
  enabled: true,
  image: "/profile.jpg",        // Path to your image (place in public/ directory)
  alt: "Profile picture",       // Alt text for accessibility
  size: "md",                   // "sm" (32px), "md" (48px), or "lg" (64px)
  url: "/about",                // Optional URL to link to when clicked
  placement: "footer",          // "footer" or "header"
  style: "circle",              // "circle", "square", or "none"
}
```

**Features:**
- **Flexible Placement**: Header (replaces text logo) or Footer
- **Multiple Styles**: Circle (profile photos), Square (logos), None (banners)
- **Responsive**: Different layouts for mobile and desktop
- **Theme-Aware**: Styling adapts to all available themes

### Homepage Configuration

The homepage content is controlled by the `homeOptions` section:

- **Featured Post**: Show latest post or a specific featured post
- **Recent Posts**: Display recent posts with configurable count
- **Projects & Docs**: Show featured projects and documentation
- **Home Blurb**: Control placement or disable completely

When only one content type is enabled, it gets special treatment with centered "View all" links. When only the blurb is shown, it displays as a proper page with H1 title and rounded container styling.

### Post Options

Configure post-related features in the `postOptions` section:

```typescript
postOptions: {
  postsPerPage: 6,
  readingTime: true,
  wordCount: true,
  tableOfContents: true,
  tags: true,
  linkedMentions: {
    enabled: true,
    linkedMentionsCompact: false,
  },
  postNavigation: true,
  showPostCardCoverImages: "latest-and-posts",
  postCardAspectRatio: "og",
  customPostCardAspectRatio: "2.5/1",
  comments: {
    enabled: false,
    provider: "giscus",
    // ... other comment settings
  },
}
```

**Table of Contents:**

Enabling table of contents is a global toggle for all posts. This is different from the other content types, like pages, which get a per-page TOC toggle via frontmatter.

**Linked Mentions Features:**
- `linkedMentions: true` - enable linked mentions section at the end of the page showing which posts reference the current post
- `linkedMentionsCompact: false` - choose between detailed view (default) or compact view for linked mentions

**Cover Image Options:**
- `"all"` - show cover images on all post cards
- `"latest"` - show only on the latest post section and featured posts
- `"home"` - show only on homepage sections (latest and recent)
- `"posts"` - show only on posts pages, tag pages, and post cards
- `"latest-and-posts"` - show on latest post section AND posts pages/tags cards (but not recent posts section)
- `"none"` - never show cover images on post cards

**Post Card Aspect Ratio:**
Configure the aspect ratio for post card cover images:

```typescript
postOptions: {
  postCardAspectRatio: "og", // Default: OpenGraph standard
  customPostCardAspectRatio: undefined, // For custom ratios
}
```

**Aspect Ratio Options:**
- `"og"` (1.91:1) - open graph standard (default)
- `"16:9"` (1.78:1) - standard widescreen
- `"4:3"` (1.33:1) - traditional
- `"3:2"` (1.5:1) - classic photography
- `"square"` (1:1) - square
- `"golden"` (1.618:1) - golden ratio
- `"custom"` - use your own ratio

**Custom Aspect Ratio Example:**
```typescript
postOptions: {
  postCardAspectRatio: "custom",
  customPostCardAspectRatio: "2.5/1" // Custom 2.5:1 ratio
}
```

*Note: This only affects post cards (listings, homepage, tag pages). Individual post cover images maintain their original aspect ratio.*

### Comments System

The theme includes a Giscus-powered commenting system that uses GitHub Discussions. Here's how to set it up:

#### Enable Comments

In your `src/config.ts`, enable comments:

```typescript
postOptions: {
  comments: {
    enabled: true,  // Enable/disable comments
    // ... other comment settings
  }
}
```

#### GitHub Setup

1. **Enable Discussions on Your Repository**:
   - Go to your GitHub repository
   - Click **Settings** → **General**
   - Scroll to **"Features"** section
   - Check **"Discussions"** and click **"Set up discussions"**

2. **Create a Discussion Category**:
   - Go to **Discussions** tab in your repository
   - Click **"New category"**
   - Name it **"General"**
   - Set format to **"Announcement"** (prevents random users from creating new discussions)
   - Description: "Comments on blog posts"

3. **Get Giscus Configuration**:
   - Visit [giscus.app](https://giscus.app)
   - Enter your repository: `username/repo-name`
   - Select **"General"** as the discussion category
   - Copy the generated **Repository ID** and **Category ID**

1. **Update Your Config**:

```typescript
postOptions: {
  comments: {
    enabled: true,
    provider: "giscus",
    repo: "username/repo-name",        // Your GitHub repository
    repoId: "R_kgDO...",              // Repository ID from Giscus
    category: "General",               // Discussion category
    categoryId: "DIC_kwDO...",        // Category ID from Giscus
    mapping: "pathname",               // How posts map to discussions
    strict: "0",                      // Allow comments on any post
    reactions: "1",                   // Enable reactions
    metadata: "0",                    // Hide discussion metadata
    inputPosition: "bottom",          // Comment input position
    theme: "preferred_color_scheme",  // Follows user's theme preference
    lang: "en",                       // Language
    loading: "lazy",                  // Lazy load comments
  }
}
```

#### How It Works

- **Each blog post** automatically creates a GitHub discussion
- **Visitors need GitHub accounts** to comment
- **Comments appear** both on your blog and in GitHub Discussions
- **You moderate** through GitHub's interface
- **"Announcement" format** prevents random discussion creation

#### Moderation & Control

- **Delete comments** directly in GitHub Discussions
- **Block users** through GitHub's user management
- **Lock discussions** to prevent new comments
- **Pin important comments** to the top
- **Use GitHub's content policies** for automatic moderation

#### Privacy Considerations

Comments are publicly visible and associated with users' GitHub profiles. Consider adding a privacy policy section about comments (see the included Privacy Policy page for reference).


## Content Structure

```
src/content/
├── posts/                   # Blog posts
│   ├── images/              # Shared post images
│   ├── getting-started.md   # File-based post
│   └── sample-folder-post/  # Folder-based post
│       ├── index.md         # Main content file
│       ├── hero-image.jpg   # Post-specific assets
│       └── diagram.png
├── pages/                   # Static pages
│   ├── images/              # Shared page images
│   ├── about.md
│   ├── contact.md
│   ├── privacy-policy.md
│   └── index.md             # Homepage blurb content
├── projects/                # Featured projects
│   ├── images/              # Shared project images
│   └── sample-project/      # Folder-based project
│       ├── index.md
│       └── screenshot.png
├── docs/                    # Documentation
│   ├── images/              # Shared doc images
│   └── sample-guide.md      # Documentation files
└── .obsidian/               # Obsidian vault setup
    ├── plugins/             # Configured plugins
    ├── themes/              # Minimal theme
    └── snippets/            # Custom CSS snippets
```

## Writing Posts

Create posts in `src/content/posts/` with this frontmatter:

```markdown
---
title: "{{title}}"
date: {{date}}
description: ""
tags: []
image: ""
imageAlt: ""
imageOG: false
hideCoverImage: false
targetKeyword: ""
draft: true
---

## Start with H2 Headings

Write using markdown with enhanced features.

Use [[wikilinks]] or [markdown links](/posts/post.md) to connect posts.

> [!note] Obsidian Callouts
> Work exactly like in Obsidian!
```

Since the post title is hardcoded as H1, your content should start with H2 headings.

You can also create folder-based posts, as you can see here: [Sample Folder-Based Post](posts/sample-folder-post/index.md). The base filename is `index.md` and the parent folder filename serves as the slug of the post.
## Creating Pages 

The About page represents a standard page you can duplicate easily. Its frontmatter looks like this: 

```markdown
---
title: "{{title}}"
description: ""
hideTOC: false
noIndex: false
---

## Start with H2 Headings

Write using markdown with enhanced features.
```

H1s are hardcoded from the title frontmatter like posts, but pages get a unique `noIndex` property that sets whether or not the page should be indexed in search engines or included on the sitemap. Helpful for pages that you don't want indexed like a thank-you page.

### Other Page Details

The Contact page has an optional form embedded into it, which leads to the Thank You page when filled out. It's preconfigured to work with Netlify out of the box, you just have to [enable form detection](https://docs.netlify.com/manage/forms/setup/) on your project.

An optional Privacy Policy page can be edited or removed by deleting it if you don't want it. 

`pages/index.md` controls what goes on the homepage blurb. Adding content to `pages/404.md` will display on any "not found" page.

## Creating Projects

Create projects in `src/content/projects/` to showcase your work. Projects support both single files and folder-based organization:

```markdown
---
title: "{{title}}"
description: "Project description"
date: {{date}}
categories: ["Web Development", "Open Source"]
repositoryUrl: "https://github.com/username/repo"
demoUrl: "https://your-demo.com"
status: "completed"  # "in-progress" or "completed"
image: "cover.jpg"
imageAlt: "Project screenshot"
hideCoverImage: false
hideTOC: false
draft: false
featured: true
---
```

**Featured flag**: Show on homepage when enabled.

## Creating Documentation

Create documentation in `src/content/docs/` for guides and references:

```markdown
---
title: "{{title}}"
description: "Documentation description"
category: "Setup"  # Optional - creates "Unsorted" if missing
order: 1
version: "1.0.0"
lastModified: 2024-01-15
image: "hero.jpg"
imageAlt: "Documentation screenshot"
hideCoverImage: false
hideTOC: false
draft: false
featured: true
---
```

Sort docs within categories by `order` number. Use `featured` to show on homepage when enabled.

## Automatic Aliases & Redirects

When you rename a content type (post or page by default, but configurable in settings) in Obsidian, the old filename is automatically stored as an alias. Astro processes these aliases and creates redirect rules, so old URLs continue to work. You don't need to add aliases manually - they appear automatically when you use Obsidian's rename functionality.

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
Press `Ctrl+K` (or custom hotkey) for instant navigation, search, and dark/light mode switching.

### Post Internal Linking & Connections
- `[[Post Title|Custom Text]]` - wikilinks (posts only)
- `[Post Title](posts/post-slug.md)` - standard markdown links
- **Linked mentions** show post connections automatically with collapsible interface
- **Compact or detailed view** options for linked mentions display

### Linking Between Content Types

**Wikilinks** work seamlessly for posts but are limited to the posts collection only. For linking to other content types (pages, projects, docs), use standard markdown links:

- **Posts**: `[[Post Title]]` or `[Custom Text](posts/post-slug.md)`
- **Pages**: `[Page Title](page-slug)` (e.g., `[About](pages/about.md)`)
- **Projects**: `[Project Name](projects/project-slug.md)`
- **Docs**: `[Documentation](docs/doc-slug.md)`

**Why this limitation?** Wikilinks assume posts for simplicity and to maintain the seamless Obsidian experience. Standard markdown links provide explicit control over which content type you're linking to, preventing confusion when multiple content types might have similar titles.

### Image Optimization
- **WebP conversion** for performance
- **Responsive grids** for multiple images
- **Lazy loading** built-in

### SEO & Performance
- **Automatic sitemaps** and RSS feeds
- **Open Graph** meta tags
- **Optimized for performance and accessibility**
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
3. **Explore** [Formatting Reference](formatting-reference.md)
4. **Set up** Obsidian vault workflow
5. **Deploy** and share

Your modular Astro blog is ready for your content!