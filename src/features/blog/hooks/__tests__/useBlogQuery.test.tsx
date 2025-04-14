import { renderHook } from '@testing-library/react';
import { useQuery } from '@tanstack/react-query';
import { blogApi } from '../../api/blogApi';
import { useBlogQuery } from '../useBlogQuery';
import { BlogListResponse } from '../../types';

// Mock dependencies
jest.mock('@tanstack/react-query');
jest.mock('../../api/blogApi');

describe('useBlogQuery', () => {
  const mockUseQuery = useQuery as jest.Mock;
  const mockBlogApi = blogApi as jest.Mocked<typeof blogApi>;

  const mockBlogResponse: BlogListResponse = {
    posts: [{
      id: '1',
      title: 'Test Post',
      slug: 'test-post',
      excerpt: 'Test excerpt',
      content: 'Test content',
      author: { id: '1', name: 'Test Author' }
    }],
    total: 1,
    page: 1,
    totalPages: 1,
    currentPage: 1,
    totalCount: 1
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseQuery.mockReturnValue({
      data: mockBlogResponse,
      isLoading: false,
      error: null
    });
  });

  it('configures query with correct parameters when no params provided', () => {
    renderHook(() => useBlogQuery());

    expect(mockUseQuery).toHaveBeenCalledWith({
      queryKey: ['blogs', undefined],
      queryFn: expect.any(Function),
      placeholderData: expect.any(Function)
    });
  });

  it('configures query with correct parameters when params provided', () => {
    const params = { page: 1, limit: 10 };
    renderHook(() => useBlogQuery(params));

    expect(mockUseQuery).toHaveBeenCalledWith({
      queryKey: ['blogs', params],
      queryFn: expect.any(Function),
      placeholderData: expect.any(Function)
    });
  });

  it('calls blogApi.getBlogs with correct parameters', async () => {
    const params = { page: 1, limit: 10 };
    mockBlogApi.getBlogs.mockResolvedValueOnce(mockBlogResponse);

    renderHook(() => useBlogQuery(params));
    const queryFn = mockUseQuery.mock.calls[0][0].queryFn;
    await queryFn();

    expect(mockBlogApi.getBlogs).toHaveBeenCalledWith(params);
  });

  it('preserves previous data when using placeholderData', () => {
    const previousData = { ...mockBlogResponse };
    renderHook(() => useBlogQuery());
    const placeholderDataFn = mockUseQuery.mock.calls[0][0].placeholderData;
    
    const result = placeholderDataFn(previousData);
    expect(result).toBe(previousData);
  });

  describe('backward compatibility', () => {
    it('exports useBlogQuery through useBlogQueries object', () => {
      const { useBlogQueries } = require('../useBlogQuery');
      expect(useBlogQueries.useBlogQuery).toBe(useBlogQuery);
    });
  });
});