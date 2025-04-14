export interface Author {
  id: string;
  name: string;
  avatar?: string;
  bio?: string;
  role?: string;
  title?: string;
}

export interface BlogPost {
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