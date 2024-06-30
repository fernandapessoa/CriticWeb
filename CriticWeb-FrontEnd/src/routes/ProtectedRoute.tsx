import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute: React.FC = () => {
  const token = localStorage.getItem('authToken');
  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
