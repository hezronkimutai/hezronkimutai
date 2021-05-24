import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => (
  <div>
    <Link to="/blog">Blog</Link>
    <Link to="/">Home</Link>
  </div>
);
export default NavBar;
