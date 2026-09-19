/**
 * ExamForge Student Dashboard Data Contracts
 * 
 * Clean separation of UI views from data models.
 * In the future, these structures will be populated directly
 * from PostgreSQL database queries (UserStats, TestAttempts, and QuestionProgress).
 */

export interface StudentStats {
  accuracy: number;
  questionsSolved: number;
  questionsAttempted: number;
  averageSpeedSeconds: number;
  targetSpeedSeconds: number;
  testsCompleted: number;
  assignedTests: number;
  practiceStreakDays: number;
  bestScorePercentage: number;
}

export interface ContinuePracticeItem {
  id: string;
  examId: string;
  subjectId: string;
  subjectName: string;
  chapterId: string;
  chapterName: string;
  topicName?: string;
  completedQuestions: number;
  totalQuestions: number;
}

export interface FocusAreaItem {
  id: string;
  chapterName: string;
  subjectName: string;
  accuracy: number;
  questionsAttempted: number;
  isDemoSample?: boolean;
}

export interface RecentTestItem {
  id: string;
  testTitle: string;
  examShortName: string;
  score: number;
  maxScore: number;
  accuracy: number;
  timeAgo: string;
  dateStr: string;
}

export interface StudentDashboardData {
  stats: StudentStats | null;
  continuePractice: ContinuePracticeItem | null;
  focusAreas: FocusAreaItem[];
  recentTests: RecentTestItem[];
  hasActivity: boolean;
  activeExamId: string;
}
