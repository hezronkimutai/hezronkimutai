import React, { useState } from 'react';
import { BlogPost } from '../BlogPost';
import { Pagination } from '../../../home/components/Pagination';
import type { BlogPostsResponse } from '../../types/blog';
import styles from './BlogList.module.scss';

export interface BlogListProps {
  /**
   * Optional className for container styles
   */
  className?: string;

  /**
   * Optional title override
   */
  title?: string;

  /**
   * Blog posts data with pagination info
   */
  data: BlogPostsResponse;

  /**
   * Callback when page changes
   */
  onPageChange?: (page: number) => void;

  /**
   * Loading state
   */
  isLoading?: boolean;
}

export const BlogList: React.FC<BlogListProps> = ({
  className = '',
  title = 'Latest Posts',
  data,
  onPageChange,
  isLoading = false,
}) => {
  const [currentPage, setCurrentPage] = useState(data.page);
  
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    onPageChange?.(newPage);
  };
  
  const handleNextPage = () => {
    if (currentPage < data.totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const showPagination = !isLoading && data.posts.length > 0 && data.totalPages > 1;
  const showEmpty = !isLoading && data.posts.length === 0;

  // Calculate visible posts for current page
  const startIndex = (currentPage - 1) * data.perPage;
  const endIndex = Math.min(startIndex + data.perPage, data.posts.length);
  const visiblePosts = data.posts.slice(startIndex, endIndex);

  return (
    <section 
      className={`${styles.container} ${className}`.trim()}
      aria-labelledby="blog-title"
      aria-busy={isLoading}
    >
      <h2 
        id="blog-title"
        className={styles.title}
        data-aos="flip-right"
      >
        {title}
      </h2>

      {isLoading ? (
        <div 
          className={styles.loading}
          role="status"
          aria-label="Loading blog posts"
        >
          <div className={styles.spinner} />
          <span className="sr-only">Loading blog posts...</span>
        </div>
      ) : showEmpty ? (
        <p 
          className={styles.empty}
          role="status"
          aria-label="No blog posts found"
        >
          No blog posts found.
        </p>
      ) : (
        <>
          <div className={styles.grid}>
            {visiblePosts.map(post => (
              <BlogPost
                key={post.id}
                {...post}
                isPreview
                className={styles.post}
              />
            ))}
          </div>

          {showPagination && (
            <Pagination
              currentPage={currentPage}
              totalPages={data.totalPages}
              onNext={handleNextPage}
              onPrev={handlePrevPage}
              className={styles.pagination}
            />
          )}
        </>
      )}
    </section>
  );
};

BlogList.displayName = 'BlogList';

export default React.memo(BlogList);