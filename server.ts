import express from 'express';
import { createServer as createViteServer } from 'vite';
import db from './src/db.ts';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get('/api/students', (req, res) => {
    try {
      const students = db.prepare('SELECT * FROM students').all();
      res.json(students);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch students' });
    }
  });

  app.post('/api/students', (req, res) => {
    const { student_id, name, birth_year, major, gpa } = req.body;
    try {
      const stmt = db.prepare('INSERT INTO students (student_id, name, birth_year, major, gpa) VALUES (?, ?, ?, ?, ?)');
      stmt.run(student_id, name, birth_year, major, gpa);
      res.status(201).json({ message: 'Student created successfully' });
    } catch (error: any) {
      if (error.code === 'SQLITE_CONSTRAINT_PRIMARYKEY') {
        res.status(400).json({ error: 'Student ID already exists' });
      } else {
        res.status(500).json({ error: 'Failed to create student' });
      }
    }
  });

  app.put('/api/students/:id', (req, res) => {
    const { id } = req.params;
    const { name, birth_year, major, gpa } = req.body;
    try {
      const stmt = db.prepare('UPDATE students SET name = ?, birth_year = ?, major = ?, gpa = ? WHERE student_id = ?');
      const info = stmt.run(name, birth_year, major, gpa, id);
      if (info.changes > 0) {
        res.json({ message: 'Student updated successfully' });
      } else {
        res.status(404).json({ error: 'Student not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to update student' });
    }
  });

  app.delete('/api/students/:id', (req, res) => {
    const { id } = req.params;
    try {
      const stmt = db.prepare('DELETE FROM students WHERE student_id = ?');
      const info = stmt.run(id);
      if (info.changes > 0) {
        res.json({ message: 'Student deleted successfully' });
      } else {
        res.status(404).json({ error: 'Student not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete student' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static('dist'));
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
