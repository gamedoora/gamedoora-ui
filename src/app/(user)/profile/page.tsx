'use client';

import { useSession } from 'next-auth/react';
import { useAuth } from '@/context/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import ProjectCard from '@/components/ProjectCard';
import StudioCard from '@/components/StudioCard';
import IdeaCard from '@/components/IdeaCard';

export default function Profile() {
  const { data: session } = useSession();
  const { user, loading, isAuthenticated } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  // Dummy data for user's projects, studios, and ideas
  const userProjects = [
    {
      id: 1,
      title: "Mystic Realms",
      description: "An epic fantasy RPG with stunning visuals and immersive gameplay mechanics.",
      content: "Detailed project content about Mystic Realms development...",
      thumbnail: null,
      banner: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=400&fit=crop",
      status: "in_progress" as const,
      tags: JSON.stringify(["Unity", "C#", "Blender"]),
      gameEngine: "Unity",
      platform: "PC, Console",
      genre: "RPG",
      website: null,
      github: null,
      playableDemo: null,
      isPublic: true,
      created_at: new Date("2024-01-15T10:30:00Z"),
      updated_at: new Date("2024-01-22T15:45:00Z"),
      creatorId: 1,
      studioId: 1,
      creator: {
        id: 1,
        name: "Alex Chen",
        username: "alexchen",
        email: "alex@example.com",
        phone: null,
        password: "password123",
        avatar: null,
        github: "https://github.com/alexchen",
        bio: "Game designer specializing in innovative mechanics",
        userID: "user123",
        isVerified: true,
        created_at: new Date("2023-06-15T10:00:00Z"),
        updated_at: new Date("2024-01-20T15:30:00Z")
      },
      studio: {
        id: 1,
        name: "PixelForge Studios",
        description: "Independent game studio focused on creating innovative RPG experiences.",
        avatar: "https://images.unsplash.com/photo-1614680376739-414d95ff43df?w=100&h=100&fit=crop&crop=center",
        banner: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=400&fit=crop",
        isPublic: true,
        tags: JSON.stringify(["RPG", "Unity", "Indie", "Fantasy"]),
        website: "https://pixelforge.games",
        twitter: "https://twitter.com/pixelforge",
        discord: "https://discord.gg/pixelforge",
        github: "https://github.com/pixelforge",
        created_at: new Date("2023-11-01T00:00:00Z"),
        updated_at: new Date("2024-01-20T12:00:00Z"),
        ownerId: 1
      },
      _count: {
        members: 4
      }
    }
  ];

  const userStudios = [
    {
      id: 1,
      name: "PixelForge Studios",
      description: "Independent game studio focused on creating innovative RPG experiences with cutting-edge technology.",
      avatar: "https://images.unsplash.com/photo-1614680376739-414d95ff43df?w=100&h=100&fit=crop&crop=center",
      banner: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=400&fit=crop",
      isPublic: true,
      tags: JSON.stringify(["RPG", "Unity", "Indie", "Fantasy"]),
      website: "https://pixelforge.games",
      twitter: "https://twitter.com/pixelforge",
      discord: "https://discord.gg/pixelforge",
      github: "https://github.com/pixelforge",
      created_at: new Date("2023-11-01T00:00:00Z"),
      updated_at: new Date("2024-01-20T12:00:00Z"),
      ownerId: 1,
      owner: {
        id: 1,
        name: "Alex Chen",
        username: "alexchen",
        email: "alex@example.com",
        phone: null,
        password: "password123",
        avatar: null,
        github: "https://github.com/alexchen",
        bio: "Game designer specializing in innovative mechanics",
        userID: "user123",
        isVerified: true,
        created_at: new Date("2023-06-15T10:00:00Z"),
        updated_at: new Date("2024-01-20T15:30:00Z")
      },
      _count: {
        members: 8,
        projects: 3
      }
    }
  ];

  const userIdeas = [
    {
      id: 1,
      title: "Quantum Time Loop Mechanic",
      description: "A game mechanic where players can create temporal loops to solve puzzles and overcome challenges.",
      content: "Detailed explanation of the quantum time loop mechanic implementation...",
      category: "mechanics",
      tags: JSON.stringify(["time-travel", "puzzle", "quantum", "mechanics", "innovative"]),
      attachments: null,
      isPublic: true,
      likesCount: 47,
      created_at: new Date("2024-01-20T10:30:00Z"),
      updated_at: new Date("2024-01-20T10:30:00Z"),
      creatorId: 1,
      creator: {
        id: 1,
        name: "Alex Chen",
        username: "alexchen",
        email: "alex@example.com",
        phone: null,
        password: "password123",
        avatar: null,
        github: "https://github.com/alexchen",
        bio: "Game designer specializing in innovative mechanics",
        userID: "user123",
        isVerified: true,
        created_at: new Date("2023-06-15T10:00:00Z"),
        updated_at: new Date("2024-01-20T15:30:00Z")
      },
      _count: {
        likes: 47
      },
      isLikedByUser: false
    }
  ];

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

  const handleLike = async (ideaId: number) => {
    // Handle like functionality for ideas
    console.log('Like idea:', ideaId);
  };

  const stats = {
    projects: userProjects.length,
    studios: userStudios.length,
    ideas: userIdeas.length,
    totalLikes: userIdeas.reduce((sum, idea) => sum + idea.likesCount, 0)
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      {/* Success Message */}
      {showSuccessMessage && (
        <div className="max-w-7xl mx-auto mb-6">
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md flex items-center gap-2">
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Profile updated successfully!
          </div>
        </div>
      )}
      
      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Cover Image */}
          <div className="h-48 bg-gradient-to-r from-purple-600 to-blue-600"></div>
          
          {/* Profile Info */}
          <div className="px-6 py-6">
            <div className="flex flex-col items-center gap-4 md:flex-row md:items-end md:justify-between">
              <div className="flex items-center gap-6 -mt-16 md:-mt-12">
                <img
                  className="w-32 h-32 rounded-full border-4 border-white shadow-lg bg-white"
                  src={userImage}
                  alt="User Avatar"
                />
                <div className="mt-12 md:mt-8">
                  <h1 className="text-3xl font-bold text-gray-900">
                    {displayUser?.name || 'Your Profile'}
                  </h1>
                  <p className="text-gray-600 mt-1">Game Developer & Creator</p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-sm text-gray-500">
                      Member since {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'Recently'}
                    </span>
                    {user?.isVerified && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Verified
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <Link 
                  href="/profile/edit" 
                  className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Edit Profile
                </Link>
                <button 
                  onClick={handleShareProfile}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Share Profile
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{stats.projects}</div>
                <div className="text-sm text-blue-800">Projects</div>
              </div>
              <div className="bg-purple-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">{stats.studios}</div>
                <div className="text-sm text-purple-800">Studios</div>
              </div>
              <div className="bg-green-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-green-600">{stats.ideas}</div>
                <div className="text-sm text-green-800">Ideas Shared</div>
              </div>
              <div className="bg-yellow-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-yellow-600">{stats.totalLikes}</div>
                <div className="text-sm text-yellow-800">Total Likes</div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mt-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'overview', name: 'Overview', icon: '🏠' },
                { id: 'projects', name: 'Projects', icon: '🎮' },
                { id: 'studios', name: 'Studios', icon: '🏢' },
                { id: 'ideas', name: 'Ideas', icon: '💡' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`${
                    activeTab === tab.id
                      ? 'border-purple-500 text-purple-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2`}
                >
                  <span>{tab.icon}</span>
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="mt-8">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* About */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-xl font-semibold mb-4">About</h2>
                  <p className="text-gray-600 leading-relaxed">
                    {(user as any)?.bio || "Passionate game developer and creative mind behind innovative gaming experiences. Specialized in Unity 3D and Unreal Engine development with a strong focus on immersive storytelling and cutting-edge mechanics. Always looking for exciting collaborations and new challenges in the gaming industry."}
                  </p>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">Created new project: Mystic Realms</p>
                        <p className="text-sm text-gray-500">2 days ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">Joined PixelForge Studios</p>
                        <p className="text-sm text-gray-500">1 week ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                      <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">Shared idea: Quantum Time Loop Mechanic</p>
                        <p className="text-sm text-gray-500">2 weeks ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Skills */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-xl font-semibold mb-4">Skills & Technologies</h2>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'Unity 3D',
                      'Unreal Engine',
                      'C#',
                      'JavaScript',
                      'Game Design',
                      'Level Design',
                      'Blender',
                      'Photoshop'
                    ].map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
                  <div className="space-y-3">
                    <Link 
                      href="/projects/create" 
                      className="w-full flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd"/>
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium">Start New Project</h3>
                        <p className="text-sm text-gray-500">Create your next game</p>
                      </div>
                    </Link>
                    <Link 
                      href="/studios/create" 
                      className="w-full flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium">Create Studio</h3>
                        <p className="text-sm text-gray-500">Build your team</p>
                      </div>
                    </Link>
                    <Link 
                      href="/ideas/create" 
                      className="w-full flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium">Share Idea</h3>
                        <p className="text-sm text-gray-500">Inspire the community</p>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'projects' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">My Projects</h2>
                <Link 
                  href="/projects/create"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Create Project
                </Link>
              </div>
              {userProjects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {userProjects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No projects yet</h3>
                  <p className="mt-1 text-sm text-gray-500">Get started by creating your first game project.</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'studios' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">My Studios</h2>
                <Link 
                  href="/studios/create"
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Create Studio
                </Link>
              </div>
              {userStudios.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {userStudios.map((studio) => (
                    <StudioCard key={studio.id} studio={studio} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No studios yet</h3>
                  <p className="mt-1 text-sm text-gray-500">Create or join a studio to collaborate with other developers.</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'ideas' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">My Ideas</h2>
                <Link 
                  href="/ideas/create"
                  className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
                >
                  Share Idea
                </Link>
              </div>
              {userIdeas.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {userIdeas.map((idea) => (
                    <IdeaCard key={idea.id} idea={idea} onLike={handleLike} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No ideas shared yet</h3>
                  <p className="mt-1 text-sm text-gray-500">Share your creative game concepts with the community.</p>
                </div>
              )}
            </div>
          )}
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