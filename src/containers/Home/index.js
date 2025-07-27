import React, { useState, useEffect } from 'react';
import ThreeAnimation from '../../components/ThreeAnimation';
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
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <ThreeAnimation />
      </div>

      {/* Floating Navigation */}
      <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 bg-black/20 backdrop-blur-lg rounded-full px-6 py-3 border border-white/10">
        <div className="flex items-center space-x-6">
          {socialLinks.map((link) => (
            <a
              key={link.link}
              href={link.link}
              target="_blank"
              rel="noreferrer"
              className={`text-2xl transition-all duration-300 hover:scale-125 ${link.color}`}
              title={link.title}
            >
              {link.icon}
            </a>
          ))}
          
          <button
            onClick={toggleDarkMode}
            className="ml-4 text-2xl hover:scale-125 transition-transform duration-300"
            title="Toggle theme"
          >
            {isDark ? '🌙' : '☀️'}
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10">
        <LandingDiv />
        <TechnicalSkills />
        <Experiences />
        <Projects />
        <Contact />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
