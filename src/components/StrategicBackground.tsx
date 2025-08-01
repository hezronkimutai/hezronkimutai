import React, { useEffect, useState } from 'react';
import ChessAnimation from './ChessAnimation';
import ParticleField from './ParticleField';
import FloatingShapes from './FloatingShapes';

interface StrategicBackgroundProps {
  children: React.ReactNode;
}

const StrategicBackground: React.FC<StrategicBackgroundProps> = ({ children }) => {
  const [currentSection, setCurrentSection] = useState<'hero' | 'skills' | 'experience' | 'projects' | 'contact'>('hero');

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Calculate which section is currently in view
      const sectionHeight = windowHeight;
      const currentSectionIndex = Math.floor(scrollY / sectionHeight);
      
      const sections: Array<'hero' | 'skills' | 'experience' | 'projects' | 'contact'> = [
        'hero', 'skills', 'experience', 'projects', 'contact'
      ];
      
      const newSection = sections[Math.min(currentSectionIndex, sections.length - 1)];
      
      if (newSection !== currentSection) {
        setCurrentSection(newSection);
      }
    };

    // Throttle scroll events for better performance
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    
    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener('scroll', throttledScroll);
    };
  }, [currentSection]);

  return (
    <div className="relative">
      {/* Strategic 3D Background */}
      <div className="fixed inset-0 z-0">
        <ChessAnimation section={currentSection} />
      </div>
      
      {/* Interactive Particle Field */}
      <ParticleField 
        density={20} 
        speed={0.2} 
        colors={['#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444']}
        interactive={true}
      />
      
      {/* Floating Geometric Shapes */}
      <FloatingShapes />
      
      {/* Enhanced Overlays for better text readability */}
      <div className="fixed inset-0 z-1 pointer-events-none">
        {/* Main dark overlay for better contrast */}
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[0.5px]" />
        
        {/* Gradient overlays */}
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-slate-900/90 via-slate-900/70 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-slate-900/90 via-slate-900/70 to-transparent" />
        
        {/* Center content area overlay */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-slate-900/20 to-slate-900/40" />
        
        {/* Side gradients for mobile */}
        <div className="absolute top-0 bottom-0 left-0 w-12 bg-gradient-to-r from-slate-900/80 to-transparent md:hidden" />
        <div className="absolute top-0 bottom-0 right-0 w-12 bg-gradient-to-l from-slate-900/80 to-transparent md:hidden" />
        
        {/* Text readability zones */}
        <div className="absolute inset-0">
          {/* Hero section overlay */}
          <div className="absolute top-0 left-0 right-0 h-screen bg-gradient-to-b from-slate-900/30 via-transparent to-slate-900/30" />
          
          {/* Skills section overlay */}
          <div className="absolute top-[100vh] left-0 right-0 h-screen bg-gradient-to-b from-slate-900/40 via-slate-900/20 to-slate-900/40" />
          
          {/* Experience section overlay */}
          <div className="absolute top-[200vh] left-0 right-0 h-screen bg-gradient-to-b from-slate-900/35 via-slate-900/15 to-slate-900/35" />
          
          {/* Projects section overlay */}
          <div className="absolute top-[300vh] left-0 right-0 h-screen bg-gradient-to-b from-slate-900/45 via-slate-900/25 to-slate-900/45" />
          
          {/* Contact section overlay */}
          <div className="absolute top-[400vh] left-0 right-0 h-screen bg-gradient-to-b from-slate-900/40 via-slate-900/20 to-slate-900/60" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Floating UI Elements */}
      <div className="fixed top-1/2 right-8 transform -translate-y-1/2 z-20 hidden lg:block">
        <div className="flex flex-col space-y-4">
          {['hero', 'skills', 'experience', 'projects', 'contact'].map((section, index) => (
            <div
              key={section}
              className={`w-3 h-3 rounded-full border-2 transition-all duration-300 cursor-pointer ${
                currentSection === section
                  ? 'bg-purple-500 border-purple-500 scale-125'
                  : 'bg-transparent border-white/30 hover:border-purple-400'
              }`}
              onClick={() => {
                const targetY = index * window.innerHeight;
                window.scrollTo({ top: targetY, behavior: 'smooth' });
              }}
              title={section.charAt(0).toUpperCase() + section.slice(1)}
            />
          ))}
        </div>
      </div>

      {/* Performance indicator */}
      <div className="fixed bottom-4 left-4 z-20 opacity-50 hover:opacity-100 transition-opacity duration-300">
        <div className="bg-black/20 backdrop-blur-sm rounded-lg px-3 py-2 text-xs text-white/70">
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${
              currentSection === 'hero' ? 'bg-green-400' : 
              currentSection === 'skills' ? 'bg-blue-400' :
              currentSection === 'experience' ? 'bg-yellow-400' :
              currentSection === 'projects' ? 'bg-purple-400' : 'bg-pink-400'
            } animate-pulse`} />
            <span>{currentSection}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StrategicBackground;