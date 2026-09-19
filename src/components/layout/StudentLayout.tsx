import React from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  Clock, 
  Bookmark, 
  AlertCircle, 
  BarChart3, 
  TrendingUp,
  Settings,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useExam } from '../../context/ExamContext';
import { Badge } from '../common/Badge';

interface StudentLayoutProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  children: React.ReactNode;
}

export const StudentLayout: React.FC<StudentLayoutProps> = ({
  currentTab,
  onSelectTab,
  children
}) => {
  const { user } = useAuth();
  const { activeExam, exams, setActiveExamId } = useExam();

  // Full desktop navigation list
  const desktopNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'practice', label: 'Practice Hub', icon: BookOpen, badge: 'Active' },
    { id: 'tests', label: 'Mock Tests', icon: Clock },
    { id: 'analytics', label: 'Progress & Analytics', icon: BarChart3 },
    { id: 'bookmarks', label: 'Saved Bookmarks', icon: Bookmark },
    { id: 'incorrect', label: 'Incorrect Question Pool', icon: AlertCircle },
    { id: 'settings', label: 'Profile & Target', icon: Settings },
  ];

  // Mobile bottom navigation items (Strictly non-truncated, clean 5-slot grid)
  const mobileNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'practice', label: 'Practice', icon: BookOpen },
    { id: 'tests', label: 'Mock', icon: Clock },
    { id: 'analytics', label: 'Progress', icon: TrendingUp },
    { id: 'bookmarks', label: 'Saved', icon: Bookmark },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        
        {/* Top Target Exam Banner Bar */}
        <div className="bg-white rounded-xl border border-slate-200/80 p-3.5 sm:p-4 mb-4 sm:mb-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-indigo-600/10 text-indigo-700 flex items-center justify-center font-bold text-base shrink-0">
              {activeExam.shortName.slice(0, 3)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm sm:text-base font-bold text-slate-900 leading-tight">
                  {activeExam.name}
                </h2>
                <Badge variant="primary" size="sm">Active Target</Badge>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
                Targeting Exam Year {user?.targetYear || 2026} • {activeExam.subjects.length} Subjects Configured
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs text-slate-500 font-medium hidden md:inline">Switch Target:</span>
            <div className="grid grid-cols-3 sm:flex items-center gap-1.5 w-full sm:w-auto">
              {exams.map(e => (
                <button
                  key={e.id}
                  onClick={() => setActiveExamId(e.id)}
                  className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors text-center ${
                    e.id === activeExam.id
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {e.shortName}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Grid: Left Sidebar + Right Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start pb-24 lg:pb-0">
          
          {/* Desktop Left Sidebar */}
          <aside className="hidden lg:block lg:col-span-3 space-y-1 bg-white rounded-xl border border-slate-200/80 p-3 shadow-xs">
            <div className="px-3 py-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Student Navigation
            </div>
            {desktopNavItems.map(item => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-medium transition-colors text-left ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-900 font-semibold'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <Badge variant="primary" size="sm">
                      {item.badge}
                    </Badge>
                  )}
                </button>
              );
            })}

            {/* Quick Practice shortcut card */}
            <div className="mt-6 pt-4 border-t border-slate-100 px-3 pb-2">
              <div className="bg-slate-50 rounded-lg p-3 border border-slate-200/60">
                <div className="flex items-center gap-2 text-indigo-700 font-bold text-xs mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Exam Strategy</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-normal">
                  Consistent topic practice yields 3x higher retention than passive reading.
                </p>
              </div>
            </div>
          </aside>

          {/* Right Main Content Area */}
          <main className="lg:col-span-9 space-y-6 min-w-0">
            {children}
          </main>

        </div>
      </div>

      {/* Mobile Sticky Bottom Navigation Bar (5 Items, Equal Spacing, No Truncation, Safe-Area Supported) */}
      <nav 
        className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-lg px-1 pt-1 pb-[max(env(safe-area-inset-bottom),0.5rem)]"
        aria-label="Mobile Navigation"
      >
        <div className="grid grid-cols-5 w-full max-w-lg mx-auto items-center">
          {mobileNavItems.map(item => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`flex flex-col items-center justify-center min-h-[48px] py-1 px-1 rounded-lg transition-colors ${
                  isActive ? 'text-indigo-600 font-bold' : 'text-slate-500 hover:text-slate-900'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon className={`w-5 h-5 mb-1 shrink-0 ${isActive ? 'text-indigo-600 stroke-[2.25]' : 'text-slate-400 stroke-2'}`} />
                <span className="text-[11px] font-medium leading-none whitespace-nowrap">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};
