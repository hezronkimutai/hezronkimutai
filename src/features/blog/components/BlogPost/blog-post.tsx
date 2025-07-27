import React from 'react';
import { Link } from 'react-router-dom';
import { BlogPost as MarkdownBlogPost } from '../../utils/markdownConverter';
import './blog-styles.css';

// Types
export interface BlogPostProps {
  post: MarkdownBlogPost;
  className?: string;
}

/**
 * Full blog post component for individual post display
 */
export const BlogPost: React.FC<BlogPostProps> = ({ post, className = '' }) => {
  const estimatedReadTime = Math.ceil(post.content.split(' ').length / 200);

  return (
    <div className={`py-20 px-4 ${className}`}>
      <div className="max-w-4xl mx-auto">
        {/* Back Navigation */}
        <div className="mb-8">
          <Link
            to="/blog"
            className="inline-flex items-center text-purple-400 hover:text-purple-300 
              transition-colors duration-300"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blog
          </Link>
        </div>

        {/* Article Header */}
        <header className="mb-12">
          <div className="mb-6">
            <div className="flex flex-wrap gap-2 mb-4">
              {post.metadata.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm 
                    border border-purple-500/30"
                >
                  #{tag}
                </span>
              ))}
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r 
              from-white to-gray-300 bg-clip-text text-transparent leading-tight">
              {post.metadata.title}
            </h1>
            
            <p className="text-xl text-gray-300 leading-relaxed">
              {post.metadata.description}
            </p>
          </div>

          {/* Author and Meta Info */}
          <div className="flex items-center justify-between flex-wrap gap-4 
            p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 
                flex items-center justify-center text-white font-bold text-lg">
                {post.metadata.author.charAt(0)}
              </div>
              <div>
                <div className="text-white font-semibold">{post.metadata.author}</div>
                <div className="text-gray-400 text-sm">Software Engineer</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {new Date(post.metadata.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {estimatedReadTime} min read
              </div>
            </div>
          </div>
        </header>

        {/* Article Content */}
        <article className="prose prose-lg prose-invert max-w-none">
          <div 
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </article>

        {/* Article Footer */}
        <footer className="mt-16 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Enjoyed this article?</h3>
              <p className="text-gray-300">
                Follow me for more insights on software development and cloud architecture.
              </p>
            </div>
            
            <div className="flex space-x-4">
              <a
                href="https://github.com/hezronkimutai"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 
                  transition-all duration-300 flex items-center"
              >
                🔗 GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/hezron-kimutai"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                  transition-all duration-300 flex items-center"
              >
                💼 LinkedIn
              </a>
            </div>
          </div>
        </footer>

        {/* Related Posts Navigation */}
        <div className="mt-16">
          <div className="text-center">
            <Link
              to="/blog"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 
                text-white font-semibold rounded-full hover:from-purple-700 hover:to-blue-700 
                transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
            >
              📚 Read More Articles
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Legacy FullBlogPost component for backward compatibility
 */
export const FullBlogPost = BlogPost;

// Set display names for better debugging
BlogPost.displayName = 'BlogPost';
FullBlogPost.displayName = 'FullBlogPost';