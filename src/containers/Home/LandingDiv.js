import React, { useEffect, useState } from 'react';

const LandingDiv = () => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const roles = [
    'Fullstack Software Engineer',
    'Cloud Solutions Architect', 
    'Mobile App Developer',
    'System Optimization Expert'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const currentRole = roles[currentIndex];
    let index = 0;
    const typeInterval = setInterval(() => {
      setDisplayText(currentRole.slice(0, index));
      index++;
      if (index > currentRole.length) {
        clearInterval(typeInterval);
      }
    }, 100);
    return () => clearInterval(typeInterval);
  }, [currentIndex]);

  return (
    <section className="min-h-screen flex items-center justify-center px-4 pt-20">
      <div className="max-w-6xl mx-auto text-center">
        {/* Main Hero Content */}
        <div className="mb-12">
          <div className="inline-block mb-6">
            <span className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 
              rounded-full text-sm font-medium text-purple-300 border border-purple-500/30">
              Available for new opportunities
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r 
            from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
            HEZRON KIMUTAI
            <br />
            <span className="text-3xl md:text-4xl font-normal text-gray-300">
              CHELIMO
            </span>
          </h1>
          
          <div className="h-16 mb-8">
            <p className="text-xl md:text-2xl text-purple-300 font-light">
              {displayText}
              <span className="animate-pulse">|</span>
            </p>
          </div>
          
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
            Results-driven engineer with extensive experience designing high-performance, 
            scalable web and mobile applications. Passionate about microservices architecture, 
            cloud solutions, and building secure, optimized systems.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 hover:border-purple-500/50 transition-all duration-300">
            <div className="text-2xl mb-2">📱</div>
            <div className="text-sm text-gray-400">Phone</div>
            <div className="text-white font-medium">+254 790 717 147</div>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 hover:border-blue-500/50 transition-all duration-300">
            <div className="text-2xl mb-2">📧</div>
            <div className="text-sm text-gray-400">Email</div>
            <div className="text-white font-medium text-sm">hezronchelimo.hc@gmail.com</div>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 hover:border-green-500/50 transition-all duration-300">
            <div className="text-2xl mb-2">💼</div>
            <div className="text-sm text-gray-400">LinkedIn</div>
            <div className="text-white font-medium text-sm">hezron-kimutai</div>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 hover:border-yellow-500/50 transition-all duration-300">
            <div className="text-2xl mb-2">🔗</div>
            <div className="text-sm text-gray-400">GitHub</div>
            <div className="text-white font-medium">hezronkimutai</div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="https://docs.google.com/document/d/1r5V9Pm0FhYDSiu1G4dtHqJ0QlbUZCq-r52SAM1OHago/edit?usp=sharing"
            target="_blank"
            rel="noreferrer"
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 
              text-white font-semibold rounded-full hover:from-purple-700 hover:to-blue-700 
              transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
          >
            📄 Download Resume
          </a>
          
          <a
            href="#contact"
            className="px-8 py-4 border-2 border-purple-500 text-purple-300 
              font-semibold rounded-full hover:bg-purple-500 hover:text-white 
              transform hover:scale-105 transition-all duration-300"
          >
            💬 Let's Connect
          </a>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingDiv;
