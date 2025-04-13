import React from 'react';
import { PaginationProps } from '../../types/projects';
import styles from './Pagination.module.scss';

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onNext,
  onPrev,
  className = '',
}) => (
  <div className={`${styles.container} ${className}`.trim()}>
    <button
      onClick={onPrev}
      disabled={currentPage === 1}
      className={styles.button}
      aria-label="Previous page"
    >
      Previous
    </button>
    
    <span className={styles.pageInfo}>
      Page {currentPage} of {totalPages}
    </span>
    
    <button
      onClick={onNext}
      disabled={currentPage === totalPages}
      className={styles.button}
      aria-label="Next page"
    >
      Next
    </button>
  </div>
);

Pagination.displayName = 'Pagination';

export default Pagination;