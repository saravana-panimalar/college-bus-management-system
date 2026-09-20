import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Role } from '../types';

interface AuthContextType {
  user: User | null;
  login: (userId: string, password: string, role: Role) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check local storage for mock session
    const storedUser = localStorage.getItem('mock_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (userId: string, password: string, role: Role) => {
    // Mock authentication
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        if (password === 'password') { // any dummy validation
          const mockUser: User = {
            id: userId,
            name: `${role} User`,
            role: role,
            email: `${userId.toLowerCase()}@college.edu`,
          };
          setUser(mockUser);
          localStorage.setItem('mock_user', JSON.stringify(mockUser));
          resolve();
        } else {
          reject(new Error('Invalid credentials. Use any ID and "password" as password.'));
        }
      }, 500);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('mock_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
