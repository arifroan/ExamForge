export interface Bookmark {
  id: string;
  userId: string;
  questionId: string;
  examId: string;
  subjectId: string;
  createdAt: string;
  notes?: string;
}

export interface IncorrectQuestionLog {
  id: string;
  userId: string;
  questionId: string;
  examId: string;
  subjectId: string;
  userAnswer: string | string[] | number | null;
  attemptedAt: string;
  resolved: boolean;
}

export interface SubjectAnalytics {
  subjectId: string;
  subjectName: string;
  questionsAttempted: number;
  questionsCorrect: number;
  accuracy: number;
  averageTimeSeconds: number;
}

export interface ChapterAnalytics {
  chapterId: string;
  chapterName: string;
  subjectName: string;
  questionsAttempted: number;
  questionsCorrect: number;
  accuracy: number;
}

export interface StudentAnalytics {
  userId: string;
  totalQuestionsAttempted: number;
  totalQuestionsSolved: number;
  overallAccuracy: number;
  averageSolvingTimeSeconds: number;
  testsCompletedCount: number;
  bestScorePercentage: number;
  practiceStreakDays: number;
  lastActiveDate: string;
  recentTestScores: {
    testTitle: string;
    date: string;
    score: number;
    maxScore: number;
    percentage: number;
  }[];
  subjectAccuracies: SubjectAnalytics[];
  chapterAccuracies: ChapterAnalytics[];
  bookmarkedCount: number;
  incorrectQuestionsCount: number;
}
