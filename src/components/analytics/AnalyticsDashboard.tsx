import React, { useState } from 'react';
import { TrendingUp, Users, Target, Calendar, Award, Clock, BarChart3, Activity } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { useStudents } from '../../hooks/useStudents';
import { OverallStatsChart } from '../charts/OverallStatsChart';
import { StudentRatingDistribution } from '../charts/StudentRatingDistribution';
import { ActivityTrendChart } from '../charts/ActivityTrendChart';
import { format, subDays } from 'date-fns';

export const AnalyticsDashboard: React.FC = () => {
  const { students } = useStudents();
  const [timeRange, setTimeRange] = useState<'7' | '30' | '90'>('30');

  // Calculate analytics data
  const totalStudents = students.length;
  const activeStudents = students.filter(s => s.isActive).length;
  const inactiveStudents = totalStudents - activeStudents;
  const avgRating = students.length > 0 
    ? Math.round(students.reduce((sum, s) => sum + s.currentRating, 0) / students.length)
    : 0;
  
  const ratingRanges = {
    'Newbie (0-1199)': students.filter(s => s.currentRating < 1200).length,
    'Pupil (1200-1399)': students.filter(s => s.currentRating >= 1200 && s.currentRating < 1400).length,
    'Specialist (1400-1599)': students.filter(s => s.currentRating >= 1400 && s.currentRating < 1600).length,
    'Expert (1600-1899)': students.filter(s => s.currentRating >= 1600 && s.currentRating < 1900).length,
    'Master (1900+)': students.filter(s => s.currentRating >= 1900).length,
  };

  const studentsNeedingAttention = students.filter(s => s.inactivityDays > 7).length;
  const recentSyncs = students.filter(s => 
    new Date().getTime() - s.lastSyncAt.getTime() < 24 * 60 * 60 * 1000
  ).length;

  // Mock data for charts
  const overallStatsData = Array.from({ length: 30 }, (_, i) => ({
    date: format(subDays(new Date(), 29 - i), 'MMM dd'),
    activeStudents: Math.floor(Math.random() * 10) + activeStudents - 5,
    totalProblems: Math.floor(Math.random() * 50) + 100,
    avgRating: Math.floor(Math.random() * 100) + avgRating - 50,
  }));

  const activityTrendData = Array.from({ length: 7 }, (_, i) => ({
    day: format(subDays(new Date(), 6 - i), 'EEE'),
    submissions: Math.floor(Math.random() * 100) + 20,
    contests: Math.floor(Math.random() * 5) + 1,
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Analytics Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Comprehensive insights into student performance and system metrics
          </p>
        </div>
        <div className="flex space-x-2">
          {(['7', '30', '90'] as const).map((days) => (
            <Button
              key={days}
              variant={timeRange === days ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setTimeRange(days)}
            >
              {days} days
            </Button>
          ))}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="flex items-center space-x-3">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Students</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {totalStudents}
              </p>
              <p className="text-xs text-green-600 dark:text-green-400">
                {activeStudents} active
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center space-x-3">
            <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
              <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Avg Rating</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {avgRating}
              </p>
              <p className="text-xs text-blue-600 dark:text-blue-400">
                +12 this month
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center space-x-3">
            <div className="p-3 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
              <Activity className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Need Attention</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {studentsNeedingAttention}
              </p>
              <p className="text-xs text-red-600 dark:text-red-400">
                7+ days inactive
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center space-x-3">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
              <Clock className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Recent Syncs</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {recentSyncs}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Last 24 hours
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Overall Performance Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <OverallStatsChart data={overallStatsData} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Student Rating Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <StudentRatingDistribution data={ratingRanges} />
          </CardContent>
        </Card>
      </div>

      {/* Activity and Detailed Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Weekly Activity Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ActivityTrendChart data={activityTrendData} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Student Status Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Active</span>
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {activeStudents}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Inactive</span>
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {inactiveStudents}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Need Attention</span>
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {studentsNeedingAttention}
                </span>
              </div>

              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">
                  Rating Distribution
                </h4>
                <div className="space-y-2">
                  {Object.entries(ratingRanges).map(([range, count]) => (
                    <div key={range} className="flex items-center justify-between text-xs">
                      <span className="text-gray-600 dark:text-gray-400">{range}</span>
                      <Badge variant="default" size="sm">{count}</Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Student Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                    Student
                  </th>
                  <th className="text-left py-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                    Rating Change
                  </th>
                  <th className="text-left py-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                    Last Activity
                  </th>
                  <th className="text-left py-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {students.slice(0, 10).map((student) => (
                  <tr key={student.id} className="border-b border-gray-100 dark:border-gray-800">
                    <td className="py-3 text-sm text-gray-900 dark:text-gray-100">
                      <div>
                        <div className="font-medium">{student.name}</div>
                        <div className="text-gray-500 dark:text-gray-400">@{student.cfHandle}</div>
                      </div>
                    </td>
                    <td className="py-3">
                      <span className="text-sm font-medium text-green-600 dark:text-green-400">
                        +{Math.floor(Math.random() * 50)}
                      </span>
                    </td>
                    <td className="py-3 text-sm text-gray-600 dark:text-gray-400">
                      {format(student.lastSyncAt, 'MMM dd, HH:mm')}
                    </td>
                    <td className="py-3">
                      <Badge
                        variant={student.isActive ? 'success' : 'error'}
                        size="sm"
                      >
                        {student.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};