import React from 'react';
import { 
  ShieldCheck, 
  FileQuestion, 
  UploadCloud, 
  Clock, 
  Users, 
  Settings, 
  ArrowLeft,
  BarChart4
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Badge } from '../common/Badge';

interface AdminLayoutProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  onExitAdmin: () => void;
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  currentTab,
  onSelectTab,
  onExitAdmin,
  children
}) => {
  const { user } = useAuth();

  const adminNavItems = [
    { id: 'admin-dashboard', label: 'Admin Overview', icon: BarChart4 },
    { id: 'admin-questions', label: 'Question Bank', icon: FileQuestion },
    { id: 'admin-import', label: 'Bulk Question Import', icon: UploadCloud },
    { id: 'admin-tests', label: 'Test Management', icon: Clock },
    { id: 'admin-users', label: 'User Directory', icon: Users },
    { id: 'admin-settings', label: 'System Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-900/5 text-slate-900 flex flex-col">
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1">
        
        {/* Admin Header Bar */}
        <div className="bg-slate-900 text-white rounded-xl p-4 mb-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-600 text-white flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white tracking-tight">ExamForge Control Panel</h2>
                <Badge variant="neutral" size="sm">Admin Role</Badge>
              </div>
              <p className="text-xs text-slate-400">
                Logged in as {user?.name} ({user?.email}) • Authorization Verified
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onExitAdmin}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 transition-colors border border-slate-700"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Student Portal</span>
            </button>
          </div>
        </div>

        {/* Main Grid: Admin Sidebar + Admin Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <aside className="lg:col-span-3 space-y-1 bg-white rounded-xl border border-slate-200/80 p-3 shadow-xs">
            <div className="px-3 py-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Administration
            </div>
            {adminNavItems.map(item => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-xs font-medium transition-colors text-left ${
                    isActive
                      ? 'bg-purple-50 text-purple-900 font-semibold'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-purple-600' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </aside>

          <main className="lg:col-span-9 space-y-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};
