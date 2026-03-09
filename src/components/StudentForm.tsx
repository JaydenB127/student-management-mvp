import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { Student } from '../types';

export default function
  StudentForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState<Student>({
    student_id: '',
    name: '',
    birth_year: new Date().getFullYear() - 20,
    major: '',
    gpa: 0.0,
  });
  const [loading, setLoading] = useState(isEditMode);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEditMode) {
      const fetchStudent = async () => {
        try {
          const response = await fetch('/api/students');
          if (response.ok) {
            const students: Student[] = await response.json();
            const student = students.find(s => s.student_id === id);
            if (student) {
              setFormData(student);
            } else {
              setError('Student not found');
            }
          }
        } catch (err) {
          setError('Failed to fetch student details');
        } finally {
          setLoading(false);
        }
      };
      fetchStudent();
    }
  }, [id, isEditMode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'birth_year' ? parseInt(value) || '' :
        name === 'gpa' ? parseFloat(value) || 0 : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (!formData.student_id.trim()) {
      setError('Student ID is required');
      return;
    }
    if (!formData.name.trim()) {
      setError('Name is required');
      return;
    }
    if (formData.gpa < 0 || formData.gpa > 4.0) {
      setError('GPA must be between 0.0 and 4.0');
      return;
    }

    try {
      const url = isEditMode ? `/api/students/${id}` : '/api/students';
      const method = isEditMode ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        navigate('/');
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to save student');
      }
    } catch (err) {
      setError('An error occurred while saving');
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-6">
        <Link to="/" className="inline-flex items-center text-slate-500 hover:text-slate-800 transition-colors mb-4">
          <ArrowLeft size={16} className="mr-2" />
          Back to List
        </Link>
        <h1 className="text-3xl font-bold text-slate-800">
          {isEditMode ? 'Edit Student' : 'Add New Student'}
        </h1>
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6 border border-red-200">
          {error}
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="student_id" className="block text-sm font-medium text-slate-700">
                Student ID <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="student_id"
                name="student_id"
                value={formData.student_id}
                onChange={handleChange}
                disabled={isEditMode}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-slate-100 disabled:text-slate-500"
                placeholder="e.g. SV001"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-slate-700">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="e.g. John Doe"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="major" className="block text-sm font-medium text-slate-700">
                Major
              </label>
              <input
                type="text"
                id="major"
                name="major"
                value={formData.major}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="e.g. Computer Science"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="birth_year" className="block text-sm font-medium text-slate-700">
                  Birth Year
                </label>
                <input
                  type="number"
                  id="birth_year"
                  name="birth_year"
                  value={formData.birth_year}
                  onChange={handleChange}
                  min="1900"
                  max={new Date().getFullYear()}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="gpa" className="block text-sm font-medium text-slate-700">
                  GPA
                </label>
                <input
                  type="number"
                  id="gpa"
                  name="gpa"
                  value={formData.gpa}
                  onChange={handleChange}
                  min="0"
                  max="4.0"
                  step="0.01"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-slate-100">
            <Link
              to="/"
              className="px-6 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 font-medium transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium transition-colors"
            >
              <Save size={18} />
              {isEditMode ? 'Update Student' : 'Add Student'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
