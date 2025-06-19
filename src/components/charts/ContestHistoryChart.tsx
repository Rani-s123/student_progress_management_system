import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useTheme } from '../../contexts/ThemeContext';

interface ContestHistoryChartProps {
  data: Array<{
    date: string;
    rating: number;
  }>;
}

export const ContestHistoryChart: React.FC<ContestHistoryChartProps> = ({ data }) => {
  const { theme } = useTheme();
  
  const colors = {
    grid: theme === 'dark' ? '#374151' : '#e5e7eb',
    text: theme === 'dark' ? '#d1d5db' : '#6b7280',
    line: '#3b82f6',
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
            tickFormatter={(date) => new Date(date).toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric' 
            })}
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
            labelFormatter={(date) => new Date(date).toLocaleDateString()}
            formatter={(value: number) => [value, 'Rating']}
          />
          <Line
            type="monotone"
            dataKey="rating"
            stroke={colors.line}
            strokeWidth={2}
            dot={{ fill: colors.line, strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: colors.line, strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};