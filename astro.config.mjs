import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import { remarkWikilinks } from './src/utils/wikilinks.ts';
import remarkCallouts from './src/utils/remark-callouts.ts';
import remarkReadingTime from 'remark-reading-time';
import remarkToc from 'remark-toc';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { siteConfig } from './src/config.ts';

export default defineConfig({
  site: siteConfig.site,
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
      }]
    ],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, {
        behavior: 'wrap',
        properties: {
          className: ['anchor-link'],
          ariaLabel: 'Link to this section'
        }
      }]
    ]
  },
  vite: {
    server: {
      allowedHosts: [
        '0b4ea26e-07ff-411e-a293-99d72ae7d1b2-00-rx4xuahdxqtw.worf.replit.dev',
        '1a537f8e-3c44-41fe-b014-7f889986f234-00-2a93cn23ljkra.janeway.replit.dev',
        'da3a5d58-35ee-4f75-a6f0-dc4fa5e2615d-00-8t8nzbk8fv8w.worf.replit.dev'
      ]
    }
  }
});