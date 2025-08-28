import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginForm } from '@/components/admin/LoginForm';
import { ForgotPassword } from '@/components/admin/ForgotPassword';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2, Lock, Mail, HelpCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export default function LoginPage() {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const { toast } = useToast();
  
  const supportEmail = 'support@damaki.com'; // Replace with your support email

  useEffect(() => {
    // Check if user is already authenticated
    if (isAuthenticated) {
      navigate('/admin/dashboard');
    } else if (!authLoading) {
      setIsLoading(false);
    }
  }, [isAuthenticated, authLoading, navigate]);

  // Show loading state while checking auth
  if (isLoading || authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  const handleLoginSuccess = () => {
    toast({
      title: 'Login successful',
      description: 'Welcome to the admin dashboard!',
    });
    navigate('/admin/dashboard');
  };

  const handleLoginError = (error: string) => {
    toast({
      title: 'Login failed',
      description: error || 'An error occurred during login',
      variant: 'destructive',
    });
  };

  const handleForgotPasswordSuccess = () => {
    toast({
      title: 'Success',
      description: 'Password reset instructions have been sent to your email.',
    });
    setShowForgotPassword(false);
  };

  const handleContactSupport = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href = `mailto:${supportEmail}?subject=Support Request: Admin Access`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        <div className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Portal</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              {showForgotPassword ? 'Reset your password' : 'Sign in to access the dashboard'}
            </p>
          </div>
          
          {showForgotPassword ? (
            <ForgotPassword 
              onBackToLogin={() => setShowForgotPassword(false)}
              onSuccess={handleForgotPasswordSuccess}
              className="space-y-6"
            />
          ) : (
            <>
              <LoginForm 
                onSuccess={handleLoginSuccess} 
                onError={handleLoginError}
                className="space-y-6"
              />
              
              <div className="mt-4 text-right">
                <button
                  onClick={() => setShowForgotPassword(true)}
                  className="text-sm font-medium text-primary hover:text-primary/80"
                >
                  Forgot password?
                </button>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="text-center text-sm text-gray-600 dark:text-gray-400">
                  <p>Need help?{' '}
                    <a 
                      href={`mailto:${supportEmail}`}
                      onClick={handleContactSupport}
                      className="inline-flex items-center text-primary hover:underline"
                    >
                      <HelpCircle className="h-4 w-4 mr-1" />
                      Contact support
                    </a>
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-700/50 px-6 py-4 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} Damaki. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
