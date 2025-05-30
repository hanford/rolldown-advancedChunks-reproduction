import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { formatDate } from "../utils/formatDate";
import { maskAccountNumber } from "../utils/maskAccountNumber";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import {
  User,
  Shield,
  Bell,
  Lock,
  Eye,
  EyeOff,
  Smartphone,
  Mail,
} from "lucide-react";

export default function Settings() {
  const { user } = useAuth();
  const [showAccountNumbers, setShowAccountNumbers] = React.useState(false);

  // Sample data to demonstrate helper functions
  const lastPasswordChange = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000); // 30 days ago
  const lastLogin = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000); // 2 days ago
  const linkedAccounts = [
    { id: "1", name: "Primary Checking", number: "1234567890123456" },
    { id: "2", name: "Savings Account", number: "9876543210987654" },
    { id: "3", name: "Credit Card", number: "4567890123456789" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-neutral-900">
          Account Settings
        </h1>
        <p className="text-neutral-500">
          Manage your account preferences and security settings
        </p>
      </div>

      {/* Profile Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary-50 rounded-lg">
              <User className="h-5 w-5 text-primary-600" />
            </div>
            <CardTitle>Profile Information</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-neutral-600">
                Full Name
              </label>
              <p className="text-neutral-900">
                {user?.firstName} {user?.lastName}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-neutral-600">
                Email
              </label>
              <p className="text-neutral-900">{user?.email}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-neutral-600">
                Last Login
              </label>
              <p className="text-neutral-900">
                {formatDate(lastLogin, "relative")}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-neutral-600">
                Member Since
              </label>
              <p className="text-neutral-900">
                {formatDate("2020-03-15", "long")}
              </p>
            </div>
          </div>
          <Button variant="outline">Edit Profile</Button>
        </CardContent>
      </Card>

      {/* Security Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-error-50 rounded-lg">
              <Shield className="h-5 w-5 text-error-600" />
            </div>
            <CardTitle>Security Settings</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Lock className="h-5 w-5 text-neutral-600" />
              <div>
                <p className="font-medium text-neutral-900">Password</p>
                <p className="text-sm text-neutral-500">
                  Last changed: {formatDate(lastPasswordChange, "relative")}
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Change
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Smartphone className="h-5 w-5 text-neutral-600" />
              <div>
                <p className="font-medium text-neutral-900">
                  Two-Factor Authentication
                </p>
                <p className="text-sm text-neutral-500">
                  Add an extra layer of security
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Enable
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Linked Accounts */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-success-50 rounded-lg">
                <Mail className="h-5 w-5 text-success-600" />
              </div>
              <CardTitle>Linked Accounts</CardTitle>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAccountNumbers(!showAccountNumbers)}
            >
              {showAccountNumbers ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
              {showAccountNumbers ? "Hide" : "Show"} Numbers
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {linkedAccounts.map((account) => (
              <div
                key={account.id}
                className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg"
              >
                <div>
                  <p className="font-medium text-neutral-900">{account.name}</p>
                  <p className="text-sm text-neutral-500">
                    {showAccountNumbers
                      ? account.number
                      : maskAccountNumber(account.number)}
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Manage
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-warning-50 rounded-lg">
              <Bell className="h-5 w-5 text-warning-600" />
            </div>
            <CardTitle>Notification Preferences</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-neutral-900">Transaction Alerts</p>
              <p className="text-sm text-neutral-500">
                Get notified of account activity
              </p>
            </div>
            <Button variant="outline" size="sm">
              Configure
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-neutral-900">Security Alerts</p>
              <p className="text-sm text-neutral-500">
                Important security notifications
              </p>
            </div>
            <Button variant="outline" size="sm">
              Configure
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
