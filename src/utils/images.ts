import type { ImageInfo, OpenGraphImage } from '@/types';

// Process images for responsive layouts
export function processImageLayout(images: ImageInfo[]): {
  layout: 'single' | 'grid-2' | 'grid-3' | 'grid-4';
  images: ImageInfo[];
} {
  const count = images.length;
  
  if (count === 1) {
    return { layout: 'single', images };
  } else if (count === 2) {
    return { layout: 'grid-2', images };
  } else if (count === 3) {
    return { layout: 'grid-3', images };
  } else if (count >= 4) {
    return { layout: 'grid-4', images: images.slice(0, 4) };
  }
  
  return { layout: 'single', images };
}

// Extract images from markdown content
export function extractImagesFromContent(content: string): ImageInfo[] {
  const imageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;
  const images: ImageInfo[] = [];
  let match;
  
  while ((match = imageRegex.exec(content)) !== null) {
    const [, alt, src] = match;
    images.push({
      src: src.trim(),
      alt: alt.trim() || 'Image',
    });
  }
  
  return images;
}

// Find consecutive images in markdown
export function findConsecutiveImages(content: string): Array<{
  images: ImageInfo[];
  startIndex: number;
  endIndex: number;
}> {
  const lines = content.split('\n');
  const imageGroups: Array<{
    images: ImageInfo[];
    startIndex: number;
    endIndex: number;
  }> = [];
  
  let currentGroup: ImageInfo[] = [];
  let groupStart = -1;
  
  lines.forEach((line, index) => {
    const imageMatch = line.match(/!\[([^\]]*)\]\(([^)]+)\)/);
    
    if (imageMatch) {
      const [, alt, src] = imageMatch;
      
      if (currentGroup.length === 0) {
        groupStart = index;
      }
      
      currentGroup.push({
        src: src.trim(),
        alt: alt.trim() || 'Image',
      });
    } else if (line.trim() === '' && currentGroup.length > 0) {
      // Empty line, continue group
      return;
    } else {
      // Non-image, non-empty line - end current group
      if (currentGroup.length > 1) {
        imageGroups.push({
          images: [...currentGroup],
          startIndex: groupStart,
          endIndex: index - 1
        });
      }
      currentGroup = [];
      groupStart = -1;
    }
  });
  
  // Handle group at end of content
  if (currentGroup.length > 1) {
    imageGroups.push({
      images: [...currentGroup],
      startIndex: groupStart,
      endIndex: lines.length - 1
    });
  }
  
  return imageGroups;
}

// Optimize image path for Astro
export function optimizeImagePath(imagePath: string): string {
  // Handle different image path formats
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath; // External URL
  }
  
  if (imagePath.startsWith('/')) {
    return imagePath; // Absolute path
  }
  
  // Relative path - ensure it starts with /
  return `/${imagePath}`;
}

// Optimize image path specifically for posts
export function optimizePostImagePath(imagePath: string): string {
  // Handle different image path formats
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath; // External URL
  }
  
  if (imagePath.startsWith('/')) {
    return imagePath; // Absolute path
  }
  
  // Relative path from post content - convert ./images/ to /posts/images/
  if (imagePath.startsWith('./images/')) {
    return imagePath.replace('./images/', '/posts/images/');
  }
  
  if (imagePath.startsWith('images/')) {
    return `/posts/${imagePath}`;
  }
  
  // Default - assume it's a relative path in the posts directory
  return `/posts/images/${imagePath}`;
}

// Optimize image path specifically for pages
export function optimizePageImagePath(imagePath: string): string {
  // Handle different image path formats
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath; // External URL
  }
  
  if (imagePath.startsWith('/')) {
    return imagePath; // Absolute path
  }
  
  // Relative path from page content - convert ./images/ to /pages/images/
  if (imagePath.startsWith('./images/')) {
    return imagePath.replace('./images/', '/pages/images/');
  }
  
  if (imagePath.startsWith('images/')) {
    return `/pages/${imagePath}`;
  }
  
  // Default - ensure it starts with /
  return `/${imagePath}`;
}

// Generate responsive image srcset
export function generateSrcSet(imagePath: string, widths: number[] = [320, 640, 768, 1024, 1280]): string {
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath; // Can't generate srcset for external images
  }
  
  const basePath = imagePath.replace(/\.[^.]+$/, ''); // Remove extension
  const extension = imagePath.match(/\.[^.]+$/)?.[0] || '.jpg';
  
  return widths
    .map(width => `${basePath}-${width}w${extension} ${width}w`)
    .join(', ');
}

// Get image dimensions (placeholder for actual implementation)
export async function getImageDimensions(imagePath: string): Promise<{ width: number; height: number } | null> {
  // This would typically use a library to get actual image dimensions
  // For now, return null to indicate dimensions are unknown
  return null;
}

// Generate Open Graph image
export function generateOGImage(title: string, description?: string): OpenGraphImage {
  // This would typically generate an actual image
  // For now, return a placeholder
  const encodedTitle = encodeURIComponent(title);
  const encodedDesc = encodeURIComponent(description || '');
  
  return {
    url: `/og-image.jpg?title=${encodedTitle}&desc=${encodedDesc}`,
    alt: `Cover image for ${title}`,
    width: 1200,
    height: 630
  };
}

// Check if image is external
export function isExternalImage(imagePath: string): boolean {
  return imagePath.startsWith('http://') || imagePath.startsWith('https://');
}

// Get image alt text with fallback
export function getImageAlt(image: ImageInfo, fallback: string = 'Image'): string {
  return image.alt && image.alt.trim() !== '' ? image.alt : fallback;
}

// Process images for lightbox
export function processImagesForLightbox(images: ImageInfo[]): ImageInfo[] {
  return images.map(image => ({
    ...image,
    src: optimizeImagePath(image.src),
    alt: getImageAlt(image)
  }));
}

// Create image gallery data
export function createImageGallery(images: ImageInfo[], layout: string) {
  return {
    images: processImagesForLightbox(images),
    layout,
    count: images.length,
    hasMultiple: images.length > 1
  };
}

// Validate image format
export function isValidImageFormat(imagePath: string): boolean {
  const validExtensions = /\.(jpg|jpeg|png|gif|webp|svg)$/i;
  return validExtensions.test(imagePath);
}

// Get optimized image format
export function getOptimizedFormat(imagePath: string): string {
  if (imagePath.includes('.svg')) {
    return imagePath; // Keep SVG as-is
  }
  
  // For other formats, prefer WebP
  return imagePath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
}
