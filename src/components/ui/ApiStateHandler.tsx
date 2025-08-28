import { Loader2, AlertCircle } from 'lucide-react';
import { Button } from './button';

type ApiStateHandlerProps = {
  isLoading: boolean;
  error?: string | null;
  empty?: boolean;
  emptyMessage?: string;
  children: React.ReactNode;
  onRetry?: () => void;
};

export function ApiStateHandler({
  isLoading,
  error,
  empty = false,
  emptyMessage = 'No data available',
  children,
  onRetry,
}: ApiStateHandlerProps) {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="mt-4 text-sm text-muted-foreground">Loading data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <AlertCircle className="h-8 w-8 text-destructive" />
        <h3 className="mt-4 text-lg font-medium text-destructive">
          Something went wrong
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">{error}</p>
        {onRetry && (
          <Button
            variant="outline"
            className="mt-4"
            onClick={onRetry}
          >
            Retry
          </Button>
        )}
      </div>
    );
  }

  if (empty) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <AlertCircle className="h-8 w-8 text-muted-foreground" />
        <p className="mt-4 text-sm text-muted-foreground">{emptyMessage}</p>
      </div>
    );
  }

  return <>{children}</>;
}
