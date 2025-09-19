---
title: API Reference
description: Complete API reference for the Astro Modular theme
category:
order: 3
version: 1.0.0
lastModified: 2024-01-15
image:
imageAlt:
hideCoverImage: false
hideTOC: false
draft: false
featured: false
---
## API Reference

This document provides a complete reference for the Astro Modular theme APIs and utilities.

## Content Collections

### Posts Collection
```typescript
interface PostData {
  title: string;
  description: string;
  date: Date;
  tags?: string[];
  draft?: boolean;
  image?: string;
  imageAlt?: string;
  hideCoverImage?: boolean;
  targetKeyword?: string;
}
```

### Projects Collection
```typescript
interface ProjectData {
  title: string;
  description: string;
  date: Date;
  technologies?: string[];
  repositoryUrl?: string;
  demoUrl?: string;
  status: 'in-progress' | 'completed';
  image?: string;
  imageAlt?: string;
  hideCoverImage?: boolean;
  draft?: boolean;
}
```

### Documentation Collection
```typescript
interface DocumentationData {
  title: string;
  description: string;
  category: string;
  order: number;
  lastModified?: Date;
  version?: string;
  image?: string;
  imageAlt?: string;
  hideCoverImage?: boolean;
  draft?: boolean;
}
```

## Utility Functions

### SEO Generation
```typescript
// Generate SEO data for posts
generatePostSEO(post: Post, url: string): SEOData

// Generate SEO data for projects
generateProjectSEO(project: Project, url: string): SEOData

// Generate SEO data for documentation
generateDocumentationSEO(doc: Documentation, url: string): SEOData
```

### Markdown Processing
```typescript
// Process markdown content
processMarkdown(content: string): {
  excerpt: string;
  wordCount: number;
  hasMore: boolean;
}

// Calculate reading time
calculateReadingTime(content: string): ReadingTime

// Generate table of contents
generateTOC(headings: Heading[]): Heading[]
```

### Image Optimization
```typescript
// Optimize post image paths
optimizePostImagePath(image: string, slug: string, id?: string): string

// Get fallback OG image
getFallbackOGImage(): OpenGraphImage
```

## Configuration API

### Site Configuration
```typescript
interface SiteConfig {
  site: string;
  title: string;
  description: string;
  author: string;
  language: string;
  theme: ThemeName;
  features: FeatureConfig;
  navigation: NavigationConfig;
  // ... other options
}
```

### Feature Configuration
```typescript
interface FeatureConfig {
  readingTime: boolean;
  wordCount: boolean;
  tableOfContents: boolean;
  tags: boolean;
  linkedMentions: boolean;
  showCoverImages: CoverImageOption;
  postCardAspectRatio: AspectRatio;
  // ... other features
}
```

## Component Props

### PostCard Component
```typescript
interface PostCardProps {
  post: Post | Project | Documentation;
  eager?: boolean;
  showCoverImage?: CoverImageOption;
  aspectRatio?: AspectRatio;
  customAspectRatio?: string;
}
```

### TableOfContents Component
```typescript
interface TableOfContentsProps {
  headings: Heading[];
}
```

## Type Definitions

### Core Types
```typescript
interface Heading {
  depth: number;
  slug: string;
  text: string;
}

interface ReadingTime {
  text: string;
  minutes: number;
  time: number;
  words: number;
}

interface SEOData {
  title: string;
  description: string;
  canonical: string;
  ogImage?: OpenGraphImage;
  ogType: 'website' | 'article';
  // ... other SEO fields
}
```

## Error Handling

### Development Mode
- Graceful fallbacks for missing images
- Detailed error logging
- Continue processing with warnings

### Production Mode
- Strict validation
- Build failures for missing assets
- Optimized error handling

## Performance Considerations

### Image Loading
- Lazy loading for below-the-fold images
- Eager loading for above-the-fold content
- WebP format priority
- Responsive image generation

### Search Performance
- Debounced search input
- Cached search results
- Virtual scrolling for large lists
- Fuse.js fuzzy search integration
