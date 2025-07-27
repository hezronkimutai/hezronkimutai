import React, { useState, useCallback } from 'react';
import { BlogList } from '../components/BlogList';
import { BlogPost } from '../components/BlogPost';
import BlogCategory from '../components/BlogCategory';
import NotFound from '../../../shared/components/NotFound';
import { RouteConfig } from '../../../types/route';
import { useMarkdownBlogs, useMarkdownBlogPost } from '../hooks/useMarkdownBlogs';
import { Routes, Route, useParams } from 'react-router-dom';
import { mockPosts } from '../types/blog'; // Temporary for finding post by slug

const createRoute = (config: RouteConfig): RouteConfig => config;

const BlogListPage: React.FC<{ className?: string }> = ({ className }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, error } = useMarkdownBlogs(currentPage);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  }, []);
  
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
      currentPage={currentPage}
      totalPages={data?.totalPages || 1}
      onPageChange={handlePageChange}
      isLoading={isLoading}
      error={error}
    />
  );
};

const BlogPostPage: React.FC<{ className?: string }> = ({ className }) => {
  const { slug } = useParams<{ slug: string }>();
  const { data: post, isLoading, error } = useMarkdownBlogPost(slug || '');
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500" />
        <span className="ml-2">Loading post...</span>
      </div>
    );
  }

  if (error || !post) {
    return <NotFound />;
  }

  return (
    <article className={`${className} prose lg:prose-xl mx-auto p-8`}>
      <h1>{post.metadata.title}</h1>
      <div className="meta text-gray-600 mb-8">
        <span>{new Date(post.metadata.date).toLocaleDateString()}</span>
        <span className="mx-2">•</span>
        <span>{post.metadata.author}</span>
      </div>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
      <div className="mt-8 flex gap-2">
        {post.metadata.tags.map(tag => (
          <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
            {tag}
          </span>
        ))}
      </div>
    </article>
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