import { useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'admin' | 'editor' | 'user';
  fallback?: React.ReactNode;
}

export function ProtectedRoute({ 
  children, 
  requiredRole = 'admin',
  fallback
}: ProtectedRouteProps) {
  const { user, isAuthenticated, isLoading, checkAuth } = useAuth();
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [isChecking, setIsChecking] = useState<boolean>(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    
    const verifyAuth = async () => {
      try {
        const isAuth = true;
        if (isMounted) {
          if (isAuth && user) {
            // Check if user has the required role
            const hasRequiredRole = 
              requiredRole === 'admin' ? user.role === 'admin' :
              requiredRole === 'editor' ? ['admin', 'editor'].includes(user.role) :
              true; // 'user' role or no role required
              
            setIsAuthorized(hasRequiredRole);
          }
          setIsChecking(false);
        }
      } catch (error) {
        console.error('Auth verification error:', error);
        if (isMounted) {
          setIsChecking(false);
        }
      }
    };

    verifyAuth();

    return () => {
      isMounted = false;
    };
  }, [checkAuth, requiredRole, user]);

  // Show loading state
  if (isLoading || isChecking) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className={cn(
            "h-12 w-12 animate-spin",
            "text-primary dark:text-primary"
          )} />
          <p className="text-gray-600 dark:text-gray-400">Verifying your session...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return (
      <Navigate 
        to="/admin/login" 
        state={{ 
          from: location,
          message: 'Please sign in to access this page.'
        }} 
        replace 
      />
    );
  }

  // Show access denied if user doesn't have required role
  if (!isAuthorized) {
    return fallback || (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50 dark:bg-gray-900">
        <div className="w-full max-w-md p-8 space-y-6 text-center bg-white dark:bg-gray-800 rounded-xl shadow-lg">
          <div className="inline-flex items-center justify-center w-16 h-16 mx-auto rounded-full bg-red-100 dark:bg-red-900/30">
            <AlertCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Access Denied</h2>
          <p className="text-gray-600 dark:text-gray-300">
            You don't have permission to access this page.
          </p>
          {user && (
            <div className="pt-2 text-sm text-gray-500 dark:text-gray-400">
              Logged in as: {user.email} ({user.role})
            </div>
          )}
          <div className="pt-4">
            <Button 
              variant="outline"
              onClick={() => navigate(-1)}
              className="mr-4"
            >
              Go Back
            </Button>
            {user?.role === 'admin' && (
              <Button onClick={() => navigate('/admin/dashboard')}>
                Go to Dashboard
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
