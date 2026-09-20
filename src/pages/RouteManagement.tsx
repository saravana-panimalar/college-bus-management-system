import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { DataTable } from '../components/ui/DataTable';
import { StatusBadge } from '../components/ui/StatusBadge';
import { SearchBar } from '../components/ui/SearchBar';
import { Modal } from '../components/ui/Modal';
import { Route } from '../types';
import { routeService } from '../services/routeService';

export const RouteManagement: React.FC = () => {
  const [routes, setRoutes] = useState<Route[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRoute, setCurrentRoute] = useState<Partial<Route> | null>(null);

  useEffect(() => {
    loadRoutes();
  }, []);

  const loadRoutes = async () => {
    setLoading(true);
    try {
      const data = await routeService.getRoutes();
      setRoutes(data);
    } catch (error) {
      console.error("Failed to load routes", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentRoute?.id) {
      await routeService.updateRoute(currentRoute.id, currentRoute as Partial<Route>);
    } else {
      await routeService.createRoute(currentRoute as Omit<Route, 'id'>);
    }
    setIsModalOpen(false);
    loadRoutes();
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this route?')) {
      await routeService.deleteRoute(id);
      loadRoutes();
    }
  };

  const filteredRoutes = routes.filter(route => 
    route.routeName.toLowerCase().includes(search.toLowerCase()) ||
    route.startingPoint.toLowerCase().includes(search.toLowerCase()) ||
    route.destination.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    { header: 'Route ID', accessorKey: 'id' },
    { header: 'Route Name', accessorKey: 'routeName' },
    { header: 'Starting Point', accessorKey: 'startingPoint' },
    { header: 'Destination', accessorKey: 'destination' },
    { 
      header: 'Status', 
      accessorKey: 'status',
      cell: (route: Route) => <StatusBadge status={route.status} />
    },
    {
      header: 'Actions',
      accessorKey: 'id',
      cell: (route: Route) => (
        <div className="flex gap-2">
          <button onClick={() => { setCurrentRoute(route); setIsModalOpen(true); }} className="text-gray-400 hover:text-blue-600">
            <Edit className="h-4 w-4" />
          </button>
          <button onClick={() => handleDelete(route.id)} className="text-gray-400 hover:text-red-600">
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
            Route Management
          </h2>
          <p className="mt-1 text-sm text-gray-500">Manage bus routes and stops.</p>
        </div>
        <div className="mt-4 sm:ml-4 sm:mt-0">
          <button
            onClick={() => { setCurrentRoute({}); setIsModalOpen(true); }}
            className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
          >
            <Plus className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
            Add Route
          </button>
        </div>
      </div>

      <div className="w-full max-w-sm">
        <SearchBar placeholder="Search routes..." onSearch={setSearch} />
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <DataTable columns={columns} data={filteredRoutes} keyExtractor={(item) => item.id} />
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={currentRoute?.id ? 'Edit Route' : 'Add New Route'}
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Route Name</label>
            <input
              type="text"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
              value={currentRoute?.routeName || ''}
              onChange={e => setCurrentRoute({...currentRoute, routeName: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Starting Point</label>
            <input
              type="text"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
              value={currentRoute?.startingPoint || ''}
              onChange={e => setCurrentRoute({...currentRoute, startingPoint: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Destination</label>
            <input
              type="text"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
              value={currentRoute?.destination || ''}
              onChange={e => setCurrentRoute({...currentRoute, destination: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Distance (km)</label>
            <input
              type="number"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
              value={currentRoute?.distance || ''}
              onChange={e => setCurrentRoute({...currentRoute, distance: parseInt(e.target.value)})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
              value={currentRoute?.status || 'Active'}
              onChange={e => setCurrentRoute({...currentRoute, status: e.target.value as any})}
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
