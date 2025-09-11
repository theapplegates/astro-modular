// Type definitions for the blog theme

export interface Post {
  id: string;
  slug: string;
  body: string;
  collection: string;
  data: PostData;
  render(): Promise<{ Content: any; headings: Heading[]; remarkPluginFrontmatter: any }>;
}

export interface PostData {
  title: string;
  date: Date;
  description: string;
  image?: string;
  imageAlt?: string;
  imageOG?: boolean;
  hideCoverImage?: boolean;
  tags?: string[];
  draft?: boolean;
  targetKeyword?: string;
}

export interface Page {
  id: string;
  slug: string;
  body: string;
  collection: string;
  data: PageData;
  render(): Promise<{ Content: any; headings: Heading[]; remarkPluginFrontmatter: any }>;
}

export interface PageData {
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  imageOG?: boolean;
  draft?: boolean;
  showTOC?: boolean;
}

export interface Heading {
  depth: number;
  slug: string;
  text: string;
}

export interface ReadingTime {
  text: string;
  minutes: number;
  time: number;
  words: number;
}

export interface NavigationItem {
  title: string;
  url: string;
  external?: boolean;
  icon?: string;
}

export interface SocialLink {
  title: string;
  url: string;
  icon: string;
}

export interface CommandPaletteItem {
  id: string;
  title: string;
  description?: string;
  url: string;
  type: 'post' | 'page' | 'social' | 'external' | 'action';
  icon?: string;
}

export interface SearchResult {
  item: CommandPaletteItem;
  score: number;
  matches: Array<{
    indices: Array<[number, number]>;
    value: string;
    key: string;
  }>;
}

export interface ImageInfo {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}

export interface OpenGraphImage {
  url: string;
  alt: string;
  width: number;
  height: number;
}

export interface SEOData {  
  title: string;  
  description: string;  
  canonical: string;  
  ogImage?: OpenGraphImage;  
  ogType: 'website' | 'article';  
  publishedTime?: string;  
  modifiedTime?: string;  
  tags?: string[];  
  noIndex?: boolean;  
  robots?: string;  
  articleSection?: string;  
  twitter?: {  
    card?: string;  
    title?: string;  
    description?: string;  
    image?: string;  
  };  
  keywords?: string[];  
}

export interface WikilinkMatch {
  link: string;
  display: string;
  slug: string;
}

export interface LinkedMention {
  title: string;
  slug: string;
  excerpt: string;
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
  nextUrl?: string;
  prevUrl?: string;
}