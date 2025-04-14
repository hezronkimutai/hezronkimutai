import React from 'react';
import { useParams } from 'react-router-dom';

const BlogCategory: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  
  return (
    <div>
      <h1>Blog Category: {categoryId}</h1>
      {/* Add category specific blog listing */}
    </div>
  );
};

export default BlogCategory;
export { BlogCategory };