import { useState, useEffect } from 'react';

interface NetworkHealthStatus {
  isOnline: boolean;
  apiReachable: boolean;
  latency: number | null;
  isChecking: boolean;
}

export function useNetworkHealth() {
  const [networkStatus, setNetworkStatus] = useState<NetworkHealthStatus>({
    isOnline: navigator.onLine,
    apiReachable: false,
    latency: null,
    isChecking: true
  });

  const checkApiHealth = async (): Promise<{ reachable: boolean; latency: number | null }> => {
    try {
      const apiUrl = (import.meta as any).env.VITE_API_URL || 'https://damaki-backend.onrender.com';
      const startTime = Date.now();
      
      const response = await fetch(`${apiUrl}/api/v1/health`, {
        method: 'GET',
        signal: AbortSignal.timeout(10000) // 10 second timeout
      });
      
      const endTime = Date.now();
      const latency = endTime - startTime;
      
      return {
        reachable: response.ok,
        latency: response.ok ? latency : null
      };
    } catch (error) {
      console.error('API health check failed:', error);
      return {
        reachable: false,
        latency: null
      };
    }
  };

  const performHealthCheck = async () => {
    setNetworkStatus(prev => ({ ...prev, isChecking: true }));
    
    const { reachable, latency } = await checkApiHealth();
    
    setNetworkStatus({
      isOnline: navigator.onLine,
      apiReachable: reachable,
      latency,
      isChecking: false
    });
  };

  useEffect(() => {
    // Initial health check
    performHealthCheck();

    // Listen for online/offline events
    const handleOnline = () => {
      setNetworkStatus(prev => ({ ...prev, isOnline: true }));
      performHealthCheck();
    };

    const handleOffline = () => {
      setNetworkStatus(prev => ({ 
        ...prev, 
        isOnline: false, 
        apiReachable: false, 
        latency: null 
      }));
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Periodic health check every 30 seconds
    const interval = setInterval(performHealthCheck, 30000);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      clearInterval(interval);
    };
  }, []);

  return {
    ...networkStatus,
    recheckHealth: performHealthCheck
  };
}
