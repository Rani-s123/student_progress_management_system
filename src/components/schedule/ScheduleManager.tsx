import React, { useState } from 'react';
import { Calendar, Clock, Play, Pause, Plus, Edit2, Trash2, CheckCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { format, addDays, addHours } from 'date-fns';

interface ScheduleTask {
  id: string;
  name: string;
  type: 'sync' | 'email' | 'cleanup' | 'backup';
  frequency: 'daily' | 'weekly' | 'monthly' | 'custom';
  time: string;
  timezone: string;
  enabled: boolean;
  lastRun?: Date;
  nextRun: Date;
  status: 'idle' | 'running' | 'completed' | 'failed';
  description: string;
}

export const ScheduleManager: React.FC = () => {
  const [tasks, setTasks] = useState<ScheduleTask[]>([
    {
      id: '1',
      name: 'Daily Student Sync',
      type: 'sync',
      frequency: 'daily',
      time: '02:00',
      timezone: 'UTC',
      enabled: true,
      lastRun: new Date(),
      nextRun: addDays(new Date(), 1),
      status: 'completed',
      description: 'Sync all student data from Codeforces API',
    },
    {
      id: '2',
      name: 'Inactivity Email Reminders',
      type: 'email',
      frequency: 'daily',
      time: '09:00',
      timezone: 'UTC',
      enabled: true,
      lastRun: addHours(new Date(), -2),
      nextRun: addHours(new Date(), 22),
      status: 'idle',
      description: 'Send email reminders to inactive students',
    },
    {
      id: '3',
      name: 'Weekly Data Cleanup',
      type: 'cleanup',
      frequency: 'weekly',
      time: '01:00',
      timezone: 'UTC',
      enabled: false,
      nextRun: addDays(new Date(), 7),
      status: 'idle',
      description: 'Clean up old logs and temporary data',
    },
    {
      id: '4',
      name: 'Monthly Database Backup',
      type: 'backup',
      frequency: 'monthly',
      time: '00:00',
      timezone: 'UTC',
      enabled: true,
      lastRun: addDays(new Date(), -15),
      nextRun: addDays(new Date(), 15),
      status: 'idle',
      description: 'Create backup of all student and system data',
    },
  ]);

  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState<ScheduleTask | null>(null);

  const getStatusColor = (status: ScheduleTask['status']) => {
    switch (status) {
      case 'running': return 'info';
      case 'completed': return 'success';
      case 'failed': return 'error';
      default: return 'default';
    }
  };

  const getTypeIcon = (type: ScheduleTask['type']) => {
    switch (type) {
      case 'sync': return Calendar;
      case 'email': return Clock;
      case 'cleanup': return Trash2;
      case 'backup': return CheckCircle;
      default: return Calendar;
    }
  };

  const toggleTask = (taskId: string) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { ...task, enabled: !task.enabled }
        : task
    ));
  };

  const runTaskNow = (taskId: string) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { ...task, status: 'running', lastRun: new Date() }
        : task
    ));

    // Simulate task completion
    setTimeout(() => {
      setTasks(prev => prev.map(task => 
        task.id === taskId 
          ? { ...task, status: 'completed' }
          : task
      ));
    }, 3000);
  };

  const deleteTask = (taskId: string) => {
    if (confirm('Are you sure you want to delete this scheduled task?')) {
      setTasks(prev => prev.filter(task => task.id !== taskId));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Schedule Manager
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage automated tasks and sync schedules
          </p>
        </div>
        <Button
          onClick={() => setShowTaskForm(true)}
          className="flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add Task</span>
        </Button>
      </div>

      {/* Schedule Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Tasks</p>
              <p className="text-xl font-bold text-gray-900 dark:text-gray-100">
                {tasks.length}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Active</p>
              <p className="text-xl font-bold text-gray-900 dark:text-gray-100">
                {tasks.filter(t => t.enabled).length}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center space-x-3">
            <div className="p-2 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
              <Clock className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Running</p>
              <p className="text-xl font-bold text-gray-900 dark:text-gray-100">
                {tasks.filter(t => t.status === 'running').length}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center space-x-3">
            <div className="p-2 bg-red-100 dark:bg-red-900/20 rounded-lg">
              <Pause className="h-5 w-5 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Failed</p>
              <p className="text-xl font-bold text-gray-900 dark:text-gray-100">
                {tasks.filter(t => t.status === 'failed').length}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tasks List */}
      <Card>
        <CardHeader>
          <CardTitle>Scheduled Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {tasks.map((task) => {
              const Icon = getTypeIcon(task.type);
              return (
                <div
                  key={task.id}
                  className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`p-2 rounded-lg ${
                      task.enabled 
                        ? 'bg-blue-100 dark:bg-blue-900/20' 
                        : 'bg-gray-100 dark:bg-gray-700'
                    }`}>
                      <Icon className={`h-5 w-5 ${
                        task.enabled 
                          ? 'text-blue-600 dark:text-blue-400' 
                          : 'text-gray-400'
                      }`} />
                    </div>
                    
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-medium text-gray-900 dark:text-gray-100">
                          {task.name}
                        </h3>
                        <Badge variant={getStatusColor(task.status)} size="sm">
                          {task.status}
                        </Badge>
                        {!task.enabled && (
                          <Badge variant="default" size="sm">Disabled</Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {task.description}
                      </p>
                      <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500 dark:text-gray-400">
                        <span>
                          {task.frequency} at {task.time} {task.timezone}
                        </span>
                        <span>
                          Next: {format(task.nextRun, 'MMM dd, HH:mm')}
                        </span>
                        {task.lastRun && (
                          <span>
                            Last: {format(task.lastRun, 'MMM dd, HH:mm')}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleTask(task.id)}
                      className="p-2"
                    >
                      {task.enabled ? (
                        <Pause className="h-4 w-4" />
                      ) : (
                        <Play className="h-4 w-4" />
                      )}
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => runTaskNow(task.id)}
                      disabled={task.status === 'running'}
                      className="p-2"
                    >
                      <Play className="h-4 w-4" />
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setEditingTask(task);
                        setShowTaskForm(true);
                      }}
                      className="p-2"
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteTask(task.id)}
                      className="p-2 text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Tasks */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Tasks (Next 24 Hours)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {tasks
              .filter(task => task.enabled && task.nextRun.getTime() - new Date().getTime() < 24 * 60 * 60 * 1000)
              .sort((a, b) => a.nextRun.getTime() - b.nextRun.getTime())
              .map((task) => (
                <div key={task.id} className="flex items-center justify-between py-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {task.name}
                    </span>
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {format(task.nextRun, 'MMM dd, HH:mm')}
                  </span>
                </div>
              ))}
            
            {tasks.filter(task => task.enabled && task.nextRun.getTime() - new Date().getTime() < 24 * 60 * 60 * 1000).length === 0 && (
              <p className="text-sm text-gray-600 dark:text-gray-400 text-center py-4">
                No tasks scheduled for the next 24 hours
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Task Form Modal */}
      <Modal
        isOpen={showTaskForm}
        onClose={() => {
          setShowTaskForm(false);
          setEditingTask(null);
        }}
        title={editingTask ? 'Edit Task' : 'Add New Task'}
        maxWidth="lg"
      >
        <div className="space-y-4">
          <Input
            label="Task Name"
            placeholder="Enter task name"
            defaultValue={editingTask?.name || ''}
          />
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Task Type
              </label>
              <select
                defaultValue={editingTask?.type || 'sync'}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100"
              >
                <option value="sync">Data Sync</option>
                <option value="email">Email Reminder</option>
                <option value="cleanup">Data Cleanup</option>
                <option value="backup">Backup</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Frequency
              </label>
              <select
                defaultValue={editingTask?.frequency || 'daily'}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="custom">Custom</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Time"
              type="time"
              defaultValue={editingTask?.time || '02:00'}
            />
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Timezone
              </label>
              <select
                defaultValue={editingTask?.timezone || 'UTC'}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100"
              >
                <option value="UTC">UTC</option>
                <option value="America/New_York">Eastern Time</option>
                <option value="America/Chicago">Central Time</option>
                <option value="America/Denver">Mountain Time</option>
                <option value="America/Los_Angeles">Pacific Time</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description
            </label>
            <textarea
              rows={3}
              defaultValue={editingTask?.description || ''}
              placeholder="Enter task description"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="enabled"
              defaultChecked={editingTask?.enabled ?? true}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="enabled" className="text-sm text-gray-700 dark:text-gray-300">
              Enable this task
            </label>
          </div>
          
          <div className="flex justify-end space-x-3 pt-4">
            <Button
              variant="outline"
              onClick={() => {
                setShowTaskForm(false);
                setEditingTask(null);
              }}
            >
              Cancel
            </Button>
            <Button>
              {editingTask ? 'Update Task' : 'Create Task'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};