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
      allowedHosts: [
        '0b4ea26e-07ff-411e-a293-99d72ae7d1b2-00-rx4xuahdxqtw.worf.replit.dev',
        '1a537f8e-3c44-41fe-b014-7f889986f234-00-2a93cn23ljkra.janeway.replit.dev',
        'da3a5d58-35ee-4f75-a6f0-dc4fa5e2615d-00-8t8nzbk8fv8w.worf.replit.dev',
        '36787a49-1ce5-4b67-bed1-8e119127c480-00-15t3xn17nsvet.worf.replit.dev',
        'e99adaee-bacd-4c0e-9a43-3367c5473a37-00-2r78uv08uy8pr.janeway.replit.dev',
        '1f862f47-304a-41f1-b4ef-c30fd52c20f4-00-pysanuvprrps.riker.replit.dev',
        '7c7d17a5-9e7a-489b-81ee-2831ec9efa37-00-1hzc8ugx94cy6.janeway.replit.dev',
        '86e35c26-cef9-4a2b-b4db-75407fcddd2a-00-2nxxkvj0ojzsg.riker.replit.dev',
        '135a3955-455d-4e58-8348-79b7ffc4a03c-00-7y0e95ym3fse.picard.replit.dev',
        '135a3955-455d-4e58-8348-79b7ffc4a03c-00-7y0e95ym3fse.picard.replit.dev',
        'a8c78a87-ea7d-4ba6-b416-fbd5954cd0b1-00-1vz1me1zk5rvw.riker.replit.dev',
        '72d804f9-ae9c-4b25-817a-8b62faff287c-00-ntvfdgl108vu.worf.replit.dev'
      ],
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