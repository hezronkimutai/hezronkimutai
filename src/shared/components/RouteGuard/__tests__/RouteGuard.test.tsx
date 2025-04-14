import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Navigate } from 'react-router-dom';
import RouteGuard from '../index';

// Mock react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Navigate: jest.fn(({ to, state, replace }) => (
    <div data-testid="mock-navigate" data-to={to} data-state={JSON.stringify(state)} data-replace={replace} />
  )),
  useLocation: jest.fn(() => ({
    pathname: '/protected',
    search: '',
    hash: '',
    state: null,
  })),
}));

describe('RouteGuard', () => {
  const mockLocation = { pathname: '/protected', search: '', hash: '', state: null };
  const mockLocalStorage = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    clear: jest.fn(),
  };

  const TestChild = () => <div data-testid="protected-content">Protected Content</div>;

  beforeEach(() => {
    jest.clearAllMocks();
    Object.defineProperty(window, 'localStorage', { value: mockLocalStorage });
  });

  it('renders children when authenticated and no roles required', () => {
    mockLocalStorage.getItem
      .mockReturnValueOnce('valid-token') // isAuthenticated check
      .mockReturnValueOnce('[]'); // userRoles

    render(
      <MemoryRouter>
        <RouteGuard>
          <TestChild />
        </RouteGuard>
      </MemoryRouter>
    );

    expect(screen.getByTestId('protected-content')).toBeInTheDocument();
  });

  it('redirects to login when not authenticated', () => {
    mockLocalStorage.getItem
      .mockReturnValueOnce(null) // isAuthenticated check
      .mockReturnValueOnce('[]'); // userRoles

    render(
      <MemoryRouter>
        <RouteGuard>
          <TestChild />
        </RouteGuard>
      </MemoryRouter>
    );

    const navigate = screen.getByTestId('mock-navigate');
    expect(navigate).toHaveAttribute('data-to', '/login');
    expect(navigate).toHaveAttribute('data-state', JSON.stringify({ from: mockLocation }));
    expect(navigate).toHaveAttribute('data-replace', 'true');
  });

  it('renders children when authenticated and has required role', () => {
    mockLocalStorage.getItem
      .mockReturnValueOnce('valid-token') // isAuthenticated check
      .mockReturnValueOnce('["admin"]'); // userRoles

    render(
      <MemoryRouter>
        <RouteGuard requiredRoles={['admin']}>
          <TestChild />
        </RouteGuard>
      </MemoryRouter>
    );

    expect(screen.getByTestId('protected-content')).toBeInTheDocument();
  });

  it('redirects to home when missing required role', () => {
    mockLocalStorage.getItem
      .mockReturnValueOnce('valid-token') // isAuthenticated check
      .mockReturnValueOnce('["user"]'); // userRoles

    render(
      <MemoryRouter>
        <RouteGuard requiredRoles={['admin']}>
          <TestChild />
        </RouteGuard>
      </MemoryRouter>
    );

    const navigate = screen.getByTestId('mock-navigate');
    expect(navigate).toHaveAttribute('data-to', '/');
    expect(navigate).toHaveAttribute('data-replace', 'true');
  });

  it('handles multiple required roles correctly', () => {
    mockLocalStorage.getItem
      .mockReturnValueOnce('valid-token') // isAuthenticated check
      .mockReturnValueOnce('["editor", "reviewer"]'); // userRoles

    render(
      <MemoryRouter>
        <RouteGuard requiredRoles={['admin', 'editor']}>
          <TestChild />
        </RouteGuard>
      </MemoryRouter>
    );

    expect(screen.getByTestId('protected-content')).toBeInTheDocument();
  });

  describe('error handling', () => {
    it('treats malformed userRoles JSON as empty array', () => {
      mockLocalStorage.getItem
        .mockReturnValueOnce('valid-token') // isAuthenticated check
        .mockReturnValueOnce('invalid-json'); // userRoles

      render(
        <MemoryRouter>
          <RouteGuard requiredRoles={['admin']}>
            <TestChild />
          </RouteGuard>
        </MemoryRouter>
      );

      const navigate = screen.getByTestId('mock-navigate');
      expect(navigate).toHaveAttribute('data-to', '/');
      expect(navigate).toHaveAttribute('data-replace', 'true');
    });

    it('treats non-array userRoles JSON as empty array', () => {
      mockLocalStorage.getItem
        .mockReturnValueOnce('valid-token') // isAuthenticated check
        .mockReturnValueOnce('{"roles": ["admin"]}'); // userRoles as object instead of array

      render(
        <MemoryRouter>
          <RouteGuard requiredRoles={['admin']}>
            <TestChild />
          </RouteGuard>
        </MemoryRouter>
      );

      const navigate = screen.getByTestId('mock-navigate');
      expect(navigate).toHaveAttribute('data-to', '/');
      expect(navigate).toHaveAttribute('data-replace', 'true');
    });

    it('handles null userRoles as empty array', () => {
      mockLocalStorage.getItem
        .mockReturnValueOnce('valid-token') // isAuthenticated check
        .mockReturnValueOnce(null); // userRoles is null

      render(
        <MemoryRouter>
          <RouteGuard requiredRoles={['admin']}>
            <TestChild />
          </RouteGuard>
        </MemoryRouter>
      );

      const navigate = screen.getByTestId('mock-navigate');
      expect(navigate).toHaveAttribute('data-to', '/');
      expect(navigate).toHaveAttribute('data-replace', 'true');
    });
  });

  it('preserves location state when redirecting to login', () => {
    const complexLocation = {
      ...mockLocation,
      state: { someData: 'test-data' },
      search: '?query=test',
    };
    (require('react-router-dom').useLocation as jest.Mock).mockReturnValue(complexLocation);

    mockLocalStorage.getItem
      .mockReturnValueOnce(null) // isAuthenticated check
      .mockReturnValueOnce('[]'); // userRoles

    render(
      <MemoryRouter>
        <RouteGuard>
          <TestChild />
        </RouteGuard>
      </MemoryRouter>
    );

    const navigate = screen.getByTestId('mock-navigate');
    expect(navigate).toHaveAttribute('data-state', JSON.stringify({ from: complexLocation }));
  });
});