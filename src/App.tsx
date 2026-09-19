import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ExamProvider, useExam } from './context/ExamContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { StudentLayout } from './components/layout/StudentLayout';
import { AdminLayout } from './components/layout/AdminLayout';

// Public Pages
import { LandingPage } from './pages/public/LandingPage';
import { ExamsPage } from './pages/public/ExamsPage';
import { FeaturesPage } from './pages/public/FeaturesPage';
import { AuthPage } from './pages/public/AuthPage';

// Student Pages
import { StudentDashboard } from './pages/student/StudentDashboard';
import { PracticeViewShell } from './pages/student/PracticeViewShell';
import { MockTestsListShell } from './pages/student/MockTestsListShell';
import { MockTestShell } from './pages/student/MockTestShell';
import { TestResultShell } from './pages/student/TestResultShell';
import { AnalyticsShell } from './pages/student/AnalyticsShell';
import { QuestionBankShell } from './pages/student/QuestionBankShell';
import { BookmarksIncorrectShell } from './pages/student/BookmarksIncorrectShell';
import { StudentSettingsShell } from './pages/student/StudentSettingsShell';

// Admin Pages
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { TestResultReport } from './types/test';

type NavigationRoute = 
  | 'landing' 
  | 'exams' 
  | 'features' 
  | 'auth'
  | 'student-dashboard'
  | 'student-practice'
  | 'student-mock-tests'
  | 'student-mock-active'
  | 'student-test-result'
  | 'student-analytics'
  | 'student-question-bank'
  | 'student-bookmarks'
  | 'student-incorrect'
  | 'student-settings'
  | 'admin-dashboard'
  | 'admin-questions'
  | 'admin-tests'
  | 'admin-users';

