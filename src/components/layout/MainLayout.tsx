import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { cn } from '../../lib/utils';
import { BankingProvider } from '../../contexts/BankingContext';

export const MainLayout: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-500 border-t-transparent"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <BankingProvider>
      <div className="min-h-screen bg-neutral-50">
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
        <div
          className={cn(
            'flex flex-col lg:pl-64 transition-all duration-300 ease-in-out',
            sidebarOpen && 'md:pl-64'
          )}
        >
          <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
          <main className="flex-1 p-6 lg:p-8">
            <div className="mx-auto max-w-7xl">
              <Outlet />
            </div>
          </main>
          <footer className="bg-white border-t border-neutral-200 py-4 px-6">
            <div className="mx-auto max-w-7xl">
              <div className="text-center text-sm text-neutral-500">
                &copy; {new Date().getFullYear()} SecureBank. All rights reserved.
              </div>
            </div>
          </footer>
        </div>
      </div>
    </BankingProvider>
  );
};