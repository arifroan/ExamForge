import React from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  Clock, 
  Bookmark, 
  AlertCircle, 
  BarChart3, 
  Settings,
  ChevronRight,
  Sparkles,
  Layers
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

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'practice', label: 'Practice Hub', icon: BookOpen, badge: 'Active' },
    { id: 'tests', label: 'Mock Tests', icon: Clock },
    { id: 'analytics', label: 'Performance Analytics', icon: BarChart3 },
    { id: 'bookmarks', label: 'Bookmarks', icon: Bookmark },
    { id: 'incorrect', label: 'Incorrect Questions', icon: AlertCircle },
    { id: 'settings', label: 'Profile & Target', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Top Student Banner Bar */}
        <div className="bg-white rounded-xl border border-slate-200/80 p-4 mb-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-indigo-600/10 text-indigo-700 flex items-center justify-center font-bold text-base">
              {activeExam.shortName.slice(0, 3)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-slate-900">{activeExam.name}</h2>
                <Badge variant="primary" size="sm">Active Target</Badge>
              </div>
              <p className="text-xs text-slate-500">
                Targeting Exam Year {user?.targetYear || 2026} • {activeExam.subjects.length} Subjects Configured
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs text-slate-500 font-medium hidden md:inline">Switch Target:</span>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 w-full sm:w-auto">
              {exams.map(e => (
                <button
                  key={e.id}
                  onClick={() => setActiveExamId(e.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start pb-16 lg:pb-0">
          
          {/* Desktop Left Sidebar */}
          <aside className="hidden lg:block lg:col-span-3 space-y-1 bg-white rounded-xl border border-slate-200/80 p-3 shadow-xs">
            <div className="px-3 py-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Student Navigation
            </div>
            {navigationItems.map(item => {
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
          <main className="lg:col-span-9 space-y-6">
            {children}
          </main>

        </div>
      </div>

      {/* Mobile Sticky Bottom Navigation Bar */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-1 flex items-center justify-around shadow-lg">
        {navigationItems.slice(0, 5).map(item => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`flex flex-col items-center justify-center py-1.5 px-2 rounded-lg text-[10px] font-medium transition-colors ${
                isActive ? 'text-indigo-600 font-bold' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Icon className={`w-5 h-5 mb-0.5 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
              <span className="truncate max-w-[60px]">{item.label.split(' ')[0]}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};
