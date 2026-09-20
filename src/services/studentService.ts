import { Student } from '../types';
import { mockStudents } from '../mock/mockStudents';
import { apiRequest } from './apiConfig';

let students = [...mockStudents];

export const studentService = {
  getStudents: async (): Promise<Student[]> => {
    return apiRequest<Student[]>(
      '/students',
      { method: 'GET' },
      () => new Promise((resolve) => setTimeout(() => resolve([...students]), 150))
    );
  },
  
  getStudentById: async (id: string): Promise<Student | undefined> => {
    return apiRequest<Student>(
      `/students/${id}`,
      { method: 'GET' },
      () => new Promise((resolve) => setTimeout(() => resolve(students.find(s => s.id === id)), 100))
    );
  },

  createStudent: async (student: Omit<Student, 'id'>): Promise<Student> => {
    return apiRequest<Student>(
      '/students',
      {
        method: 'POST',
        body: JSON.stringify(student)
      },
      () => new Promise((resolve) => {
        const newStudent = { ...student, id: `S${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}` };
        students.push(newStudent as Student);
        setTimeout(() => resolve(newStudent as Student), 150);
      })
    );
  },

  updateStudent: async (id: string, student: Partial<Student>): Promise<Student> => {
    return apiRequest<Student>(
      `/students/${id}`,
      {
        method: 'PUT',
        body: JSON.stringify(student)
      },
      () => new Promise((resolve, reject) => {
        const index = students.findIndex(s => s.id === id);
        if (index === -1) reject(new Error('Student not found'));
        students[index] = { ...students[index], ...student };
        setTimeout(() => resolve(students[index]), 150);
      })
    );
  },

  deleteStudent: async (id: string): Promise<void> => {
    return apiRequest<void>(
      `/students/${id}`,
      { method: 'DELETE' },
      () => new Promise((resolve) => {
        students = students.filter(s => s.id !== id);
        setTimeout(() => resolve(), 150);
      })
    );
  }
};
