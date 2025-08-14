import React, { useState, useEffect } from 'react';
import { StrategicBackground, LinuxTribute } from '../../shared/components';
import LandingDiv from './LandingDiv';
import TechnicalSkills from './TechnicalSkills';
import Experiences from './Experiences';
import Projects from './Projects';
import Contact from './Contact';
import Footer from './Footer';

interface SocialLink {
  link: string;
  icon: string;
  title: string;
  color: string;
}

const socialLinks: SocialLink[] = [
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
  },
  {
    link: 'https://github.com/torvalds/linux',
    icon: '🐧',
    title: 'Linux Love',
    color: 'hover:text-green-300'
  }
];

const Home: React.FC = () => {
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
        {/* Navbar removed as requested */}

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

          {/* Linux Tribute Section */}
          <section id="linux-tribute" className="min-h-screen">
            <LinuxTribute />
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
