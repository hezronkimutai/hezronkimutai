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
 * Static route paths that don't require slugs
 */
const STATIC_ROUTES = [
  '/blog',
  '/blog/search',
  '/blog/archive',
];

/**
 * Invalid route paths that should be rejected
 */
const INVALID_ROUTES = [
  '/blog/',
  '/blog/category',
  '/blog/category/',
  '/blog/author',
  '/blog/author/',
];

/**
 * Validates that a given string is a valid blog route
 */
export const isValidBlogRoute = (path: string): boolean => {
  // Reject known invalid paths
  if (INVALID_ROUTES.includes(path)) {
    return false;
  }

  // Check static routes
  if (STATIC_ROUTES.includes(path)) {
    return true;
  }

  // Define route patterns
  const validRoutes = {
    // Post route - must start and end with alphanumeric, can have hyphens between
    post: /^\/blog\/[a-z0-9][a-z0-9-]*[a-z0-9]$/,

    // Category route - must have non-empty slug
    category: /^\/blog\/category\/[a-z0-9][a-z0-9-]*[a-z0-9]$/,

    // Author route - must have non-empty slug
    author: /^\/blog\/author\/[a-z0-9][a-z0-9-]*[a-z0-9]$/,
  };

  // Check against each valid pattern
  return Object.values(validRoutes).some(pattern => pattern.test(path));
};

/**
 * Gets page title for a blog route
 */
export const getBlogPageTitle = (path: string): string => {
  // Extract parts from path
  const parts = path.split('/').filter(Boolean);

  // Handle root path
  if (parts.length === 0 || (parts.length === 1 && parts[0] === 'blog')) {
    return 'Blog';
  }

  // Handle blog sub-routes
  if (parts[0] === 'blog' && parts.length > 1) {
    switch (parts[1]) {
      case 'category':
        return parts[2] ? `${parts[2].replace(/-/g, ' ')} - Blog` : 'Categories - Blog';
      case 'search':
        return 'Search Results - Blog';
      case 'archive':
        return 'Archive - Blog';
      case 'author':
        return 'Author - Blog';
      default:
        return `${parts[1].replace(/-/g, ' ')} - Blog`;
    }
  }

  // Handle invalid paths - return first non-empty part as title
  return `${parts[0].replace(/-/g, ' ')} - Blog`;
};