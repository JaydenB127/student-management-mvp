import Database from 'better-sqlite3';

const db = new Database('students.db');

// Initialize the database schema
db.exec(`
  CREATE TABLE IF NOT EXISTS students (
    student_id TEXT ,
    name TEXT NOT NULL,
    birth_year INTEGER,
    major TEXT,
    gpa REAL
  )
`);

export default db;
