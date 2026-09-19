import React from 'react';
import { ArrowRight, AlertCircle, TrendingUp, Info } from 'lucide-react';
import { Card } from '../common/Card';
import { FocusAreaItem } from '../../types/studentDashboard';

interface FocusAreasCardProps {
  items: FocusAreaItem[];
  onViewAnalysis: () => void;
  onPracticeTopic?: (chapterName: string) => void;
}

export const FocusAreasCard: React.FC<FocusAreasCardProps> = ({
  items,
  onViewAnalysis,
  onPracticeTopic
}) => {
  return (
    <Card className="p-4 sm:p-5 bg-white border-slate-200/90 shadow-xs">
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-xs sm:text-sm font-bold text-slate-900">Focus Areas</h3>
            <span className="text-[10px] bg-slate-100 text-slate-600 font-semibold px-1.5 py-0.5 rounded">
              Demo Sample
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Suggested revision topics based on target syllabus accuracy trends.
          </p>
        </div>
        <button
          onClick={onViewAnalysis}
          className="hidden sm:flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
        >
          <span>View detailed analysis</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {items.length === 0 ? (
        <div className="p-4 bg-slate-50 rounded-xl border border-dashed border-slate-200 text-center space-y-1.5">
          <p className="text-xs font-semibold text-slate-700">No Weak Areas Identified Yet</p>
          <p className="text-[11px] text-slate-500 max-w-sm mx-auto">
            Solve at least 15-20 questions across different chapters to generate personalized focus area recommendations.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item) => {
            // Determine color palette by accuracy
            const isCritical = item.accuracy < 60;
            const isMedium = item.accuracy >= 60 && item.accuracy < 75;
            const barColor = isCritical ? 'bg-amber-500' : isMedium ? 'bg-indigo-500' : 'bg-emerald-500';
            const badgeBg = isCritical ? 'bg-amber-50 text-amber-800 border-amber-200' : 'bg-slate-50 text-slate-700 border-slate-200';

            return (
              <div
                key={item.id}
                className="p-3 rounded-xl bg-slate-50/60 border border-slate-200/70 hover:border-slate-300 transition-all space-y-1.5"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-xs font-bold text-slate-800 truncate">
                      {item.chapterName}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium shrink-0">
                      ({item.subjectName})
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs font-extrabold text-slate-900">
                      {item.accuracy}%
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">accuracy</span>
                  </div>
                </div>

                {/* Progress bar indicator */}
                <div className="w-full bg-slate-200/80 rounded-full h-1.5 overflow-hidden">
                  <div
                    className={`${barColor} h-full rounded-full transition-all duration-300`}
                    style={{ width: `${item.accuracy}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Mobile view analysis link */}
      <div className="mt-3 sm:hidden pt-2 border-t border-slate-100 flex justify-end">
        <button
          onClick={onViewAnalysis}
          className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
        >
          <span>View detailed analysis</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </Card>
  );
};
