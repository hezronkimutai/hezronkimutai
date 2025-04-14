import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useBlogQueries } from '../../hooks/useBlogQuery';
import { Category } from '../../types';

interface CategoryFilterProps {
  className?: string;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({ className = '' }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const selectedCategories = searchParams.getAll('category');

  const { useCategoriesQuery } = useBlogQueries();
  const { data: categories, isLoading } = useCategoriesQuery();

  const handleCategoryClick = (categorySlug: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    
    if (selectedCategories.includes(categorySlug)) {
      // Remove category if already selected
      newSearchParams.delete('category');
      selectedCategories
        .filter(cat => cat !== categorySlug)
        .forEach(cat => newSearchParams.append('category', cat));
    } else {
      // Add new category
      newSearchParams.append('category', categorySlug);
    }
    
    navigate({
      pathname: '/blog/search',
      search: newSearchParams.toString()
    });
  };

  if (isLoading) {
    return (
      <div className={`animate-pulse ${className}`}>
        <div className="h-6 bg-gray-200 rounded w-32 mb-4"></div>
        <div className="space-y-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-8 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  if (!categories?.length) {
    return null;
  }

  return (
    <div className={className}>
      <h2 className="text-lg font-semibold mb-4">Categories</h2>
      <div className="space-y-2">
        {categories.map((category: Category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryClick(category.slug)}
            className={`flex items-center justify-between w-full px-3 py-2 text-left rounded-lg transition-colors ${
              selectedCategories.includes(category.slug)
                ? 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                : 'hover:bg-gray-100'
            }`}
          >
            <span className="text-sm font-medium">{category.name}</span>
            {category.description && (
              <span className="text-xs text-gray-500">
                {category.description}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;