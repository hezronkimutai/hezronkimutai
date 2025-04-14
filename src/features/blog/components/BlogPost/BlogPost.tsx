import React from 'react';
import { BlogPost as BlogPostType } from '../../types';

export interface BlogPostPreviewProps {
  mode: 'preview';
  title: string;
  slug?: string;
  className?: string;
}

export interface BlogPostFullProps {
  mode: 'full';
  post: BlogPostType;
  className?: string;
}

export type BlogPostProps = BlogPostPreviewProps | BlogPostFullProps;

export const BlogPost: React.FC<BlogPostProps> = (props) => {
  if (props.mode === 'preview') {
    return (
      <article className={`bg-white p-6 rounded-lg shadow ${props.className || ''}`} data-testid="blog-post">
        <h2 className="text-2xl font-semibold mb-4">
          <a href={`/blog/${props.slug}`}>{props.title}</a>
        </h2>
        {props.slug && (
          <a 
            href={`/blog/${props.slug}`}
            className="text-blue-600 hover:text-blue-800 transition-colors"
          >
            Read more →
          </a>
        )}
      </article>
    );
  }

  const { post, className } = props;
  return (
    <article 
      className={`container mx-auto bg-white p-6 rounded-lg shadow ${className || ''}`}
      itemScope
      itemType="http://schema.org/BlogPosting"
    >
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <div className="flex items-center text-gray-600">
          <span itemProp="datePublished">
            {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : post.createdAt ? new Date(post.createdAt).toLocaleDateString() : ''}
          </span>
          <span className="mx-2">•</span>
          <span>{post.readingTime} min read</span>
        </div>
      </header>

      {post.featuredImage && (
        <img
          src={post.featuredImage}
          alt={post.title}
          className="w-full h-64 object-cover rounded-lg mb-8"
          loading="lazy"
          itemProp="image"
        />
      )}

      <div 
        className="prose max-w-none"
        itemProp="articleBody"
      >
        {post.content}
      </div>

      <footer className="mt-8 pt-8 border-t">
        <div className="flex items-center" itemProp="author" itemScope itemType="http://schema.org/Person">
          <div className="flex-shrink-0">
            {post.author.avatarUrl && (
              <img
                src={post.author.avatarUrl}
                alt={post.author.name}
                className="h-10 w-10 rounded-full"
                loading="lazy"
              />
            )}
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium" itemProp="name">{post.author.name}</p>
            {post.author.bio && (
              <p className="text-sm text-gray-500" itemProp="description">{post.author.bio}</p>
            )}
          </div>
        </div>
      </footer>
    </article>
  );
};

BlogPost.displayName = 'BlogPost';