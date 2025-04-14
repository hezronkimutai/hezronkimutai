import React from 'react';
import { BlogPost as BlogPostType } from '../../types';

interface BlogPostViewProps {
  post: BlogPostType;
}

interface BlogPostPreviewProps {
  title: string;
  slug?: string;
}

export const BlogPost: React.FC<BlogPostPreviewProps> = ({ title, slug }) => {
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

export const FullBlogPost: React.FC<BlogPostViewProps> = ({ post }) => {
  return (
    <article className="container mx-auto bg-white p-6 rounded-lg shadow">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <div className="flex items-center text-gray-600">
          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
          <span className="mx-2">•</span>
          <span>{post.readTime} min read</span>
        </div>
      </header>
      {post.coverImage && (
        <img 
          src={post.coverImage} 
          alt={post.title}
          className="w-full h-64 object-cover rounded-lg mb-8"
        />
      )}
      <div className="prose max-w-none">
        {post.content}
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

export type { BlogPostViewProps, BlogPostPreviewProps };
export default BlogPost;