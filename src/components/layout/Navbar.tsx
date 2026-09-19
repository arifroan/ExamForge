import React, { useState } from 'react';
import { 
  Sparkles, 
  Menu, 
  X, 
  ChevronDown, 
  User, 
  LogOut, 
  ShieldCheck, 
  BookOpen, 
  Clock, 
  BarChart2, 
  Layers 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useExam } from '../../context/ExamContext';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';

interface NavbarProps {
  currentView: string;
  onNavigate: (route: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate }) => {
  const { user, isAuthenticated, logout, loginAsStudent, loginAsAdmin } = useAuth();
  const { exams, activeExam, setActiveExamId } = useExam();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [examDropdownOpen, setExamDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Tagline */}
          <div className="flex items-center gap-6">
            <button 
              onClick={() => onNavigate('landing')}
              className="flex items-center gap-2.5 text-left group"
            >
              <div className="w-9 h-9 rounded-xl bg-slate-900 text-white font-black text-sm flex items-center justify-center shadow-xs group-hover:bg-indigo-950 transition-colors">
                EF
              </div>
              <div>
                <span className="font-extrabold text-base tracking-tight text-slate-900 block leading-tight">
                  ExamForge
                </span>
                <span className="text-[10px] text-slate-500 font-medium tracking-wide block leading-none">
                  Practice. Analyze. Improve.
                </span>
              </div>
            </button>

            {/* Target Exam Dropdown Selector */}
            <div className="relative hidden md:block">
              <button
                type="button"
                onClick={() => setExamDropdownOpen(!examDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-semibold text-slate-800 transition-colors"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>{activeExam.shortName}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {examDropdownOpen && (
                <div className="absolute left-0 mt-2 w-56 rounded-xl bg-white border border-slate-200 shadow-lg py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100">
                  <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Switch Target Exam
                  </div>
                  {exams.map(exam => (
                    <button
                      key={exam.id}
                      onClick={() => {
                        setActiveExamId(exam.id);
                        setExamDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 text-xs text-left transition-colors ${
                        exam.id === activeExam.id
                          ? 'bg-indigo-50 font-bold text-indigo-900'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div>
                        <div>{exam.name}</div>
                        <div className="text-[10px] text-slate-400">{exam.duration}m • {exam.questionCount}Q</div>
                      </div>
                      {exam.id === activeExam.id && (
                        <span className="text-indigo-600 text-xs">✓</span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            <button
              onClick={() => onNavigate('landing')}
              className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                currentView === 'landing' ? 'text-slate-900 bg-slate-100' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => onNavigate('exams')}
              className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                currentView === 'exams' ? 'text-slate-900 bg-slate-100' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Exam Syllabi
            </button>
            <button
              onClick={() => onNavigate('features')}
              className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                currentView === 'features' ? 'text-slate-900 bg-slate-100' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Features
            </button>
            <button
              onClick={() => onNavigate('student-practice')}
              className="px-3 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
            >
              Practice Engine
            </button>
            <button
              onClick={() => onNavigate('student-mock-tests')}
              className="px-3 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
            >
              Mock Tests
            </button>
          </nav>

          {/* Right Controls: User Session / Auth Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            {isAuthenticated && user ? (
              <div className="flex items-center gap-2">
                {user.role === 'ADMIN' ? (
                  <button
                    onClick={() => onNavigate('admin-dashboard')}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-purple-50 border border-purple-200 text-xs font-bold text-purple-900 hover:bg-purple-100 transition-colors"
                  >
                    <ShieldCheck className="w-4 h-4 text-purple-600" />
                    <span>Admin Panel</span>
                  </button>
                ) : (
                  <button
                    onClick={() => onNavigate('student-dashboard')}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-800 transition-colors"
                  >
                    <User className="w-3.5 h-3.5 text-slate-600" />
                    <span>{user.name.split(' ')[0]} (Dashboard)</span>
                  </button>
                )}

                <button
                  onClick={logout}
                  className="p-2 text-slate-400 hover:text-slate-700 transition-colors rounded-lg hover:bg-slate-100"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onNavigate('auth')}
                >
                  Sign In
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    loginAsStudent();
                    onNavigate('student-dashboard');
                  }}
                >
                  Instant Student Demo
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-3">
          <div className="pb-3 border-b border-slate-100">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
              Select Exam:
            </span>
            <div className="grid grid-cols-3 gap-1.5">
              {exams.map(e => (
                <button
                  key={e.id}
                  onClick={() => {
                    setActiveExamId(e.id);
                  }}
                  className={`py-1.5 px-2 rounded text-xs font-semibold text-center ${
                    e.id === activeExam.id
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {e.shortName}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1">
            <button
              onClick={() => {
                onNavigate('landing');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-lg text-xs font-medium text-slate-800 hover:bg-slate-100"
            >
              Overview
            </button>
            <button
              onClick={() => {
                onNavigate('exams');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-lg text-xs font-medium text-slate-800 hover:bg-slate-100"
            >
              Official Exam Syllabi
            </button>
            <button
              onClick={() => {
                onNavigate('features');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-lg text-xs font-medium text-slate-800 hover:bg-slate-100"
            >
              Platform Capabilities
            </button>
            <button
              onClick={() => {
                onNavigate('student-practice');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-lg text-xs font-medium text-slate-800 hover:bg-slate-100"
            >
              Practice Engine
            </button>
            <button
              onClick={() => {
                onNavigate('student-mock-tests');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-lg text-xs font-medium text-slate-800 hover:bg-slate-100"
            >
              Mock Tests
            </button>
          </div>

          <div className="pt-3 border-t border-slate-100 space-y-2">
            {isAuthenticated ? (
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
              >
                Sign Out
              </Button>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    onNavigate('auth');
                    setMobileMenuOpen(false);
                  }}
                >
                  Sign In
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    loginAsStudent();
                    onNavigate('student-dashboard');
                    setMobileMenuOpen(false);
                  }}
                >
                  Demo Student
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
