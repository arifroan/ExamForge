/**
 * ExamForge Clean Data Service Interface
 * 
 * Defines the contract for data operations across Exams, Questions, Tests,
 * Attempts, and Analytics.
 * 
 * In this UI foundation stage, LocalDataService provides rich, deterministic mock data
 * without requiring DATABASE_URL or real PostgreSQL connections.
 * In the backend phase, this can be seamlessly swapped for PostgresDataService or an HTTP client.
 */

import { Exam } from '../types/exam';
import { Question, DifficultyLevel, QuestionType } from '../types/question';
import { Test, TestResultReport } from '../types/test';
import { StudentAnalytics } from '../types/analytics';
import { StudentDashboardData } from '../types/studentDashboard';
import { 
  DEMO_EXAMS, 
  DEMO_QUESTIONS, 
  DEMO_TESTS, 
  DEMO_STUDENT_ANALYTICS 
} from '../db/mockData';

export interface QuestionFilters {
  examId?: string;
  subjectId?: string;
  chapterId?: string;
  topicId?: string;
  difficulty?: DifficultyLevel | 'ALL';
  questionType?: QuestionType | 'ALL';
  searchQuery?: string;
}

export interface IDataService {
  getExams(): Promise<Exam[]>;
  getExamById(id: string): Promise<Exam | undefined>;
  getQuestions(filters?: QuestionFilters): Promise<Question[]>;
  getQuestionById(id: string): Promise<Question | undefined>;
  getTests(examId?: string): Promise<Test[]>;
  getTestById(id: string): Promise<Test | undefined>;
  getStudentAnalytics(userId: string, examId: string): Promise<StudentAnalytics>;
  getStudentDashboardData(userId: string, examId: string, isEmptyState?: boolean): Promise<StudentDashboardData>;
  getBookmarks(userId: string): Promise<Question[]>;
  toggleBookmark(userId: string, questionId: string): Promise<boolean>;
  getIncorrectQuestions(userId: string): Promise<Question[]>;
  removeIncorrectQuestion(userId: string, questionId: string): Promise<void>;
}

class LocalDataService implements IDataService {
  private exams: Exam[] = [...DEMO_EXAMS];
  private questions: Question[] = [...DEMO_QUESTIONS];
  private tests: Test[] = [...DEMO_TESTS];
  private bookmarks: Set<string> = new Set(['q-jm-phy-01', 'q-jm-chem-01']);
  private incorrectPool: Set<string> = new Set(['q-jm-math-01', 'q-ja-phy-01']);

  async getExams(): Promise<Exam[]> {
    return [...this.exams];
  }

  async getExamById(id: string): Promise<Exam | undefined> {
    return this.exams.find(e => e.id === id);
  }

  async getQuestions(filters?: QuestionFilters): Promise<Question[]> {
    return this.questions.filter(q => {
      if (!filters) return true;
      if (filters.examId && filters.examId !== 'ALL' && q.examId !== filters.examId) return false;
      if (filters.subjectId && filters.subjectId !== 'ALL' && q.subjectId !== filters.subjectId) return false;
      if (filters.chapterId && filters.chapterId !== 'ALL' && q.chapterId !== filters.chapterId) return false;
      if (filters.topicId && filters.topicId !== 'ALL' && q.topicId !== filters.topicId) return false;
      if (filters.difficulty && filters.difficulty !== 'ALL' && q.difficulty !== filters.difficulty) return false;
      if (filters.questionType && filters.questionType !== 'ALL' && q.questionType !== filters.questionType) return false;
      if (filters.searchQuery?.trim()) {
        const query = filters.searchQuery.toLowerCase();
        const textMatch = q.questionText.toLowerCase().includes(query);
        const tagMatch = q.tags.some(t => t.toLowerCase().includes(query));
        if (!textMatch && !tagMatch) return false;
      }
      return true;
    });
  }

  async getQuestionById(id: string): Promise<Question | undefined> {
    return this.questions.find(q => q.id === id);
  }

  async getTests(examId?: string): Promise<Test[]> {
    if (examId) {
      return this.tests.filter(t => t.examId === examId);
    }
    return [...this.tests];
  }

  async getTestById(id: string): Promise<Test | undefined> {
    return this.tests.find(t => t.id === id);
  }

  async getStudentAnalytics(userId: string, examId: string): Promise<StudentAnalytics> {
    return { ...DEMO_STUDENT_ANALYTICS };
  }

