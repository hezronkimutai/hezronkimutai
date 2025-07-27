import React, { memo } from 'react';
import { BlogPost } from '../../utils/markdownConverter';
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
            <span>Error loading blog posts: {error.message}</span>
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
            <span className="opacity-60">Loading blog posts...</span>
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
            <span className="opacity-60">No blog posts found</span>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={containerClasses} role="region" aria-labelledby="blog-title" aria-busy="false">
      <h2 id="blog-title" className="text-2xl font-bold mb-6">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post: BlogPost) => (
          <article
            key={post.slug}
            className="rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300
              border border-black/10 dark:border-white/10"
            data-testid="blog-post"
          >
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2 hover:text-blue-600">
                <a href={`/blog/${post.slug}`}>{post.metadata.title}</a>
              </h3>
              <p className="text-gray-600 mb-4">{post.metadata.description}</p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>{post.metadata.author}</span>
                <span>{new Date(post.metadata.date).toLocaleDateString()}</span>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {post.metadata.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
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