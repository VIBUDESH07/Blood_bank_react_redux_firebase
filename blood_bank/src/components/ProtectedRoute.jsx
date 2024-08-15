import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component, requiredType, publicRoute = false }) => {
  const isLoggedIn = localStorage.getItem('login') === 'true';
  const userType = localStorage.getItem('userType');

  // For public routes, allow access even if not logged in
  if (publicRoute) {
    return <Component />;
  }

  // If not logged in, redirect to login
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // If the user type does not match the required type, redirect to home
  if (requiredType && userType !== requiredType) {
    return <Navigate to="/home" replace />;
  }

  // If the user meets the requirements, render the component
  return <Component />;
};

export default ProtectedRoute;
