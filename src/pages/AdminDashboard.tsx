import React, { useEffect, useState } from 'react';
import { Bus, Route, CheckCircle, GraduationCap, CalendarCheck, AlertTriangle } from 'lucide-react';
import { DashboardCard } from '../components/ui/DashboardCard';
import { busService } from '../services/busService';
import { routeService } from '../services/routeService';
import { studentService } from '../services/studentService';
import { otherServices } from '../services/otherServices';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState({
    totalBuses: 0,
    activeBuses: 0,
    totalRoutes: 0,
    totalStudents: 0,
    activeTrips: 0,
    totalCapacity: 0
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [buses, routes, students, trips] = await Promise.all([
          busService.getBuses(),
          routeService.getRoutes(),
          studentService.getStudents(),
          otherServices.getTrips()
        ]);

        const totalCapacity = buses.reduce((acc, b) => acc + (b.capacity || 0), 0);

        setStats({
          totalBuses: buses.length,
          activeBuses: buses.filter(b => b.status === 'Active').length,
          totalRoutes: routes.length,
          totalStudents: students.length,
          activeTrips: trips.filter(t => t.status === 'Running').length,
          totalCapacity
        });
      } catch (error) {
        console.error("Failed to fetch dashboard stats", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const chartData = [
    { name: 'Route 1', students: 45 },
    { name: 'Route 2', students: 38 },
    { name: 'Route 3', students: 50 },
    { name: 'Route 4', students: 40 },
    { name: 'Route 5', students: 25 },
  ];

  if (loading) {
    return <div className="animate-pulse">Loading dashboard...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          Admin Dashboard
        </h2>
        <p className="mt-1 text-sm text-gray-500">Overview of college transportation system.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <DashboardCard
          title="Total Buses"
          value={stats.totalBuses}
          icon={Bus}
          color="blue"
          description={`${stats.activeBuses} active currently`}
        />
        <DashboardCard
          title="Total Routes"
          value={stats.totalRoutes}
          icon={Route}
          color="green"
        />
        <DashboardCard
          title="Total Students"
          value={stats.totalStudents}
          icon={GraduationCap}
          color="purple"
        />
        <DashboardCard
          title="Fleet Capacity"
          value={`${stats.totalCapacity} seats`}
          icon={CheckCircle}
          color="yellow"
          description={`${stats.activeBuses} active buses`}
        />
        <DashboardCard
          title="Active Trips"
          value={stats.activeTrips}
          icon={CalendarCheck}
          color="red"
          trend="up"
          trendValue="Live"
        />
        <DashboardCard
          title="Maintenance Alerts"
          value="2"
          icon={AlertTriangle}
          color="gray"
          description="Buses require attention"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="text-base font-semibold leading-6 text-gray-900 mb-4">Students per Route</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip cursor={{fill: 'transparent'}} />
                <Bar dataKey="students" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="text-base font-semibold leading-6 text-gray-900 mb-4">Recent Notifications</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-4">
                <div className="h-8 w-8 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <Bell className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Route Change Alert</p>
                  <p className="text-sm text-gray-500">Route R002 has a temporary diversion.</p>
                  <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Simple Bell Icon for recent notifications mock
import { Bell } from 'lucide-react';
