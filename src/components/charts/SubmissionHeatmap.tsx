import React from 'react';
import { format, startOfYear, eachWeekOfInterval, eachDayOfInterval, startOfWeek } from 'date-fns';
import { useTheme } from '../../contexts/ThemeContext';

interface SubmissionHeatmapProps {
  data: Array<{
    date: string;
    count: number;
  }>;
}

export const SubmissionHeatmap: React.FC<SubmissionHeatmapProps> = ({ data }) => {
  const { theme } = useTheme();
  
  const now = new Date();
  const yearStart = startOfYear(now);
  const weeks = eachWeekOfInterval({ start: yearStart, end: now });
  
  const dataMap = new Map(data.map(item => [item.date, item.count]));
  
  const getIntensity = (count: number) => {
    if (count === 0) return 0;
    if (count <= 2) return 1;
    if (count <= 4) return 2;
    if (count <= 6) return 3;
    return 4;
  };
  
  const getColor = (intensity: number) => {
    if (theme === 'dark') {
      switch (intensity) {
        case 0: return '#1f2937';
        case 1: return '#065f46';
        case 2: return '#047857';
        case 3: return '#059669';
        case 4: return '#10b981';
        default: return '#1f2937';
      }
    } else {
      switch (intensity) {
        case 0: return '#f3f4f6';
        case 1: return '#dcfce7';
        case 2: return '#bbf7d0';
        case 3: return '#86efac';
        case 4: return '#4ade80';
        default: return '#f3f4f6';
      }
    }
  };

  return (
    <div className="overflow-x-auto">
      <div className="inline-block min-w-full">
        <div className="grid grid-cols-53 gap-1 text-xs">
          {weeks.map((week, weekIndex) => {
            const days = eachDayOfInterval({
              start: startOfWeek(week),
              end: new Date(Math.min(startOfWeek(week).getTime() + 6 * 24 * 60 * 60 * 1000, now.getTime()))
            });
            
            return (
              <div key={weekIndex} className="grid grid-rows-7 gap-1">
                {Array.from({ length: 7 }, (_, dayIndex) => {
                  const day = days[dayIndex];
                  if (!day) return <div key={dayIndex} className="w-3 h-3" />;
                  
                  const dateStr = format(day, 'yyyy-MM-dd');
                  const count = dataMap.get(dateStr) || 0;
                  const intensity = getIntensity(count);
                  
                  return (
                    <div
                      key={dayIndex}
                      className="w-3 h-3 rounded-sm cursor-pointer transition-all duration-200 hover:ring-2 hover:ring-blue-500"
                      style={{ backgroundColor: getColor(intensity) }}
                      title={`${format(day, 'MMM dd, yyyy')}: ${count} submissions`}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
        
        <div className="flex items-center justify-between mt-4 text-xs text-gray-600 dark:text-gray-400">
          <span>Less</span>
          <div className="flex items-center space-x-1">
            {Array.from({ length: 5 }, (_, i) => (
              <div
                key={i}
                className="w-3 h-3 rounded-sm"
                style={{ backgroundColor: getColor(i) }}
              />
            ))}
          </div>
          <span>More</span>
        </div>
      </div>
    </div>
  );
};