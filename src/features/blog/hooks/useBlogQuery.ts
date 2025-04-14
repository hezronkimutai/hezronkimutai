import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { blogApi } from '../api/blogApi';
import { BlogQueryParams, BlogListResponse } from '../types';

export const useBlogQuery = (params?: BlogQueryParams): UseQueryResult<BlogListResponse, Error> => {
  return useQuery({
    queryKey: ['blogs', params],
    queryFn: () => blogApi.getBlogs(params),
    placeholderData: (previousData) => previousData,
  });
};

// We keep this for backward compatibility
export const useBlogQueries = {
  useBlogQuery,
};

export default useBlogQuery;