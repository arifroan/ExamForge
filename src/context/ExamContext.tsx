import React, { createContext, useContext, useState, useEffect } from 'react';
import { Exam, Subject } from '../types/exam';
import { DEMO_EXAMS } from '../db/mockData';
import { useAuth } from './AuthContext';

interface ExamContextType {
  exams: Exam[];
  activeExam: Exam;
  setActiveExamId: (examId: string) => void;
  activeExamSubjects: Subject[];
}

const ExamContext = createContext<ExamContextType | undefined>(undefined);

const STORAGE_KEY = 'examforge_active_exam';

export const ExamProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [exams] = useState<Exam[]>(DEMO_EXAMS);

  const [activeExamId, setActiveExamIdState] = useState<string>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && DEMO_EXAMS.some(e => e.id === stored)) {
        return stored;
      }
    } catch (e) {
      console.error('Error loading active exam', e);
    }
    return user?.targetExamId || 'jee-main';
  });

  const setActiveExamId = (id: string) => {
    if (exams.some(e => e.id === id)) {
      setActiveExamIdState(id);
      localStorage.setItem(STORAGE_KEY, id);
    }
  };

  useEffect(() => {
    if (user?.targetExamId && exams.some(e => e.id === user.targetExamId)) {
      setActiveExamIdState(user.targetExamId);
      localStorage.setItem(STORAGE_KEY, user.targetExamId);
    }
  }, [user?.targetExamId, exams]);

  const activeExam = exams.find(e => e.id === activeExamId) || exams[0];
  const activeExamSubjects = activeExam.subjects;

  return (
    <ExamContext.Provider
      value={{
        exams,
        activeExam,
        setActiveExamId,
        activeExamSubjects
      }}
    >
      {children}
    </ExamContext.Provider>
  );
};

export const useExam = () => {
  const context = useContext(ExamContext);
  if (!context) {
    throw new Error('useExam must be used within an ExamProvider');
  }
  return context;
};
