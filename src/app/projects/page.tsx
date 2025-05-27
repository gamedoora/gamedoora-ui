'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ProjectCard from '@/components/ProjectCard';

interface Project {
  id: number;
  title: string;
  description: string | null;
  content: string | null;
  thumbnail: string | null;
  banner: string | null;
  status: string;
  tags: string | null;
  gameEngine: string | null;
  platform: string | null;
  genre: string | null;
  website: string | null;
  github: string | null;
  playableDemo: string | null;
  isPublic: boolean;
  created_at: Date;
  updated_at: Date;
  creatorId: number;
  studioId: number | null;
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
  studio: {
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
  } | null;
  _count: {
    members: number;
  };
}

const ProjectsPage = () => {
  const { user, loading, isAuthenticated } = useAuth();
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [engineFilter, setEngineFilter] = useState('all');
  const [genreFilter, setGenreFilter] = useState('all');

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, loading, router]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchProjects();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    filterProjects();
  }, [projects, searchTerm, statusFilter, engineFilter, genreFilter]);

  const fetchProjects = async () => {
    try {
      setIsLoading(true);
      // For now, using dummy data. In a real app, this would be an API call
      const dummyProjects: Project[] = [
        {
          id: 1,
          title: "Mystic Realms",
          description: "An epic fantasy adventure RPG with stunning visuals and immersive gameplay mechanics.",
          content: null,
          thumbnail: null,
          banner: null,
          status: "in_progress",
          tags: JSON.stringify(["fantasy", "rpg", "adventure", "multiplayer"]),
          gameEngine: "Unity",
          platform: "PC",
          genre: "RPG",
          website: "https://mysticroalms.com",
          github: "https://github.com/studio/mystic-realms",
          playableDemo: "https://play.mysticroalms.com",
          isPublic: true,
          created_at: new Date("2024-01-15T10:00:00Z"),
          updated_at: new Date("2024-01-20T15:30:00Z"),
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
            github: null,
            bio: null,
            userID: "user123",
            isVerified: true,
            created_at: new Date("2024-01-15T10:00:00Z"),
            updated_at: new Date("2024-01-20T15:30:00Z")
          },
          studio: {
            id: 1,
            name: "PixelForge Studios",
            description: "A leading game development studio",
            avatar: null,
            banner: null,
            isPublic: true,
            tags: JSON.stringify(["fantasy", "rpg", "adventure", "multiplayer"]),
            website: "https://pixelforge.com",
            twitter: null,
            discord: null,
            github: "https://github.com/pixelforge",
            created_at: new Date("2024-01-15T10:00:00Z"),
            updated_at: new Date("2024-01-20T15:30:00Z"),
            ownerId: 1
          },
          _count: {
            members: 5
          }
        },
        {
          id: 2,
          title: "Cyber Runner",
          description: "A fast-paced cyberpunk platformer with neon aesthetics and electronic music soundtrack.",
          content: null,
          thumbnail: null,
          banner: null,
          status: "completed",
          tags: JSON.stringify(["cyberpunk", "platformer", "action", "indie"]),
          gameEngine: "Godot",
          platform: "Mobile",
          genre: "Action",
          website: null,
          github: "https://github.com/indie/cyber-runner",
          playableDemo: null,
          isPublic: true,
          created_at: new Date("2023-11-20T08:15:00Z"),
          updated_at: new Date("2024-01-10T12:45:00Z"),
          creatorId: 2,
          studioId: null,
          creator: {
            id: 2,
            name: "Maria Rodriguez",
            username: "maria_dev",
            email: "maria@example.com",
            phone: null,
            password: "password456",
            avatar: null,
            github: null,
            bio: null,
            userID: "user456",
            isVerified: true,
            created_at: new Date("2023-11-20T08:15:00Z"),
            updated_at: new Date("2024-01-10T12:45:00Z")
          },
          studio: null,
          _count: {
            members: 2
          }
        },
        {
          id: 3,
          title: "Space Colony Builder",
          description: "Build and manage your own space colony in this strategic simulation game.",
          content: null,
          thumbnail: null,
          banner: null,
          status: "planning",
          tags: JSON.stringify(["strategy", "simulation", "space", "management"]),
          gameEngine: "Unreal Engine",
          platform: "PC",
          genre: "Strategy",
          website: null,
          github: null,
          playableDemo: null,
          isPublic: true,
          created_at: new Date("2024-01-22T14:20:00Z"),
          updated_at: new Date("2024-01-22T14:20:00Z"),
          creatorId: 3,
          studioId: 2,
          creator: {
            id: 3,
            name: "David Kim",
            username: "david_games",
            email: "david@example.com",
            phone: null,
            password: "password789",
            avatar: null,
            github: null,
            bio: null,
            userID: "user789",
            isVerified: true,
            created_at: new Date("2024-01-22T14:20:00Z"),
            updated_at: new Date("2024-01-22T14:20:00Z")
          },
          studio: {
            id: 2,
            name: "Stellar Games",
            description: "A leading game development studio",
            avatar: null,
            banner: null,
            isPublic: true,
            tags: JSON.stringify(["strategy", "simulation", "space", "management"]),
            website: "https://stellar.com",
            twitter: null,
            discord: null,
            github: "https://github.com/stellar",
            created_at: new Date("2024-01-22T14:20:00Z"),
            updated_at: new Date("2024-01-22T14:20:00Z"),
            ownerId: 2
          },
          _count: {
            members: 3
          }
        },
        {
          id: 4,
          title: "Pixel Art Dungeon",
          description: "A charming retro-style dungeon crawler with beautiful pixel art and challenging puzzles.",
          content: null,
          thumbnail: null,
          banner: null,
          status: "in_progress",
          tags: JSON.stringify(["retro", "pixel-art", "dungeon-crawler", "puzzle"]),
          gameEngine: "Unity",
          platform: "PC",
          genre: "Adventure",
          website: null,
          github: null,
          playableDemo: "https://play.pixeldungeon.com",
          isPublic: true,
          created_at: new Date("2024-01-18T09:30:00Z"),
          updated_at: new Date("2024-01-21T16:15:00Z"),
          creatorId: 4,
          studioId: null,
          creator: {
            id: 4,
            name: "Sarah Johnson",
            username: "sarah_pixels",
            email: "sarah@example.com",
            phone: null,
            password: "password101",
            avatar: null,
            github: null,
            bio: null,
            userID: "user101",
            isVerified: true,
            created_at: new Date("2024-01-18T09:30:00Z"),
            updated_at: new Date("2024-01-21T16:15:00Z")
          },
          studio: null,
          _count: {
            members: 1
          }
        }
      ];
      
      setProjects(dummyProjects);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterProjects = () => {
    let filtered = projects;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.creator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.studio?.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(project => project.status === statusFilter);
    }

    // Engine filter
    if (engineFilter !== 'all') {
      filtered = filtered.filter(project => project.gameEngine === engineFilter);
    }

    // Genre filter
    if (genreFilter !== 'all') {
      filtered = filtered.filter(project => project.genre === genreFilter);
    }

    setFilteredProjects(filtered);
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
                Game Projects
              </h1>
              <p className="text-gray-600">
                Discover amazing game projects from developers around the world
              </p>
            </div>
            <div className="mt-4 sm:mt-0">
              <Link
                href="/projects/create"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Create Project
              </Link>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8 bg-white rounded-lg shadow p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                Search
              </label>
              <input
                type="text"
                id="search"
                placeholder="Search projects, creators, studios..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Status Filter */}
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                id="status"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Status</option>
                <option value="planning">Planning</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="on_hold">On Hold</option>
              </select>
            </div>

            {/* Engine Filter */}
            <div>
              <label htmlFor="engine" className="block text-sm font-medium text-gray-700 mb-1">
                Engine
              </label>
              <select
                id="engine"
                value={engineFilter}
                onChange={(e) => setEngineFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Engines</option>
                <option value="Unity">Unity</option>
                <option value="Unreal Engine">Unreal Engine</option>
                <option value="Godot">Godot</option>
                <option value="GameMaker">GameMaker</option>
                <option value="Construct">Construct</option>
              </select>
            </div>

            {/* Genre Filter */}
            <div>
              <label htmlFor="genre" className="block text-sm font-medium text-gray-700 mb-1">
                Genre
              </label>
              <select
                id="genre"
                value={genreFilter}
                onChange={(e) => setGenreFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Genres</option>
                <option value="Action">Action</option>
                <option value="Adventure">Adventure</option>
                <option value="RPG">RPG</option>
                <option value="Strategy">Strategy</option>
                <option value="Puzzle">Puzzle</option>
                <option value="Simulation">Simulation</option>
                <option value="Platformer">Platformer</option>
              </select>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 animate-pulse">
                <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="flex gap-2">
                  <div className="h-6 bg-gray-200 rounded-full w-16"></div>
                  <div className="h-6 bg-gray-200 rounded-full w-20"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No projects found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search criteria or create a new project.
            </p>
            <div className="mt-6">
              <Link
                href="/projects/create"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Create Project
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsPage; 