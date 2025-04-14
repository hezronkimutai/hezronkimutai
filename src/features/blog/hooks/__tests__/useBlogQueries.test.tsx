import { renderHook } from '@testing-library/react';
import { useQuery } from '@tanstack/react-query';
import { useBlogApi } from '../useBlogApi';
import { useBlogQueries } from '../useBlogQueries';
import { BlogListResponse, Category } from '../../types';

// Mock react-query and useBlogApi
jest.mock('@tanstack/react-query');
jest.mock('../useBlogApi');

describe('useBlogQueries', () => {
  const mockUseQuery = useQuery as jest.Mock;
  const mockUseBlogApi = useBlogApi as jest.Mock;

  const mockBlogPost = {
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

  const mockApi = {
    getBlogPosts: jest.fn(),
    getCategories: jest.fn(),
    searchPosts: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseBlogApi.mockReturnValue(mockApi);
    mockUseQuery.mockReturnValue({
      data: undefined,
      isLoading: false,
      error: null
    });
  });

  describe('useBlogQuery', () => {
    it('configures query with correct parameters', () => {
      const params = { page: 1, limit: 10 };
      const { result } = renderHook(() => useBlogQueries());
      result.current.useBlogQuery(params);

      expect(mockUseQuery).toHaveBeenCalledWith({
        queryKey: ['blogs', params],
        queryFn: expect.any(Function),
        placeholderData: expect.any(Function)
      });
    });

    it('calls api.getBlogPosts with correct parameters', async () => {
      const params = { page: 1, limit: 10 };
      mockApi.getBlogPosts.mockResolvedValueOnce(mockBlogResponse);

      const { result } = renderHook(() => useBlogQueries());
      result.current.useBlogQuery(params);

      const queryFn = mockUseQuery.mock.calls[0][0].queryFn;
      await queryFn();

      expect(mockApi.getBlogPosts).toHaveBeenCalledWith(params);
    });
  });

  describe('useCategoriesQuery', () => {
    it('configures query with correct parameters', () => {
      const { result } = renderHook(() => useBlogQueries());
      result.current.useCategoriesQuery();

      expect(mockUseQuery).toHaveBeenCalledWith({
        queryKey: ['categories'],
        queryFn: expect.any(Function),
        staleTime: 5 * 60 * 1000
      });
    });

    it('calls api.getCategories', async () => {
      mockApi.getCategories.mockResolvedValueOnce(mockCategories);

      const { result } = renderHook(() => useBlogQueries());
      result.current.useCategoriesQuery();

      const queryFn = mockUseQuery.mock.calls[0][0].queryFn;
      await queryFn();

      expect(mockApi.getCategories).toHaveBeenCalled();
    });
  });

  describe('useSearchQuery', () => {
    it('configures query with correct parameters when search is provided', () => {
      const params = { search: 'test', page: 1 };
      const { result } = renderHook(() => useBlogQueries());
      result.current.useSearchQuery(params);

      expect(mockUseQuery).toHaveBeenCalledWith({
        queryKey: ['search', params],
        queryFn: expect.any(Function),
        enabled: true,
        placeholderData: expect.any(Function)
      });
    });

    it('disables query when search param is not provided', () => {
      const params = { page: 1 };
      const { result } = renderHook(() => useBlogQueries());
      result.current.useSearchQuery(params);

      expect(mockUseQuery).toHaveBeenCalledWith({
        queryKey: ['search', params],
        queryFn: expect.any(Function),
        enabled: false,
        placeholderData: expect.any(Function)
      });
    });

    it('calls api.searchPosts with correct parameters', async () => {
      const params = { search: 'test', page: 1 };
      mockApi.searchPosts.mockResolvedValueOnce(mockBlogResponse);

      const { result } = renderHook(() => useBlogQueries());
      result.current.useSearchQuery(params);

      const queryFn = mockUseQuery.mock.calls[0][0].queryFn;
      await queryFn();

      expect(mockApi.searchPosts).toHaveBeenCalledWith(params);
    });

    it('returns empty response when search param is not provided', async () => {
      const params = { page: 1 };

      const { result } = renderHook(() => useBlogQueries());
      result.current.useSearchQuery(params);

      const queryFn = mockUseQuery.mock.calls[0][0].queryFn;
      const response = await queryFn();

      expect(response).toEqual({
        posts: [],
        total: 0,
        page: 1,
        totalPages: 0,
        currentPage: 1,
        totalCount: 0
      });
      expect(mockApi.searchPosts).not.toHaveBeenCalled();
    });
  });
});