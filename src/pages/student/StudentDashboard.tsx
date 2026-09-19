import React from 'react';
import { 
  Flame, 
  Target, 
  Clock, 
  CheckCircle, 
  ArrowRight, 
  BookOpen, 
  AlertCircle, 
  Bookmark, 
  Layers, 
  TrendingUp,
  Award,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { useAuth } from '../../context/AuthContext';
import { useExam } from '../../context/ExamContext';
import { DEMO_STUDENT_ANALYTICS, DEMO_TESTS } from '../../db/mockData';

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
  const analytics = DEMO_STUDENT_ANALYTICS;

  return (
    <div className="space-y-6">
      
      {/* Welcome & Readiness Strip */}
      <div className="bg-gradient-to-r from-slate-900 to-indigo-950 rounded-2xl p-6 text-white shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-white/10 text-indigo-200 text-xs font-semibold">
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span>{analytics.practiceStreakDays} Day Streak • On Track for {activeExam.shortName}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
            Welcome back, {user?.name.split(' ')[0]}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            You've solved <strong className="text-white">{analytics.totalQuestionsSolved}</strong> questions with an overall accuracy of <strong className="text-emerald-400">{analytics.overallAccuracy}%</strong>.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <Button
            variant="secondary"
            size="md"
            onClick={() => onStartPractice('QUICK')}
            rightIcon={<ArrowRight className="w-4 h-4" />}
            className="w-full md:w-auto"
          >
            Quick 10Q Drill
          </Button>
          <Button
            variant="outline"
            size="md"
            onClick={onOpenTests}
            className="w-full md:w-auto bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            Take Full Mock
          </Button>
        </div>
      </div>

      {/* 4 Essential Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <Card className="p-4.5">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Accuracy</span>
            <Target className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 tracking-tight">
            {analytics.overallAccuracy}%
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            +3.2% from last 50 questions
          </p>
        </Card>

        <Card className="p-4.5">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Questions Solved</span>
            <CheckCircle className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 tracking-tight">
            {analytics.totalQuestionsSolved}
            <span className="text-xs font-medium text-slate-400 ml-1">/ {analytics.totalQuestionsAttempted}</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Across {activeExam.subjects.length} subjects
          </p>
        </Card>

        <Card className="p-4.5">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Avg Speed</span>
            <Clock className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 tracking-tight">
            {analytics.averageSolvingTimeSeconds}s
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Ideal: &lt;90s for {activeExam.shortName}
          </p>
        </Card>

        <Card className="p-4.5">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Tests Completed</span>
            <Award className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 tracking-tight">
            {analytics.testsCompletedCount}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Best score: {analytics.bestScorePercentage}%
          </p>
        </Card>

      </div>

      {/* Main Grid: Subject Breakdown + Action Hub */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Subject Mastery Progress (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          <Card className="p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Subject Accuracy & Mastery</h3>
                <p className="text-xs text-slate-500">Based on your recent attempts in {activeExam.name}</p>
              </div>
              <button 
                onClick={onOpenAnalytics}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
              >
                Detailed Breakdown &rarr;
              </button>
            </div>

            <div className="space-y-4">
              {analytics.subjectAccuracies.map(sub => (
                <div key={sub.subjectId} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-800">{sub.subjectName}</span>
                    <span className="font-bold text-slate-900">{sub.accuracy}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        sub.accuracy >= 80 ? 'bg-emerald-500' : sub.accuracy >= 70 ? 'bg-indigo-500' : 'bg-amber-500'
                      }`}
                      style={{ width: `${sub.accuracy}%` }}
                    ></div>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span>{sub.questionsCorrect} of {sub.questionsAttempted} correct</span>
                    <span>Avg {sub.averageTimeSeconds}s / question</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Weak Chapter Spotlight */}
            <div className="mt-6 pt-4 border-t border-slate-100 bg-amber-50/50 rounded-lg p-3.5 border border-amber-200/60 flex items-start gap-3">
              <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <div className="text-xs">
                <span className="font-bold text-amber-900">Weak Area Detected: </span>
                <span className="text-amber-800">
                  Differential Calculus has 68.3% accuracy. We recommend revising limits and continuity before your next mock.
                </span>
                <div className="mt-2">
                  <button
                    onClick={() => onStartPractice('CHAPTER')}
                    className="font-bold text-amber-900 underline hover:text-amber-950"
                  >
                    Drill Differential Calculus Questions &rarr;
                  </button>
                </div>
              </div>
            </div>
          </Card>

          {/* Recent Mock Test Performances */}
          <Card className="p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Recent Test Performances</h3>
                <p className="text-xs text-slate-500">Timed simulations evaluated with {activeExam.shortName} scheme</p>
              </div>
              <button 
                onClick={onOpenTests}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
              >
                All Tests
              </button>
            </div>

            <div className="space-y-3">
              {analytics.recentTestScores.map((score, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200/70 text-xs">
                  <div>
                    <div className="font-semibold text-slate-900">{score.testTitle}</div>
                    <div className="text-[11px] text-slate-500">{score.date} • {score.score} / {score.maxScore} marks</div>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-slate-900 text-sm">{score.percentage}%</span>
                    <Badge variant={score.percentage >= 75 ? 'success' : 'primary'} size="sm" className="ml-2">
                      Score
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Practice Launch Hub (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <Card className="p-5">
            <h3 className="text-sm font-bold text-slate-900 mb-1">Practice Launchpad</h3>
            <p className="text-xs text-slate-500 mb-4">Select an active training flow</p>

            <div className="space-y-2.5">
              <button
                onClick={() => onStartPractice('QUICK')}
                className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/30 transition-all text-left group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs">
                    10Q
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 group-hover:text-indigo-900">
                      Quick Practice Drill
                    </div>
                    <div className="text-[11px] text-slate-500">10 mixed questions with instant solutions</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600" />
              </button>

              <button
                onClick={() => onStartPractice('CHAPTER')}
                className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/30 transition-all text-left group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 group-hover:text-indigo-900">
                      Chapter & Topic Practice
                    </div>
                    <div className="text-[11px] text-slate-500">Pick any chapter or sub-topic to master</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600" />
              </button>

              <button
                onClick={() => onStartPractice('CUSTOM')}
                className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/30 transition-all text-left group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 group-hover:text-indigo-900">
                      Custom Practice Generator
                    </div>
                    <div className="text-[11px] text-slate-500">Configure difficulty, types, and count</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600" />
              </button>
            </div>
          </Card>

          {/* Quick Access Pools */}
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={onOpenIncorrect}
              className="bg-white p-4 rounded-xl border border-slate-200 hover:border-rose-300 hover:bg-rose-50/30 transition-all text-left shadow-xs group"
            >
              <div className="flex items-center justify-between mb-2">
                <AlertCircle className="w-4 h-4 text-rose-600" />
                <Badge variant="danger" size="sm">{analytics.incorrectQuestionsCount}</Badge>
              </div>
              <div className="text-xs font-bold text-slate-900 group-hover:text-rose-900">
                Incorrect Pool
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">Revise failed questions</div>
            </button>

            <button
              onClick={onOpenBookmarks}
              className="bg-white p-4 rounded-xl border border-slate-200 hover:border-amber-300 hover:bg-amber-50/30 transition-all text-left shadow-xs group"
            >
              <div className="flex items-center justify-between mb-2">
                <Bookmark className="w-4 h-4 text-amber-600" />
                <Badge variant="warning" size="sm">{analytics.bookmarkedCount}</Badge>
              </div>
              <div className="text-xs font-bold text-slate-900 group-hover:text-amber-900">
                Bookmarks
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">Review saved problems</div>
            </button>
          </div>

          {/* Active Full Mock Available */}
          <Card className="p-4.5 bg-slate-900 text-white">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="text-indigo-300 font-semibold uppercase tracking-wider">Upcoming Simulation</span>
              <Badge variant="neutral" size="sm">{activeExam.duration} Min</Badge>
            </div>
            <h4 className="text-sm font-bold text-white mb-1">
              {DEMO_TESTS.find(t => t.examId === activeExam.id)?.title || `${activeExam.shortName} Full Mock 01`}
            </h4>
            <p className="text-[11px] text-slate-400 mb-4">
              Real examination timing with auto-submission, question palette, and negative marking analysis.
            </p>
            <Button
              variant="secondary"
              size="sm"
              className="w-full"
              onClick={onOpenTests}
            >
              Launch Exam Interface
            </Button>
          </Card>
        </div>

      </div>

    </div>
  );
};
