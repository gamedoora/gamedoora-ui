'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

export default function StudioPage() {
  const { data: session } = useSession();
  if (!session) {
    redirect(`/sign-in`);
  }
  const [ideaCards, setIdeaCards] = useState([
    {
      category: 'Gameplay Mechanics',
      title: 'Dynamic Weather System',
      description: 'Weather changes affect gameplay mechanics and NPC behavior in real-time.',
      creator: 'John Doe',
      creatorImage: '/default-avatar.png',
      bgColor: 'bg-yellow-100',
      badgeColor: 'bg-yellow-300 text-yellow-800',
    },
    {
      category: 'Story Concepts',
      title: 'Time-Traveling Detective',
      description: 'Solve crimes by jumping between different time periods.',
      creator: 'Sarah Wilson',
      creatorImage: '/default-avatar.png',
      bgColor: 'bg-blue-100',
      badgeColor: 'bg-blue-300 text-blue-800',
    },
    {
      category: 'Visual Style',
      title: 'Cel-Shaded Art Style',
      description: 'Use a unique, vibrant cel-shading style for the game visuals.',
      creator: 'Alex Smith',
      creatorImage: '/default-avatar.png',
      bgColor: 'bg-green-100',
      badgeColor: 'bg-green-300 text-green-800',
    },
  ]);

  // Add a new idea card dynamically (example function)
  const handleAddIdea = () => {
    const newCard = {
      category: 'Sound Design',
      title: 'Immersive Ambient Sounds',
      description: 'Use real-world soundscapes to create an immersive game experience.',
      creator: 'New Creator',
      creatorImage: '/default-avatar.png',
      bgColor: 'bg-purple-100',
      badgeColor: 'bg-purple-300 text-purple-800',
    };
    setIdeaCards((prevCards) => [...prevCards, newCard]);
  };

  return (
    <div className="min-h-screen py-8 px-4 bg-gray-100">
      {/* Idea Parking Lot */}
      <div className="max-w-screen-xl mx-auto mt-8">
        {/* Filter Tabs */}
        <div className="flex gap-4 mb-6">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-400">
            All Ideas
          </button>
          <button className="px-4 py-2 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300">
            Gameplay Mechanics
          </button>
          <button className="px-4 py-2 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300">
            Story Concepts
          </button>
          <button className="px-4 py-2 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300">
            Visual Style
          </button>
          <button className="px-4 py-2 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300">
            Sound Design
          </button>
        </div>

        {/* Idea Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ideaCards.map((idea, index) => (
            <div
              key={index}
              className={`p-6 ${idea.bgColor} rounded-lg shadow`}
            >
              <span
                className={`text-sm ${idea.badgeColor} px-3 py-1 rounded-full`}
              >
                {idea.category}
              </span>
              <h3 className="text-lg font-bold mt-2">{idea.title}</h3>
              <p className="text-gray-600 mt-2">{idea.description}</p>
              <div className="flex items-center gap-2 mt-4">
                <Image
                  src={idea.creatorImage}
                  alt="User Avatar"
                  width={24}
                  height={24}
                  className="rounded-full"
                />
                <span className="text-sm text-gray-600">
                  {idea.creator}
                </span>
              </div>
            </div>
          ))}

          {/* Add New Idea Card */}
          <div
            className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg text-gray-400 cursor-pointer"
            onClick={handleAddIdea}
          >
            <button className="w-12 h-12 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center hover:bg-gray-300">
              +
            </button>
            <p className="mt-2">Add New Idea</p>
          </div>
        </div>
      </div>
    </div>
  );
}
