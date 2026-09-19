import { Question } from './question';

export type QuestionPaletteStatus =
  | 'NOT_VISITED'
  | 'NOT_ANSWERED'
  | 'ANSWERED'
  | 'MARKED_FOR_REVIEW'
  | 'ANSWERED_AND_MARKED';

export interface TestAnswerRecord {
  questionId: string;
  selectedAnswer: string | string[] | number | null;
  status: QuestionPaletteStatus;
  timeSpentSeconds: number;
  isCorrect?: boolean;
  marksAwarded?: number;
}

export interface Test {
  id: string;
  title: string;
  examId: string;
  description: string;
  durationMinutes: number;
  totalMarks: number;
  totalQuestions: number;
  questions: Question[];
  isFullMock: boolean;
  active: boolean;
  createdAt: string;
}

export interface TestAttempt {
  id: string;
  testId: string;
  userId: string;
  startedAt: string;
  completedAt?: string;
  timeUsedSeconds: number;
  totalScore: number;
  maxScore: number;
  percentage: number;
  accuracy: number;
  correctCount: number;
  incorrectCount: number;
  unattemptedCount: number;
  answers: Record<string, TestAnswerRecord>;
}

export interface PerformanceBreakdownItem {
  name: string;
  total: number;
  attempted: number;
  correct: number;
  incorrect: number;
  accuracy: number;
  score: number;
}

export interface TestResultReport {
  attempt: TestAttempt;
  test: Test;
  subjectBreakdown: PerformanceBreakdownItem[];
  chapterBreakdown: PerformanceBreakdownItem[];
  difficultyBreakdown: PerformanceBreakdownItem[];
  questionTypeBreakdown: PerformanceBreakdownItem[];
  averageTimePerQuestionSeconds: number;
}
