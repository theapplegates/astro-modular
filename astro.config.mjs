import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import { remarkWikilinks } from './src/utils/wikilinks.ts';
import remarkCallouts from './src/utils/remark-callouts.ts';
import remarkReadingTime from 'remark-reading-time';
import remarkToc from 'remark-toc';
import rehypeMark from './src/utils/rehype-mark.ts';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { siteConfig } from './src/config.ts';

export default defineConfig({
  site: siteConfig.site,
  redirects: {
  '/about-me': '/about',
  '/about-us': '/about',
  '/contact-me': '/contact',
  '/contact-us': '/contact'
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
    mdx()
  ],
  markdown: {
    remarkPlugins: [
      remarkWikilinks,
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
    server: {
      host: '0.0.0.0',
      port: 5000,
      allowedHosts: [],
      middlewareMode: false,
      hmr: {
        port: 5000,
        host: '0.0.0.0'
      },
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      }
    },
    define: {
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    },
    optimizeDeps: {
      exclude: ['astro:content']
    }
  },
  build: {
    assets: '_assets'
  }
});