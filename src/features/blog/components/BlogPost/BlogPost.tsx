import React from 'react';
import type { BlogPost as BlogPostType } from '../../types/blog';
import styles from './BlogPost.module.scss';

export interface BlogPostProps extends BlogPostType {
  /**
   * Optional className for styling
   */
  className?: string;

  /**
   * Optional preview mode for list views
   */
  isPreview?: boolean;
}

export const BlogPost: React.FC<BlogPostProps> = ({
  title,
  excerpt,
  content,
  author,
  categories,
  featuredImage,
  publishedAt,
  updatedAt,
  readingTime,
  className = '',
  isPreview = false,
}) => {
  const formattedDate = new Date(publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const formattedUpdateDate = updatedAt
    ? new Date(updatedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null;

  return (
    <article 
      className={`${styles.container} ${className}`.trim()}
      itemScope 
      itemType="http://schema.org/BlogPosting"
    >
      {featuredImage && (
        <div className={styles.imageWrapper}>
          <img
            src={featuredImage}
            alt={`Featured image for ${title}`}
            className={styles.image}
            loading="lazy"
            itemProp="image"
          />
        </div>
      )}

      <div className={styles.content}>
        <header className={styles.header}>
          <h1 
            className={isPreview ? styles.previewTitle : styles.title}
            itemProp="headline"
          >
            {isPreview ? (
              <a href={`/blog/${title.toLowerCase().replace(/\s+/g, '-')}`} className={styles.titleLink}>
                {title}
              </a>
            ) : (
              title
            )}
          </h1>

          <div className={styles.meta}>
            <div className={styles.author} itemProp="author" itemScope itemType="http://schema.org/Person">
              {author.avatarUrl && (
                <img
                  src={author.avatarUrl}
                  alt={author.name}
                  className={styles.avatar}
                  loading="lazy"
                  itemProp="image"
                />
              )}
              <span itemProp="name">{author.name}</span>
            </div>

            <time 
              dateTime={publishedAt}
              className={styles.date}
              itemProp="datePublished"
            >
              {formattedDate}
            </time>

            {formattedUpdateDate && (
              <time 
                dateTime={updatedAt}
                className={styles.updateDate}
                itemProp="dateModified"
              >
                Updated: {formattedUpdateDate}
              </time>
            )}

            <span className={styles.readingTime}>
              {readingTime} min read
            </span>
          </div>

          {categories.length > 0 && (
            <div className={styles.categories}>
              {categories.map(category => (
                <a
                  key={category.id}
                  href={`/blog/category/${category.slug}`}
                  className={styles.category}
                >
                  {category.name}
                </a>
              ))}
            </div>
          )}
        </header>

        <div 
          className={styles.body}
          itemProp="articleBody"
        >
          {isPreview ? (
            <>
              <p>{excerpt}</p>
              <a
                href={`/blog/${title.toLowerCase().replace(/\s+/g, '-')}`}
                className={styles.readMore}
                aria-label={`Read more about ${title}`}
              >
                Read more
              </a>
            </>
          ) : (
            <div dangerouslySetInnerHTML={{ __html: content }} />
          )}
        </div>

        {!isPreview && author.bio && (
          <footer className={styles.footer}>
            <div className={styles.authorBio}>
              <h2>About the Author</h2>
              <p>{author.bio}</p>
              {author.socials && (
                <div className={styles.socials}>
                  {author.socials.twitter && (
                    <a
                      href={author.socials.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.socialLink}
                      aria-label={`Follow ${author.name} on Twitter`}
                    >
                      <span className={`${styles.socialIcon} ${styles.twitterIcon}`} />
                    </a>
                  )}
                  {author.socials.github && (
                    <a
                      href={author.socials.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.socialLink}
                      aria-label={`Follow ${author.name} on GitHub`}
                    >
                      <span className={`${styles.socialIcon} ${styles.githubIcon}`} />
                    </a>
                  )}
                  {author.socials.linkedin && (
                    <a
                      href={author.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.socialLink}
                      aria-label={`Connect with ${author.name} on LinkedIn`}
                    >
                      <span className={`${styles.socialIcon} ${styles.linkedinIcon}`} />
                    </a>
                  )}
                </div>
              )}
            </div>
          </footer>
        )}
      </div>
    </article>
  );
};

BlogPost.displayName = 'BlogPost';

export default React.memo(BlogPost);