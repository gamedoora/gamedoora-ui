'use client';

import { useSession } from 'next-auth/react';
import { useAuth } from '@/context/AuthContext';
import { useParams, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Navigation } from '@/components/Navigation';

interface PublicUser {
  id: number;
  name: string;
  username: string;
  email?: string; // Only shown to profile owner
  phone?: string; // Only shown to profile owner
  avatar?: string;
  github?: string; // GitHub profile URL
  bio?: string;
  skills: string[];
  isVerified: boolean;
  created_at: string;
  projectCount: number;
}

export default function PublicProfile() {
  const { data: session } = useSession();
  const { user: authUser, isAuthenticated } = useAuth();
  const params = useParams();
  const searchParams = useSearchParams();
  const username = params?.username as string;
  
  const [profileUser, setProfileUser] = useState<PublicUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  // Check for success message
  useEffect(() => {
    if (searchParams?.get('updated') === 'true') {
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 5000);
    }
  }, [searchParams]);

  // Fetch user profile data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        
        // Fetch user profile from database
        const response = await fetch(`/api/users/${username}`);
        
        if (response.ok) {
          const data = await response.json();
          setProfileUser(data.user);
        } else if (response.status === 404) {
          setError('User not found');
        } else {
          setError('Failed to load profile');
        }
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchProfile();
    }
  }, [username]);

  // Check if the current user is viewing their own profile
  const isOwnProfile = () => {
    if (!profileUser) return false;
    
    // Check against both auth systems
    if (authUser && authUser.username === profileUser.username) return true;
    if (session?.user?.email === profileUser.email) return true;
    
    return false;
  };

  const handleShareProfile = () => {
    const profileUrl = `${window.location.origin}/profile/${username}`;
    navigator.clipboard.writeText(profileUrl).then(() => {
      alert('Profile link copied to clipboard!');
    }).catch(() => {
      setShowShareModal(true);
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !profileUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Profile Not Found</h1>
          <p className="text-gray-600 mb-8">The user profile you&apos;re looking for doesn&apos;t exist.</p>
          <Link 
            href="/" 
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  const userImage = profileUser.avatar || '/default-avatar.png';
  const isOwner = isOwnProfile();

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
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
              className="w-28 h-28 rounded-full border-4 border-gray-800 object-cover"
              src={userImage}
              alt={`${profileUser.name}&apos;s Avatar`}
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-3xl text-black font-bold">
                  {profileUser.name}
                </h1>
                {profileUser.isVerified && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    ✓ Verified
                  </span>
                )}
              </div>
              <p className="text-gray-600">@{profileUser.username}</p>
              <p className="text-gray-400">Game Developer</p>
            </div>
          </div>
          
          <div className="flex gap-2">
            {isOwner ? (
              <>
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
              </>
            ) : (
              <>
                <button 
                  onClick={handleShareProfile}
                  className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
                >
                  Share Profile
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Connect
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {/* Basic Information */}
        <div className="rounded-xl shadow-lg p-6 bg-white border border-gray-100 hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-xl font-bold mb-6 text-gray-800 flex items-center">
            <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Basic Information
          </h2>
          <div className="space-y-4">
            <div className="flex flex-col space-y-1">
              <label className="text-sm font-medium text-gray-600">Full Name</label>
              <div className="text-gray-900 font-medium">{profileUser.name}</div>
            </div>
            
            <div className="flex flex-col space-y-1">
              <label className="text-sm font-medium text-gray-600">Username</label>
              <div className="flex items-center space-x-2">
                <span className="text-gray-500 bg-gray-100 px-3 py-2 rounded-lg border text-sm font-mono">
                  @{profileUser.username}
                </span>
                <span className="text-xs text-gray-400 italic">Cannot be changed</span>
              </div>
            </div>

            {isOwner && profileUser.email && (
              <div className="flex flex-col space-y-1">
                <label className="text-sm font-medium text-gray-600">Email</label>
                <a
                  href={`mailto:${profileUser.email}`}
                  className="text-blue-600 hover:text-blue-700 hover:underline transition-colors duration-200"
                >
                  {profileUser.email}
                </a>
              </div>
            )}
            
            {isOwner && profileUser.phone && (
              <div className="flex flex-col space-y-1">
                <label className="text-sm font-medium text-gray-600">Phone</label>
                <div className="text-gray-900">{profileUser.phone}</div>
              </div>
            )}
            
            <div className="flex flex-col space-y-1">
              <label className="text-sm font-medium text-gray-600">Member Since</label>
              <div className="text-gray-900">{new Date(profileUser.created_at).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</div>
            </div>
            
            {profileUser.github && (
              <div className="flex flex-col space-y-1">
                <label className="text-sm font-medium text-gray-600">GitHub</label>
                <a
                  href={profileUser.github.startsWith('http') ? profileUser.github : `https://github.com/${profileUser.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 hover:underline transition-colors duration-200 flex items-center space-x-1"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  <span>{profileUser.github.startsWith('http') ? profileUser.github : `@${profileUser.github}`}</span>
                </a>
              </div>
            )}
            
            <div className="flex flex-col space-y-1">
              <label className="text-sm font-medium text-gray-600">Projects</label>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-blue-600">{profileUser.projectCount}</span>
                <span className="text-gray-600">projects</span>
              </div>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="rounded-lg shadow-lg p-6 bg-white">
          <h2 className="text-xl font-bold mb-4">About</h2>
          <p className="text-gray-600">
            {profileUser.bio || "This user hasn&apos;t added a bio yet."}
          </p>
          {!isAuthenticated && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <Link href="/sign-in" className="font-semibold hover:underline">
                  Sign in
                </Link> to connect with {profileUser.name} and see more details.
              </p>
            </div>
          )}
        </div>

        {/* Skills */}
        <div className="rounded-lg shadow-lg p-6 bg-white">
          <h2 className="text-xl font-bold mb-4">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {profileUser.skills.map((skill) => (
              <span
                key={skill}
                className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
          {isOwner && (
            <p className="text-sm text-gray-500 mt-3">
              Edit your profile to update your skills
            </p>
          )}
        </div>

        {/* Projects */}
        <div className="rounded-lg shadow-lg p-6 bg-white">
          <h2 className="text-xl font-bold mb-4">Recent Projects</h2>
          <p className="text-gray-500">
            {isOwner 
              ? "No projects yet. Start creating amazing games!"
              : `${profileUser.name} hasn&apos;t shared any projects yet.`
            }
          </p>
          {isOwner && (
            <Link href="/projects/create" className="mt-3 inline-block px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              Create Project
            </Link>
          )}
        </div>

        {/* Quick Actions - Only for profile owner */}
        {isOwner && (
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
        )}
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Share Profile</h3>
            <p className="text-gray-600 mb-4">Copy this link to share this profile:</p>
            <div className="bg-gray-100 p-3 rounded border text-sm break-all">
              {`${typeof window !== 'undefined' ? window.location.origin : ''}/profile/${username}`}
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
                  const profileUrl = `${window.location.origin}/profile/${username}`;
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
    </>
  );
} 