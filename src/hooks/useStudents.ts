import { useState, useEffect } from 'react';
import { Student, StudentProfile } from '../types';
import { mockStudents, generateStudentProfile } from '../data/mockData';

export const useStudents = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setStudents(mockStudents);
      setLoading(false);
    }, 1000);
  }, []);

  const addStudent = (student: Omit<Student, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newStudent: Student = {
      ...student,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setStudents(prev => [...prev, newStudent]);
    return newStudent;
  };

  const updateStudent = (id: string, updates: Partial<Student>) => {
    setStudents(prev => 
      prev.map(student => 
        student.id === id 
          ? { ...student, ...updates, updatedAt: new Date() }
          : student
      )
    );
  };

  const deleteStudent = (id: string) => {
    setStudents(prev => prev.filter(student => student.id !== id));
  };

  const getStudentProfile = async (id: string): Promise<StudentProfile | null> => {
    const student = students.find(s => s.id === id);
    if (!student) return null;
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return generateStudentProfile(student);
  };

  const syncStudent = async (id: string) => {
    setLoading(true);
    try {
      // Simulate sync process
      await new Promise(resolve => setTimeout(resolve, 2000));
      updateStudent(id, { 
        lastSyncAt: new Date(),
        currentRating: Math.floor(Math.random() * 500) + 1200,
      });
    } catch (err) {
      setError('Failed to sync student data');
    } finally {
      setLoading(false);
    }
  };

  return {
    students,
    loading,
    error,
    addStudent,
    updateStudent,
    deleteStudent,
    getStudentProfile,
    syncStudent,
  };
};