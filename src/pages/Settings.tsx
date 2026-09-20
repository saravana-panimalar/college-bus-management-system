import React from 'react';
import { User, Bell, Shield, Palette } from 'lucide-react';

export const Settings: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          Settings
        </h2>
        <p className="mt-1 text-sm text-gray-500">Manage your profile and application preferences.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-4">
          <div className="border-r border-gray-200 p-6 md:min-h-[500px]">
            <nav className="space-y-1">
              <a href="#" className="bg-blue-50 text-blue-700 flex items-center px-3 py-2 text-sm font-medium rounded-md">
                <User className="mr-3 h-5 w-5 flex-shrink-0" />
                Profile
              </a>
              <a href="#" className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 flex items-center px-3 py-2 text-sm font-medium rounded-md">
                <Bell className="mr-3 h-5 w-5 flex-shrink-0" />
                Notifications
              </a>
              <a href="#" className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 flex items-center px-3 py-2 text-sm font-medium rounded-md">
                <Shield className="mr-3 h-5 w-5 flex-shrink-0" />
                Security
              </a>
              <a href="#" className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 flex items-center px-3 py-2 text-sm font-medium rounded-md">
                <Palette className="mr-3 h-5 w-5 flex-shrink-0" />
                Appearance
              </a>
            </nav>
          </div>
          
          <div className="md:col-span-3 p-6 md:p-8">
            <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Profile Information</h3>
            <form className="space-y-6 max-w-lg">
              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900">Name</label>
                <input
                  type="text"
                  className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6 pl-3"
                  defaultValue="Admin User"
                />
              </div>
              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900">Email</label>
                <input
                  type="email"
                  className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6 pl-3"
                  defaultValue="admin@college.edu"
                />
              </div>
              
              <div className="pt-4 border-t border-gray-200">
                <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Change Password</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium leading-6 text-gray-900">Current Password</label>
                    <input type="password" className="mt-2 block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6 pl-3" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium leading-6 text-gray-900">New Password</label>
                    <input type="password" className="mt-2 block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6 pl-3" />
                  </div>
                </div>
              </div>
              
              <div className="pt-4">
                <button type="button" className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
