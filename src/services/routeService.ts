import { Route } from '../types';
import { mockRoutes } from '../mock/mockRoutes';
import { apiRequest } from './apiConfig';

let routes = [...mockRoutes];

export const routeService = {
  getRoutes: async (): Promise<Route[]> => {
    return apiRequest<Route[]>(
      '/routes',
      { method: 'GET' },
      () => new Promise((resolve) => setTimeout(() => resolve([...routes]), 150))
    );
  },
  
  getRouteById: async (id: string): Promise<Route | undefined> => {
    return apiRequest<Route>(
      `/routes/${id}`,
      { method: 'GET' },
      () => new Promise((resolve) => setTimeout(() => resolve(routes.find(r => r.id === id)), 100))
    );
  },

  createRoute: async (route: Omit<Route, 'id'>): Promise<Route> => {
    return apiRequest<Route>(
      '/routes',
      {
        method: 'POST',
        body: JSON.stringify(route)
      },
      () => new Promise((resolve) => {
        const newRoute = { ...route, id: `R${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}` };
        routes.push(newRoute as Route);
        setTimeout(() => resolve(newRoute as Route), 150);
      })
    );
  },

  updateRoute: async (id: string, route: Partial<Route>): Promise<Route> => {
    return apiRequest<Route>(
      `/routes/${id}`,
      {
        method: 'PUT',
        body: JSON.stringify(route)
      },
      () => new Promise((resolve, reject) => {
        const index = routes.findIndex(r => r.id === id);
        if (index === -1) reject(new Error('Route not found'));
        routes[index] = { ...routes[index], ...route };
        setTimeout(() => resolve(routes[index]), 150);
      })
    );
  },

  deleteRoute: async (id: string): Promise<void> => {
    return apiRequest<void>(
      `/routes/${id}`,
      { method: 'DELETE' },
      () => new Promise((resolve) => {
        routes = routes.filter(r => r.id !== id);
        setTimeout(() => resolve(), 150);
      })
    );
  }
};
