import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import MaintenancePage from "./components/MaintenancePage";
import { useMaintenanceMode } from "./hooks/useMaintenanceMode";
import { MaintenanceShimmer } from "./components/ui/maintenance-shimmer";
import "./smooth-scroll.css";

const queryClient = new QueryClient();

const AppContent = () => {
  const { isMaintenanceMode, maintenanceMessage, isLoading } = useMaintenanceMode();

  // Show shimmer while checking maintenance mode
  if (isLoading) {
    return <MaintenanceShimmer />;
  }

  // Show maintenance page if maintenance mode is enabled
  if (isMaintenanceMode) {
    return <MaintenancePage message={maintenanceMessage} />;
  }

  // Normal app routes
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Index />} />
          {/* 404 Route - Keep this at the bottom */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AppContent />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
