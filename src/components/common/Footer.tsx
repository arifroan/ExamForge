import React from 'react';
import { Shield, BookOpen, Layers, CheckCircle } from 'lucide-react';
import { useExam } from '../../context/ExamContext';

interface FooterProps {
  onNavigate: (view: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { exams, setActiveExamId } = useExam();

  return (
    <footer className="bg-white border-t border-slate-200 mt-20 pt-16 pb-12 text-slate-600 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-100">
          
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-sm">
                EF
              </div>
              <span className="font-bold text-base text-slate-900 tracking-tight">ExamForge</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Precision question practice and diagnostic mock test infrastructure for competitive entrance examinations in India.
            </p>
            <div className="flex items-center gap-2 pt-2 text-xs font-semibold text-emerald-700">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>Deterministic Scoring Engine</span>
            </div>
          </div>

          {/* Supported Exams */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
              Target Examinations
            </h4>
            <ul className="space-y-2 text-xs">
              {exams.map(exam => (
                <li key={exam.id}>
                  <button
                    onClick={() => {
                      setActiveExamId(exam.id);
                      onNavigate('student-dashboard');
                    }}
                    className="hover:text-indigo-600 transition-colors text-left"
                  >
                    {exam.name}
                  </button>
                </li>
              ))}
              <li>
                <span className="text-slate-400 text-[11px] italic">
                  Additional exams configurable via Admin API
                </span>
              </li>
            </ul>
          </div>

          {/* Practice Modes */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
              Practice Modules
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('student-dashboard')} className="hover:text-indigo-600">
                  Topic & Chapter-wise Practice
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('student-dashboard')} className="hover:text-indigo-600">
                  Full Timed Mock Examinations
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('student-dashboard')} className="hover:text-indigo-600">
                  Custom Practice Generator
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('student-dashboard')} className="hover:text-indigo-600">
                  Incorrect Question Pool
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('student-dashboard')} className="hover:text-indigo-600">
                  Saved Bookmarks
                </button>
              </li>
            </ul>
          </div>

          {/* Standards & Transparency */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
              Platform Standards
            </h4>
            <div className="space-y-2.5 text-xs text-slate-500">
              <p>
                <strong className="text-slate-700">Verified Questions:</strong> All seed items are explicitly labeled Demo Questions to avoid counterfeit PYQ claims.
              </p>
              <p>
                <strong className="text-slate-700">KaTeX Math:</strong> Native formula rendering for complex chemistry equations and calculus limits.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => onNavigate('auth-login')}
                  className="text-xs font-medium text-indigo-600 hover:text-indigo-800 underline underline-offset-4"
                >
                  Admin Access Portal &rarr;
                </button>
              </div>
            </div>
          </div>

        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} ExamForge Platform. Practice. Analyze. Improve.</p>
          <div className="flex items-center gap-6">
            <span>JEE Main</span>
            <span>•</span>
            <span>JEE Advanced</span>
            <span>•</span>
            <span>NEET UG</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
