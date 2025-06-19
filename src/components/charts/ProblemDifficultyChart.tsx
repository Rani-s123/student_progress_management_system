import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useTheme } from '../../contexts/ThemeContext';

interface ProblemDifficultyChartProps {
  data: Record<string, number>;
}

export const ProblemDifficultyChart: React.FC<ProblemDifficultyChartProps> = ({ data }) => {
  const { theme } = useTheme();
  
  const colors = {
    grid: theme === 'dark' ? '#374151' : '#e5e7eb',
    text: theme === 'dark' ? '#d1d5db' : '#6b7280',
    bar: '#10b981',
  };

  const chartData = Object.entries(data).map(([range, count]) => ({
    range,
    count,
  }));

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} />
          <XAxis 
            dataKey="range" 
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
            formatter={(value: number) => [value, 'Problems']}
          />
          <Bar
            dataKey="count"
            fill={colors.bar}
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};