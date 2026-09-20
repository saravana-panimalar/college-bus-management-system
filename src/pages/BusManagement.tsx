import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import { DataTable } from '../components/ui/DataTable';
import { StatusBadge } from '../components/ui/StatusBadge';
import { SearchBar } from '../components/ui/SearchBar';
import { Modal } from '../components/ui/Modal';
import { Bus } from '../types';
import { busService } from '../services/busService';
import { formatDate } from '../utils';

export const BusManagement: React.FC = () => {
  const [buses, setBuses] = useState<Bus[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentBus, setCurrentBus] = useState<Partial<Bus> | null>(null);

  useEffect(() => {
    loadBuses();
  }, []);

  const loadBuses = async () => {
    setLoading(true);
    try {
      const data = await busService.getBuses();
      setBuses(data);
    } catch (error) {
      console.error("Failed to load buses", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentBus?.id) {
      await busService.updateBus(currentBus.id, currentBus as Partial<Bus>);
    } else {
      await busService.createBus(currentBus as Omit<Bus, 'id'>);
    }
    setIsModalOpen(false);
    loadBuses();
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this bus?')) {
      await busService.deleteBus(id);
      loadBuses();
    }
  };

  const filteredBuses = buses.filter(bus => 
    bus.busNumber.toLowerCase().includes(search.toLowerCase()) ||
    bus.registrationNumber.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    { header: 'Bus Number', accessorKey: 'busNumber' },
    { header: 'Reg. Number', accessorKey: 'registrationNumber' },
    { header: 'Capacity', accessorKey: 'capacity' },
    { 
      header: 'Status', 
      accessorKey: 'status',
      cell: (bus: Bus) => <StatusBadge status={bus.status} />
    },
    { 
      header: 'Last Maint.', 
      accessorKey: 'lastMaintenanceDate',
      cell: (bus: Bus) => formatDate(bus.lastMaintenanceDate)
    },
    {
      header: 'Actions',
      accessorKey: 'id',
      cell: (bus: Bus) => (
        <div className="flex gap-2">
          <button onClick={() => { setCurrentBus(bus); setIsModalOpen(true); }} className="text-gray-400 hover:text-blue-600">
            <Edit className="h-4 w-4" />
          </button>
          <button onClick={() => handleDelete(bus.id)} className="text-gray-400 hover:text-red-600">
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
            Bus Management
          </h2>
          <p className="mt-1 text-sm text-gray-500">Manage all college buses in the fleet.</p>
        </div>
        <div className="mt-4 sm:ml-4 sm:mt-0">
          <button
            onClick={() => { setCurrentBus({}); setIsModalOpen(true); }}
            className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            <Plus className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
            Add Bus
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="w-full max-w-sm">
          <SearchBar placeholder="Search buses..." onSearch={setSearch} />
        </div>
        {/* Filters could go here */}
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <DataTable columns={columns} data={filteredBuses} keyExtractor={(item) => item.id} />
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={currentBus?.id ? 'Edit Bus' : 'Add New Bus'}
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Bus Number</label>
            <input
              type="text"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
              value={currentBus?.busNumber || ''}
              onChange={e => setCurrentBus({...currentBus, busNumber: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Registration Number</label>
            <input
              type="text"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
              value={currentBus?.registrationNumber || ''}
              onChange={e => setCurrentBus({...currentBus, registrationNumber: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Capacity</label>
            <input
              type="number"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
              value={currentBus?.capacity || ''}
              onChange={e => setCurrentBus({...currentBus, capacity: parseInt(e.target.value)})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
              value={currentBus?.status || 'Active'}
              onChange={e => setCurrentBus({...currentBus, status: e.target.value as any})}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Maintenance">Maintenance</option>
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
