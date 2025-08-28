import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, Mail, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ForgotPasswordProps {
  onBackToLogin: () => void;
  onSuccess?: () => void;
  className?: string;
}

export function ForgotPassword({ onBackToLogin, onSuccess, className }: ForgotPasswordProps) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!email) {
      toast({
        title: 'Email is required',
        description: 'Please enter your email address.',
        variant: 'destructive',
      });
      return;
    }
    
    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: 'Invalid email',
        description: 'Please enter a valid email address.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await fetch('/api/auth/forgotpassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to send password reset email');
      }
      
      // Show success message
      toast({
        title: 'Email sent',
        description: data.message || 'If your email is registered, you will receive a password reset link shortly.',
        className: 'bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-800',
      });
      
      setIsSubmitted(true);
      onSuccess?.();
    } catch (error) {
      console.error('Error sending reset email:', error);
      toast({
        title: 'Error',
        variant: 'destructive',
        description: error instanceof Error ? error.message : 'Failed to send password reset email. Please try again later.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center space-y-4">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
          <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Check your email</h3>
        <p className="text-gray-600 dark:text-gray-400">
          We've sent a password reset link to <span className="font-medium text-gray-900 dark:text-white">{email}</span>.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          The link will expire in 10 minutes.
        </p>
        <div className="mt-6">
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={onBackToLogin}
          >
            Back to login
          </Button>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
          Didn't receive an email?{' '}
          <button 
            type="button" 
            onClick={() => setIsSubmitted(false)}
            className="text-primary hover:text-primary/80 font-medium"
          >
            Resend
          </button>
        </p>
      </div>
    );
  }

  return (
    <div className={cn('w-full max-w-sm mx-auto', className)}>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Forgot Password?</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Enter your email and we'll send you a link to reset your password.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Email address
          </Label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className={cn(
                'h-4 w-4',
                email ? 'text-primary' : 'text-gray-400 dark:text-gray-500'
              )} />
            </div>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={cn(
                'pl-10 h-11 text-base',
                'focus-visible:ring-2 focus-visible:ring-primary/50',
                'dark:bg-gray-800 dark:border-gray-700 dark:text-white',
                'transition-colors duration-200'
              )}
              autoComplete="email"
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="space-y-4">
          <Button 
            type="submit" 
            className="w-full h-11 text-base font-medium" 
            disabled={isLoading || !email}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              'Send Reset Link'
            )}
          </Button>

          <div className="text-center">
            <button
              type="button"
              onClick={onBackToLogin}
              disabled={isLoading}
              className={cn(
                'inline-flex items-center text-sm font-medium text-primary',
                'hover:text-primary/80 transition-colors',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded',
                'disabled:opacity-50 disabled:cursor-not-allowed',
                'group'
              )}
            >
              <ArrowLeft className="h-4 w-4 mr-1 transition-transform group-hover:-translate-x-0.5" />
              Back to login
            </button>
          </div>
        </div>
      </form>
      
      <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
        <div className="text-sm text-center text-gray-600 dark:text-gray-400">
          Need help?{' '}
          <a 
            href="mailto:support@damaki.com" 
            className="font-medium text-primary hover:text-primary/80 transition-colors"
            onClick={(e) => {
              e.preventDefault();
              window.location.href = 'mailto:support@damaki.com?subject=Password%20Reset%20Help';
            }}
          >
            Contact support
          </a>
        </div>
      </div>
    </div>
  );
}
