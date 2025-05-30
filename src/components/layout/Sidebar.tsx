import React, { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Home, 
  CreditCard, 
  LayoutDashboard, 
  Settings, 
  Bell, 
  X,
  PiggyBank,
  User,
  BarChart4,
  HelpCircle
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { useAuth } from '../../contexts/AuthContext';

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ open, setOpen }) => {
  const { user } = useAuth();
  const location = useLocation();

  // Close sidebar on route change on mobile
  useEffect(() => {
    if (open && window.innerWidth < 1024) {
      setOpen(false);
    }
  }, [location.pathname, setOpen, open]);

  const navigation = [
    { name: 'Home', icon: Home, href: '/home' },
    { name: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
    { name: 'Accounts', icon: CreditCard, href: '/accounts' },
    { name: 'Analytics', icon: BarChart4, href: '/analytics' },
    { name: 'Goals', icon: PiggyBank, href: '/goals' },
    { name: 'Notifications', icon: Bell, href: '/notifications' },
    { name: 'Profile', icon: User, href: '/profile' },
    { name: 'Settings', icon: Settings, href: '/settings' },
    { name: 'Help', icon: HelpCircle, href: '/help' },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-20 bg-neutral-900 bg-opacity-50 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          'fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-neutral-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-auto',
          open ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between h-16 px-6 border-b border-neutral-200">
            <div className="flex items-center">
              <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary-500 text-white mr-2">
                <CreditCard className="w-4 h-4" />
              </div>
              <span className="text-lg font-semibold">SecureBank</span>
            </div>
            <button
              type="button"
              className="text-neutral-500 lg:hidden"
              onClick={() => setOpen(false)}
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-4">
            <div className="px-4 mb-6">
              <div className="bg-neutral-50 rounded-lg p-4">
                <div className="flex items-center">
                  <img
                    src={user?.avatar || 'https://randomuser.me/api/portraits/men/32.jpg'}
                    alt="User Avatar"
                    className="h-10 w-10 rounded-full object-cover border border-neutral-200"
                  />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-neutral-900">
                      {user?.firstName} {user?.lastName}
                    </p>
                    <p className="text-xs text-neutral-500">{user?.email}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-3 space-y-1">
              <p className="text-xs font-semibold text-neutral-500 px-3 mb-2">MENU</p>
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center px-3 py-2 text-sm rounded-md font-medium transition-colors',
                      isActive
                        ? 'bg-primary-50 text-primary-600'
                        : 'text-neutral-700 hover:text-primary-500 hover:bg-neutral-50'
                    )
                  }
                >
                  <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                  {item.name}
                </NavLink>
              ))}
            </div>
          </div>

          <div className="p-4 border-t border-neutral-200">
            <div className="bg-primary-50 rounded-lg p-4">
              <p className="text-sm font-medium text-primary-800">Need Help?</p>
              <p className="text-xs text-primary-600 mt-1">
                Contact our support team for assistance
              </p>
              <button 
                className="mt-2 text-xs font-medium text-primary-700 hover:text-primary-800"
              >
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};