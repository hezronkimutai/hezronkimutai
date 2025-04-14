import React from 'react';
import { useBlogQuery } from '../hooks/useBlogQuery';
import { BlogList } from '../components/BlogList';
import { BlogPost } from '../components/BlogPost';
import BlogCategory from '../components/BlogCategory';
import NotFound from '../../../shared/components/NotFound';
import { BlogListResponse } from '../types';
import { RouteConfig } from '../../../types/route';
import { Routes, Route, useParams } from 'react-router-dom';
import { mockPosts } from '../types/blog'; // Temporary for finding post by slug

const createRoute = (config: RouteConfig): RouteConfig => config;

const BlogListPage: React.FC<{ className?: string }> = ({ className }) => {
  const { data, isLoading, error } = useBlogQuery() as {
    data: BlogListResponse | undefined;
    isLoading: boolean;
    error: Error | null;
  };
  
  if (isLoading) {
    return (
      <div className={className}>
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500" />
          <span className="ml-2">Loading blog content...</span>
        </div>
      </div>
    );
  }

  return (
    <BlogList
      className={className}
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

const BlogPostPage: React.FC<{ className?: string }> = ({ className }) => {
  const { slug } = useParams<{ slug: string }>();
  
  // Simulate finding the post by slug - replace with actual data fetching later
  const post = mockPosts.find(p => p.slug === slug);

  // TODO: Add loading and error states from actual data fetching hook

  if (!post) {
    // If post not found for the slug, render NotFound
    return <NotFound />;
  }

  return (
    <BlogPost
      className={className}
      mode="full"
      post={post}
    />
  );
};

const routes: RouteConfig[] = [
  createRoute({
    path: '',
    exact: true,
    component: BlogListPage,
  }),
  createRoute({
    path: 'search',
    exact: true,
    component: BlogListPage,
  }),
  createRoute({
    path: 'archive',
    exact: true,
    component: BlogListPage,
  }),
  createRoute({
    path: 'author/:authorId',
    exact: true,
    component: BlogListPage,
  }),
  createRoute({
    path: 'category/:categoryId',
    exact: true,
    component: BlogCategory,
  }),
  createRoute({
    path: ':slug',
    exact: true,
    component: BlogPostPage,
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
          <Route
            key={path}
            path={path}
            element={<Component className={className} />}
          />
        ))}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};