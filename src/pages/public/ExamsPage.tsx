import React from 'react';
import { Badge } from '../../components/common/Badge';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { useExam } from '../../context/ExamContext';
import { ArrowRight, BookOpen, Clock, CheckCircle2 } from 'lucide-react';

interface ExamsPageProps {
  onSelectExam: (examId: string) => void;
  onStartPracticing: () => void;
}

export const ExamsPage: React.FC<ExamsPageProps> = ({ onSelectExam, onStartPracticing }) => {
  const { exams } = useExam();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      <div className="max-w-3xl">
        <Badge variant="primary" className="mb-2">Official Syllabus Architecture</Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Supported Competitive Examinations
        </h1>
        <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
          ExamForge organizes every question strictly under authentic taxonomies. Below is the active syllabus and marking scheme configuration for each examination.
        </p>
      </div>

      <div className="space-y-8">
        {exams.map(exam => (
          <Card key={exam.id} className="p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="px-3 py-1 rounded bg-slate-900 text-white font-bold text-xs">
                    {exam.shortName}
                  </span>
                  <Badge variant="neutral" size="sm">
                    {exam.duration} Minutes Duration
                  </Badge>
                  <Badge variant="success" size="sm">
                    {exam.questionCount} Questions / Test
                  </Badge>
                </div>
                <h2 className="text-xl font-bold text-slate-900">{exam.name}</h2>
              </div>

              <Button
                variant="primary"
                size="md"
                onClick={() => {
                  onSelectExam(exam.id);
                  onStartPracticing();
                }}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Practice {exam.shortName}
              </Button>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {exam.description}
            </p>

            {/* Marking Scheme Box */}
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/80">
              <div className="text-xs font-bold text-slate-800 mb-1">
                Deterministic Marking Scheme:
              </div>
              <p className="text-xs text-slate-600">
                {exam.markingScheme.description}
              </p>
            </div>

            {/* Subjects and Chapters */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Configured Subject & Chapter Taxonomy
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {exam.subjects.map(subject => (
                  <div key={subject.id} className="p-4 rounded-lg bg-white border border-slate-200/90 shadow-xs space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900">{subject.name}</span>
                      <span className="text-[10px] font-semibold text-slate-400 uppercase">{subject.code}</span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-slate-600">
                      {subject.chapters.map(chapter => (
                        <li key={chapter.id} className="flex items-start gap-1.5">
                          <span className="text-indigo-600">•</span>
                          <span>{chapter.name}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>

    </div>
  );
};
