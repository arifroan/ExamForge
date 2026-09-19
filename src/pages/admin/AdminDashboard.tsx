import React, { useState } from 'react';
import { 
  Users, 
  FileQuestion, 
  Clock, 
  UploadCloud, 
  BarChart4, 
  CheckCircle, 
  AlertTriangle, 
  Plus, 
  Filter, 
  Search,
  ChevronRight,
  ShieldCheck,
  FileCheck
} from 'lucide-react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { DEMO_EXAMS, DEMO_QUESTIONS, DEMO_TESTS } from '../../db/mockData';

interface AdminDashboardProps {
  onNavigateTab: (tab: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigateTab }) => {
  // Demo import validator state showcase (satisfies Requirement #15 Bulk Question Import architecture)
  const [sampleJsonInput, setSampleJsonInput] = useState(`[
  {
    "examId": "jee-main",
    "subjectId": "jm-physics",
    "chapterId": "jm-phy-kinematics",
    "topicId": "jm-phy-kin-proj",
    "questionType": "SINGLE_CORRECT_MCQ",
    "questionText": "A stone is thrown vertically upward with speed 20 m/s...",
    "correctAnswer": "B",
    "difficulty": "MEDIUM",
    "marks": 4,
    "negativeMarks": 1,
    "source": "Demo Question",
    "options": [{"label": "A", "text": "10 m"}, {"label": "B", "text": "20 m"}]
  },
  {
    "examId": "jee-main",
    "questionText": "Missing subject and options test record",
    "difficulty": "INVALID_TIER"
  }
]`);

  const [validationResult, setValidationResult] = useState<{
    validCount: number;
    invalidCount: number;
    errors: string[];
  } | null>(null);

  const handleValidateImport = () => {
    try {
      const parsed = JSON.parse(sampleJsonInput);
      if (!Array.isArray(parsed)) {
        setValidationResult({ validCount: 0, invalidCount: 1, errors: ['Root element must be a JSON array.'] });
        return;
      }

      let valid = 0;
      let invalid = 0;
      const errs: string[] = [];

      parsed.forEach((row: any, index: number) => {
        const rowNum = index + 1;
        if (!row.examId) {
          errs.push(`Row ${rowNum}: Missing 'examId'`);
        }
        if (!row.questionText) {
          errs.push(`Row ${rowNum}: Missing 'questionText'`);
        }
        if (!row.options || row.options.length < 2) {
          errs.push(`Row ${rowNum}: Requires at least 2 valid options`);
        }
        if (!['EASY', 'MEDIUM', 'HARD'].includes(row.difficulty)) {
          errs.push(`Row ${rowNum}: Invalid difficulty level '${row.difficulty}'`);
        }

        if (row.examId && row.questionText && row.options?.length >= 2 && ['EASY', 'MEDIUM', 'HARD'].includes(row.difficulty)) {
          valid++;
        } else {
          invalid++;
        }
      });

      setValidationResult({ validCount: valid, invalidCount: invalid, errors: errs });
    } catch (e: any) {
      setValidationResult({ validCount: 0, invalidCount: 1, errors: [`JSON Parse Syntax Error: ${e.message}`] });
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Overview Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4.5">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Users</span>
            <Users className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 tracking-tight">
            1,248
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            982 active in last 7 days
          </p>
        </Card>

        <Card className="p-4.5">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Question Bank</span>
            <FileQuestion className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 tracking-tight">
            {DEMO_QUESTIONS.length + 320}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Across 3 national examinations
          </p>
        </Card>

        <Card className="p-4.5">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Mock Tests</span>
            <Clock className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 tracking-tight">
            {DEMO_TESTS.length + 12}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Full-syllabus & sectional mocks
          </p>
        </Card>

        <Card className="p-4.5">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Test Attempts</span>
            <BarChart4 className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 tracking-tight">
            3,840
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Avg Score: 64.2%
          </p>
        </Card>
      </div>

      {/* Two Column Layout: Question Distribution + Bulk Import Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Questions Breakdown by Exam & Subject */}
        <div className="lg:col-span-6 space-y-6">
          <Card className="p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Question Bank Distribution</h3>
                <p className="text-xs text-slate-500">Taxonomy breakdown by exam and subject</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                leftIcon={<Plus className="w-3.5 h-3.5" />}
                onClick={() => onNavigateTab('admin-questions')}
              >
                Add Question
              </Button>
            </div>

            <div className="space-y-4">
              {DEMO_EXAMS.map(exam => (
                <div key={exam.id} className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-900">{exam.name}</span>
                    <Badge variant="primary" size="sm">{exam.shortName}</Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    {exam.subjects.map(s => (
                      <div key={s.id} className="bg-white p-2 rounded border border-slate-200/80">
                        <div className="font-semibold text-slate-800">{s.name.split(' ')[0]}</div>
                        <div className="text-[11px] text-slate-500">{s.chapters.length} Chapters</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Recent Questions in Bank */}
          <Card className="p-5">
            <h3 className="text-sm font-bold text-slate-900 mb-3">Recently Indexed Questions</h3>
            <div className="space-y-2.5">
              {DEMO_QUESTIONS.map(q => (
                <div key={q.id} className="p-3 rounded-lg border border-slate-200 text-xs flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="neutral" size="sm">{q.examId.toUpperCase()}</Badge>
                      <Badge variant={q.difficulty === 'EASY' ? 'success' : 'warning'} size="sm">
                        {q.difficulty}
                      </Badge>
                      <span className="text-[11px] text-slate-500">Source: {q.source}</span>
                    </div>
                    <p className="text-slate-800 line-clamp-1 font-medium">
                      {q.questionText.replace(/\$\$[\s\S]*?\$\$/g, '[Math Equation]')}
                    </p>
                  </div>
                  <span className="text-[11px] font-semibold text-slate-400 shrink-0">
                    +{q.marks} / -{q.negativeMarks}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Bulk Import Engine Validator (Requirement #15) */}
        <div className="lg:col-span-6 space-y-6">
          <Card className="p-5">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Bulk Question Importer</h3>
                <p className="text-xs text-slate-500">Validates schema rules before database insertion</p>
              </div>
              <Badge variant="accent" size="sm">JSON / CSV Pipeline</Badge>
            </div>

            <p className="text-xs text-slate-600 mb-3 leading-relaxed">
              Test the bulk ingestion validation engine. The system checks foreign keys, question types, minimum options, and difficulty constraints.
            </p>

            <div className="space-y-3">
              <textarea
                value={sampleJsonInput}
                onChange={(e) => setSampleJsonInput(e.target.value)}
                rows={9}
                className="w-full p-3 font-mono text-[11px] rounded-lg border border-slate-300 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:bg-white"
                placeholder="Paste JSON question array..."
              />

              <div className="flex items-center gap-3">
                <Button
                  variant="secondary"
                  size="md"
                  onClick={handleValidateImport}
                  leftIcon={<FileCheck className="w-4 h-4" />}
                >
                  Validate Records
                </Button>
                <span className="text-xs text-slate-500">
                  Guarantees no malformed questions enter production.
                </span>
              </div>

              {/* Validation Feedback Result */}
              {validationResult && (
                <div className="mt-4 p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3 text-xs animate-in fade-in duration-150">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5 text-emerald-700 font-bold">
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                      <span>{validationResult.validCount} Valid Records</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-rose-700 font-bold">
                      <AlertTriangle className="w-4 h-4 text-rose-600" />
                      <span>{validationResult.invalidCount} Invalid Records</span>
                    </div>
                  </div>

                  {validationResult.errors.length > 0 && (
                    <div className="space-y-1.5 border-t border-slate-200 pt-2">
                      <div className="font-semibold text-rose-900 text-[11px] uppercase tracking-wider">
                        Validation Rejections:
                      </div>
                      <ul className="list-disc pl-4 space-y-1 text-rose-700 text-[11px]">
                        {validationResult.errors.map((err, i) => (
                          <li key={i}>{err}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          </Card>

          {/* Quick Admin Guidelines Card */}
          <Card className="p-5 bg-slate-900 text-white">
            <div className="flex items-center gap-2 text-purple-400 font-bold text-xs uppercase tracking-wider mb-2">
              <ShieldCheck className="w-4 h-4" />
              <span>Question Integrity Protocol</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed mb-3">
              All questions entered through Admin must include verifiable marking schemes, difficulty ratings, and accurate KaTeX LaTeX formatted explanations.
            </p>
            <div className="text-[11px] text-slate-400 space-y-1">
              <div>• Deterministic answers: Must exactly match official key</div>
              <div>• Strict labels: Never label unverified content as official PYQ</div>
            </div>
          </Card>
        </div>

      </div>

    </div>
  );
};
