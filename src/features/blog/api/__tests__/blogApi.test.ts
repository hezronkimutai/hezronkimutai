import { apiClient } from '@/shared/api/client';
import { blogApi } from '../blogApi';
import { BlogListResponse, BlogPost, Category, BlogSearchParams } from '../../types';

// Test mocks
const mockAuthor = {
  id: '1',
  name: 'Test Author'
};

const mockCategory = {
  id: '1',
  name: 'Test Category',
  slug: 'test-category'
};

// Mock the API client
jest.mock('@/shared/api/client');
const mockApiClient = apiClient as jest.Mocked<typeof apiClient>;

describe('blogApi', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getBlogs', () => {
    const mockResponse: BlogListResponse = {
      posts: [{
        id: '1',
        title: 'Test Blog',
        slug: 'test-blog',
        excerpt: 'Test excerpt',
        content: 'Test content',
        author: mockAuthor,
        publishedAt: '2025-04-14',
        categories: [mockCategory]
      }],
      total: 1,
      page: 1,
      totalPages: 1,
      currentPage: 1,
      totalCount: 1
    };

    it('fetches blogs without params', async () => {
      mockApiClient.get.mockResolvedValueOnce(mockResponse);
      const result = await blogApi.getBlogs();
      expect(mockApiClient.get).toHaveBeenCalledWith('/blogs', { params: undefined });
      expect(result).toEqual(mockResponse);
    });

    it('fetches blogs with query params', async () => {
      const params = { page: 1, pageSize: 10, category: 'tech' };
      mockApiClient.get.mockResolvedValueOnce(mockResponse);
      const result = await blogApi.getBlogs(params);
      expect(mockApiClient.get).toHaveBeenCalledWith('/blogs', { params });
      expect(result).toEqual(mockResponse);
    });

    it('handles API errors', async () => {
      const error = new Error('API Error');
      mockApiClient.get.mockRejectedValueOnce(error);
      await expect(blogApi.getBlogs()).rejects.toThrow('API Error');
    });
  });

  describe('getBlogBySlug', () => {
    const mockBlog: BlogPost = {
      id: '1',
      title: 'Test Blog',
      slug: 'test-blog',
      excerpt: 'Test excerpt',
      content: 'Test content',
      author: mockAuthor,
      publishedAt: '2025-04-14',
      categories: [mockCategory]
    };

    it('fetches a blog by slug', async () => {
      mockApiClient.get.mockResolvedValueOnce(mockBlog);
      const result = await blogApi.getBlogBySlug('test-blog');
      expect(mockApiClient.get).toHaveBeenCalledWith('/blogs/test-blog');
      expect(result).toEqual(mockBlog);
    });

    it('handles API errors', async () => {
      const error = new Error('Blog not found');
      mockApiClient.get.mockRejectedValueOnce(error);
      await expect(blogApi.getBlogBySlug('non-existent')).rejects.toThrow('Blog not found');
    });
  });

  describe('searchBlogs', () => {
    const mockSearchResponse: BlogListResponse = {
      posts: [{
        id: '1',
        title: 'Test Blog',
        slug: 'test-blog',
        excerpt: 'Test excerpt',
        content: 'Test content',
        author: mockAuthor,
        publishedAt: '2025-04-14',
        categories: [mockCategory]
      }],
      total: 1,
      page: 1,
      totalPages: 1,
      currentPage: 1,
      totalCount: 1
    };

    it('searches blogs with params', async () => {
      const searchParams = { query: 'test', page: 1 };
      mockApiClient.get.mockResolvedValueOnce(mockSearchResponse);
      const result = await blogApi.searchBlogs(searchParams);
      expect(mockApiClient.get).toHaveBeenCalledWith('/blogs/search', { params: searchParams });
      expect(result).toEqual(mockSearchResponse);
    });

    it('handles empty search results', async () => {
      const emptyResponse: BlogListResponse = {
        posts: [],
        total: 0,
        page: 1,
        totalPages: 0,
        currentPage: 1,
        totalCount: 0
      };
      mockApiClient.get.mockResolvedValueOnce(emptyResponse);
      const searchParams: BlogSearchParams = { q: 'nonexistent', page: 1 };
      const result = await blogApi.searchBlogs(searchParams);
      expect(result.posts).toHaveLength(0);
    });

    it('handles API errors', async () => {
      const error = new Error('Search failed');
      mockApiClient.get.mockRejectedValueOnce(error);
      await expect(blogApi.searchBlogs({ q: 'test', page: 1 })).rejects.toThrow('Search failed');
    });
  });

  describe('getCategories', () => {
    it('fetches all categories', async () => {
      const categories = [mockCategory];
      mockApiClient.get.mockResolvedValueOnce(categories);
      const result = await blogApi.getCategories();
      expect(mockApiClient.get).toHaveBeenCalledWith('/blogs/categories');
      expect(result).toEqual(categories);
    });

    it('handles empty categories', async () => {
      mockApiClient.get.mockResolvedValueOnce([]);
      const result = await blogApi.getCategories();
      expect(result).toHaveLength(0);
    });

    it('handles API errors', async () => {
      const error = new Error('Failed to fetch categories');
      mockApiClient.get.mockRejectedValueOnce(error);
      await expect(blogApi.getCategories()).rejects.toThrow('Failed to fetch categories');
    });
  });
});