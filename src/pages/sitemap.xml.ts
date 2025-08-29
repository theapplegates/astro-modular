import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { siteConfig } from '@/config';
import { shouldShowPost } from '@/utils/markdown';
import { shouldExcludeFromSitemap } from '@/utils/seo';

export const GET: APIRoute = async ({ site }) => {
  const siteUrl = site?.toString() || siteConfig.site;
  
  // Get all posts and pages
  const posts = await getCollection('posts');
  const pages = await getCollection('pages');
  
  // Filter posts for production
  const visiblePosts = posts.filter(post => shouldShowPost(post, false));
  
  // Filter pages (exclude drafts and 404)
  const visiblePages = pages.filter(page => 
    !page.data.draft && 
    page.slug !== '404' &&
    !shouldExcludeFromSitemap(page.slug)
  );
  
  // Generate URLs
  const urls: string[] = [];
  
  // Homepage
  urls.push(`
    <url>
      <loc>${siteUrl}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>daily</changefreq>
      <priority>1.0</priority>
    </url>
  `);
  
  // Posts index page
  urls.push(`
    <url>
      <loc>${siteUrl}/posts/</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>daily</changefreq>
      <priority>0.8</priority>
    </url>
  `);
  
  // Individual posts
  visiblePosts.forEach(post => {
    urls.push(`
      <url>
        <loc>${siteUrl}/posts/${post.slug}/</loc>
        <lastmod>${post.data.date.toISOString()}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
      </url>
    `);
  });
  
  // Individual pages
  visiblePages.forEach(page => {
    urls.push(`
      <url>
        <loc>${siteUrl}/${page.slug}/</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.6</priority>
      </url>
    `);
  });
  
  // Posts pagination pages
  const postsPerPage = siteConfig.postsPerPage;
  const totalPages = Math.ceil(visiblePosts.length / postsPerPage);
  
  for (let page = 2; page <= totalPages; page++) {
    urls.push(`
      <url>
        <loc>${siteUrl}/posts/${page}/</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.5</priority>
      </url>
    `);
  }
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
  ${urls.join('')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
    },
  });
};
