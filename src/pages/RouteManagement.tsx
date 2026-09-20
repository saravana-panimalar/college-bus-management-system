import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, RefreshCw, Clock, Bus as BusIcon, Database } from 'lucide-react';
import { DataTable } from '../components/ui/DataTable';
import { StatusBadge } from '../components/ui/StatusBadge';
import { SearchBar } from '../components/ui/SearchBar';
import { Modal } from '../components/ui/Modal';
import { Route } from '../types';
import { routeService } from '../services/routeService';
import { apiRequest } from '../services/apiConfig';

export const RouteManagement: React.FC = () => {
  const [routes, setRoutes] = useState<Route[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
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

  const handleSyncDatabase = async () => {
    setSyncing(true);
    try {
      await apiRequest('/db/sync-seed', { method: 'POST' });
      await loadRoutes();
    } catch (err) {
      console.error('Failed to sync routes to database', err);
    } finally {
      setSyncing(false);
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
    route.destination.toLowerCase().includes(search.toLowerCase()) ||
    route.id.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    { 
      header: 'Route ID', 
      accessorKey: 'id',
      cell: (route: Route) => (
        <span className="font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded text-xs">
          {route.id}
        </span>
      )
    },
    { 
      header: 'Source / Starting Point', 
      accessorKey: 'startingPoint',
      cell: (route: Route) => (
        <div>
          <div className="font-medium text-gray-900">{route.startingPoint}</div>
          <div className="text-xs text-gray-500">{route.routeName}</div>
        </div>
      )
    },
    { 
      header: 'Timings (Pickup → College)', 
      accessorKey: 'sourceTime',
      cell: (route: Route) => (
        <div className="flex items-center gap-1.5 text-xs text-gray-700 font-medium">
          <Clock className="h-3.5 w-3.5 text-blue-500" />
          <span className="bg-amber-50 text-amber-800 border border-amber-200 px-1.5 py-0.5 rounded">
            {route.sourceTime || '06:00 AM'}
          </span>
          <span className="text-gray-400">→</span>
          <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-1.5 py-0.5 rounded">
            {route.destinationTime || '07:15 AM'}
          </span>
        </div>
      )
    },
    { 
      header: 'Destination', 
      accessorKey: 'destination',
      cell: (route: Route) => (
        <span className="text-xs text-gray-700 font-medium">{route.destination}</span>
      )
    },
    { 
      header: 'Assigned Bus', 
      accessorKey: 'assignedBusId',
      cell: (route: Route) => (
        <div className="flex items-center gap-1 text-xs text-gray-600">
          <BusIcon className="h-3.5 w-3.5 text-gray-400" />
          <span>{route.assignedBusId || 'Unassigned'}</span>
        </div>
      )
    },
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
          <button 
            onClick={() => { setCurrentRoute(route); setIsModalOpen(true); }} 
            className="text-gray-400 hover:text-blue-600 p-1"
            title="Edit Route"
          >
            <Edit className="h-4 w-4" />
          </button>
          <button 
            onClick={() => handleDelete(route.id)} 
            className="text-gray-400 hover:text-red-600 p-1"
            title="Delete Route"
          >
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
            Panimalar Route Management
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Official bus routes & morning arrival schedule to Panimalar Engineering College.
          </p>
        </div>
        <div className="mt-4 sm:ml-4 sm:mt-0 flex items-center gap-3">
          <button
            onClick={handleSyncDatabase}
            disabled={syncing}
            className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-700 shadow-xs ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:opacity-50"
            title="Sync all 77 routes with Turso Database"
          >
            <RefreshCw className={`-ml-0.5 mr-1.5 h-4 w-4 text-gray-500 ${syncing ? 'animate-spin' : ''}`} />
            {syncing ? 'Syncing...' : 'Sync with Turso'}
          </button>
          <button
            onClick={() => { setCurrentRoute({}); setIsModalOpen(true); }}
            className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-blue-500"
          >
            <Plus className="-ml-0.5 mr-1.5 h-4 w-4" aria-hidden="true" />
            Add Route
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="w-full max-w-sm">
          <SearchBar placeholder="Search by source, route ID, or name..." onSearch={setSearch} />
        </div>
        <div className="text-xs text-gray-500 font-medium">
          Showing <span className="font-bold text-gray-800">{filteredRoutes.length}</span> of <span className="font-bold text-gray-800">{routes.length}</span> college routes
        </div>
      </div>

      {loading ? (
        <div className="p-8 text-center text-sm text-gray-500">Loading routes from database...</div>
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
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-xs focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
              value={currentRoute?.routeName || ''}
              onChange={e => setCurrentRoute({...currentRoute, routeName: e.target.value})}
              placeholder="e.g. Route 1: ARCOT"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Starting Point (Source)</label>
            <input
              type="text"
              required
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-xs focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
              value={currentRoute?.startingPoint || ''}
              onChange={e => setCurrentRoute({...currentRoute, startingPoint: e.target.value})}
              placeholder="e.g. ARCOT"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Destination</label>
            <input
              type="text"
              required
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-xs focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
              value={currentRoute?.destination || 'Panimalar Engineering College'}
              onChange={e => setCurrentRoute({...currentRoute, destination: e.target.value})}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700">Source Pickup Time</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-xs focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
                value={currentRoute?.sourceTime || '05:30 AM'}
                onChange={e => setCurrentRoute({...currentRoute, sourceTime: e.target.value})}
                placeholder="e.g. 05:10 AM"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Destination Arrival Time</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-xs focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
                value={currentRoute?.destinationTime || '07:15 AM'}
                onChange={e => setCurrentRoute({...currentRoute, destinationTime: e.target.value})}
                placeholder="e.g. 07:15 AM"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700">Distance (km)</label>
              <input
                type="number"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-xs focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
                value={currentRoute?.distance || ''}
                onChange={e => setCurrentRoute({...currentRoute, distance: parseInt(e.target.value) || 0})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <select
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-xs focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
                value={currentRoute?.status || 'Active'}
                onChange={e => setCurrentRoute({...currentRoute, status: e.target.value as any})}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
          <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
            <button
              type="submit"
              className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-blue-500 sm:col-start-2"
            >
              Save Route
            </button>
            <button
              type="button"
              className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
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
