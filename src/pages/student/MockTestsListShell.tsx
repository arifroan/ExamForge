import React from 'react';
import { Clock, Award, CheckCircle2, ArrowRight, Play, ShieldAlert } from 'lucide-react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { DEMO_TESTS } from '../../db/mockData';
import { useExam } from '../../context/ExamContext';

interface MockTestsListShellProps {
  onLaunchTest: () => void;
}

export const MockTestsListShell: React.FC<MockTestsListShellProps> = ({ onLaunchTest }) => {
  const { activeExam } = useExam();

  const examTests = DEMO_TESTS.filter(t => t.examId === activeExam.id).length > 0
    ? DEMO_TESTS.filter(t => t.examId === activeExam.id)
    : DEMO_TESTS;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">{activeExam.shortName} Mock Examination Series</h2>
          <p className="text-xs text-slate-500">
            Strict timed simulations evaluated using official negative marking rules
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {examTests.map(test => (
          <Card key={test.id} className="p-6 space-y-4 hover:border-slate-300 transition-colors">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="primary" size="sm">Full Mock</Badge>
                  <Badge variant="neutral" size="sm">{test.durationMinutes} Minutes</Badge>
                  <span className="text-xs text-slate-500">{test.totalMarks} Maximum Marks</span>
                </div>
                <h3 className="text-base font-bold text-slate-900">{test.title}</h3>
              </div>

              <Button
                variant="secondary"
                size="md"
                onClick={onLaunchTest}
                leftIcon={<Play className="w-4 h-4 fill-current" />}
              >
                Launch Simulator
              </Button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              {test.description}
            </p>

            <div className="bg-slate-50 rounded-lg p-3 border border-slate-200/80 flex items-center justify-between text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-slate-500" />
                <span>Marking Formula: +{activeExam.markingScheme.correctMarks} / -{activeExam.markingScheme.negativeMarks}</span>
              </div>
              <span className="font-semibold text-slate-800">{activeExam.questionCount} Questions</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
