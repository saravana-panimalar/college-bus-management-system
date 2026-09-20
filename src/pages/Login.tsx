import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bus, User, Lock, Eye, EyeOff, ShieldCheck, GraduationCap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Role } from '../types';

export const Login: React.FC = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<Role>('Admin');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(userId, password, role);
      if (role === 'Admin') navigate('/admin/dashboard');
      else navigate('/student/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickFill = (targetRole: Role) => {
    setRole(targetRole);
    if (targetRole === 'Admin') {
      setUserId('ADM-001');
    } else {
      setUserId('CS202401');
    }
    setPassword('password');
  };

  return (
    <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-gray-50">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="flex justify-center">
          <div className="rounded-full bg-blue-100 p-3 shadow-xs">
            <Bus className="h-10 w-10 text-blue-600" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          College Bus Management
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Sign in to your account
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="bg-white px-6 py-8 shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl sm:px-8">
          <form className="space-y-5" onSubmit={handleSubmit}>
            {error && (
              <div className="rounded-lg bg-red-50 p-3.5 border border-red-200">
                <div className="text-sm font-medium text-red-700">{error}</div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900 mb-2">
                Sign in as
              </label>
              <div className="grid grid-cols-2 gap-3">
                {(['Admin', 'Student'] as Role[]).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => {
                      setRole(r);
                      if (userId && !password) {
                        setUserId(r === 'Admin' ? 'ADM-001' : 'CS202401');
                      }
                    }}
                    className={`flex items-center justify-center gap-2 rounded-lg border py-2.5 px-3 text-sm font-medium transition-all ${
                      role === r
                        ? 'border-blue-600 bg-blue-50/80 text-blue-700 shadow-xs'
                        : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    {r === 'Admin' ? (
                      <ShieldCheck className="h-4 w-4 text-blue-600" />
                    ) : (
                      <GraduationCap className="h-4 w-4 text-blue-600" />
                    )}
                    <span>{r}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="userId" className="block text-sm font-medium leading-6 text-gray-900">
                {role === 'Admin' ? 'Admin ID or Email' : 'Student Roll Number'}
              </label>
              <div className="relative mt-2">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                  <User className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  id="userId"
                  name="userId"
                  type="text"
                  required
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  className="block w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-3.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20 transition-all"
                  placeholder={
                    role === 'Admin'
                      ? 'e.g. ADM-001 or admin@college.edu'
                      : 'e.g. CS202401 or roll number'
                  }
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                  <button
                    type="button"
                    onClick={() => alert('For testing, the default password is "password".')}
                    className="font-medium text-blue-600 hover:text-blue-500 text-xs"
                  >
                    Forgot password?
                  </button>
                </div>
              </div>
              <div className="relative mt-2">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                  <Lock className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-10 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20 transition-all"
                  placeholder="Enter your account password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 focus:outline-none"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-600">
                  Remember me
                </label>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <span>Demo fill:</span>
                <button
                  type="button"
                  onClick={() => handleQuickFill('Admin')}
                  className="text-blue-600 hover:underline font-medium"
                >
                  Admin
                </button>
                <span>·</span>
                <button
                  type="button"
                  onClick={() => handleQuickFill('Student')}
                  className="text-blue-600 hover:underline font-medium"
                >
                  Student
                </button>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="flex w-full justify-center items-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-50 transition-all"
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
