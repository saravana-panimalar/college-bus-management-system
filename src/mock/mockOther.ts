import { Trip, MaintenanceRecord, Notification } from '../types';

export const mockTrips: Trip[] = [
  {
    id: 'T1001',
    busId: 'B001',
    routeId: 'R001',
    date: '2026-09-16',
    departureTime: '07:30',
    arrivalTime: null,
    occupancy: 45,
    status: 'Running',
  },
  {
    id: 'T1002',
    busId: 'B002',
    routeId: 'R002',
    date: '2026-09-16',
    departureTime: '07:15',
    arrivalTime: '08:20',
    occupancy: 38,
    status: 'Completed',
  },
  {
    id: 'T1003',
    busId: 'B004',
    routeId: 'R004',
    date: '2026-09-16',
    departureTime: '07:00',
    arrivalTime: null,
    occupancy: 0,
    status: 'Scheduled',
  }
];

export const mockMaintenance: MaintenanceRecord[] = [
  {
    id: 'M001',
    busId: 'B003',
    type: 'Repair',
    date: '2026-09-15',
    description: 'Engine overheating issue',
    cost: 5000,
    nextMaintenanceDate: '2027-03-15',
    status: 'In Progress',
  },
  {
    id: 'M002',
    busId: 'B001',
    type: 'Regular Service',
    date: '2026-08-15',
    description: 'Oil change and brake inspection',
    cost: 2500,
    nextMaintenanceDate: '2027-02-15',
    status: 'Completed',
  }
];

export const mockNotifications: Notification[] = [
  {
    id: 'N001',
    userId: 'ALL',
    title: 'Route Change',
    message: 'Route R002 has a temporary diversion due to road work at Hebbal.',
    date: '2026-09-16T07:00:00Z',
    read: false,
    type: 'Warning',
  },
  {
    id: 'N002',
    userId: 'Admin',
    title: 'Maintenance Alert',
    message: 'Bus B003 requires immediate maintenance (Engine overheating).',
    date: '2026-09-15T14:30:00Z',
    read: false,
    type: 'Alert',
  },
  {
    id: 'N003',
    userId: 'Student',
    title: 'Bus Delay',
    message: 'Your assigned bus (B001) is running 15 minutes late.',
    date: '2026-09-16T07:45:00Z',
    read: true,
    type: 'Info',
  }
];
