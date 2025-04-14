import { useQuery } from '@tanstack/react-query';
import { blogApi } from '../api/blogApi';
import { BlogQueryParams, BlogListResponse } from '../types';

export const useBlogQuery = (params?: BlogQueryParams) => {
  return useQuery(['blogs', params], () => blogApi.getBlogs(params), {
    keepPreviousData: true,
  });
};

export const useBlogQueries = {
  useBlogQuery,
};