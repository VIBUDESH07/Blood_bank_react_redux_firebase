import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component, userType, requiredType, ...rest }) => {
  const isLoggedIn = localStorage.getItem('login') === 'true';
  const storedUserType = localStorage.getItem('userType');

  if (isLoggedIn && storedUserType === requiredType) {
    return <Component {...rest} />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
