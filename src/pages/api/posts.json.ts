import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { shouldShowPost } from '@/utils/markdown';

export const GET: APIRoute = async () => {
  try {
    // Get all posts
    const posts = await getCollection('posts');
    
    // Filter visible posts
    const visiblePosts = posts.filter((post: any) => shouldShowPost(post, false));
    
    // Map to command palette format
    const commandPaletteData = visiblePosts.map((post: any) => ({
      id: post.slug,
      title: post.data.title,
      description: post.data.description,
      url: `/posts/${post.slug}`,
      type: 'post' as const,
      date: post.data.date
    }));

    // Sort by date (newest first)
    commandPaletteData.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return new Response(JSON.stringify(commandPaletteData), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300' // Cache for 5 minutes
      }
    });
  } catch (error) {
    console.error('Error fetching posts for command palette:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch posts' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};