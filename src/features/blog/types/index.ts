export interface Author {
  id: string;
  name: string;
  avatar?: string;
  avatarUrl?: string;
  bio?: string;
  role?: string;
  title?: string;
}

// Legacy blog post interface
interface LegacyBlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  author: Author;
  createdAt: string;
  updatedAt: string;
  tags?: string[];
  readTime: number;
  category?: {
    id: string;
    name: string;
    slug: string;
  };
}

// New blog post interface
interface NewBlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage?: string;
  author: Author;
  publishedAt: string;
  updatedAt?: string;
  meta?: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
  readingTime: number;
  categories: Category[];
}

// Combined type that allows both old and new field names
export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: Author;
  coverImage?: string;
  featuredImage?: string;
  createdAt?: string;
  publishedAt?: string;
  updatedAt?: string;
  tags?: string[];
  meta?: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
  readTime?: number;
  readingTime?: number;
  category?: {
    id: string;
    name: string;
    slug: string;
  };
  categories?: Category[];
};

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  count?: number;
}

export interface SearchResponse extends BlogListResponse {
  totalCount: number;
  currentPage: number;
}

export interface BlogListResponse {
  posts: BlogPost[];
  total: number;
  page: number;
  totalPages: number;
  currentPage: number;
  totalCount: number;
}

export interface BlogQueryParams {
  page?: number;
  limit?: number;
  categoryId?: string;
  tag?: string;
  sortBy?: string;
}

export interface BlogSearchParams extends BlogQueryParams {
  q?: string;
  search?: string;
  startDate?: string;
  endDate?: string;
}
