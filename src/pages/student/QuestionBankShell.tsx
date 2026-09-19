import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  BookOpen, 
  ArrowRight, 
  CheckCircle2, 
  Layers, 
  RotateCcw 
} from 'lucide-react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { MathView } from '../../components/common/MathView';
import { DEMO_QUESTIONS } from '../../db/mockData';
import { useExam } from '../../context/ExamContext';
import { DifficultyLevel, QuestionType } from '../../types/question';

interface QuestionBankShellProps {
  onPracticeQuestion: (questionId: string) => void;
}

export const QuestionBankShell: React.FC<QuestionBankShellProps> = ({ onPracticeQuestion }) => {
  const { activeExam } = useExam();

  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('ALL');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('ALL');
  const [selectedType, setSelectedType] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const questions = DEMO_QUESTIONS.filter(q => {
    if (q.examId !== activeExam.id && q.examId !== 'jee-main') return false;
    if (selectedSubjectId !== 'ALL' && q.subjectId !== selectedSubjectId) return false;
    if (selectedDifficulty !== 'ALL' && q.difficulty !== selectedDifficulty) return false;
    if (selectedType !== 'ALL' && q.questionType !== selectedType) return false;
    if (searchQuery.trim()) {
      const qText = q.questionText.toLowerCase();
      const tags = q.tags.join(' ').toLowerCase();
      const query = searchQuery.toLowerCase();
      if (!qText.includes(query) && !tags.includes(query)) return false;
    }
    return true;
  });

  const handleResetFilters = () => {
    setSelectedSubjectId('ALL');
    setSelectedDifficulty('ALL');
    setSelectedType('ALL');
    setSearchQuery('');
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">{activeExam.shortName} Curated Question Bank</h2>
          <p className="text-xs text-slate-500">
            Search and filter through syllabus-aligned questions with verified answer keys and KaTeX solutions
          </p>
        </div>
      </div>

      {/* Filter Control Bar */}
      <Card className="p-4 space-y-3">
        <div className="flex flex-col md:flex-row gap-3">
          
          {/* Search Bar */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search concepts, equations, keywords (e.g. projectile, equilibrium)..."
              className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>

          {/* Subject Filter */}
          <select
            value={selectedSubjectId}
            onChange={(e) => setSelectedSubjectId(e.target.value)}
            className="px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-slate-900"
          >
            <option value="ALL">All Subjects</option>
            {activeExam.subjects.map(s => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>

          {/* Difficulty Filter */}
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-slate-900"
          >
            <option value="ALL">All Difficulties</option>
            <option value="EASY">Easy</option>
            <option value="MEDIUM">Medium</option>
            <option value="HARD">Hard</option>
          </select>

          {/* Type Filter */}
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-slate-900"
          >
            <option value="ALL">All Question Types</option>
            <option value="SINGLE_CORRECT_MCQ">Single Correct MCQ</option>
            <option value="MULTIPLE_CORRECT_MCQ">Multiple Correct MCQ</option>
            <option value="NUMERICAL_ANSWER">Numerical Answer</option>
            <option value="ASSERTION_REASON">Assertion - Reason</option>
          </select>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleResetFilters}
            leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
          >
            Reset
          </Button>

        </div>
      </Card>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-slate-500">
        <span>Showing <strong className="text-slate-900">{questions.length}</strong> matching questions</span>
        <span>Marking standard: +{activeExam.markingScheme.correctMarks} / -{activeExam.markingScheme.negativeMarks}</span>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {questions.length === 0 ? (
          <Card className="p-12 text-center text-slate-500 text-xs">
            <Layers className="w-8 h-8 mx-auto text-slate-300 mb-2" />
            <p className="font-bold text-slate-700">No questions match your filter criteria</p>
            <p className="mt-1">Try resetting the difficulty or search filters.</p>
          </Card>
        ) : (
          questions.map((q, idx) => (
            <Card key={q.id} className="p-5 sm:p-6 space-y-3 hover:border-slate-300 transition-colors">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-900">Q#{idx + 1}</span>
                  <Badge variant="neutral" size="sm">{q.questionType.replace(/_/g, ' ')}</Badge>
                  <Badge
                    variant={q.difficulty === 'EASY' ? 'success' : q.difficulty === 'MEDIUM' ? 'warning' : 'danger'}
                    size="sm"
                  >
                    {q.difficulty}
                  </Badge>
                </div>
                <div className="text-[11px] text-slate-400 font-medium">
                  Source: {q.source} • Marks: +{q.marks} / -{q.negativeMarks}
                </div>
              </div>

              {/* Question Text */}
              <div className="text-xs sm:text-sm font-medium text-slate-900 leading-relaxed">
                <MathView content={q.questionText} />
              </div>

              {/* Tags & Action */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
                <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-400">
                  {q.tags.map((t, i) => (
                    <span key={i} className="bg-slate-50 px-2 py-0.5 rounded border border-slate-200/80 text-[11px] text-slate-600">
                      #{t}
                    </span>
                  ))}
                </div>

                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => onPracticeQuestion(q.id)}
                  rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                >
                  Solve Problem
                </Button>
              </div>
            </Card>
          ))
        )}
      </div>

    </div>
  );
};
