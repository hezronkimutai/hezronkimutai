import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { FooterProps, DEFAULT_SOCIAL_LINKS, ERROR_MESSAGES } from '../../types/footer';
import { PaymentButton, handleStripeCheckout } from '../PaymentButton/PaymentButton';
import images from '../../../../components/images';

export const Footer: React.FC<FooterProps> = ({
  className = '',
  socialLinks = DEFAULT_SOCIAL_LINKS,
  onCheckoutError,
  onCheckoutSuccess,
  disablePayments = false,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await handleStripeCheckout(onCheckoutSuccess, (err: AxiosError | Error) => {
        setError(ERROR_MESSAGES.CHECKOUT_FAILED);
        onCheckoutError?.(err as AxiosError);
      });
    } catch (err) {
      // Error already handled by the callback
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <footer className={`bg-primary/5 py-12 mt-16 border-t border-gold/20 ${className}`.trim()}>
      <div className="container mx-auto px-4 flex flex-col items-center">
        {!disablePayments && (
          <div className="mb-8">
            <PaymentButton
              onCheckout={handleCheckout}
              isLoading={isLoading}
              disabled={isLoading}
            />
            {error && (
              <p className="mt-2 text-red text-sm text-center animate-[fadeIn_0.3s_ease-out]">
                {error}
              </p>
            )}
          </div>
        )}
        
        <div className="flex justify-center gap-6 mb-8">
          {socialLinks.map((link) => (
            <a
              key={link.link}
              href={link.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group transition-transform duration-300 hover:scale-110
                focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2 rounded-full"
              title={link.title}
            >
              <img
                className="w-8 h-8 transition-all duration-300
                  filter saturate-50 group-hover:saturate-100
                  group-hover:shadow-lg group-hover:shadow-gold/20"
                src={images[link.imgUrl as keyof typeof images]}
                alt={`${link.title} icon`}
                loading="lazy"
              />
            </a>
          ))}
        </div>
        
        <div className="text-primary/80 text-sm text-center
          dark:text-gold/80">
          © {new Date().getFullYear()} Hezron Kimutai. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

Footer.displayName = 'Footer';

export default Footer;