'use client';

import { useSession } from 'next-auth/react';
import { useAuth } from '@/context/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function ProjectsPage() {
  const { data: session } = useSession();
  const { user, loading, isAuthenticated } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !isAuthenticated && !session) {
      router.push('/sign-in');
    }
  }, [isAuthenticated, loading, session, router]);

  // Check for success message
  useEffect(() => {
    if (searchParams?.get('created') === 'true') {
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 5000);
    }
  }, [searchParams]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <>
      {(session?.user?.name || user) ? (
        <div className="min-h-screen py-8 px-4">
          {/* Success Message */}
          {showSuccessMessage && (
            <div className="max-w-screen-xl mx-auto mb-6">
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md flex items-center gap-2">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Project created successfully!
              </div>
            </div>
          )}
          
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
                  <Link href="/projects/create" className="block w-full px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-400 text-center">
                    Create New Project
                  </Link>
                  <p className="text-sm text-gray-400 mt-2">
                    Start a new game project
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="min-h-screen flex items-center justify-center">
          <p>You are not logged in.</p>
        </div>
      )}
    </>
  );
}