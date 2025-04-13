import React from 'react';
import { Link } from 'react-router-dom';
import { NavBarProps } from '../../../types';
import './NavBar.scss'; 

const defaultLinks = [
  { to: '/', label: 'Home' },
  { to: '/blog', label: 'Blog' },
];

const NavBar: React.FC<NavBarProps> = ({
  className = '',
  links = defaultLinks,
}) => {
  return (
    <nav className={"navbar_container " + className.trim()}>
      {links.map(({ to, label }) => (
        <Link
          key={`${to}-${label}`}
          className="nav_link"
          to={to}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
};

export default NavBar;
