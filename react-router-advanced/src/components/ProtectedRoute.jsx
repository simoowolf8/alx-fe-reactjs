// src/components/ProtectedRoute.jsx
import React from "react";
import { Route, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ProtectedRoute = ({ element, ...rest }) => {
  const { isAuthenticated } = useAuth(); // Use the authentication hook

  return (
    <Route
      {...rest}
      element={isAuthenticated ? element : <Navigate to="/" />}
    />
  );
};

export default ProtectedRoute;
