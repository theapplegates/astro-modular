import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import { remarkWikilinks, remarkFolderImages, remarkImageCaptions } from './src/utils/wikilinks.ts';
import remarkCallouts from './src/utils/remark-callouts.ts';
import remarkReadingTime from 'remark-reading-time';
import remarkToc from 'remark-toc';
import rehypeMark from './src/utils/rehype-mark.ts';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { siteConfig } from './src/config.ts';
import swup from '@swup/astro';

// Deployment platform configuration
const DEPLOYMENT_PLATFORM = process.env.DEPLOYMENT_PLATFORM || 'netlify';

export default defineConfig({
  site: siteConfig.site,
  deployment: {
    platform: DEPLOYMENT_PLATFORM
  },
  redirects: {
  '/about-me': '/about',
  '/about-us': '/about',
  '/contact-me': '/contact',
  '/contact-us': '/contact',
  '/privacy': '/privacy-policy'
},
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: {
        limitInputPixels: false,
      }
    },
    remotePatterns: [{
      protocol: 'https'
    }]
  },
  integrations: [
    tailwind(),
    sitemap(),
    mdx(),
    swup({
      theme: false,
      animationClass: 'transition-swup-',
      containers: ['#swup-container'],
      smoothScrolling: false,
      cache: true,
      preload: true, 
      accessibility: false,
      updateHead: true,
      updateBodyClass: false,
      globalInstance: true,
      skipPopStateHandling: (event) => {
        // Skip Swup handling for non-HTML content and special pages
        const url = event.state?.url || event.target?.location?.pathname;
        if (!url) return false;
        
        // Skip file extensions that aren't HTML
        const nonHtmlExtensions = ['.xml', '.json', '.txt', '.csv', '.pdf', '.zip', '.tar', '.gz'];
        if (nonHtmlExtensions.some(ext => url.endsWith(ext))) {
          return true;
        }
        
        // Skip special pages that should use regular navigation
        const specialPages = [
          '/sitemap.xml',
          '/robots.txt', 
          '/llms.txt',
          '/rss.xml',
          '/feed.xml',
          '/sitemap-index.xml',
          '/humans.txt',
          '/security.txt',
          '/.well-known/',
          '/api/',
          '/_astro/',
          '/_image/'
        ];
        
        return specialPages.some(page => url.startsWith(page));
      },
      // Simplified link selector for better compatibility
      linkSelector: 'a[href]:not([data-no-swup]):not([href^="mailto:"]):not([href^="tel:"])'
    })
  ],
  markdown: {
    remarkPlugins: [
      remarkWikilinks,
      remarkFolderImages,
      remarkImageCaptions,
      remarkCallouts,
      [remarkReadingTime, {}],
      [remarkToc, { 
        tight: true,
        ordered: false,
        maxDepth: 3,
        heading: 'contents|table[ -]of[ -]contents?|toc'
      }],
    ],
    rehypePlugins: [
      rehypeMark,
      [rehypeSlug, {
        test: (node) => node.tagName !== 'h1'
      }],
      [rehypeAutolinkHeadings, {
        behavior: 'wrap',
        test: (node) => node.tagName !== 'h1',
        properties: {
          className: ['anchor-link'],
          ariaLabel: 'Link to this section'
        }
      }]
    ]
  },
  vite: {
    resolve: {
      alias: {
        '@': new URL('./src', import.meta.url).pathname,
        '@/components': new URL('./src/components', import.meta.url).pathname,
        '@/layouts': new URL('./src/layouts', import.meta.url).pathname,
        '@/utils': new URL('./src/utils', import.meta.url).pathname,
        '@/types': new URL('./src/types.ts', import.meta.url).pathname,
        '@/config': new URL('./src/config.ts', import.meta.url).pathname
      }
    },
    server: {
      host: 'localhost',
      port: 5000,
      allowedHosts: [],
      middlewareMode: false,
      hmr: false,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      }
    },
    define: {
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.ASTRO_CONTENT_COLLECTION_CACHE': 'false'
    },
    server: {
      watch: {
        usePolling: process.platform === 'win32', // Use polling on Windows for better file watching
        interval: 1000
      }
    },
    optimizeDeps: {
      exclude: ['astro:content']
    },
    exclude: ['**/_redirects']
  },
  build: {
    assets: '_assets'
  }
});