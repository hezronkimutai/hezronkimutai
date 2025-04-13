import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import { PaymentButton, handleStripeCheckout } from '../PaymentButton';
import { API_ENDPOINTS, ERROR_MESSAGES } from '../../../types/footer';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Mock window.location using Object.defineProperty
const originalLocation = window.location;
let assignMock = jest.fn();

beforeAll(() => {
  delete (window as any).location;
  Object.defineProperty(window, 'location', {
    writable: true,
    value: {
      ...originalLocation, // Keep original properties
      assign: assignMock,
      href: '', // Provide a default href
    },
  });
});

afterAll(() => {
  // Restore original location
  Object.defineProperty(window, 'location', {
    writable: true,
    value: originalLocation,
  });
});

beforeEach(() => {
  assignMock.mockClear(); // Clear mock calls before each test
});

describe('PaymentButton Component', () => {
  const mockOnCheckout = jest.fn();

  beforeEach(() => {
    mockOnCheckout.mockClear();
  });

  it('renders button with correct text', () => {
    render(<PaymentButton onCheckout={mockOnCheckout} />);
    expect(screen.getByText('Pay with Stripe')).toBeInTheDocument();
    expect(screen.getByText('💳')).toBeInTheDocument();
  });

  it('calls onCheckout when clicked', () => {
    render(<PaymentButton onCheckout={mockOnCheckout} />);
    fireEvent.click(screen.getByRole('button'));
    expect(mockOnCheckout).toHaveBeenCalledTimes(1);
  });

  it('shows loader when isLoading is true', () => {
    render(<PaymentButton onCheckout={mockOnCheckout} isLoading />);
    expect(screen.getByRole('button')).toBeDisabled();
    expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true');
    expect(screen.queryByText('Pay with Stripe')).not.toBeInTheDocument();
    expect(screen.getByRole('button').querySelector('.loader')).toBeInTheDocument();
  });

  it('disables button when disabled prop is true', () => {
    render(<PaymentButton onCheckout={mockOnCheckout} disabled />);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('applies custom className', () => {
    const { container } = render(
      <PaymentButton onCheckout={mockOnCheckout} className="custom-button" />
    );
    expect(container.firstChild).toHaveClass('custom-button');
  });
});

describe('handleStripeCheckout Helper', () => {
  const mockOnSuccess = jest.fn();
  const mockOnError = jest.fn();

  beforeEach(() => {
    mockOnSuccess.mockClear();
    mockOnError.mockClear();
    mockedAxios.get.mockClear();
  });

  it('calls API and redirects on success', async () => {
    const mockUrl = 'https://stripe.com/checkout/session';
    mockedAxios.get.mockResolvedValue({ data: { url: mockUrl } });

    await handleStripeCheckout(mockOnSuccess, mockOnError);

    expect(mockedAxios.get).toHaveBeenCalledWith(API_ENDPOINTS.CHECKOUT);
    expect(mockOnSuccess).toHaveBeenCalledWith(mockUrl);
    expect(assignMock).toHaveBeenCalledWith(mockUrl); // Check if assign was called
    expect(mockOnError).not.toHaveBeenCalled();
  });

  it('calls onError and throws error on API failure', async () => {
    const mockError = new Error('API Error');
    mockedAxios.get.mockRejectedValue(mockError);

    await expect(handleStripeCheckout(mockOnSuccess, mockOnError)).rejects.toThrow('API Error');

    expect(mockedAxios.get).toHaveBeenCalledWith(API_ENDPOINTS.CHECKOUT);
    expect(mockOnError).toHaveBeenCalledWith(mockError);
    expect(mockOnSuccess).not.toHaveBeenCalled();
    expect(assignMock).not.toHaveBeenCalled();
  });

  it('calls onError and throws error if URL is missing', async () => {
    mockedAxios.get.mockResolvedValue({ data: {} }); // No URL in response

    await expect(handleStripeCheckout(mockOnSuccess, mockOnError)).rejects.toThrow(ERROR_MESSAGES.CHECKOUT_FAILED);

    expect(mockedAxios.get).toHaveBeenCalledWith(API_ENDPOINTS.CHECKOUT);
    expect(mockOnError).toHaveBeenCalledWith(expect.any(Error));
    expect(mockOnSuccess).not.toHaveBeenCalled();
    expect(assignMock).not.toHaveBeenCalled();
  });
});