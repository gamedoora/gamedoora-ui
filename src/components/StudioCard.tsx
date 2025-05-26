'use client';

import React from 'react';
import Link from 'next/link';
import { Studio, User } from '@prisma/client';

interface StudioWithRelations extends Studio {
  owner: User;
  _count?: {
    members: number;
    projects: number;
  };
}

interface StudioCardProps {
  studio: StudioWithRelations;
}

const StudioCard: React.FC<StudioCardProps> = ({ studio }) => {
  const parseTags = (tags: string | null) => {
    if (!tags) return [];
    try {
      return JSON.parse(tags);
    } catch {
      return [];
    }
  };

  const tags = parseTags(studio.tags);

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
      {/* Studio Banner */}
      <div className="relative h-32 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 overflow-hidden">
        {studio.banner ? (
          <img
            src={studio.banner}
            alt={studio.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-white text-4xl font-bold opacity-30">
              {studio.name.charAt(0).toUpperCase()}
            </div>
          </div>
        )}
        
        {/* Privacy Badge */}
        <div className="absolute top-3 right-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            studio.isPublic 
              ? 'bg-green-100 text-green-800' 
              : 'bg-gray-100 text-gray-800'
          }`}>
            {studio.isPublic ? 'Public' : 'Private'}
          </span>
        </div>
      </div>

      {/* Studio Avatar & Info */}
      <div className="relative px-6 pt-6 pb-4">
        {/* Studio Avatar */}
        <div className="absolute -top-8 left-6">
          <div className="w-16 h-16 bg-white rounded-xl shadow-lg flex items-center justify-center border-4 border-white">
            {studio.avatar ? (
              <img
                src={studio.avatar}
                alt={studio.name}
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <span className="text-xl font-bold text-gray-600">
                {studio.name.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
        </div>

        {/* Studio Name and Description */}
        <div className="mt-10">
          <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
            {studio.name}
          </h3>
          
          {/* Owner Info */}
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
              {studio.owner.avatar ? (
                <img
                  src={studio.owner.avatar}
                  alt={studio.owner.name}
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <span className="text-xs font-medium text-gray-600">
                  {studio.owner.name.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
            <div>
              <Link href={`/profile/${studio.owner.username}`}>
                <span className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
                  {studio.owner.name}
                </span>
              </Link>
            </div>
            <span className="text-xs text-gray-500">• Owner</span>
          </div>

          {/* Description */}
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
            {studio.description || 'A creative game development studio building amazing experiences.'}
          </p>

          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-4">
              {tags.slice(0, 3).map((tag: string, index: number) => (
                <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-xs font-medium">
                  #{tag}
                </span>
              ))}
              {tags.length > 3 && (
                <span className="text-gray-500 text-xs">+{tags.length - 3} more</span>
              )}
            </div>
          )}

          {/* Stats */}
          <div className="flex items-center gap-6 mb-4">
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
              </svg>
              <span>{(studio._count?.members || 0) + 1} members</span>
            </div>
            
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1V8zm8 0a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1h-4a1 1 0 01-1-1V8zm0 4a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1h-4a1 1 0 01-1-1v-2z" clipRule="evenodd" />
              </svg>
              <span>{studio._count?.projects || 0} projects</span>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex gap-3 mb-4">
            {studio.website && (
              <Link
                href={studio.website}
                target="_blank"
                className="text-gray-500 hover:text-blue-600 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.559-.499-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.559.499.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.497-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clipRule="evenodd" />
                </svg>
              </Link>
            )}
            {studio.github && (
              <Link
                href={studio.github}
                target="_blank"
                className="text-gray-500 hover:text-gray-900 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                </svg>
              </Link>
            )}
            {studio.twitter && (
              <Link
                href={studio.twitter}
                target="_blank"
                className="text-gray-500 hover:text-blue-400 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </Link>
            )}
            {studio.discord && (
              <Link
                href={studio.discord}
                target="_blank"
                className="text-gray-500 hover:text-purple-600 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M16.942 6.478c-1.31-.608-2.714-1.053-4.19-1.31a.075.075 0 00-.08.036c-.18.32-.382.738-.522 1.067a15.732 15.732 0 00-4.7 0 10.384 10.384 0 00-.53-1.067.078.078 0 00-.08-.036c-1.476.257-2.88.702-4.19 1.31a.07.07 0 00-.032.027C.533 9.046-.32 11.533.099 13.974a.08.08 0 00.031.055 16.48 16.48 0 004.963 2.507.08.08 0 00.086-.028 11.84 11.84 0 001.021-1.658.074.074 0 00-.041-.103 10.84 10.84 0 01-1.549-.738.075.075 0 01-.007-.124c.104-.078.208-.159.307-.241a.077.077 0 01.08-.011c3.25 1.484 6.771 1.484 9.983 0a.077.077 0 01.08.01c.099.083.203.164.308.242a.075.075 0 01-.006.124c-.495.289-1.01.534-1.549.738a.075.075 0 00-.041.104c.289.567.618 1.102 1.021 1.658a.077.077 0 00.086.028 16.426 16.426 0 004.964-2.507.077.077 0 00.03-.054c.5-2.818-.838-5.269-3.549-7.436a.06.06 0 00-.031-.028zM6.678 12.157c-1.183 0-2.157-1.085-2.157-2.419s.956-2.419 2.157-2.419c1.21 0 2.175 1.094 2.157 2.419 0 1.334-.956 2.419-2.157 2.419zm6.644 0c-1.183 0-2.157-1.085-2.157-2.419s.956-2.419 2.157-2.419c1.21 0 2.175 1.094 2.157 2.419 0 1.334-.947 2.419-2.157 2.419z"/>
                </svg>
              </Link>
            )}
          </div>

          {/* Action Button */}
          <div className="pt-4 border-t border-gray-100">
            <Link
              href={`/studios/${studio.id}`}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-lg font-medium text-center block hover:from-blue-700 hover:to-purple-700 transition-colors"
            >
              View Studio
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudioCard; 