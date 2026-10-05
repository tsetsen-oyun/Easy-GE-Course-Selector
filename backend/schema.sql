DROP TABLE IF EXISTS course_assessments, courses CASCADE;

CREATE TABLE courses (
  id SERIAL PRIMARY KEY,
  code TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL,            -- 'Art' or 'Business', as an example
  credits INT NOT NULL,
  predicted_workload NUMERIC(3,1),   -- synthetic data
  workload_category TEXT             
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