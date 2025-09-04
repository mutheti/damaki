import { useState, useEffect } from 'react';

interface MaintenanceSettings {
  enabled: boolean;
  message: string;
}

interface SettingsResponse {
  success: boolean;
  data: {
    maintenanceMode: MaintenanceSettings;
  };
}

export function useMaintenanceMode() {
  const [isMaintenanceMode, setIsMaintenanceMode] = useState(false);
  const [maintenanceMessage, setMaintenanceMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkMaintenanceMode = async () => {
      try {
        const apiUrl = (import.meta as any).env.VITE_API_URL || 'https://damaki-backend.onrender.com';
        const response = await fetch(`${apiUrl}/api/v1/settings`);
        
        if (response.ok) {
          const data: SettingsResponse = await response.json();
          
          if (data.success && data.data?.maintenanceMode) {
            setIsMaintenanceMode(data.data.maintenanceMode.enabled);
            setMaintenanceMessage(data.data.maintenanceMode.message || 'We are currently performing maintenance. Please check back later.');
          }
        }
      } catch (error) {
        console.error('Error checking maintenance mode:', error);
        // In case of error, assume not in maintenance mode
        setIsMaintenanceMode(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkMaintenanceMode();
  }, []);

  return {
    isMaintenanceMode,
    maintenanceMessage,
    isLoading
  };
}
