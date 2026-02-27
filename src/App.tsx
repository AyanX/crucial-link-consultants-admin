import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import { DashboardProvider } from './context/DashboardContext';
import Sidebar from './components/Sidebar/Sidebar';
import Topbar from './components/Topbar/Topbar';
import SiteContentPage from './components/pages/SiteContentPage';
import SettingsPage from './components/pages/SettingsPage';
import TeamPage from './components/pages/TeamPage/TeamPage';
import MessagesPage from './components/pages/MessagesPage';
import DashboardPage from './components/pages/DashboardPage';
import { useMetrics } from './hooks/useMetrics';
import LoginPage from './components/pages/LoginPage/LoginPage';
import { AuthProvider, useAuth } from './context/AuthContext';



// ── Auth guard and main layout
const ProtectedLayout: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();
   const [sidebarOpen, setSidebarOpen] = useState(false);

  useMetrics();
  if (isLoading) {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center',
        justifyContent: 'center', background: '#f4f6f9',
      }}>
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
          <div style={{
            width: 40, height: 40, border: '3px solid #e2e8f0',
            borderTopColor: '#22c55e', borderRadius: '50%',
            animation: 'spin 0.7s linear infinite',
          }} />
          <span style={{ fontSize: 13, color: '#94a3b8', fontFamily: 'DM Sans, sans-serif' }}>
            Loading…
          </span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return (
    <ToastProvider>
      <DashboardProvider>
        <div className="app-layout">
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          <div className="main-content">
            <Topbar onMenuToggle={() => setSidebarOpen(o => !o)} />
            <Routes>
              <Route path="/"             element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard"    element={<DashboardPage />} />
              <Route path="/site-content" element={<SiteContentPage />} />
              <Route path="/messages"     element={<MessagesPage />} />
              <Route path="/team"         element={<TeamPage />} />
              <Route path="/settings"     element={<SettingsPage />} />
            </Routes>
            <footer className="site-footer">
              Crucial Link Consultants © 2024 • Enterprise Statistics Engine V4.2.1
            </footer>
          </div>
        </div>
      </DashboardProvider>
    </ToastProvider>
  );
};


const App: React.FC = () => {
  return   <AuthProvider>
    <ToastProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/*"     element={<ProtectedLayout />} />
      </Routes>
    </ToastProvider>
  </AuthProvider>
}



export default App;