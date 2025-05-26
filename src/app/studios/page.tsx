'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import StudioCard from '@/components/StudioCard';

interface Studio {
  id: number;
  name: string;
  description: string | null;
  avatar: string | null;
  banner: string | null;
  isPublic: boolean;
  tags: string | null;
  website: string | null;
  twitter: string | null;
  discord: string | null;
  github: string | null;
  created_at: Date;
  updated_at: Date;
  ownerId: number;
  owner: {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string | null;
    password: string;
    avatar: string | null;
    github: string | null;
    bio: string | null;
    userID: string;
    isVerified: boolean;
    created_at: Date;
    updated_at: Date;
  };
  _count: {
    members: number;
    projects: number;
  };
}

const StudiosPage = () => {
  const { user, loading, isAuthenticated } = useAuth();
  const router = useRouter();
  const [studios, setStudios] = useState<Studio[]>([]);
  const [filteredStudios, setFilteredStudios] = useState<Studio[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [visibilityFilter, setVisibilityFilter] = useState('all');
  const [sizeFilter, setSizeFilter] = useState('all');

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, loading, router]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchStudios();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    filterStudios();
  }, [studios, searchTerm, visibilityFilter, sizeFilter]);

  const fetchStudios = async () => {
    try {
      setIsLoading(true);
      // For now, using dummy data. In a real app, this would be an API call
      const dummyStudios: Studio[] = [
        {
          id: 1,
          name: "PixelForge Studios",
          description: "A leading indie game development studio specializing in fantasy RPGs and immersive storytelling.",
          avatar: null,
          banner: null,
          isPublic: true,
          tags: JSON.stringify(["fantasy", "rpg", "storytelling", "indie"]),
          website: "https://pixelforge.com",
          twitter: "https://twitter.com/pixelforge",
          discord: "https://discord.gg/pixelforge",
          github: "https://github.com/pixelforge",
          created_at: new Date("2023-06-15T10:00:00Z"),
          updated_at: new Date("2024-01-20T15:30:00Z"),
          ownerId: 1,
          owner: {
            id: 1,
            name: "Alex Chen",
            username: "alexchen",
            email: "alex@pixelforge.com",
            phone: null,
            password: "password123",
            avatar: null,
            github: "https://github.com/alexchen",
            bio: "Passionate game developer and studio founder",
            userID: "user123",
            isVerified: true,
            created_at: new Date("2023-06-15T10:00:00Z"),
            updated_at: new Date("2024-01-20T15:30:00Z")
          },
          _count: {
            members: 8,
            projects: 3
          }
        },
        {
          id: 2,
          name: "Stellar Games",
          description: "Innovative space exploration games that push the boundaries of simulation and strategy.",
          avatar: null,
          banner: null,
          isPublic: true,
          tags: JSON.stringify(["space", "simulation", "strategy", "sci-fi"]),
          website: "https://stellargames.com",
          twitter: null,
          discord: "https://discord.gg/stellargames",
          github: "https://github.com/stellargames",
          created_at: new Date("2023-09-20T14:20:00Z"),
          updated_at: new Date("2024-01-22T14:20:00Z"),
          ownerId: 2,
          owner: {
            id: 2,
            name: "Jordan Taylor",
            username: "jordan_stellar",
            email: "jordan@stellargames.com",
            phone: null,
            password: "password456",
            avatar: null,
            github: "https://github.com/jordantaylor",
            bio: "Space game enthusiast and lead developer",
            userID: "user456",
            isVerified: true,
            created_at: new Date("2023-09-20T14:20:00Z"),
            updated_at: new Date("2024-01-22T14:20:00Z")
          },
          _count: {
            members: 5,
            projects: 2
          }
        },
        {
          id: 3,
          name: "Neon Dreams Interactive",
          description: "Cyberpunk and retro-futuristic games with stunning visuals and electronic soundtracks.",
          avatar: null,
          banner: null,
          isPublic: true,
          tags: JSON.stringify(["cyberpunk", "retro", "visual", "electronic"]),
          website: null,
          twitter: "https://twitter.com/neondreams",
          discord: null,
          github: "https://github.com/neondreams",
          created_at: new Date("2023-11-10T08:45:00Z"),
          updated_at: new Date("2024-01-15T12:30:00Z"),
          ownerId: 3,
          owner: {
            id: 3,
            name: "Maria Rodriguez",
            username: "maria_neon",
            email: "maria@neondreams.com",
            phone: null,
            password: "password789",
            avatar: null,
            github: "https://github.com/mariarodriguez",
            bio: "Cyberpunk artist and game designer",
            userID: "user789",
            isVerified: true,
            created_at: new Date("2023-11-10T08:45:00Z"),
            updated_at: new Date("2024-01-15T12:30:00Z")
          },
          _count: {
            members: 4,
            projects: 1
          }
        },
        {
          id: 4,
          name: "Retro Pixel Works",
          description: "Bringing back the golden age of gaming with beautiful pixel art and classic gameplay mechanics.",
          avatar: null,
          banner: null,
          isPublic: true,
          tags: JSON.stringify(["retro", "pixel-art", "classic", "nostalgia"]),
          website: "https://retropixelworks.com",
          twitter: null,
          discord: "https://discord.gg/retropixel",
          github: null,
          created_at: new Date("2023-12-05T16:15:00Z"),
          updated_at: new Date("2024-01-18T09:45:00Z"),
          ownerId: 4,
          owner: {
            id: 4,
            name: "Sarah Johnson",
            username: "sarah_pixels",
            email: "sarah@retropixelworks.com",
            phone: null,
            password: "password101",
            avatar: null,
            github: null,
            bio: "Pixel art specialist and retro game lover",
            userID: "user101",
            isVerified: true,
            created_at: new Date("2023-12-05T16:15:00Z"),
            updated_at: new Date("2024-01-18T09:45:00Z")
          },
          _count: {
            members: 3,
            projects: 2
          }
        },
        {
          id: 5,
          name: "Quantum Interactive",
          description: "Experimental games that explore new mechanics, AI integration, and innovative player experiences.",
          avatar: null,
          banner: null,
          isPublic: false,
          tags: JSON.stringify(["experimental", "ai", "innovation", "mechanics"]),
          website: null,
          twitter: null,
          discord: null,
          github: "https://github.com/quantuminteractive",
          created_at: new Date("2024-01-01T12:00:00Z"),
          updated_at: new Date("2024-01-20T18:30:00Z"),
          ownerId: 5,
          owner: {
            id: 5,
            name: "David Kim",
            username: "david_quantum",
            email: "david@quantuminteractive.com",
            phone: null,
            password: "password202",
            avatar: null,
            github: "https://github.com/davidkim",
            bio: "AI researcher and experimental game developer",
            userID: "user202",
            isVerified: true,
            created_at: new Date("2024-01-01T12:00:00Z"),
            updated_at: new Date("2024-01-20T18:30:00Z")
          },
          _count: {
            members: 6,
            projects: 1
          }
        }
      ];
      
      setStudios(dummyStudios);
    } catch (error) {
      console.error('Error fetching studios:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterStudios = () => {
    let filtered = studios;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(studio =>
        studio.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        studio.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        studio.owner.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Visibility filter
    if (visibilityFilter !== 'all') {
      const isPublic = visibilityFilter === 'public';
      filtered = filtered.filter(studio => studio.isPublic === isPublic);
    }

    // Size filter
    if (sizeFilter !== 'all') {
      filtered = filtered.filter(studio => {
        const memberCount = studio._count.members;
        switch (sizeFilter) {
          case 'small':
            return memberCount <= 5;
          case 'medium':
            return memberCount > 5 && memberCount <= 15;
          case 'large':
            return memberCount > 15;
          default:
            return true;
        }
      });
    }

    setFilteredStudios(filtered);
  };

  if (loading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Game Development Studios
              </h1>
              <p className="text-gray-600">
                Discover and join amazing game development studios
              </p>
            </div>
            <div className="mt-4 sm:mt-0">
              <Link
                href="/studios/create"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Create Studio
              </Link>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8 bg-white rounded-lg shadow p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                Search
              </label>
              <input
                type="text"
                id="search"
                placeholder="Search studios, owners..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
              />
            </div>

            {/* Visibility Filter */}
            <div>
              <label htmlFor="visibility" className="block text-sm font-medium text-gray-700 mb-1">
                Visibility
              </label>
              <select
                id="visibility"
                value={visibilityFilter}
                onChange={(e) => setVisibilityFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
              >
                <option value="all">All Studios</option>
                <option value="public">Public</option>
                <option value="private">Private</option>
              </select>
            </div>

            {/* Size Filter */}
            <div>
              <label htmlFor="size" className="block text-sm font-medium text-gray-700 mb-1">
                Team Size
              </label>
              <select
                id="size"
                value={sizeFilter}
                onChange={(e) => setSizeFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
              >
                <option value="all">All Sizes</option>
                <option value="small">Small (1-5)</option>
                <option value="medium">Medium (6-15)</option>
                <option value="large">Large (16+)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Studios Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 animate-pulse">
                <div className="h-32 bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="flex gap-2">
                  <div className="h-6 bg-gray-200 rounded-full w-16"></div>
                  <div className="h-6 bg-gray-200 rounded-full w-20"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredStudios.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStudios.map((studio) => (
              <StudioCard key={studio.id} studio={studio} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No studios found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search criteria or create a new studio.
            </p>
            <div className="mt-6">
              <Link
                href="/studios/create"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700"
              >
                <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Create Studio
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudiosPage; 