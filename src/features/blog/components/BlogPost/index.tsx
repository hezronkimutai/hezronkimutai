import React from 'react';
import { useParams } from 'react-router-dom';

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  return (
    <article className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Blog Post: {slug}</h1>
        <div className="prose lg:prose-xl">
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-600 mb-4">
              This is a placeholder for the blog post content.
              The full implementation will fetch and display the post content based on the slug.
            </p>
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h2 className="text-xl font-semibold mb-2">Coming Soon</h2>
              <ul className="list-disc list-inside text-gray-600">
                <li>Full blog post content</li>
                <li>Author information</li>
                <li>Comments section</li>
                <li>Social sharing</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogPost;