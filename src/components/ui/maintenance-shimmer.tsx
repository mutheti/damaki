export function MaintenanceShimmer() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl mx-auto">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-12">
          {/* Icon shimmer */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-full animate-pulse"></div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-full animate-pulse"></div>
            </div>
          </div>

          {/* Title shimmer */}
          <div className="text-center mb-8">
            <div className="h-12 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-lg mb-4 animate-pulse"></div>
            <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-lg mb-6 animate-pulse"></div>
            <div className="w-24 h-1 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 mx-auto rounded-full animate-pulse"></div>
          </div>

          {/* Status info shimmer */}
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 mb-8 border">
            <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-lg mb-2 animate-pulse"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded animate-pulse"></div>
              <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded animate-pulse w-3/4"></div>
            </div>
          </div>

          {/* Contact buttons shimmer */}
          <div className="space-y-4 mb-8">
            <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-lg mx-auto w-48 animate-pulse"></div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="h-12 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-lg w-32 animate-pulse"></div>
              <div className="h-12 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-lg w-32 animate-pulse"></div>
            </div>
          </div>

          {/* Refresh button shimmer */}
          <div className="flex justify-center mb-8">
            <div className="h-12 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-lg w-40 animate-pulse"></div>
          </div>

          {/* Footer shimmer */}
          <div className="pt-6 border-t border-gray-200">
            <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded mx-auto w-64 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
