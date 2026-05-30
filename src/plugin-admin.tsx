import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import './plugin-globals.css';
import AdminPage from './app/admin/page';

function AdminApp() {
  return (
    <HashRouter>
      <AdminPage />
    </HashRouter>
  );
}

const container = document.getElementById('wesix-admin-root');
if (container) {
  createRoot(container).render(<AdminApp />);
}
