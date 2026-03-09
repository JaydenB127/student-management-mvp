import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Pencil, Trash2, Plus } from 'lucide-react';
import { Student } from '../types';

export default function StudentList() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchStudents = async () => {
    try {
      const response = await fetch('/api/students');
      if (response.ok) {
        const data = await response.json();
        setStudents(data);
      }
    } catch (error) {
      console.error('Failed to fetch students:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this student?')) return;
    
    try {
      const response = await fetch(`/api/students/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchStudents();
      } else {
        alert('Failed to delete student');
      }
    } catch (error) {
      console.error('Failed to delete student:', error);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-slate-800">Students</h1>
        <Link
          to="/add"
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          <Plus size={20} />
          Add Student
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-medium">
              <th className="p-4">ID</th>
              <th className="p-4">Name</th>
              <th className="p-4">Major</th>
              <th className="p-4">GPA</th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {students.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-slate-500">
                  No students found. Add one to get started!
                </td>
              </tr>
            ) : (
              students.map((student) => (
                <tr key={student.student_id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-mono text-sm text-slate-600">{student.student_id}</td>
                  <td className="p-4 font-medium text-slate-800">{student.name}</td>
                  <td className="p-4 text-slate-600">{student.major}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      student.gpa >= 3.5 ? 'bg-emerald-100 text-emerald-800' :
                      student.gpa >= 2.5 ? 'bg-amber-100 text-amber-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {student.gpa.toFixed(2)}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-center gap-3">
                      <Link
                        to={`/edit/${student.student_id}`}
                        className="text-indigo-600 hover:text-indigo-900 transition-colors p-1"
                        title="Edit"
                      >
                        <Pencil size={18} />
                      </Link>
                      <button
                        onClick={() => handleDelete(student.student_id)}
                        className="text-red-500 hover:text-red-700 transition-colors p-1"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
