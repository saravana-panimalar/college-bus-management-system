import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { DataTable } from '../components/ui/DataTable';
import { StatusBadge } from '../components/ui/StatusBadge';
import { SearchBar } from '../components/ui/SearchBar';
import { Modal } from '../components/ui/Modal';
import { Student } from '../types';
import { studentService } from '../services/studentService';

export const StudentManagement: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStudent, setCurrentStudent] = useState<Partial<Student> | null>(null);

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    setLoading(true);
    try {
      const data = await studentService.getStudents();
      setStudents(data);
    } catch (error) {
      console.error("Failed to load students", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStudent?.id) {
      await studentService.updateStudent(currentStudent.id, currentStudent as Partial<Student>);
    } else {
      await studentService.createStudent(currentStudent as Omit<Student, 'id'>);
    }
    setIsModalOpen(false);
    loadStudents();
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      await studentService.deleteStudent(id);
      loadStudents();
    }
  };

  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(search.toLowerCase()) ||
    student.rollNumber.toLowerCase().includes(search.toLowerCase()) ||
    student.department.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    { header: 'Roll No.', accessorKey: 'rollNumber' },
    { header: 'Name', accessorKey: 'name' },
    { header: 'Department', accessorKey: 'department' },
    { header: 'Assigned Route', accessorKey: 'assignedRouteId' },
    { header: 'Pickup Stop', accessorKey: 'pickupStop' },
    { 
      header: 'Status', 
      accessorKey: 'status',
      cell: (student: Student) => <StatusBadge status={student.status} />
    },
    {
      header: 'Actions',
      accessorKey: 'id',
      cell: (student: Student) => (
        <div className="flex gap-2">
          <button onClick={() => { setCurrentStudent(student); setIsModalOpen(true); }} className="text-gray-400 hover:text-blue-600">
            <Edit className="h-4 w-4" />
          </button>
          <button onClick={() => handleDelete(student.id)} className="text-gray-400 hover:text-red-600">
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Student Management
          </h2>
          <p className="mt-1 text-sm text-gray-500">Manage student bus registrations.</p>
        </div>
        <div className="mt-4 sm:ml-4 sm:mt-0">
          <button
            onClick={() => { setCurrentStudent({}); setIsModalOpen(true); }}
            className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
          >
            <Plus className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
            Add Student
          </button>
        </div>
      </div>

      <div className="w-full max-w-sm">
        <SearchBar placeholder="Search by name or roll no..." onSearch={setSearch} />
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <DataTable columns={columns} data={filteredStudents} keyExtractor={(item) => item.id} />
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={currentStudent?.id ? 'Edit Student' : 'Add New Student'}
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
              value={currentStudent?.name || ''}
              onChange={e => setCurrentStudent({...currentStudent, name: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Roll No.</label>
            <input
              type="text"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
              value={currentStudent?.rollNumber || ''}
              onChange={e => setCurrentStudent({...currentStudent, rollNumber: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Department</label>
            <input
              type="text"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
              value={currentStudent?.department || ''}
              onChange={e => setCurrentStudent({...currentStudent, department: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Pickup Stop</label>
            <input
              type="text"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
              value={currentStudent?.pickupStop || ''}
              onChange={e => setCurrentStudent({...currentStudent, pickupStop: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
              value={currentStudent?.status || 'Active'}
              onChange={e => setCurrentStudent({...currentStudent, status: e.target.value as any})}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
            <button
              type="submit"
              className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:col-start-2"
            >
              Save
            </button>
            <button
              type="button"
              className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
