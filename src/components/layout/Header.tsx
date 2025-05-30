import React from 'react';
import { Bell, Menu, X, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useBanking } from '../../contexts/BankingContext';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';

interface HeaderProps {
  toggleSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const { user, logout } = useAuth();
  const { unreadNotificationsCount } = useBanking();
  const [showProfileMenu, setShowProfileMenu] = React.useState(false);

  return (
    <header className="sticky top-0 z-10 bg-white border-b border-neutral-200 shadow-sm">
      <div className="px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button
              type="button"
              className="text-neutral-500 lg:hidden"
              onClick={toggleSidebar}
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className="ml-4 lg:ml-0">
              <h1 className="text-xl font-semibold text-primary-500">SecureBank</h1>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/settings" className="text-neutral-500 hover:text-neutral-700">
              <Settings className="h-5 w-5" />
            </Link>
            <div className="relative">
              <Link to="/notifications" className="text-neutral-500 hover:text-neutral-700">
                <Bell className="h-5 w-5" />
                {unreadNotificationsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-error-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    {unreadNotificationsCount}
                  </span>
                )}
              </Link>
            </div>
            <div className="relative">
              <button
                type="button"
                className="flex items-center"
                onClick={() => setShowProfileMenu(!showProfileMenu)}
              >
                <img
                  src={user?.avatar || 'https://randomuser.me/api/portraits/men/32.jpg'}
                  alt="User Avatar"
                  className="h-8 w-8 rounded-full object-cover border border-neutral-200"
                />
                <span className="hidden md:block ml-2 text-sm font-medium text-neutral-700">
                  {user?.firstName} {user?.lastName}
                </span>
              </button>
              
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="px-4 py-2 border-b border-neutral-100">
                    <p className="text-sm font-medium text-neutral-900">{user?.firstName} {user?.lastName}</p>
                    <p className="text-xs text-neutral-500 truncate">{user?.email}</p>
                  </div>
                  <Link
                    to="/settings"
                    className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                    onClick={() => setShowProfileMenu(false)}
                  >
                    Settings
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setShowProfileMenu(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};