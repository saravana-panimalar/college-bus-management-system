import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { MainLayout } from './components/layout/MainLayout';
import { Login } from './pages/Login';
import { AdminDashboard } from './pages/AdminDashboard';
import { BusManagement } from './pages/BusManagement';
import { RouteManagement } from './pages/RouteManagement';
import { StudentManagement } from './pages/StudentManagement';
import { BusTracking } from './pages/BusTracking';
import { Settings } from './pages/Settings';

// Placeholder for other pages to avoid errors before creating them
const Placeholder = ({ title }: { title: string }) => (
  <div className="p-6 text-center text-gray-500">
    <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
    <p>This module is under construction.</p>
  </div>
);

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route path="/" element={<Navigate to="/login" replace />} />
          
          {/* Admin Routes */}
          <Route element={<ProtectedRoute allowedRoles={['Admin']} />}>
            <Route element={<MainLayout />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/buses" element={<BusManagement />} />
              <Route path="/admin/routes" element={<RouteManagement />} />
              <Route path="/admin/students" element={<StudentManagement />} />
              <Route path="/admin/trips" element={<Placeholder title="Trip Management" />} />
              <Route path="/admin/tracking" element={<BusTracking />} />
              <Route path="/admin/boarding" element={<Placeholder title="Boarding Management" />} />
              <Route path="/admin/maintenance" element={<Placeholder title="Maintenance Management" />} />
              <Route path="/admin/reports" element={<Placeholder title="Reports" />} />
              <Route path="/settings" element={<Settings />} />
            </Route>
          </Route>

          {/* Student Routes */}
          <Route element={<ProtectedRoute allowedRoles={['Student']} />}>
            <Route element={<MainLayout />}>
              <Route path="/student/dashboard" element={<Placeholder title="Student Dashboard" />} />
              <Route path="/student/route" element={<Placeholder title="My Route" />} />
              <Route path="/student/history" element={<Placeholder title="Boarding History" />} />
            </Route>
          </Route>

          <Route path="/unauthorized" element={<div className="p-10 text-center">Unauthorized Access</div>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
