import { useQuery } from '@tanstack/react-query';
import type { UseQueryResult } from '@tanstack/react-query';
import { BlogPost, getAllBlogPosts, convertMarkdownToHtml } from '../utils/markdownConverter';

export interface MarkdownBlogResponse {
  posts: BlogPost[];
  currentPage: number;
  totalPages: number;
  totalCount: number;
}

const POSTS_PER_PAGE = 6;

// Add explicit type for query result
export type MarkdownBlogQueryResult = UseQueryResult<MarkdownBlogResponse, Error>;

export const useMarkdownBlogs = (page: number = 1): MarkdownBlogQueryResult => {
  return useQuery({
    queryKey: ['markdown-blogs', page],
    queryFn: async () => {
      const allPosts = await getAllBlogPosts();
      const startIndex = (page - 1) * POSTS_PER_PAGE;
      const endIndex = startIndex + POSTS_PER_PAGE;
      const paginatedPosts = allPosts.slice(startIndex, endIndex);
      
      return {
        posts: paginatedPosts,
        currentPage: page,
        totalPages: Math.ceil(allPosts.length / POSTS_PER_PAGE),
        totalCount: allPosts.length
      };
    }
  });
};

export const useMarkdownBlogPost = (slug: string): UseQueryResult<BlogPost, Error> => {
  return useQuery({
    queryKey: ['markdown-blog', slug],
    queryFn: async () => {
      const allPosts = await getAllBlogPosts();
      const post = allPosts.find(p => p.slug === slug);
      if (!post) {
        throw new Error('Blog post not found');
      }
      return post;
    }
  });
};