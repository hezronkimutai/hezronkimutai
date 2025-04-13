import { AxiosError } from 'axios';

export interface SocialLink {
  link: string;
  imgUrl: string;
  title: string; // For accessibility
}

export interface FooterProps {
  className?: string;
  socialLinks?: SocialLink[];
  onCheckoutError?: (error: AxiosError) => void;
  onCheckoutSuccess?: (url: string) => void;
  disablePayments?: boolean;
}

export type CheckoutResponse = {
  url: string;
};

export interface PaymentButtonProps {
  className?: string;
  onCheckout: () => Promise<void>;
  isLoading?: boolean;
  disabled?: boolean;
}

// Default social links
export const DEFAULT_SOCIAL_LINKS: SocialLink[] = [
  {
    link: 'https://github.com/hezronkimutai',
    imgUrl: 'github',
    title: 'GitHub Profile',
  },
  {
    link: 'https://www.linkedin.com/in/hezron-kimutai-603b62173/',
    imgUrl: 'linkedIn',
    title: 'LinkedIn Profile',
  },
] as const;

// API endpoints
export const API_ENDPOINTS = {
  CHECKOUT: 'http://localhost:3000/checkout',
} as const;

// Error messages
export const ERROR_MESSAGES = {
  CHECKOUT_FAILED: 'Failed to initiate checkout. Please try again.',
  NETWORK_ERROR: 'Network error occurred. Please check your connection.',
} as const;