import { cn } from "@/lib/utils";

interface ShimmerProps {
  className?: string;
}

export function Shimmer({ className }: ShimmerProps) {
  return (
    <div
      className={cn(
        "animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]",
        "animate-shimmer rounded-md",
        className
      )}
    />
  );
}

export function ProjectCardSkeleton() {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
      {/* Image skeleton */}
      <div className="aspect-video">
        <Shimmer className="w-full h-full" />
      </div>
      
      {/* Content skeleton */}
      <div className="p-6 space-y-4">
        {/* Title */}
        <Shimmer className="h-6 w-3/4" />
        
        {/* Description lines */}
        <div className="space-y-2">
          <Shimmer className="h-4 w-full" />
          <Shimmer className="h-4 w-5/6" />
          <Shimmer className="h-4 w-4/6" />
        </div>
        
        {/* Tags */}
        <div className="flex gap-2 pt-2">
          <Shimmer className="h-6 w-16" />
          <Shimmer className="h-6 w-20" />
          <Shimmer className="h-6 w-14" />
        </div>
        
        {/* Footer */}
        <div className="pt-4 border-t border-gray-100">
          <div className="flex justify-between items-center">
            <Shimmer className="h-4 w-24" />
            <div className="flex space-x-2">
              <Shimmer className="h-4 w-4 rounded" />
              <Shimmer className="h-4 w-4 rounded" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PortfolioSkeleton() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header skeleton */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Shimmer className="h-10 w-64 mx-auto mb-4" />
          <Shimmer className="h-6 w-96 mx-auto" />
        </div>

        {/* Filter buttons skeleton */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <Shimmer className="h-10 w-16 rounded-full" />
          <Shimmer className="h-10 w-24 rounded-full" />
          <Shimmer className="h-10 w-20 rounded-full" />
          <Shimmer className="h-10 w-18 rounded-full" />
        </div>

        {/* Projects grid skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, index) => (
            <ProjectCardSkeleton key={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
