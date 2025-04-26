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
  // Handle case when there are no pages
  if (totalPages === 0) {
    return (
      <nav
        className={`flex items-center justify-center space-x-4 ${className}`.trim()}
        aria-label="Pagination"
      >
        <button
          disabled={true}
          className="px-4 py-2 text-sm font-medium rounded-md opacity-50 cursor-not-allowed"
          aria-label="Previous page"
        >
          Previous
        </button>

        <span className="text-sm text-primary/80">
          <span className="font-medium">Page 0</span>
          {' of '}
          <span className="font-medium">0</span>
        </span>

        <button
          disabled={true}
          className="px-4 py-2 text-sm font-medium rounded-md opacity-50 cursor-not-allowed"
          aria-label="Next page"
        >
          Next
        </button>
      </nav>
    );
  }

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
          transition-all duration-300 ease-out
          ${canGoPrevious
            ? 'text-primary hover:text-orange'
            : 'opacity-50 cursor-not-allowed'
          }`}
        aria-label="Previous page"
      >
        Previous
      </button>

      <span className="text-sm text-primary flex items-center space-x-1">
        <span className="font-medium">Page {currentPage}</span>
        <span className="text-primary/60">of</span>
        <span className="font-medium">{totalPages}</span>
      </span>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!canGoNext}
        className={`px-4 py-2 text-sm font-medium rounded-md
          transition-all duration-300 ease-out
          ${canGoNext
            ? 'text-primary hover:text-orange'
            : 'opacity-50 cursor-not-allowed'
          }`}
        aria-label="Next page"
      >
        Next
      </button>
    </nav>
  );
};

export default Pagination;