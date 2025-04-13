/**
 * Blog route parameters
 */
export interface BlogRouteParams {
  /**
   * Blog post slug for individual post routes
   */
  slug?: string;

  /**
   * Category slug for category filter routes
   */
  category?: string;

  /**
   * Page number for paginated routes
   */
  page?: string;
}

/**
 * Search query parameters
 */
export interface BlogSearchParams {
  /**
   * Search query string
   */
  q?: string;

  /**
   * Selected category filter
   */
  category?: string;

  /**
   * Sort direction (asc/desc)
   */
  sort?: 'asc' | 'desc';

  /**
   * Sort field (date/title)
   */
  sortBy?: 'date' | 'title';

  /**
   * Page number
   */
  page?: string;

  /**
   * Items per page
   */
  limit?: string;
}

/**
 * Blog route paths
 */
export const BLOG_ROUTES = {
  /**
   * Blog home page
   */
  HOME: '/blog',

  /**
   * Individual blog post
   * @param slug - Post slug
   */
  POST: (slug: string) => `/blog/${slug}`,

  /**
   * Category filter page
   * @param category - Category slug
   */
  CATEGORY: (category: string) => `/blog/category/${category}`,

  /**
   * Search results page
   */
  SEARCH: '/blog/search',

  /**
   * Author profile page
   * @param authorId - Author ID
   */
  AUTHOR: (authorId: string) => `/blog/author/${authorId}`,

  /**
   * Archive page
   */
  ARCHIVE: '/blog/archive',
} as const;

// Extract static route type
type StaticBlogRoute = typeof BLOG_ROUTES[keyof typeof BLOG_ROUTES];
type StaticRoutePath = Extract<StaticBlogRoute, string>;

/**
 * Validates that a given string is a valid blog route
 */
export const isValidBlogRoute = (path: string): boolean => {
  // Get all static routes
  const staticRoutes = Object.values(BLOG_ROUTES).filter(
    (route): route is StaticRoutePath => typeof route === 'string'
  );

  // Get all dynamic route patterns
  const dynamicPatterns = [
    /^\/blog\/[a-z0-9-]+$/,              // Post route
    /^\/blog\/category\/[a-z0-9-]+$/,    // Category route
    /^\/blog\/author\/[a-z0-9-]+$/,      // Author route
  ];

  // Check if path matches any static route
  if (staticRoutes.includes(path as StaticRoutePath)) {
    return true;
  }

  // Check if path matches any dynamic pattern
  return dynamicPatterns.some(pattern => pattern.test(path));
};

/**
 * Gets page title for a blog route
 */
export const getBlogPageTitle = (path: string): string => {
  // Extract parts from path
  const parts = path.split('/').filter(Boolean);

  // Handle special cases
  switch (parts[1]) {
    case undefined:
      return 'Blog';
    case 'category':
      return `${parts[2].replace(/-/g, ' ')} - Blog`;
    case 'search':
      return 'Search Results - Blog';
    case 'archive':
      return 'Archive - Blog';
    case 'author':
      return `Author - Blog`;
    default:
      return `${parts[1].replace(/-/g, ' ')} - Blog`;
  }
};