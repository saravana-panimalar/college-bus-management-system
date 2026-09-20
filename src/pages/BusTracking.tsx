import React from 'react';
import { MapPin, Navigation } from 'lucide-react';
import { cn } from '../utils';

export const BusTracking: React.FC = () => {
  // Mock data for tracking
  const activeBuses = [
    { id: 'B001', route: 'R001 - City Center', currentStop: 'MG Road', nextStop: 'Indiranagar', status: 'On Time' },
    { id: 'B002', route: 'R002 - North Campus', currentStop: 'Hebbal', nextStop: 'Mekhri Circle', status: 'Delayed' },
  ];

  const mockRouteStops = ['Central Station', 'MG Road', 'Indiranagar', 'Domlur', 'College Campus'];
  const currentStopIndex = 1; // MG Road

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          Live Bus Tracking
        </h2>
        <p className="mt-1 text-sm text-gray-500">Monitor active trips and bus locations.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left pane: Active Buses List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <h3 className="font-semibold text-gray-900 mb-4">Active Buses</h3>
          <div className="space-y-3">
            {activeBuses.map((bus, idx) => (
              <div 
                key={bus.id} 
                className={cn(
                  "p-3 rounded-lg border cursor-pointer transition-colors",
                  idx === 0 ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:bg-gray-50"
                )}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium text-gray-900">{bus.id}</span>
                  <span className={cn(
                    "text-xs font-medium px-2 py-0.5 rounded-full",
                    bus.status === 'On Time' ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                  )}>{bus.status}</span>
                </div>
                <p className="text-sm text-gray-600">{bus.route}</p>
                <div className="mt-2 text-xs text-gray-500 flex items-center">
                  <MapPin className="h-3 w-3 mr-1" />
                  Currently at: {bus.currentStop}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right pane: Visual Tracking Map representation */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col">
          <div className="mb-6 flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-gray-900 text-lg">Tracking: B001</h3>
              <p className="text-sm text-gray-500">Route R001 - City Center</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">Estimated Arrival</p>
              <p className="text-lg font-bold text-blue-600">08:15 AM</p>
            </div>
          </div>

          <div className="flex-1 bg-gray-50 rounded-lg border border-gray-100 p-8 flex items-center justify-center min-h-[300px]">
            {/* Visual Route Timeline */}
            <div className="w-full max-w-2xl relative">
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2 z-0"></div>
              {/* Progress bar */}
              <div 
                className="absolute top-1/2 left-0 h-1 bg-blue-500 -translate-y-1/2 z-0 transition-all duration-1000"
                style={{ width: `${(currentStopIndex / (mockRouteStops.length - 1)) * 100}%` }}
              ></div>
              
              <div className="relative z-10 flex justify-between">
                {mockRouteStops.map((stop, index) => (
                  <div key={stop} className="flex flex-col items-center">
                    <div className={cn(
                      "w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold ring-4 ring-gray-50",
                      index < currentStopIndex ? "bg-blue-500" : index === currentStopIndex ? "bg-blue-600 ring-blue-100 animate-pulse" : "bg-gray-300 text-gray-500"
                    )}>
                      {index === currentStopIndex ? <Navigation className="h-3 w-3" /> : index + 1}
                    </div>
                    <span className={cn(
                      "mt-2 text-xs font-medium w-20 text-center",
                      index <= currentStopIndex ? "text-gray-900" : "text-gray-500"
                    )}>
                      {stop}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-6 grid grid-cols-3 gap-4 border-t pt-6">
            <div>
              <p className="text-sm text-gray-500">Live Status</p>
              <p className="font-medium text-emerald-600">On Route</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Speed</p>
              <p className="font-medium text-gray-900">45 km/h</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Occupancy</p>
              <p className="font-medium text-gray-900">45 / 60</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
