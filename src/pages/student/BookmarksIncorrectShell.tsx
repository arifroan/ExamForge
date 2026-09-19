import React, { useState } from 'react';
import { 
  Bookmark, 
  AlertCircle, 
  Trash2, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  BookOpen 
} from 'lucide-react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { MathView } from '../../components/common/MathView';
import { DEMO_QUESTIONS } from '../../db/mockData';
import { useExam } from '../../context/ExamContext';

interface BookmarksIncorrectShellProps {
  initialType?: 'BOOKMARKS' | 'INCORRECT';
  onStartPractice: (mode: string) => void;
}

export const BookmarksIncorrectShell: React.FC<BookmarksIncorrectShellProps> = ({
  initialType = 'BOOKMARKS',
  onStartPractice
}) => {
  const [activeTab, setActiveTab] = useState<'BOOKMARKS' | 'INCORRECT'>(initialType);
  const { activeExam } = useExam();

  // Demo questions for active exam
  const examQuestions = DEMO_QUESTIONS.filter(q => q.examId === activeExam.id).length > 0
    ? DEMO_QUESTIONS.filter(q => q.examId === activeExam.id)
    : DEMO_QUESTIONS;

  const [bookmarkedList, setBookmarkedList] = useState(examQuestions.slice(0, 2));
  const [incorrectList, setIncorrectList] = useState(examQuestions.slice(1, 3));

  const handleRemoveBookmark = (id: string) => {
    setBookmarkedList(prev => prev.filter(q => q.id !== id));
  };

  const handleResolveIncorrect = (id: string) => {
    setIncorrectList(prev => prev.filter(q => q.id !== id));
  };

  return (
    <div className="space-y-6">
      
      {/* Tab Switcher */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('BOOKMARKS')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-colors ${
              activeTab === 'BOOKMARKS'
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>Saved Bookmarks ({bookmarkedList.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('INCORRECT')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-colors ${
              activeTab === 'INCORRECT'
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <AlertCircle className="w-3.5 h-3.5" />
            <span>Incorrect Question Pool ({incorrectList.length})</span>
          </button>
        </div>

        <Button
          variant="secondary"
          size="sm"
          onClick={() => onStartPractice(activeTab === 'BOOKMARKS' ? 'BOOKMARKED' : 'INCORRECT')}
          rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
        >
          Practice {activeTab === 'BOOKMARKS' ? 'Bookmarks' : 'Incorrect Pool'}
        </Button>
      </div>

      {activeTab === 'BOOKMARKS' ? (
        <div className="space-y-4">
          {bookmarkedList.length === 0 ? (
            <Card className="p-12 text-center text-slate-500 text-xs">
              <Bookmark className="w-8 h-8 mx-auto text-slate-300 mb-2" />
              <p className="font-bold text-slate-700">No bookmarked questions yet</p>
              <p className="mt-1">While practicing questions, tap the bookmark icon to save key problems for fast revision.</p>
            </Card>
          ) : (
            bookmarkedList.map((q, idx) => (
              <Card key={q.id} className="p-5 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Badge variant="neutral" size="sm">{q.questionType.replace(/_/g, ' ')}</Badge>
                    <Badge variant="primary" size="sm">{q.difficulty}</Badge>
                    <span className="text-[11px] text-slate-400">Source: {q.source}</span>
                  </div>
                  <button
                    onClick={() => handleRemoveBookmark(q.id)}
                    className="text-slate-400 hover:text-rose-600 p-1 transition-colors"
                    title="Remove Bookmark"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="text-xs sm:text-sm font-medium text-slate-900">
                  <MathView content={q.questionText} />
                </div>

                <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100">
                  <span className="text-emerald-700 font-semibold">
                    Correct Answer: {String(q.correctAnswer)}
                  </span>
                  <button
                    onClick={() => onStartPractice('BOOKMARKED')}
                    className="font-semibold text-indigo-600 hover:text-indigo-800"
                  >
                    Solve Now &rarr;
                  </button>
                </div>
              </Card>
            ))
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {incorrectList.length === 0 ? (
            <Card className="p-12 text-center text-slate-500 text-xs">
              <CheckCircle2 className="w-8 h-8 mx-auto text-emerald-400 mb-2" />
              <p className="font-bold text-slate-700">Incorrect pool is empty!</p>
              <p className="mt-1">All flagged errors have been successfully revised.</p>
            </Card>
          ) : (
            incorrectList.map((q, idx) => (
              <Card key={q.id} className="p-5 space-y-3 border-rose-200/70 bg-rose-50/10">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-rose-700">Flagged Error</span>
                    <Badge variant="danger" size="sm">Failed in recent session</Badge>
                  </div>
                  <button
                    onClick={() => handleResolveIncorrect(q.id)}
                    className="text-xs font-semibold text-slate-500 hover:text-emerald-700"
                  >
                    Mark as Mastered
                  </button>
                </div>

                <div className="text-xs sm:text-sm font-medium text-slate-900">
                  <MathView content={q.questionText} />
                </div>

                <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100">
                  <span className="text-slate-600">
                    Expected: <strong className="text-emerald-700">{String(q.correctAnswer)}</strong>
                  </span>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => onStartPractice('INCORRECT')}
                  >
                    Re-Attempt Problem
                  </Button>
                </div>
              </Card>
            ))
          )}
        </div>
      )}

    </div>
  );
};
