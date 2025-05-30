import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { AccountSummary } from '../components/dashboard/AccountSummary';
import { RecentTransactions } from '../components/dashboard/RecentTransactions';
import { ArrowRight, Shield, Lock, Bell } from 'lucide-react';

export const HomePage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div className="bg-primary-600 -mx-8 -mt-8 px-8 py-12">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-semibold text-white">Welcome back, {user?.firstName}!</h1>
          <p className="mt-2 text-primary-100">Manage your finances with confidence</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto -mt-6">
        <AccountSummary />
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-white hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary-50 rounded-lg">
                <Shield className="h-5 w-5 text-primary-600" />
              </div>
              <CardTitle>Security Center</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-neutral-600 mb-4">
              Keep your account safe with our security features
            </p>
            <Link to="/settings">
              <Button variant="outline" className="w-full group">
                Review Security Settings
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="bg-white hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-success-50 rounded-lg">
                <Lock className="h-5 w-5 text-success-600" />
              </div>
              <CardTitle>Account Protection</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-neutral-600 mb-4">
              Enable two-factor authentication for extra security
            </p>
            <Link to="/settings">
              <Button variant="outline" className="w-full group">
                Enable 2FA
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="bg-white hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-warning-50 rounded-lg">
                <Bell className="h-5 w-5 text-warning-600" />
              </div>
              <CardTitle>Notifications</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-neutral-600 mb-4">
              Stay informed about your account activity
            </p>
            <Link to="/settings">
              <Button variant="outline" className="w-full group">
                Manage Alerts
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <div className="max-w-7xl mx-auto">
        <RecentTransactions />
      </div>

      <div className="max-w-7xl mx-auto border-t border-neutral-200 mt-8 pt-6">
        <p className="text-center text-sm text-neutral-500">
          © {new Date().getFullYear()} SecureBank. All rights reserved.
        </p>
      </div>
    </div>
  );
};