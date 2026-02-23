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

const App: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

export default App;