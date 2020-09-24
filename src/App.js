import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './containers/index';

const routes = [
  {
    path: '/',
    exact: true,
    // auth: false,
    component: Home,
  },
];

const App = () => (
  <Router>
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
