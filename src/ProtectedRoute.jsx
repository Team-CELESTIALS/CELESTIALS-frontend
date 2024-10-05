// src/components/ProtectedRoute.jsx
import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element, isAdmin, ...rest }) => {
  return (
    <Route
      {...rest}
      element={isAdmin ? element : <Navigate to="/" />} // Redirect to home if not admin
    />
  );
};

export default ProtectedRoute;
