import React, { useEffect, useState } from 'react';

const LandingDiv: React.FC = () => {
  const [displayText, setDisplayText] = useState<string>('');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  
  const roles: string[] = [
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
            from-white via-purple-100 to-blue-100 bg-clip-text text-transparent 
            drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)]">
            <span className="drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)]">HEZRON KIMUTAI</span>
            <br />
            <span className="text-3xl md:text-4xl font-normal text-gray-100 
              drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)]">
              CHELIMO
            </span>
          </h1>
          
          <div className="h-16 mb-8">
            <p className="text-xl md:text-2xl text-purple-200 font-light 
              drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              {displayText}
              <span className="animate-pulse">|</span>
            </p>
          </div>
          
          <p className="text-lg md:text-xl text-gray-100 max-w-4xl mx-auto mb-12 leading-relaxed
            drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] bg-slate-900/30 backdrop-blur-sm 
            rounded-lg p-6 border border-white/10">
            I'm a Fullstack Software Engineer focused on building scalable, efficient, and secure systems 
            across web and mobile platforms. My work spans startups, foundations, and distributed teams, 
            where I've consistently shipped production-ready systems using technologies like Golang, React, AWS, and Kubernetes.
            <br /><br />
            Beyond engineering, I'm the founding member of two initiatives: 
            <strong className="text-purple-300"> LIF (Learning Is Fun)</strong> - a community platform making learning collaborative and playful, 
            and <strong className="text-blue-300">HK Group</strong> - where refined ideas evolve into real products and companies.
            <br /><br />
            My work lives at the intersection of learning, systems, and entrepreneurship. 
            I believe in staying healthy and building wealth through strategic thinking and continuous growth.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <div className="bg-slate-900/60 backdrop-blur-md rounded-lg p-4 border border-white/20 
            hover:border-purple-500/70 hover:bg-slate-900/70 transition-all duration-300 
            shadow-lg hover:shadow-purple-500/20">
            <div className="text-2xl mb-2">📱</div>
            <div className="text-sm text-gray-300">Phone</div>
            <div className="text-white font-medium drop-shadow-sm">+254 790 717 147</div>
          </div>
          
          <div className="bg-slate-900/60 backdrop-blur-md rounded-lg p-4 border border-white/20 
            hover:border-blue-500/70 hover:bg-slate-900/70 transition-all duration-300 
            shadow-lg hover:shadow-blue-500/20">
            <div className="text-2xl mb-2">📧</div>
            <div className="text-sm text-gray-300">Email</div>
            <div className="text-white font-medium text-sm drop-shadow-sm">hezronchelimo.hc@gmail.com</div>
          </div>
          
          <div className="bg-slate-900/60 backdrop-blur-md rounded-lg p-4 border border-white/20 
            hover:border-green-500/70 hover:bg-slate-900/70 transition-all duration-300 
            shadow-lg hover:shadow-green-500/20">
            <div className="text-2xl mb-2">💼</div>
            <div className="text-sm text-gray-300">LinkedIn</div>
            <div className="text-white font-medium text-sm drop-shadow-sm">hezron-kimutai</div>
          </div>
          
          <div className="bg-slate-900/60 backdrop-blur-md rounded-lg p-4 border border-white/20 
            hover:border-yellow-500/70 hover:bg-slate-900/70 transition-all duration-300 
            shadow-lg hover:shadow-yellow-500/20">
            <div className="text-2xl mb-2">🔗</div>
            <div className="text-sm text-gray-300">GitHub</div>
            <div className="text-white font-medium drop-shadow-sm">hezronkimutai</div>
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
