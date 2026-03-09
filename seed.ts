import db from './src/db.ts';

const seedData = [
  { student_id: 'SV001', name: 'Alice Turing', birth_year: 2003, major: 'Data Science', gpa: 3.9 },
  { student_id: 'SV002', name: 'Bob Lovelace', birth_year: 2004, major: 'Machine Learning', gpa: 3.7 },
  { student_id: 'SV003', name: 'Charlie Babbage', birth_year: 2002, major: 'Quantitative Finance', gpa: 3.8 },
  { student_id: 'SV004', name: 'Diana Hopper', birth_year: 2005, major: 'Computer Science', gpa: 4.0 },
  { student_id: 'SV005', name: 'Eve Dijkstra', birth_year: 2003, major: 'Artificial Intelligence', gpa: 3.6 },
];

const insert = db.prepare(`
  INSERT OR IGNORE INTO students (student_id, name, birth_year, major, gpa)
  VALUES (@student_id, @name, @birth_year, @major, @gpa)
`);

const insertMany = db.transaction((students) => {
  for (const student of students) {
    insert.run(student);
  }
});

insertMany(seedData);

console.log('Database seeded successfully with 5 mock students.');
