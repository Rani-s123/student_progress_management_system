import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { useTheme } from '../../contexts/ThemeContext';

interface OverallStatsChartProps {
  data: Array<{
    date: string;
    activeStudents: number;
    totalProblems: number;
    avgRating: number;
  }>;
}

export const OverallStatsChart: React.FC<OverallStatsChartProps> = ({ data }) => {
  const { theme } = useTheme();
  
  const colors = {
    grid: theme === 'dark' ? '#374151' : '#e5e7eb',
    text: theme === 'dark' ? '#d1d5db' : '#6b7280',
    activeStudents: '#3b82f6',
    avgRating: '#10b981',
  };

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} />
          <XAxis 
            dataKey="date" 
            stroke={colors.text}
            fontSize={12}
          />
          <YAxis 
            stroke={colors.text}
            fontSize={12}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
              border: `1px solid ${theme === 'dark' ? '#374151' : '#e5e7eb'}`,
              borderRadius: '8px',
              color: theme === 'dark' ? '#d1d5db' : '#1f2937',
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="activeStudents"
            stroke={colors.activeStudents}
            strokeWidth={2}
            name="Active Students"
            dot={{ fill: colors.activeStudents, strokeWidth: 2, r: 4 }}
          />
          <Line
            type="monotone"
            dataKey="avgRating"
            stroke={colors.avgRating}
            strokeWidth={2}
            name="Avg Rating"
            dot={{ fill: colors.avgRating, strokeWidth: 2, r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};