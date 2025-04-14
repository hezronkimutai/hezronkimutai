import React, { Suspense, useMemo } from 'react';
import { Routes, Route, Navigate, useParams, useSearchParams } from 'react-router-dom';
import { isValidBlogRoute } from './types';
import { BlogList } from '../components/BlogList';
import { BlogPost } from '../components/BlogPost';
import type { BlogPostsResponse } from '../types/blog';
import { mockPosts } from '../types/blog';

// Manual loading spinner component to avoid path issues
const LoadingSpinner: React.FC<{ text?: string }> = ({ text }) => (
  <div className="flex items-center justify-center p-4">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
    {text && <span className="ml-2">{text}</span>}
  </div>
);

export interface BlogRoutesProps {
  /**
   * Optional className for container
   */
  className?: string;
}

/**
 * Blog feature routing component
 */
export const BlogRoutes: React.FC<BlogRoutesProps> = ({ className }) => {
  // Loading state component
  const fallback = useMemo(() => (
    <div className={className}>
      <LoadingSpinner text="Loading blog content..." />
    </div>
  ), [className]);

  return (
    <Suspense fallback={fallback}>
      <Routes>
        {/* Blog home page */}
        <Route
          path="/"
          element={<BlogListRoute className={className} />}
        />

        {/* Category pages */}
        <Route
          path="/category/:category"
          element={<BlogListRoute className={className} />}
        />

        {/* Search results */}
        <Route
          path="/search"
          element={<BlogListRoute className={className} />}
        />

        {/* Archive page */}
        <Route
          path="/archive"
          element={<BlogListRoute className={className} />}
        />

        {/* Author pages */}
        <Route
          path="/author/:authorId"
          element={<BlogListRoute className={className} />}
        />

        {/* Individual blog posts */}
        <Route
          path="/:slug"
          element={
            <VerifyRoute>
              <BlogPostRoute className={className} />
            </VerifyRoute>
          }
        />

        {/* 404 catch-all */}
        <Route
          path="*"
          element={<Navigate to="/404" replace />}
        />
      </Routes>
    </Suspense>
  );
};

/**
 * Route component for blog list pages
 */
const BlogListRoute: React.FC<{ className?: string }> = ({ className }) => {
  const params = useParams();
  const [searchParams] = useSearchParams();

  // Get current page from URL or default to 1
  const page = Number(searchParams.get('page')) || 1;
  const perPage = 6;

  // Calculate paginated data
  const data: BlogPostsResponse = useMemo(() => {
    let filteredPosts = [...mockPosts];

    // Apply category filter
    if (params.category) {
      filteredPosts = filteredPosts.filter(post =>
        post.categories.some(cat => cat.slug === params.category)
      );
    }

    // Apply author filter
    if (params.authorId) {
      filteredPosts = filteredPosts.filter(post =>
        post.author.id === params.authorId
      );
    }

    // Apply search filter if on search page
    const searchQuery = searchParams.get('q')?.toLowerCase();
    if (searchQuery) {
      filteredPosts = filteredPosts.filter(post =>
        post.title.toLowerCase().includes(searchQuery) ||
        post.content.toLowerCase().includes(searchQuery)
      );
    }

    const total = filteredPosts.length;
    const totalPages = Math.ceil(total / perPage);
    const currentPagePosts = filteredPosts.slice(
      (page - 1) * perPage,
      page * perPage
    );

    return {
      posts: currentPagePosts,
      total,
      page,
      perPage,
      totalPages,
    };
  }, [params, searchParams, page]);

  return <BlogList data={data} className={className} />;
};

/**
 * Route component for individual blog posts
 */
const BlogPostRoute: React.FC<{ className?: string }> = ({ className }) => {
  const { slug } = useParams();
  const post = useMemo(() => 
    mockPosts.find(p => p.slug === slug),
    [slug]
  );

  if (!post) {
    return <Navigate to="/404" replace />;
  }

  return <BlogPost {...post} className={className} />;
};

/**
 * Route wrapper that verifies valid blog routes
 */
const VerifyRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const path = window.location.pathname;
  return isValidBlogRoute(path) ? <>{children}</> : <Navigate to="/404" replace />;
};

BlogRoutes.displayName = 'BlogRoutes';

export default BlogRoutes;