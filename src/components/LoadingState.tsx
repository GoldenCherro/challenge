export function LoadingState() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse"
        >
          <div className="bg-gray-300 h-48" />
          <div className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="bg-gray-200 h-6 w-16 rounded-full" />
              <div className="bg-gray-200 h-6 w-20 rounded" />
            </div>
            <div className="space-y-2">
              <div className="bg-gray-200 h-4 w-3/4 rounded" />
              <div className="bg-gray-200 h-4 w-1/2 rounded" />
            </div>
            <div className="space-y-2">
              <div className="bg-gray-200 h-4 w-2/3 rounded" />
              <div className="bg-gray-200 h-4 w-3/4 rounded" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function LoadingMore() {
  return (
    <div className="flex justify-center items-center py-8">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      <span className="ml-3 text-gray-600">Loading more movies...</span>
    </div>
  );
}
