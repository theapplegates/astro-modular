# AI Agent Guide for Astro Modular Theme

This document contains essential information for AI agents working with this Astro-based blog theme. It combines development practices, folder-based content organization, technical implementation details, and the project's vision for seamless Obsidian-to-web publishing.

## 🚨 CRITICAL: Primary Information Sources

**⚠️ AI AGENTS MUST READ THIS SECTION FIRST ⚠️**

**The most up-to-date and accurate information is found in these blog posts:**

1. **[Getting Started Guide](src/content/posts/getting-started.md)** - Complete setup, configuration, and workflow information
2. **[Astro Suite Vault Guide](src/content/posts/astro-suite-vault-modular-guide.md)** - Obsidian vault configuration and usage

**These blog posts should be treated as the authoritative source of truth.** Use the information in this AGENTS.md file as supplementary technical documentation, but always reference the blog posts for the most current and accurate user-facing information.

**When in doubt, check the blog posts first.**

## Table of Contents

1. [Project Vision & Philosophy](#project-vision--philosophy)
2. [Development Environment](#development-environment)
3. [Content Organization](#content-organization)
4. [Obsidian Integration](#obsidian-integration)
5. [Image Handling](#image-handling)
6. [Build Process](#build-process)
7. [Theme Updates](#theme-updates)
8. [Configuration & Customization](#configuration--customization)
   - [Typography Configuration](#typography-configuration)
9. [Troubleshooting](#troubleshooting)
10. [Best Practices](#best-practices)
11. [Common AI Agent Mistakes](#common-ai-agent-mistakes)

## Project Vision & Philosophy

### Core Mission
Astro Modular is an Astro blog theme template designed for **Obsidian users**, created by [David V. Kimball](https://davidvkimball.com). This theme turns Obsidian into a powerful CMS for instant blog publishing, bridging the gap between your Obsidian vault and a production-ready blog.

The theme is built on four core principles:

#### **Clarity First**
Content should be the star, not the design. Every element is carefully crafted to enhance readability and focus attention on what matters most - your ideas and writing.

#### **Highly Performant**
Fast loading times and smooth interactions are not optional. Every aspect of this theme has been optimized to deliver exceptional performance across all devices.

#### **Works with Obsidian**
If you use Obsidian, this theme is a natural extension of your workflow. All rich markdown and extended markdown features, including Wikilinks, callouts, and other embedded features, display seamlessly between your vault and published site.

#### **Modular Design**
Every feature can be toggled on or off through a single configuration file. Enable only what you need, keeping your site fast and focused on your specific use case.

### Key Design Principles

#### 1. **Built for Obsidian Users**
- **Direct Obsidian integration** - Write in a dedicated vault, publish to your blog
- **Wikilinks support** - `[[Internal Links]]` and `[[Link|Custom Text]]` work seamlessly
- **Obsidian callouts** - Full support for `> [!note]`, `> [!tip]`, `> [!warning]` and more
- **Tag compatibility** - Your Obsidian tags become blog tags automatically
- **Frontmatter sync** - Compatible metadata structure between Obsidian and Astro
- **Folder-based organization** - Keep content and assets together in dedicated folders
- **Obsidian bracket syntax** - Support for `[[image.jpg]]` syntax in image references
- **[Astro Suite Obsidian Vault](https://github.com/davidvkimball/obsidian-astro-suite) built-in** - Includes Obsidian vault configuration for streamlined publishing

#### 2. **Flexible & Customizable**
- **Modular design** - Each feature can be enabled/disabled independently
- **Multiple color options** - Select from a variety of prebuilt themes (Oxygen, Minimal, Atom, Ayu, Catppuccin, Charcoal, Dracula, Everforest, Flexoki, Gruvbox, macOS, Nord, Obsidian, Rosé Pine, Sky, Solarized, and Things)
- **Custom typography** - Separate font configuration for headings and body text with 20+ supported fonts
- **TypeScript throughout** for type safety and better development experience
- **Command palette** - Press `Ctrl+K` (or custom hotkey) for instant navigation and search
- **Responsive image grids** - Automatic layouts for multiple consecutive images
- **Dark/light themes** - System preference detection with manual toggle
- **SEO ready** - Automatic sitemaps, RSS feeds, and Open Graph images

#### 3. **Content Management Excellence**
- **Markdown-first** with enhanced processing and reading time estimation
- **Folder-based posts** - Organize content and assets in dedicated folders (like Fuwari)
- **Draft support** - Show drafts in development, hide in production
- **Image optimization** with WebP format priority and responsive layouts
- **Table of contents** auto-generation from headings

#### 4. **Navigation & Discovery**
- **Fuzzy search** through all content via command palette
- **Linked mentions** - See which posts reference each other
- **Tag filtering** and next/previous navigation between posts

### Target Audience
- **Obsidian power users** who want to publish their notes
- **Content creators** who prefer markdown-first workflows
- **Developers** who want a customizable, performant blog
- **Writers** who value seamless editing and publishing experience

## Development Environment

### Package Management
- **Package Manager**: This project uses `pnpm` instead of `npm` for all package and script commands
- **Scripts**: All commands should use `pnpm run <script-name>`

### Development Server
- **Command**: `pnpm run dev`
- **Port**: 5000 (with fallback to 5001 if occupied)
- **Host**: localhost
- **Hot Reload**: Enabled with file watching

### 🚨 CRITICAL: Vite File System Security

**⚠️ AI AGENTS MUST READ THIS SECTION CAREFULLY ⚠️**

**NEVER disable `vite.server.fs.strict`** in the Astro configuration. This is a **CRITICAL security requirement**.

#### **Why This Matters**
- **Security**: `fs.strict: false` allows access to files outside the project directory
- **Network Exposure**: Files on your machine become accessible on your network
- **Best Practice**: Vite's strict mode is the default for good security reasons
- **Professional Standards**: Production sites should maintain proper file system boundaries

#### **What NOT to Do**
```javascript
// ❌ WRONG - Never disable Vite strict mode
vite: {
  server: {
    fs: {
      strict: false,  // NEVER DO THIS
      allow: ['..']   // NEVER DO THIS
    }
  }
}
```

#### **What to Do Instead**
- **Keep Vite strict mode enabled** (default behavior)
- **Use proper file paths** within the project directory
- **Handle file system errors gracefully** without compromising security
- **Use environment variables** for development-specific configurations

**This is CRITICAL for maintaining security and professional development standards.**

### 🚨 CRITICAL: Production Logging Guidelines

**⚠️ AI AGENTS MUST READ THIS SECTION CAREFULLY ⚠️**

**NEVER use raw `console.log()` statements in production code.** This project maintains clean console output for professional deployments.

#### **Why This Matters**
- **Production Performance**: Console logs slow down production sites
- **User Experience**: Console spam degrades user experience
- **Professional Standards**: Production sites should have clean console output

#### **Simple Rule**
- **Development**: Console logs are acceptable for debugging
- **Production**: No console output should appear in the final build
- **Use the project's logger utility** (`src/utils/logger.ts`) for any logging needs

### 🎨 CRITICAL: Color Usage Guidelines

**⚠️ AI AGENTS MUST READ THIS SECTION CAREFULLY ⚠️**

This project uses a **dynamic theming system** where colors are defined in theme variables, not hardcoded values. This is **CRITICAL** for maintaining theme consistency and allowing users to switch between different color schemes.

#### **Why This Matters**
- **Theme Consistency**: All colors should work across all 17+ available themes
- **User Experience**: Users can switch themes and colors should adapt automatically
- **Maintainability**: Color changes only need to be made in one place (theme definitions)
- **Professional Standards**: Hardcoded colors break the theming system

#### **How to Use Theme Colors**

**✅ CORRECT - Use theme variables from Tailwind config**
```typescript
// Use Tailwind classes that reference theme variables
@apply bg-primary-50 dark:bg-primary-800
@apply text-primary-900 dark:text-primary-100
@apply border-primary-200 dark:border-primary-600
@apply text-highlight-600 dark:text-highlight-400
```

**❌ WRONG - Never use hardcoded color values**
```typescript
// BAD - Hardcoded colors break theming
background: white;
color: #1f2937;
border: 1px solid #e5e7eb;
box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
```

#### **Available Theme Color Variables**

**Primary Colors** (defined in `src/themes/index.ts`):
- `primary-50` through `primary-950` - Main theme colors
- `primary-100` - Light backgrounds, subtle elements
- `primary-200` - Borders, dividers, table headers
- `primary-300` - Muted text, secondary elements
- `primary-400` - Medium emphasis text
- `primary-500` - Default text color
- `primary-600` - High emphasis text
- `primary-700` - Dark backgrounds, strong elements
- `primary-800` - Darker backgrounds, headers
- `primary-900` - Darkest backgrounds, high contrast text

**Highlight Colors** (accent colors):
- `highlight-50` through `highlight-950` - Accent colors
- `highlight-400` - Links, interactive elements (light mode)
- `highlight-600` - Links, interactive elements (dark mode)
- `highlight-500` - Default highlight color

#### **Theme Color Usage Patterns**

**Backgrounds:**
```typescript
// Light backgrounds
@apply bg-primary-50 dark:bg-primary-800
@apply bg-primary-100 dark:bg-primary-700

// Dark backgrounds  
@apply bg-primary-900 dark:bg-primary-50
@apply bg-primary-800 dark:bg-primary-100
```

**Text Colors:**
```typescript
// High contrast text
@apply text-primary-900 dark:text-primary-50
@apply text-primary-800 dark:text-primary-100

// Medium emphasis text
@apply text-primary-600 dark:text-primary-300
@apply text-primary-500 dark:text-primary-400

// Muted text
@apply text-primary-400 dark:text-primary-500
```

**Borders and Dividers:**
```typescript
// Subtle borders
@apply border-primary-200 dark:border-primary-600
@apply border-primary-300 dark:border-primary-500

// Strong borders
@apply border-primary-400 dark:border-primary-400
```

**Interactive Elements:**
```typescript
// Links and buttons
@apply text-highlight-600 dark:text-highlight-400
@apply hover:text-highlight-700 dark:hover:text-highlight-300

// Focus states
@apply focus:ring-highlight-500 dark:focus:ring-highlight-400
```

#### **Where to Find Theme Definitions**

1. **Main Theme Config**: `src/themes/index.ts` - Contains all theme definitions
2. **Tailwind Config**: `tailwind.config.mjs` - Maps theme variables to Tailwind classes
3. **Current Theme**: `src/config.ts` - Shows which theme is currently active

#### **Action Required for AI Agents**

1. **ALWAYS** use Tailwind classes that reference theme variables
2. **NEVER** use hardcoded color values like `#ffffff`, `rgb(255, 255, 255)`, or `white`
3. **CHECK** existing code for hardcoded colors and replace them
4. **USE** the dark mode variants (`dark:`) for all color definitions
5. **REFERENCE** the theme files to understand available color scales

#### **Example Conversion**

```typescript
// Before (BAD - hardcoded colors)
.table-wrapper {
  background: white;
  border: 1px solid #e5e7eb;
  color: #1f2937;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
}

.dark .table-wrapper {
  background: #1e293b;
  border-color: #475569;
  color: #f1f5f9;
}

// After (GOOD - theme variables)
.table-wrapper {
  @apply bg-white dark:bg-primary-800;
  @apply border border-primary-200 dark:border-primary-600;
  @apply text-primary-900 dark:text-primary-100;
  @apply shadow-sm;
}
```

**This is CRITICAL for maintaining the theming system and user experience across all themes.**

### Key Scripts
```bash
pnpm run dev              # Start development server
pnpm run build            # Build for production
pnpm run check-images     # Check for missing images
pnpm run sync-images      # Sync images from content to public
pnpm run process-aliases  # Process content aliases
pnpm run generate-redirects # Generate redirects
```


## Content Organization

### Folder-Based Posts Structure

The theme supports both traditional single-file posts and folder-based posts for better asset organization.

#### Traditional Posts
```
src/content/posts/
├── traditional-post.md
└── another-post.md
```

#### Folder-Based Posts
```
src/content/posts/
├── traditional-post.md
├── folder-based-post/
│   ├── index.md          # Main content file
│   ├── hero-image.jpg    # Assets co-located
│   ├── gallery-1.jpg
│   ├── diagram.png
│   └── document.pdf
└── another-folder-post/
    ├── index.md
    └── cover.jpg
```

### URL Generation
- **Folder name becomes the slug**: `folder-based-post` → `/posts/folder-based-post/`
- **index.md contains the content**: Main content goes in the `index.md` file
- **Assets are co-located**: All related files stay in the same folder

### Content Schema

#### Posts Collection
```typescript
{
  title: string;
  description: string;
  date: Date;
  tags?: string[];
  draft?: boolean;
  image?: string;
  imageOG?: boolean;
  imageAlt?: string;
  hideCoverImage?: boolean;
  targetKeyword?: string;
  // Note: author is global via siteConfig.author, not per-post
  // Note: noIndex is available but typically used for pages only
}
```

#### Pages Collection
```typescript
{
  title: string;
  description: string;
  draft?: boolean;
  lastModified?: Date;
  image?: string;
  imageAlt?: string;
  hideCoverImage?: boolean;
  noIndex?: boolean;  // Commonly used for pages
}
```

### H1 Title Handling - CRITICAL DISTINCTION

**IMPORTANT**: Both Posts and Pages now handle H1 titles the same way:

#### Posts (PostLayout)
- **H1 is HARDCODED** in the layout using `{post.data.title}` from frontmatter
- **NO H1 in markdown content** - posts should NOT have `# Title` in their markdown
- **Layout controls styling** - H1 styling is handled by the PostLayout component
- **Example**: Post frontmatter has `title: "My Post"` → Layout renders `<h1>My Post</h1>`

#### Pages (PageLayout)  
- **H1 is HARDCODED** in the layout using `{page.data.title}` from frontmatter
- **NO H1 in markdown content** - pages should NOT have `# Title` in their markdown
- **Layout controls styling** - H1 styling is handled by the PageLayout component
- **Example**: Page frontmatter has `title: "About"` → Layout renders `<h1>About</h1>`

#### Why This Matters
- **Both Posts and Pages**: Title comes from frontmatter, layout handles presentation
- **Content starts with H2**: Since H1 is hardcoded in the layout, all content should start with `##` headings
- **Consistency**: Both use the same approach for titles and content structure
- **AI Agents**: NEVER add H1 to any markdown content - both posts and pages have hardcoded H1s from frontmatter

## Obsidian Integration

For complete Obsidian setup and usage instructions, see the [Astro Suite Vault Guide](src/content/posts/astro-suite-vault-modular-guide.md).

### Astro Suite Vault Philosophy
The included Obsidian vault follows three core principles:
1. **Plug-and-play Astro blogging experience**
2. **Emphasis on modularity**
3. **Customize your experience to get it just right**

### Vault Setup & Configuration

#### Theme & Visual Experience
- **Minimal Theme** - Understated color scheme with high contrast options
- **Minimal Theme Settings** - Complete control over your experience
- **Hider Plugin** - Remove distracting UI elements
- **Style Settings** - Fine-tune visual appearance
- **Custom CSS Snippets** - Optional enhancements for window management and mobile interface
  - `astro-modular-styling` - Gives embedded HTML elements similar look to frontend
  - `custom-draggable-top-area.css` - Makes window moving easier when frame is hidden
  - `hide-properties-heading-and-add-properties-button.css` - Alternative to Style Settings plugin
  - `hide-tabs-icon-mobile.css` - Removes tabs icon in mobile version
  - `hide-longpress-flair-mobile.css` - Simplifies mobile interface
  - `hide-header-title-mobile.css` - Simplifies mobile interface

#### Essential Hotkeys for AI Agents
When working with the Obsidian vault, these hotkeys are crucial:
- **Toggle left side panel**: `CTRL + ALT + Z`
- **Toggle right side panel**: `CTRL + ALT + X`
- **Toggle tab bar**: `CTRL + ALT + S`
- **Navigate back**: `ALT + ←`
- **Navigate forward**: `ALT + →`
- **Open homepage**: `CTRL + M`
- **Add property**: `CTRL + ;`
- **Toggle reading view**: `CTRL + E`
- **Toggle Zen mode**: `CTRL + SHIFT + Z`
- **Insert image**: `CTRL + '`
- **Insert callout**: `CTRL + SHIFT + C`
- **Rename note**: `CTRL + R`
- **Start Terminal**: `CTRL + SHIFT + D`
- **Open config file**: `CTRL + SHIFT + ,`
- **Git Commit and Sync**: `CTRL + SHIFT + S`

*Note: On Mac, `CTRL` = `CMD`*

### Key Plugins for Content Creation

#### Astro Composer
- **Purpose**: Easily create new notes as Astro blog posts
- **Functionality**: 
  - Creates kebab-case filenames from titles automatically
  - Supports `CTRL + R` for easy renaming
  - Generates default properties automatically
  - Works with both wikilinks and standard markdown links
  - Supports "Standardize properties" command for organizing properties
  - Allows copying heading links by right-clicking headings
- **Critical**: Unlike other themes, this theme supports **any internal link that works with Obsidian** without conversion

#### Homepage and Default New Tab Page
- **Home Base**: Default screen shows a `.base` file with all blog posts in reverse-chronological order
- **Location**: Nested in `_bases` folder (underscore prefix prevents Astro processing)
- **Customization**: Note properties in views can be customized

#### Content Management Plugins
- **Paste Image Rename**: Quickly rename images with kebab-case, SEO-friendly names
- **Image Inserter**: Pull images from Unsplash with `CTRL + '`
- **Title-Only Tab**: Uses `title` property instead of filename for tabs
- **Property Over Filename**: Use `title` property as primary identifier for linking/searching
- **Alias Filename History**: Stores old filenames as aliases for URL redirects
  - Automatically stores old filenames when renaming posts/pages
  - Configurable regex for ignoring names (like `Untitled` or `_` prefix)
  - Adjustable timeout and parent folder name tracking

#### Focus & Productivity
- **ProZen**: Full-screen writing mode with `CTRL + SHIFT + Z`
- **Disable Tabs**: Optional - new tabs replace current ones (great with hidden tab bar)
- **Shell Commands**: Quick access to terminal and config file
- **BRAT (Temporary)**: Used temporarily to load plugins before they're available in the official directory

### Git Integration
- **Git Plugin**: Publish to Astro blog without leaving Obsidian
- **Command**: `CTRL + SHIFT + S` for commit and sync
- **Configuration**: Requires git setup to enable

### Content Workflow
1. **Write in Obsidian** using the configured vault
2. **Use wikilinks** for internal connections (`[[Post Title]]` or `[[Post Title|Custom Text]]`)
3. **Add images** with `CTRL + '` and automatic SEO-friendly naming
4. **Create callouts** with `CTRL + SHIFT + C`
5. **Publish** with `CTRL + SHIFT + S` (git commit and sync)
6. **Content appears** on your Astro blog automatically

### Automatic Aliases & Redirects
When you rename a post or page in Obsidian, the old filename is automatically stored as an alias. Astro processes these aliases and creates redirect rules, so old URLs continue to work. You don't need to add aliases manually - they appear automatically when you use Obsidian's rename functionality.

### Vault Structure
```
src/content/
├── posts/                   # Blog posts
│   ├── images/              # Shared post images
│   ├── getting-started.md   # File-based post
│   ├── sample-folder-post/  # Folder-based post
│   │   ├── index.md         # Main content file
│   │   ├── hero-image.jpg   # Post-specific assets
│   │   ├── diagram.png
│   │   └── document.pdf
│   └── another-post/        # Another folder-based post
│       ├── index.md
│       └── cover.jpg
├── pages/                   # Static pages
│   ├── images/              # Shared page images
│   ├── about.md
│   ├── contact.md
│   └── privacy.md
└── .obsidian/               # Obsidian vault setup
    ├── plugins/             # Configured plugins
    ├── themes/              # Minimal theme
    └── snippets/            # Custom CSS snippets
```

## Page Transitions with Swup

### Swup Integration

This project uses **Swup** for client-side page transitions to provide a smooth, app-like navigation experience.

#### Configuration
- **Location**: `astro.config.mjs` - Swup is configured as an Astro integration
- **Accessibility**: Currently disabled (`accessibility: false`) to prevent invalid `tabindex` attributes on body elements
- **Containers**: Uses `#swup-container` as the main content container
- **Smooth Scrolling**: Disabled (handled by custom implementation)
- **Caching**: Enabled for better performance
- **Preloading**: Enabled for faster navigation

#### Important Notes for AI Agents
- **Accessibility Warnings**: Swup can add `tabindex` attributes to body elements, causing accessibility warnings. This is why `accessibility: false` is set in the config.
- **Container Structure**: All page content must be wrapped in `#swup-container` for transitions to work
- **Image Loading**: Swup doesn't interfere with image loading attributes - these are handled by the PostCard and ImageWrapper components
- **Navigation**: Internal links automatically use Swup transitions when available

#### Swup Hooks and Custom Behavior
The project includes custom Swup behavior in `BaseLayout.astro`:
- **Scroll Management**: Custom scroll behavior to prevent unwanted scrolling during transitions
- **Content Replacement**: Handles content updates after page transitions
- **Mobile Menu**: Closes mobile menu on navigation

## Image Handling

### Critical Distinction: Post Cards vs Post Content Images

**IMPORTANT**: There are two completely separate image systems in this project:

#### 1. Post Card Images (Listings, Homepage, Tag Pages)
- **Controlled by**: `siteConfig.features.showCoverImages` in `config.ts`
- **Options**: `"all"`, `"latest"`, `"home"`, `"posts"`, `"latest-and-posts"`, `"none"`
- **Current Setting**: `"latest-and-posts"` (shows on latest posts and posts/tags pages)
- **Frontmatter**: The `image` field in post frontmatter is used for card images
- **NOT affected by**: `hideCoverImage` frontmatter field
- **Loading**: Uses `eager` loading for first post on pages, `lazy` for others

#### 2. Post Content Images (Inside Individual Posts)
- **Controlled by**: `hideCoverImage` frontmatter field
- **Purpose**: Controls whether the main post image appears in the post content
- **Loading**: Always uses `eager` loading and `fetchpriority="high"`
- **Location**: Rendered by `PostContent.astro` component

#### Key Rules for AI Agents
- **Never confuse these two systems** - they are completely independent
- **Post card visibility** is controlled by `showCoverImages` config, not frontmatter
- **Post content visibility** is controlled by `hideCoverImage` frontmatter
- **Performance warnings** about "unoptimized loading" typically refer to post card images
- **Accessibility warnings** about "redundant alt text" can affect both systems

### Development Mode Graceful Error Handling

When working with Obsidian and actively editing content, missing image errors are handled gracefully:

1. **Graceful Fallbacks**: Missing images are automatically replaced with placeholder images
2. **Development Warnings**: Console warnings help identify missing images (only in dev mode)
3. **Continued Development**: The build process continues even with missing images
4. **Visual Indicators**: Placeholder images clearly indicate missing assets

### Placeholder Images

The system automatically uses placeholder images when assets are missing:
- **Posts**: `/posts/images/placeholder.jpg`
- **Pages**: `/pages/images/placeholder.jpg`
- **Default**: `/posts/images/placeholder.jpg`

### Image Reference Formats

#### Relative Paths (Recommended)
```markdown
![Image](image.jpg)
![Another Image](subfolder/image.png)
```

#### Obsidian Bracket Syntax
```markdown
![Image]([[image.jpg]])
![Another Image]([[subfolder/image.png]])
```

#### Frontmatter Images
```yaml
---
image: cover.jpg
imageAlt: Cover image description
---
```

Or with Obsidian bracket syntax:
```yaml
---
image: "[[cover.jpg]]"
imageAlt: Cover image description
---
```

### Image Resolution Logic

The theme automatically handles image resolution for folder-based posts:
- **Relative paths** (`image.jpg`) → `/posts/post-slug/image.jpg`
- **Absolute paths** (`/images/image.jpg`) → `/images/image.jpg`
- **External URLs** (`https://...`) → Used as-is

### Development Tools

#### Check Missing Images
```bash
pnpm run check-images
```

This script will:
- Scan all markdown files for image references
- Check if referenced images exist
- Report missing images with file locations and line numbers
- Provide helpful tips for fixing issues

#### Development Configuration

Located in `src/config/dev.ts`:

```typescript
export const devConfig = {
  images: {
    showPlaceholders: true,        // Show placeholder images
    logMissingImages: true,        // Log missing images to console
    fallbacks: {
      posts: '/posts/images/placeholder.jpg',
      pages: '/pages/images/placeholder.jpg',
      default: '/posts/images/placeholder.jpg'
    }
  },
  content: {
    continueOnMissingAssets: true, // Continue processing with missing assets
    logWarnings: true              // Log content processing warnings
  }
};
```

## Build Process

### Asset Sync

The build process automatically syncs folder-based assets to the public directory:

```
src/content/posts/my-post/
├── index.md
├── image.jpg
└── document.pdf

↓ (build process) ↓

public/posts/my-post/
├── image.jpg
└── document.pdf
```

### Build Scripts

The build process includes several pre-build steps:
1. **Sync Images**: Copy images from content to public directory
2. **Process Aliases**: Convert content aliases to redirects
3. **Generate Redirects**: Create redirect rules for deployment platforms
4. **Build Astro**: Compile the site

### Deployment Platforms

Supported platforms with specific configurations:
- **Netlify**: `pnpm run build:netlify`
- **Vercel**: `pnpm run build:vercel`
- **GitHub Pages**: `pnpm run build:github-pages`

## Theme Updates

### Update Theme Command

The theme includes a built-in update command that helps users keep their Astro Modular theme installation up to date with the latest features and fixes.

#### Quick Start

To update your theme to the latest version, simply run:

```bash
pnpm run update-theme
```

#### What the Update Command Does

The `update-theme` command will:

1. **Check your git repository** - Ensures you're in a valid git repository
2. **Check for uncommitted changes** - Warns you if you have uncommitted changes
3. **Setup upstream remote** - Adds the upstream repository if not already configured
4. **Create a backup** - Saves your current commit hash for reference
5. **Fetch latest changes** - Downloads the latest changes from the upstream repository
6. **Check for updates** - Compares your local version with the latest upstream version
7. **Merge changes** - Merges the updates into your local copy
8. **Update dependencies** - Runs `pnpm install` to update any changed dependencies
9. **Rebuild project** - Runs `pnpm run build` to ensure everything works

#### Prerequisites

- Your project must be a git repository
- You should have committed or stashed any local changes before running the update
- You need internet access to fetch updates from the upstream repository

#### First-Time Setup

If this is your first time using the update command, it will automatically:

- Add the upstream repository as a remote named `upstream`
- Configure it to point to the official Astro Modular theme repository

#### Handling Merge Conflicts

If you've made custom changes to theme files and there are conflicts during the merge:

1. The update command will stop and show you which files have conflicts
2. You'll need to manually resolve the conflicts in your code editor
3. After resolving conflicts, run:
   ```bash
   git add .
   git commit
   ```
4. Then run the update command again:
   ```bash
   pnpm run update-theme
   ```

#### Command Options

```bash
# Show help information
pnpm run update-theme --help

# Show version information
pnpm run update-theme --version
```

#### Best Practices for AI Agents

**Before Updating:**
1. **Commit your changes** - Always commit or stash your local changes before updating
2. **Test your site** - Make sure your current site is working properly
3. **Backup important files** - If you've made custom modifications, back them up

**After Updating:**
1. **Test your site** - Run `pnpm run dev` to make sure everything still works
2. **Check for conflicts** - Review any files that had conflicts during the merge
3. **Update documentation** - Update any custom documentation if needed

**Custom Modifications:**
- **Keep a changelog** - Document what you've changed and why
- **Use feature branches** - Consider keeping custom changes in separate branches
- **Test thoroughly** - Always test after updates to ensure your customizations still work

#### Troubleshooting Theme Updates

**"Not in a git repository"**
If you get this error, you need to initialize git in your project:

```bash
git init
git add .
git commit -m "Initial commit"
```

**"Merge failed - there may be conflicts"**
This means there are conflicts between your changes and the upstream changes. You'll need to:

1. Open the conflicted files in your editor
2. Look for conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`)
3. Resolve the conflicts by choosing which changes to keep
4. Remove the conflict markers
5. Add and commit the resolved files

**"Failed to fetch from upstream"**
This usually means there's a network issue or the upstream repository is unavailable. Check:

- Your internet connection
- The upstream repository URL is correct
- You have access to the repository

**"Dependency update failed"**
If dependency updates fail, try running manually:

```bash
pnpm install
```

#### Advanced Usage

**Checking for Updates Without Updating**
To see if updates are available without actually updating:

```bash
git fetch upstream
git log HEAD..upstream/main --oneline
```

**Updating from a Specific Branch**
If you want to update from a specific branch (e.g., a beta version):

```bash
git fetch upstream
git merge upstream/beta-branch
```

**Rolling Back Updates**
If an update causes issues, you can roll back to the previous version:

```bash
# Find the commit hash before the update
git log --oneline

# Reset to that commit (replace COMMIT_HASH with the actual hash)
git reset --hard COMMIT_HASH

# Rebuild the project
pnpm run build
```

## Configuration & Customization

### Core Configuration (`src/config.ts`)

The configuration is organized in logical sections for easy customization. For detailed setup instructions, see the [Getting Started Guide](src/content/posts/getting-started.md).

#### Site Information
```typescript
export const siteConfig = {
  site: 'https://yourdomain.com',
  title: 'Your Blog Title',
  description: 'Your blog description',
  author: 'Your Name',
  language: 'en',
}
```

#### Theme & Layout Options
```typescript
theme: "oxygen",  // Available: Oxygen, Minimal, Atom, Ayu, Catppuccin, Charcoal, Dracula, Everforest, Flexoki, Gruvbox, macOS, Nord, Obsidian, Rosé Pine, Sky, Solarized, Things
layout: {
  contentWidth: "45rem",
},
postsPerPage: 5,
recentPostsCount: 3,
```

#### Modular Features Configuration
```typescript
features: {
  flags: {
    readingTime: true,
    wordCount: true,
    tableOfContents: true,
    tags: true,
    linkedMentions: true,
    linkedMentionsCompact: false,
    scrollToTop: true,
    darkModeToggleButton: true,
    commandPalette: true,
    postNavigation: true,
    showLatestPost: true,
    showSocialIconsInFooter: true,
  },
  showCoverImages: "latest-and-posts", // See cover image options below
}
```

**Linked Mentions Features:**
- `linkedMentions: true` - Enable linked mentions section at the end of the page showing which posts reference the current post
- `linkedMentionsCompact: false` - Choose between detailed view (default) or compact view for linked mentions

#### Cover Image Options
- `"all"` - Show cover images everywhere
- `"latest"` - Show only on the latest post section and featured posts
- `"home"` - Show on homepage sections (latest and recent)
- `"posts"` - Show only on posts pages, tag pages, and post listings
- `"latest-and-posts"` - Show on latest post section AND posts pages/tags (but not recent posts section)
- `"none"` - Never show cover images

#### Post Card Aspect Ratio Configuration
Configure the aspect ratio for post card cover images:

```typescript
features: {
  postCardAspectRatio: "og", // Default: OpenGraph standard
  customAspectRatio: undefined, // For custom ratios
}
```

**Aspect Ratio Options:**
- `"og"` (1.91:1) - OpenGraph standard (default)
- `"16:9"` (1.78:1) - Standard widescreen
- `"4:3"` (1.33:1) - Traditional
- `"3:2"` (1.5:1) - Classic photography
- `"square"` (1:1) - Square
- `"golden"` (1.618:1) - Golden ratio
- `"custom"` - Use your own ratio

**Custom Aspect Ratio Example:**
```typescript
postCardAspectRatio: "custom",
customAspectRatio: "2.5/1" // Custom 2.5:1 ratio
```

**Important Notes for AI Agents:**
- This **only affects post cards** (listings, homepage, tag pages)
- **Individual post cover images** maintain their original aspect ratio
- The aspect ratio is applied via CSS `aspect-ratio` property
- Use the `getPostCardAspectRatio()` utility function to get the current ratio value

#### Navigation Configuration
```typescript
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

#### SEO Configuration
```typescript
seo: {
  defaultOgImageAlt: "Astro Modular logo.",
},
homeBlurb: {
  enabled: true,
  placement: "below", // 'above' or 'below'
},
footer: {
  enabled: true,  // Set to false for minimal footer
  content: `© 2025 {author}. Built with Astro Modular.`,
}
```

#### Profile Picture Configuration
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

**Profile Picture Features:**
- **Placement Options**: Header (replaces text logo) or Footer (above or aligned with content)
- **Style Options**: Circle (profile photos), Square (logo squares), None (horizontal logos/banners)
- **Footer Control**: When `footer.enabled: false`, profile picture aligns with social icons
- **Responsive**: Different layouts for mobile and desktop
- **Theme-Aware**: Styling adapts to all available themes

### Content Frontmatter Schemas

#### Posts Frontmatter
```yaml
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
```

#### Pages Frontmatter
```yaml
---
title: "{{title}}"
description: ""
noIndex: false
---
```

### Development Configuration (`src/config/dev.ts`)

#### Image Handling
```typescript
images: {
  showPlaceholders: true,        // Show placeholder images for missing assets
  logMissingImages: true,        // Log missing images to console
  fallbacks: {
    posts: '/posts/images/placeholder.jpg',
    pages: '/pages/images/placeholder.jpg',
    default: '/posts/images/placeholder.jpg'
  }
}
```

#### Content Processing
```typescript
content: {
  continueOnMissingAssets: true, // Continue processing with missing assets
  logWarnings: true              // Log content processing warnings
}
```

#### Error Handling
```typescript
errors: {
  showDetails: true,             // Show detailed error information
  continueOnNonCriticalErrors: true
}
```

#### Tag Handling (Recently Added)
```typescript
tags: {
  handleMissingTags: true,       // Gracefully handle missing/deleted tags
  logTagWarnings: true,          // Log tag-related warnings
  continueOnMissingTags: true    // Continue processing with missing tags
}
```

### Theme Customization

#### Available Themes
- **Oxygen** (default) - Modern, clean design
- **Minimal** - Understated with high contrast
- **Atom** - Dark theme with vibrant accents
- **Ayu** - Three variants (light, mirage, dark)
- **Catppuccin** - Pastel color palette
- **Charcoal** - Dark, professional look
- **Dracula** - Dark theme with purple accents
- **Everforest** - Soft, warm colors
- **Flexoki** - Based on Material Design 3
- **Gruvbox** - Retro groove color scheme
- **macOS** - Native macOS appearance
- **Nord** - Arctic-inspired color palette
- **Obsidian** - Matches Obsidian's default theme
- **Rosé Pine** - All natural pine, faux fir, and winter
- **Sky** - Light, airy design
- **Solarized** - Precision colors for machines and people
- **Things** - Clean, minimal design
- **Custom** - Create your own theme using the template system


#### Theme Switching
- Use the command palette (`Ctrl+K`) for instant theme switching
- Theme changes are visible in real-time with `pnpm dev`
- All themes are optimized for performance and accessibility

#### Custom Themes
- **Template system**: Use `src/themes/custom/custom.ts` as a starting point
- **Configuration**: Set `theme: "custom"` and `customThemeFile: "filename"` in `src/config.ts`
- **Multiple themes**: Copy and rename the template file, then change `customThemeFile` in config
- **Documentation**: See `src/themes/custom/README.md` for detailed instructions
- **Real-time preview**: Changes are visible immediately with `pnpm dev`

### Typography Configuration

The theme includes a comprehensive typography system that allows separate font configuration for headings and body text.

#### Font Configuration
```typescript
typography: {
  headingFont: "Inter", // Font for headings (h1, h2, h3, h4, h5, h6)
  proseFont: "Inter",   // Font for body text and prose content
}
```

#### Supported Fonts

**Sans-Serif Fonts (Recommended for UI and headings):**
- **Inter** - Modern, highly readable (default)
- **Roboto** - Google's signature font
- **Open Sans** - Humanist, friendly
- **Lato** - Semi-rounded, warm
- **Poppins** - Geometric, modern
- **Source Sans Pro** - Adobe's open source font
- **Nunito** - Rounded, friendly
- **Montserrat** - Urban, geometric

**Serif Fonts (Great for headings and elegant typography):**
- **Playfair Display** - High contrast, elegant
- **Merriweather** - Highly readable, designed for screens
- **Lora** - Well-balanced, contemporary
- **Crimson Text** - Book typeface, readable
- **PT Serif** - Professional, clean
- **Libre Baskerville** - Classic, web-optimized

**Monospace Fonts (For code and technical content):**
- **Fira Code** - Programming ligatures
- **JetBrains Mono** - Developer-focused
- **Source Code Pro** - Adobe's monospace
- **IBM Plex Mono** - Corporate, clean
- **Cascadia Code** - Microsoft's coding font

#### Popular Font Combinations

**Modern & Professional:**
```typescript
typography: {
  headingFont: "Montserrat",
  proseFont: "Source Sans Pro",
}
```

**Elegant & Readable:**
```typescript
typography: {
  headingFont: "Playfair Display",
  proseFont: "Lato",
}
```

**Clean & Minimal:**
```typescript
typography: {
  headingFont: "Inter",
  proseFont: "Inter",
}
```

**Serif Typography:**
```typescript
typography: {
  headingFont: "Merriweather",
  proseFont: "Merriweather",
}
```

**Tech/Developer Blog:**
```typescript
typography: {
  headingFont: "JetBrains Mono",
  proseFont: "Source Sans Pro",
}
```

#### Technical Implementation

**Font Loading:**
- Automatically generates Google Fonts URLs based on configuration
- Only loads fonts that are actually used
- Provides fallbacks to system fonts for performance

**CSS Custom Properties:**
- `--font-heading` - Applied to all headings
- `--font-prose` - Applied to body text and prose content
- Fallback chain: Custom font → System fonts → Generic families

**Tailwind Classes:**
- `font-heading` - Apply heading font to any element
- `font-prose` - Apply prose font to any element
- `font-sans` - Apply prose font (alias)

**Performance Considerations:**
- Fonts are loaded asynchronously
- System font fallbacks prevent layout shift
- Google Fonts are optimized for web delivery
- Custom fonts gracefully degrade to system fonts

#### Best Practices for AI Agents

**Font Selection:**
- **Headings**: Choose fonts with good contrast and readability at various sizes
- **Body Text**: Prioritize readability and legibility for long-form content
- **Consistency**: Maintain visual hierarchy between heading and body fonts
- **Performance**: Stick to Google Fonts for automatic optimization

**Common Mistakes to Avoid:**
- Don't use too many different fonts (stick to 1-2 maximum)
- Avoid fonts that are too similar (defeats the purpose of separation)
- Don't forget to test readability in both light and dark themes
- Avoid fonts that don't have good fallbacks

**Testing Font Combinations:**
- Test at different screen sizes
- Verify readability in both light and dark modes
- Check that fonts load properly on slow connections
- Ensure proper fallbacks work when custom fonts fail

### Content Structure Customization

#### Folder-Based Posts
- Use descriptive kebab-case folder names
- Keep assets co-located with `index.md`
- Folder name becomes the URL slug automatically

#### Traditional Posts
- Single markdown files in `src/content/posts/`
- Images in `src/content/posts/images/`
- Use relative paths for images

#### Pages
- Static pages in `src/content/pages/`
- Images in `src/content/pages/images/`
- NO H1 headings in markdown content - title comes from frontmatter

## Troubleshooting

### Common Image Issues

#### Images Not Loading
- Check that image paths use relative paths
- Ensure images are in the same folder as `index.md`
- Verify the build process synced the assets
- Run `pnpm run check-images` to identify missing files

#### Build Errors
- Check for typos in image paths
- Ensure all referenced assets exist
- Verify folder structure is correct
- Check console for specific error messages

#### Development Mode Issues
- Missing images show placeholder images (this is normal)
- Console warnings indicate missing assets
- Use the check script to identify all missing images
- Fix images gradually - development continues with placeholders

### Quick Fixes

1. **Move Images**: Ensure images are in the correct folder
2. **Update Paths**: Fix image paths in markdown files
3. **Check Case**: File paths are case-sensitive
4. **Verify Extensions**: Ensure file extensions match exactly
5. **Run Check Script**: Use `pnpm run check-images` to identify issues

## Best Practices

### Content Organization

#### Naming Conventions
- Use kebab-case for folder names: `my-awesome-post`
- Keep folder names descriptive but concise
- Avoid special characters and spaces

#### Asset Organization
- Use descriptive filenames: `hero-image.jpg` not `img1.jpg`
- Group related assets in subfolders if needed
- Keep file sizes reasonable for web use

#### Content Structure
- Always use `index.md` for the main content in folder-based posts
- Use relative paths for all local assets
- Test image references before publishing

### Development Workflow

1. **Use the Check Script**: Run `pnpm run check-images` regularly
2. **Monitor Console**: Watch for development warnings about missing images
3. **Fix Images Gradually**: You don't need to fix all missing images immediately
4. **Use Placeholders**: The placeholder system lets you continue development

### Version Control

- Commit the entire folder as a unit for folder-based posts
- Use meaningful commit messages
- Consider using Git LFS for large assets
- Test builds before committing

### Production Deployment

- Missing images will cause build failures in production
- Always run `pnpm run check-images` before deploying
- Fix all missing images before production builds
- Test the build process locally before deployment

## Technical Implementation Details

### Image Processing Components

- **ImageWrapper.astro**: Handles image rendering with fallbacks
- **PostLayout.astro**: Manages post-specific image handling
- **wikilinks.ts**: Processes Obsidian-style image references
- **images.ts**: Utility functions for image path optimization

### Content Processing

- **remarkWikilinks**: Converts Obsidian wikilinks to standard markdown
- **remarkFolderImages**: Handles folder-based post image paths
- **Content Collections**: Astro's content management system

### SEO and Meta Tags

All SEO features work with folder-based posts:
- Open Graph images are properly resolved
- Meta tags are generated correctly
- Sitemaps include folder-based posts
- RSS feeds include folder-based posts

## Common Issues and Solutions for AI Agents

### Accessibility Warnings
1. **"Invalid tabindex on non-interactive element"**: Usually caused by Swup. Check `astro.config.mjs` - `accessibility: false` should be set.
2. **"Missing content" warnings**: Check for proper `aria-label` attributes on interactive elements.
3. **"Redundant text in alt attribute"**: Alt text should describe the image, not repeat visible text. Use descriptive alt text instead of post titles.

### Performance Warnings
1. **"Unoptimized loading attribute"**: Above-the-fold images should use `loading="eager"`. First post on pages should have `eager={true}` prop.
2. **Image loading issues**: Check if `eager` prop is being passed correctly to PostCard components.

### Image System Confusion (Common AI Agent Mistake)
- **Post cards** show images based on `showCoverImages` config, NOT `hideCoverImage` frontmatter
- **Post content** shows images based on `hideCoverImage` frontmatter, NOT config
- **Post card aspect ratio** is controlled by `postCardAspectRatio` config, NOT individual post settings
- These are completely separate systems - don't mix them up!

### Development vs Production
- **Development**: Missing images show placeholders, warnings are logged
- **Production**: Missing images cause build failures
- Always run `pnpm run check-images` before deploying

### File Structure Patterns
- **Folder-based posts**: Use `index.md` as the main content file
- **Assets**: Co-locate with `index.md` in the same folder
- **URLs**: Folder name becomes the slug automatically

### Component Hierarchy
- **BaseLayout.astro**: Main layout with Swup container
- **PostLayout.astro**: Individual post layout
- **PostCard.astro**: Post cards for listings (controlled by config)
- **PostContent.astro**: Post content rendering (controlled by frontmatter)
- **ImageWrapper.astro**: Handles image optimization and fallbacks

### Key Configuration Files
- **`src/config.ts`**: Main site configuration including `showCoverImages`
- **`astro.config.mjs`**: Astro and Swup configuration
- **`src/config/dev.ts`**: Development-specific settings

## Comments System (Giscus Integration)

### Overview
The theme includes a Giscus-powered commenting system that uses GitHub Discussions for storing and managing comments.

### Configuration
Comments are controlled by a single setting in `src/config.ts`:

```typescript
features: {
  comments: true,  // Enable/disable comments (ONLY setting that matters)
}
```

### Giscus Setup Process

#### 1. Enable GitHub Discussions
1. Go to your GitHub repository
2. Click **Settings** → **General**
3. Scroll to **"Features"** section
4. Check **"Discussions"** and click **"Set up discussions"**

#### 2. Create Discussion Category
1. Go to **Discussions** tab in your repository
2. Click **"New category"**
3. Name it **"General"**
4. Set format to **"Announcement"** (prevents random users from creating discussions)
5. Description: "Comments on blog posts"

#### 3. Get Giscus Configuration
1. Visit [giscus.app](https://giscus.app)
2. Enter your repository: `username/repo-name`
3. Select **"General"** as the discussion category
4. Copy the generated **Repository ID** and **Category ID**

#### 4. Update Configuration
```typescript
comments: {
  provider: "giscus",               // Currently only Giscus supported
  repo: "username/repo-name",       // Your GitHub repository
  repoId: "R_kgDO...",             // Repository ID from Giscus
  category: "General",              // Discussion category
  categoryId: "DIC_kwDO...",       // Category ID from Giscus
  mapping: "pathname",              // How posts map to discussions
  strict: "0",                      // Allow comments on any post
  reactions: "1",                   // Enable reactions (1) or disable (0)
  metadata: "0",                    // Hide discussion metadata (1) or show (0)
  inputPosition: "bottom",          // Comment input position
  theme: "preferred_color_scheme",  // Theme (light/dark/preferred_color_scheme)
  lang: "en",                       // Language code
  loading: "lazy",                  // Loading strategy
}
```

### How It Works
- **Each blog post** automatically creates a GitHub discussion
- **Visitors need GitHub accounts** to comment
- **Comments appear** both on your blog and in GitHub Discussions
- **You moderate** through GitHub's interface
- **"Announcement" format** prevents random discussion creation

### Troubleshooting

#### Comments Not Appearing
1. **Check configuration**: Verify all Giscus IDs are set correctly
2. **Verify discussions enabled**: Repository must have discussions enabled
3. **Check repository visibility**: Repository must be public
4. **Verify Giscus app**: Make sure the Giscus app is installed

#### Redirect to Homepage After Sign-in
This usually means the Giscus configuration is incorrect. Check:
- Repository ID is correct
- Category ID is correct
- Discussions are enabled on your repository

#### Styling Issues
The comments are styled to match your theme automatically. If you see styling issues:
1. Check your theme configuration
2. Verify the `theme` setting matches your site theme
3. Clear browser cache and reload

### Security & Performance
- **No server-side code** required
- **GitHub handles authentication** and authorization
- **Comments are stored** in your GitHub repository
- **Lazy loading**: Comments only load when scrolled into view
- **Minimal JavaScript**: Uses the lightweight Giscus script
- **No database**: Comments are stored as GitHub discussions

## Common AI Agent Mistakes

### Critical Distinctions to Remember

#### 1. **🚨 PRODUCTION LOGGING (MOST CRITICAL)**
- **NEVER use raw `console.log()`** in production code
- **Use the project's logger utility** (`src/utils/logger.ts`) for any logging needs
- **Keep console output clean** for professional deployments

#### 2. **Image System Confusion (Most Common)**
- **Post cards** show images based on `showCoverImages` config, NOT `hideCoverImage` frontmatter
- **Post content** shows images based on `hideCoverImage` frontmatter, NOT config
- These are completely separate systems - don't mix them up!

#### 3. **H1 Title Handling**
- **Both Posts and Pages**: NO H1 in markdown content - title comes from frontmatter, content starts with H2
- **H1 is hardcoded** in both PostLayout and PageLayout using frontmatter title
- **NEVER add H1** to any markdown content - both posts and pages have hardcoded H1s from frontmatter
- Both posts and pages should have content sections starting with H2 headings

#### 4. **🚨 FAVICON THEME BEHAVIOR (CRITICAL)**
- **Favicon should NOT change with manual theme toggle** - it should only change with browser system theme
- **System theme detection**: Use `window.matchMedia('(prefers-color-scheme: dark)')` to detect browser preference
- **Favicon logic**: 
  - `prefers-color-scheme: dark` → use `favicon-dark.png`
  - `prefers-color-scheme: light` → use `favicon-light.png`
  - Unknown/unsupported → use default `favicon.ico`
- **Swup compatibility**: Reinitialize favicon after page transitions based on SYSTEM theme, not user's manual theme choice
- **NEVER update favicon** when user manually toggles theme - only when system theme changes
- **Implementation**: Use CSS media queries + JavaScript system theme detection, not manual theme state

#### 5. **🎨 COLOR USAGE (CRITICAL)**
- **NEVER use hardcoded colors** - Always use theme variables from `src/themes/index.ts`
- **Use Tailwind classes** that reference theme variables (`primary-*`, `highlight-*`)
- **Include dark mode variants** for all color definitions (`dark:bg-primary-800`)
- **Check existing code** for hardcoded colors and replace them
- **Reference theme files** to understand available color scales

#### 6. **Package Manager**
- Always use `pnpm` instead of `npm` for all commands
- Scripts: `pnpm run <script-name>`, not `npm run <script-name>`

#### 7. **Development vs Production Behavior**
- **Development**: Missing images show placeholders, warnings are logged
- **Production**: Missing images cause build failures
- Always run `pnpm run check-images` before deploying

### Accessibility Warnings

#### 1. **"Invalid tabindex on non-interactive element"**
- Usually caused by Swup
- Check `astro.config.mjs` - `accessibility: false` should be set
- This is intentional to prevent Swup from adding invalid tabindex attributes

#### 2. **"Missing content" warnings**
- Check for proper `aria-label` attributes on interactive elements
- Ensure all interactive elements have accessible labels

#### 3. **"Redundant text in alt attribute"**
- Alt text should describe the image, not repeat visible text
- Use descriptive alt text instead of post titles
- Avoid generic descriptions like "image" or "photo"

### Performance Warnings

#### 1. **"Unoptimized loading attribute"**
- Above-the-fold images should use `loading="eager"`
- First post on pages should have `eager={true}` prop
- Check if `eager` prop is being passed correctly to PostCard components

#### 2. **Image Loading Issues**
- Verify `eager` prop is being passed correctly
- Check image loading attributes in PostCard components
- Ensure proper `fetchpriority` attributes for critical images

### Content Structure Mistakes

#### 1. **File Structure Patterns**
- **Folder-based posts**: Use `index.md` as the main content file
- **Assets**: Co-locate with `index.md` in the same folder
- **URLs**: Folder name becomes the slug automatically

#### 2. **Obsidian Integration**
- Wikilinks work without conversion - don't convert them
- Use `[[image.jpg]]` syntax for Obsidian compatibility
- Tags sync automatically between Obsidian and blog

#### 3. **Frontmatter Issues**
- Use proper YAML syntax with correct indentation
- Include all required fields for posts and pages
- Validate frontmatter before committing changes

### Development Workflow Mistakes

#### 1. **Not Using Development Tools**
- Run `pnpm run check-images` regularly
- Monitor console for development warnings
- Use placeholder system for missing assets

#### 2. **Ignoring Graceful Error Handling**
- The system handles missing tags gracefully in development
- Don't panic about console warnings - they're helpful
- Continue development with placeholders when needed

#### 3. **Build Process Issues**
- Always test builds locally before deploying
- Fix all missing images before production builds
- Use the correct build commands for your deployment platform

### Component Hierarchy Understanding

#### 1. **Layout Components**
- **BaseLayout.astro**: Main layout with Swup container
- **PostLayout.astro**: Individual post layout (hardcoded H1 from frontmatter)
- **PageLayout.astro**: Page layout (hardcoded H1 from frontmatter)

#### 2. **Content Components**
- **PostCard.astro**: Post cards for listings (controlled by config)
- **PostContent.astro**: Post content rendering (controlled by frontmatter)
- **ImageWrapper.astro**: Handles image optimization and fallbacks

#### 3. **Key Configuration Files**
- **`src/config.ts`**: Main site configuration
- **`astro.config.mjs`**: Astro and Swup configuration
- **`src/config/dev.ts`**: Development-specific settings

### Best Practices for AI Agents

#### 1. **Always Check Context**
- Read the existing code before making changes
- Understand the component hierarchy
- Check configuration files for relevant settings

#### 2. **Test Changes Incrementally**
- Make small, focused changes
- Test each change before proceeding
- Use the development server to verify changes

#### 3. **Follow the Project's Philosophy**
- Respect the Obsidian-first approach
- Maintain the modular design principles
- Preserve the seamless publishing workflow

#### 4. **Document Changes**
- Add comments for complex logic
- Update configuration documentation
- Explain non-obvious decisions

This comprehensive guide should help AI agents understand the project structure, development practices, content organization patterns, and common pitfalls when working with Astro Modular.
