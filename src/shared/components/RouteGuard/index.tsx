import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface RouteGuardProps {
  children: React.ReactNode;
  requiredRoles?: string[];
}

const RouteGuard: React.FC<RouteGuardProps> = ({ children, requiredRoles = [] }) => {
  const location = useLocation();
  
  // TODO: Replace with actual auth logic
  const isAuthenticated = Boolean(localStorage.getItem('token'));
  const userRoles: string[] = JSON.parse(localStorage.getItem('userRoles') || '[]');
  
  const hasRequiredRoles = requiredRoles.length === 0 || 
    requiredRoles.some(role => userRoles.includes(role));

  if (!isAuthenticated) {
    // Redirect to login while saving the attempted location
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!hasRequiredRoles) {
    // Redirect to home page if user doesn't have required roles
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default RouteGuard;