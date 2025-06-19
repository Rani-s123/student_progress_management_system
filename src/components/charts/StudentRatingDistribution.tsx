import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';
import { useTheme } from '../../contexts/ThemeContext';

interface StudentRatingDistributionProps {
  data: Record<string, number>;
}

export const StudentRatingDistribution: React.FC<StudentRatingDistributionProps> = ({ data }) => {
  const { theme } = useTheme();
  
  const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];
  
  const chartData = Object.entries(data).map(([name, value], index) => ({
    name: name.split(' ')[0], // Shortened name for better display
    value,
    fullName: name,
    color: colors[index % colors.length],
  }));

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={2}
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
              border: `1px solid ${theme === 'dark' ? '#374151' : '#e5e7eb'}`,
              borderRadius: '8px',
              color: theme === 'dark' ? '#d1d5db' : '#1f2937',
            }}
            formatter={(value: number, name: string, props: any) => [
              value,
              props.payload.fullName
            ]}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};