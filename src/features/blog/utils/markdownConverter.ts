import matter from 'gray-matter';
import { marked } from 'marked';

export interface BlogMetadata {
  title: string;
  date: string;
  author: string;
  description: string;
  tags: string[];
}

export interface BlogPost {
  metadata: BlogMetadata;
  content: string;
  html: string;
  slug: string;
}

interface BlogRegistryPost {
  filename: string;
  slug: string;
  title: string;
  date: string;
  author: string;
  description: string;
  tags: string[];
}

interface BlogRegistry {
  posts: BlogRegistryPost[];
}

/**
 * Fetches and converts a markdown blog post to HTML and extracts metadata
 * @param filename - Name of the markdown file in the blogs directory
 * @returns Promise resolving to object containing metadata, content, and HTML
 */
export const convertMarkdownToHtml = async (filename: string): Promise<BlogPost> => {
  try {
    const response = await fetch(`/blogs/${filename}`);
    if (!response.ok) {
      throw new Error(`Failed to load blog post: ${response.statusText}`);
    }
    
    const fileContent = await response.text();
    
    // Parse frontmatter metadata
    const { data, content } = matter(fileContent);
    
    // Convert markdown to HTML
    const html = await marked(content);
    
    // Create slug from filename (remove .md extension)
    const slug = filename.replace(/\.md$/, '');
    
    return {
      metadata: {
        title: data.title || '',
        date: data.date || '',
        author: data.author || '',
        description: data.description || '',
        tags: data.tags || [],
      },
      content,
      html,
      slug,
    };
  } catch (error) {
    console.error('Error converting markdown to HTML:', error);
    throw error;
  }
};

/**
 * Gets a list of all blog posts with their metadata
 * @returns Promise resolving to array of blog posts with metadata
 */
export const getAllBlogPosts = async (): Promise<BlogPost[]> => {
  try {
    // Fetch the registry of blog posts
    const response = await fetch('/blogs.json');
    if (!response.ok) {
      throw new Error('Failed to fetch blog registry');
    }
    
    const registry: BlogRegistry = await response.json();
    
    // Convert all markdown files to blog posts
    const posts = await Promise.all(
      registry.posts.map(async (registryPost) => {
        const post = await convertMarkdownToHtml(registryPost.filename);
        return post;
      })
    );
    
    return posts;
  } catch (error) {
    console.error('Error getting blog posts:', error);
    return [];
  }
};