import React from 'react';
import { Target, CheckCircle, Clock, Award } from 'lucide-react';
import { Card } from '../common/Card';
import { StudentStats } from '../../types/studentDashboard';

interface StatCardsProps {
  stats: StudentStats | null;
  examShortName: string;
}

export const StatCards: React.FC<StatCardsProps> = ({ stats, examShortName }) => {
  const isZero = !stats || stats.questionsAttempted === 0;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      
      {/* Accuracy Card */}
      <Card className="p-3.5 sm:p-4.5 bg-white border-slate-200/90 shadow-xs hover:border-slate-300 transition-all">
        <div className="flex items-center justify-between text-slate-500 mb-1.5 sm:mb-2">
          <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-slate-500">
            Accuracy
          </span>
          <Target className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 shrink-0" />
        </div>
        <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-tight">
          {isZero ? '--' : `${stats.accuracy}%`}
        </div>
        <p className="text-[10px] sm:text-[11px] text-slate-500 mt-1 leading-normal">
          {isZero ? 'No questions attempted yet' : `${stats.questionsSolved} correct of ${stats.questionsAttempted}`}
        </p>
      </Card>

      {/* Questions Solved Card */}
      <Card className="p-3.5 sm:p-4.5 bg-white border-slate-200/90 shadow-xs hover:border-slate-300 transition-all">
        <div className="flex items-center justify-between text-slate-500 mb-1.5 sm:mb-2">
          <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-slate-500">
            Questions Solved
          </span>
          <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-600 shrink-0" />
        </div>
        <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-tight">
          {isZero ? 0 : stats.questionsSolved}
        </div>
        <p className="text-[10px] sm:text-[11px] text-slate-500 mt-1 leading-normal">
          {isZero ? 'of 0 attempted' : `of ${stats.questionsAttempted} attempted`}
        </p>
      </Card>

      {/* Average Speed Card */}
      <Card className="p-3.5 sm:p-4.5 bg-white border-slate-200/90 shadow-xs hover:border-slate-300 transition-all">
        <div className="flex items-center justify-between text-slate-500 mb-1.5 sm:mb-2">
          <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-slate-500">
            Avg Speed
          </span>
          <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600 shrink-0" />
        </div>
        <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-tight">
          {isZero ? '--' : `${stats.averageSpeedSeconds}s`}
        </div>
        <p className="text-[10px] sm:text-[11px] text-slate-500 mt-1 leading-normal">
          {isZero ? 'Solve to calculate' : `per question (target: <${stats.targetSpeedSeconds}s)`}
        </p>
      </Card>

      {/* Tests Completed Card */}
      <Card className="p-3.5 sm:p-4.5 bg-white border-slate-200/90 shadow-xs hover:border-slate-300 transition-all">
        <div className="flex items-center justify-between text-slate-500 mb-1.5 sm:mb-2">
          <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-slate-500">
            Tests Completed
          </span>
          <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-600 shrink-0" />
        </div>
        <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-tight">
          {isZero ? 0 : stats.testsCompleted}
        </div>
        <p className="text-[10px] sm:text-[11px] text-slate-500 mt-1 leading-normal">
          {isZero ? '0 mocks submitted' : `of ${stats.assignedTests} assigned mocks`}
        </p>
      </Card>

    </div>
  );
};
