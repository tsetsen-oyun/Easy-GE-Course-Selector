import fs from 'fs';
import pool from './db.js';

const courses = JSON.parse(fs.readFileSync('./data/courses.json', 'utf8'));

async function seed() {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    for (const c of courses) {

      const result = await client.query(
        'INSERT INTO courses (code, title, category, credits) VALUES ($1, $2, $3, $4) RETURNING id',
        [c.courseCode, c.courseTitle, c.type, c.credits]
      );
      await client.query(
        `INSERT INTO course_assessments
         (course_id, individual_assignments, group_assignments, presentations, quizzes, midterms, has_final)
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [result.rows[0].id, c.individualAssignments, c.groupAssignments,
         c.presentation, c.quizzes, c.midterm, c.hasFinal]
      );
    }
    await client.query('COMMIT');
    console.log('Seed done');
  } catch (err) {
    await client.query('ROLLBACK');   // undo everything if any row fails
    console.error('Seed failed:', err.message);
  } finally {
    client.release();
    await pool.end();
  }
}

seed();