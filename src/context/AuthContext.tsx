import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole, AuthSession } from '../types/auth';
import { DEMO_STUDENT, DEMO_ADMIN } from '../db/mockData';

interface AuthContextType extends AuthSession {
  loginAsStudent: () => void;
  loginAsAdmin: () => void;
  login: (email: string, role?: UserRole) => Promise<boolean>;
  register: (name: string, email: string, targetExamId: string) => Promise<boolean>;
  logout: () => void;
  switchRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = 'examforge_auth_session';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<AuthSession>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return {
          user: parsed,
          token: 'demo-session-token',
          isAuthenticated: true,
          isLoading: false
        };
      }
    } catch (e) {
      console.error('Failed to load stored session', e);
    }
    // Default to student demo for instant rich interactivity
    return {
      user: DEMO_STUDENT,
      token: 'demo-student-token',
      isAuthenticated: true,
      isLoading: false
    };
  });

  useEffect(() => {
    if (session.user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(session.user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [session.user]);

  const loginAsStudent = () => {
    setSession({
      user: DEMO_STUDENT,
      token: 'demo-student-token',
      isAuthenticated: true,
      isLoading: false
    });
  };

  const loginAsAdmin = () => {
    setSession({
      user: DEMO_ADMIN,
      token: 'demo-admin-token',
      isAuthenticated: true,
      isLoading: false
    });
  };

  const login = async (email: string, role: UserRole = 'STUDENT') => {
    setSession(prev => ({ ...prev, isLoading: true }));
    // Simulate auth check
    setTimeout(() => {
      const user: User = role === 'ADMIN' ? DEMO_ADMIN : {
        ...DEMO_STUDENT,
        email,
        name: email.split('@')[0].replace('.', ' ')
      };
      setSession({
        user,
        token: `auth-token-${Date.now()}`,
        isAuthenticated: true,
        isLoading: false
      });
    }, 400);
    return true;
  };

  const register = async (name: string, email: string, targetExamId: string) => {
    setSession(prev => ({ ...prev, isLoading: true }));
    setTimeout(() => {
      const newUser: User = {
        id: `usr-${Date.now()}`,
        name,
        email,
        role: 'STUDENT',
        targetExamId,
        targetYear: 2026,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setSession({
        user: newUser,
        token: `auth-token-${Date.now()}`,
        isAuthenticated: true,
        isLoading: false
      });
    }, 400);
    return true;
  };

  const logout = () => {
    setSession({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false
    });
  };

  const switchRole = (role: UserRole) => {
    if (role === 'ADMIN') {
      loginAsAdmin();
    } else {
      loginAsStudent();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...session,
        loginAsStudent,
        loginAsAdmin,
        login,
        register,
        logout,
        switchRole
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
