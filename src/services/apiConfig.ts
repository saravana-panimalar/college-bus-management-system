/**
 * Configuration and client utilities for Java Spring Boot REST API integration.
 * The Java backend can be started locally via:
 *   cd backend && mvn spring-boot:run
 * Default endpoint is http://localhost:8080/api.
 */

export const API_BASE_URL = 
  (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_API_BASE_URL) || 
  'http://localhost:8080/api';

/**
 * Universal fetch utility that attempts to call the Java Spring Boot backend,
 * falling back gracefully to the in-memory/mock implementation if the server is offline or unreachable.
 */
export async function apiRequest<T>(
  endpoint: string,
  options?: RequestInit,
  fallbackFn?: () => Promise<T> | T
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
  
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000); // 2s timeout for connection test

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
    // Handles { success: true, data: ... } or direct payload
    return (json && typeof json === 'object' && 'data' in json) ? json.data : json;
  } catch (error) {
    if (fallbackFn) {
      // Graceful fallback to mock data when Java backend is not active in the browser
      return await fallbackFn();
    }
    throw error;
  }
}
