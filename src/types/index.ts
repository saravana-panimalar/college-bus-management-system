export type Role = 'Admin' | 'Student';

export interface User {
  id: string;
  name: string;
  role: Role;
  email: string;
  avatar?: string;
}

export interface Bus {
  id: string;
  busNumber: string;
  registrationNumber: string;
  model: string;
  capacity: number;
  routeId: string | null;
  insuranceExpiry: string;
  lastMaintenanceDate: string;
  status: 'Active' | 'Inactive' | 'Maintenance';
}

export interface Route {
  id: string;
  routeName: string;
  startingPoint: string;
  destination: string;
  stops: string[];
  distance: number; // in km
  estimatedTime: number; // in minutes
  assignedBusId: string | null;
  status: 'Active' | 'Inactive';
  sourceTime?: string;
  destinationTime?: string;
}

export interface Student {
  id: string;
  rollNumber: string;
  name: string;
  department: string;
  year: string;
  phone: string;
  email: string;
  parentContact: string;
  assignedRouteId: string | null;
  pickupStop: string;
  status: 'Active' | 'Inactive';
}

export interface Trip {
  id: string;
  busId: string;
  routeId: string;
  date: string;
  departureTime: string;
  arrivalTime: string | null;
  occupancy: number;
  status: 'Scheduled' | 'Running' | 'Completed' | 'Cancelled';
}

export interface BoardingRecord {
  id: string;
  studentId: string;
  tripId: string;
  stop: string;
  boardingTime: string | null;
  status: 'Boarded' | 'Not Boarded' | 'Pending';
}

export interface MaintenanceRecord {
  id: string;
  busId: string;
  type: 'Regular Service' | 'Repair' | 'Inspection' | 'Emergency';
  date: string;
  description: string;
  cost: number;
  nextMaintenanceDate: string;
  status: 'Completed' | 'Scheduled' | 'In Progress';
}

export interface Notification {
  id: string;
  userId: string; // or 'ALL'
  title: string;
  message: string;
  date: string;
  read: boolean;
  type: 'Info' | 'Warning' | 'Alert';
}
