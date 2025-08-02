import React from 'react';

interface SocialLink {
  title: string;
  link: string;
  icon: string;
  color: string;
}

const Footer: React.FC = () => {
  const socialLinks: SocialLink[] = [
    {
      title: 'GitHub',
      link: 'https://github.com/hezronkimutai',
      icon: '🔗',
      color: 'hover:text-purple-400'
    },
    {
      title: 'LinkedIn',
      link: 'https://www.linkedin.com/in/hezron-kimutai',
      icon: '💼',
      color: 'hover:text-blue-400'
    },
    {
      title: 'Twitter',
      link: 'https://x.com/ArapNyongiot',
      icon: '🐦',
      color: 'hover:text-cyan-400'
    },
    {
      title: 'Email',
      link: 'mailto:hezronchelimo.hc@gmail.com',
      icon: '📧',
      color: 'hover:text-green-400'
    },
    {
      title: 'WhatsApp Community',
      link: 'https://chat.whatsapp.com/L1O3rK82azIG54sBwNMeEF',
      icon: '💬',
      color: 'hover:text-green-500'
    },
    {
      title: 'Linux Kernel',
      link: 'https://github.com/torvalds/linux',
      icon: '🐧',
      color: 'hover:text-green-300'
    }
  ];

  const quickLinks = [
    { name: 'About', href: '#' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
    { name: 'Blog', href: '/blog' }
  ];

  return (
    <footer className="py-16 px-4 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold text-white mb-4">
              Hezron Kimutai Chelimo
            </h3>
            <p className="text-gray-300 mb-6 max-w-md">
              Fullstack Software Engineer passionate about building scalable, 
              high-performance applications and contributing to the open-source community.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <a
                  key={link.title}
                  href={link.link}
                  target="_blank"
                  rel="noreferrer"
                  className={`text-2xl transition-all duration-300 hover:scale-125 ${link.color}`}
                  title={link.title}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-purple-400 transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Contact</h4>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-center">
                <span className="mr-2">📧</span>
                <span className="text-sm">hezronchelimo.hc@gmail.com</span>
              </div>
              <div className="flex items-center">
                <span className="mr-2">📱</span>
                <span className="text-sm">+254 790 717 147</span>
              </div>
              <div className="flex items-center">
                <span className="mr-2">📍</span>
                <span className="text-sm">Nairobi, Kenya</span>
              </div>
            </div>
          </div>
        </div>

        {/* Support Section */}
        <div className="border-t border-white/10 pt-8 mb-8">
          <div className="text-center">
            <h4 className="text-lg font-semibold text-white mb-4">Support My Work</h4>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="https://buymeacoffee.com/hezronchel6"
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 
                  text-white font-medium rounded-full hover:from-yellow-600 hover:to-orange-600 
                  transition-all duration-300 transform hover:scale-105"
              >
                ☕ Buy Me a Coffee
              </a>
              <a
                href="https://ko-fi.com/hezronchelimo"
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 border-2 border-blue-500 text-blue-400 
                  font-medium rounded-full hover:bg-blue-500 hover:text-white 
                  transition-all duration-300 transform hover:scale-105"
              >
                💙 Support on Ko-fi
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} Hezron Kimutai Chelimo. All rights reserved.
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <span>Made with ❤️ in Kenya</span>
              <span>•</span>
              <span>Built with React & Tailwind CSS</span>
            </div>
          </div>
        </div>

        {/* Fun Fact */}
        <div className="text-center mt-8">
          <p className="text-purple-300 text-sm italic mb-2">
            "I am awesome" - Fun fact about me 😄
          </p>
          <p className="text-green-300 text-xs font-mono">
            <span className="text-gray-500">$ echo</span> "Built on the shoulders of Unix giants 🐧" 
            <span className="text-gray-500"> # Thanks Linus!</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
