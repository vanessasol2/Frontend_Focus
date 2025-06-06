import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" />;
  }

  const decoded = jwtDecode(token);
  const userRoles = decoded.roles;

  if (!allowedRoles.some(role => userRoles.includes(role))) {
    return <Navigate to="/access-denied" />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default ProtectedRoute;