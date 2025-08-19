import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Header } from '@/components/admin/Header';
import { Sidebar } from '@/components/admin/Sidebar';
import { Dashboard } from '@/components/admin/Dashboard';
import { TabContent } from '@/components/admin/TabContent';
import { menuItems } from '@/config/menuConfig';
import FormGeneratorExample from '@/examples/FormGeneratorExample';
import ProgramManagerManagement from '@/components/admin/Manage/ProgramManager';
import ISOIndexManagement from '@/components/admin/Manage/ISO';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

const AdminPortal: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    navigate('/login', { replace: true });
  };

  const handleProfile = () => {
    toast({
      title: "Profile",
      description: "Opening user profile settings...",
    });
  };

  const handleSettings = () => {
    toast({
      title: "Settings",
      description: "Opening application settings...",
    });
  };

  // Generate routes for all menu items
  const generateRoutes = (items: typeof menuItems): JSX.Element[] => {
    const routes: JSX.Element[] = [];
    
    items.forEach(item => {
      if (item.children) {
        item.children.forEach(child => {
          if (child.path && child.path !== '/manage/iso') { // Skip ISO route - handled explicitly
            routes.push(
              <Route
                key={child.path}
                path={child.path}
                element={<TabContent title={child.label} />}
              />
            );
          }
        });
      } else if (item.path) {
        if (item.id === 'dashboard') {
          routes.push(
            <Route
              key={item.path}
              path={item.path}
              element={<Dashboard />}
            />
          );
        } else {
          routes.push(
            <Route
              key={item.path}
              path={item.path}
              element={<TabContent title={item.label} />}
            />
          );
        }
      }
    });
    
    return routes;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header
        user={user}
        onLogout={handleLogout}
        onProfile={handleProfile}
        onSettings={handleSettings}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      <div className="flex">
        {/* Sidebar */}
        <Sidebar 
          menuItems={menuItems} 
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />

        {/* Main Content */}
        <main className={`flex-1 p-6 pt-6 min-h-[calc(100vh-4rem)] transition-all duration-300 ${
          isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-72'
        }`}>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/form-generator-example" element={<FormGeneratorExample />} />
            <Route path="/program-manager-management" element={<ProgramManagerManagement />} />
            <Route path="/manage/iso" element={<ISOIndexManagement />} />
            {generateRoutes(menuItems)}
            <Route path="*" element={
              <div className="flex items-center justify-center h-96">
                <div className="text-center">
                  <h2 className="text-2xl font-bold mb-2">Page Not Found</h2>
                  <p className="text-muted-foreground">The requested page could not be found.</p>
                </div>
              </div>
            } />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AdminPortal;
