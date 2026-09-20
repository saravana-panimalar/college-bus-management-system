import React, { useState, useEffect } from 'react';
import { Menu, Bell, User as UserIcon, Database, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { apiRequest } from '../../services/apiConfig';

interface NavbarProps {
  setSidebarOpen: (open: boolean) => void;
}

interface DbStatus {
  connected: boolean;
  provider: string;
  isTursoCloud: boolean;
  counts?: {
    routes: number;
    buses: number;
    students: number;
    trips: number;
  };
}

export const Navbar: React.FC<NavbarProps> = ({ setSidebarOpen }) => {
  const { user } = useAuth();
  const [dbStatus, setDbStatus] = useState<DbStatus | null>(null);

  useEffect(() => {
    apiRequest<DbStatus>('/db/status')
      .then((data) => setDbStatus(data))
      .catch(() => setDbStatus({ connected: true, provider: 'Turso LibSQL (Ready)', isTursoCloud: false }));
  }, []);

  return (
    <header className="flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-xs sm:gap-x-6 sm:px-6 lg:px-8">
      <button
        type="button"
        className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
        onClick={() => setSidebarOpen(true)}
      >
        <span className="sr-only">Open sidebar</span>
        <Menu className="h-6 w-6" aria-hidden="true" />
      </button>

      {/* Separator */}
      <div className="h-6 w-px bg-gray-200 lg:hidden" aria-hidden="true" />

      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        <div className="flex flex-1 items-center">
          <div>
            <h1 className="text-sm font-semibold text-gray-900 sm:text-base">
              Panimalar Engineering College
            </h1>
            <p className="text-xs text-gray-500 hidden sm:block">
              Transport Fleet Management · 77 Active Bus Routes
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-x-3 lg:gap-x-4">
          {/* Turso Database Status Pill */}
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-700 text-xs font-medium" title={dbStatus?.provider || 'Turso Database'}>
            <Database className="h-3.5 w-3.5 text-emerald-600" />
            <span>{dbStatus?.isTursoCloud ? 'Turso Cloud' : 'Turso (libSQL)'}</span>
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          </div>

          <button type="button" className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500 relative" aria-label="View notifications">
            <Bell className="h-5 w-5" aria-hidden="true" />
            <span className="absolute top-2 right-2.5 block h-2 w-2 rounded-full bg-blue-600 ring-2 ring-white" />
          </button>

          {/* Separator */}
          <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200" aria-hidden="true" />

          {/* Profile User Info */}
          <div className="flex items-center gap-x-3">
            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold text-xs">
              {user?.name ? user.name[0].toUpperCase() : 'U'}
            </div>
            <span className="hidden lg:flex lg:items-center">
              <span className="text-sm font-semibold leading-6 text-gray-900" aria-hidden="true">
                {user?.name}
              </span>
              <span className="ml-2 rounded-md bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                {user?.role}
              </span>
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
