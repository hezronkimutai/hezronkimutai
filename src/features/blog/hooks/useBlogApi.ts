import { useState, useCallback } from 'react';
import { apiClient } from '../../../shared/api/client';
import {
  BlogPost,
  BlogListResponse,
  BlogQueryParams,
  BlogSearchParams,
  Category
} from '../types';

interface UseBlogApiReturn {
  loading: boolean;
  error: Error | null;
  getBlogPosts: (params?: BlogQueryParams) => Promise<BlogListResponse>;
  getBlogPost: (slug: string) => Promise<BlogPost>;
  getCategories: () => Promise<Category[]>;
  searchPosts: (params: BlogSearchParams) => Promise<BlogListResponse>;
}

export function useBlogApi(): UseBlogApiReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const handleRequest = useCallback(async <T>(request: () => Promise<T>): Promise<T> => {
    setLoading(true);
    setError(null);
    try {
      const result = await request();
      return result;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getBlogPosts = useCallback(async (params?: BlogQueryParams): Promise<BlogListResponse> => {
    return handleRequest(async () => {
      const response = await apiClient.get<BlogListResponse>('/blog/posts', { params });
      return response;
    });
  }, [handleRequest]);

  const getBlogPost = useCallback(async (slug: string): Promise<BlogPost> => {
    return handleRequest(async () => {
      const response = await apiClient.get<BlogPost>(`/blog/posts/${slug}`);
      return response;
    });
  }, [handleRequest]);

  const getCategories = useCallback(async (): Promise<Category[]> => {
    return handleRequest(async () => {
      const response = await apiClient.get<Category[]>('/blog/categories');
      return response;
    });
  }, [handleRequest]);

  const searchPosts = useCallback(async (params: BlogSearchParams): Promise<BlogListResponse> => {
    return handleRequest(async () => {
      const response = await apiClient.get<BlogListResponse>('/blog/search', { params });
      return response;
    });
  }, [handleRequest]);

  return {
    loading,
    error,
    getBlogPosts,
    getBlogPost,
    getCategories,
    searchPosts
  };
}