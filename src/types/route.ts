import { ComponentType } from 'react';

export interface RouteConfig {
  path: string;
  exact: boolean;
  component: ComponentType<any>;
  meta?: {
    requiresAuth?: boolean;
    roles?: string[];
  };
}