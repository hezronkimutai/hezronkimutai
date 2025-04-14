import React from 'react';
import { BlogPost as BlogPostType } from '../../types';
import * as styles from './BlogPost.module.scss';

interface BlogPostProps {
  post: BlogPostType;
}

export const BlogPostComponent: React.FC<BlogPostProps> = ({ post }) => {
  return (
    <article className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>{post.title}</h1>
        <div className={styles.meta}>
          <div className={styles.metaItem}>
            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
            <span className={styles.metaDivider}>•</span>
            <span>{post.readTime} min read</span>
          </div>
          <div className={styles.author}>
            {post.author.avatar && (
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className={styles.authorAvatar}
              />
            )}
            <div className={styles.authorInfo}>
              <span className={styles.authorName}>{post.author.name}</span>
              <span className={styles.authorTitle}>{post.author.title}</span>
            </div>
          </div>
        </div>
      </header>

      {post.coverImage && (
        <img
          src={post.coverImage}
          alt={post.title}
          className={styles.coverImage}
        />
      )}

      <div className={styles.content}>
        <div
          className={styles.body}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {post.tags && post.tags.length > 0 && (
          <div className={styles.tags}>
            {post.tags.map((tag) => (
              <a key={tag} href={`/blog/tag/${tag}`} className={styles.tag}>
                #{tag}
              </a>
            ))}
          </div>
        )}

        <div className={styles.share}>
          <h3 className={styles.shareTitle}>Share this post</h3>
          <div className={styles.shareButtons}>
            <button
              onClick={() => window.open(`https://twitter.com/intent/tweet?url=${window.location.href}`, '_blank')}
              className={styles.shareButton}
              aria-label="Share on Twitter"
            >
              <TwitterIcon />
            </button>
            <button
              onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`, '_blank')}
              className={styles.shareButton}
              aria-label="Share on Facebook"
            >
              <FacebookIcon />
            </button>
            <button
              onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`, '_blank')}
              className={styles.shareButton}
              aria-label="Share on LinkedIn"
            >
              <LinkedInIcon />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5 0-.278-.028-.556-.08-.83A7.72 7.72 0 0 0 23 3z" />
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default BlogPostComponent;