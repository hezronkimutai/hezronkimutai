import React from 'react';
import { Pagination as SharedPagination, PaginationProps } from '../../../../shared/components/Pagination';

// Re-export the Pagination component from shared components
export { SharedPagination as Pagination };
export type { PaginationProps };
export default SharedPagination;