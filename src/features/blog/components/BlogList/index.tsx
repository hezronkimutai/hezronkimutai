import React from 'react';

const BlogList: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Blog Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Blog post grid will be implemented here */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Coming Soon</h2>
          <p className="text-gray-600">Blog posts will be displayed here.</p>
        </div>
      </div>
    </div>
  );
};

export default BlogList;