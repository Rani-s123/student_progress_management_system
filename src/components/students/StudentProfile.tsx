import React, { useState, useEffect } from 'react';
import { ArrowLeft, Calendar, TrendingUp, Trophy, Target, RefreshCw } from 'lucide-react';
import { StudentProfile as StudentProfileType } from '../../types';
import { Button } from '../ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { ContestHistoryChart } from '../charts/ContestHistoryChart';
import { ProblemDifficultyChart } from '../charts/ProblemDifficultyChart';
import { SubmissionHeatmap } from '../charts/SubmissionHeatmap';
import { format } from 'date-fns';

interface StudentProfileProps {
  studentId: string;
  onBack: () => void;
  onGetProfile: (id: string) => Promise<StudentProfileType | null>;
}

export const StudentProfile: React.FC<StudentProfileProps> = ({
  studentId,
  onBack,
  onGetProfile,
}) => {
  const [profile, setProfile] = useState<StudentProfileType | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'7' | '30' | '90'>('30');

  useEffect(() => {
    loadProfile();
  }, [studentId]);

  const loadProfile = async () => {
    setLoading(true);
    try {
      const profileData = await onGetProfile(studentId);
      setProfile(profileData);
    } catch (error) {
      console.error('Failed to load profile:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto text-blue-600" />
          <p className="mt-2 text-gray-600 dark:text-gray-400">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 dark:text-gray-400">Profile not found</p>
        <Button onClick={onBack} className="mt-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Students
        </Button>
      </div>
    );
  }

  const { student, contestHistory, problemStats, submissionHeatmap } = profile;
  const currentStats = problemStats[`last${activeTab}Days` as keyof typeof problemStats];

  const getRatingColor = (rating: number) => {
    if (rating >= 1900) return 'text-purple-600 dark:text-purple-400';
    if (rating >= 1600) return 'text-blue-600 dark:text-blue-400';
    if (rating >= 1400) return 'text-green-600 dark:text-green-400';
    if (rating >= 1200) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-gray-600 dark:text-gray-400';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            onClick={onBack}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back</span>
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {student.name}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              @{student.cfHandle} • {student.email}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Badge
            variant={student.isActive ? 'success' : 'error'}
          >
            {student.isActive ? 'Active' : 'Inactive'}
          </Badge>
          <Button variant="outline" onClick={loadProfile}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Rating Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <TrendingUp className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Current Rating</p>
              <p className={`text-xl font-bold ${getRatingColor(student.currentRating)}`}>
                {student.currentRating}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
              <Trophy className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Max Rating</p>
              <p className={`text-xl font-bold ${getRatingColor(student.maxRating)}`}>
                {student.maxRating}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center space-x-3">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
              <Target className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Problems Solved</p>
              <p className="text-xl font-bold text-gray-900 dark:text-gray-100">
                {currentStats.totalSolved}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center space-x-3">
            <div className="p-2 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
              <Calendar className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Last Sync</p>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {format(student.lastSyncAt, 'MMM dd, HH:mm')}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Contest History */}
      <Card>
        <CardHeader>
          <CardTitle>Contest History</CardTitle>
        </CardHeader>
        <CardContent>
          <ContestHistoryChart data={contestHistory.ratingHistory} />
        </CardContent>
      </Card>

      {/* Problem Solving Stats */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Problem Solving Statistics</CardTitle>
            <div className="flex space-x-1">
              {(['7', '30', '90'] as const).map((days) => (
                <Button
                  key={days}
                  variant={activeTab === days ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setActiveTab(days)}
                >
                  {days} days
                </Button>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {currentStats.totalSolved}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Solved</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                {currentStats.avgRating}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Avg Rating</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {currentStats.avgPerDay}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Per Day</p>
            </div>
            <div className="text-center">
              <p className={`text-2xl font-bold ${getRatingColor(currentStats.mostDifficultRating)}`}>
                {currentStats.mostDifficultRating}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Hardest</p>
            </div>
          </div>
          
          <ProblemDifficultyChart data={currentStats.difficultyBreakdown} />
        </CardContent>
      </Card>

      {/* Submission Heatmap */}
      <Card>
        <CardHeader>
          <CardTitle>Submission Heatmap</CardTitle>
        </CardHeader>
        <CardContent>
          <SubmissionHeatmap data={submissionHeatmap} />
        </CardContent>
      </Card>

      {/* Contest Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Contests</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                    Contest
                  </th>
                  <th className="text-left py-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                    Rank
                  </th>
                  <th className="text-left py-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                    Rating Change
                  </th>
                  <th className="text-left py-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                    Problems Solved
                  </th>
                  <th className="text-left py-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {contestHistory.contests.slice(0, 10).map((contest) => (
                  <tr key={contest.id} className="border-b border-gray-100 dark:border-gray-800">
                    <td className="py-3 text-sm text-gray-900 dark:text-gray-100">
                      {contest.contestName}
                    </td>
                    <td className="py-3 text-sm text-gray-600 dark:text-gray-400">
                      #{contest.rank}
                    </td>
                    <td className="py-3">
                      <span
                        className={`text-sm font-medium ${
                          contest.ratingChange >= 0
                            ? 'text-green-600 dark:text-green-400'
                            : 'text-red-600 dark:text-red-400'
                        }`}
                      >
                        {contest.ratingChange >= 0 ? '+' : ''}{contest.ratingChange}
                      </span>
                    </td>
                    <td className="py-3 text-sm text-gray-600 dark:text-gray-400">
                      {contest.problemsSolved} / {contest.totalProblems}
                    </td>
                    <td className="py-3 text-sm text-gray-600 dark:text-gray-400">
                      {format(new Date(contest.timeSeconds * 1000), 'MMM dd, yyyy')}
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