import { lazy } from 'react';
import { RouteConfig } from '../../../types/route';

const BlogList = lazy(() => import('../components/BlogList'));
const BlogPost = lazy(() => import('../components/BlogPost'));
const BlogSearch = lazy(() => import('../components/BlogSearch'));
const BlogCategory = lazy(() => import('../components/BlogCategory'));

export const blogRoutes: RouteConfig[] = [
  {
    path: '/blog',
    exact: true,
    component: BlogList,
  },
  {
    path: '/blog/:slug',
    exact: true,
    component: BlogPost,
  },
  {
    path: '/blog/search',
    exact: true,
    component: BlogSearch,
    meta: {
      requiresAuth: true,
      roles: ['user', 'admin']
    }
  },
  {
    path: '/blog/category/:category',
    exact: true,
    component: BlogCategory,
  },
];