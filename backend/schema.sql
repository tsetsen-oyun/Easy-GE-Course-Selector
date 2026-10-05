DROP TABLE IF EXISTS course_assessments, courses CASCADE;

CREATE TABLE courses (
  id SERIAL PRIMARY KEY,
  code TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL,            -- 'Art' or 'Business' (courses.json "type")
  credits INT NOT NULL,
  predicted_workload NUMERIC(3,1),   -- 0-10, filled later by the ML script. Synthetic data!
  workload_category TEXT             -- 'Low' | 'Moderate' | 'High'
);

CREATE TABLE course_assessments (
  course_id INT PRIMARY KEY REFERENCES courses(id) ON DELETE CASCADE,
  individual_assignments INT NOT NULL DEFAULT 0,
  group_assignments INT NOT NULL DEFAULT 0,
  presentations INT NOT NULL DEFAULT 0,
  quizzes INT NOT NULL DEFAULT 0,
  midterms INT NOT NULL DEFAULT 0,
  has_final BOOLEAN NOT NULL DEFAULT false
);