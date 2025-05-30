import React from "react";
import { Link } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { AccountSummary } from "../components/dashboard/AccountSummary";
import { RecentTransactions } from "../components/dashboard/RecentTransactions";
import { ArrowRight, Shield, Lock, Bell } from "lucide-react";
import { formatCurrency } from "../utils/formatCurrency";
import { formatDate } from "../utils/formatDate";

export default function Home() {
  const { user } = useAuth();

  // Sample data to demonstrate helper functions
  const lastLoginDate = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000); // 2 days ago
  const monthlySpending = 2847.63;
  const savingsGoal = 5000;

  return (
    <div className="space-y-6">
      <div className="bg-primary-600 -mx-8 -mt-8 px-8 py-12">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-semibold text-white">
            Welcome back, {user?.firstName}!
          </h1>
          <p className="mt-2 text-primary-100">
            Last login: {formatDate(lastLoginDate, "relative")} • Monthly
            spending: {formatCurrency(monthlySpending)}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto -mt-6">
        <AccountSummary />
      </div>

      {/* Quick Stats Card */}
      <div className="max-w-7xl mx-auto">
        <Card className="bg-gradient-to-r from-accent-50 to-warning-50 border-accent-200">
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-accent-800">
                  Savings Goal Progress
                </h3>
                <p className="text-accent-600">
                  You've saved {formatCurrency(savingsGoal * 0.73)} of your{" "}
                  {formatCurrency(savingsGoal)} goal
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-accent-700">73%</div>
                <div className="w-24 bg-accent-200 rounded-full h-2 mt-2">
                  <div className="bg-accent-500 h-2 rounded-full w-3/4"></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
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
}
