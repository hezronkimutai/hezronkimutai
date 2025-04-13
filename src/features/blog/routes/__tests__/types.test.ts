import { BLOG_ROUTES, isValidBlogRoute, getBlogPageTitle } from '../types';

describe('Blog Route Types', () => {
  describe('BLOG_ROUTES', () => {
    it('provides correct static routes', () => {
      expect(BLOG_ROUTES.HOME).toBe('/blog');
      expect(BLOG_ROUTES.SEARCH).toBe('/blog/search');
      expect(BLOG_ROUTES.ARCHIVE).toBe('/blog/archive');
    });

    it('generates correct dynamic routes', () => {
      expect(BLOG_ROUTES.POST('test-post')).toBe('/blog/test-post');
      expect(BLOG_ROUTES.CATEGORY('typescript')).toBe('/blog/category/typescript');
      expect(BLOG_ROUTES.AUTHOR('john-doe')).toBe('/blog/author/john-doe');
    });
  });

  describe('isValidBlogRoute', () => {
    it('validates static routes', () => {
      expect(isValidBlogRoute('/blog')).toBe(true);
      expect(isValidBlogRoute('/blog/search')).toBe(true);
      expect(isValidBlogRoute('/blog/archive')).toBe(true);
    });

    it('validates dynamic post routes', () => {
      expect(isValidBlogRoute('/blog/test-post')).toBe(true);
      expect(isValidBlogRoute('/blog/another-post-123')).toBe(true);
    });

    it('validates category routes', () => {
      expect(isValidBlogRoute('/blog/category/typescript')).toBe(true);
      expect(isValidBlogRoute('/blog/category/react-hooks')).toBe(true);
    });

    it('validates author routes', () => {
      expect(isValidBlogRoute('/blog/author/john-doe')).toBe(true);
      expect(isValidBlogRoute('/blog/author/123')).toBe(true);
    });

    it('rejects invalid routes', () => {
      expect(isValidBlogRoute('/invalid')).toBe(false);
      expect(isValidBlogRoute('/blog/')).toBe(false);
      expect(isValidBlogRoute('/blog/invalid/path')).toBe(false);
      expect(isValidBlogRoute('/blog/category')).toBe(false);
      expect(isValidBlogRoute('/blog/author')).toBe(false);
    });

    it('handles special characters correctly', () => {
      expect(isValidBlogRoute('/blog/post-with-123')).toBe(true);
      expect(isValidBlogRoute('/blog/post_with_underscore')).toBe(false);
      expect(isValidBlogRoute('/blog/post.with.dots')).toBe(false);
      expect(isValidBlogRoute('/blog/post with spaces')).toBe(false);
    });
  });

  describe('getBlogPageTitle', () => {
    it('returns correct titles for static routes', () => {
      expect(getBlogPageTitle('/blog')).toBe('Blog');
      expect(getBlogPageTitle('/blog/search')).toBe('Search Results - Blog');
      expect(getBlogPageTitle('/blog/archive')).toBe('Archive - Blog');
    });

    it('formats category titles correctly', () => {
      expect(getBlogPageTitle('/blog/category/typescript')).toBe('typescript - Blog');
      expect(getBlogPageTitle('/blog/category/react-hooks')).toBe('react hooks - Blog');
    });

    it('formats post titles correctly', () => {
      expect(getBlogPageTitle('/blog/test-post')).toBe('test post - Blog');
      expect(getBlogPageTitle('/blog/getting-started-with-typescript')).toBe(
        'getting started with typescript - Blog'
      );
    });

    it('handles author pages', () => {
      expect(getBlogPageTitle('/blog/author/john-doe')).toBe('Author - Blog');
    });

    it('handles edge cases', () => {
      expect(getBlogPageTitle('/invalid/path')).toBe('invalid - Blog');
      expect(getBlogPageTitle('/blog/')).toBe('Blog');
      expect(getBlogPageTitle('/')).toBe('Blog');
    });

    it('formats titles consistently', () => {
      const paths = [
        '/blog/my-first-post',
        '/blog/category/getting-started',
        '/blog/search',
      ];

      const titles = paths.map(getBlogPageTitle);

      titles.forEach(title => {
        expect(title).toMatch(/ - Blog$/);
      });
    });
  });
});