import React from 'react';
import { CallToActionBtn } from '../CallToActionBtn';

export interface WhyMeProps {
  /**
   * Optional className for the container
   */
  className?: string;

  /**
   * Optional image URL for profile picture
   */
  profileImageUrl?: string;

  /**
   * Custom description text
   */
  description?: string;

  /**
   * Handler for hire me button click
   */
  onHireClick?: () => void;
}

const defaultDescription = `
  Over the years, I have acquired relevant skills and experience,
  which I shall bring to your organization. I have also worked
  tirelessly on my communication abilities and teamwork skills, which
  I will put to use in my future career, which would be in your
  organization if I am selected for the position. I have given my
  100% effort in my past companies, and this has enabled me to
  recognize my capabilities and limitations. If I channelize them
  further, they will bring fruitful results to me and also to your
  esteemed organization.
`.trim();

export const WhyMe: React.FC<WhyMeProps> = ({
  className = '',
  profileImageUrl,
  description = defaultDescription,
  onHireClick = () => {},
}) => (
  <section 
    className={`py-16 bg-gradient-to-b from-white/50 to-transparent 
      dark:from-primary/50 dark:to-transparent ${className}`.trim()}
    aria-labelledby="why-me-heading"
  >
    <div className="container mx-auto px-4">
      <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center gap-12">
        {profileImageUrl && (
          <div className="lg:w-1/3 animate-[slideIn_0.5s_ease-out]">
            <div className="relative group">
              <img
                className="w-full rounded-2xl shadow-xl 
                  transform transition-transform duration-700
                  group-hover:scale-[1.02]"
                src={profileImageUrl}
                alt="Hezron Kimutai"
                loading="lazy"
              />
              <div className="absolute inset-0 rounded-2xl
                bg-gradient-to-tr from-gold/20 to-transparent opacity-0 
                group-hover:opacity-100 transition-opacity duration-700" 
              />
            </div>
          </div>
        )}
        <div className={`lg:w-2/3 animate-[slideIn_0.5s_ease-out_0.3s_both]
          ${!profileImageUrl ? 'lg:w-full max-w-3xl mx-auto text-center' : ''}`}>
          <h2 id="why-me-heading" 
            className="text-3xl font-bold mb-6 text-primary dark:text-gold">
            Why Choose Me
          </h2>
          <p className="text-lg leading-relaxed mb-8 text-primary/80 dark:text-gold/80
            animate-[fadeIn_0.5s_ease-out_0.5s_both]">
            {description}
          </p>
          <CallToActionBtn
            className="inline-flex items-center px-8 py-3 text-lg font-semibold
              bg-red hover:bg-orange text-white rounded-full
              transform transition-all duration-300 hover:scale-105
              shadow-lg hover:shadow-xl hover:shadow-orange/20
              focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2
              animate-[fadeIn_0.5s_ease-out_0.7s_both]"
            onClick={onHireClick}
            displayText={
              <span className="flex items-center">
                HIRE ME
                <svg 
                  className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M13 7l5 5m0 0l-5 5m5-5H6" 
                  />
                </svg>
              </span>
            }
          />
        </div>
      </div>
    </div>
  </section>
);

WhyMe.displayName = 'WhyMe';

export default WhyMe;