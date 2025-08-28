import React, { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { ProtectedRoute } from '@/components/admin/ProtectedRoute';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

// Lazy load admin pages for better performance
const LoginPage = lazy(() => import('@/pages/admin/login'));
const ResetPasswordPage = lazy(() => import('@/pages/admin/ResetPassword'));
const DashboardPage = lazy(() => import('@/pages/admin/dashboard'));
const ProjectsPage = lazy(() => import('@/pages/admin/projects'));
const MessagesPage = lazy(() => import('@/pages/admin/messages'));
const UsersPage = lazy(() => import('@/pages/admin/users'));
const SettingsPage = lazy(() => import('@/pages/admin/settings'));

// Create a wrapper component for lazy loading with Suspense
const LazyComponent = (Component: React.ComponentType) => (
  <Suspense 
    fallback={
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className={cn(
            "h-12 w-12 animate-spin",
            "text-primary dark:text-primary"
          )} />
          <p className="text-gray-600 dark:text-gray-400">Loading page...</p>
        </div>
      </div>
    }
  >
    <Component />
  </Suspense>
);

// Define route roles
const ROLES = {
  ADMIN: 'admin',
  EDITOR: 'editor',
  USER: 'user',
} as const;

// Error boundary component for route errors
const RouteErrorBoundary = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
    <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg max-w-md w-full">
      <h2 className="text-2xl font-bold text-red-500 mb-4">Something went wrong</h2>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        We're having trouble loading this page. Please try refreshing or come back later.
      </p>
      <button
        onClick={() => window.location.reload()}
        className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
      >
        Refresh Page
      </button>
    </div>
  </div>
);

export const adminRouter = createBrowserRouter([
  {
    path: '/admin',
    element: <Navigate to="/admin/dashboard" replace />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: '/admin/login',
    element: LazyComponent(LoginPage),
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: '/admin/reset-password',
    element: LazyComponent(ResetPasswordPage),
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    errorElement: <RouteErrorBoundary />,
    children: [
      {
        path: 'dashboard',
        element: LazyComponent(DashboardPage),
        // Only admin and editor can access dashboard
        handle: { requiredRole: ROLES.EDITOR },
      },
      {
        path: 'projects',
        element: LazyComponent(ProjectsPage),
        // Only admin and editor can manage projects
        handle: { requiredRole: ROLES.EDITOR },
      },
      {
        path: 'messages',
        element: LazyComponent(MessagesPage),
        // Only admin can access messages
        handle: { requiredRole: ROLES.ADMIN },
      },
      {
        path: 'users',
        element: (
          <ProtectedRoute requiredRole={ROLES.ADMIN}>
            {LazyComponent(UsersPage)}
          </ProtectedRoute>
        ),
        // Only admin can manage users
        handle: { requiredRole: ROLES.ADMIN },
      },
     
      {
        path: 'settings',
        element: LazyComponent(SettingsPage),
        // Only admin can access settings
        handle: { requiredRole: ROLES.ADMIN },
      },
      {
        path: '*',
        element: <Navigate to="/admin/dashboard" replace />,
      },
    ],
  },
], {
  // Handle scroll restoration
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true,
  },
});

// Export the router for use in the main app
export const adminRoutes = [
  {
    path: 'admin/*',
    element: <RouterProvider router={adminRouter} />,
    errorElement: <RouteErrorBoundary />,
  },
];
