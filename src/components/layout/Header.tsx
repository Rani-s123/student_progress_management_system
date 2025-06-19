import React from 'react';
import { Moon, Sun, Settings, Bell, User } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { Button } from '../ui/Button';

interface HeaderProps {
  title: string;
}

export const Header: React.FC<HeaderProps> = ({ title }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {title}
            </h1>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="p-2"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
            
            <Button variant="ghost" size="sm" className="p-2">
              <Bell className="h-5 w-5" />
            </Button>
            
            <Button variant="ghost" size="sm" className="p-2">
              <Settings className="h-5 w-5" />
            </Button>
            
            <Button variant="ghost" size="sm" className="p-2">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};