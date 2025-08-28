import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

export interface User {
  _id: string;
  id: string; // Alias for _id for compatibility
  email: string;
  role: 'admin' | 'editor' | 'user';
  name: string;
  profileImage?: string;
  verified?: boolean;
  isActive?: boolean;
  lastLogin?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

interface LoginResponse {
  success: boolean;
  token: string;
  refreshToken: string;
  data: {
    user: User;
  };
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<boolean>;
  refreshToken: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          await checkAuth();
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        localStorage.removeItem('token');
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000';
      const loginUrl = `${apiUrl}/api/v1/auth/login`;
      console.log('Making login request to:', loginUrl);
  
      const response = await fetch(loginUrl, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data: LoginResponse = await response.json();
      console.log('Login response:', { status: response.status, data });
  
      if (!response.ok) {
        console.error('Login failed with status:', response.status, 'Message:', data?.message);
        throw new Error(data?.message || `Login failed with status ${response.status}`);
      }
  
      if (!data.data?.user) {
        console.error('No user data in response:', data);
        throw new Error('No user data received from server');
      }
  
      // ✅ Extract tokens & user
      const { refreshToken, data: { user } } = data;
  
      // Store refreshToken (backend should ideally set httpOnly cookie for security,
      // but we can keep in localStorage if required for client-side auth flows)
      if (refreshToken) {
        localStorage.setItem('token', refreshToken);
      }
  
      // Store user data
      const userData = {
        ...user,
        id: user._id || user.id, // backward compatibility
      };
      setUser(userData);
  
      // Mark authenticated
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('user', JSON.stringify(userData));
  
      return { user: userData, refreshToken }; // 👈 return values for frontend usage
    } catch (error) {
      console.error('Login error:', error);
  
      // Clear any existing auth state on error
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
  
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  

  const logout = async () => {
    try {
      // Call logout endpoint to clear server-side session
      await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:4000'}/api/v1/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear client-side auth state
      localStorage.removeItem('isAuthenticated');
      setUser(null);
      
      // Navigate to login page
      navigate('/admin/login');
      
      toast({
        title: 'Logged out',
        description: 'You have been successfully logged out.',
      });
    }
  };

  const refreshToken = async (): Promise<boolean> => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:4000'}/api/v1/auth/refresh-token`, {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        setUser({
          ...data.data.user,
          id: data.data.user._id
        });
        return true;
      }
      return false;
    } catch (error) {
      console.error('Token refresh failed:', error);
      return false;
    }
  };

  const checkAuth = async (): Promise<boolean> => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    const token = localStorage.getItem('token'); // get JWT token
    
    if (!isAuthenticated || !token) {
      return false;
    }
  
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL || 'http://localhost:4000'}/api/v1/auth/me`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // ✅ pass token here
          },
          credentials: 'include', // keep if you’re also using cookies
        }
      );
  
      if (response.ok) {
        const data = await response.json();
        const userData = data.data?.user;
  
        if (userData) {
          setUser({
            ...userData,
            id: userData._id || userData.id,
          });
          return true;
        }
      }
  
      throw new Error('Session expired');
    } catch (error) {
      console.error('Auth check failed:', error);
  
      // Clear invalid auth state
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('token');
      setUser(null);
  
      return false;
    }
  };
  

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        checkAuth,
        refreshToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Helper function to check if user has required role
export const useHasRole = (requiredRole: User['role']): boolean => {
  const { user } = useAuth();
  
  if (!user) return false;
  
  // Admin has access to everything
  if (user.role === 'admin') return true;
  
  // Editor can access editor and user routes
  if (requiredRole === 'user' && user.role === 'editor') return true;
  
  // Otherwise, check if roles match exactly
  return user.role === requiredRole;
};
