# AI Agent Guide for Astro Modular Theme

This document contains essential information for AI agents working with this Astro-based blog theme. It combines development practices, folder-based content organization, and technical implementation details.

## Table of Contents

1. [Development Environment](#development-environment)
2. [Content Organization](#content-organization)
3. [Image Handling](#image-handling)
4. [Build Process](#build-process)
5. [Troubleshooting](#troubleshooting)
6. [Best Practices](#best-practices)

## Development Environment

### Package Management
- **Package Manager**: This project uses `pnpm` instead of `npm` for all package and script commands
- **Scripts**: All commands should use `pnpm run <script-name>`

### Development Server
- **Command**: `pnpm run dev`
- **Port**: 5000 (with fallback to 5001 if occupied)
- **Host**: localhost
- **Hot Reload**: Enabled with file watching

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
  author?: string;
  noIndex?: boolean;
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
  noIndex?: boolean;
}
```

### H1 Title Handling - CRITICAL DISTINCTION

**IMPORTANT**: Posts and Pages handle H1 titles completely differently:

#### Posts (PostLayout)
- **H1 is HARDCODED** in the layout using `{post.data.title}` from frontmatter
- **NO H1 in markdown content** - posts should NOT have `# Title` in their markdown
- **Layout controls styling** - H1 styling is handled by the PostLayout component
- **Example**: Post frontmatter has `title: "My Post"` → Layout renders `<h1>My Post</h1>`

#### Pages (PageLayout)  
- **H1 is in MARKDOWN** - pages MUST have `# Title` in their markdown content
- **NO hardcoded H1** in the layout - PageLayout does not render the title
- **Prose classes handle styling** - H1 styling comes from prose typography
- **Example**: Page markdown starts with `# About` → Prose renders the H1

#### Why This Distinction Matters
- **Posts**: Title comes from frontmatter, layout handles presentation
- **Pages**: Title comes from markdown content, prose handles presentation
- **Consistency**: Both use the same prose classes for content, but different approaches for titles
- **AI Agents**: Never add H1 to post markdown or remove H1 from page markdown

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

This comprehensive guide should help AI agents understand the project structure, development practices, and content organization patterns used in this Astro modular theme.
