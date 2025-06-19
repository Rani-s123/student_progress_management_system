import React, { useState } from 'react';
import { Save, RefreshCw, Mail, Clock, Database, Shield, Bell, Globe } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Badge } from '../ui/Badge';

interface SettingsConfig {
  sync: {
    frequency: 'daily' | 'weekly' | 'custom';
    time: string;
    timezone: string;
    autoSync: boolean;
  };
  email: {
    smtpHost: string;
    smtpPort: number;
    username: string;
    password: string;
    fromEmail: string;
    inactivityThreshold: number;
    maxReminders: number;
  };
  system: {
    theme: 'light' | 'dark' | 'auto';
    language: string;
    dateFormat: string;
    enableNotifications: boolean;
  };
  api: {
    codeforcesApiKey: string;
    rateLimitPerMinute: number;
    timeoutSeconds: number;
  };
}

export const SettingsPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'sync' | 'email' | 'system' | 'api'>('sync');
  const [settings, setSettings] = useState<SettingsConfig>({
    sync: {
      frequency: 'daily',
      time: '02:00',
      timezone: 'UTC',
      autoSync: true,
    },
    email: {
      smtpHost: 'smtp.gmail.com',
      smtpPort: 587,
      username: '',
      password: '',
      fromEmail: '',
      inactivityThreshold: 7,
      maxReminders: 3,
    },
    system: {
      theme: 'light',
      language: 'en',
      dateFormat: 'MM/dd/yyyy',
      enableNotifications: true,
    },
    api: {
      codeforcesApiKey: '',
      rateLimitPerMinute: 60,
      timeoutSeconds: 30,
    },
  });

  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSaving(false);
    // Show success message
  };

  const updateSettings = (section: keyof SettingsConfig, field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const tabs = [
    { id: 'sync', label: 'Sync Settings', icon: RefreshCw },
    { id: 'email', label: 'Email Config', icon: Mail },
    { id: 'system', label: 'System', icon: Globe },
    { id: 'api', label: 'API Settings', icon: Database },
  ] as const;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Settings
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Configure system preferences and integrations
          </p>
        </div>
        <Button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center space-x-2"
        >
          <Save className={`h-4 w-4 ${saving ? 'animate-spin' : ''}`} />
          <span>{saving ? 'Saving...' : 'Save Changes'}</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-0">
              <nav className="space-y-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 text-left transition-colors duration-200 ${
                        activeTab === tab.id
                          ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                          : 'text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-700'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          {activeTab === 'sync' && (
            <Card>
              <CardHeader>
                <CardTitle>Sync Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Sync Frequency
                    </label>
                    <select
                      value={settings.sync.frequency}
                      onChange={(e) => updateSettings('sync', 'frequency', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100"
                    >
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="custom">Custom</option>
                    </select>
                  </div>

                  <Input
                    label="Sync Time"
                    type="time"
                    value={settings.sync.time}
                    onChange={(e) => updateSettings('sync', 'time', e.target.value)}
                  />

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Timezone
                    </label>
                    <select
                      value={settings.sync.timezone}
                      onChange={(e) => updateSettings('sync', 'timezone', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100"
                    >
                      <option value="UTC">UTC</option>
                      <option value="America/New_York">Eastern Time</option>
                      <option value="America/Chicago">Central Time</option>
                      <option value="America/Denver">Mountain Time</option>
                      <option value="America/Los_Angeles">Pacific Time</option>
                    </select>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="autoSync"
                      checked={settings.sync.autoSync}
                      onChange={(e) => updateSettings('sync', 'autoSync', e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor="autoSync" className="text-sm text-gray-700 dark:text-gray-300">
                      Enable automatic sync
                    </label>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
                    Current Sync Status
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-blue-700 dark:text-blue-300">Next Sync:</span>
                      <Badge variant="info">Tomorrow at 02:00 UTC</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-700 dark:text-blue-300">Last Sync:</span>
                      <span className="text-blue-900 dark:text-blue-100">Today at 02:00 UTC</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'email' && (
            <Card>
              <CardHeader>
                <CardTitle>Email Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="SMTP Host"
                    value={settings.email.smtpHost}
                    onChange={(e) => updateSettings('email', 'smtpHost', e.target.value)}
                    placeholder="smtp.gmail.com"
                  />

                  <Input
                    label="SMTP Port"
                    type="number"
                    value={settings.email.smtpPort}
                    onChange={(e) => updateSettings('email', 'smtpPort', parseInt(e.target.value))}
                    placeholder="587"
                  />

                  <Input
                    label="Username"
                    value={settings.email.username}
                    onChange={(e) => updateSettings('email', 'username', e.target.value)}
                    placeholder="your-email@gmail.com"
                  />

                  <Input
                    label="Password"
                    type="password"
                    value={settings.email.password}
                    onChange={(e) => updateSettings('email', 'password', e.target.value)}
                    placeholder="App password"
                  />

                  <Input
                    label="From Email"
                    value={settings.email.fromEmail}
                    onChange={(e) => updateSettings('email', 'fromEmail', e.target.value)}
                    placeholder="noreply@yourapp.com"
                  />

                  <Input
                    label="Inactivity Threshold (days)"
                    type="number"
                    value={settings.email.inactivityThreshold}
                    onChange={(e) => updateSettings('email', 'inactivityThreshold', parseInt(e.target.value))}
                    min="1"
                  />

                  <Input
                    label="Max Reminders"
                    type="number"
                    value={settings.email.maxReminders}
                    onChange={(e) => updateSettings('email', 'maxReminders', parseInt(e.target.value))}
                    min="1"
                    max="10"
                  />
                </div>

                <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <h4 className="font-medium text-yellow-900 dark:text-yellow-100 mb-2">
                    Email Reminder Settings
                  </h4>
                  <p className="text-sm text-yellow-700 dark:text-yellow-300">
                    Students will receive email reminders after {settings.email.inactivityThreshold} days of inactivity.
                    Maximum of {settings.email.maxReminders} reminders will be sent per student.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'system' && (
            <Card>
              <CardHeader>
                <CardTitle>System Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Theme
                    </label>
                    <select
                      value={settings.system.theme}
                      onChange={(e) => updateSettings('system', 'theme', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100"
                    >
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                      <option value="auto">Auto</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Language
                    </label>
                    <select
                      value={settings.system.language}
                      onChange={(e) => updateSettings('system', 'language', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100"
                    >
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                      <option value="de">German</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Date Format
                    </label>
                    <select
                      value={settings.system.dateFormat}
                      onChange={(e) => updateSettings('system', 'dateFormat', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100"
                    >
                      <option value="MM/dd/yyyy">MM/DD/YYYY</option>
                      <option value="dd/MM/yyyy">DD/MM/YYYY</option>
                      <option value="yyyy-MM-dd">YYYY-MM-DD</option>
                    </select>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="notifications"
                      checked={settings.system.enableNotifications}
                      onChange={(e) => updateSettings('system', 'enableNotifications', e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor="notifications" className="text-sm text-gray-700 dark:text-gray-300">
                      Enable notifications
                    </label>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'api' && (
            <Card>
              <CardHeader>
                <CardTitle>API Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Codeforces API Key (Optional)"
                    value={settings.api.codeforcesApiKey}
                    onChange={(e) => updateSettings('api', 'codeforcesApiKey', e.target.value)}
                    placeholder="Enter API key for higher rate limits"
                  />

                  <Input
                    label="Rate Limit (requests/minute)"
                    type="number"
                    value={settings.api.rateLimitPerMinute}
                    onChange={(e) => updateSettings('api', 'rateLimitPerMinute', parseInt(e.target.value))}
                    min="1"
                    max="300"
                  />

                  <Input
                    label="Request Timeout (seconds)"
                    type="number"
                    value={settings.api.timeoutSeconds}
                    onChange={(e) => updateSettings('api', 'timeoutSeconds', parseInt(e.target.value))}
                    min="5"
                    max="120"
                  />
                </div>

                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <h4 className="font-medium text-green-900 dark:text-green-100 mb-2">
                    API Status
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-green-700 dark:text-green-300">Codeforces API:</span>
                      <Badge variant="success">Connected</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-green-700 dark:text-green-300">Rate Limit:</span>
                      <span className="text-green-900 dark:text-green-100">45/60 requests used</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-green-700 dark:text-green-300">Last Request:</span>
                      <span className="text-green-900 dark:text-green-100">2 minutes ago</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};