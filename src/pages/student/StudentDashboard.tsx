import React, { useState, useEffect } from 'react';
import { 
  Flame, 
  Target, 
  Clock, 
  CheckCircle, 
  ArrowRight, 
  BookOpen, 
  AlertCircle, 
  Bookmark, 
  Sparkles, 
  Play, 
  Award,
  Layers,
  RotateCcw,
  SlidersHorizontal
} from 'lucide-react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { useAuth } from '../../context/AuthContext';
import { useExam } from '../../context/ExamContext';
import { dataService } from '../../services/dataService';
import { StudentDashboardData } from '../../types/studentDashboard';
import { ActiveTargetSelector } from '../../components/dashboard/ActiveTargetSelector';
import { StatCards } from '../../components/dashboard/StatCard';
import { ContinuePracticeCard } from '../../components/dashboard/ContinuePracticeCard';
import { FocusAreasCard } from '../../components/dashboard/FocusAreasCard';
import { RecentTestsCard } from '../../components/dashboard/RecentTestsCard';

interface StudentDashboardProps {
  onStartPractice: (mode: string) => void;
  onOpenTests: () => void;
  onOpenAnalytics: () => void;
  onOpenIncorrect: () => void;
  onOpenBookmarks: () => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  onStartPractice,
  onOpenTests,
  onOpenAnalytics,
  onOpenIncorrect,
  onOpenBookmarks
}) => {
  const { user } = useAuth();
  const { activeExam } = useExam();

  // State toggle for reviewing Demo Data vs. Brand New User Empty State
  const [simulateEmptyState, setSimulateEmptyState] = useState<boolean>(false);
  const [dashboardData, setDashboardData] = useState<StudentDashboardData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Custom drill modal state
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const [configSubjectId, setConfigSubjectId] = useState('');
  const [configDifficulty, setConfigDifficulty] = useState<'ALL' | 'EASY' | 'MEDIUM' | 'HARD'>('ALL');
  const [configCount, setConfigCount] = useState<number>(10);

  // Synchronize dashboard data when activeExam or simulateEmptyState changes
  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    dataService.getStudentDashboardData(user?.id || 'demo-user', activeExam.id, simulateEmptyState)
      .then(data => {
        if (isMounted) {
          setDashboardData(data);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [activeExam.id, simulateEmptyState, user?.id]);

  useEffect(() => {
    if (activeExam.subjects[0]?.id) {
      setConfigSubjectId(activeExam.subjects[0].id);
    }
  }, [activeExam]);

  const stats = dashboardData?.stats || null;
  const isBrandNewUser = !dashboardData?.hasActivity || !stats || stats.questionsAttempted === 0;

  return (
    <div className="space-y-5 sm:space-y-6">
      
      {/* 1. Active Target Exam Bar */}
      <ActiveTargetSelector />

      {/* State Preview Toggle Bar (Demonstrates both populated student record and empty new-user state) */}
      <div className="bg-slate-100/80 border border-slate-200/80 rounded-xl px-3 py-2 flex flex-col xs:flex-row items-start xs:items-center justify-between gap-2 text-xs text-slate-600">
        <span className="text-[11px] font-medium text-slate-500 flex items-center gap-1.5">
          <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
          <span>Dashboard Preview Mode:</span>
        </span>
        <div className="flex items-center gap-1 p-0.5 bg-white rounded-lg border border-slate-200 text-[11px]">
          <button
            type="button"
            onClick={() => setSimulateEmptyState(false)}
            className={`px-2.5 py-1 rounded-md font-semibold transition-colors ${
              !simulateEmptyState
                ? 'bg-indigo-600 text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Aarav (Active Student Data)
          </button>
          <button
            type="button"
            onClick={() => setSimulateEmptyState(true)}
            className={`px-2.5 py-1 rounded-md font-semibold transition-colors ${
              simulateEmptyState
                ? 'bg-slate-900 text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            New Student (Empty State)
          </button>
        </div>
      </div>

      {/* 2. Welcome / Hero Section */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950 rounded-2xl p-5 sm:p-6 text-white shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
        <div className="space-y-1.5 min-w-0">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-white/10 text-indigo-200 text-xs font-semibold">
            <Flame className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>
              {isBrandNewUser
                ? `Day 1 • Target: ${activeExam.shortName}`
                : `${stats?.practiceStreakDays || 14} Day Practice Streak • Target: ${activeExam.shortName}`}
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white leading-tight">
            Welcome back, {user?.name.split(' ')[0] || 'Aspirant'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
            {isBrandNewUser
              ? `Begin your ${activeExam.name} journey with your first practice drill to establish your baseline accuracy.`
              : `You've solved ${stats?.questionsSolved} questions with an overall accuracy of ${stats?.accuracy}%.`}
          </p>
        </div>

        <div className="flex items-center gap-2.5 w-full md:w-auto shrink-0">
          <Button
            variant="secondary"
            size="md"
            onClick={() => onStartPractice('QUICK')}
            leftIcon={<Play className="w-4 h-4 fill-slate-900" />}
            className="flex-1 md:flex-none"
          >
            Quick 10Q Drill
          </Button>
          <Button
            variant="outline"
            size="md"
            onClick={onOpenTests}
            className="flex-1 md:flex-none bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            Take Full Mock
          </Button>
        </div>
      </div>

      {/* 3. Quick Actions (Quick Drill, Full Mock, Compact Weak Areas) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        
        <button
          onClick={() => onStartPractice('QUICK')}
          className="bg-white p-3.5 rounded-xl border border-slate-200/90 hover:border-indigo-300 hover:bg-indigo-50/20 transition-all text-left shadow-xs flex items-center justify-between group"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Sparkles className="w-4 h-4 text-indigo-600" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-slate-900 group-hover:text-indigo-900 leading-tight">
                Quick Drill
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5 truncate">
                10 mixed questions
              </div>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 shrink-0 ml-2" />
        </button>

        <button
          onClick={onOpenTests}
          className="bg-white p-3.5 rounded-xl border border-slate-200/90 hover:border-indigo-300 hover:bg-indigo-50/20 transition-all text-left shadow-xs flex items-center justify-between group"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Clock className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-slate-900 group-hover:text-emerald-900 leading-tight">
                Full Mock
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5 truncate">
                {activeExam.duration}m timed simulation
              </div>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 shrink-0 ml-2" />
        </button>

        <button
          onClick={() => {
            if (isBrandNewUser) {
              onStartPractice('QUICK');
            } else {
              onStartPractice('CHAPTER');
            }
          }}
          className="bg-white p-3.5 rounded-xl border border-slate-200/90 hover:border-amber-300 hover:bg-amber-50/20 transition-all text-left shadow-xs flex items-center justify-between group"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <AlertCircle className="w-4 h-4 text-amber-600" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-slate-900 group-hover:text-amber-900 leading-tight">
                Practice Weak Areas
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5 truncate">
                {isBrandNewUser ? 'Complete 10Q to detect' : 'Target lowest accuracy'}
              </div>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600 shrink-0 ml-2" />
        </button>

      </div>

      {/* 4. Performance Overview (4 Stat Cards) */}
      <StatCards
        stats={stats}
        examShortName={activeExam.shortName}
      />

      {/* 5. Continue Practice Section */}
      <ContinuePracticeCard
        item={dashboardData?.continuePractice || null}
        onContinue={(chapterId) => onStartPractice('CHAPTER')}
        onStartNew={() => onStartPractice('QUICK')}
      />

      {/* 6. Focus Areas Section */}
      <FocusAreasCard
        items={dashboardData?.focusAreas || []}
        onViewAnalysis={onOpenAnalytics}
        onPracticeTopic={(topic) => onStartPractice('CHAPTER')}
      />

      {/* 7. Recent Tests Section */}
      <RecentTestsCard
        tests={dashboardData?.recentTests || []}
        onOpenTests={onOpenTests}
      />

      {/* Quick Revision Pool Shortcuts (Bookmarks & Incorrect Question Bank) */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-1">
        <button
          onClick={onOpenIncorrect}
          className="bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200/90 hover:border-rose-300 hover:bg-rose-50/20 transition-all text-left shadow-xs group"
        >
          <div className="flex items-center justify-between mb-1.5">
            <AlertCircle className="w-4 h-4 text-rose-600" />
            <Badge variant="danger" size="sm">
              {isBrandNewUser ? 0 : 24}
            </Badge>
          </div>
          <div className="text-xs font-bold text-slate-900 group-hover:text-rose-900">
            Incorrect Pool
          </div>
          <div className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5">
            Revise failed questions
          </div>
        </button>

        <button
          onClick={onOpenBookmarks}
          className="bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200/90 hover:border-amber-300 hover:bg-amber-50/20 transition-all text-left shadow-xs group"
        >
          <div className="flex items-center justify-between mb-1.5">
            <Bookmark className="w-4 h-4 text-amber-600" />
            <Badge variant="warning" size="sm">
              {isBrandNewUser ? 0 : 18}
            </Badge>
          </div>
          <div className="text-xs font-bold text-slate-900 group-hover:text-amber-900">
            Saved Bookmarks
          </div>
          <div className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5">
            Review marked questions
          </div>
        </button>
      </div>

    </div>
  );
};
