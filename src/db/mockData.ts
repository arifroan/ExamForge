import { Exam } from '../types/exam';
import { Question } from '../types/question';
import { Test } from '../types/test';
import { StudentAnalytics } from '../types/analytics';
import { User } from '../types/auth';

export const DEMO_EXAMS: Exam[] = [
  {
    id: 'jee-main',
    name: 'Joint Entrance Examination (Main)',
    shortName: 'JEE Main',
    description: 'National level engineering entrance exam for NITs, IIITs, and CFTIs, and qualifier for JEE Advanced.',
    duration: 180,
    questionCount: 75,
    active: true,
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z',
    markingScheme: {
      correctMarks: 4,
      negativeMarks: 1,
      maxMarks: 300,
      description: '+4 for correct response, -1 penalty for incorrect response. 0 for unattempted.'
    },
    subjects: [
      {
        id: 'jm-physics',
        examId: 'jee-main',
        name: 'Physics',
        code: 'PHY',
        iconName: 'Atom',
        order: 1,
        chapters: [
          {
            id: 'jm-phy-kinematics',
            subjectId: 'jm-physics',
            name: 'Kinematics & Motion',
            order: 1,
            questionCount: 42,
            topics: [
              { id: 'jm-phy-kin-1d', chapterId: 'jm-phy-kinematics', name: 'Motion in One Dimension', order: 1, questionCount: 20 },
              { id: 'jm-phy-kin-proj', chapterId: 'jm-phy-kinematics', name: 'Projectile & Relative Motion', order: 2, questionCount: 22 }
            ]
          },
          {
            id: 'jm-phy-thermo',
            subjectId: 'jm-physics',
            name: 'Thermal Physics & Heat',
            order: 2,
            questionCount: 38,
            topics: [
              { id: 'jm-phy-thermo-laws', chapterId: 'jm-phy-thermo', name: 'First & Second Laws of Thermodynamics', order: 1, questionCount: 24 },
              { id: 'jm-phy-thermo-ktg', chapterId: 'jm-phy-thermo', name: 'Kinetic Theory of Gases', order: 2, questionCount: 14 }
            ]
          },
          {
            id: 'jm-phy-electromagnetism',
            subjectId: 'jm-physics',
            name: 'Electrostatics & Current',
            order: 3,
            questionCount: 55,
            topics: [
              { id: 'jm-phy-elec-coulomb', chapterId: 'jm-phy-electromagnetism', name: "Coulomb's Law & Electric Field", order: 1, questionCount: 28 },
              { id: 'jm-phy-elec-circuits', chapterId: 'jm-phy-electromagnetism', name: 'Current Electricity & Kirchhoff Rules', order: 2, questionCount: 27 }
            ]
          }
        ]
      },
      {
        id: 'jm-chemistry',
        examId: 'jee-main',
        name: 'Chemistry',
        code: 'CHEM',
        iconName: 'FlaskConical',
        order: 2,
        chapters: [
          {
            id: 'jm-chem-physical',
            subjectId: 'jm-chemistry',
            name: 'Chemical Equilibrium & Kinetics',
            order: 1,
            questionCount: 35,
            topics: [
              { id: 'jm-chem-eq-lechatelier', chapterId: 'jm-chem-physical', name: "Le Chatelier's Principle & Kp/Kc", order: 1, questionCount: 18 },
              { id: 'jm-chem-kin-rate', chapterId: 'jm-chem-physical', name: 'Order of Reaction & Arrhenius Equation', order: 2, questionCount: 17 }
            ]
          },
          {
            id: 'jm-chem-organic',
            subjectId: 'jm-chemistry',
            name: 'General Organic Chemistry (GOC)',
            order: 2,
            questionCount: 45,
            topics: [
              { id: 'jm-chem-goc-inductive', chapterId: 'jm-chem-organic', name: 'Electronic Effects & Resonance', order: 1, questionCount: 25 },
              { id: 'jm-chem-goc-isomerism', chapterId: 'jm-chem-organic', name: 'Optical & Geometrical Isomerism', order: 2, questionCount: 20 }
            ]
          }
        ]
      },
      {
        id: 'jm-mathematics',
        examId: 'jee-main',
        name: 'Mathematics',
        code: 'MATH',
        iconName: 'Pi',
        order: 3,
        chapters: [
          {
            id: 'jm-math-calculus',
            subjectId: 'jm-mathematics',
            name: 'Differential & Integral Calculus',
            order: 1,
            questionCount: 60,
            topics: [
              { id: 'jm-math-calc-limits', chapterId: 'jm-math-calculus', name: 'Limits, Continuity & Differentiability', order: 1, questionCount: 32 },
              { id: 'jm-math-calc-integrals', chapterId: 'jm-math-calculus', name: 'Definite Integrals & Properties', order: 2, questionCount: 28 }
            ]
          },
          {
            id: 'jm-math-algebra',
            subjectId: 'jm-mathematics',
            name: 'Algebra & Matrices',
            order: 2,
            questionCount: 48,
            topics: [
              { id: 'jm-math-alg-matrices', chapterId: 'jm-math-algebra', name: 'Determinants and Matrices', order: 1, questionCount: 26 },
              { id: 'jm-math-alg-complex', chapterId: 'jm-math-algebra', name: 'Complex Numbers and Quadratic Equations', order: 2, questionCount: 22 }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'jee-advanced',
    name: 'Joint Entrance Examination (Advanced)',
    shortName: 'JEE Advanced',
    description: 'Premier entrance examination for admission to Indian Institutes of Technology (IITs).',
    duration: 180,
    questionCount: 54,
    active: true,
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z',
    markingScheme: {
      correctMarks: 4,
      negativeMarks: 2,
      partialMarksAllowed: true,
      maxMarks: 180,
      description: 'Variable pattern including Multi-Correct (+4 / -2 with partial credit) and Numerical Value answers.'
    },
    subjects: [
      {
        id: 'ja-physics',
        examId: 'jee-advanced',
        name: 'Physics',
        code: 'PHY',
        iconName: 'Atom',
        order: 1,
        chapters: [
          {
            id: 'ja-phy-rotational',
            subjectId: 'ja-physics',
            name: 'Rotational Dynamics',
            order: 1,
            topics: [
              { id: 'ja-phy-rot-torque', chapterId: 'ja-phy-rotational', name: 'Torque & Angular Momentum Conservation', order: 1 }
            ]
          }
        ]
      },
      {
        id: 'ja-chemistry',
        examId: 'jee-advanced',
        name: 'Chemistry',
        code: 'CHEM',
        iconName: 'FlaskConical',
        order: 2,
        chapters: [
          {
            id: 'ja-chem-coord',
            subjectId: 'ja-chemistry',
            name: 'Coordination Compounds',
            order: 1,
            topics: [
              { id: 'ja-chem-coord-cft', chapterId: 'ja-chem-coord', name: 'Crystal Field Theory & Isomerism', order: 1 }
            ]
          }
        ]
      },
      {
        id: 'ja-mathematics',
        examId: 'jee-advanced',
        name: 'Mathematics',
        code: 'MATH',
        iconName: 'Pi',
        order: 3,
        chapters: [
          {
            id: 'ja-math-vectors',
            subjectId: 'ja-mathematics',
            name: 'Vectors & 3D Geometry',
            order: 1,
            topics: [
              { id: 'ja-math-vec-plane', chapterId: 'ja-math-vectors', name: 'Shortest Distance and Coplanarity', order: 1 }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'neet-ug',
    name: 'National Eligibility cum Entrance Test (UG)',
    shortName: 'NEET UG',
    description: 'All-India pre-medical entrance test for admission to MBBS, BDS, and AYUSH programs.',
    duration: 200,
    questionCount: 180,
    active: true,
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z',
    markingScheme: {
      correctMarks: 4,
      negativeMarks: 1,
      maxMarks: 720,
      description: '+4 for each correct answer, -1 penalty for wrong answer, 0 for unattempted.'
    },
    subjects: [
      {
        id: 'neet-biology',
        examId: 'neet-ug',
        name: 'Biology (Botany & Zoology)',
        code: 'BIO',
        iconName: 'Dna',
        order: 1,
        chapters: [
          {
            id: 'neet-bio-physiology',
            subjectId: 'neet-biology',
            name: 'Human Physiology',
            order: 1,
            questionCount: 70,
            topics: [
              { id: 'neet-bio-phys-neural', chapterId: 'neet-bio-physiology', name: 'Neural Control and Coordination', order: 1, questionCount: 35 },
              { id: 'neet-bio-phys-endocrine', chapterId: 'neet-bio-physiology', name: 'Chemical Coordination & Hormones', order: 2, questionCount: 35 }
            ]
          },
          {
            id: 'neet-bio-genetics',
            subjectId: 'neet-biology',
            name: 'Genetics and Molecular Biology',
            order: 2,
            questionCount: 65,
            topics: [
              { id: 'neet-bio-gen-mendel', chapterId: 'neet-bio-genetics', name: 'Principles of Inheritance & Variation', order: 1, questionCount: 35 },
              { id: 'neet-bio-gen-dna', chapterId: 'neet-bio-genetics', name: 'Molecular Basis of Inheritance', order: 2, questionCount: 30 }
            ]
          }
        ]
      },
      {
        id: 'neet-physics',
        examId: 'neet-ug',
        name: 'Physics',
        code: 'PHY',
        iconName: 'Atom',
        order: 2,
        chapters: [
          {
            id: 'neet-phy-optics',
            subjectId: 'neet-physics',
            name: 'Ray and Wave Optics',
            order: 1,
            questionCount: 40,
            topics: [
              { id: 'neet-phy-opt-refraction', chapterId: 'neet-phy-optics', name: 'Refraction through Lenses & Prisms', order: 1, questionCount: 22 },
              { id: 'neet-phy-opt-wave', chapterId: 'neet-phy-optics', name: "Young's Double Slit Experiment", order: 2, questionCount: 18 }
            ]
          }
        ]
      },
      {
        id: 'neet-chemistry',
        examId: 'neet-ug',
        name: 'Chemistry',
        code: 'CHEM',
        iconName: 'FlaskConical',
        order: 3,
        chapters: [
          {
            id: 'neet-chem-biomolecules',
            subjectId: 'neet-chemistry',
            name: 'Biomolecules & Polymers',
            order: 1,
            questionCount: 30,
            topics: [
              { id: 'neet-chem-bio-amino', chapterId: 'neet-chem-biomolecules', name: 'Amino Acids, Peptides & Proteins', order: 1, questionCount: 16 },
              { id: 'neet-chem-bio-carbo', chapterId: 'neet-chem-biomolecules', name: 'Carbohydrates & Nucleic Acids', order: 2, questionCount: 14 }
            ]
          }
        ]
      }
    ]
  }
];

export const DEMO_QUESTIONS: Question[] = [
  {
    id: 'q-demo-jm-1',
    examId: 'jee-main',
    subjectId: 'jm-mathematics',
    chapterId: 'jm-math-calculus',
    topicId: 'jm-math-calc-limits',
    questionType: 'SINGLE_CORRECT_MCQ',
    questionText: 'Evaluate the following standard limit:\n$$\\lim_{x \\to 0} \\frac{\\tan x - \\sin x}{x^3}$$',
    options: [
      { id: 'opt-1', label: 'A', text: '$$0$$' },
      { id: 'opt-2', label: 'B', text: '$$\\frac{1}{2}$$' },
      { id: 'opt-3', label: 'C', text: '$$1$$' },
      { id: 'opt-4', label: 'D', text: '$$2$$' }
    ],
    correctAnswer: 'B',
    explanation: 'Express $\\tan x$ as $\\frac{\\sin x}{\\cos x}$:\n$$\\frac{\\tan x - \\sin x}{x^3} = \\frac{\\sin x (1 - \\cos x)}{x^3 \\cos x} = \\left(\\frac{\\sin x}{x}\\right) \\cdot \\left(\\frac{1 - \\cos x}{x^2}\\right) \\cdot \\left(\\frac{1}{\\cos x}\\right)$$\nAs $x \\to 0$, $\\frac{\\sin x}{x} \\to 1$, $\\frac{1 - \\cos x}{x^2} \\to \\frac{1}{2}$, and $\\cos x \\to 1$.\nTherefore, the value of the limit is $1 \\cdot \\frac{1}{2} \\cdot 1 = \\frac{1}{2}$.',
    difficulty: 'MEDIUM',
    marks: 4,
    negativeMarks: 1,
    source: 'Demo Question',
    language: 'EN',
    tags: ['Calculus', 'Limits', 'Trigonometric Limits'],
    active: true,
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z'
  },
  {
    id: 'q-demo-jm-2',
    examId: 'jee-main',
    subjectId: 'jm-physics',
    chapterId: 'jm-phy-kinematics',
    topicId: 'jm-phy-kin-proj',
    questionType: 'SINGLE_CORRECT_MCQ',
    questionText: 'A particle is projected from the ground with velocity $u = 20\\text{ m/s}$ at an angle of $\\theta = 30^\\circ$ with the horizontal. Assuming $g = 10\\text{ m/s}^2$, what is the maximum height $H_{\\max}$ reached by the projectile?',
    options: [
      { id: 'opt-1', label: 'A', text: '$$2.5\\text{ m}$$' },
      { id: 'opt-2', label: 'B', text: '$$5.0\\text{ m}$$' },
      { id: 'opt-3', label: 'C', text: '$$10.0\\text{ m}$$' },
      { id: 'opt-4', label: 'D', text: '$$20.0\\text{ m}$$' }
    ],
    correctAnswer: 'B',
    explanation: 'The maximum height of a projectile is given by the formula:\n$$H_{\\max} = \\frac{u^2 \\sin^2 \\theta}{2g}$$\nSubstituting the values:\n$$H_{\\max} = \\frac{(20)^2 \\sin^2(30^\\circ)}{2 \\times 10} = \\frac{400 \\times (0.5)^2}{20} = \\frac{400 \\times 0.25}{20} = \\frac{100}{20} = 5.0\\text{ m}$$',
    difficulty: 'EASY',
    marks: 4,
    negativeMarks: 1,
    source: 'Demo Question',
    language: 'EN',
    tags: ['Kinematics', 'Projectile Motion'],
    active: true,
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z'
  },
  {
    id: 'q-demo-jm-3',
    examId: 'jee-main',
    subjectId: 'jm-chemistry',
    chapterId: 'jm-chem-physical',
    topicId: 'jm-chem-eq-lechatelier',
    questionType: 'NUMERICAL_ANSWER',
    questionText: 'For a first-order reaction $A \\to B$, the rate constant is $k = 0.0693\\text{ min}^{-1}$. Calculate the half-life $t_{1/2}$ of the reaction in minutes.',
    options: [],
    correctAnswer: '10',
    explanation: 'For a first order chemical reaction, the half-life $t_{1/2}$ is inversely proportional to the rate constant $k$:\n$$t_{1/2} = \\frac{\\ln 2}{k} = \\frac{0.693}{0.0693\\text{ min}^{-1}} = 10\\text{ min}$$\nHence, the exact numerical value is 10.',
    difficulty: 'EASY',
    marks: 4,
    negativeMarks: 0,
    source: 'Demo Question',
    language: 'EN',
    tags: ['Chemical Kinetics', 'Half-Life'],
    active: true,
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z'
  },
  {
    id: 'q-demo-neet-1',
    examId: 'neet-ug',
    subjectId: 'neet-biology',
    chapterId: 'neet-bio-genetics',
    topicId: 'neet-bio-gen-mendel',
    questionType: 'SINGLE_CORRECT_MCQ',
    questionText: 'In a dihybrid cross of garden pea plants according to Mendel\'s Law of Independent Assortment, what is the expected phenotypic ratio in the $F_2$ generation?',
    options: [
      { id: 'opt-1', label: 'A', text: '$$3:1$$' },
      { id: 'opt-2', label: 'B', text: '$$9:3:3:1$$' },
      { id: 'opt-3', label: 'C', text: '$$1:2:1$$' },
      { id: 'opt-4', label: 'D', text: '$$9:7$$' }
    ],
    correctAnswer: 'B',
    explanation: 'Mendel\'s dihybrid cross between two heterozygous individuals $(RrYy \\times RrYy)$ yields 16 combinations resulting in a classic phenotypic ratio of $9:3:3:1$ (9 Round Yellow, 3 Round Green, 3 Wrinkled Yellow, 1 Wrinkled Green).',
    difficulty: 'EASY',
    marks: 4,
    negativeMarks: 1,
    source: 'Demo Question',
    language: 'EN',
    tags: ['Genetics', 'Mendelian Genetics', 'Dihybrid Cross'],
    active: true,
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z'
  },
  {
    id: 'q-demo-neet-2',
    examId: 'neet-ug',
    subjectId: 'neet-biology',
    chapterId: 'neet-bio-physiology',
    topicId: 'neet-bio-phys-neural',
    questionType: 'ASSERTION_REASON',
    assertion: 'During depolarization of a nerve axon membrane, the interior of the axon develops a positive charge relative to the extracellular fluid.',
    reason: 'Rapid influx of $Na^+$ ions occurs through voltage-gated sodium channels along the concentration and electrical gradient.',
    questionText: 'Given the Assertion and Reason above, select the correct option:',
    options: [
      { id: 'opt-1', label: 'A', text: 'Both Assertion and Reason are true, and Reason is the correct explanation of Assertion.' },
      { id: 'opt-2', label: 'B', text: 'Both Assertion and Reason are true, but Reason is NOT the correct explanation of Assertion.' },
      { id: 'opt-3', label: 'C', text: 'Assertion is true, but Reason is false.' },
      { id: 'opt-4', label: 'D', text: 'Both Assertion and Reason are false.' }
    ],
    correctAnswer: 'A',
    explanation: 'Upon stimulation, the membrane permeability to $Na^+$ increases markedly. $Na^+$ rushes into the intracellular axoplasm down both its chemical and electrical gradient, causing reversal of polarity (depolarization) from $-70\\text{ mV}$ to $+30\\text{ mV}$. Thus both statements are true and Reason directly explains Assertion.',
    difficulty: 'MEDIUM',
    marks: 4,
    negativeMarks: 1,
    source: 'Demo Question',
    language: 'EN',
    tags: ['Human Physiology', 'Nervous System', 'Action Potential'],
    active: true,
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z'
  }
];

export const DEMO_TESTS: Test[] = [
  {
    id: 'test-jm-full-01',
    examId: 'jee-main',
    title: 'JEE Main 2026 - Comprehensive Diagnostic Mock Test 01',
    description: 'Full-syllabus diagnostic simulation matching the latest NTA testing pattern with Section A (MCQs) and Section B (Numerical).',
    durationMinutes: 180,
    totalMarks: 300,
    totalQuestions: 75,
    isFullMock: true,
    active: true,
    createdAt: '2026-01-15T00:00:00Z',
    questions: DEMO_QUESTIONS.filter(q => q.examId === 'jee-main')
  },
  {
    id: 'test-neet-full-01',
    examId: 'neet-ug',
    title: 'NEET UG 2026 - High-Yield Full Mock 01',
    description: 'Realistic NEET practice test focusing on NCERT-aligned Biology, Conceptual Chemistry, and Applied Physics.',
    durationMinutes: 200,
    totalMarks: 720,
    totalQuestions: 180,
    isFullMock: true,
    active: true,
    createdAt: '2026-01-20T00:00:00Z',
    questions: DEMO_QUESTIONS.filter(q => q.examId === 'neet-ug')
  }
];

export const DEMO_STUDENT: User = {
  id: 'usr-demo-student',
  name: 'Aarav Sharma',
  email: 'aarav.sharma@example.edu',
  role: 'STUDENT',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
  targetExamId: 'jee-main',
  targetYear: 2026,
  createdAt: '2026-01-10T00:00:00Z',
  updatedAt: '2026-01-10T00:00:00Z'
};

export const DEMO_ADMIN: User = {
  id: 'usr-demo-admin',
  name: 'Dr. Radhika Verma',
  email: 'admin.verma@examforge.internal',
  role: 'ADMIN',
  avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
  createdAt: '2025-12-01T00:00:00Z',
  updatedAt: '2026-01-01T00:00:00Z'
};

export const DEMO_STUDENT_ANALYTICS: StudentAnalytics = {
  userId: 'usr-demo-student',
  totalQuestionsAttempted: 342,
  totalQuestionsSolved: 268,
  overallAccuracy: 78.4,
  averageSolvingTimeSeconds: 84,
  testsCompletedCount: 6,
  bestScorePercentage: 82.0,
  practiceStreakDays: 14,
  lastActiveDate: '2026-09-19',
  recentTestScores: [
    { testTitle: 'JEE Main Diagnostic 01', date: 'Sep 14', score: 218, maxScore: 300, percentage: 72.6 },
    { testTitle: 'Physics Sectional: Kinematics', date: 'Sep 16', score: 88, maxScore: 100, percentage: 88.0 },
    { testTitle: 'Chemistry Sectional: Physical', date: 'Sep 18', score: 76, maxScore: 100, percentage: 76.0 }
  ],
  subjectAccuracies: [
    { subjectId: 'jm-physics', subjectName: 'Physics', questionsAttempted: 130, questionsCorrect: 104, accuracy: 80.0, averageTimeSeconds: 92 },
    { subjectId: 'jm-chemistry', subjectName: 'Chemistry', questionsAttempted: 112, questionsCorrect: 92, accuracy: 82.1, averageTimeSeconds: 65 },
    { subjectId: 'jm-mathematics', subjectName: 'Mathematics', questionsAttempted: 100, questionsCorrect: 72, accuracy: 72.0, averageTimeSeconds: 110 }
  ],
  chapterAccuracies: [
    { chapterId: 'jm-phy-kinematics', chapterName: 'Kinematics & Motion', subjectName: 'Physics', questionsAttempted: 42, questionsCorrect: 38, accuracy: 90.4 },
    { chapterId: 'jm-chem-physical', chapterName: 'Equilibrium & Kinetics', subjectName: 'Chemistry', questionsAttempted: 35, questionsCorrect: 29, accuracy: 82.8 },
    { chapterId: 'jm-math-calculus', chapterName: 'Differential Calculus', subjectName: 'Mathematics', questionsAttempted: 60, questionsCorrect: 41, accuracy: 68.3 }
  ],
  bookmarkedCount: 18,
  incorrectQuestionsCount: 24
};
