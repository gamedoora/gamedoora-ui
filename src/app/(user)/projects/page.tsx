'use client';

import { useSession } from 'next-auth/react';

export default function ProjectsPage() {
  const { data: session } = useSession();

  return (
    <>
      {session?.user?.name ? (
        <div className="min-h-screen py-8 px-4">
          {/* Content Grid */}
          <div className="max-w-screen-xl mx-auto mt-8">
            {/* Projects Section */}
            <div className="rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-6">Projects</h2>

              {/* Search Bar */}
              <div className="mb-6">
                <input
                  type="text"
                  placeholder="Search projects..."
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* Production Section */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Production</h3>
                <div className="space-y-6">
                  {/* Project 1: Adventure Quest */}
                  <div className="p-6 rounded-lg border">
                    <h4 className="text-lg font-bold">Adventure Quest</h4>
                    <p className="text-gray-400 mt-2">
                      A fantasy RPG with dynamic quest system and rich storyline
                    </p>
                    <div className="mt-4 flex justify-between items-center">
                      <span className="text-sm text-gray-400">24 Tasks</span>
                      <span className="text-sm text-gray-400">RPG 3D</span>
                      <span className="text-sm text-gray-400">Progress 75%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Free Production Section */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Free Production</h3>
                <div className="space-y-6">
                  {/* Project 2: Space Explorer */}
                  <div className="p-6 rounded-lg border">
                    <h4 className="text-lg font-bold">Space Explorer</h4>
                    <p className="text-gray-400 mt-2">
                      Space exploration game with procedurally generated worlds
                    </p>
                    <div className="mt-4 flex justify-between items-center">
                      <span className="text-sm text-gray-400">18 Tasks</span>
                      <span className="text-sm text-gray-400">
                        Space Simulation
                      </span>
                      <span className="text-sm text-gray-400">Progress 35%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* All Stages Section */}
              <div>
                <h3 className="text-xl font-semibold mb-4">All Stages</h3>
                <div className="p-6 rounded-lg border">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-gray-400">New Project</span>
                    <select className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500">
                      <option>Sort by</option>
                      <option>Date</option>
                      <option>Name</option>
                    </select>
                  </div>
                  <button className="w-full px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-400">
                    Create New Project
                  </button>
                  <p className="text-sm text-gray-400 mt-2">
                    Start a new game project
                  </p>
                </div>
              </div>
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