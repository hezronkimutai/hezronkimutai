import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { FooterProps, DEFAULT_SOCIAL_LINKS, ERROR_MESSAGES } from '../../types/footer';
import { PaymentButton, handleStripeCheckout } from '../PaymentButton/PaymentButton';
import images from '../../../../components/images';
import styles from './Footer.module.scss';

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
        // Pass the error, regardless of its specific type (AxiosError or generic Error)
        onCheckoutError?.(err as AxiosError); // Cast for the prop if needed, or adjust prop type
      });
    } catch (err) {
      // Error already handled by the callback
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <footer className={`${styles.footer} ${className}`.trim()}>
      <div className={styles.content}>
        {!disablePayments && (
          <div className={styles.paymentSection}>
            <PaymentButton
              onCheckout={handleCheckout}
              isLoading={isLoading}
              disabled={isLoading}
            />
            {error && <p className={styles.error}>{error}</p>}
          </div>
        )}
        
        <div className={styles.socialLinks}>
          {socialLinks.map((link) => (
            <a
              key={link.link}
              href={link.link}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              title={link.title}
            >
              <img
                className={styles.socialIcon}
                src={images[link.imgUrl as keyof typeof images]}
                alt={`${link.title} icon`}
                loading="lazy"
              />
            </a>
          ))}
        </div>
        
        <div className={styles.copyright}>
          © {new Date().getFullYear()} Hezron Kimutai. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

Footer.displayName = 'Footer';

export default Footer;