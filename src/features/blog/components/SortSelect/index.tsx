import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

interface SortOption {
  label: string;
  value: string;
}

const SORT_OPTIONS: SortOption[] = [
  { label: 'Most Recent', value: 'date' },
  { label: 'Most Popular', value: 'popularity' },
  { label: 'Most Relevant', value: 'relevance' }
];

interface SortSelectProps {
  className?: string;
}

export const SortSelect: React.FC<SortSelectProps> = ({ className = '' }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentSort = searchParams.get('sortBy') || 'date';

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('sortBy', e.target.value);
    navigate({
      pathname: '/blog/search',
      search: newSearchParams.toString()
    });
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <label htmlFor="sort" className="text-sm text-gray-600">
        Sort by:
      </label>
      <select
        id="sort"
        value={currentSort}
        onChange={handleSortChange}
        className="form-select text-sm border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
      >
        {SORT_OPTIONS.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SortSelect;