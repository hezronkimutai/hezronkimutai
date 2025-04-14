import React from 'react';

interface FilterTagProps {
  label: string;
  onRemove: () => void;
  className?: string;
}

export const FilterTag: React.FC<FilterTagProps> = ({
  label,
  onRemove,
  className = ''
}) => {
  return (
    <div
      className={`inline-flex items-center bg-blue-50 text-blue-700 rounded-full px-3 py-1 text-sm ${className}`}
    >
      <span className="mr-1">{label}</span>
      <button
        onClick={onRemove}
        className="ml-1 text-blue-500 hover:text-blue-700 focus:outline-none"
        aria-label={`Remove ${label} filter`}
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
};

export const FilterTags: React.FC<{
  tags: Array<{ label: string; value: string }>;
  onRemove: (value: string) => void;
  className?: string;
}> = ({ tags, onRemove, className = '' }) => {
  if (!tags.length) return null;

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {tags.map((tag) => (
        <FilterTag
          key={tag.value}
          label={tag.label}
          onRemove={() => onRemove(tag.value)}
        />
      ))}
      {tags.length > 1 && (
        <button
          onClick={() => tags.forEach((tag) => onRemove(tag.value))}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          Clear all
        </button>
      )}
    </div>
  );
};

export default FilterTags;