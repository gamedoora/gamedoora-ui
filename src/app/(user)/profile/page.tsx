'use client';

import { useSession } from 'next-auth/react';
import { useAuth } from '@/context/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Profile() {
  const { data: session } = useSession();
  const { user, loading, isAuthenticated } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  // Redirect to public profile URL
  useEffect(() => {
    if (!loading) {
      const userForUsername = user || session?.user;
      if (userForUsername) {
        const username = user?.username || userForUsername?.name?.toLowerCase().replace(/\s+/g, '_') || 'user';
        router.push(`/profile/${username}?updated=${searchParams?.get('updated') === 'true' ? 'true' : 'false'}`);
      } else {
        router.push('/sign-in');
      }
    }
  }, [user, session, loading, router, searchParams]);

  // Check for success message
  useEffect(() => {
    if (searchParams?.get('updated') === 'true') {
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

  if (!isAuthenticated && !session) {
    return null; // Will redirect via useEffect
  }

  // Use session data if available, otherwise use auth context user
  const displayUser = user || session?.user;
  const userImage = session?.user?.image || '/default-avatar.png';

  const handleShareProfile = () => {
    const profileUrl = `${window.location.origin}/profile/${displayUser?.name || 'user'}`;
    navigator.clipboard.writeText(profileUrl).then(() => {
      alert('Profile link copied to clipboard!');
    }).catch(() => {
      setShowShareModal(true);
    });
  };

  return (
    <div className="py-8 px-4">
      {/* Success Message */}
      {showSuccessMessage && (
        <div className="max-w-screen-xl mx-auto mb-6">
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md flex items-center gap-2">
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Profile updated successfully!
          </div>
        </div>
      )}
      
      {/* Header */}
      <div className="max-w-screen-xl mx-auto">
        <div className="flex flex-col items-center gap-4 md:flex-row md:items-end md:justify-between">
          <div className="flex items-center gap-4">
            <img
              className="w-28 h-28 rounded-full border-4 border-gray-800"
              src={userImage}
              alt="User Avatar"
            />
            <div>
              <h1 className="text-3xl text-black font-bold">
                {displayUser?.name || 'Your Profile'}
              </h1>
              <p className="text-gray-400">Game Developer</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Link 
              href="/profile/edit" 
              className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-400"
            >
              Edit Profile
            </Link>
            <button 
              onClick={handleShareProfile}
              className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
            >
              Share Profile
            </button>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {/* Basic Information */}
        <div className="rounded-lg shadow-lg p-6 bg-white">
          <h2 className="text-xl font-bold mb-4">Basic Information</h2>
          <div className="space-y-3">
            <p>
              <strong>Full Name:</strong> {displayUser?.name || 'Not provided'}
            </p>
            <p>
              <strong>Email:</strong>{' '}
              <a
                href={`mailto:${displayUser?.email}`}
                className="text-blue-400 hover:underline"
              >
                {displayUser?.email || 'Not provided'}
              </a>
            </p>
            {user?.phone && (
              <p>
                <strong>Phone:</strong> {user.phone}
              </p>
            )}
            {user?.userID && (
              <p>
                <strong>User ID:</strong> {user.userID}
              </p>
            )}
            {user?.isVerified !== undefined && (
              <p>
                <strong>Account Status:</strong>{' '}
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  user.isVerified 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {user.isVerified ? 'Verified' : 'Pending Verification'}
                </span>
              </p>
            )}
            {user?.created_at && (
              <p>
                <strong>Member Since:</strong> {new Date(user.created_at).toLocaleDateString()}
              </p>
            )}
          </div>
        </div>

        {/* About Section */}
        <div className="rounded-lg shadow-lg p-6 bg-white">
          <h2 className="text-xl font-bold mb-4">About</h2>
          <p className="text-gray-600">
            {user || session ? 
              "Experienced game developer with a passion for creating immersive gaming experiences. Specialized in Unity 3D and Unreal Engine development with a strong background in programming." 
              : "Welcome to GameDoora! Complete your profile to showcase your game development skills and connect with other developers."
            }
          </p>
          <div className="mt-4">
            <h3 className="font-semibold text-gray-700 mb-2">Authentication Status</h3>
            <div className="flex flex-wrap gap-2">
              {session && (
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  NextAuth Session Active
                </span>
              )}
              {user && (
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                  Custom Auth Active
                </span>
              )}
              {!session && !user && (
                <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                  No Active Session
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="rounded-lg shadow-lg p-6 bg-white">
          <h2 className="text-xl font-bold mb-4">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {[
              'Unity 3D',
              'Unreal Engine',
              'Game Design',
              'Programming',
            ].map((skill) => (
              <span
                key={skill}
                className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-3">
            Add your skills by editing your profile
          </p>
        </div>

        {/* Projects */}
        <div className="rounded-lg shadow-lg p-6 bg-white">
          <h2 className="text-xl font-bold mb-4">Recent Projects</h2>
          <p className="text-gray-500">
            No projects yet. Start creating amazing games!
          </p>
          <Link href="/projects/create" className="mt-3 inline-block px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Create Project
          </Link>
        </div>

        {/* Quick Actions */}
        <div className="rounded-lg shadow-lg p-6 bg-white md:col-span-2">
          <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/projects/create" className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left block">
              <h3 className="font-semibold">Start a Project</h3>
              <p className="text-sm text-gray-500">Create your first game project</p>
            </Link>
            <Link href="/studio" className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left block">
              <h3 className="font-semibold">Join a Studio</h3>
              <p className="text-sm text-gray-500">Connect with other developers</p>
            </Link>
            <button 
              onClick={() => alert('Market feature coming soon!')}
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left"
            >
              <h3 className="font-semibold">Browse Market</h3>
              <p className="text-sm text-gray-500">Find assets and tools</p>
            </button>
          </div>
        </div>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Share Your Profile</h3>
            <p className="text-gray-600 mb-4">Copy this link to share your profile:</p>
            <div className="bg-gray-100 p-3 rounded border text-sm break-all">
              {`${typeof window !== 'undefined' ? window.location.origin : ''}/profile/${displayUser?.name || 'user'}`}
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setShowShareModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const profileUrl = `${window.location.origin}/profile/${displayUser?.name || 'user'}`;
                  navigator.clipboard.writeText(profileUrl);
                  setShowShareModal(false);
                  alert('Profile link copied to clipboard!');
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Copy Link
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 