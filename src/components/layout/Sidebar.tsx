import React from 'react';
import { Users, BarChart3, Settings, Activity, Calendar } from 'lucide-react';
import { clsx } from 'clsx';

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

const navigationItems = [
  { id: 'students', label: 'Students', icon: Users },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'sync', label: 'Sync Status', icon: Activity },
  { id: 'schedule', label: 'Schedule', icon: Calendar },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export const Sidebar: React.FC<SidebarProps> = ({ activeView, onViewChange }) => {
  return (
    <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 min-h-screen">
      <div className="p-6">
        <div className="flex items-center space-x-2 mb-8">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <BarChart3 className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900 dark:text-gray-100">
            CodeTracker
          </span>
        </div>
        
        <nav className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={clsx(
                  'w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors duration-200',
                  activeView === item.id
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                    : 'text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-700'
                )}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};