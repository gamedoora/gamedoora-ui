'use client';

import React from 'react';
import Link from 'next/link';
import { Project, User, Studio } from '@prisma/client';

interface ProjectWithRelations extends Project {
  creator: User;
  studio?: Studio | null;
  _count?: {
    members: number;
  };
}

interface ProjectCardProps {
  project: ProjectWithRelations;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'planning':
        return 'bg-yellow-100 text-yellow-800';
      case 'on_hold':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'in_progress':
        return 'In Progress';
      case 'planning':
        return 'Planning';
      case 'on_hold':
        return 'On Hold';
      default:
        return 'In Progress';
    }
  };

  const parseTags = (tags: string | null) => {
    if (!tags) return [];
    try {
      return JSON.parse(tags);
    } catch {
      return [];
    }
  };

  const tags = parseTags(project.tags);

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
      {/* Project Banner/Thumbnail */}
      <div className="relative h-48 bg-gradient-to-br from-purple-500 to-blue-600 overflow-hidden">
        {project.banner || project.thumbnail ? (
          <img
            src={project.banner || project.thumbnail || ''}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-white text-6xl font-bold opacity-20">
              {project.title.charAt(0).toUpperCase()}
            </div>
          </div>
        )}
        
        {/* Status Badge */}
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
            {getStatusText(project.status)}
          </span>
        </div>
        
        {/* Studio Badge */}
        {project.studio && (
          <div className="absolute top-4 left-4">
            <Link href={`/studios/${project.studio.id}`}>
              <span className="bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-xs font-medium hover:bg-opacity-70 transition-colors">
                {project.studio.name}
              </span>
            </Link>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-6">
        {/* Project Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
          {project.title}
        </h3>

        {/* Creator Info */}
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
            {project.creator.avatar ? (
              <img
                src={project.creator.avatar}
                alt={project.creator.name}
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <span className="text-sm font-medium text-gray-600">
                {project.creator.name.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
          <div>
            <Link href={`/profile/${project.creator.username}`}>
              <span className="text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors">
                {project.creator.name}
              </span>
            </Link>
            <div className="text-xs text-gray-500">@{project.creator.username}</div>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {project.description || 'No description available'}
        </p>

        {/* Tech Stack & Platform */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.gameEngine && (
            <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-md text-xs font-medium">
              {project.gameEngine}
            </span>
          )}
          {project.platform && (
            <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-md text-xs font-medium">
              {project.platform}
            </span>
          )}
          {project.genre && (
            <span className="bg-pink-100 text-pink-800 px-2 py-1 rounded-md text-xs font-medium">
              {project.genre}
            </span>
          )}
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {tags.slice(0, 3).map((tag: string, index: number) => (
              <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs">
                #{tag}
              </span>
            ))}
            {tags.length > 3 && (
              <span className="text-gray-500 text-xs">+{tags.length - 3} more</span>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-4 text-sm text-gray-500">
            {project._count?.members && (
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                </svg>
                <span>{project._count.members + 1}</span>
              </div>
            )}
            <div className="text-xs">
              {new Date(project.created_at).toLocaleDateString()}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            {project.playableDemo && (
              <Link
                href={project.playableDemo}
                target="_blank"
                className="bg-green-600 text-white px-3 py-1 rounded-md text-xs font-medium hover:bg-green-700 transition-colors"
              >
                Play Demo
              </Link>
            )}
            <Link
              href={`/projects/${project.id}`}
              className="bg-blue-600 text-white px-3 py-1 rounded-md text-xs font-medium hover:bg-blue-700 transition-colors"
            >
              View Project
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard; 