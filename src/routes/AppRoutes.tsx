import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import UseCasesPage from '../pages/UseCasesPage';
import DAppDirectoryPage from '../pages/DAppDirectoryPage';
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import SmartContractPage from '../pages/SmartContractPage';
import TransactionExplorerPage from '../pages/TransactionExplorerPage';
import NotFoundPage from '../pages/NotFoundPage';
import ProtectedRoute from './ProtectedRoute';
import { useAuth } from '../contexts/AuthContext';

const AppRoutes: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/use-cases" element={<UseCasesPage />} />
      <Route path="/dapps" element={<DAppDirectoryPage />} />
      <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to="/" />} />
      <Route path="/register" element={!isAuthenticated ? <RegisterPage /> : <Navigate to="/" />} />
      
      {/* Protected routes */}
      <Route path="/smart-contracts" element={
        <ProtectedRoute>
          <SmartContractPage />
        </ProtectedRoute>
      } />
      <Route path="/explorer" element={
        <ProtectedRoute>
          <TransactionExplorerPage />
        </ProtectedRoute>
      } />
      
      {/* 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;