export interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  cfHandle: string;
  currentRating: number;
  maxRating: number;
  lastSyncAt: Date;
  isActive: boolean;
  inactivityDays: number;
  remindersSent: number;
  autoEmailDisabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Contest {
  id: string;
  studentId: string;
  contestId: number;
  contestName: string;
  rank: number;
  oldRating: number;
  newRating: number;
  ratingChange: number;
  timeSeconds: number;
  problemsSolved: number;
  totalProblems: number;
  unsolvedProblems: number;
}

export interface Problem {
  contestId: number;
  index: string;
  name: string;
  type: string;
  rating?: number;
  tags: string[];
}

export interface Submission {
  id: number;
  contestId: number;
  creationTimeSeconds: number;
  relativeTimeSeconds: number;
  problem: Problem;
  author: {
    contestId: number;
    members: Array<{
      handle: string;
    }>;
  };
  programmingLanguage: string;
  verdict: string;
  testset: string;
  passedTestCount: number;
  timeConsumedMillis: number;
  memoryConsumedBytes: number;
}

export interface ProblemStats {
  totalSolved: number;
  avgRating: number;
  avgPerDay: number;
  mostDifficultRating: number;
  mostDifficultProblem?: Problem;
  difficultyBreakdown: Record<string, number>;
}

export interface ContestHistory {
  contests: Contest[];
  ratingHistory: Array<{
    date: string;
    rating: number;
  }>;
}

export interface StudentProfile {
  student: Student;
  contestHistory: ContestHistory;
  problemStats: {
    last7Days: ProblemStats;
    last30Days: ProblemStats;
    last90Days: ProblemStats;
  };
  submissionHeatmap: Array<{
    date: string;
    count: number;
  }>;
}

export interface SyncConfig {
  frequency: 'daily' | 'weekly' | 'custom';
  time: string; // HH:MM format
  timezone: string;
  autoSync: boolean;
}

export interface SystemStats {
  totalStudents: number;
  activeStudents: number;
  inactiveStudents: number;
  lastSyncAt: Date;
  nextSyncAt: Date;
  syncStatus: 'idle' | 'syncing' | 'error';
}