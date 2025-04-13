import React from 'react';
import axios, { AxiosError } from 'axios';
import { PaymentButtonProps, CheckoutResponse, API_ENDPOINTS, ERROR_MESSAGES } from '../../types/footer';
import styles from './PaymentButton.module.scss';

export const PaymentButton: React.FC<PaymentButtonProps> = ({
  className = '',
  onCheckout,
  isLoading = false,
  disabled = false,
}) => {
  return (
    <button
      className={`${styles.button} ${className}`.trim()}
      type="button"
      onClick={onCheckout}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
    >
      {isLoading ? (
        <span className={styles.loader} aria-hidden="true" />
      ) : (
        <>
          <span className={styles.icon}>💳</span>
          <span className={styles.text}>Pay with Stripe</span>
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