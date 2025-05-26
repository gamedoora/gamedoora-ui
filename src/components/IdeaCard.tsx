'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Idea, User } from '@prisma/client';

interface IdeaWithRelations extends Idea {
  creator: User;
  _count?: {
    likes: number;
  };
  isLikedByUser?: boolean;
}

interface IdeaCardProps {
  idea: IdeaWithRelations;
  onLike?: (ideaId: number) => void;
}

const IdeaCard: React.FC<IdeaCardProps> = ({ idea, onLike }) => {
  const [isLiked, setIsLiked] = useState(idea.isLikedByUser || false);
  const [likesCount, setLikesCount] = useState(idea._count?.likes || idea.likesCount);

  const parseTags = (tags: string | null) => {
    if (!tags) return [];
    try {
      return JSON.parse(tags);
    } catch {
      return [];
    }
  };

  const getCategoryIcon = (category: string | null) => {
    switch (category) {
      case 'game_concept':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        );
      case 'feature':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
          </svg>
        );
      case 'art_style':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
          </svg>
        );
      case 'mechanics':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" clipRule="evenodd" />
          </svg>
        );
    }
  };

  const getCategoryColor = (category: string | null) => {
    switch (category) {
      case 'game_concept':
        return 'bg-purple-100 text-purple-800';
      case 'feature':
        return 'bg-blue-100 text-blue-800';
      case 'art_style':
        return 'bg-pink-100 text-pink-800';
      case 'mechanics':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryText = (category: string | null) => {
    switch (category) {
      case 'game_concept':
        return 'Game Concept';
      case 'feature':
        return 'Feature';
      case 'art_style':
        return 'Art Style';
      case 'mechanics':
        return 'Mechanics';
      default:
        return 'Idea';
    }
  };

  const handleLike = async () => {
    if (onLike) {
      setIsLiked(!isLiked);
      setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
      onLike(idea.id);
    }
  };

  const tags = parseTags(idea.tags);

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
      {/* Header */}
      <div className="p-6 pb-4">
        {/* Category Badge */}
        <div className="flex items-center justify-between mb-4">
          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(idea.category)}`}>
            {getCategoryIcon(idea.category)}
            {getCategoryText(idea.category)}
          </span>
          <div className="text-xs text-gray-500">
            {new Date(idea.created_at).toLocaleDateString()}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
          {idea.title}
        </h3>

        {/* Creator Info */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
            {idea.creator.avatar ? (
              <img
                src={idea.creator.avatar}
                alt={idea.creator.name}
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <span className="text-sm font-medium text-gray-600">
                {idea.creator.name.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
          <div>
            <Link href={`/profile/${idea.creator.username}`}>
              <span className="text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors">
                {idea.creator.name}
              </span>
            </Link>
            <div className="text-xs text-gray-500">@{idea.creator.username}</div>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-4">
          {idea.description}
        </p>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {tags.slice(0, 4).map((tag: string, index: number) => (
              <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs">
                #{tag}
              </span>
            ))}
            {tags.length > 4 && (
              <span className="text-gray-500 text-xs">+{tags.length - 4} more</span>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
        <div className="flex items-center justify-between">
          {/* Like Button */}
          <button
            onClick={handleLike}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              isLiked
                ? 'bg-red-100 text-red-700 hover:bg-red-200'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <svg
              className={`w-4 h-4 transition-colors ${isLiked ? 'text-red-600' : 'text-gray-500'}`}
              fill={isLiked ? 'currentColor' : 'none'}
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <span>{likesCount}</span>
          </button>

          {/* View Details Button */}
          <Link
            href={`/ideas/${idea.id}`}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            View Idea
          </Link>
        </div>
      </div>
    </div>
  );
};

export default IdeaCard; 