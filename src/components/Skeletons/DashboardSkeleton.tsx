export default function DashboardSkeleton() {
  return (
    <div className="w-full bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-2xl ">
      {/* Header Skeleton */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center justify-between">
          <div>
            <div className="h-8 bg-gray-800 rounded-lg w-48 mb-2"></div>
            <div className="h-4 bg-gray-800 rounded-lg w-32"></div>
          </div>
          
          {/* Month Selector Skeleton */}
          <div className="h-10 bg-gray-800 rounded-lg w-40"></div>
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="p-6">
        {/* Top Row - Balance & Expense Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Balance Card Skeleton */}
          <div className="bg-gray-800 bg-opacity-50 rounded-xl p-5 shadow-lg border border-gray-700">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 bg-secondary rounded-lg"></div>
                <div className="h-4 bg-secondary rounded w-24"></div>
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <div className="h-12 bg-secondary rounded-lg w-40"></div>
              <div className="h-8 bg-secondary rounded-lg w-16"></div>
            </div>
          </div>

          {/* Expense Card Skeleton */}
          <div className="bg-gray-800 bg-opacity-50 rounded-xl p-5 shadow-lg border border-gray-700">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 bg-secondary rounded-lg"></div>
                <div className="h-4 bg-secondary rounded w-28"></div>
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <div className="h-12 bg-secondary rounded-lg w-40"></div>
              <div className="h-8 bg-secondary rounded-lg w-16"></div>
            </div>
          </div>
        </div>

        {/* Statistics Grid Skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="bg-gray-800 bg-opacity-50 rounded-xl p-4 border border-gray-700">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-4 h-4 bg-secondary rounded"></div>
                <div className="h-3 bg-secondary rounded w-16"></div>
              </div>
              <div className="h-7 bg-secondary rounded-lg w-20"></div>
            </div>
          ))}
        </div>

        {/* Bottom Section - Insights Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Top Spending Category Skeleton */}
          <div className="bg-gray-800 bg-opacity-50 rounded-xl p-4 border border-gray-700">
            <div className="h-4 bg-secondary rounded w-40 mb-3"></div>
            <div className="flex items-center justify-between mb-3">
              <div className="h-6 bg-secondary rounded w-24"></div>
              <div className="h-6 bg-secondary rounded w-16"></div>
            </div>
            <div className="w-full bg-secondary rounded-full h-2 mb-2"></div>
            <div className="h-3 bg-secondary rounded w-32"></div>
          </div>

          {/* Financial Health Skeleton */}
          <div className="bg-gray-800 bg-opacity-50 rounded-xl p-4 border border-gray-700">
            <div className="h-4 bg-secondary rounded w-32 mb-3"></div>
            <div className="space-y-3">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex items-center justify-between">
                  <div className="h-4 bg-secondary rounded w-28"></div>
                  <div className="h-4 bg-secondary rounded w-20"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}