import React from 'react';
import { useParams } from 'react-router-dom';

const BlogCategory: React.FC = () => {
  const { category } = useParams<{ category: string }>();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Category: {category}</h1>
        
        <div className="mb-8">
          <div className="inline-flex gap-2 items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full">
            <span className="font-medium">{category}</span>
            <span className="bg-blue-200 px-2 py-1 rounded-full text-sm">0 posts</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-gray-600 mb-4">
            This page will display all blog posts in the {category} category.
            Category filtering functionality will be implemented soon.
          </p>
          
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h2 className="text-xl font-semibold mb-2">Coming Soon</h2>
            <ul className="list-disc list-inside text-gray-600">
              <li>Category-specific blog posts</li>
              <li>Category description</li>
              <li>Related categories</li>
              <li>Category-based filtering</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCategory;