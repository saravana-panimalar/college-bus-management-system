import { Trip, MaintenanceRecord, Notification } from '../types';
import { mockTrips, mockMaintenance, mockNotifications } from '../mock/mockOther';
import { apiRequest } from './apiConfig';

export const otherServices = {
  getTrips: async (): Promise<Trip[]> => {
    return apiRequest<Trip[]>(
      '/trips',
      { method: 'GET' },
      () => new Promise((resolve) => setTimeout(() => resolve([...mockTrips]), 150))
    );
  },
  getMaintenance: async (): Promise<MaintenanceRecord[]> => {
    return apiRequest<MaintenanceRecord[]>(
      '/maintenance',
      { method: 'GET' },
      () => new Promise((resolve) => setTimeout(() => resolve([...mockMaintenance]), 150))
    );
  },
  getNotifications: async (userId: string): Promise<Notification[]> => {
    return apiRequest<Notification[]>(
      `/notifications?userId=${encodeURIComponent(userId)}`,
      { method: 'GET' },
      () => new Promise((resolve) => {
        const userNotifs = mockNotifications.filter(n => n.userId === userId || n.userId === 'ALL');
        setTimeout(() => resolve(userNotifs), 150);
      })
    );
  }
};
