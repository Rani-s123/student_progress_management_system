import { Student, Contest, Submission, StudentProfile, ProblemStats } from '../types';
import { subDays, format } from 'date-fns';

export const mockStudents: Student[] = [
  {
    id: '1',
    name: 'Alex Chen',
    email: 'alex.chen@example.com',
    phone: '+1234567890',
    cfHandle: 'alexc_cf',
    currentRating: 1547,
    maxRating: 1623,
    lastSyncAt: new Date(),
    isActive: true,
    inactivityDays: 0,
    remindersSent: 0,
    autoEmailDisabled: false,
    createdAt: subDays(new Date(), 30),
    updatedAt: new Date(),
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    phone: '+1234567891',
    cfHandle: 'sarahj_codes',
    currentRating: 1823,
    maxRating: 1856,
    lastSyncAt: subDays(new Date(), 1),
    isActive: true,
    inactivityDays: 1,
    remindersSent: 0,
    autoEmailDisabled: false,
    createdAt: subDays(new Date(), 45),
    updatedAt: subDays(new Date(), 1),
  },
  {
    id: '3',
    name: 'Mike Rodriguez',
    email: 'mike.r@example.com',
    phone: '+1234567892',
    cfHandle: 'mike_solver',
    currentRating: 1234,
    maxRating: 1456,
    lastSyncAt: subDays(new Date(), 8),
    isActive: false,
    inactivityDays: 8,
    remindersSent: 2,
    autoEmailDisabled: false,
    createdAt: subDays(new Date(), 60),
    updatedAt: subDays(new Date(), 8),
  },
  {
    id: '4',
    name: 'Emma Wilson',
    email: 'emma.w@example.com',
    phone: '+1234567893',
    cfHandle: 'emma_competitive',
    currentRating: 1756,
    maxRating: 1789,
    lastSyncAt: new Date(),
    isActive: true,
    inactivityDays: 0,
    remindersSent: 0,
    autoEmailDisabled: true,
    createdAt: subDays(new Date(), 20),
    updatedAt: new Date(),
  },
];

const generateContestHistory = (student: Student): Contest[] => {
  const contests: Contest[] = [];
  let currentRating = 1200;
  
  for (let i = 0; i < 15; i++) {
    const ratingChange = Math.floor(Math.random() * 200) - 100;
    const newRating = Math.max(800, currentRating + ratingChange);
    
    contests.push({
      id: `contest-${i}`,
      studentId: student.id,
      contestId: 1700 + i,
      contestName: `Codeforces Round #${1700 + i}`,
      rank: Math.floor(Math.random() * 5000) + 100,
      oldRating: currentRating,
      newRating,
      ratingChange,
      timeSeconds: Date.now() / 1000 - (i * 7 * 24 * 60 * 60),
      problemsSolved: Math.floor(Math.random() * 6) + 1,
      totalProblems: 8,
      unsolvedProblems: Math.floor(Math.random() * 3),
    });
    
    currentRating = newRating;
  }
  
  return contests.reverse();
};

const generateProblemStats = (days: number): ProblemStats => {
  const totalSolved = Math.floor(Math.random() * days * 2) + days;
  const ratings = Array.from({ length: totalSolved }, () => 
    Math.floor(Math.random() * 1500) + 800
  );
  
  const difficultyBreakdown = {
    '800-1000': ratings.filter(r => r >= 800 && r < 1000).length,
    '1000-1200': ratings.filter(r => r >= 1000 && r < 1200).length,
    '1200-1400': ratings.filter(r => r >= 1200 && r < 1400).length,
    '1400-1600': ratings.filter(r => r >= 1400 && r < 1600).length,
    '1600-1800': ratings.filter(r => r >= 1600 && r < 1800).length,
    '1800+': ratings.filter(r => r >= 1800).length,
  };
  
  return {
    totalSolved,
    avgRating: ratings.length > 0 ? Math.floor(ratings.reduce((a, b) => a + b) / ratings.length) : 0,
    avgPerDay: Number((totalSolved / days).toFixed(1)),
    mostDifficultRating: Math.max(...ratings, 0),
    difficultyBreakdown,
  };
};

const generateSubmissionHeatmap = (): Array<{ date: string; count: number }> => {
  const heatmapData = [];
  
  for (let i = 0; i < 365; i++) {
    const date = format(subDays(new Date(), i), 'yyyy-MM-dd');
    const count = Math.random() > 0.3 ? Math.floor(Math.random() * 10) : 0;
    heatmapData.push({ date, count });
  }
  
  return heatmapData.reverse();
};

export const generateStudentProfile = (student: Student): StudentProfile => {
  const contests = generateContestHistory(student);
  const ratingHistory = contests.map(contest => ({
    date: format(new Date(contest.timeSeconds * 1000), 'yyyy-MM-dd'),
    rating: contest.newRating,
  }));
  
  return {
    student,
    contestHistory: {
      contests,
      ratingHistory,
    },
    problemStats: {
      last7Days: generateProblemStats(7),
      last30Days: generateProblemStats(30),
      last90Days: generateProblemStats(90),
    },
    submissionHeatmap: generateSubmissionHeatmap(),
  };
};