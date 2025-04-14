import React from 'react';
import { useBlogQuery } from '../hooks/useBlogQuery';
import { BlogList } from '../components/BlogList';
import { BlogPost } from '../components/BlogPost';
import BlogCategory from '../components/BlogCategory';
import { BlogListResponse } from '../types';
import { RouteConfig } from '../../../types/route';
import { Routes, Route } from 'react-router-dom';

const createRoute = (config: RouteConfig): RouteConfig => config;

const BlogListPage: React.ComponentType = () => {
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

const BlogPostPage: React.ComponentType = () => {
  // Add proper fetching logic for single post
  return (
    <BlogPost
      mode="full"
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

const routes: RouteConfig[] = [
  createRoute({
    path: '/blog',
    exact: true,
    component: BlogListPage,
  }),
  createRoute({
    path: '/blog/:slug',
    exact: false,
    component: BlogPostPage,
  }),
  createRoute({
    path: '/blog/category/:categoryId',
    exact: false,
    component: BlogCategory,
  }),
];

export const blogRoutes = routes;

interface BlogRoutesProps {
  className?: string;
}

export const BlogRoutes: React.FC<BlogRoutesProps> = ({ className }) => {
  return (
    <div className={className}>
      <Routes>
        {blogRoutes.map(({ path, component: Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
      </Routes>
    </div>
  );
};