  async getStudentDashboardData(userId: string, examId: string, isEmptyState: boolean = false): Promise<StudentDashboardData> {
    if (isEmptyState) {
      return {
        stats: {
          accuracy: 0,
          questionsSolved: 0,
          questionsAttempted: 0,
          averageSpeedSeconds: 0,
          targetSpeedSeconds: 90,
          testsCompleted: 0,
          assignedTests: 0,
          practiceStreakDays: 0,
          bestScorePercentage: 0
        },
        continuePractice: null,
        focusAreas: [],
        recentTests: [],
        hasActivity: false,
        activeExamId: examId
      };
    }

    if (examId === 'neet-ug') {
      return {
        stats: {
          accuracy: 81.2,
          questionsSolved: 310,
          questionsAttempted: 382,
          averageSpeedSeconds: 58,
          targetSpeedSeconds: 65,
          testsCompleted: 5,
          assignedTests: 8,
          practiceStreakDays: 14,
          bestScorePercentage: 85.0
        },
        continuePractice: {
          id: 'cp-neet-1',
          examId: 'neet-ug',
          subjectId: 'neet-biology',
          subjectName: 'Biology',
          chapterId: 'neet-bio-physiology',
          chapterName: 'Human Physiology',
          topicName: 'Neural Control and Coordination',
          completedQuestions: 7,
          totalQuestions: 20
        },
        focusAreas: [
          { id: 'fa-1', chapterName: 'Ray and Wave Optics', subjectName: 'Physics', accuracy: 58, questionsAttempted: 32, isDemoSample: true },
          { id: 'fa-2', chapterName: 'Molecular Genetics', subjectName: 'Biology', accuracy: 64, questionsAttempted: 45, isDemoSample: true },
          { id: 'fa-3', chapterName: 'Chemical Equilibrium', subjectName: 'Chemistry', accuracy: 71, questionsAttempted: 28, isDemoSample: true }
        ],
        recentTests: [
          { id: 'rt-1', testTitle: 'NEET UG Full Mock 01', examShortName: 'NEET UG', score: 612, maxScore: 720, accuracy: 84, timeAgo: '2 days ago', dateStr: 'Sep 17' },
          { id: 'rt-2', testTitle: 'NEET Biology Sectional Drill', examShortName: 'NEET UG', score: 160, maxScore: 180, accuracy: 91, timeAgo: '4 days ago', dateStr: 'Sep 15' }
        ],
        hasActivity: true,
        activeExamId: examId
      };
    }

    if (examId === 'jee-advanced') {
      return {
        stats: {
          accuracy: 69.5,
          questionsSolved: 184,
          questionsAttempted: 265,
          averageSpeedSeconds: 142,
          targetSpeedSeconds: 180,
          testsCompleted: 4,
          assignedTests: 6,
          practiceStreakDays: 14,
          bestScorePercentage: 73.3
        },
        continuePractice: {
          id: 'cp-ja-1',
          examId: 'jee-advanced',
          subjectId: 'ja-physics',
          subjectName: 'Physics',
          chapterId: 'ja-phy-rotation',
          chapterName: 'Rotational Dynamics',
          topicName: 'Torque & Angular Momentum',
          completedQuestions: 8,
          totalQuestions: 18
        },
        focusAreas: [
          { id: 'fa-1', chapterName: 'Vectors & 3D Geometry', subjectName: 'Mathematics', accuracy: 48, questionsAttempted: 25, isDemoSample: true },
          { id: 'fa-2', chapterName: 'Thermal Physics & Heat', subjectName: 'Physics', accuracy: 56, questionsAttempted: 30, isDemoSample: true },
          { id: 'fa-3', chapterName: 'Coordination Chemistry', subjectName: 'Chemistry', accuracy: 62, questionsAttempted: 22, isDemoSample: true }
        ],
        recentTests: [
          { id: 'rt-1', testTitle: 'JEE Advanced Paper 1 Mock', examShortName: 'JEE Adv', score: 132, maxScore: 180, accuracy: 73, timeAgo: '3 days ago', dateStr: 'Sep 16' },
          { id: 'rt-2', testTitle: 'JEE Advanced Mathematics Drill', examShortName: 'JEE Adv', score: 44, maxScore: 60, accuracy: 75, timeAgo: '6 days ago', dateStr: 'Sep 13' }
        ],
        hasActivity: true,
        activeExamId: examId
      };
    }

    // Default: JEE Main
    return {
      stats: {
        accuracy: 78.4,
        questionsSolved: 268,
        questionsAttempted: 342,
        averageSpeedSeconds: 84,
        targetSpeedSeconds: 90,
        testsCompleted: 6,
        assignedTests: 8,
        practiceStreakDays: 14,
        bestScorePercentage: 82.0
      },
      continuePractice: {
        id: 'cp-jm-1',
        examId: 'jee-main',
        subjectId: 'jm-physics',
        subjectName: 'Physics',
        chapterId: 'jm-phy-kinematics',
        chapterName: 'Kinematics & Motion',
        topicName: 'Projectile & Relative Motion',
        completedQuestions: 12,
        totalQuestions: 20
      },
      focusAreas: [
        { id: 'fa-1', chapterName: 'Thermodynamics', subjectName: 'Physics', accuracy: 54, questionsAttempted: 35, isDemoSample: true },
        { id: 'fa-2', chapterName: 'Organic Chemistry (GOC)', subjectName: 'Chemistry', accuracy: 67, questionsAttempted: 42, isDemoSample: true },
        { id: 'fa-3', chapterName: 'Kinematics & Motion', subjectName: 'Physics', accuracy: 82, questionsAttempted: 48, isDemoSample: true }
      ],
      recentTests: [
        { id: 'rt-1', testTitle: 'JEE Main Diagnostic 01', examShortName: 'JEE Main', score: 218, maxScore: 300, accuracy: 78, timeAgo: '2 days ago', dateStr: 'Sep 17' },
        { id: 'rt-2', testTitle: 'JEE Main Physics Drill', examShortName: 'JEE Main', score: 36, maxScore: 60, accuracy: 80, timeAgo: '5 days ago', dateStr: 'Sep 14' }
      ],
      hasActivity: true,
      activeExamId: 'jee-main'
    };
  }

  async getBookmarks(userId: string): Promise<Question[]> {
    return this.questions.filter(q => this.bookmarks.has(q.id));
  }

  async toggleBookmark(userId: string, questionId: string): Promise<boolean> {
    if (this.bookmarks.has(questionId)) {
      this.bookmarks.delete(questionId);
      return false;
    } else {
      this.bookmarks.add(questionId);
      return true;
    }
  }

  async getIncorrectQuestions(userId: string): Promise<Question[]> {
    return this.questions.filter(q => this.incorrectPool.has(q.id));
  }

  async removeIncorrectQuestion(userId: string, questionId: string): Promise<void> {
    this.incorrectPool.delete(questionId);
  }
}

// Export singleton instance for app-wide UI consumption
export const dataService: IDataService = new LocalDataService();
