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
    describe('Static Routes', () => {
      it('validates root blog route', () => {
        expect(isValidBlogRoute('/blog')).toBe(true);
      });

      it('validates static feature routes', () => {
        expect(isValidBlogRoute('/blog/search')).toBe(true);
        expect(isValidBlogRoute('/blog/archive')).toBe(true);
      });
    });

    describe('Dynamic Routes', () => {
      describe('Blog Posts', () => {
        it('validates valid post slugs', () => {
          expect(isValidBlogRoute('/blog/test-post')).toBe(true);
          expect(isValidBlogRoute('/blog/my-first-post')).toBe(true);
          expect(isValidBlogRoute('/blog/post-123')).toBe(true);
        });

        it('rejects invalid post slugs', () => {
          expect(isValidBlogRoute('/blog/-invalid')).toBe(false);
          expect(isValidBlogRoute('/blog/invalid-')).toBe(false);
          expect(isValidBlogRoute('/blog/--post')).toBe(false);
        });
      });

      describe('Categories', () => {
        it('validates valid category slugs', () => {
          expect(isValidBlogRoute('/blog/category/typescript')).toBe(true);
          expect(isValidBlogRoute('/blog/category/react-hooks')).toBe(true);
          expect(isValidBlogRoute('/blog/category/web-dev-123')).toBe(true);
        });

        it('rejects invalid category paths', () => {
          expect(isValidBlogRoute('/blog/category')).toBe(false);
          expect(isValidBlogRoute('/blog/category/')).toBe(false);
          expect(isValidBlogRoute('/blog/category/-invalid')).toBe(false);
          expect(isValidBlogRoute('/blog/category/invalid-')).toBe(false);
        });
      });

      describe('Authors', () => {
        it('validates valid author slugs', () => {
          expect(isValidBlogRoute('/blog/author/john-doe')).toBe(true);
          expect(isValidBlogRoute('/blog/author/jane-123')).toBe(true);
        });

        it('rejects invalid author paths', () => {
          expect(isValidBlogRoute('/blog/author')).toBe(false);
          expect(isValidBlogRoute('/blog/author/')).toBe(false);
          expect(isValidBlogRoute('/blog/author/-invalid')).toBe(false);
          expect(isValidBlogRoute('/blog/author/invalid-')).toBe(false);
        });
      });
    });

    describe('Invalid Routes', () => {
      it('rejects routes outside blog namespace', () => {
        expect(isValidBlogRoute('/invalid')).toBe(false);
        expect(isValidBlogRoute('/blog-invalid')).toBe(false);
      });

      it('rejects malformed routes', () => {
        expect(isValidBlogRoute('/blog/')).toBe(false);
        expect(isValidBlogRoute('/blog//')).toBe(false);
        expect(isValidBlogRoute('/blog/invalid/path')).toBe(false);
      });

      it('rejects routes with invalid characters', () => {
        expect(isValidBlogRoute('/blog/post_with_underscore')).toBe(false);
        expect(isValidBlogRoute('/blog/post.with.dots')).toBe(false);
        expect(isValidBlogRoute('/blog/post with spaces')).toBe(false);
        expect(isValidBlogRoute('/blog/POST-WITH-CAPS')).toBe(false);
        expect(isValidBlogRoute('/blog/special@chars')).toBe(false);
      });
    });
  });

  describe('getBlogPageTitle', () => {
    describe('Static Routes', () => {
      it('handles root blog route', () => {
        expect(getBlogPageTitle('/blog')).toBe('Blog');
        expect(getBlogPageTitle('/blog/')).toBe('Blog');
      });

      it('handles feature pages', () => {
        expect(getBlogPageTitle('/blog/search')).toBe('Search Results - Blog');
        expect(getBlogPageTitle('/blog/archive')).toBe('Archive - Blog');
      });
    });

    describe('Dynamic Routes', () => {
      it('formats category titles', () => {
        expect(getBlogPageTitle('/blog/category/typescript')).toBe('typescript - Blog');
        expect(getBlogPageTitle('/blog/category/react-hooks')).toBe('react hooks - Blog');
      });

      it('formats blog post titles', () => {
        expect(getBlogPageTitle('/blog/test-post')).toBe('test post - Blog');
        expect(getBlogPageTitle('/blog/getting-started-with-typescript'))
          .toBe('getting started with typescript - Blog');
      });

      it('handles author pages', () => {
        expect(getBlogPageTitle('/blog/author/john-doe')).toBe('Author - Blog');
        expect(getBlogPageTitle('/blog/author/123')).toBe('Author - Blog');
      });
    });

    describe('Edge Cases', () => {
      it('handles empty paths', () => {
        expect(getBlogPageTitle('')).toBe('Blog');
        expect(getBlogPageTitle('/')).toBe('Blog');
      });

      it('handles invalid paths', () => {
        expect(getBlogPageTitle('/invalid')).toBe('invalid - Blog');
        expect(getBlogPageTitle('/invalid/path')).toBe('invalid - Blog');
      });

      it('handles incomplete dynamic routes', () => {
        expect(getBlogPageTitle('/blog/category')).toBe('Categories - Blog');
        expect(getBlogPageTitle('/blog/author')).toBe('Author - Blog');
      });
    });

    it('maintains consistent title format', () => {
      const paths = [
        '/blog/my-first-post',
        '/blog/category/getting-started',
        '/blog/author/john-doe',
        '/invalid/path',
      ];

      paths.forEach(path => {
        const title = getBlogPageTitle(path);
        expect(title).toMatch(/(^Blog$|^[A-Za-z0-9\s]+(Results)?\s-\sBlog$)/);
      });
    });
  });
});