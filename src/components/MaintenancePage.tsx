import { Wrench, Clock, Mail, Phone, Wifi, WifiOff, Activity, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNetworkHealth } from "@/hooks/useNetworkHealth";

interface MaintenancePageProps {
  message?: string;
}

export default function MaintenancePage({ message }: MaintenancePageProps) {
  const defaultMessage = "We are currently performing maintenance. Please check back later.";
  const { isOnline, apiReachable, latency, isChecking, recheckHealth } = useNetworkHealth();
  
  const getNetworkStatusColor = () => {
    if (!isOnline) return "from-red-500 to-red-600";
    if (!apiReachable) return "from-orange-500 to-orange-600";
    return "from-green-500 to-green-600";
  };

  const getNetworkStatusText = () => {
    if (!isOnline) return "No Internet Connection";
    if (!apiReachable) return "Server Unreachable";
    return "Connection Good";
  };

  const getNetworkIcon = () => {
    if (!isOnline) return WifiOff;
    if (!apiReachable) return AlertCircle;
    return Wifi;
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl mx-auto shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
        <CardContent className="p-12 text-center">
          {/* Maintenance Icon */}
          <div className="mb-8">
            <div className="relative inline-block">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                <Wrench className="w-12 h-12 text-white animate-pulse" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center shadow-md">
                <Clock className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Under Maintenance
            </h1>
            <p className="text-xl text-gray-600 mb-6 leading-relaxed">
              {message || defaultMessage}
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto rounded-full"></div>
          </div>

          {/* Network Status */}
          <div className={`bg-gradient-to-r ${getNetworkStatusColor()} rounded-xl p-4 mb-6 text-white shadow-lg`}>
            <div className="flex items-center justify-center space-x-3">
              {(() => {
                const NetworkIcon = getNetworkIcon();
                return <NetworkIcon className="w-5 h-5" />;
              })()}
              <span className="font-semibold">{getNetworkStatusText()}</span>
              {isChecking && <Activity className="w-4 h-4 animate-spin" />}
            </div>
            {latency && (
              <div className="text-center mt-2 text-sm opacity-90">
                Response time: {latency}ms
              </div>
            )}
          </div>

          {/* Status Info */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-8 border border-blue-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">What's happening?</h3>
            <p className="text-gray-600">
              We're working hard to improve your experience. Our team is performing scheduled maintenance 
              to enhance performance and add new features.
            </p>
          </div>

          {/* Contact Information */}
          <div className="space-y-4 mb-8">
            <h3 className="text-lg font-semibold text-gray-900">Need immediate assistance?</h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:info@damakisolutions.com"
                className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Mail className="w-5 h-5 mr-2" />
                Email Us
              </a>
              <a
                href="tel:+254743863009"
                className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call Us
              </a>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={recheckHealth}
              disabled={isChecking}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Activity className={`w-4 h-4 mr-2 ${isChecking ? 'animate-spin' : ''}`} />
              Check Network
            </Button>
            <Button
              onClick={() => window.location.reload()}
              className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white px-6 py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Clock className="w-4 h-4 mr-2" />
              Reload Page
            </Button>
          </div>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              © 2024 Damaki Solutions. We'll be back online shortly.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
