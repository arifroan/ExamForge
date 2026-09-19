/**
 * ExamForge Clean Auth Service Interface
 * 
 * Defines the contract for user authentication, session state, and role management.
 * In this UI foundation phase, LocalAuthService handles immediate simulated logins
 * and instant demo switching without needing AUTH_SECRET or GOOGLE_CLIENT_ID / SECRET.
 * In the backend phase, this can be swapped for a real JWT / OAuth service.
 */

import { User, UserRole } from '../types/auth';

export interface AuthResponse {
  user: User;
  token: string;
}

export interface IAuthService {
  signIn(email: string, role?: UserRole): Promise<AuthResponse>;
  signUp(name: string, email: string, targetExamId: string): Promise<AuthResponse>;
  signOut(): Promise<void>;
  getCurrentUser(): User | null;
}

class LocalAuthService implements IAuthService {
  private currentUser: User | null = null;

  constructor() {
    // Check if session exists in localStorage for UI preview stability
    try {
      const stored = localStorage.getItem('examforge_session_user');
      if (stored) {
        this.currentUser = JSON.parse(stored);
      }
    } catch {
      this.currentUser = null;
    }
  }

  async signIn(email: string, role: UserRole = 'STUDENT'): Promise<AuthResponse> {
    const user: User = role === 'ADMIN' ? {
      id: 'usr-demo-admin',
      name: 'Dr. Radhika Verma',
      email: email || 'admin@examforge.edu',
      role: 'ADMIN',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    } : {
      id: 'usr-demo-student',
      name: 'Aarav Sharma',
      email: email || 'aarav.sharma@example.edu',
      role: 'STUDENT',
      targetExamId: 'jee-main',
      targetYear: 2026,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.currentUser = user;
    try {
      localStorage.setItem('examforge_session_user', JSON.stringify(user));
    } catch {}

    return { user, token: `mock-token-${Date.now()}` };
  }

  async signUp(name: string, email: string, targetExamId: string): Promise<AuthResponse> {
    const user: User = {
      id: `usr-${Date.now()}`,
      name: name || 'Student Aspirant',
      email,
      role: 'STUDENT',
      targetExamId: targetExamId || 'jee-main',
      targetYear: 2026,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.currentUser = user;
    try {
      localStorage.setItem('examforge_session_user', JSON.stringify(user));
    } catch {}

    return { user, token: `mock-token-${Date.now()}` };
  }

  async signOut(): Promise<void> {
    this.currentUser = null;
    try {
      localStorage.removeItem('examforge_session_user');
    } catch {}
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }
}

export const authService: IAuthService = new LocalAuthService();
