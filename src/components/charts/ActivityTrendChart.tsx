import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { useTheme } from '../../contexts/ThemeContext';

interface ActivityTrendChartProps {
  data: Array<{
    day: string;
    submissions: number;
    contests: number;
  }>;
}

export const ActivityTrendChart: React.FC<ActivityTrendChartProps> = ({ data }) => {
  const { theme } = useTheme();
  
  const colors = {
    grid: theme === 'dark' ? '#374151' : '#e5e7eb',
    text: theme === 'dark' ? '#d1d5db' : '#6b7280',
    submissions: '#3b82f6',
    contests: '#10b981',
  };

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} />
          <XAxis 
            dataKey="day" 
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
          <Bar
            dataKey="submissions"
            fill={colors.submissions}
            name="Submissions"
            radius={[2, 2, 0, 0]}
          />
          <Bar
            dataKey="contests"
            fill={colors.contests}
            name="Contests"
            radius={[2, 2, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};