import React, { useState } from 'react';
import { Eye, Edit2, Trash2, UserPlus, Download, RefreshCw, Users } from 'lucide-react';
import { Student } from '../../types';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';
import { format } from 'date-fns';

interface StudentTableProps {
  students: Student[];
  onViewProfile: (studentId: string) => void;
  onEditStudent: (student: Student) => void;
  onDeleteStudent: (studentId: string) => void;
  onAddStudent: () => void;
  onSyncStudent: (studentId: string) => void;
  loading?: boolean;
}

export const StudentTable: React.FC<StudentTableProps> = ({
  students,
  onViewProfile,
  onEditStudent,
  onDeleteStudent,
  onAddStudent,
  onSyncStudent,
  loading = false,
}) => {
  const [sortField, setSortField] = useState<keyof Student>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSort = (field: keyof Student) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedStudents = [...students].sort((a, b) => {
    const aVal = a[sortField];
    const bVal = b[sortField];
    
    if (typeof aVal === 'string' && typeof bVal === 'string') {
      return sortDirection === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    }
    
    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
    }
    
    return 0;
  });

  const exportToCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'CF Handle', 'Current Rating', 'Max Rating', 'Status', 'Last Sync'];
    const rows = students.map(student => [
      student.name,
      student.email,
      student.phone,
      student.cfHandle,
      student.currentRating.toString(),
      student.maxRating.toString(),
      student.isActive ? 'Active' : 'Inactive',
      format(student.lastSyncAt, 'yyyy-MM-dd HH:mm'),
    ]);

    const csvContent = [headers, ...rows]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'students.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 1900) return 'text-purple-600 dark:text-purple-400';
    if (rating >= 1600) return 'text-blue-600 dark:text-blue-400';
    if (rating >= 1400) return 'text-green-600 dark:text-green-400';
    if (rating >= 1200) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-gray-600 dark:text-gray-400';
  };

  return (
    <Card padding="none">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Students
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Manage student accounts and track their progress
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={exportToCSV}
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Export CSV
            </Button>
            <Button
              size="sm"
              onClick={onAddStudent}
              className="flex items-center gap-2"
            >
              <UserPlus className="h-4 w-4" />
              Add Student
            </Button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                onClick={() => handleSort('name')}
              >
                Name
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                onClick={() => handleSort('cfHandle')}
              >
                CF Handle
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                onClick={() => handleSort('currentRating')}
              >
                Current Rating
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                onClick={() => handleSort('maxRating')}
              >
                Max Rating
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Last Sync
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {sortedStudents.map((student) => (
              <tr
                key={student.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {student.name}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {student.email}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                  {student.cfHandle}
                </td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${getRatingColor(student.currentRating)}`}>
                  {student.currentRating}
                </td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${getRatingColor(student.maxRating)}`}>
                  {student.maxRating}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-col gap-1">
                    <Badge
                      variant={student.isActive ? 'success' : 'error'}
                      size="sm"
                    >
                      {student.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                    {student.inactivityDays > 0 && (
                      <Badge variant="warning" size="sm">
                        {student.inactivityDays}d inactive
                      </Badge>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {format(student.lastSyncAt, 'MMM dd, HH:mm')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onViewProfile(student.id)}
                      className="p-2"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onSyncStudent(student.id)}
                      className="p-2"
                    >
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEditStudent(student)}
                      className="p-2"
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDeleteStudent(student.id)}
                      className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {students.length === 0 && (
          <div className="text-center py-12">
            <Users className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">
              No students
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Get started by adding your first student.
            </p>
            <div className="mt-6">
              <Button onClick={onAddStudent}>
                <UserPlus className="h-4 w-4 mr-2" />
                Add Student
              </Button>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};