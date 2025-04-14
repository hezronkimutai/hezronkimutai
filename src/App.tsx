import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { NavBar } from './shared/components/NavBar';
import Home from './containers/Home';
import NotFound from './shared/components/NotFound';
import RouteGuard from './shared/components/RouteGuard';
import { QueryProvider } from './shared/providers/QueryProvider';
import './assets/css/App.scss';
import type { RouteConfig } from './types/route';
import { blogRoutes } from './features/blog/routes/BlogRoutes';

const routes: RouteConfig[] = [
  {
    path: '/',
    exact: true,
    component: Home,
  },
  ...blogRoutes
];

const App: React.FC = () => (
  <QueryProvider>
    <Router>
      <NavBar />
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-lg text-gray-600">Loading...</div>
        </div>
      }>
        <Routes>
          {routes.map(({ path, exact, component: Component, meta }) => (
            <Route
              key={path}
              path={path}
              element={
                meta?.requiresAuth ? (
                  <RouteGuard requiredRoles={meta?.roles}>
                    <Component />
                  </RouteGuard>
                ) : (
                  <Component />
                )
              }
            />
          ))}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  </QueryProvider>
);

export default App;