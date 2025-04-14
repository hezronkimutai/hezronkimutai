import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface RouteGuardProps {
  children: React.ReactNode;
  requiredRoles?: string[];
}

const RouteGuard: React.FC<RouteGuardProps> = ({ children, requiredRoles = [] }) => {
  const location = useLocation();
  
  // Check authentication
  const isAuthenticated = Boolean(localStorage.getItem('token'));

  // Parse user roles with error handling
  let userRoles: string[] = [];
  try {
    userRoles = JSON.parse(localStorage.getItem('userRoles') || '[]');
    if (!Array.isArray(userRoles)) {
      userRoles = [];
    }
  } catch (error) {
    userRoles = [];
  }
  
  // Check role requirements
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