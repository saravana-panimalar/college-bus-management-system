import { Bus } from '../types';
import { mockBuses } from '../mock/mockBuses';
import { apiRequest } from './apiConfig';

// In-memory state for mock fallback
let buses = [...mockBuses];

export const busService = {
  getBuses: async (): Promise<Bus[]> => {
    return apiRequest<Bus[]>(
      '/buses',
      { method: 'GET' },
      () => new Promise((resolve) => setTimeout(() => resolve([...buses]), 150))
    );
  },
  
  getBusById: async (id: string): Promise<Bus | undefined> => {
    return apiRequest<Bus>(
      `/buses/${id}`,
      { method: 'GET' },
      () => new Promise((resolve) => setTimeout(() => resolve(buses.find(b => b.id === id)), 100))
    );
  },

  createBus: async (bus: Omit<Bus, 'id'>): Promise<Bus> => {
    return apiRequest<Bus>(
      '/buses',
      {
        method: 'POST',
        body: JSON.stringify(bus)
      },
      () => new Promise((resolve) => {
        const newBus = { ...bus, id: `B${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}` };
        buses.push(newBus);
        setTimeout(() => resolve(newBus), 150);
      })
    );
  },

  updateBus: async (id: string, bus: Partial<Bus>): Promise<Bus> => {
    return apiRequest<Bus>(
      `/buses/${id}`,
      {
        method: 'PUT',
        body: JSON.stringify(bus)
      },
      () => new Promise((resolve, reject) => {
        const index = buses.findIndex(b => b.id === id);
        if (index === -1) reject(new Error('Bus not found'));
        buses[index] = { ...buses[index], ...bus };
        setTimeout(() => resolve(buses[index]), 150);
      })
    );
  },

  deleteBus: async (id: string): Promise<void> => {
    return apiRequest<void>(
      `/buses/${id}`,
      { method: 'DELETE' },
      () => new Promise((resolve) => {
        buses = buses.filter(b => b.id !== id);
        setTimeout(() => resolve(), 150);
      })
    );
  }
};
