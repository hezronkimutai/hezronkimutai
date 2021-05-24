import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './containers/Home';
import Blog from './containers/Blog';
import NavBar from './components/navBar';

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
    <Switch>
      {routes.map(
        (route) => (
          <Route
            exact={route.exact}
            key={route.path}
            path={route.path}
            component={route.component}
          />
        ),
      )}
    </Switch>
  </Router>
);
export default App;
