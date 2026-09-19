import React from 'react';
import { 
  BarChart3, 
  Flame, 
  Target, 
  Clock, 
  Award, 
  BookOpen, 
  AlertCircle, 
  Bookmark,
  TrendingUp
} from 'lucide-react';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { DEMO_STUDENT_ANALYTICS } from '../../db/mockData';
import { useExam } from '../../context/ExamContext';

interface AnalyticsShellProps {
  onStartPractice: (mode: string) => void;
}

export const AnalyticsShell: React.FC<AnalyticsShellProps> = ({ onStartPractice }) => {
  const { activeExam } = useExam();
  const analytics = DEMO_STUDENT_ANALYTICS;

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-slate-900">Performance Analytics & Diagnostics</h2>
        <p className="text-xs text-slate-500">
          Continuous tracking across {activeExam.name} practice sessions and simulations
        </p>
      </div>

      {/* Main KPI Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="text-xs text-slate-500 font-semibold uppercase">Overall Accuracy</div>
          <div className="text-2xl font-black text-emerald-600 mt-1">{analytics.overallAccuracy}%</div>
          <span className="text-[11px] text-slate-500">{analytics.totalQuestionsSolved} / {analytics.totalQuestionsAttempted} correct</span>
        </Card>
        <Card className="p-4">
          <div className="text-xs text-slate-500 font-semibold uppercase">Solving Velocity</div>
          <div className="text-2xl font-black text-slate-900 mt-1">{analytics.averageSolvingTimeSeconds}s</div>
          <span className="text-[11px] text-slate-500">Target: &lt;90s per MCQ</span>
        </Card>
        <Card className="p-4">
          <div className="text-xs text-slate-500 font-semibold uppercase">Active Streak</div>
          <div className="text-2xl font-black text-amber-600 mt-1">{analytics.practiceStreakDays} Days</div>
          <span className="text-[11px] text-slate-500">Consistent daily review</span>
        </Card>
        <Card className="p-4">
          <div className="text-xs text-slate-500 font-semibold uppercase">Best Mock Score</div>
          <div className="text-2xl font-black text-indigo-600 mt-1">{analytics.bestScorePercentage}%</div>
          <span className="text-[11px] text-slate-500">{analytics.testsCompletedCount} full mocks completed</span>
        </Card>
      </div>

      {/* Chapter-wise Accuracy Breakdown */}
      <Card className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Chapter & Topic Mastery Matrix</h3>
            <p className="text-xs text-slate-500">Identifies strengths and prioritized revision candidates</p>
          </div>
          <Badge variant="primary" size="sm">Real Attempt Telemetry</Badge>
        </div>

        <div className="space-y-4">
          {analytics.chapterAccuracies.map(chap => (
            <div key={chap.chapterId} className="space-y-1.5 text-xs">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900">{chap.chapterName}</span>
                  <span className="text-slate-400 ml-2">({chap.subjectName})</span>
                </div>
                <div className="font-bold text-slate-800">
                  {chap.questionsCorrect}/{chap.questionsAttempted} ({chap.accuracy}%)
                </div>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    chap.accuracy >= 80
                      ? 'bg-emerald-500'
                      : chap.accuracy >= 70
                      ? 'bg-indigo-500'
                      : 'bg-amber-500'
                  }`}
                  style={{ width: `${chap.accuracy}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Actionable Recommendations */}
      <div className="bg-indigo-50/60 rounded-xl p-5 border border-indigo-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h4 className="text-sm font-bold text-indigo-950">Recommended Focus: Differential Calculus</h4>
          <p className="text-xs text-indigo-800">
            Accuracy in Differential Calculus is 68.3%. Boosting this by 12% will raise your projected {activeExam.shortName} percentile.
          </p>
        </div>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => onStartPractice('CHAPTER')}
        >
          Practice Chapter Now
        </Button>
      </div>

    </div>
  );
};
