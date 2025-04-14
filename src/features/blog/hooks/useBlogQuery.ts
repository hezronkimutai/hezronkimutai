import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  BlogPost,
  BlogListResponse,
  BlogQueryParams,
  BlogSearchParams,
  Category
} from '../types';
import { useBlogApi } from './useBlogApi';

const CACHE_KEYS = {
  posts: 'blog-posts',
  post: 'blog-post',
  categories: 'blog-categories',
  search: 'blog-search'
} as const;

export function useBlogQueries() {
  const queryClient = useQueryClient();
  const { getBlogPosts, getBlogPost, getCategories, searchPosts } = useBlogApi();

  // Query hooks
  const usePostsQuery = (params?: BlogQueryParams) =>
    useQuery({
      queryKey: [CACHE_KEYS.posts, params] as const,
      queryFn: () => getBlogPosts(params),
      gcTime: 30 * 60 * 1000, // Keep cache for 30 minutes
    });

  const usePostQuery = (slug: string) =>
    useQuery({
      queryKey: [CACHE_KEYS.post, slug] as const,
      queryFn: () => getBlogPost(slug),
      gcTime: 30 * 60 * 1000,
    });

  const useCategoriesQuery = () =>
    useQuery({
      queryKey: [CACHE_KEYS.categories] as const,
      queryFn: getCategories,
      gcTime: 60 * 60 * 1000,
    });

  const useSearchQuery = (searchParams: BlogSearchParams) =>
    useQuery({
      queryKey: [CACHE_KEYS.search, searchParams] as const,
      queryFn: () => searchPosts(searchParams),
      gcTime: 15 * 60 * 1000,
      enabled: !!searchParams.search
    });

  // Prefetch functions
  const prefetchPost = async (slug: string) => {
    await queryClient.prefetchQuery({
      queryKey: [CACHE_KEYS.post, slug] as const,
      queryFn: () => getBlogPost(slug),
    });
  };

  const prefetchPosts = async (params?: BlogQueryParams) => {
    await queryClient.prefetchQuery({
      queryKey: [CACHE_KEYS.posts, params] as const,
      queryFn: () => getBlogPosts(params),
    });
  };

  // Cache invalidation
  const invalidatePostsCache = () => {
    queryClient.invalidateQueries({ queryKey: [CACHE_KEYS.posts] });
  };

  const invalidatePostCache = (slug: string) => {
    queryClient.invalidateQueries({ queryKey: [CACHE_KEYS.post, slug] });
  };

  return {
    usePostsQuery,
    usePostQuery,
    useCategoriesQuery,
    useSearchQuery,
    prefetchPost,
    prefetchPosts,
    invalidatePostsCache,
    invalidatePostCache,
  };
}