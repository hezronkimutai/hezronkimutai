import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { BlogPost } from '../../utils/markdownConverter';

interface BlogListProps {
  posts: BlogPost[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
  error?: Error | null;
  title?: string;
  className?: string;
}

const BlogList: React.FC<BlogListProps> = memo(({
  posts,
  currentPage,
  totalPages,
  onPageChange,
  title = 'Latest Blog Posts',
  className = '',
  isLoading = false,
  error = null
}) => {
  if (isLoading) {
    return (
      <section className={`py-20 px-4 ${className}`}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="w-8 h-8 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
            </div>
            <p className="text-gray-300">Loading blog posts...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={`py-20 px-4 ${className}`}>
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-red-400 mb-4">❌</div>
          <h2 className="text-2xl font-bold text-white mb-4">Error Loading Posts</h2>
          <p className="text-gray-300">{error.message}</p>
        </div>
      </section>
    );
  }

  if (posts.length === 0) {
    return (
      <section className={`py-20 px-4 ${className}`}>
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-6xl mb-4">📝</div>
          <h2 className="text-2xl font-bold text-white mb-4">No Posts Found</h2>
          <p className="text-gray-300">Check back later for new content!</p>
        </div>
      </section>
    );
  }

  return (
    <section className={`py-20 px-4 ${className}`}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r 
            from-white to-gray-300 bg-clip-text text-transparent">
            {title}
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Insights, tutorials, and thoughts on software development, 
            cloud architecture, and modern web technologies.
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {posts.map((post, index) => (
            <article
              key={post.slug}
              className="group bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden 
                border border-white/10 hover:border-white/20 transition-all duration-300
                hover:transform hover:scale-105"
              style={{
                animationDelay: `${index * 0.1}s`
              }}
            >
              {/* Post Header */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 
                      flex items-center justify-center text-white font-bold text-sm">
                      {post.metadata.author.charAt(0)}
                    </div>
                    <span className="text-gray-300 text-sm">{post.metadata.author}</span>
                  </div>
                  <span className="text-gray-400 text-sm">
                    {new Date(post.metadata.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                </div>

                <Link to={`/blog/${post.slug}`}>
                  <h2 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 
                    transition-colors duration-300 line-clamp-2">
                    {post.metadata.title}
                  </h2>
                </Link>

                <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
                  {post.metadata.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.metadata.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-white/10 rounded text-xs text-gray-300 
                        hover:bg-white/20 transition-colors duration-200"
                    >
                      #{tag}
                    </span>
                  ))}
                  {post.metadata.tags.length > 3 && (
                    <span className="px-2 py-1 text-xs text-gray-400">
                      +{post.metadata.tags.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              {/* Post Footer */}
              <div className="px-6 pb-6">
                <Link
                  to={`/blog/${post.slug}`}
                  className="inline-flex items-center text-purple-400 hover:text-purple-300 
                    transition-colors duration-300 text-sm font-medium"
                >
                  Read more
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" 
                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 
                opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </article>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-4">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 
                disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              Previous
            </button>
            
            <div className="flex space-x-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => onPageChange(page)}
                  className={`w-10 h-10 rounded-lg font-medium transition-all duration-300 ${
                    page === currentPage
                      ? 'bg-purple-600 text-white'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
            
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 
                disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              Next
            </button>
          </div>
        )}

        {/* Blog Stats */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-8 px-8 py-4 bg-white/5 backdrop-blur-sm 
            rounded-full border border-white/10">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">{posts.length}</div>
              <div className="text-sm text-gray-400">Articles</div>
            </div>
            <div className="w-px h-8 bg-white/20"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">
                {posts.reduce((acc, post) => acc + post.metadata.tags.length, 0)}
              </div>
              <div className="text-sm text-gray-400">Topics</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

BlogList.displayName = 'BlogList';

export { BlogList };
export default BlogList;