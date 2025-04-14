import { apiClient } from '@/shared/api/client';
import { BlogListResponse, BlogQueryParams, BlogSearchParams, BlogPost, Category } from '../types';

export const blogApi = {
  getBlogs: async (params?: BlogQueryParams): Promise<BlogListResponse> => {
    return apiClient.get<BlogListResponse>('/blogs', { params });
  },

  getBlogBySlug: async (slug: string): Promise<BlogPost> => {
    return apiClient.get<BlogPost>(`/blogs/${slug}`);
  },

  searchBlogs: async (params: BlogSearchParams): Promise<BlogListResponse> => {
    return apiClient.get<BlogListResponse>('/blogs/search', { params });
  },

  getCategories: async (): Promise<Category[]> => {
    return apiClient.get<Category[]>('/blogs/categories');
  },
};