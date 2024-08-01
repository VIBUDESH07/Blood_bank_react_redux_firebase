import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component, userType, requiredType, isAdmin = false, public: isPublic = false, ...rest }) => {
  const isLoggedIn = localStorage.getItem('login') === 'true';
  const storedUserType = localStorage.getItem('userType');
  const storedIsAdmin = localStorage.getItem('isAdmin') === 'true';

  if (isPublic) {
    // If the route is public, render the component without any checks
    return <Component {...rest} />;
  }

  if (isLoggedIn && storedUserType === requiredType && (!isAdmin || storedIsAdmin)) {
    // If logged in and authorized, render the component
    return <Component {...rest} />;
  } else {
    // Redirect to login if not authorized
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
