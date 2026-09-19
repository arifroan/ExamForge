import React from 'react';
import { Target, CheckCircle2, ChevronRight } from 'lucide-react';
import { useExam } from '../../context/ExamContext';
import { Badge } from '../common/Badge';

interface ActiveTargetSelectorProps {
  onExamChange?: (examId: string) => void;
}

export const ActiveTargetSelector: React.FC<ActiveTargetSelectorProps> = ({ onExamChange }) => {
  const { exams, activeExam, setActiveExamId } = useExam();

  const handleSelectExam = (id: string) => {
    setActiveExamId(id);
    if (onExamChange) onExamChange(id);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 p-3 sm:p-4 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        
        {/* Left: Active Target Indicator */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-700 shrink-0">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-extrabold text-slate-900 tracking-tight">
                {activeExam.name}
              </span>
              <Badge variant="primary" size="sm" className="hidden xs:inline-flex">
                Active Target
              </Badge>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              {activeExam.questionCount} Questions • {activeExam.duration} Minutes • {activeExam.markingScheme.description.split('.')[0]}
            </p>
          </div>
        </div>

        {/* Right: Supported 3 Exams Segmented Switcher */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg w-full sm:w-auto">
          {exams.map((exam) => {
            const isSelected = exam.id === activeExam.id;
            return (
              <button
                key={exam.id}
                type="button"
                onClick={() => handleSelectExam(exam.id)}
                className={`flex-1 sm:flex-none px-3 py-1.5 rounded-md text-xs font-bold transition-all text-center whitespace-nowrap ${
                  isSelected
                    ? 'bg-white text-slate-900 shadow-xs border border-slate-200/80'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
                aria-pressed={isSelected}
              >
                {isSelected && (
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-indigo-600 mr-1.5 align-middle" />
                )}
                <span>{exam.shortName}</span>
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
};
