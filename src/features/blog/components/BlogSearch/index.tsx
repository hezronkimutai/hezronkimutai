import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import SearchBar from '../SearchBar';
import SearchResults from '../SearchResults';
import SearchHistory from '../SearchHistory';
import CategoryFilter from '../CategoryFilter';
import FilterTags from '../FilterTag';
import SortSelect from '../SortSelect';
import AdvancedFilters from '../AdvancedFilters';
import { useBlogQueries } from '../../hooks/useBlogQuery';

const BlogSearch: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const selectedCategories = searchParams.getAll('category');
  const { useCategoriesQuery } = useBlogQueries();
  const { data: categories } = useCategoriesQuery();

  const handleRemoveCategory = (categorySlug: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete('category');
    selectedCategories
      .filter(cat => cat !== categorySlug)
      .forEach(cat => newSearchParams.append('category', cat));
    
    navigate({
      pathname: '/blog/search',
      search: newSearchParams.toString()
    });
  };

  const categoryTags = selectedCategories.map(slug => ({
    label: categories?.find(cat => cat.slug === slug)?.name || slug,
    value: slug
  }));

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">Search Blog Posts</h1>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <SearchBar className="w-full" />
                  <AdvancedFilters className="mt-2" />
                </div>
                <SortSelect className="ml-4" />
              </div>
              <SearchHistory />
              <FilterTags
                tags={categoryTags}
                onRemove={handleRemoveCategory}
                className="mt-4"
              />
            </div>
          </div>
          <SearchResults />
        </div>
        <div className="lg:col-span-1">
          <CategoryFilter className="sticky top-4" />
        </div>
      </div>
    </div>
  );
};

export default BlogSearch;