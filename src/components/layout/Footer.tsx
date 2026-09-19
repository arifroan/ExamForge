import React from 'react';
import { Sparkles, ShieldCheck, Award } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-white text-slate-900 font-extrabold flex items-center justify-center text-xs">
                EF
              </div>
              <span className="font-extrabold text-white text-base tracking-tight">ExamForge</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Precision question practice and timed mock simulation for JEE Main, JEE Advanced, and NEET UG.
            </p>
            <div className="text-[11px] text-slate-400">
              Deterministic Scoring • KaTeX Math Engine
            </div>
          </div>

          {/* Exam Programs */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-3">
              Target Examinations
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  JEE Main (B.E./B.Tech)
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  JEE Advanced (IIT Entrance)
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  NEET UG (Medical Entrance)
                </span>
              </li>
              <li>
                <span className="text-slate-400 text-[11px]">
                  Custom sectional & full syllabus mocks
                </span>
              </li>
            </ul>
          </div>

          {/* Platform Pillars */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-3">
              Core Capabilities
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Granular Chapter-Wise Practice
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Real-time Question Palette Simulation
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Automatic Incorrect Question Pool
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Subject & Chapter Mastery Analytics
                </span>
              </li>
            </ul>
          </div>

          {/* Academic Integrity Notice */}
          <div className="space-y-2">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-3">
              Integrity & Standards
            </h4>
            <div className="p-3 bg-slate-800/80 rounded-lg border border-slate-700/60 text-[11px] leading-relaxed text-slate-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400 mb-1" />
              ExamForge strictly computes all test scores using verified deterministic formulas. We do not use mock random statistics or fabricated official figures.
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            &copy; {new Date().getFullYear()} ExamForge. Built for disciplined competitive exam aspirants.
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-300 cursor-pointer">Terms of Service</span>
            <span>•</span>
            <span className="hover:text-slate-300 cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-slate-300 cursor-pointer">Honor Code</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
