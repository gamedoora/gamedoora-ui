'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import IdeaCard from '@/components/IdeaCard';

interface Idea {
  id: number;
  title: string;
  description: string;
  content: string | null;
  category: string | null;
  tags: string | null;
  attachments: string | null;
  isPublic: boolean;
  likesCount: number;
  created_at: Date;
  updated_at: Date;
  creatorId: number;
  creator: {
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
    likes: number;
  };
  isLikedByUser?: boolean;
}

const IdeasPage = () => {
  const { user, loading, isAuthenticated } = useAuth();
  const router = useRouter();
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [filteredIdeas, setFilteredIdeas] = useState<Idea[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, loading, router]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchIdeas();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    filterAndSortIdeas();
  }, [ideas, searchTerm, categoryFilter, sortBy]);

  const fetchIdeas = async () => {
    try {
      setIsLoading(true);
      // For now, using dummy data. In a real app, this would be an API call
      const dummyIdeas: Idea[] = [
        {
          id: 1,
          title: "Quantum Time Loop Mechanic",
          description: "A game mechanic where players can create temporal loops to solve puzzles and overcome challenges. Each loop allows slight modifications to the timeline, creating complex cause-and-effect scenarios.",
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
        },
        {
          id: 2,
          title: "Cyberpunk Cat Café Manager",
          description: "A cozy simulation game set in a cyberpunk future where you manage a cat café. Features cybernetic cats, neon aesthetics, and wholesome gameplay amidst a dystopian setting.",
          content: "Game concept combining relaxing café management with cyberpunk themes...",
          category: "game_concept",
          tags: JSON.stringify(["cyberpunk", "simulation", "cats", "cozy", "management"]),
          attachments: null,
          isPublic: true,
          likesCount: 134,
          created_at: new Date("2024-01-18T14:15:00Z"),
          updated_at: new Date("2024-01-18T14:15:00Z"),
          creatorId: 2,
          creator: {
            id: 2,
            name: "Maria Rodriguez",
            username: "maria_dev",
            email: "maria@example.com",
            phone: null,
            password: "password456",
            avatar: null,
            github: "https://github.com/mariarodriguez",
            bio: "Indie game developer with a love for unique concepts",
            userID: "user456",
            isVerified: true,
            created_at: new Date("2023-11-10T09:45:00Z"),
            updated_at: new Date("2024-01-18T11:30:00Z")
          },
          _count: {
            likes: 134
          },
          isLikedByUser: true
        },
        {
          id: 3,
          title: "Living Pixel Art Style",
          description: "An art style where pixel art characters and environments subtly animate and breathe, creating a living, organic feel while maintaining the classic pixel aesthetic.",
          content: "Technical approach to creating dynamic pixel art...",
          category: "art_style",
          tags: JSON.stringify(["pixel-art", "animation", "retro", "style", "organic"]),
          attachments: null,
          isPublic: true,
          likesCount: 89,
          created_at: new Date("2024-01-16T09:45:00Z"),
          updated_at: new Date("2024-01-16T09:45:00Z"),
          creatorId: 3,
          creator: {
            id: 3,
            name: "Sarah Johnson",
            username: "sarah_pixels",
            email: "sarah@example.com",
            phone: null,
            password: "password101",
            avatar: null,
            github: "https://github.com/sarahjohnson",
            bio: "Pixel artist and visual designer",
            userID: "user101",
            isVerified: true,
            created_at: new Date("2024-01-05T16:30:00Z"),
            updated_at: new Date("2024-01-21T16:15:00Z")
          },
          _count: {
            likes: 89
          },
          isLikedByUser: false
        },
        {
          id: 4,
          title: "Emotion-Based Difficulty Scaling",
          description: "A dynamic difficulty system that adjusts based on player emotional state detected through gameplay patterns, ensuring optimal challenge and engagement.",
          content: "Implementation details for emotion-based AI...",
          category: "feature",
          tags: JSON.stringify(["AI", "difficulty", "emotions", "adaptive", "innovation"]),
          attachments: null,
          isPublic: true,
          likesCount: 72,
          created_at: new Date("2024-01-15T11:20:00Z"),
          updated_at: new Date("2024-01-15T11:20:00Z"),
          creatorId: 4,
          creator: {
            id: 4,
            name: "David Kim",
            username: "david_games",
            email: "david@example.com",
            phone: null,
            password: "password789",
            avatar: null,
            github: "https://github.com/davidkim",
            bio: "AI researcher and game developer",
            userID: "user789",
            isVerified: true,
            created_at: new Date("2023-08-22T14:20:00Z"),
            updated_at: new Date("2024-01-22T14:20:00Z")
          },
          _count: {
            likes: 72
          },
          isLikedByUser: true
        },
        {
          id: 5,
          title: "Collaborative World Building RPG",
          description: "An RPG where the game world is continuously built and modified by players in real-time. Every player action contributes to the evolving narrative and world state.",
          content: "Concept for player-driven world building mechanics...",
          category: "game_concept",
          tags: JSON.stringify(["RPG", "collaborative", "world-building", "multiplayer", "dynamic"]),
          attachments: null,
          isPublic: true,
          likesCount: 156,
          created_at: new Date("2024-01-12T16:30:00Z"),
          updated_at: new Date("2024-01-12T16:30:00Z"),
          creatorId: 5,
          creator: {
            id: 5,
            name: "Emma Wilson",
            username: "emma_worlds",
            email: "emma@example.com",
            phone: null,
            password: "password202",
            avatar: null,
            github: "https://github.com/emmawilson",
            bio: "World builder and narrative designer",
            userID: "user202",
            isVerified: true,
            created_at: new Date("2023-12-01T12:15:00Z"),
            updated_at: new Date("2024-01-19T08:45:00Z")
          },
          _count: {
            likes: 156
          },
          isLikedByUser: false
        },
        {
          id: 6,
          title: "Musical Combat System",
          description: "A rhythm-based combat system where attacks, blocks, and special moves are timed to musical beats, creating fluid and musical battle sequences.",
          content: "Design document for rhythm-based combat mechanics...",
          category: "mechanics",
          tags: JSON.stringify(["rhythm", "combat", "music", "innovative", "action"]),
          attachments: null,
          isPublic: true,
          likesCount: 98,
          created_at: new Date("2024-01-10T13:45:00Z"),
          updated_at: new Date("2024-01-10T13:45:00Z"),
          creatorId: 6,
          creator: {
            id: 6,
            name: "James Thompson",
            username: "james_beats",
            email: "james@example.com",
            phone: null,
            password: "password303",
            avatar: null,
            github: "https://github.com/jamesthompson",
            bio: "Music and game design fusion specialist",
            userID: "user303",
            isVerified: true,
            created_at: new Date("2023-10-15T14:30:00Z"),
            updated_at: new Date("2024-01-10T13:45:00Z")
          },
          _count: {
            likes: 98
          },
          isLikedByUser: true
        }
      ];
      
      setIdeas(dummyIdeas);
    } catch (error) {
      console.error('Error fetching ideas:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterAndSortIdeas = () => {
    let filtered = ideas;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(idea =>
        idea.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        idea.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        idea.creator.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(idea => idea.category === categoryFilter);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        case 'oldest':
          return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        case 'most_liked':
          return b.likesCount - a.likesCount;
        case 'least_liked':
          return a.likesCount - b.likesCount;
        default:
          return 0;
      }
    });

    setFilteredIdeas(filtered);
  };

  const handleLike = async (ideaId: number) => {
    // In a real app, this would make an API call
    setIdeas(prevIdeas =>
      prevIdeas.map(idea => {
        if (idea.id === ideaId) {
          const isCurrentlyLiked = idea.isLikedByUser;
          return {
            ...idea,
            isLikedByUser: !isCurrentlyLiked,
            likesCount: isCurrentlyLiked ? idea.likesCount - 1 : idea.likesCount + 1,
            _count: {
              ...idea._count,
              likes: isCurrentlyLiked ? idea._count.likes - 1 : idea._count.likes + 1
            }
          };
        }
        return idea;
      })
    );
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
                Game Ideas
              </h1>
              <p className="text-gray-600">
                Discover and share innovative game concepts and mechanics
              </p>
            </div>
            <div className="mt-4 sm:mt-0">
              <Link
                href="/ideas/create"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                Share Your Idea
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
                placeholder="Search ideas, creators, descriptions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Category Filter */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                id="category"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Categories</option>
                <option value="game_concept">Game Concepts</option>
                <option value="mechanics">Mechanics</option>
                <option value="art_style">Art Styles</option>
                <option value="feature">Features</option>
              </select>
            </div>

            {/* Sort Filter */}
            <div>
              <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-1">
                Sort By
              </label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="most_liked">Most Liked</option>
                <option value="least_liked">Least Liked</option>
              </select>
            </div>
          </div>
        </div>

        {/* Ideas Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 animate-pulse">
                <div className="flex justify-between items-center mb-4">
                  <div className="h-6 bg-gray-200 rounded-full w-24"></div>
                  <div className="h-4 bg-gray-200 rounded w-16"></div>
                </div>
                <div className="h-6 bg-gray-200 rounded mb-3"></div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-24"></div>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-4/5"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/5"></div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="h-8 bg-gray-200 rounded-lg w-20"></div>
                  <div className="h-8 bg-gray-200 rounded-lg w-24"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredIdeas.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredIdeas.map((idea) => (
              <IdeaCard key={idea.id} idea={idea} onLike={handleLike} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No ideas found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search criteria or share your own idea.
            </p>
            <div className="mt-6">
              <Link
                href="/ideas/create"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                Share Your Idea
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default IdeasPage; 