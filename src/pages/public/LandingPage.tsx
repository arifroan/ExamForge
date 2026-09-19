import React from 'react';
import { 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Layers, 
  Target, 
  Clock, 
  BarChart2, 
  ShieldCheck, 
  BookOpen, 
  ChevronRight,
  HelpCircle,
  Atom,
  FlaskConical,
  Pi,
  Dna
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { MathView } from '../../components/common/MathView';
import { useExam } from '../../context/ExamContext';

interface LandingPageProps {
  onStartPracticing: () => void;
  onExploreTests: () => void;
  onSelectExam: (examId: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStartPracticing,
  onExploreTests,
  onSelectExam
}) => {
  const { exams } = useExam();

  const practiceModes = [
    {
      title: 'Topic & Chapter Practice',
      description: 'Granular question sets organized strictly under subject, chapter, and sub-topic hierarchies.',
      tag: 'Core Foundation'
    },
    {
      title: 'Quick Rapid Practice',
      description: 'Bite-sized, randomized 10-15 question sprints with immediate step-by-step explanations.',
      tag: 'Daily Habit'
    },
    {
      title: 'Full Mock Simulations',
      description: 'Timed exam papers adhering precisely to official duration, section rules, and marking schemes.',
      tag: 'Exam Rehearsal'
    },
    {
      title: 'Custom Practice Generator',
      description: 'Filter by specific exam, multiple subjects, difficulty tiers (Easy/Medium/Hard), and question types.',
      tag: 'Targeted'
    },
    {
      title: 'Previous Year Archive',
      description: 'Systematically categorized historical questions verified and tagged with year and source.',
      tag: 'Pattern Mastery'
    },
    {
      title: 'Incorrect Question Pool',
      description: 'Automatically captures every flawed attempt so you can practice your mistakes until mastered.',
      tag: 'Zero Defect'
    }
  ];

  const faqs = [
    {
      q: 'How does ExamForge handle marking schemes for different exams?',
      a: 'ExamForge uses a fully configurable scoring engine. JEE Main applies +4/-1; JEE Advanced handles variable multi-correct partial scoring and numerical answers; NEET UG enforces standard +4/-1 across 180 questions.'
    },
    {
      q: 'Are mathematical formulas and chemical equations supported?',
      a: 'Yes. All questions, options, and step-by-step solutions render using native KaTeX math typesetting, supporting limits, matrices, integrals, organic chemical structures, and vector notations.'
    },
    {
      q: 'Can I practice on mobile phones and tablets?',
      a: 'ExamForge is engineered desktop-first for deep analytics and mobile-first for practice. The test-taking interface features a custom mobile navigation palette so you can simulate real exam conditions on any handheld device.'
    },
    {
      q: 'Are the questions official PYQs or practice problems?',
      a: 'We maintain strict transparency. Demo questions are explicitly marked as "Demo Question", while verified previous-year questions are cataloged with verified examination years and official session tags.'
    }
  ];

  return (
    <div className="space-y-24 py-6">
      
      {/* Hero Section */}
      <section className="max-w-5xl mx-auto text-center px-4 pt-10 sm:pt-16 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200/70 text-indigo-700 text-xs font-semibold mb-6">
          <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse"></span>
          Competitive Examination Practice Architecture
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight font-display mb-6">
          Prepare Smarter. <br className="hidden sm:inline" />
          <span className="text-indigo-600">Perform Better.</span>
        </h1>

        <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-600 leading-relaxed mb-10">
          Practice JEE Main, JEE Advanced and NEET UG questions, take realistic mock tests and understand exactly where you need to improve.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            size="lg"
            variant="primary"
            onClick={onStartPracticing}
            rightIcon={<ArrowRight className="w-4 h-4" />}
            className="w-full sm:w-auto"
          >
            Start Practicing
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={onExploreTests}
            className="w-full sm:w-auto"
          >
            Explore Tests
          </Button>
        </div>

        {/* Feature Highlights Grid Under Hero */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
          <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-xs">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Architecture</div>
            <div className="text-sm font-bold text-slate-900">Multi-Exam Taxonomy</div>
            <div className="text-xs text-slate-500 mt-0.5">JEE Main, Advanced & NEET</div>
          </div>
          <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-xs">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Mathematics</div>
            <div className="text-sm font-bold text-slate-900">Native KaTeX TeX</div>
            <div className="text-xs text-slate-500 mt-0.5">High-fidelity formula rendering</div>
          </div>
          <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-xs">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Testing Engine</div>
            <div className="text-sm font-bold text-slate-900">Deterministic Scoring</div>
            <div className="text-xs text-slate-500 mt-0.5">Configurable negative marking</div>
          </div>
          <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-xs">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Diagnostics</div>
            <div className="text-sm font-bold text-slate-900">Deep Topic Analytics</div>
            <div className="text-xs text-slate-500 mt-0.5">Identify and fix weak concepts</div>
          </div>
        </div>
      </section>

      {/* Supported Exams Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Badge variant="primary" className="mb-2">Supported Examinations</Badge>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Tailored Specifically for Top National Entrances
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Each exam features dedicated subject trees, authentic question patterns, and exact time-bound test regulations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {exams.map(exam => (
            <Card key={exam.id} hoverable className="flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2.5 py-1 text-xs font-bold bg-slate-900 text-white rounded-md">
                    {exam.shortName}
                  </span>
                  <Badge variant="neutral" size="sm">
                    {exam.duration} Minutes
                  </Badge>
                </div>

                <h3 className="text-base font-bold text-slate-900 mb-2">{exam.name}</h3>
                <p className="text-xs text-slate-500 leading-relaxed mb-6">
                  {exam.description}
                </p>

                <div className="space-y-3 mb-6">
                  <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Subject Syllabus Hierarchy
                  </div>
                  <div className="space-y-1.5">
                    {exam.subjects.map(s => (
                      <div key={s.id} className="flex items-center justify-between text-xs py-1 px-2.5 rounded bg-slate-50 border border-slate-100">
                        <span className="font-medium text-slate-800">{s.name}</span>
                        <span className="text-slate-400 text-[11px]">{s.chapters.length} Chapters</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-indigo-50/50 rounded-lg p-3 border border-indigo-100 text-xs space-y-1 mb-6">
                  <div className="font-semibold text-indigo-900">Marking Formula</div>
                  <p className="text-indigo-700 text-[11px] leading-relaxed">
                    {exam.markingScheme.description}
                  </p>
                </div>
              </div>

              <Button
                variant="outline"
                size="md"
                className="w-full"
                onClick={() => {
                  onSelectExam(exam.id);
                  onStartPracticing();
                }}
                rightIcon={<ChevronRight className="w-4 h-4" />}
              >
                Explore {exam.shortName} Practice
              </Button>
            </Card>
          ))}
        </div>
      </section>

      {/* Practice Modes Section */}
      <section className="bg-slate-100/70 border-y border-slate-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <Badge variant="neutral" className="mb-2">Practice Architecture</Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Flexible Practice Modes for Every Stage of Prep
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              From targeted chapter drills to full-length timed simulations, train under conditions that build genuine test-day speed and accuracy.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {practiceModes.map((mode, i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                    {mode.tag}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-2">{mode.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {mode.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* KaTeX Math Showcase Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <Badge variant="accent" className="mb-2">Mathematical Accuracy</Badge>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight mb-4">
                Native KaTeX Equation & Scientific Notation Engine
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                Competitive exams hinge on precise symbols, indices, matrices, fractions, and chemical reaction mechanisms. ExamForge renders every equation in vector-sharp typography with zero rasterization artifacts.
              </p>

              <div className="space-y-2 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Calculus limits, integrals, and differential equations</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Kinematics vectors, projectile angles, and thermodynamics</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Chemical equilibrium expressions, rate laws, and half-lives</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 space-y-4">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Live Sample Rendering:
              </div>
              <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs space-y-3">
                <div className="text-xs text-slate-500 font-medium">Standard Limit:</div>
                <MathView content="$$\\lim_{x \\to 0} \\frac{\\tan x - \\sin x}{x^3} = \\frac{1}{2}$$" block />
              </div>
              <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs space-y-3">
                <div className="text-xs text-slate-500 font-medium">Projectile Trajectory Maximum Height:</div>
                <MathView content="$$H_{\\max} = \\frac{u^2 \\sin^2 \\theta}{2g}$$" block />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Badge variant="primary" className="mb-2">Methodology</Badge>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            How ExamForge Accelerates Your Score
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200">
            <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-xs mb-4">
              01
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-1">Select Target Exam</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Lock in JEE Main, JEE Advanced, or NEET UG to automatically align your questions, marking scheme, and syllabus.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200">
            <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-xs mb-4">
              02
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-1">Master Chapter by Chapter</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Work through curated problem sets topic-wise, observing immediate mathematical solutions after each attempt.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200">
            <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-xs mb-4">
              03
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-1">Timed Mock Simulations</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Engage the authentic examination palette with live countdown timer, review flags, and auto-submission checks.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200">
            <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-xs mb-4">
              04
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-1">Analyze & Eliminate Errors</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Drill down into subject accuracy and re-attempt all incorrect questions until your topic mastery is airtight.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <Badge variant="neutral" className="mb-2">Transparency & Details</Badge>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white p-5 rounded-xl border border-slate-200">
              <h3 className="text-sm font-bold text-slate-900 flex items-start gap-2.5">
                <HelpCircle className="w-4 h-4 text-indigo-600 mt-0.5 shrink-0" />
                <span>{faq.q}</span>
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mt-2 pl-6.5">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA Banner */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="bg-slate-900 text-white rounded-2xl p-8 sm:p-12 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
            Ready to Begin Focused Question Practice?
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto mb-8">
            Access the question bank, try out mock tests, and review detailed analytical reports with our deterministic scoring engine.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              size="lg"
              variant="secondary"
              onClick={onStartPracticing}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Start Free Practice
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-slate-800 text-white border-slate-700 hover:bg-slate-700"
              onClick={onExploreTests}
            >
              View Available Tests
            </Button>
          </div>
        </div>
      </section>

    </div>
  );
};
