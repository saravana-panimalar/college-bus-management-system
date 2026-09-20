import { Student } from '../types';

export const mockStudents: Student[] = Array.from({ length: 20 }).map((_, i) => ({
  id: `S${(i + 1).toString().padStart(3, '0')}`,
  rollNumber: `2024CS${(i + 1).toString().padStart(3, '0')}`,
  name: `Student Name ${i + 1}`,
  department: ['Computer Science', 'Mechanical', 'Civil', 'Electronics'][i % 4],
  year: ['1st Year', '2nd Year', '3rd Year', '4th Year'][i % 4],
  phone: `99001122${(i + 10).toString().slice(-2)}`,
  email: `student${i + 1}@college.edu`,
  parentContact: `99003344${(i + 10).toString().slice(-2)}`,
  assignedRouteId: `R00${(i % 5) + 1}`,
  pickupStop: ['MG Road', 'Hebbal', 'Silk Board', 'Vijayanagar', 'Whitefield'][i % 5],
  status: i === 19 ? 'Inactive' : 'Active',
}));
