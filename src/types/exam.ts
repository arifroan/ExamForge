export interface MarkingScheme {
  correctMarks: number;
  negativeMarks: number; // e.g. 1 for -1 penalty
  partialMarksAllowed?: boolean;
  numericalNegativeMarks?: number;
  maxMarks: number;
  description: string;
}

export interface Topic {
  id: string;
  chapterId: string;
  name: string;
  order: number;
  questionCount?: number;
}

export interface Chapter {
  id: string;
  subjectId: string;
  name: string;
  order: number;
  topics: Topic[];
  questionCount?: number;
}

export interface Subject {
  id: string;
  examId: string;
  name: string;
  code: string;
  iconName?: string;
  chapters: Chapter[];
  order: number;
}

export interface Exam {
  id: string;
  name: string;
  shortName: string;
  description: string;
  subjects: Subject[];
  markingScheme: MarkingScheme;
  duration: number; // in minutes (e.g. 180 min)
  questionCount: number; // standard full mock question count
  active: boolean;
  createdAt: string;
  updatedAt: string;
}
