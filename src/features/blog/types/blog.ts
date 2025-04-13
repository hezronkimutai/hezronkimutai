/**
 * Blog post category
 */
export interface Category {
  /**
   * Unique identifier for the category
   */
  id: string;

  /**
   * Display name of the category
   */
  name: string;

  /**
   * URL-friendly slug
   */
  slug: string;

  /**
   * Optional description
   */
  description?: string;
}

/**
 * Blog post author
 */
export interface Author {
  /**
   * Unique identifier for the author
   */
  id: string;

  /**
   * Author's name
   */
  name: string;

  /**
   * Author's avatar URL
   */
  avatarUrl?: string;

  /**
   * Author's bio
   */
  bio?: string;

  /**
   * Social media links
   */
  socials?: {
    twitter?: string;
    github?: string;
    linkedin?: string;
  };
}

/**
 * Blog post
 */
export interface BlogPost {
  /**
   * Unique identifier for the post
   */
  id: string;

  /**
   * Post title
   */
  title: string;

  /**
   * URL-friendly slug
   */
  slug: string;

  /**
   * Post excerpt/summary
   */
  excerpt: string;

  /**
   * Full post content
   */
  content: string;

  /**
   * Post author
   */
  author: Author;

  /**
   * Post categories
   */
  categories: Category[];

  /**
   * Featured image URL
   */
  featuredImage?: string;

  /**
   * Publication date
   */
  publishedAt: string;

  /**
   * Last update date
   */
  updatedAt?: string;

  /**
   * Reading time in minutes
   */
  readingTime: number;

  /**
   * SEO metadata
   */
  meta?: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
}

/**
 * Blog post list response
 */
export interface BlogPostsResponse {
  /**
   * List of blog posts
   */
  posts: BlogPost[];

  /**
   * Total number of posts
   */
  total: number;

  /**
   * Current page number
   */
  page: number;

  /**
   * Number of posts per page
   */
  perPage: number;

  /**
   * Total number of pages
   */
  totalPages: number;
}

/**
 * Mock data for testing
 */
export const mockCategories: Category[] = [
  {
    id: '1',
    name: 'TypeScript',
    slug: 'typescript',
    description: 'Articles about TypeScript development',
  },
  {
    id: '2',
    name: 'React',
    slug: 'react',
    description: 'Articles about React development',
  },
  {
    id: '3',
    name: 'Testing',
    slug: 'testing',
    description: 'Articles about testing practices',
  },
];

/**
 * Mock author data
 */
export const mockAuthor: Author = {
  id: '1',
  name: 'John Doe',
  avatarUrl: 'https://via.placeholder.com/150',
  bio: 'Full Stack Developer passionate about TypeScript and React',
  socials: {
    twitter: 'https://twitter.com/johndoe',
    github: 'https://github.com/johndoe',
    linkedin: 'https://linkedin.com/in/johndoe',
  },
};

/**
 * Mock blog posts for testing
 */
export const mockPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Getting Started with TypeScript and React',
    slug: 'getting-started-with-typescript-and-react',
    excerpt: 'Learn how to set up a new React project with TypeScript and best practices.',
    content: 'Full article content here...',
    author: mockAuthor,
    categories: [mockCategories[0], mockCategories[1]],
    featuredImage: 'https://via.placeholder.com/800x400',
    publishedAt: '2025-04-13T12:00:00Z',
    readingTime: 5,
    meta: {
      title: 'TypeScript and React Guide',
      description: 'Complete guide to using TypeScript with React',
      keywords: ['typescript', 'react', 'javascript', 'web development'],
    },
  },
  {
    id: '2',
    title: 'Testing React Components',
    slug: 'testing-react-components',
    excerpt: 'A comprehensive guide to testing React components with Jest and Testing Library.',
    content: 'Full article content here...',
    author: mockAuthor,
    categories: [mockCategories[1], mockCategories[2]],
    featuredImage: 'https://via.placeholder.com/800x400',
    publishedAt: '2025-04-12T12:00:00Z',
    readingTime: 8,
    meta: {
      title: 'React Testing Guide',
      description: 'Learn how to test React components effectively',
      keywords: ['react', 'testing', 'jest', 'testing library'],
    },
  },
];