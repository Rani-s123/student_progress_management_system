import React from 'react';
import { RefreshCw, Clock, CheckCircle, AlertCircle, Play, Pause } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { format } from 'date-fns';

interface SyncStatusProps {
  lastSync: Date;
  nextSync: Date;
  status: 'idle' | 'syncing' | 'error';
  totalStudents: number;
  activeStudents: number;
  onManualSync: () => void;
}

export const SyncStatus: React.FC<SyncStatusProps> = ({
  lastSync,
  nextSync,
  status,
  totalStudents,
  activeStudents,
  onManualSync,
}) => {
  const getStatusIcon = () => {
    switch (status) {
      case 'syncing':
        return <RefreshCw className="h-5 w-5 animate-spin text-blue-600" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-600" />;
      default:
        return <CheckCircle className="h-5 w-5 text-green-600" />;
    }
  };

  const getStatusBadge = () => {
    switch (status) {
      case 'syncing':
        return <Badge variant="info">Syncing</Badge>;
      case 'error':
        return <Badge variant="error">Error</Badge>;
      default:
        return <Badge variant="success">Ready</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              {getStatusIcon()}
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Sync Status</p>
              {getStatusBadge()}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Active Students</p>
              <p className="text-xl font-bold text-gray-900 dark:text-gray-100">
                {activeStudents} / {totalStudents}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center space-x-3">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
              <Clock className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Next Sync</p>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {format(nextSync, 'MMM dd, HH:mm')}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sync Control */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Sync Control</CardTitle>
            <Button
              onClick={onManualSync}
              disabled={status === 'syncing'}
              className="flex items-center space-x-2"
            >
              <RefreshCw className={`h-4 w-4 ${status === 'syncing' ? 'animate-spin' : ''}`} />
              <span>{status === 'syncing' ? 'Syncing...' : 'Manual Sync'}</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div>
                <p className="font-medium text-gray-900 dark:text-gray-100">
                  Last Sync
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {format(lastSync, 'MMM dd, yyyy HH:mm:ss')}
                </p>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-900 dark:text-gray-100">
                  Next Sync
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {format(nextSync, 'MMM dd, yyyy HH:mm:ss')}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
                  Sync Configuration
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Frequency:</span>
                    <span className="text-gray-900 dark:text-gray-100">Daily</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Time:</span>
                    <span className="text-gray-900 dark:text-gray-100">02:00 AM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Timezone:</span>
                    <span className="text-gray-900 dark:text-gray-100">UTC</span>
                  </div>
                </div>
              </div>

              <div className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
                  Recent Activity
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-gray-600 dark:text-gray-400">
                      {totalStudents} students synced
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-gray-600 dark:text-gray-400">
                      Contest data updated
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-gray-600 dark:text-gray-400">
                      Problem stats calculated
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};