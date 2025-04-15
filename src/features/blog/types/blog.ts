export interface Author {
  id: string;
  name: string;
  avatar?: string;
  bio?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: Author;
  categories: Category[];
  publishedAt?: string;
  createdAt?: string;
  readingTime: number;
  featuredImage?: string;
}

// Mock data for testing
export const mockAuthor: Author = {
  id: '1',
  name: 'Test Author',
  avatar: 'https://example.com/avatar.jpg',
  bio: 'Test author bio'
};

export const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Technology',
    slug: 'technology'
  },
  {
    id: '2',
    name: 'Programming',
    slug: 'programming'
  },
  {
    id: '3',
    name: 'Development',
    slug: 'development'
  }
];

export const mockPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Test Post 1',
    slug: 'test-post-1',
    excerpt: 'Test excerpt 1',
    content: 'Test content 1',
    author: mockAuthor,
    categories: [mockCategories[0]],
    publishedAt: '2025-04-14T12:00:00Z',
    readingTime: 5
  },
  {
    id: '2',
    title: 'Test Post 2',
    slug: 'test-post-2',
    excerpt: 'Test excerpt 2',
    content: 'Test content 2',
    author: mockAuthor,
    categories: [mockCategories[1]],
    publishedAt: '2025-04-14T13:00:00Z',
    readingTime: 3
  }
];