import React from 'react';
import { CallToactionBtn } from './LandingDiv';

const WhyMe = () => (
  <section className="py-16 bg-primary/50">
    <div className="container mx-auto px-4">
      <div className="flex items-center justify-center">
        <div className="max-w-4xl w-full">
          <div className="backdrop-blur-sm rounded-xl p-8 shadow-lg
            bg-primary/80 border border-gold/20 hover:border-gold/40
            transform hover:-translate-y-1
            hover:shadow-xl hover:shadow-gold/20
            transition-all duration-500 ease-out"
          >
            <h2 className="text-3xl font-bold mb-6 text-gold">
              Why Choose Me
            </h2>
            
            <p className="text-xl leading-relaxed text-gold/80
              animate-[fadeIn_0.5s_ease-out_0.3s_both]">
              Over the years, I have acquired relevant skills and experience,
              which I shall bring to your organization. I have also worked
              tirelessly on my communication abilities and teamwork skills, which
              I will put to use in my future career, which would be in your
              organization if I am selected for the position. I have given my
              100% effort in my past companies, and this has enabled me to
              recognize my capabilities and limitations. If I channelize them
              further, they will bring fruitful results to me and also to your
              esteemed organization.
            </p>
            
            <div className="mt-8 animate-[fadeIn_0.5s_ease-out_0.6s_both]">
              <CallToactionBtn
                className="inline-flex items-center px-8 py-3 text-lg font-semibold
                  bg-red hover:bg-orange text-white rounded-full
                  transform transition-all duration-300 hover:scale-105
                  shadow-lg hover:shadow-xl hover:shadow-orange/20
                  focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2
                  group"
                onClick={() => window.location.href = 'mailto:hezronchelimo.hc@gmail.com?subject=Job%20Opportunity'}
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
      </div>
    </div>
  </section>
);

export default WhyMe;
