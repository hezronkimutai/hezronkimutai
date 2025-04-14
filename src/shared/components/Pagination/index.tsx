import React from 'react';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className = '',
}) => {
  const canGoPrevious = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  return (
    <nav 
      className={`flex items-center justify-center space-x-4 ${className}`.trim()}
      aria-label="Pagination"
    >
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!canGoPrevious}
        className={`px-4 py-2 text-sm font-medium rounded-md
          ${canGoPrevious
            ? 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        aria-label="Previous page"
      >
        Previous
      </button>

      <span className="text-sm text-gray-700">
        <span className="font-medium">Page {currentPage}</span>
        {' of '}
        <span className="font-medium">{totalPages}</span>
      </span>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!canGoNext}
        className={`px-4 py-2 text-sm font-medium rounded-md
          ${canGoNext
            ? 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        aria-label="Next page"
      >
        Next
      </button>
    </nav>
  );
};

export default Pagination;