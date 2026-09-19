import React, { useState } from 'react';
import { 
  Bookmark, 
  Flag, 
  ArrowLeft, 
  ArrowRight, 
  RotateCcw, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  Sparkles,
  Layers,
  Clock
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { MathView } from '../../components/common/MathView';
import { useExam } from '../../context/ExamContext';
import { DEMO_QUESTIONS } from '../../db/mockData';
import { Question } from '../../types/question';

interface PracticeViewShellProps {
  initialMode?: string;
  onBackToDashboard: () => void;
}

export const PracticeViewShell: React.FC<PracticeViewShellProps> = ({
  initialMode = 'QUICK',
  onBackToDashboard
}) => {
  const { activeExam } = useExam();

  // Filter questions for the active exam or fallback to all demo questions
  const questions: Question[] = DEMO_QUESTIONS.filter(q => q.examId === activeExam.id).length > 0
    ? DEMO_QUESTIONS.filter(q => q.examId === activeExam.id)
    : DEMO_QUESTIONS;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [submittedQuestions, setSubmittedQuestions] = useState<Record<string, boolean>>({});
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set());
  const [markedForReviewIds, setMarkedForReviewIds] = useState<Set<string>>(new Set());
  const [numericalInputs, setNumericalInputs] = useState<Record<string, string>>({});

  const currentQ = questions[currentIndex] || questions[0];
  const isSubmitted = !!submittedQuestions[currentQ?.id];
  const selectedAnswer = selectedAnswers[currentQ?.id];
  const isBookmarked = bookmarkedIds.has(currentQ?.id);
  const isMarkedForReview = markedForReviewIds.has(currentQ?.id);

  const handleSelectOption = (label: string) => {
    if (isSubmitted) return;
    setSelectedAnswers(prev => ({ ...prev, [currentQ.id]: label }));
  };

  const handleClearAnswer = () => {
    if (isSubmitted) return;
    setSelectedAnswers(prev => {
      const copy = { ...prev };
      delete copy[currentQ.id];
      return copy;
    });
    setNumericalInputs(prev => {
      const copy = { ...prev };
      delete copy[currentQ.id];
      return copy;
    });
  };

  const handleSubmitAnswer = () => {
    if (!selectedAnswer && !numericalInputs[currentQ.id]) return;
    setSubmittedQuestions(prev => ({ ...prev, [currentQ.id]: true }));
  };

  const toggleBookmark = () => {
    setBookmarkedIds(prev => {
      const next = new Set(prev);
      if (next.has(currentQ.id)) {
        next.delete(currentQ.id);
      } else {
        next.add(currentQ.id);
      }
      return next;
    });
  };

  const toggleMarkForReview = () => {
    setMarkedForReviewIds(prev => {
      const next = new Set(prev);
      if (next.has(currentQ.id)) {
        next.delete(currentQ.id);
      } else {
        next.add(currentQ.id);
      }
      return next;
    });
  };

  const isCorrect = currentQ.questionType === 'NUMERICAL_ANSWER'
    ? numericalInputs[currentQ.id]?.trim() === String(currentQ.correctAnswer).trim()
    : selectedAnswer === currentQ.correctAnswer;

  return (
    <div className="space-y-6">
      
      {/* Practice Header Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBackToDashboard}
            leftIcon={<ArrowLeft className="w-4 h-4" />}
          >
            Exit Practice
          </Button>
          <div className="h-4 w-px bg-slate-200 hidden sm:block"></div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-900">{activeExam.shortName} Practice</span>
              <Badge variant="primary" size="sm">Question {currentIndex + 1} of {questions.length}</Badge>
            </div>
            <span className="text-[11px] text-slate-500">Source: {currentQ.source}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleBookmark}
            className={`p-2 rounded-lg border transition-colors ${
              isBookmarked
                ? 'bg-amber-50 border-amber-300 text-amber-600'
                : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
            }`}
            title="Bookmark Question"
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-500' : ''}`} />
          </button>
          <button
            onClick={toggleMarkForReview}
            className={`p-2 rounded-lg border transition-colors ${
              isMarkedForReview
                ? 'bg-purple-50 border-purple-300 text-purple-600'
                : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
            }`}
            title="Mark for Review"
          >
            <Flag className={`w-4 h-4 ${isMarkedForReview ? 'fill-purple-500' : ''}`} />
          </button>
        </div>
      </div>

      {/* Main Question Card */}
      <Card className="p-6 sm:p-8 space-y-6">
        
        {/* Meta tags */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <Badge variant="neutral" size="sm">{currentQ.questionType.replace(/_/g, ' ')}</Badge>
            <Badge
              variant={
                currentQ.difficulty === 'EASY'
                  ? 'success'
                  : currentQ.difficulty === 'MEDIUM'
                  ? 'warning'
                  : 'danger'
              }
              size="sm"
            >
              {currentQ.difficulty}
            </Badge>
          </div>
          <div className="text-xs text-slate-500 font-semibold">
            Marking: <span className="text-emerald-700 font-bold">+{currentQ.marks}</span> / <span className="text-rose-600 font-bold">-{currentQ.negativeMarks}</span>
          </div>
        </div>

        {/* Assertion - Reason block if present */}
        {currentQ.assertion && (
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-2 text-xs">
            <div>
              <strong className="text-slate-900">Assertion (A): </strong>
              <MathView content={currentQ.assertion} />
            </div>
            <div>
              <strong className="text-slate-900">Reason (R): </strong>
              <MathView content={currentQ.reason || ''} />
            </div>
          </div>
        )}

        {/* Question Text with KaTeX Math Rendering */}
        <div className="text-sm sm:text-base text-slate-900 font-medium leading-relaxed">
          <MathView content={currentQ.questionText} />
        </div>

        {/* Options Selector or Numerical Input */}
        {currentQ.questionType === 'NUMERICAL_ANSWER' ? (
          <div className="space-y-3 py-2">
            <label className="block text-xs font-semibold text-slate-700">
              Enter Exact Numerical Value:
            </label>
            <input
              type="text"
              disabled={isSubmitted}
              value={numericalInputs[currentQ.id] || ''}
              onChange={(e) => setNumericalInputs({ ...numericalInputs, [currentQ.id]: e.target.value })}
              placeholder="e.g. 10 or 4.5"
              className="w-48 p-2.5 text-sm font-mono rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>
        ) : (
          <div className="space-y-3">
            {currentQ.options.map((opt) => {
              const isSelected = selectedAnswer === opt.label;
              const isOptionCorrect = opt.label === currentQ.correctAnswer;

              let optionStyle = 'bg-white border-slate-200 text-slate-800 hover:border-slate-300 hover:bg-slate-50/70';

              if (isSelected) {
                optionStyle = 'bg-indigo-50/70 border-indigo-400 text-indigo-900 font-semibold';
              }

              if (isSubmitted) {
                if (isOptionCorrect) {
                  optionStyle = 'bg-emerald-50 border-emerald-400 text-emerald-950 font-semibold';
                } else if (isSelected && !isOptionCorrect) {
                  optionStyle = 'bg-rose-50 border-rose-400 text-rose-950 font-semibold';
                }
              }

              return (
                <button
                  key={opt.id}
                  onClick={() => handleSelectOption(opt.label)}
                  disabled={isSubmitted}
                  className={`w-full flex items-start gap-3.5 p-4 rounded-xl border text-left text-xs sm:text-sm transition-all ${optionStyle}`}
                >
                  <span
                    className={`w-6 h-6 rounded-md flex items-center justify-center font-bold text-xs shrink-0 ${
                      isSelected
                        ? 'bg-indigo-600 text-white'
                        : isSubmitted && isOptionCorrect
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {opt.label}
                  </span>
                  <div className="flex-1 pt-0.5">
                    <MathView content={opt.text} />
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* Action Buttons: Clear, Submit */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <Button
            variant="outline"
            size="sm"
            onClick={handleClearAnswer}
            disabled={isSubmitted || (!selectedAnswer && !numericalInputs[currentQ.id])}
            leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
          >
            Clear Response
          </Button>

          {!isSubmitted ? (
            <Button
              variant="primary"
              size="md"
              onClick={handleSubmitAnswer}
              disabled={!selectedAnswer && !numericalInputs[currentQ.id]}
            >
              Submit & Check Solution
            </Button>
          ) : (
            <div className="flex items-center gap-2">
              {isCorrect ? (
                <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Correct (+{currentQ.marks} marks)
                </span>
              ) : (
                <span className="flex items-center gap-1.5 text-xs font-bold text-rose-700 bg-rose-50 px-3 py-1.5 rounded-lg border border-rose-200">
                  <XCircle className="w-4 h-4 text-rose-600" />
                  Incorrect (-{currentQ.negativeMarks} marks)
                </span>
              )}
            </div>
          )}
        </div>

        {/* Detailed Solution & KaTeX Explanation View */}
        {isSubmitted && (
          <div className="mt-6 p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3 animate-in fade-in duration-200">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>Detailed Step-by-Step Explanation</span>
            </div>
            <div className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              <MathView content={currentQ.explanation} />
            </div>
            <div className="pt-2 flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
              <span className="font-semibold">Concept Tags:</span>
              {currentQ.tags.map((t, idx) => (
                <span key={idx} className="bg-white px-2 py-0.5 rounded border border-slate-200 text-[11px]">
                  #{t}
                </span>
              ))}
            </div>
          </div>
        )}

      </Card>

      {/* Bottom Navigation Pagination */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="md"
          onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
          disabled={currentIndex === 0}
          leftIcon={<ArrowLeft className="w-4 h-4" />}
        >
          Previous
        </Button>

        <span className="text-xs text-slate-500 font-medium">
          Question {currentIndex + 1} of {questions.length}
        </span>

        <Button
          variant="primary"
          size="md"
          onClick={() => setCurrentIndex(Math.min(questions.length - 1, currentIndex + 1))}
          disabled={currentIndex === questions.length - 1}
          rightIcon={<ArrowRight className="w-4 h-4" />}
        >
          Next
        </Button>
      </div>

    </div>
  );
};
