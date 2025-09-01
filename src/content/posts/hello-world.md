
---
title: "Welcome to Your Modular Astro Blog"
date: 2024-01-15
description: "Welcome to your new modular Astro blog built specifically for Obsidian users! This post introduces the theme's key features, Obsidian integration, and powerful content creation workflow."
image: "images/pexels-pixabay-462162.jpg"
imageAlt: "Abstract digital network visualization representing connectivity and knowledge"
imageOG: true
hideCoverImage: false
tags:
- welcome
- blog
- obsidian
- astro
- modular
targetKeyword: "modular astro blog"
---
Welcome to your modular Astro blog—a publishing platform designed for Obsidian users who want to transform their notes into a beautiful, performant website. This is a complete content creation system that bridges your Obsidian vault with the web.

## Modular by Design

Every feature can be enabled or disabled through configuration, giving you exactly the blogging experience you want:

- **Command palette** (`Ctrl+K`) for quick navigation
- **Linked mentions** to see post connections
- **Reading time** and word count displays
- **Table of contents** auto-generation
- **Dark/light theme** with system preference detection
- **Tag filtering** and organization
- **Image optimization** with responsive grids

Enable only what you need—keep your blog lightweight and focused.

## Obsidian Integration

Write naturally in Obsidian with full feature support:

- **Wikilinks** like `[[Getting Started]]` connect your ideas
- **Callouts** (`> [!note]`, `> [!tip]`) render beautifully
- **Tags** sync automatically between Obsidian and your blog
- **Images** optimize automatically via drag-and-drop

The included vault configuration in `src/content/.obsidian/` provides:
- **Astro Composer plugin** for one-click publishing
- **Minimal theme** for distraction-free writing
- **Custom hotkeys** optimized for blogging
- **Auto-formatting** shortcuts for web-ready content

## Performance & Design

Built on Astro 5 with modern web standards:

- **95+ Lighthouse scores** across all metrics
- **Static site generation** for maximum speed
- **Clean typography** with Inter font
- **Responsive layouts** for all devices
- **Accessibility-first** design principles

## Quick Start

1. Check the [[Getting Started]] guide for setup details
2. Configure your blog in `src/config.ts`
3. Write your first post in `src/content/posts/`
4. Connect your Obsidian vault using the included configuration

```typescript
// Example: Feature configuration
export const siteConfig = {
  features: {
    readingTime: true,
    commandPalette: true,
    linkedMentions: true,
    // Enable only what you need
  }
}
```

Whether you're documenting projects, sharing research, or building an audience, this modular blog adapts to your workflow. Focus on creating—let the blog handle the technical details.
