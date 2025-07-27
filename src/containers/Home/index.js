import React, { useState, useEffect } from 'react';
import StrategicBackground from '../../components/StrategicBackground';
import LandingDiv from './LandingDiv';
import TechnicalSkills from './TechnicalSkills';
import Experiences from './Experiences';
import Projects from './Projects';
import Contact from './Contact';
import Footer from './Footer';

const socialLinks = [
  {
    link: 'https://github.com/hezronkimutai',
    icon: '🔗',
    title: 'GitHub',
    color: 'hover:text-purple-400'
  },
  {
    link: 'https://www.linkedin.com/in/hezron-kimutai',
    icon: '💼',
    title: 'LinkedIn',
    color: 'hover:text-blue-400'
  },
  {
    link: 'mailto:hezronchelimo.hc@gmail.com',
    icon: '📧',
    title: 'Email',
    color: 'hover:text-green-400'
  },
  {
    link: 'tel:+254790717147',
    icon: '📱',
    title: 'Phone',
    color: 'hover:text-yellow-400'
  }
];

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
    <StrategicBackground>
      <div className="min-h-screen bg-gradient-to-br from-slate-900/50 via-purple-900/30 to-slate-900/50">
        {/* Enhanced Floating Navigation */}
        <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 bg-black/30 backdrop-blur-xl rounded-full px-8 py-4 border border-white/20 shadow-2xl">
          <div className="flex items-center space-x-8">
            {socialLinks.map((link) => (
              <a
                key={link.link}
                href={link.link}
                target="_blank"
                rel="noreferrer"
                className={`text-2xl transition-all duration-300 hover:scale-125 transform hover:rotate-12 ${link.color} relative group`}
                title={link.title}
              >
                {link.icon}
                <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                  {link.title}
                </span>
              </a>
            ))}

            <div className="w-px h-6 bg-white/20"></div>

            <button
              onClick={toggleDarkMode}
              className="text-2xl hover:scale-125 transition-all duration-300 transform hover:rotate-180 relative group"
              title="Toggle theme"
            >
              {isDark ? '🌙' : '☀️'}
              <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                Toggle Theme
              </span>
            </button>
          </div>
        </nav>

        {/* Scroll Progress Indicator */}
        <div className="fixed top-0 left-0 w-full h-1 z-50">
          <div
            className="h-full bg-gradient-to-r from-purple-500 via-blue-500 to-green-500 transition-all duration-300"
            style={{
              width: `${(window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100}%`
            }}
          />
        </div>

        {/* Main Content Sections */}
        <div className="relative">
          {/* Hero Section */}
          <section id="hero" className="min-h-screen">
            <LandingDiv />
          </section>

          {/* Skills Section */}
          <section id="skills" className="min-h-screen">
            <TechnicalSkills />
          </section>

          {/* Experience Section */}
          <section id="experience" className="min-h-screen">
            <Experiences />
          </section>

          {/* Projects Section */}
          <section id="projects" className="min-h-screen">
            <Projects />
          </section>

          {/* Contact Section */}
          <section id="contact" className="min-h-screen">
            <Contact />
          </section>

          {/* Footer */}
          <Footer />
        </div>

        {/* Floating Action Button */}
        <div className="fixed bottom-8 right-8 z-50">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-14 h-14 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full 
              flex items-center justify-center text-white text-xl shadow-2xl 
              hover:shadow-purple-500/25 transform hover:scale-110 transition-all duration-300
              animate-bounce hover:animate-none"
            title="Back to top"
          >
            ↑
          </button>
        </div>

        {/* Ambient Light Effects */}
        <div className="fixed inset-0 pointer-events-none z-1">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        </div>
      </div>
    </StrategicBackground>
  );
};

export default Home;
