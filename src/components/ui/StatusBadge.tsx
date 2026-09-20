import React from 'react';
import { cn } from '../../utils';

interface StatusBadgeProps {
  status: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStatusStyles = (s: string) => {
    switch (s.toLowerCase()) {
      case 'active':
      case 'running':
      case 'completed':
      case 'boarded':
        return 'bg-green-50 text-green-700 ring-green-600/20';
      case 'inactive':
      case 'cancelled':
      case 'not boarded':
      case 'absent':
        return 'bg-red-50 text-red-700 ring-red-600/10';
      case 'maintenance':
      case 'scheduled':
      case 'on leave':
      case 'in progress':
      case 'pending':
        return 'bg-yellow-50 text-yellow-800 ring-yellow-600/20';
      default:
        return 'bg-gray-50 text-gray-600 ring-gray-500/10';
    }
  };

  return (
    <span className={cn(
      "inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset",
      getStatusStyles(status)
    )}>
      {status}
    </span>
  );
};
