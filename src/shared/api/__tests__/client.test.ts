import axios, { AxiosInstance } from 'axios';
import { apiClient, setAxiosInstance } from '../client';

const mockAxiosInstance = {
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
};

describe('apiClient', () => {
  const mockResponseData = { message: 'success' };
  const mockError = new Error('API Error');
  const testUrl = '/test';
  const testData = { key: 'value' };
  const testConfig = { headers: { 'X-Test': 'test' } };

  beforeEach(() => {
    jest.clearAllMocks();
    setAxiosInstance(mockAxiosInstance as unknown as AxiosInstance);
  });

  describe('GET requests', () => {
    it('makes successful GET request', async () => {
      mockAxiosInstance.get.mockResolvedValueOnce({ data: mockResponseData });

      const result = await apiClient.get(testUrl);
      
      expect(mockAxiosInstance.get).toHaveBeenCalledWith(testUrl, undefined);
      expect(result).toEqual(mockResponseData);
    });

    it('makes GET request with config', async () => {
      mockAxiosInstance.get.mockResolvedValueOnce({ data: mockResponseData });

      await apiClient.get(testUrl, testConfig);

      expect(mockAxiosInstance.get).toHaveBeenCalledWith(testUrl, testConfig);
    });

    it('handles GET request error', async () => {
      mockAxiosInstance.get.mockRejectedValueOnce(mockError);

      await expect(apiClient.get(testUrl)).rejects.toEqual(mockError);
    });
  });

  describe('POST requests', () => {
    it('makes successful POST request', async () => {
      mockAxiosInstance.post.mockResolvedValueOnce({ data: mockResponseData });

      const result = await apiClient.post(testUrl, testData);

      expect(mockAxiosInstance.post).toHaveBeenCalledWith(testUrl, testData, undefined);
      expect(result).toEqual(mockResponseData);
    });

    it('makes POST request with config', async () => {
      mockAxiosInstance.post.mockResolvedValueOnce({ data: mockResponseData });

      await apiClient.post(testUrl, testData, testConfig);

      expect(mockAxiosInstance.post).toHaveBeenCalledWith(testUrl, testData, testConfig);
    });

    it('handles POST request error', async () => {
      mockAxiosInstance.post.mockRejectedValueOnce(mockError);

      await expect(apiClient.post(testUrl, testData)).rejects.toEqual(mockError);
    });

    it('makes POST request without data', async () => {
      mockAxiosInstance.post.mockResolvedValueOnce({ data: mockResponseData });

      await apiClient.post(testUrl);

      expect(mockAxiosInstance.post).toHaveBeenCalledWith(testUrl, undefined, undefined);
    });
  });

  describe('PUT requests', () => {
    it('makes successful PUT request', async () => {
      mockAxiosInstance.put.mockResolvedValueOnce({ data: mockResponseData });

      const result = await apiClient.put(testUrl, testData);

      expect(mockAxiosInstance.put).toHaveBeenCalledWith(testUrl, testData, undefined);
      expect(result).toEqual(mockResponseData);
    });

    it('makes PUT request with config', async () => {
      mockAxiosInstance.put.mockResolvedValueOnce({ data: mockResponseData });

      await apiClient.put(testUrl, testData, testConfig);

      expect(mockAxiosInstance.put).toHaveBeenCalledWith(testUrl, testData, testConfig);
    });

    it('handles PUT request error', async () => {
      mockAxiosInstance.put.mockRejectedValueOnce(mockError);

      await expect(apiClient.put(testUrl, testData)).rejects.toEqual(mockError);
    });

    it('makes PUT request without data', async () => {
      mockAxiosInstance.put.mockResolvedValueOnce({ data: mockResponseData });

      await apiClient.put(testUrl);

      expect(mockAxiosInstance.put).toHaveBeenCalledWith(testUrl, undefined, undefined);
    });
  });

  describe('DELETE requests', () => {
    it('makes successful DELETE request', async () => {
      mockAxiosInstance.delete.mockResolvedValueOnce({ data: mockResponseData });

      const result = await apiClient.delete(testUrl);

      expect(mockAxiosInstance.delete).toHaveBeenCalledWith(testUrl, undefined);
      expect(result).toEqual(mockResponseData);
    });

    it('makes DELETE request with config', async () => {
      mockAxiosInstance.delete.mockResolvedValueOnce({ data: mockResponseData });

      await apiClient.delete(testUrl, testConfig);

      expect(mockAxiosInstance.delete).toHaveBeenCalledWith(testUrl, testConfig);
    });

    it('handles DELETE request error', async () => {
      mockAxiosInstance.delete.mockRejectedValueOnce(mockError);

      await expect(apiClient.delete(testUrl)).rejects.toEqual(mockError);
    });
  });
});

// Separate describe block for instance configuration tests
describe('apiClient instance configuration', () => {
  const mockCreate = jest.fn();

  beforeEach(() => {
    jest.resetModules();
    jest.mock('axios', () => ({
      create: mockCreate,
    }));
  });

  afterEach(() => {
    jest.unmock('axios');
  });

  it('creates axios instance with correct default config', () => {
    mockCreate.mockReturnValueOnce(mockAxiosInstance);
    
    // Re-require the client module to test instance creation
    require('../client');

    expect(mockCreate).toHaveBeenCalledWith({
      baseURL: 'http://localhost:3000/api',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  });

  it('handles custom environment API URL', () => {
    const customUrl = 'https://api.example.com';
    const originalUrl = process.env.API_URL;
    process.env.API_URL = customUrl;

    mockCreate.mockReturnValueOnce(mockAxiosInstance);
    
    // Re-require the client module to test instance creation
    require('../client');

    expect(mockCreate).toHaveBeenCalledWith({
      baseURL: customUrl,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    process.env.API_URL = originalUrl;
  });
});