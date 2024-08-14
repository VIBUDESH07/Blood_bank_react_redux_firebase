import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component, requiredType, isAdmin, publicRoute = false }) => {
  const isLoggedIn = localStorage.getItem('login') === 'true';
  const userType = localStorage.getItem('userType');
  const userIsAdmin = localStorage.getItem('isAdmin') === 'true';

  // For public routes, allow access even if not logged in
  if (publicRoute) {
    return <Component />;
  }

  // If not logged in, redirect to login
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // If the user type does not match the required type, or admin status is required and the user is not an admin
  if ((requiredType && userType !== requiredType) || (isAdmin && !userIsAdmin)) {
    return <Navigate to="/home" replace />;
  }

  // If the user meets the requirements, render the component
  return <Component />;
};

export default ProtectedRoute;
