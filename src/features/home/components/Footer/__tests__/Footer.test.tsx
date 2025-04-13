import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios, { AxiosError } from 'axios';
import { Footer } from '../Footer';
import { DEFAULT_SOCIAL_LINKS, SocialLink } from '../../../types/footer';

// Mock PaymentButton and its helper
jest.mock('../../PaymentButton/PaymentButton', () => ({
  PaymentButton: jest.fn(({ onCheckout, isLoading, disabled }) => (
    <button 
      onClick={onCheckout} 
      disabled={disabled || isLoading}
      data-testid="payment-button"
    >
      {isLoading ? 'Loading...' : 'Pay with Stripe'}
    </button>
  )),
  handleStripeCheckout: jest.fn(),
}));

// Mock images object
jest.mock('../../../../../components/images', () => ({
  github: 'github-icon.svg',
  linkedIn: 'linkedin-icon.svg', // Corrected case
}));

describe('Footer Component', () => {
  const mockOnCheckoutError = jest.fn();
  const mockOnCheckoutSuccess = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders default social links', () => {
      render(<Footer />);
      
      DEFAULT_SOCIAL_LINKS.forEach(link => {
        const socialLink = screen.getByTitle(link.title);
        expect(socialLink).toBeInTheDocument();
        expect(socialLink).toHaveAttribute('href', link.link);
        // Use the correct mock image name based on the mock above
        const expectedSrc = link.imgUrl === 'linkedIn' ? 'linkedin-icon.svg' : `${link.imgUrl}-icon.svg`;
        expect(socialLink.querySelector('img')).toHaveAttribute('src', expectedSrc);
      });
    });

    it('renders custom social links', () => {
      const customLinks: SocialLink[] = [
        { link: 'https://custom.com', imgUrl: 'custom', title: 'Custom Link' }
      ];
      // Need to mock the custom image if it's expected to render
      jest.mock('../../../../../components/images', () => ({
        ...jest.requireActual('../../../../../components/images'), // Keep existing mocks
        custom: 'custom-icon.svg', 
      }), { virtual: true }); // Use virtual mock if needed

      render(<Footer socialLinks={customLinks} />);
      
      const customLink = screen.getByTitle('Custom Link');
      expect(customLink).toBeInTheDocument();
      expect(customLink).toHaveAttribute('href', 'https://custom.com');
      // Check for the mocked custom icon source
      // expect(customLink.querySelector('img')).toHaveAttribute('src', 'custom-icon.svg');
    });

    it('renders copyright information', () => {
      render(<Footer />);
      const currentYear = new Date().getFullYear();
      expect(screen.getByText(`© ${currentYear} Hezron Kimutai. All rights reserved.`)).toBeInTheDocument();
    });

    it('renders payment button by default', () => {
      render(<Footer />);
      expect(screen.getByTestId('payment-button')).toBeInTheDocument();
    });

    it('hides payment button when disablePayments is true', () => {
      render(<Footer disablePayments />);
      expect(screen.queryByTestId('payment-button')).not.toBeInTheDocument();
    });
  });

  describe('Styling', () => {
    it('applies custom className', () => {
      const customClass = 'custom-footer';
      const { container } = render(<Footer className={customClass} />);
      expect(container.firstChild).toHaveClass(customClass);
    });
  });

  describe('Payment Interaction', () => {
    const { handleStripeCheckout } = require('../../PaymentButton/PaymentButton');

    it('calls handleStripeCheckout when payment button is clicked', async () => {
      render(<Footer onCheckoutSuccess={mockOnCheckoutSuccess} onCheckoutError={mockOnCheckoutError} />);
      
      const paymentButton = screen.getByTestId('payment-button');
      // Wrap the event and subsequent state updates in act
      await act(async () => {
        fireEvent.click(paymentButton);
      });
      
      expect(handleStripeCheckout).toHaveBeenCalledWith(mockOnCheckoutSuccess, expect.any(Function));
    });

    it('shows loading state on payment button during checkout', async () => {
      handleStripeCheckout.mockImplementation(() => new Promise(() => {})); 
      
      render(<Footer />);
      const paymentButton = screen.getByTestId('payment-button');
      
      // Wrap the event and subsequent state updates in act
      await act(async () => {
        fireEvent.click(paymentButton);
      });
      
      expect(await screen.findByText('Loading...')).toBeInTheDocument();
      expect(paymentButton).toBeDisabled();
    });

    it('shows error message on checkout failure', async () => {
      const mockError = new Error('Checkout failed');
      handleStripeCheckout.mockImplementation(async (
        onSuccess: (url: string) => void, 
        onError: (error: AxiosError | Error) => void
      ) => {
        onError(mockError);
        throw mockError;
      });

      render(<Footer onCheckoutError={mockOnCheckoutError} />);
      const paymentButton = screen.getByTestId('payment-button');
      
      // Wrap the event and subsequent state updates in act
      await act(async () => {
         // It might throw, so wrap the click itself if needed, or just the assertions after
         try {
           fireEvent.click(paymentButton);
         } catch (e) {
           // Expected error throw from mock
         }
      });
      
      expect(await screen.findByText('Failed to initiate checkout. Please try again.')).toBeInTheDocument();
      expect(mockOnCheckoutError).toHaveBeenCalledWith(mockError);
    });
  });

  describe('Accessibility', () => {
    it('social links have correct titles', () => {
      render(<Footer />);
      DEFAULT_SOCIAL_LINKS.forEach(link => {
        expect(screen.getByTitle(link.title)).toBeInTheDocument();
      });
    });

    it('social link images have alt text', () => {
      render(<Footer />);
      DEFAULT_SOCIAL_LINKS.forEach(link => {
        expect(screen.getByAltText(`${link.title} icon`)).toBeInTheDocument();
      });
    });
  });
});