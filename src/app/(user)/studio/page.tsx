'use client';
// import { getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

export default async function StudioPage() {
  // const session = await getServerSession();
  const { data: session } = useSession();
  if (!session) {
    redirect('/sign-in');
  }

  return (
    <>
      {session?.user?.name ? (
        <div className="min-h-screen py-8 px-4">
          {/* Content Grid */}
          <div className="max-w-screen-xl mx-auto mt-8">
            {/* My Studios Section */}
            <div className="rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-6">My Studios</h2>
              <div className="space-y-6">
                {/* Studio 1 */}
                <div className="p-6 rounded-lg border">
                  <h3 className="text-xl font-semibold">
                    Pixel Perfect Studios
                  </h3>
                  <p className="text-gray-400 mt-2">12 Projects + 25 Members</p>
                  <div className="mt-4">
                    <span className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">
                      Game Design
                    </span>
                    <span className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm ml-2">
                      3D
                    </span>
                  </div>
                </div>

                {/* Studio 2 */}
                <div className="p-6 rounded-lg border">
                  <h3 className="text-xl font-semibold">Indie Game Labs</h3>
                  <p className="text-gray-400 mt-2">8 Projects + 15 Members</p>
                  <div className="mt-4">
                    <span className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">
                      Mobile
                    </span>
                    <span className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm ml-2">
                      2D
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Create New Studio Section */}
            <div className="mt-8 text-center">
              <button className="px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-400">
                Create New Studio
              </button>
              <p className="text-gray-400 mt-2">
                Start a new game development studio
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="min-h-screen flex items-center justify-center text-white">
          <p>You are not logged in.</p>
        </div>
      )}
    </>
  );
}
