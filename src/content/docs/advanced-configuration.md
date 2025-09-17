---
title: Advanced Configuration
description: Learn about advanced configuration options and customization features
category: Configuration
order: 2
version: 1.0.0
lastModified: 2024-01-15
image:
imageAlt:
hideCoverImage: false
draft: false
featured: false
---

## Advanced Configuration Options

This guide covers advanced configuration options available in the Astro Modular theme.

## Theme Customization

### Custom Themes
You can create custom themes by:

1. Creating a new theme file in `src/themes/custom/`
2. Setting `theme: "custom"` in your config
3. Specifying the theme file name

### Typography Configuration
Customize fonts for headings and body text:

```typescript
typography: {
  headingFont: "Inter",
  proseFont: "Source Sans Pro",
}
```

## Content Features

### Cover Images
Control how cover images are displayed:

- `"all"` - Show everywhere
- `"latest"` - Only on latest posts
- `"posts"` - Only on post pages
- `"none"` - Never show

### Post Card Aspect Ratios
Configure the aspect ratio for post cards:

- `"og"` - OpenGraph standard (1.91:1)
- `"16:9"` - Widescreen
- `"4:3"` - Traditional
- `"square"` - Square
- `"custom"` - Your own ratio

## SEO Configuration

### Meta Tags
The theme automatically generates:
- Open Graph tags
- Twitter Card tags
- Structured data
- Sitemaps
- RSS feeds

### Custom SEO
Override SEO settings per content item using frontmatter.

## Performance Optimization

### Image Optimization
- Automatic WebP conversion
- Responsive image generation
- Lazy loading
- Preloading for above-the-fold images

### Build Optimization
- Tree shaking
- Code splitting
- Minification
- Compression

## Development Tools

### Available Scripts
- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm check-images` - Check for missing images
- `pnpm sync-images` - Sync images from content

### Debugging
Enable development mode for additional logging and error handling.

## Deployment Configuration

### Platform-Specific Settings
The theme automatically generates configuration files for:
- Netlify (`netlify.toml`)
- Vercel (`vercel.json`)
- GitHub Pages (`redirects.txt`)

### Environment Variables
Set deployment platform in config:
```typescript
deployment: {
  platform: "netlify", // or "vercel" or "github-pages"
}
```

## Troubleshooting

### Common Issues
1. **Images not loading**: Check file paths and run `pnpm check-images`
2. **Build errors**: Verify all required frontmatter fields
3. **Styling issues**: Check theme configuration

### Getting Help
- Check the [FAQ](faq) section
- Review error messages in the console
- Open an issue on GitHub
