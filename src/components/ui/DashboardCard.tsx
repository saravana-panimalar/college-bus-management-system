import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '../../utils';

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  color?: 'blue' | 'green' | 'red' | 'yellow' | 'purple' | 'gray';
}

export const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  value,
  icon: Icon,
  description,
  trend,
  trendValue,
  color = 'blue'
}) => {
  const colorStyles = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    red: 'bg-red-50 text-red-600',
    yellow: 'bg-yellow-50 text-yellow-600',
    purple: 'bg-purple-50 text-purple-600',
    gray: 'bg-gray-50 text-gray-600',
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <div className={cn("rounded-lg p-2.5", colorStyles[color])}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <div className="mt-4">
        <p className="text-3xl font-semibold text-gray-900">{value}</p>
        {(description || trendValue) && (
          <div className="mt-2 flex items-center text-sm">
            {trendValue && (
              <span className={cn(
                "mr-2 font-medium",
                trend === 'up' ? "text-green-600" : trend === 'down' ? "text-red-600" : "text-gray-600"
              )}>
                {trendValue}
              </span>
            )}
            {description && <span className="text-gray-500">{description}</span>}
          </div>
        )}
      </div>
    </div>
  );
};
