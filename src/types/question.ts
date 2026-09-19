export type QuestionType =
  | 'SINGLE_CORRECT_MCQ'
  | 'MULTIPLE_CORRECT'
  | 'NUMERICAL_ANSWER'
  | 'ASSERTION_REASON'
  | 'MATCH_FOLLOWING';

export type DifficultyLevel = 'EASY' | 'MEDIUM' | 'HARD';

export interface QuestionOption {
  id: string;
  label: string; // 'A', 'B', 'C', 'D'
  text: string;
  imageUrl?: string;
}

export interface MatchPairItem {
  leftKey: string; // e.g. 'P', 'Q', 'R', 'S'
  leftText: string;
  rightKey: string; // e.g. '1', '2', '3', '4'
  rightText: string;
}

export interface Question {
  id: string;
  examId: string;
  subjectId: string;
  chapterId: string;
  topicId: string;
  questionText: string;
  questionType: QuestionType;
  options: QuestionOption[];
  correctAnswer: string | string[] | number; // e.g. 'B', ['A', 'C'], or 42.5
  explanation: string;
  difficulty: DifficultyLevel;
  marks: number;
  negativeMarks: number;
  year?: number;
  source: string; // e.g. "Demo Question" or verified source
  questionNumber?: number;
  language: 'EN' | 'HI';
  imageUrl?: string;
  solutionImageUrl?: string;
  tags: string[];
  matchPairs?: MatchPairItem[];
  assertion?: string;
  reason?: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export type PracticeMode =
  | 'QUICK'
  | 'CHAPTER'
  | 'TOPIC'
  | 'SUBJECT'
  | 'PYQ'
  | 'CUSTOM'
  | 'INCORRECT'
  | 'BOOKMARKED';

export interface CustomPracticeFilter {
  examId: string;
  subjectId?: string;
  chapterId?: string;
  topicId?: string;
  difficulty?: DifficultyLevel | 'ALL';
  questionType?: QuestionType | 'ALL';
  questionCount: number;
}
