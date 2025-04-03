import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';  

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');

  
  if (!token) {
    return <Navigate to="/login" />;
  }

  // Decodifica 
  const decoded = jwtDecode(token);
  const userRoles = decoded.roles;

  // Si el rol del usuario no está permitido, redirige a la página de acceso denegado
  if (!allowedRoles.some(role => userRoles.includes(role))) {
    return <Navigate to="/access-denied" />;
  }

  return children;
};

export default ProtectedRoute;
