import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { siteConfig } from '@/config';
import { shouldShowPost, sortPostsByDate } from '@/utils/markdown';

export async function GET(context: any) {
  // Get all posts
  const posts = await getCollection('posts');
  
  // Filter and sort posts
  const visiblePosts = posts.filter(post => shouldShowPost(post, false));
  const sortedPosts = sortPostsByDate(visiblePosts);

  return rss({
    title: siteConfig.title,
    description: siteConfig.description,
    site: context.site || siteConfig.site,
    items: sortedPosts.map((post) => {
      const postUrl = `${context.site || siteConfig.site}posts/${post.slug}`;
      
      return {
        title: post.data.title,
        description: post.data.description,
        pubDate: post.data.date,
        link: postUrl,
        categories: post.data.tags || [],
        author: siteConfig.author,
        // Include image if available and marked for OG
        enclosure: post.data.image && post.data.imageOG ? {
          url: post.data.image.startsWith('http') 
            ? post.data.image 
            : `${context.site || siteConfig.site}${post.data.image}`,
          type: 'image/jpeg', // Default type, could be enhanced
          length: 0 // Length is optional
        } : undefined,
        customData: [
          post.data.targetKeyword && `<keyword>${post.data.targetKeyword}</keyword>`,
          post.data.image && `<image>${post.data.image.startsWith('http') 
            ? post.data.image 
            : `${context.site || siteConfig.site}${post.data.image}`}</image>`,
        ].filter(Boolean).join(''),
      };
    }),
    
    // RSS 2.0 extensions
    customData: `
      <language>${siteConfig.language}</language>
      <copyright>Copyright © ${new Date().getFullYear()} ${siteConfig.author}</copyright>
      <managingEditor>${siteConfig.author}</managingEditor>
      <webMaster>${siteConfig.author}</webMaster>
      <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
      <generator>Astro RSS</generator>
      <docs>https://www.rssboard.org/rss-specification</docs>
      <ttl>60</ttl>
    `,
    
    
    xmlns: {
      atom: 'http://www.w3.org/2005/Atom',
      content: 'http://purl.org/rss/1.0/modules/content/',
      dc: 'http://purl.org/dc/elements/1.1/',
    },
  });
}
