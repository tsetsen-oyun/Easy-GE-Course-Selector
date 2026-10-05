import fs from 'fs';
import pool from './db.js';

const courses = JSON.parse(fs.readFileSync('./data/courses.json', 'utf8'));