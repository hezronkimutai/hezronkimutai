import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './containers/Home';
import { NotFound } from './shared/components';
import RouteGuard from './shared/components/RouteGuard';
import { QueryProvider } from './shared/providers/QueryProvider';
import type { RouteConfig } from './types/route';
import { blogRoutes } from './features/blog/routes/BlogRoutes';

const routes: RouteConfig[] = [
  {
    path: '/',
    exact: true,
    component: Home,
  },
  ...blogRoutes.map(route => ({
    ...route,
    path: `/blog${route.path ? `/${route.path}` : ''}`
  }))
];

const App: React.FC = () => (
  <QueryProvider>
    <Router>
      <div className="min-h-screen">
        <Suspense fallback={
          <div className="flex items-center justify-center min-h-screen">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-black/30 dark:border-white/30 border-t-current rounded-full animate-spin" />
              <div className="text-lg font-medium">
                Loading...
              </div>
            </div>
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
      </div>
    </Router>
  </QueryProvider>
);

export default App;