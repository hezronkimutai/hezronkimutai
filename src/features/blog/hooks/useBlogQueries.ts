import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { useBlogApi } from './useBlogApi';
import { BlogQueryParams, BlogSearchParams, BlogListResponse, Category } from '../types';

export function useBlogQueries() {
  const api = useBlogApi();

  const useBlogQuery = (params?: BlogQueryParams): UseQueryResult<BlogListResponse, Error> => {
    return useQuery({
      queryKey: ['blogs', params],
      queryFn: () => api.getBlogPosts(params),
      placeholderData: (previousData) => previousData,
    });
  };

  const useCategoriesQuery = (): UseQueryResult<Category[], Error> => {
    return useQuery({
      queryKey: ['categories'],
      queryFn: () => api.getCategories(),
      staleTime: 5 * 60 * 1000, // Consider categories stale after 5 minutes
    });
  };

  const useSearchQuery = (params?: BlogSearchParams): UseQueryResult<BlogListResponse, Error> => {
    return useQuery({
      queryKey: ['search', params],
      queryFn: () => params?.search ? api.searchPosts(params) : Promise.resolve({ posts: [], total: 0, page: 1, totalPages: 0, currentPage: 1, totalCount: 0 }),
      enabled: !!params?.search,
      placeholderData: (previousData) => previousData,
    });
  };

  return {
    useBlogQuery,
    useCategoriesQuery,
    useSearchQuery,
  };
}

export default useBlogQueries;