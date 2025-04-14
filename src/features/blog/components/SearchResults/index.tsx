import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useBlogQueries } from '../../hooks/useBlogQuery';
import { BlogSearchParams, BlogListResponse, BlogPost } from '../../types';

export const SearchResults: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const searchParameters: BlogSearchParams = {
    search: query,
    page: Number(searchParams.get('page')) || 1,
    limit: 10,
    sortBy: (searchParams.get('sortBy') as BlogSearchParams['sortBy']) || 'relevance'
  };
const { useSearchQuery } = useBlogQueries();
const { data, isLoading, error } = useSearchQuery(searchParameters);


  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-lg text-gray-600">Loading results...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-lg text-red-600">
          Error loading search results. Please try again.
        </div>
      </div>
    );
  }

  if (!data?.posts.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="text-lg text-gray-600 mb-4">
          No results found for "{query}"
        </div>
        <p className="text-sm text-gray-500">
          Try adjusting your search terms or browse all posts
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="border-b pb-4">
        <h2 className="text-xl font-semibold">
          Search Results for "{query}"
        </h2>
        <p className="text-sm text-gray-600">
          Found {data.totalCount} posts
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {data.posts.map((post) => (
          <article
            key={post.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            {post.coverImage && (
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {post.excerpt}
              </p>
              <div className="flex items-center text-sm text-gray-500">
                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                <span className="mx-2">•</span>
                <span>{post.readTime} min read</span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {data.totalPages > 1 && (
        <div className="flex justify-center mt-8">
          {/* Pagination controls will be added here */}
          <div className="flex space-x-2">
            {Array.from({ length: data.totalPages }, (_, i) => i + 1).map(
              (page) => (
                <button
                  key={page}
                  className={`px-4 py-2 rounded ${
                    page === data.currentPage
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                  onClick={() => {
                    searchParams.set('page', page.toString());
                    // Update URL with new search params
                    window.history.pushState(
                      {},
                      '',
                      `${window.location.pathname}?${searchParams.toString()}`
                    );
                  }}
                >
                  {page}
                </button>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchResults;