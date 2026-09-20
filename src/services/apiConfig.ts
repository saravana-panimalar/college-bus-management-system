/**
 * Configuration and client utilities for Turso / Express REST API integration.
 * Connects to /api on the current server, backed by Turso Database.
 */

export const API_BASE_URL = 
  (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_API_BASE_URL) || 
  '/api';

/**
 * Universal fetch utility that attempts to call the backend API backed by Turso,
 * falling back gracefully to the seeded implementation if the network is offline.
 */
export async function apiRequest<T>(
  endpoint: string,
  options?: RequestInit,
  fallbackFn?: () => Promise<T> | T
): Promise<T> {
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const url = `${API_BASE_URL}${cleanEndpoint}`;
  
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options?.headers || {})
      },
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const json = await response.json();
    return (json && typeof json === 'object' && 'data' in json) ? json.data : json;
  } catch (error) {
    if (fallbackFn) {
      return await fallbackFn();
    }
    throw error;
  }
}
