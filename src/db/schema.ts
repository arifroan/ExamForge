/**
 * ExamForge - Database Architecture & Schema Specification
 * 
 * Standard Normalized Relational Schema for PostgreSQL / Cloud SQL / CockroachDB
 * Designed for high concurrency, partitioned attempt logs, and flexible multi-exam taxonomies.
 */

export const DATABASE_SCHEMA_SQL = `
-- ==========================================================
-- 1. ENUM DEFINITIONS
-- ==========================================================
CREATE TYPE user_role AS ENUM ('STUDENT', 'ADMIN', 'CONTENT_CREATOR', 'MODERATOR');
CREATE TYPE question_type AS ENUM (
  'SINGLE_CORRECT_MCQ',
  'MULTIPLE_CORRECT',
  'NUMERICAL_ANSWER',
  'ASSERTION_REASON',
  'MATCH_FOLLOWING'
);
CREATE TYPE difficulty_level AS ENUM ('EASY', 'MEDIUM', 'HARD');
CREATE TYPE test_status AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');
CREATE TYPE attempt_status AS ENUM ('IN_PROGRESS', 'SUBMITTED', 'AUTO_SUBMITTED', 'ABANDONED');
CREATE TYPE palette_state AS ENUM (
  'NOT_VISITED',
  'NOT_ANSWERED',
  'ANSWERED',
  'MARKED_FOR_REVIEW',
  'ANSWERED_AND_MARKED'
);

-- ==========================================================
-- 2. CORE USERS & AUTHENTICATION
-- ==========================================================
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255),
  name VARCHAR(150) NOT NULL,
  avatar_url TEXT,
  role user_role NOT NULL DEFAULT 'STUDENT',
  target_exam_id UUID,
  target_year SMALLINT,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);

-- ==========================================================
-- 3. EXAM & SUBJECT TAXONOMY
-- ==========================================================
CREATE TABLE exams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  short_name VARCHAR(20) NOT NULL UNIQUE,
  description TEXT,
  marking_scheme JSONB NOT NULL, -- {correct: 4, negative: 1, partial: false, maxMarks: 300}
  duration_minutes INTEGER NOT NULL,
  question_count INTEGER NOT NULL,
  active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE subjects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  exam_id UUID NOT NULL REFERENCES exams(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  code VARCHAR(20) NOT NULL,
  icon_name VARCHAR(50),
  sort_order SMALLINT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT uq_subject_code_exam UNIQUE (exam_id, code)
);

CREATE INDEX idx_subjects_exam ON subjects(exam_id, sort_order);

CREATE TABLE chapters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subject_id UUID NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
  name VARCHAR(150) NOT NULL,
  sort_order SMALLINT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_chapters_subject ON chapters(subject_id, sort_order);

CREATE TABLE topics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chapter_id UUID NOT NULL REFERENCES chapters(id) ON DELETE CASCADE,
  name VARCHAR(150) NOT NULL,
  sort_order SMALLINT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_topics_chapter ON topics(chapter_id, sort_order);

-- ==========================================================
-- 4. QUESTION BANK ENGINE
-- ==========================================================
CREATE TABLE questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  exam_id UUID NOT NULL REFERENCES exams(id) ON DELETE RESTRICT,
  subject_id UUID NOT NULL REFERENCES subjects(id) ON DELETE RESTRICT,
  chapter_id UUID NOT NULL REFERENCES chapters(id) ON DELETE RESTRICT,
  topic_id UUID NOT NULL REFERENCES topics(id) ON DELETE RESTRICT,
  question_text TEXT NOT NULL,
  question_type question_type NOT NULL DEFAULT 'SINGLE_CORRECT_MCQ',
  correct_answer JSONB NOT NULL, -- e.g. "A" or ["A", "C"] or 45.2
  explanation TEXT NOT NULL,
  difficulty difficulty_level NOT NULL DEFAULT 'MEDIUM',
  marks NUMERIC(4, 2) NOT NULL DEFAULT 4.0,
  negative_marks NUMERIC(4, 2) NOT NULL DEFAULT 1.0,
  year SMALLINT,
  source VARCHAR(100) NOT NULL DEFAULT 'Demo Question',
  question_number INTEGER,
  language VARCHAR(5) NOT NULL DEFAULT 'EN',
  image_url TEXT,
  solution_image_url TEXT,
  tags TEXT[] DEFAULT '{}',
  assertion TEXT,
  reason TEXT,
  match_pairs JSONB, -- list of {leftKey, leftText, rightKey, rightText}
  active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_questions_exam_subject ON questions(exam_id, subject_id, chapter_id);
CREATE INDEX idx_questions_topic ON questions(topic_id);
CREATE INDEX idx_questions_difficulty ON questions(difficulty);
CREATE INDEX idx_questions_type ON questions(question_type);
CREATE INDEX idx_questions_year ON questions(year) WHERE year IS NOT NULL;
CREATE INDEX idx_questions_tags ON questions USING gin(tags);

CREATE TABLE question_options (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id UUID NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
  label VARCHAR(5) NOT NULL, -- 'A', 'B', 'C', 'D'
  text TEXT NOT NULL,
  image_url TEXT,
  sort_order SMALLINT NOT NULL DEFAULT 0,
  CONSTRAINT uq_question_option UNIQUE (question_id, label)
);

CREATE INDEX idx_options_question ON question_options(question_id, sort_order);

-- ==========================================================
-- 5. TEST & MOCK EXAMINATION ENGINE
-- ==========================================================
CREATE TABLE tests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  exam_id UUID NOT NULL REFERENCES exams(id) ON DELETE RESTRICT,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  duration_minutes INTEGER NOT NULL,
  total_marks NUMERIC(6, 2) NOT NULL,
  total_questions INTEGER NOT NULL,
  is_full_mock BOOLEAN NOT NULL DEFAULT TRUE,
  status test_status NOT NULL DEFAULT 'PUBLISHED',
  created_by UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_tests_exam ON tests(exam_id, status);

CREATE TABLE test_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  test_id UUID NOT NULL REFERENCES tests(id) ON DELETE CASCADE,
  question_id UUID NOT NULL REFERENCES questions(id) ON DELETE RESTRICT,
  section_name VARCHAR(100) NOT NULL DEFAULT 'Section A',
  sort_order INTEGER NOT NULL,
  marks NUMERIC(4, 2),
  negative_marks NUMERIC(4, 2),
  CONSTRAINT uq_test_question UNIQUE (test_id, question_id)
);

CREATE INDEX idx_test_questions_test ON test_questions(test_id, sort_order);

-- ==========================================================
-- 6. STUDENT ATTEMPTS & ANSWERS (Partitionable by date/test)
-- ==========================================================
CREATE TABLE test_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  test_id UUID NOT NULL REFERENCES tests(id) ON DELETE RESTRICT,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  status attempt_status NOT NULL DEFAULT 'IN_PROGRESS',
  started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  time_used_seconds INTEGER NOT NULL DEFAULT 0,
  total_score NUMERIC(6, 2) NOT NULL DEFAULT 0.0,
  max_score NUMERIC(6, 2) NOT NULL,
  percentage NUMERIC(5, 2) NOT NULL DEFAULT 0.0,
  accuracy NUMERIC(5, 2) NOT NULL DEFAULT 0.0,
  correct_count INTEGER NOT NULL DEFAULT 0,
  incorrect_count INTEGER NOT NULL DEFAULT 0,
  unattempted_count INTEGER NOT NULL DEFAULT 0
);

CREATE INDEX idx_attempts_user ON test_attempts(user_id, started_at DESC);
CREATE INDEX idx_attempts_test ON test_attempts(test_id);

CREATE TABLE attempt_answers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  attempt_id UUID NOT NULL REFERENCES test_attempts(id) ON DELETE CASCADE,
  question_id UUID NOT NULL REFERENCES questions(id) ON DELETE RESTRICT,
  selected_answer JSONB,
  palette_status palette_state NOT NULL DEFAULT 'NOT_VISITED',
  time_spent_seconds INTEGER NOT NULL DEFAULT 0,
  is_correct BOOLEAN,
  marks_awarded NUMERIC(4, 2) NOT NULL DEFAULT 0.0,
  answered_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT uq_attempt_question UNIQUE (attempt_id, question_id)
);

CREATE INDEX idx_attempt_answers_attempt ON attempt_answers(attempt_id);

-- ==========================================================
-- 7. PROGRESS, BOOKMARKS & INCORRECT POOL
-- ==========================================================
CREATE TABLE bookmarks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  question_id UUID NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT uq_user_bookmark UNIQUE (user_id, question_id)
);

CREATE INDEX idx_bookmarks_user ON bookmarks(user_id, created_at DESC);

CREATE TABLE user_incorrect_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  question_id UUID NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
  last_user_answer JSONB,
  failed_attempts_count SMALLINT NOT NULL DEFAULT 1,
  is_resolved BOOLEAN NOT NULL DEFAULT FALSE,
  last_attempted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  resolved_at TIMESTAMPTZ,
  CONSTRAINT uq_user_incorrect UNIQUE (user_id, question_id)
);

CREATE INDEX idx_incorrect_user ON user_incorrect_questions(user_id, is_resolved);

CREATE TABLE user_topic_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  topic_id UUID NOT NULL REFERENCES topics(id) ON DELETE CASCADE,
  questions_attempted INTEGER NOT NULL DEFAULT 0,
  questions_correct INTEGER NOT NULL DEFAULT 0,
  accuracy_rate NUMERIC(5, 2) NOT NULL DEFAULT 0.0,
  total_time_seconds INTEGER NOT NULL DEFAULT 0,
  last_practiced_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT uq_user_topic UNIQUE (user_id, topic_id)
);

CREATE INDEX idx_user_topic_progress ON user_topic_progress(user_id, topic_id);
`;
