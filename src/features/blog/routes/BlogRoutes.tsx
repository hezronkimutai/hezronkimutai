import React from 'react';
import { useBlogQuery } from '../hooks/useBlogQuery';
import { BlogList } from '../components/BlogList';
import { BlogPost } from '../components/BlogPost';
import BlogCategory from '../components/BlogCategory';
import { BlogListResponse } from '../types';

const BlogListPage: React.FC = () => {
  const { data, isLoading, error } = useBlogQuery() as {
    data: BlogListResponse | undefined;
    isLoading: boolean;
    error: Error | null;
  };
  
  return (
    <BlogList
      posts={data?.posts || []}
      currentPage={data?.currentPage || 1}
      totalPages={data?.totalPages || 1}
      onPageChange={(page: number) => {
        // Handle page change
      }}
      isLoading={isLoading}
      error={error}
    />
  );
};

const BlogPostPage: React.FC = () => {
  // Add proper fetching logic for single post
  return (
    <BlogPost 
      post={{
        id: '1',
        title: 'Test Post',
        content: 'Content',
        slug: 'test-post',
        excerpt: 'Excerpt',
        author: {
          id: '1',
          name: 'Author',
          title: 'Writer',
          bio: 'Test bio'
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        readTime: 5,
        category: {
          id: '1',
          name: 'Test Category',
          slug: 'test-category'
        },
        tags: ['test', 'blog']
      }} 
    />
  );
};

export const blogRoutes = [
  {
    path: '/blog',
    element: <BlogListPage />,
  },
  {
    path: '/blog/:slug',
    element: <BlogPostPage />,
  },
  {
    path: '/blog/category/:categoryId',
    element: <BlogCategory />,
  },
];