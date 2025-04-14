import { ComponentType } from 'react';

export interface RouteConfig {
  path: string;
  exact: boolean;
  component: ComponentType;
  meta?: {
    requiresAuth?: boolean;
    roles?: string[];
  };
}