const AppContent: React.FC = () => {
  const { user, isAuthenticated, loginAsStudent, loginAsAdmin } = useAuth();
  const { activeExam, setActiveExamId } = useExam();

  const [currentRoute, setCurrentRoute] = useState<NavigationRoute>('landing');
  const [practiceMode, setPracticeMode] = useState<string>('QUICK');
  const [latestTestReport, setLatestTestReport] = useState<TestResultReport | null>(null);

  const handleStartPracticing = (mode: string = 'QUICK') => {
    setPracticeMode(mode);
    if (!isAuthenticated) {
      // Auto-authenticate as demo student for immediate frictionless testing
      loginAsStudent();
    }
    setCurrentRoute('student-practice');
  };

  const handleOpenTests = () => {
    if (!isAuthenticated) {
      loginAsStudent();
    }
    setCurrentRoute('student-mock-tests');
  };

  const handleLaunchMock = () => {
    if (!isAuthenticated) {
      loginAsStudent();
    }
    setCurrentRoute('student-mock-active');
  };

  const handleFinishMock = (report: TestResultReport) => {
    setLatestTestReport(report);
    setCurrentRoute('student-test-result');
  };

  // Render Full Screen Mock Simulator (No navbar/footer to replicate real testing environment)
  if (currentRoute === 'student-mock-active') {
    return (
      <MockTestShell
        onExitTest={() => setCurrentRoute('student-mock-tests')}
        onFinishTest={handleFinishMock}
      />
    );
  }

  // Determine layout wrapper based on route
  const isStudentRoute = currentRoute.startsWith('student-');
  const isAdminRoute = currentRoute.startsWith('admin-');

  // If student area
  if (isStudentRoute && isAuthenticated && user?.role === 'STUDENT') {
    const studentTab = currentRoute.replace('student-', '') as any;
    return (
      <StudentLayout
        currentTab={studentTab}
        onSelectTab={(tab) => {
          if (tab === 'dashboard') setCurrentRoute('student-dashboard');
          else if (tab === 'practice') setCurrentRoute('student-practice');
          else if (tab === 'tests') setCurrentRoute('student-mock-tests');
          else if (tab === 'analytics') setCurrentRoute('student-analytics');
          else if (tab === 'questions') setCurrentRoute('student-question-bank');
          else if (tab === 'bookmarks') setCurrentRoute('student-bookmarks');
          else if (tab === 'incorrect') setCurrentRoute('student-incorrect');
          else if (tab === 'settings') setCurrentRoute('student-settings');
        }}
      >
        {currentRoute === 'student-dashboard' && (
          <StudentDashboard
            onStartPractice={handleStartPracticing}
            onOpenTests={handleOpenTests}
            onOpenAnalytics={() => setCurrentRoute('student-analytics')}
            onOpenIncorrect={() => setCurrentRoute('student-incorrect')}
            onOpenBookmarks={() => setCurrentRoute('student-bookmarks')}
          />
        )}

        {currentRoute === 'student-practice' && (
          <PracticeViewShell
            initialMode={practiceMode}
            onBackToDashboard={() => setCurrentRoute('student-dashboard')}
          />
        )}

        {currentRoute === 'student-mock-tests' && (
          <MockTestsListShell onLaunchTest={handleLaunchMock} />
        )}

        {currentRoute === 'student-test-result' && latestTestReport && (
          <TestResultShell
            report={latestTestReport}
            onRetake={handleLaunchMock}
            onPracticeWeak={() => handleStartPracticing('CHAPTER')}
            onBackToDashboard={() => setCurrentRoute('student-dashboard')}
          />
        )}

        {currentRoute === 'student-analytics' && (
          <AnalyticsShell onStartPractice={handleStartPracticing} />
        )}

        {currentRoute === 'student-question-bank' && (
          <QuestionBankShell onPracticeQuestion={() => handleStartPracticing('CUSTOM')} />
        )}

        {currentRoute === 'student-bookmarks' && (
          <BookmarksIncorrectShell
            initialType="BOOKMARKS"
            onStartPractice={handleStartPracticing}
          />
        )}

        {currentRoute === 'student-incorrect' && (
          <BookmarksIncorrectShell
            initialType="INCORRECT"
            onStartPractice={handleStartPracticing}
          />
        )}

        {currentRoute === 'student-settings' && (
          <StudentSettingsShell />
        )}
      </StudentLayout>
    );
  }

  // If admin area
  if (isAdminRoute && isAuthenticated && user?.role === 'ADMIN') {
    const adminTab = currentRoute.replace('admin-', '') as any;
    return (
      <AdminLayout
        currentTab={adminTab}
        onSelectTab={(tab) => {
          if (tab === 'admin-dashboard') setCurrentRoute('admin-dashboard');
          else if (tab === 'admin-questions') setCurrentRoute('admin-questions');
          else if (tab === 'admin-tests') setCurrentRoute('admin-tests');
          else if (tab === 'admin-users') setCurrentRoute('admin-users');
        }}
        onExitAdmin={() => setCurrentRoute('student-dashboard')}
      >
        {currentRoute === 'admin-dashboard' && (
          <AdminDashboard
            onNavigateTab={(tab) => setCurrentRoute(tab as NavigationRoute)}
          />
        )}
        {currentRoute === 'admin-questions' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900">Question Management Repository</h2>
              <span className="text-xs text-slate-500">Add, verify, and tag questions</span>
            </div>
            <QuestionBankShell onPracticeQuestion={() => {}} />
          </div>
        )}
        {currentRoute === 'admin-tests' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900">Mock Examination Management</h2>
            <MockTestsListShell onLaunchTest={() => setCurrentRoute('student-mock-active')} />
          </div>
        )}
        {currentRoute === 'admin-users' && (
          <div className="p-8 bg-white rounded-xl border border-slate-200 text-center space-y-3">
            <h3 className="text-base font-bold text-slate-900">Registered Student Cohort</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              1,248 active students across JEE Main, JEE Advanced, and NEET. Telemetry updates real-time.
            </p>
          </div>
        )}
      </AdminLayout>
    );
  }

  // Public Marketing / Exploration Layout
  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans selection:bg-slate-900 selection:text-white">
      <Navbar
        currentView={currentRoute}
        onNavigate={(route: string) => setCurrentRoute(route as NavigationRoute)}
      />

      <main className="flex-1">
        {currentRoute === 'landing' && (
          <LandingPage
            onStartPracticing={() => handleStartPracticing('QUICK')}
            onExploreTests={handleOpenTests}
            onSelectExam={(examId) => {
              setActiveExamId(examId);
              setCurrentRoute('exams');
            }}
          />
        )}

        {currentRoute === 'exams' && (
          <ExamsPage
            onSelectExam={(examId) => setActiveExamId(examId)}
            onStartPracticing={() => handleStartPracticing('CHAPTER')}
          />
        )}

        {currentRoute === 'features' && (
          <FeaturesPage
            onStartPracticing={() => handleStartPracticing('QUICK')}
          />
        )}

        {currentRoute === 'auth' && (
          <AuthPage
            onSuccess={() => {
              if (user?.role === 'ADMIN') {
                setCurrentRoute('admin-dashboard');
              } else {
                setCurrentRoute('student-dashboard');
              }
            }}
          />
        )}
      </main>

      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <ExamProvider>
        <AppContent />
      </ExamProvider>
    </AuthProvider>
  );
}
