import React from 'react';
import { Link } from 'react-router-dom';
import { BlogPost } from '../../types';
import { Pagination } from '../../../../shared/components/Pagination';
import * as styles from './BlogList.module.scss';

interface BlogListProps {
  posts: BlogPost[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
  error?: Error | null;
}

export const BlogList: React.FC<BlogListProps> = ({
  posts,
  currentPage,
  totalPages,
  onPageChange,
  isLoading,
  error
}) => {
  if (isLoading) {
    return (
      <div className={styles.loadingState}>
        <div>Loading posts...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorState}>
        <div>Error loading posts: {error.message}</div>
      </div>
    );
  }

  if (!posts.length) {
    return (
      <div className={styles.emptyState}>
        <div>No posts found</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.blogGrid}>
        {posts.map((post) => (
          <article key={post.id} className={styles.blogCard}>
            {post.coverImage && (
              <img
                src={post.coverImage}
                alt={post.title}
                className={styles.cardImage}
              />
            )}
            <div className={styles.cardContent}>
              <h2 className={styles.cardTitle}>
                <Link to={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>
              <p className={styles.cardExcerpt}>{post.excerpt}</p>
              <div className={styles.cardMeta}>
                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                <span className={styles.cardMetaDivider}>•</span>
                <span>{post.readTime} min read</span>
              </div>
            </div>
          </article>
        ))}
      </div>
      
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
};