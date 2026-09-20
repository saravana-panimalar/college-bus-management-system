import { Route } from '../types';
import { panimalarRoutes } from '../data/panimalarRoutes';
import { apiRequest } from './apiConfig';

let routes = [...panimalarRoutes];

export const routeService = {
  getRoutes: async (): Promise<Route[]> => {
    return apiRequest<Route[]>(
      '/routes',
      { method: 'GET' },
      () => new Promise((resolve) => setTimeout(() => resolve([...routes]), 100))
    );
  },
  
  getRouteById: async (id: string): Promise<Route | undefined> => {
    return apiRequest<Route>(
      `/routes/${id}`,
      { method: 'GET' },
      () => new Promise((resolve) => setTimeout(() => resolve(routes.find(r => r.id === id)), 80))
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
        const newRoute = { ...route, id: `R-${(routes.length + 1).toString().padStart(2, '0')}` };
        routes.push(newRoute as Route);
        setTimeout(() => resolve(newRoute as Route), 100);
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
        setTimeout(() => resolve(routes[index]), 100);
      })
    );
  },

  deleteRoute: async (id: string): Promise<void> => {
    return apiRequest<void>(
      `/routes/${id}`,
      { method: 'DELETE' },
      () => new Promise((resolve) => {
        routes = routes.filter(r => r.id !== id);
        setTimeout(() => resolve(), 100);
      })
    );
  }
};

