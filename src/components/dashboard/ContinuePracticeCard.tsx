import React from 'react';
import { ArrowRight, BookOpen, Sparkles, Play } from 'lucide-react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { ContinuePracticeItem } from '../../types/studentDashboard';

interface ContinuePracticeCardProps {
  item: ContinuePracticeItem | null;
  onContinue: (chapterId?: string) => void;
  onStartNew: () => void;
}

export const ContinuePracticeCard: React.FC<ContinuePracticeCardProps> = ({
  item,
  onContinue,
  onStartNew
}) => {
  if (!item) {
    return (
      <Card className="p-4 sm:p-5 bg-white border-slate-200/90 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-indigo-600" />
            <span>Continue Practice</span>
          </h3>
          <Badge variant="neutral" size="sm">No Active Session</Badge>
        </div>
        <div className="bg-slate-50 rounded-xl p-4 border border-dashed border-slate-200 text-center space-y-2.5">
          <p className="text-xs text-slate-600 max-w-md mx-auto">
            You don't have an in-progress practice set. Choose a chapter to begin structured question drills.
          </p>
          <Button
            variant="primary"
            size="sm"
            onClick={onStartNew}
            rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
          >
            Start New Practice Session
          </Button>
        </div>
      </Card>
    );
  }

  const progressPercent = Math.min(
    100,
    Math.round((item.completedQuestions / Math.max(1, item.totalQuestions)) * 100)
  );

  return (
    <Card className="p-4 sm:p-5 bg-white border-slate-200/90 shadow-xs hover:border-slate-300 transition-all">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-indigo-50 text-indigo-700 flex items-center justify-center">
            <BookOpen className="w-3.5 h-3.5" />
          </div>
          <h3 className="text-xs sm:text-sm font-bold text-slate-900">Continue Practice</h3>
        </div>
        <Badge variant="primary" size="sm">In Progress</Badge>
      </div>

      <div className="bg-slate-50/80 rounded-xl p-3.5 sm:p-4 border border-slate-200/80 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                {item.subjectName}
              </span>
              {item.topicName && (
                <span className="text-[11px] text-slate-500 hidden sm:inline truncate max-w-[200px]">
                  • {item.topicName}
                </span>
              )}
            </div>
            <h4 className="text-sm font-bold text-slate-900 mt-1">
              {item.chapterName}
            </h4>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-xs font-bold text-slate-800">
              {item.completedQuestions} / {item.totalQuestions} questions completed
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1">
          <div className="w-full bg-slate-200/80 rounded-full h-2 overflow-hidden">
            <div
              className="bg-indigo-600 h-full rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex justify-between text-[10px] text-slate-400 font-medium">
            <span>Progress: {progressPercent}%</span>
            <span>{item.totalQuestions - item.completedQuestions} questions remaining</span>
          </div>
        </div>

        {/* CTA button */}
        <div className="pt-1 flex items-center justify-end">
          <Button
            variant="primary"
            size="sm"
            onClick={() => onContinue(item.chapterId)}
            rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
            className="w-full sm:w-auto"
          >
            Continue Practice &rarr;
          </Button>
        </div>
      </div>
    </Card>
  );
};
