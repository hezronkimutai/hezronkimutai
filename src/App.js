import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './containers/Home';
import Blog from './containers/Blog';
import NavBar from './components/navBar';
import './assets/css/App.scss';

const routes = [
  {
    path: '/',
    exact: true,
    // auth: false,
    component: Home,
  },
  {
    path: '/blog',
    exact: true,
    // auth: false,
    component: Blog,
  },
];

const App = () => (
  <Router>
    <NavBar />
    <Routes>
      {routes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={<route.component />}
        />
      ))}
    </Routes>
  </Router>
);

export default App;
