import { User } from '@/contexts/AuthContext';

export interface LoginFormProps {
  onSuccess: () => void;
  onError: (error: string) => void;
  className?: string;
}

export interface UserProfileProps {
  user: User;
  onLogout: () => void;
}

export interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: User['role'];
  fallback?: React.ReactNode;
}
