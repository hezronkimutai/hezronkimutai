import { renderHook } from '@testing-library/react';
import { apiClient } from '../../../../shared/api/client';
import { useBlogApi } from '../useBlogApi';
import { act } from 'react-dom/test-utils';
import { BlogListResponse, BlogPost, Category } from '../../types';

// Mock the API client
jest.mock('../../../../shared/api/client');
const mockApiClient = apiClient as jest.Mocked<typeof apiClient>;

describe('useBlogApi', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockBlogPost: BlogPost = {
    id: '1',
    title: 'Test Post',
    slug: 'test-post',
    excerpt: 'Test excerpt',
    content: 'Test content',
    author: { id: '1', name: 'Test Author' }
  };

  const mockBlogResponse: BlogListResponse = {
    posts: [mockBlogPost],
    total: 1,
    page: 1,
    totalPages: 1,
    currentPage: 1,
    totalCount: 1
  };

  const mockCategories: Category[] = [
    { id: '1', name: 'Test Category', slug: 'test-category' }
  ];

  describe('getBlogPosts', () => {
    it('fetches blog posts successfully', async () => {
      mockApiClient.get.mockResolvedValueOnce(mockBlogResponse);

      const { result } = renderHook(() => useBlogApi());

      // Initial state
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBe(null);

      let response = mockBlogResponse;
      await act(async () => {
        response = await result.current.getBlogPosts();
      });

      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBe(null);
      expect(response).toEqual(mockBlogResponse);
      expect(mockApiClient.get).toHaveBeenCalledWith('/blog/posts', { params: undefined });
    });

    it('handles errors when fetching blog posts', async () => {
      const error = new Error('Failed to fetch posts');
      mockApiClient.get.mockRejectedValueOnce(error);

      const { result } = renderHook(() => useBlogApi());
      await act(async () => {
        const promise = result.current.getBlogPosts();
        await expect(promise).rejects.toThrow('Failed to fetch posts');
      });

      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBe(error);
    });
  });

  describe('getBlogPost', () => {
    it('fetches a single blog post successfully', async () => {
      mockApiClient.get.mockResolvedValueOnce(mockBlogPost);

      const { result } = renderHook(() => useBlogApi());
      let response = mockBlogPost;
      await act(async () => {
        response = await result.current.getBlogPost('test-post');
      });

      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBe(null);
      expect(response).toEqual(mockBlogPost);
      expect(mockApiClient.get).toHaveBeenCalledWith('/blog/posts/test-post');
    });

    it('handles errors when fetching a single post', async () => {
      const error = new Error('Post not found');
      mockApiClient.get.mockRejectedValueOnce(error);
      const { result } = renderHook(() => useBlogApi());
      await act(async () => {
        const promise = result.current.getBlogPost('non-existent');
        await expect(promise).rejects.toThrow('Post not found');
      });

      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBe(error);
    });
  });

  describe('getCategories', () => {
    it('fetches categories successfully', async () => {
      mockApiClient.get.mockResolvedValueOnce(mockCategories);
      const { result } = renderHook(() => useBlogApi());
      let response = mockCategories;
      await act(async () => {
        response = await result.current.getCategories();
      });

      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBe(null);
      expect(response).toEqual(mockCategories);
      expect(mockApiClient.get).toHaveBeenCalledWith('/blog/categories');
    });

    it('handles errors when fetching categories', async () => {
      const error = new Error('Failed to fetch categories');
      mockApiClient.get.mockRejectedValueOnce(error);
      const { result } = renderHook(() => useBlogApi());
      await act(async () => {
        const promise = result.current.getCategories();
        await expect(promise).rejects.toThrow('Failed to fetch categories');
      });

      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBe(error);
    });
  });

  describe('searchPosts', () => {
    it('searches posts successfully', async () => {
      mockApiClient.get.mockResolvedValueOnce(mockBlogResponse);

      const { result } = renderHook(() => useBlogApi());
      const searchParams = { q: 'test', page: 1 };
      let response = mockBlogResponse;
      await act(async () => {
        response = await result.current.searchPosts(searchParams);
      });

      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBe(null);
      expect(response).toEqual(mockBlogResponse);
      expect(mockApiClient.get).toHaveBeenCalledWith('/blog/search', { params: searchParams });
    });

    it('handles errors when searching posts', async () => {
      const error = new Error('Search failed');
      mockApiClient.get.mockRejectedValueOnce(error);

      const { result } = renderHook(() => useBlogApi());
      const searchParams = { q: 'test', page: 1 };
      await act(async () => {
        const promise = result.current.searchPosts(searchParams);
        await expect(promise).rejects.toThrow('Search failed');
      });

      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBe(error);
    });
  });
});