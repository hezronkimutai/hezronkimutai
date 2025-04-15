import React from 'react';
import { BlogPost as BlogPostType } from '../../types';

// Types
export interface BlogPostProps {
  title: string;
  slug?: string;
}

export interface FullBlogPostProps {
  post: BlogPostType;
}

/**
 * Preview version of a blog post with minimal information
 */
export const BlogPost: React.FC<BlogPostProps> = ({ title, slug }) => {
  return (
    <article className="bg-white p-6 rounded-lg shadow" data-testid="blog-post">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      {slug && (
        <a 
          href={`/blog/${slug}`}
          className="text-blue-600 hover:text-blue-800 transition-colors"
        >
          Read more →
        </a>
      )}
    </article>
  );
};

/**
 * Full version of a blog post with complete information
 */
export const FullBlogPost: React.FC<FullBlogPostProps> = ({ post }) => {
  // Format the date for display, ensuring we have a valid date string
  const displayDate = post.publishedAt 
    ? new Date(post.publishedAt).toLocaleDateString()
    : (post.createdAt ? new Date(post.createdAt).toLocaleDateString() : 'No date');

  return (
    <article className="container mx-auto bg-white p-6 rounded-lg shadow">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <div className="flex items-center text-gray-600">
          <span>{displayDate}</span>
          <span className="mx-2">•</span>
          <span>{post.readingTime} min read</span>
        </div>
      </header>
      
      {post.featuredImage && (
        <img 
          src={post.featuredImage}
          alt={post.title}
          className="w-full h-64 object-cover rounded-lg mb-8"
        />
      )}
      
      <div className="prose max-w-none">
        <div>{post.content}</div>
      </div>
      
      <footer className="mt-8 pt-8 border-t">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            {post.author.avatar && (
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="h-10 w-10 rounded-full"
              />
            )}
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium">{post.author.name}</p>
            {post.author.bio && (
              <p className="text-sm text-gray-500">{post.author.bio}</p>
            )}
          </div>
        </div>
      </footer>
    </article>
  );
};

// Set display names for better debugging
BlogPost.displayName = 'BlogPost';
FullBlogPost.displayName = 'FullBlogPost';