import type { Post, Page, SEOData, OpenGraphImage } from '@/types';
import siteConfig from '@/config';
import { getFallbackOGImage, optimizePostImagePath } from './images';

// Helper function to get default OG image
function getDefaultOGImage(): OpenGraphImage {
  return {
    url: '/open-graph.png',
    alt: siteConfig.seo.defaultOgImageAlt,
    width: 1200,
    height: 630,
  };
}

// Generate SEO data for posts
export function generatePostSEO(post: Post, url: string): SEOData {
  const { title, description, image, imageOG, tags, date } = post.data;

  let ogImage: OpenGraphImage | undefined;

  if (image && imageOG) {
    // Handle both local and external image paths
    let imageUrl: string;
    if (image.startsWith('http')) {
      // External URL
      imageUrl = image;
    } else {
      // Use optimizePostImagePath for proper path resolution
      const imagePath = optimizePostImagePath(image);
      imageUrl = `${siteConfig.site}${imagePath}`;
    }
    ogImage = {
      url: imageUrl,
      alt: post.data.imageAlt || `Cover image for ${title}`,
      width: 1200,
      height: 630,
    };
  } else {
    // Use default OG image
    ogImage = getDefaultOGImage();
    ogImage = {
      ...ogImage,
      url: `${siteConfig.site}${ogImage.url}`
    };
  }

  return {
    title: `${title} | ${siteConfig.title}`,
    description,
    canonical: url,
    ogImage,
    ogType: 'article',
    publishedTime: date.toISOString(),
    modifiedTime: date.toISOString(), // Could be updated separately
    tags
  };
}

// Generate SEO data for pages
export function generatePageSEO(page: Page, url: string): SEOData {
  const { title, description, image, imageOG } = page.data;

  let ogImage: OpenGraphImage | undefined;

  if (image && imageOG) {
    ogImage = {
      url: `${siteConfig.site}${image.startsWith('/') ? '' : '/'}${image}`,
      alt: page.data.imageAlt || `Cover image for ${title}`,
      width: 1200,
      height: 630
    };
  } else {
    // Use default OG image
    ogImage = getDefaultOGImage();
    ogImage = {
      ...ogImage,
      url: `${siteConfig.site}${ogImage.url}`
    };
  }

  return {
    title: `${title} | ${siteConfig.title}`,
    description,
    canonical: url,
    ogImage,
    ogType: 'website'
  };
}

// Generate SEO data for homepage
export function generateHomeSEO(url: string): SEOData {
  let ogImage: OpenGraphImage | undefined;

  // Always use fallback image for homepage
  ogImage = getDefaultOGImage();
  ogImage = {
    ...ogImage,
    url: `${siteConfig.site}${ogImage.url}`
  };

  return {
    title: siteConfig.title,
    description: siteConfig.description,
    canonical: url,
    ogImage,
    ogType: 'website'
  };
}

// Generate structured data (JSON-LD)
export function generateStructuredData(type: 'blog' | 'article' | 'website', data: any) {
  const baseData = {
    '@context': 'https://schema.org',
    '@type': type === 'blog' ? 'Blog' : type === 'article' ? 'BlogPosting' : 'WebSite',
    ...data
  };

  return JSON.stringify(baseData);
}

// Generate meta tags HTML
export function generateMetaTags(seoData: SEOData): string {
  const tags = [
    `<title>${seoData.title}</title>`,
    `<meta name="description" content="${seoData.description}">`,
    `<link rel="canonical" href="${seoData.canonical}">`,

    // Open Graph
    `<meta property="og:title" content="${seoData.title}">`,
    `<meta property="og:description" content="${seoData.description}">`,
    `<meta property="og:url" content="${seoData.canonical}">`,
    `<meta property="og:type" content="${seoData.ogType}">`,
    `<meta property="og:site_name" content="${siteConfig.title}">`,

    // Twitter Card
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${seoData.title}">`,
    `<meta name="twitter:description" content="${seoData.description}">`,
  ];

  // Add Open Graph image
  if (seoData.ogImage) {
    tags.push(
      `<meta property="og:image" content="${seoData.ogImage.url}">`,
      `<meta property="og:image:alt" content="${seoData.ogImage.alt}">`,
      `<meta property="og:image:width" content="${seoData.ogImage.width}">`,
      `<meta property="og:image:height" content="${seoData.ogImage.height}">`,
      `<meta name="twitter:image" content="${seoData.ogImage.url}">`,
      `<meta name="twitter:image:alt" content="${seoData.ogImage.alt}">`
    );
  }

  // Add article-specific tags
  if (seoData.ogType === 'article') {
    if (seoData.publishedTime) {
      tags.push(`<meta property="article:published_time" content="${seoData.publishedTime}">`);
    }
    if (seoData.modifiedTime) {
      tags.push(`<meta property="article:modified_time" content="${seoData.modifiedTime}">`);
    }
    if (seoData.tags) {
      seoData.tags.forEach(tag => {
        tags.push(`<meta property="article:tag" content="${tag}">`);
      });
    }
  }

  return tags.join('\n');
}

// Check if page should be excluded from sitemap
export function shouldExcludeFromSitemap(slug: string): boolean {
  if (!slug) return false;

  const excludePatterns = [
    '404',
    'sitemap',
    'rss',
    'api/'
  ];

  return excludePatterns.some(pattern => slug.includes(pattern));
}

// Generate meta description
export function generateMetaDescription(content: string, maxLength: number = 160): string {
  if (!content) return '';

  // Remove markdown formatting and HTML tags
  const cleanContent = content
    .replace(/#+\s/g, '') // Remove headers
    .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
    .replace(/\*(.*?)\*/g, '$1') // Remove italic
    .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Remove links, keep text
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim();

  if (cleanContent.length <= maxLength) {
    return cleanContent;
  }

  // Truncate at word boundary
  const truncated = cleanContent.substring(0, maxLength);
  const lastSpaceIndex = truncated.lastIndexOf(' ');

  if (lastSpaceIndex > maxLength * 0.8) {
    return truncated.substring(0, lastSpaceIndex) + '...';
  }

  return truncated + '...';
}

// Generate robots meta tag
export function generateRobotsMeta(index: boolean = true, follow: boolean = true): string {
  const directives = [];

  if (!index) directives.push('noindex');
  if (!follow) directives.push('nofollow');

  if (directives.length === 0) {
    return '<meta name="robots" content="index, follow">';
  }

  return `<meta name="robots" content="${directives.join(', ')}">`;
}

// Create breadcrumb structured data
export function generateBreadcrumbs(path: Array<{ name: string; url: string }>): any {
  const items = path.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url
  }));

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items
  };
}

// Validate SEO data
export function validateSEOData(seoData: SEOData): {
  isValid: boolean;
  warnings: string[];
} {
  const warnings: string[] = [];

  if (seoData.title.length > 60) {
    warnings.push('Title is longer than 60 characters');
  }

  if (seoData.title.length < 30) {
    warnings.push('Title is shorter than 30 characters');
  }

  if (seoData.description.length > 160) {
    warnings.push('Description is longer than 160 characters');
  }

  if (seoData.description.length < 120) {
    warnings.push('Description is shorter than 120 characters');
  }

  if (!seoData.ogImage) {
    warnings.push('No Open Graph image provided');
  }

  return {
    isValid: warnings.length === 0,
    warnings
  };
}