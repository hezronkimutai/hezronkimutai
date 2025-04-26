import React from 'react';
import { Link } from 'react-router-dom';
import { NavBarProps } from '../../../types';

const defaultLinks = [
  { to: '/', label: 'Home' },
  { to: '/blog', label: 'Blog' },
];

const NavBar: React.FC<NavBarProps> = ({
  className = '',
  links = defaultLinks,
}) => {
  return (
    <nav className={`fixed right-[100px] top-[10px] z-[1000] w-max ${className}`.trim()}>
      {links.map(({ to, label }) => (
        <Link
          key={`${to}-${label}`}
          className="mx-1.5 no-underline font-medium text-primary hover:text-orange transition-colors duration-300"
          to={to}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
};

export default NavBar;
