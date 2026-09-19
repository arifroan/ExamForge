import React, { useState } from 'react';
import { 
  Award, 
  Target, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  ArrowRight, 
  RotateCcw, 
  BookOpen,
  Sparkles,
  Layers,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { MathView } from '../../components/common/MathView';
import { TestResultReport } from '../../types/test';

interface TestResultShellProps {
  report: TestResultReport;
  onRetake: () => void;
  onPracticeWeak: () => void;
  onBackToDashboard: () => void;
}

export const TestResultShell: React.FC<TestResultShellProps> = ({
  report,
  onRetake,
  onPracticeWeak,
  onBackToDashboard
}) => {
  const [activeView, setActiveView] = useState<'SUMMARY' | 'SOLUTIONS'>('SUMMARY');
  const [expandedSolutionId, setExpandedSolutionId] = useState<string | null>(null);

  const { attempt, test, subjectBreakdown, chapterBreakdown, difficultyBreakdown, questionTypeBreakdown } = report;

  const minutesUsed = Math.floor(attempt.timeUsedSeconds / 60);
  const secondsUsed = attempt.timeUsedSeconds % 60;

  return (
    <div className="space-y-8">
      
      {/* Top Banner Header */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
        <div className="space-y-2">
          <Badge variant="neutral" size="sm">Examination Completed</Badge>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Diagnostic Scorecard & Performance Analysis
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            {test.title} • Calculated using official deterministic formula
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="md"
            onClick={onBackToDashboard}
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            Dashboard
          </Button>
          <Button
            variant="secondary"
            size="md"
            onClick={onPracticeWeak}
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Practice Weak Areas
          </Button>
        </div>
      </div>

      {/* Main KPI Ribbon */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        <Card className="p-5">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Score Obtained</span>
          <div className="text-3xl font-black text-slate-900 tracking-tight mt-1">
            {attempt.totalScore}
            <span className="text-sm font-semibold text-slate-400 ml-1">/ {attempt.maxScore}</span>
          </div>
          <div className="mt-2">
            <Badge variant={attempt.percentage >= 70 ? 'success' : 'primary'} size="sm">
              {attempt.percentage}% Total Percentage
            </Badge>
          </div>
        </Card>

        <Card className="p-5">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Attempt Accuracy</span>
          <div className="text-3xl font-black text-emerald-600 tracking-tight mt-1">
            {attempt.accuracy}%
          </div>
          <p className="text-[11px] text-slate-500 mt-2">
            {attempt.correctCount} Correct • {attempt.incorrectCount} Incorrect
          </p>
        </Card>

        <Card className="p-5">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Time Consumed</span>
          <div className="text-3xl font-black text-slate-900 tracking-tight mt-1">
            {minutesUsed}m {secondsUsed}s
          </div>
          <p className="text-[11px] text-slate-500 mt-2">
            Avg {report.averageTimePerQuestionSeconds}s per question
          </p>
        </Card>

        <Card className="p-5">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Unattempted</span>
          <div className="text-3xl font-black text-slate-400 tracking-tight mt-1">
            {attempt.unattemptedCount}
          </div>
          <p className="text-[11px] text-slate-500 mt-2">
            Zero penalty incurred
          </p>
        </Card>

      </div>

      {/* View Switcher: Summary Breakdown vs Solutions Review */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
        <button
          onClick={() => setActiveView('SUMMARY')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors ${
            activeView === 'SUMMARY'
              ? 'bg-slate-900 text-white'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Performance Breakdown
        </button>
        <button
          onClick={() => setActiveView('SOLUTIONS')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors ${
            activeView === 'SOLUTIONS'
              ? 'bg-slate-900 text-white'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Review Answers & Solutions ({test.questions.length})
        </button>
      </div>

      {activeView === 'SUMMARY' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Subject Performance */}
          <Card className="p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-900">Subject Performance</h3>
            <div className="space-y-3">
              {subjectBreakdown.map((s, idx) => (
                <div key={idx} className="space-y-1 text-xs">
                  <div className="flex justify-between font-semibold">
                    <span className="text-slate-800">{s.name}</span>
                    <span className="text-slate-900">{s.accuracy}% Accuracy ({s.score} pts)</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div className="bg-indigo-600 h-full rounded-full" style={{ width: `${s.accuracy}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Chapter Breakdown */}
          <Card className="p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-900">Chapter Performance</h3>
            <div className="space-y-3">
              {chapterBreakdown.map((c, idx) => (
                <div key={idx} className="space-y-1 text-xs">
                  <div className="flex justify-between font-semibold">
                    <span className="text-slate-800">{c.name}</span>
                    <span className="text-slate-900">{c.accuracy}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${c.accuracy}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Difficulty Breakdown */}
          <Card className="p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-900">Difficulty Performance</h3>
            <div className="space-y-3">
              {difficultyBreakdown.map((d, idx) => (
                <div key={idx} className="space-y-1 text-xs">
                  <div className="flex justify-between font-semibold">
                    <span className="text-slate-800">{d.name}</span>
                    <span className="text-slate-900">{d.correct}/{d.attempted} ({d.accuracy}%)</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div className="bg-blue-500 h-full rounded-full" style={{ width: `${d.accuracy}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Question Type Breakdown */}
          <Card className="p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-900">Question-Type Performance</h3>
            <div className="space-y-3">
              {questionTypeBreakdown.map((q, idx) => (
                <div key={idx} className="space-y-1 text-xs">
                  <div className="flex justify-between font-semibold">
                    <span className="text-slate-800">{q.name}</span>
                    <span className="text-slate-900">{q.accuracy}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div className="bg-purple-600 h-full rounded-full" style={{ width: `${q.accuracy}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>

        </div>
      ) : (
        <div className="space-y-4">
          {test.questions.map((q, idx) => {
            const answerRec = attempt.answers[q.id];
            const isCorrect = answerRec?.isCorrect;
            const isUnattempted = !answerRec?.selectedAnswer;
            const isExpanded = expandedSolutionId === q.id;

            return (
              <Card key={q.id} className="p-5 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900">Question {idx + 1}</span>
                    <Badge variant="neutral" size="sm">{q.questionType.replace(/_/g, ' ')}</Badge>
                  </div>
                  <div>
                    {isCorrect ? (
                      <span className="font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                        Correct (+{q.marks})
                      </span>
                    ) : isUnattempted ? (
                      <span className="font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded border border-slate-200">
                        Unattempted (0)
                      </span>
                    ) : (
                      <span className="font-bold text-rose-700 bg-rose-50 px-2.5 py-1 rounded border border-rose-200">
                        Incorrect (-{q.negativeMarks})
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-xs sm:text-sm font-medium text-slate-900">
                  <MathView content={q.questionText} />
                </div>

                <div className="text-xs text-slate-600 flex items-center gap-4 pt-1">
                  <span>Your Answer: <strong className="text-slate-900">{String(answerRec?.selectedAnswer || 'None')}</strong></span>
                  <span>Correct Answer: <strong className="text-emerald-700">{String(q.correctAnswer)}</strong></span>
                </div>

                {/* Solution Toggle Accordion */}
                <div className="pt-2 border-t border-slate-100">
                  <button
                    onClick={() => setExpandedSolutionId(isExpanded ? null : q.id)}
                    className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                  >
                    <span>{isExpanded ? 'Hide Solution' : 'View Step-by-Step KaTeX Solution'}</span>
                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>

                  {isExpanded && (
                    <div className="mt-3 p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-2 animate-in fade-in duration-150">
                      <div className="font-bold text-slate-900 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                        <span>Solution Explanation:</span>
                      </div>
                      <MathView content={q.explanation} />
                    </div>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      )}

    </div>
  );
};
