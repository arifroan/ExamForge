import React from 'react';
import { Badge } from '../../components/common/Badge';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { 
  Target, 
  Clock, 
  BarChart3, 
  Layers, 
  ShieldCheck, 
  AlertCircle, 
  ArrowRight,
  BookOpen,
  Sparkles
} from 'lucide-react';

interface FeaturesPageProps {
  onStartPracticing: () => void;
}

export const FeaturesPage: React.FC<FeaturesPageProps> = ({ onStartPracticing }) => {
  const features = [
    {
      icon: Layers,
      title: 'Configurable Multi-Exam Taxonomy',
      desc: 'Built on a normalized relational hierarchy (Exam → Subject → Chapter → Topic → Question) enabling clean expansion to future examinations without code rewrites.'
    },
    {
      icon: Clock,
      title: 'Realistic Mock Examination Engine',
      desc: 'Accurate countdown timers, standard question palette status (Attempted, Marked for Review, Answered & Marked), and auto-submission upon timer expiry.'
    },
    {
      icon: ShieldCheck,
      title: 'Deterministic Multi-Scheme Scoring',
      desc: 'Configurable positive, negative, and partial marking formulas calculated with absolute mathematical determinism. Never random, never fabricated.'
    },
    {
      icon: Sparkles,
      title: 'Native KaTeX Equation Rendering',
      desc: 'Vector-sharp display for fractions, powers, roots, integrals, summations, greek symbols, and chemical reaction mechanisms in questions and explanations.'
    },
    {
      icon: BarChart3,
      title: 'Granular Accuracy & Time Diagnostics',
      desc: 'Pinpoints specific chapter and topic deficiencies alongside average solving velocity, allowing students to target high-yield weak areas.'
    },
    {
      icon: AlertCircle,
      title: 'Automatic Incorrect Question Pool',
      desc: 'Every wrong answer is automatically cataloged in an active revision pool until correctly re-attempted and verified.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <div className="max-w-3xl">
        <Badge variant="primary" className="mb-2">Platform Capabilities</Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Engineered for Deep Competitive Exam Mastery
        </h1>
        <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
          ExamForge rejects generic flashcards and superficial quizzes in favor of structured academic rigor, accurate formula rendering, and realistic exam simulation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feat, i) => {
          const Icon = feat.icon;
          return (
            <Card key={i} className="p-6 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">{feat.title}</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {feat.desc}
              </p>
            </Card>
          );
        })}
      </div>

      <div className="bg-slate-900 rounded-2xl p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h2 className="text-xl font-bold">Ready to test your preparation?</h2>
          <p className="text-xs text-slate-400 mt-1">
            Dive into chapter-wise practice sets with instant KaTeX solutions.
          </p>
        </div>
        <Button
          variant="secondary"
          size="md"
          onClick={onStartPracticing}
          rightIcon={<ArrowRight className="w-4 h-4" />}
        >
          Start Practicing Now
        </Button>
      </div>
    </div>
  );
};
