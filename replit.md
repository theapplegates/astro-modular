# Overview

This is an Obsidian-inspired blog theme built with Astro, designed for content creators who want a minimal, elegant blogging platform that seamlessly integrates with Obsidian workflows. The theme prioritizes clarity, performance, and markdown-first content creation while maintaining full compatibility with Obsidian's wikilinks, callouts, and organizational patterns.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Framework
- **Astro 5.13.4** as the static site generator, chosen for optimal performance and SEO capabilities
- **Tailwind CSS 4.1.12** for utility-first styling with custom CSS variables for theme management
- **TypeScript** for type safety throughout the application
- **Component-based architecture** with reusable layouts and components

## Content Management
- **File-based content system** using Astro's content collections
- **Markdown-first approach** with enhanced processing via remark/rehype plugins
- **Dual content structure**: `/content/posts/` for blog posts and `/content/pages/` for static pages
- **Flexible slug generation** supporting both standalone `.md` files and folder-based organization

## Markdown Processing Pipeline
- **Remark plugins**: reading-time calculation, table of contents generation
- **Rehype plugins**: slug generation for headings, automatic heading links
- **Custom wikilinks processing** for Obsidian-style `[[link]]` and `[[link|Custom Text]]` syntax
- **Enhanced markdown support** including Obsidian callouts and custom formatting

## Theme System
- **CSS custom properties** for dynamic theming with light/dark mode support
- **System preference detection** with localStorage persistence
- **Automatic theme adaptation** across all UI components and content
- **Custom highlight colors** with configurable accent palette

## Navigation & Search
- **Command palette** as primary navigation method (activated via Ctrl+K)
- **Fuzzy search** functionality for posts with static navigation items
- **Configurable shortcuts** and toggleable traditional navigation
- **Responsive design** with mobile-first approach

## Performance Optimizations
- **Static site generation** for optimal loading speeds
- **Image optimization** with WebP format priority and responsive layouts
- **Automatic sitemap generation** with trailing slash consistency
- **RSS feed generation** with image support
- **SEO optimization** including Open Graph image generation

## Content Features
- **Reading time estimation** and word count display
- **Table of contents** generation from headings
- **Tag system** compatible with Obsidian format
- **Image lightbox** functionality with responsive grid layouts
- **YouTube video embedding** with automatic responsive design

# External Dependencies

## Core Framework Dependencies
- **@astrojs/mdx**: MDX support for enhanced markdown processing
- **@astrojs/rss**: RSS feed generation with image and metadata support
- **@astrojs/sitemap**: Automatic sitemap generation for SEO
- **@astrojs/tailwind**: Tailwind CSS integration with Astro

## Styling & UI
- **@tailwindcss/typography**: Enhanced typography styles for markdown content
- **Lucide icons**: Primary icon library for UI elements
- **Inter font family**: Typography stack with system font fallbacks

## Markdown Processing
- **rehype-autolink-headings**: Automatic anchor links for headings
- **rehype-slug**: Slug generation for heading elements
- **remark-reading-time**: Reading time estimation for posts
- **remark-toc**: Table of contents generation
- **unist-util-visit**: AST traversal for custom markdown processing

## Hosting & Deployment
- **Netlify**: Configured for immediate deployment with netlify.toml
- **pnpm**: Package manager for dependency management
- **Environment variables**: Support for Google Analytics and API keys

## Third-party Integrations
- **Font Awesome**: Brand icons for social media links
- **Pixabay**: Default image sources for content examples
- **Google Analytics**: Optional analytics integration via environment variables

## Content Sources
- **Local markdown files**: Primary content storage in `/content/` directory
- **External images**: Support for both local and remote image sources
- **YouTube**: Embedded video support with responsive design