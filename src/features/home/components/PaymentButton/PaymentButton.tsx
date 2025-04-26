import React from 'react';
import axios, { AxiosError } from 'axios';
import { PaymentButtonProps, CheckoutResponse, API_ENDPOINTS, ERROR_MESSAGES } from '../../types/footer';

export const PaymentButton: React.FC<PaymentButtonProps> = ({
  className = '',
  onCheckout,
  isLoading = false,
  disabled = false,
}) => {
  return (
    <button
      className={`inline-flex items-center px-6 py-3 text-base font-medium rounded-full
        bg-primary text-white shadow-lg
        transition-all duration-300 ease-in-out
        hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/20
        focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}`.trim()}
      type="button"
      onClick={onCheckout}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
    >
      {isLoading ? (
        <span className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full inline-block animate-spin" 
          aria-hidden="true" 
        />
      ) : (
        <>
          <span className="mr-2 text-xl" role="img" aria-hidden="true">
            💳
          </span>
          <span className="relative">
            Pay with Stripe
            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gold scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
          </span>
        </>
      )}
    </button>
  );
};

// Helper function to handle Stripe checkout
export const handleStripeCheckout = async (
  onSuccess?: (url: string) => void,
  onError?: (error: AxiosError | Error) => void,
): Promise<void> => {
  try {
    const { data } = await axios.get<CheckoutResponse>(API_ENDPOINTS.CHECKOUT);
    
    if (data?.url) {
      onSuccess?.(data.url);
      // Use assign for better testability with mocks
      window.location.assign(data.url); 
    } else {
      throw new Error(ERROR_MESSAGES.CHECKOUT_FAILED);
    }
  } catch (error) {
    console.error('Stripe checkout error:', error);
    // Ensure error is typed correctly for the callback
    const typedError = error instanceof Error ? error : new Error(String(error));
    onError?.(typedError);
    throw typedError; // Re-throw the typed error
  }
};

PaymentButton.displayName = 'PaymentButton';

export default PaymentButton;