import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  Flag, 
  CheckCircle, 
  ArrowLeft, 
  ArrowRight, 
  RotateCcw, 
  AlertCircle, 
  Check, 
  Menu, 
  X,
  Award
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { MathView } from '../../components/common/MathView';
import { useExam } from '../../context/ExamContext';
import { DEMO_TESTS, DEMO_QUESTIONS } from '../../db/mockData';
import { QuestionPaletteStatus, TestAnswerRecord, TestResultReport } from '../../types/test';

interface MockTestShellProps {
  onExitTest: () => void;
  onFinishTest: (report: TestResultReport) => void;
}

export const MockTestShell: React.FC<MockTestShellProps> = ({ onExitTest, onFinishTest }) => {
  const { activeExam } = useExam();
  const activeTest = DEMO_TESTS.find(t => t.examId === activeExam.id) || DEMO_TESTS[0];

  const questions = activeTest.questions.length > 0 ? activeTest.questions : DEMO_QUESTIONS;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, TestAnswerRecord>>(() => {
    const initial: Record<string, TestAnswerRecord> = {};
    questions.forEach((q, idx) => {
      initial[q.id] = {
        questionId: q.id,
        selectedAnswer: null,
        status: idx === 0 ? 'NOT_ANSWERED' : 'NOT_VISITED',
        timeSpentSeconds: 0
      };
    });
    return initial;
  });

  // 180 min countdown simulation (initialized to 179m 50s for testing realism)
  const [secondsRemaining, setSecondsRemaining] = useState(activeTest.durationMinutes * 60);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isPaletteDrawerOpen, setIsPaletteDrawerOpen] = useState(false);

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const currentQ = questions[currentIndex];
  const currentRecord = answers[currentQ?.id] || {
    questionId: currentQ?.id,
    selectedAnswer: null,
    status: 'NOT_ANSWERED',
    timeSpentSeconds: 0
  };

  const handleSelectOption = (label: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentQ.id]: {
        ...prev[currentQ.id],
        selectedAnswer: label,
        status: prev[currentQ.id].status === 'MARKED_FOR_REVIEW' || prev[currentQ.id].status === 'ANSWERED_AND_MARKED'
          ? 'ANSWERED_AND_MARKED'
          : 'ANSWERED'
      }
    }));
  };

  const handleClearResponse = () => {
    setAnswers(prev => ({
      ...prev,
      [currentQ.id]: {
        ...prev[currentQ.id],
        selectedAnswer: null,
        status: 'NOT_ANSWERED'
      }
    }));
  };

  const handleSaveAndNext = () => {
    if (currentIndex < questions.length - 1) {
      navigateToQuestion(currentIndex + 1);
    }
  };

  const handleMarkForReviewAndNext = () => {
    setAnswers(prev => {
      const hasAnswer = !!prev[currentQ.id].selectedAnswer;
      return {
        ...prev,
        [currentQ.id]: {
          ...prev[currentQ.id],
          status: hasAnswer ? 'ANSWERED_AND_MARKED' : 'MARKED_FOR_REVIEW'
        }
      };
    });
    if (currentIndex < questions.length - 1) {
      navigateToQuestion(currentIndex + 1);
    }
  };

  const navigateToQuestion = (index: number) => {
    setAnswers(prev => {
      const targetQ = questions[index];
      const targetRecord = prev[targetQ.id];
      if (targetRecord.status === 'NOT_VISITED') {
        return {
          ...prev,
          [targetQ.id]: {
            ...targetRecord,
            status: 'NOT_ANSWERED'
          }
        };
      }
      return prev;
    });
    setCurrentIndex(index);
    setIsPaletteDrawerOpen(false);
  };

  // Palette counts
  const answeredCount = Object.values(answers).filter(a => a.status === 'ANSWERED').length;
  const markedCount = Object.values(answers).filter(a => a.status === 'MARKED_FOR_REVIEW').length;
  const answeredAndMarkedCount = Object.values(answers).filter(a => a.status === 'ANSWERED_AND_MARKED').length;
  const notAnsweredCount = Object.values(answers).filter(a => a.status === 'NOT_ANSWERED').length;
  const notVisitedCount = Object.values(answers).filter(a => a.status === 'NOT_VISITED').length;

  const handleSubmitTest = () => {
    // Deterministic Scoring Engine computation (Section 9 & 10)
    let correctCount = 0;
    let incorrectCount = 0;
    let unattemptedCount = 0;
    let totalScore = 0;

    const evaluatedAnswers: Record<string, TestAnswerRecord> = {};

    questions.forEach(q => {
      const rec = answers[q.id];
      const selected = rec?.selectedAnswer;

      if (!selected) {
        unattemptedCount++;
        evaluatedAnswers[q.id] = { ...rec, isCorrect: false, marksAwarded: 0 };
      } else if (String(selected).trim() === String(q.correctAnswer).trim()) {
        correctCount++;
        totalScore += q.marks;
        evaluatedAnswers[q.id] = { ...rec, isCorrect: true, marksAwarded: q.marks };
      } else {
        incorrectCount++;
        totalScore -= q.negativeMarks;
        evaluatedAnswers[q.id] = { ...rec, isCorrect: false, marksAwarded: -q.negativeMarks };
      }
    });

    const maxScore = questions.reduce((acc, q) => acc + q.marks, 0);
    const attemptedCount = correctCount + incorrectCount;
    const accuracy = attemptedCount > 0 ? (correctCount / attemptedCount) * 100 : 0;
    const percentage = maxScore > 0 ? Math.max(0, (totalScore / maxScore) * 100) : 0;

    const report: TestResultReport = {
      test: activeTest,
      attempt: {
        id: `att-${Date.now()}`,
        testId: activeTest.id,
        userId: 'usr-demo-student',
        startedAt: new Date(Date.now() - 3600000).toISOString(),
        completedAt: new Date().toISOString(),
        timeUsedSeconds: activeTest.durationMinutes * 60 - secondsRemaining,
        totalScore,
        maxScore,
        percentage: Number(percentage.toFixed(1)),
        accuracy: Number(accuracy.toFixed(1)),
        correctCount,
        incorrectCount,
        unattemptedCount,
        answers: evaluatedAnswers
      },
      subjectBreakdown: activeExam.subjects.map(s => ({
        name: s.name,
        total: 25,
        attempted: 20,
        correct: 16,
        incorrect: 4,
        accuracy: 80,
        score: 60
      })),
      chapterBreakdown: [
        { name: 'Kinematics & Motion', total: 5, attempted: 5, correct: 4, incorrect: 1, accuracy: 80, score: 15 },
        { name: 'Chemical Equilibrium', total: 5, attempted: 4, correct: 3, incorrect: 1, accuracy: 75, score: 11 },
        { name: 'Differential Calculus', total: 5, attempted: 4, correct: 3, incorrect: 1, accuracy: 75, score: 11 }
      ],
      difficultyBreakdown: [
        { name: 'EASY', total: 2, attempted: 2, correct: 2, incorrect: 0, accuracy: 100, score: 8 },
        { name: 'MEDIUM', total: 2, attempted: 2, correct: 1, incorrect: 1, accuracy: 50, score: 3 },
        { name: 'HARD', total: 1, attempted: 0, correct: 0, incorrect: 0, accuracy: 0, score: 0 }
      ],
      questionTypeBreakdown: [
        { name: 'Single Correct MCQ', total: 3, attempted: 3, correct: 2, incorrect: 1, accuracy: 66.7, score: 7 },
        { name: 'Numerical Answer', total: 1, attempted: 1, correct: 1, incorrect: 0, accuracy: 100, score: 4 }
      ],
      averageTimePerQuestionSeconds: 78
    };

    setIsSubmitModalOpen(false);
    onFinishTest(report);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col -m-4 sm:-m-6 lg:-m-8">
      
      {/* Test Engine Header Bar */}
      <div className="sticky top-0 z-30 bg-slate-900 text-white px-4 py-3 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <span className="font-bold text-sm tracking-tight text-white">{activeTest.title}</span>
          <Badge variant="neutral" size="sm">{activeExam.shortName}</Badge>
        </div>

        <div className="flex items-center gap-4">
          {/* Real-time Countdown Timer */}
          <div className="flex items-center gap-2 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700">
            <Clock className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span className="font-mono font-bold text-sm text-emerald-400">
              {formatTimer(secondsRemaining)}
            </span>
          </div>

          <Button
            variant="danger"
            size="sm"
            onClick={() => setIsSubmitModalOpen(true)}
          >
            Submit Test
          </Button>

          {/* Palette toggle button for mobile */}
          <button
            onClick={() => setIsPaletteDrawerOpen(!isPaletteDrawerOpen)}
            className="lg:hidden p-1.5 rounded bg-slate-800 text-slate-300 hover:text-white"
            aria-label="Toggle Question Palette"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Layout: Question Area + Palette Sidebar */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left 8 Cols: Question Display & Answer Controls */}
        <div className="lg:col-span-8 space-y-4">
          
          <Card className="p-6 sm:p-8 space-y-6">
            
            {/* Section & Question Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-slate-900">Question {currentIndex + 1}</span>
                <Badge variant="primary" size="sm">
                  {currentQ.questionType.replace(/_/g, ' ')}
                </Badge>
              </div>
              <div className="text-xs text-slate-600 font-semibold">
                Marks: <span className="text-emerald-700 font-bold">+{currentQ.marks}</span> / <span className="text-rose-600 font-bold">-{currentQ.negativeMarks}</span>
              </div>
            </div>

            {/* Assertion Reason Text */}
            {currentQ.assertion && (
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-2 text-xs">
                <div><strong className="text-slate-900">Assertion (A): </strong><MathView content={currentQ.assertion} /></div>
                <div><strong className="text-slate-900">Reason (R): </strong><MathView content={currentQ.reason || ''} /></div>
              </div>
            )}

            {/* Question Text */}
            <div className="text-sm sm:text-base text-slate-900 font-medium leading-relaxed">
              <MathView content={currentQ.questionText} />
            </div>

            {/* Options */}
            <div className="space-y-3 pt-2">
              {currentQ.options.map(opt => {
                const isSelected = currentRecord.selectedAnswer === opt.label;
                return (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectOption(opt.label)}
                    className={`w-full flex items-start gap-3.5 p-4 rounded-xl border text-left text-xs sm:text-sm transition-all ${
                      isSelected
                        ? 'bg-indigo-50/80 border-indigo-500 text-indigo-950 font-semibold shadow-xs'
                        : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50'
                    }`}
                  >
                    <span
                      className={`w-6 h-6 rounded-md flex items-center justify-center font-bold text-xs shrink-0 ${
                        isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700'
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

            {/* Action Bar: Save & Next, Mark For Review, Clear */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-6 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleClearResponse}
                  disabled={!currentRecord.selectedAnswer}
                  leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
                >
                  Clear Response
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleMarkForReviewAndNext}
                  className="border-purple-300 text-purple-700 hover:bg-purple-50"
                  leftIcon={<Flag className="w-3.5 h-3.5 text-purple-600" />}
                >
                  Mark for Review & Next
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="secondary"
                  size="md"
                  onClick={handleSaveAndNext}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Save & Next
                </Button>
              </div>
            </div>

          </Card>

          {/* Previous / Next Bar */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateToQuestion(Math.max(0, currentIndex - 1))}
              disabled={currentIndex === 0}
              leftIcon={<ArrowLeft className="w-4 h-4" />}
            >
              Previous Question
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateToQuestion(Math.min(questions.length - 1, currentIndex + 1))}
              disabled={currentIndex === questions.length - 1}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Next Question
            </Button>
          </div>

        </div>

        {/* Right 4 Cols: Question Palette Sidebar */}
        <div className={`lg:col-span-4 space-y-4 ${isPaletteDrawerOpen ? 'fixed inset-y-0 right-0 z-50 w-80 bg-white p-4 shadow-2xl overflow-y-auto' : 'hidden lg:block'}`}>
          {isPaletteDrawerOpen && (
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-3">
              <span className="font-bold text-sm">Question Palette</span>
              <button onClick={() => setIsPaletteDrawerOpen(false)}><X className="w-5 h-5 text-slate-500" /></button>
            </div>
          )}

          <Card className="p-4 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Question Palette Status
            </h3>

            {/* Legend Grid */}
            <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600">
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded bg-emerald-500 text-white font-bold flex items-center justify-center text-[9px]">✓</span>
                <span>Answered ({answeredCount})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded bg-rose-500 text-white font-bold flex items-center justify-center text-[9px]">✕</span>
                <span>Not Answered ({notAnsweredCount})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded bg-purple-500 text-white font-bold flex items-center justify-center text-[9px]">⚑</span>
                <span>Review ({markedCount})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded bg-purple-700 border-2 border-emerald-400 text-white font-bold flex items-center justify-center text-[9px]">★</span>
                <span>Ans & Marked ({answeredAndMarkedCount})</span>
              </div>
              <div className="flex items-center gap-2 col-span-2">
                <span className="w-3.5 h-3.5 rounded bg-slate-200 text-slate-700 font-bold flex items-center justify-center text-[9px]">·</span>
                <span>Not Visited ({notVisitedCount})</span>
              </div>
            </div>

            {/* Question Matrix */}
            <div className="pt-2 border-t border-slate-100">
              <div className="text-xs font-semibold text-slate-700 mb-2">Jump to Question:</div>
              <div className="grid grid-cols-5 gap-2">
                {questions.map((q, idx) => {
                  const rec = answers[q.id];
                  const isCurrent = idx === currentIndex;

                  let bg = 'bg-slate-100 text-slate-700 border border-slate-200';
                  if (rec?.status === 'ANSWERED') bg = 'bg-emerald-600 text-white font-bold';
                  if (rec?.status === 'NOT_ANSWERED') bg = 'bg-rose-500 text-white font-bold';
                  if (rec?.status === 'MARKED_FOR_REVIEW') bg = 'bg-purple-600 text-white font-bold';
                  if (rec?.status === 'ANSWERED_AND_MARKED') bg = 'bg-purple-800 text-emerald-300 font-bold ring-2 ring-emerald-400';

                  return (
                    <button
                      key={q.id}
                      onClick={() => navigateToQuestion(idx)}
                      className={`h-9 rounded-lg text-xs font-semibold flex items-center justify-center transition-transform hover:scale-105 ${bg} ${
                        isCurrent ? 'ring-2 ring-slate-900 ring-offset-2' : ''
                      }`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <Button
                variant="primary"
                size="md"
                className="w-full"
                onClick={() => setIsSubmitModalOpen(true)}
              >
                Submit Examination
              </Button>
            </div>
          </Card>
        </div>

      </div>

      {/* Confirmation Before Final Submission Modal (Requirement #9) */}
      <Modal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        title="Confirm Examination Submission"
        description="Please review your attempt statistics before final evaluation."
      >
        <div className="space-y-4 text-xs">
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-600">Total Questions:</span>
              <span className="font-bold text-slate-900">{questions.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-emerald-700 font-medium">Answered:</span>
              <span className="font-bold text-emerald-700">{answeredCount + answeredAndMarkedCount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-purple-700 font-medium">Marked for Review:</span>
              <span className="font-bold text-purple-700">{markedCount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-rose-700 font-medium">Not Answered / Not Visited:</span>
              <span className="font-bold text-rose-700">{notAnsweredCount + notVisitedCount}</span>
            </div>
          </div>

          <p className="text-slate-500 leading-relaxed">
            Once submitted, your responses will be scored deterministically against the {activeExam.shortName} scheme (+{activeExam.markingScheme.correctMarks} / -{activeExam.markingScheme.negativeMarks}).
          </p>

          <div className="flex items-center justify-end gap-3 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsSubmitModalOpen(false)}
            >
              Resume Test
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={handleSubmitTest}
            >
              Yes, Submit & Evaluate
            </Button>
          </div>
        </div>
      </Modal>

    </div>
  );
};
