import React from 'react';
import images from '../../components/images';

const {
  github,
  twitter,
  stackoverflow,
  linkedin,
  instagram,
  facebook,
} = images;

const socialLinks = [
  {
    title: 'GitHub',
    link: 'https://github.com/hezronkimutai',
    imgUrl: github,
  },
  {
    title: 'Twitter',
    link: 'https://twitter.com/hezronkimutai',
    imgUrl: twitter,
  },
  {
    title: 'Stack Overflow',
    link: 'https://stackoverflow.com/users/11361590/hezron-kimutai',
    imgUrl: stackoverflow,
  },
  {
    title: 'LinkedIn',
    link: 'https://www.linkedin.com/in/hezron-kimutai-chelimo/',
    imgUrl: linkedin,
  },
  {
    title: 'Instagram',
    link: 'https://www.instagram.com/hezronkimutai/',
    imgUrl: instagram,
  },
  {
    title: 'Facebook',
    link: 'https://www.facebook.com/hezron.kimutai',
    imgUrl: facebook,
  },
];

const Footer = () => (
  <footer className="py-12 border-t border-black/10 dark:border-white/10">
    <div className="container mx-auto px-4">
      <div className="flex flex-wrap justify-center items-center gap-6">
        {socialLinks.map((link) => (
          <a
            key={link.link}
            href={link.link}
            target="_blank"
            rel="noreferrer"
            className="transition-transform hover:scale-110 
              focus:outline-none focus:ring-2 focus:ring-offset-2 
              rounded-full group"
            title={link.title}
          >
            <div className="relative">
              <img
                alt={link.title}
                className="w-8 h-8 rounded-full 
                  border-2 border-black/10 dark:border-white/10
                  transition-all duration-300"
                src={link.imgUrl}
              />
            </div>
          </a>
        ))}
      </div>
      <div className="text-center mt-8">
        <p className="text-sm opacity-80">
          © {new Date().getFullYear()} Hezron Kimutai. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
