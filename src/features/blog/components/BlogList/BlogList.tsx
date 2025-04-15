import React, { memo } from 'react';
import { BlogPost } from '../../types';
import { Pagination } from '../../../../shared/components/Pagination';

interface BlogListBaseProps {
  posts: BlogPost[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
  error?: Error | null;
}

export interface BlogListProps extends BlogListBaseProps {
  title?: string;
  className?: string;
}

export const BlogList: React.FC<BlogListProps> = memo(({
  posts,
  currentPage,
  totalPages,
  onPageChange,
  title = 'Latest Posts',
  className = '',
  isLoading = false,
  error,
}) => {
  const containerClasses = `container mx-auto px-4 py-8 ${className}`.trim();

  if (error) {
    return (
      <section className={containerClasses} role="region" aria-busy="false">
        <div role="status" aria-label="Error loading blog posts">
          <h2 className="text-2xl font-bold mb-6">{title}</h2>
          <div className="flex justify-center items-center py-8">
            <span className="text-red-600">Error loading blog posts: {error.message}</span>
          </div>
        </div>
      </section>
    );
  }

  if (isLoading) {
    return (
      <section className={containerClasses} role="region" aria-busy="true">
        <div role="status" aria-label="Loading blog posts">
          <h2 className="text-2xl font-bold mb-6">{title}</h2>
          <div className="flex justify-center items-center py-8">
            <span className="text-gray-600">Loading blog posts...</span>
          </div>
        </div>
      </section>
    );
  }

  if (posts.length === 0) {
    return (
      <section className={containerClasses} role="region" aria-busy="false">
        <div role="status" aria-label="No blog posts found" aria-live="polite">
          <h2 className="text-2xl font-bold mb-6">{title}</h2>
          <div className="flex justify-center items-center py-8">
            <span className="text-gray-600">No blog posts found</span>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={containerClasses} role="region" aria-labelledby="blog-title" aria-busy="false">
      <h2 id="blog-title" className="text-2xl font-bold mb-6">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <article
            key={post.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
            data-testid="blog-post"
          >
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
            </div>
          </article>
        ))}
      </div>
      {totalPages > 1 && (
        <div className="mt-8">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </section>
  );
});

BlogList.displayName = 'BlogList';