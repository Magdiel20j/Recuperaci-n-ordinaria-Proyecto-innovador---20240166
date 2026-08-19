import { createContext, useState, useEffect } from 'react';
import { API_URL } from '../utils/api.js';
import { INITIAL_STUDENTS } from '../utils/initialData';

export const StudentContext = createContext();

export const StudentProvider = ({ children }) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStudents = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setStudents(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const seedInitialData = async () => {
    setLoading(true);
    for (const student of INITIAL_STUDENTS) {
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(student),
      });
    }
    await fetchStudents();
  };

  const addStudent = async (student) => {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(student),
    });
    if (res.ok) fetchStudents();
  };

  const updateStudent = async (id, student) => {
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(student),
    });
    if (res.ok) fetchStudents();
  };

  const deleteStudent = async (id) => {
    const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    if (res.ok) fetchStudents();
  };

  return (
    <StudentContext.Provider value={{ students, loading, addStudent, updateStudent, deleteStudent, seedInitialData }}>
      {children}
    </StudentContext.Provider>
  );
};