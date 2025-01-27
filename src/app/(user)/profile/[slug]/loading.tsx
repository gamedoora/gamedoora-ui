export default function Loading() {
  return (
    <main className="flex justify-center gap mt-4">
      {' '}
      <div className="flex-1 bg-white p-6 max-w-screen-xl">
        {/* Profile Header Skeleton */}
        <div className="text-center mb-6">
          <div className="w-24 h-24 rounded-full bg-gray-200 animate-pulse"></div>
          <div className="w-32 h-6 mt-2 bg-gray-200 animate-pulse"></div>
          <div className="w-24 h-4 mt-1 bg-gray-200 animate-pulse"></div>
        </div>

        {/* About Me Skeleton */}
        <div className="mb-6">
          <div className="w-1/2 h-6 bg-gray-200 animate-pulse"></div>
          <div className="w-full h-4 mt-2 bg-gray-200 animate-pulse"></div>
        </div>

        {/* Contact Information Skeleton */}
        <div>
          <div className="w-1/3 h-6 bg-gray-200 animate-pulse"></div>
          <div className="w-full h-4 mt-2 bg-gray-200 animate-pulse"></div>
        </div>
      </div>
    </main>
  );
}
