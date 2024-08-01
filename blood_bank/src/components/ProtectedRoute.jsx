import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component, userType, requiredType, isAdmin = false, ...rest }) => {
  const isLoggedIn = localStorage.getItem('login') === 'true';
  const storedUserType = localStorage.getItem('userType');
  const storedIsAdmin = localStorage.getItem('isAdmin') === 'true';

  if (isLoggedIn && storedUserType === requiredType && (!isAdmin || storedIsAdmin)) {
    return <Component {...rest} />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
