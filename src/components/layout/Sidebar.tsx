import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, Bus as BusIcon, Route, Users, GraduationCap, 
  Map, CalendarCheck, Settings, Bell, LogOut, Menu, X, BarChart3, Clock, AlertTriangle
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { cn } from '../../utils';

const adminNav = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Buses', href: '/admin/buses', icon: BusIcon },
  { name: 'Routes', href: '/admin/routes', icon: Route },
  { name: 'Students', href: '/admin/students', icon: GraduationCap },
  { name: 'Trips', href: '/admin/trips', icon: CalendarCheck },
  { name: 'Bus Tracking', href: '/admin/tracking', icon: Map },
  { name: 'Boarding', href: '/admin/boarding', icon: Clock },
  { name: 'Maintenance', href: '/admin/maintenance', icon: AlertTriangle },
  { name: 'Reports', href: '/admin/reports', icon: BarChart3 },
];

const studentNav = [
  { name: 'Dashboard', href: '/student/dashboard', icon: LayoutDashboard },
  { name: 'My Route', href: '/student/route', icon: Route },
  { name: 'Boarding History', href: '/student/history', icon: Clock },
];

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const { user, logout } = useAuth();
  
  let navigation = studentNav;
  if (user?.role === 'Admin') navigation = adminNav;

  return (
    <>
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar component */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex h-full flex-col">
          {/* Logo area */}
          <div className="flex h-16 shrink-0 items-center px-6 border-b border-gray-200">
            <BusIcon className="h-8 w-8 text-blue-600" />
            <span className="ml-3 text-lg font-bold text-gray-900">CollegeBus</span>
            <button
              type="button"
              className="ml-auto lg:hidden text-gray-500"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) => cn(
                  "group flex items-center px-2 py-2 text-sm font-medium rounded-md",
                  isActive 
                    ? "bg-blue-50 text-blue-700" 
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                )}
                onClick={() => setSidebarOpen(false)}
              >
                <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* Bottom actions */}
          <div className="p-4 border-t border-gray-200 space-y-1">
            <NavLink
              to="/settings"
              className={({ isActive }) => cn(
                "group flex items-center px-2 py-2 text-sm font-medium rounded-md",
                isActive ? "bg-blue-50 text-blue-700" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              )}
              onClick={() => setSidebarOpen(false)}
            >
              <Settings className="mr-3 h-5 w-5 flex-shrink-0" />
              Settings
            </NavLink>
            <button
              onClick={() => {
                logout();
              }}
              className="group flex w-full items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-red-50 hover:text-red-700"
            >
              <LogOut className="mr-3 h-5 w-5 flex-shrink-0" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
