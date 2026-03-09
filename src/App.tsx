/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StudentList from './components/StudentList';
import StudentForm from './components/StudentForm';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
        <header className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-10">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <h1 className="text-xl font-bold text-slate-800">Student Management</h1>
            </div>
          </div>
        </header>

        <main className="py-8">
          <Routes>
            <Route path="/" element={<StudentList />} />
            <Route path="/add" element={<StudentForm />} />
            <Route path="/edit/:id" element={<StudentForm />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
