import React from 'react';
import { ArrowRight, Clock, Award, CheckCircle2 } from 'lucide-react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { RecentTestItem } from '../../types/studentDashboard';

interface RecentTestsCardProps {
  tests: RecentTestItem[];
  onOpenTests: () => void;
  onViewReport?: (testId: string) => void;
}

export const RecentTestsCard: React.FC<RecentTestsCardProps> = ({
  tests,
  onOpenTests,
  onViewReport
}) => {
  return (
    <Card className="p-4 sm:p-5 bg-white border-slate-200/90 shadow-xs">
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-xs sm:text-sm font-bold text-slate-900">Recent Tests</h3>
            <span className="text-[10px] bg-slate-100 text-slate-600 font-semibold px-1.5 py-0.5 rounded">
              Simulated Records
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Past attempts evaluated with official marking scheme penalties.
          </p>
        </div>
        <button
          onClick={onOpenTests}
          className="hidden sm:flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
        >
          <span>All tests</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {tests.length === 0 ? (
        <div className="p-4 bg-slate-50 rounded-xl border border-dashed border-slate-200 text-center space-y-2">
          <p className="text-xs font-semibold text-slate-700">No Mock Tests Attempted Yet</p>
          <p className="text-[11px] text-slate-500 max-w-sm mx-auto">
            Take a timed mock exam to benchmark your performance against official exam question counts and negative marks.
          </p>
          <div className="pt-1">
            <Button
              variant="outline"
              size="sm"
              onClick={onOpenTests}
            >
              Browse Available Mocks
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-2.5">
          {tests.map((test) => (
            <div
              key={test.id}
              className="p-3 rounded-xl bg-slate-50/70 border border-slate-200/70 hover:border-slate-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
            >
              <div className="space-y-0.5 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 truncate">
                    {test.testTitle}
                  </span>
                  <Badge variant="neutral" size="sm">
                    {test.examShortName}
                  </Badge>
                </div>
                <div className="text-[11px] text-slate-500 flex items-center gap-3">
                  <span>Score: <strong className="text-slate-800 font-semibold">{test.score} / {test.maxScore}</strong></span>
                  <span>•</span>
                  <span>Accuracy: <strong className="text-emerald-700 font-semibold">{test.accuracy}%</strong></span>
                  <span>•</span>
                  <span>{test.timeAgo}</span>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-2 pt-1 sm:pt-0 border-t sm:border-0 border-slate-200/50">
                <span className="text-[11px] font-bold text-slate-600 bg-white px-2 py-1 rounded border border-slate-200">
                  {Math.round((test.score / test.maxScore) * 100)}% marks
                </span>
                <button
                  onClick={onOpenTests}
                  className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
                >
                  Review &rarr;
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Mobile view all link */}
      <div className="mt-3 sm:hidden pt-2 border-t border-slate-100 flex justify-end">
        <button
          onClick={onOpenTests}
          className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
        >
          <span>All tests & history</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </Card>
  );
};
