import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { NavBar } from './shared/components/NavBar';
import Home from './containers/Home';
import Blog from './containers/Blog';
import './assets/css/App.scss';

interface RouteConfig {
  path: string;
  exact: boolean;
  component: React.ComponentType;
}

const routes: RouteConfig[] = [
  {
    path: '/',
    exact: true,
    component: Home,
  },
  {
    path: '/blog',
    exact: true,
    component: Blog,
  },
];

const App: React.FC = () => (
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