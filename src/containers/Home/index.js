import React, { useState, useEffect } from 'react';
import BackgroundAnimation from '../../components/BackgroundAnimation';
import LandingDiv from './LandingDiv';
import Profile from './Services';
import Experiences from './Experiences';
import Abilities from './WhyMe';
import Projects from './Projects';
import Footer from './Footer';
import images from '../../components/images';

const { github } = images;

const socialLinks = [{
  link: 'https://github.com/hezronkimutai/portfolio',
  imgUrl: github,
  title: 'GitHub'
}];

const Home = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  const toggleDarkMode = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className="relative min-h-screen bg-primary text-gold">
      {/* Background Animation Container */}
      <div className="fixed inset-0 z-0 overflow-hidden opacity-5">
        <BackgroundAnimation />
      </div>

      {/* Main Content Container */}
      <div
        className="relative z-10"
        onScrollCapture={(e) => {
          e.preventDefault();
        }}
      >
        {/* Top Bar */}
        <div className="fixed top-0 left-0 right-0 z-20 backdrop-blur-sm bg-primary/80">
          <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {socialLinks.map((link) => (
                <a
                  key={link.link}
                  href={link.link}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-transform hover:scale-110 
                    focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2 
                    rounded-full group"
                  title={link.title}
                >
                  <div className="relative">
                    <img
                      alt={link.title}
                      className="w-8 h-8 rounded-full 
                        border-2 border-gold/30 hover:border-gold
                        transition-all duration-300"
                      src={link.imgUrl}
                    />
                  </div>
                </a>
              ))}
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="w-12 h-6 rounded-full flex items-center 
                bg-primary-light transition-colors duration-200 
                focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2"
              type="button"
              title="Toggle dark mode"
            >
              <div className={`
                w-5 h-5 rounded-full transform duration-200 shadow-md
                ${isDark 
                  ? 'translate-x-7 bg-gold' 
                  : 'translate-x-1 bg-orange'
                }
              `} />
            </button>
          </div>
        </div>

        {/* Page Sections */}
        <div className="pt-20">
          <LandingDiv />
          <Abilities />
          <Profile />
          <Projects />
          <Experiences />
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Home;
