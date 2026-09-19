import React, { useState } from 'react';
import { User, Target, Mail, Bell, Shield, Save, Check } from 'lucide-react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { useAuth } from '../../context/AuthContext';
import { useExam } from '../../context/ExamContext';

export const StudentSettingsShell: React.FC = () => {
  const { user } = useAuth();
  const { exams, activeExam, setActiveExamId } = useExam();

  const [name, setName] = useState(user?.name || 'Aarav Sharma');
  const [selectedExamId, setSelectedExamId] = useState(activeExam.id);
  const [targetYear, setTargetYear] = useState(user?.targetYear || 2026);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveExamId(selectedExamId);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Student Profile & Examination Target</h2>
        <p className="text-xs text-slate-500">Configure your target exam syllabus and personal details</p>
      </div>

      <Card className="p-6">
        <form onSubmit={handleSave} className="space-y-5">
          {savedSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-xs flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Target exam settings updated successfully!</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Student Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
            <input
              type="email"
              disabled
              value={user?.email || 'student@example.edu'}
              className="w-full p-2.5 text-xs rounded-lg border border-slate-200 bg-slate-50 text-slate-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Primary Target Exam</label>
              <select
                value={selectedExamId}
                onChange={(e) => setSelectedExamId(e.target.value)}
                className="w-full p-2.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white"
              >
                {exams.map(e => (
                  <option key={e.id} value={e.id}>{e.name} ({e.shortName})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Target Admission Year</label>
              <select
                value={targetYear}
                onChange={(e) => setTargetYear(Number(e.target.value))}
                className="w-full p-2.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white"
              >
                <option value={2026}>2026 (Upcoming Cycle)</option>
                <option value={2027}>2027 (Long Term Prep)</option>
              </select>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <Button
              type="submit"
              variant="primary"
              size="md"
              leftIcon={<Save className="w-4 h-4" />}
            >
              Save Changes
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};
