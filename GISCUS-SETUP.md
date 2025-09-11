# Giscus Comments Setup Guide

This guide explains how to set up Giscus comments for your Astro Modular blog.

## 🚀 Quick Setup

### 1. Enable Giscus on Your Repository

1. Go to [giscus.app](https://giscus.app)
2. Enter your repository: `davidvkimball/astro-modular`
3. Select **"General"** as the discussion category
4. Copy the generated configuration

### 2. Get Your Giscus Configuration

From the Giscus setup page, you'll get:
- **Repository ID** (e.g., `R_kgDO...`)
- **Category ID** (e.g., `DIC_kwDO...`)

### 3. Set Environment Variables

Create a `.env` file in your project root:

```bash
PUBLIC_GISCUS_REPO=davidvkimball/astro-modular
PUBLIC_GISCUS_REPO_ID=your-repo-id-here
PUBLIC_GISCUS_CATEGORY=General
PUBLIC_GISCUS_CATEGORY_ID=your-category-id-here
```

### 4. Enable Discussions

1. Go to your repository: https://github.com/davidvkimball/astro-modular
2. Click **Settings** → **General**
3. Scroll down to **"Features"**
4. Check **"Discussions"**
5. Click **"Set up discussions"**

### 5. Test Comments

1. Build and deploy your site
2. Visit any blog post
3. Scroll to the comments section
4. Try to sign in with GitHub
5. Leave a test comment

## ⚙️ Configuration Options

> **Note**: The comments configuration was simplified! There's now only **one setting** to control whether comments are enabled: `features.comments`. The `comments` object only contains Giscus configuration data.

### Basic Settings

```typescript
// In src/config.ts - features section
features: {
  comments: true,  // Enable/disable comments (this is the ONLY setting that matters)
}

// In src/config.ts - comments section (configuration only)
comments: {
  provider: "giscus",               // Currently only Giscus supported
  repo: "username/repo-name",       // Your GitHub repository
  repoId: "R_kgDO...",             // Repository ID from Giscus
  category: "General",              // Discussion category
  categoryId: "DIC_kwDO...",       // Category ID from Giscus
  mapping: "pathname",              // How to map posts to discussions
  reactions: "1",                   // Enable reactions (1) or disable (0)
  metadata: "0",                    // Show discussion metadata (1) or hide (0)
  inputPosition: "bottom",          // Comment input position
  theme: "preferred_color_scheme",  // Theme (light/dark/preferred_color_scheme)
  lang: "en",                       // Language code
  loading: "lazy",                  // Loading strategy
}
```

### Theme Options

- **`light`**: Always use light theme
- **`dark`**: Always use dark theme
- **`preferred_color_scheme`**: Follows user's system preference

## 🔧 Troubleshooting

### Comments Not Appearing

1. **Check environment variables**: Make sure all Giscus IDs are set correctly
2. **Verify discussions are enabled**: Repository must have discussions enabled
3. **Check repository visibility**: Repository must be public
4. **Verify Giscus app**: Make sure the Giscus app is installed

### Redirect to Homepage After Sign-in

This usually means the Giscus configuration is incorrect. Check:
- Repository ID is correct
- Category ID is correct
- Discussions are enabled on your repository

### Styling Issues

The comments are styled to match your theme automatically. If you see styling issues:

1. Check your theme configuration
2. Verify the `theme` setting matches your site theme
3. Clear browser cache and reload

## 🎨 Customization

### Disable Comments

Set `comments: false` in your features configuration:

```typescript
features: {
  comments: false,  // This is the ONLY setting that controls comments
}
```

### Change Comment Position

Move the comments section in `src/layouts/PostLayout.astro`:

```astro
<!-- Giscus Comments -->
{siteConfig.features.comments && (
  <div class="mt-16">
    <GiscusComments
      postTitle={post.data.title}
      postSlug={post.slug}
      postUrl={Astro.url.href}
    />
  </div>
)}
```

## 📝 How It Works

Giscus uses GitHub Discussions for comments:

1. **Each blog post** gets a corresponding GitHub discussion
2. **Comments on the blog** appear as comments on the GitHub discussion
3. **Users need a GitHub account** to comment
4. **Comments are moderated** through your GitHub repository

## 🔒 Security

The comments system is secure because:

- **No server-side code** required
- **GitHub handles authentication** and authorization
- **Comments are stored** in your GitHub repository
- **You control access** through GitHub repository settings

## ⚡ Performance

The comments system is optimized for performance:

- **Lazy loading**: Comments only load when scrolled into view
- **Minimal JavaScript**: Uses the lightweight Giscus script
- **No database**: Comments are stored as GitHub discussions
- **Caching**: GitHub handles caching and CDN distribution

## 🆘 Need Help?

If you're having issues:

1. Check the browser console for errors
2. Verify your Giscus configuration
3. Ensure discussions are enabled on your repository
4. Check that your repository is public
5. Try the troubleshooting steps above

For more help, check the [Giscus documentation](https://giscus.app) or open an issue in this repository.
