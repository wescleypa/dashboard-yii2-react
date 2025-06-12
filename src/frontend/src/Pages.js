import React from 'react';
import ClientsPage from './pages/Clients';
import ProductsPage from './pages/Products';
import ReportsPage from './pages/Reports';
import DashboardPage from './pages/Dashboard';
import { useUser } from './providers/user.provider';
import LoginPage from './pages/Login';

function Pages({ page, setPage }) {
  const { isAuthenticated } = useUser();

  return (
    <div>
      {page === 'clientes' && !!isAuthenticated && (<ClientsPage setPage={setPage} />)}
      {page === 'produtos' && !!isAuthenticated && (<ProductsPage setPage={setPage} />)}
      {page === 'relatorios' && !!isAuthenticated && (<ReportsPage setPage={setPage} />)}
      {(page === 'dashboard' || !page) && !!isAuthenticated && (<DashboardPage />)}
      {(page === 'login' || !isAuthenticated) && (<LoginPage />)}
    </div>
  );
}

export default Pages;