'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { redirect } from 'next/navigation';

const gameDevFeed = [
  {
    id: '1',
    author: 'Alex Chen',
    studio: 'PixelForge Studios',
    title: 'Mystic Realms Alpha Release',
    description:
      'Excited to announce the alpha release of Mystic Realms! Our fantasy RPG is now playable. Looking for feedback from the community on combat mechanics and world design.',
    tags: ['Unity', 'RPG', 'Fantasy', 'Alpha'],
    date: '2 hours ago',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=400&fit=crop',
    type: 'project_update',
    comments: [
      { author: 'Sara Lee', text: 'The combat system feels really smooth! Love the magic mechanics.' },
      { author: 'James Clark', text: 'Amazing world design! The forest areas are breathtaking.' },
    ],
  },
  {
    id: '2',
    author: 'Maria Rodriguez',
    studio: null,
    title: 'Looking for 2D Artist Collaborator',
    description:
      'Working on a cyberpunk platformer called "Cyber Runner" and need a talented 2D artist for character sprites and environment art. This is a revenue-sharing indie project.',
    tags: ['Collaboration', 'Cyberpunk', 'Godot', '2D Art'],
    date: '4 hours ago',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=400&fit=crop',
    type: 'collaboration',
    comments: [
      { author: 'Emma Wilson', text: 'I&rsquo;d love to help! Sending you my portfolio.' },
      { author: 'David Kim', text: 'This looks like an exciting project. Good luck!' },
    ],
  },
  {
    id: '3',
    author: 'Jordan Taylor',
    studio: 'Stellar Games',
    title: 'New Studio Formation: Stellar Games',
    description:
      'Proud to announce the formation of Stellar Games! We&rsquo;re a team of 4 passionate developers focusing on space exploration games. Our first project "Space Colony Builder" is in early development.',
    tags: ['Studio', 'Space', 'Strategy', 'Team'],
    date: '1 day ago',
    image: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=800&h=400&fit=crop',
    type: 'studio_announcement',
    comments: [
      { author: 'Lisa Chen', text: 'Congratulations! Can&rsquo;t wait to see what you create.' },
      { author: 'Mike Johnson', text: 'Space games are my favorite! Following your progress.' },
    ],
  },
  {
    id: '4',
    author: 'Casey Morgan',
    studio: null,
    title: 'Game Idea: Emotion-Based Difficulty Scaling',
    description:
      'What if games could detect player emotions and adjust difficulty accordingly? Using biometric feedback to create more personalized gaming experiences. Thoughts?',
    tags: ['Game Design', 'Innovation', 'AI', 'Biometrics'],
    date: '2 days ago',
    image: '',
    type: 'idea',
    comments: [
      { author: 'Alex Rivera', text: 'This is fascinating! Could revolutionize accessibility in gaming.' },
      { author: 'Sam Park', text: 'Privacy concerns aside, this could be amazing for adaptive gameplay.' },
    ],
  },
];

export default function Home() {
  const { data: session } = useSession();
  if (!session) {
    redirect('/sign-in');
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'project_update':
        return '🎮';
      case 'collaboration':
        return '🤝';
      case 'studio_announcement':
        return '🏢';
      case 'idea':
        return '💡';
      default:
        return '📝';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'project_update':
        return 'Project Update';
      case 'collaboration':
        return 'Looking for Collaborators';
      case 'studio_announcement':
        return 'Studio News';
      case 'idea':
        return 'Game Idea';
      default:
        return 'Post';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back to GameDoora!</h1>
        <p className="text-gray-600">Discover the latest from the game development community</p>
        
        {/* Quick Actions */}
        <div className="mt-6 flex flex-wrap gap-4">
          <Link
            href="/projects"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Browse Projects
          </Link>
          <Link
            href="/studios"
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Find Studios
          </Link>
          <Link
            href="/ideas"
            className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors"
          >
            Share Ideas
          </Link>
        </div>
      </div>

      {/* Feed Content */}
      <div className="max-w-4xl mx-auto space-y-6">
        {gameDevFeed.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                  {item.author.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{item.author}</h3>
                  {item.studio && (
                    <p className="text-sm text-gray-500">at {item.studio}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-lg">{getTypeIcon(item.type)}</span>
                <span className="text-sm text-gray-500">{getTypeLabel(item.type)}</span>
              </div>
            </div>

            {/* Content */}
            <h2 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h2>
            <p className="text-gray-600 mb-4">{item.description}</p>

            {/* Image */}
            {item.image && (
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
            )}

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {item.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-blue-100 text-blue-700 text-xs font-medium py-1 px-3 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-6 text-sm text-gray-500 mb-4 pb-4 border-b border-gray-100">
              <button className="flex items-center gap-2 text-blue-500 hover:text-blue-600 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                Like
              </button>
              <button className="flex items-center gap-2 text-blue-500 hover:text-blue-600 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Comment ({item.comments.length})
              </button>
              <button className="flex items-center gap-2 text-blue-500 hover:text-blue-600 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
                Share
              </button>
              <span className="text-gray-400 ml-auto">{item.date}</span>
            </div>

            {/* Comments */}
            {item.comments.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-gray-900">Comments</h4>
                {item.comments.map((comment, idx) => (
                  <div key={idx} className="flex space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {comment.author.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{comment.author}</p>
                      <p className="text-sm text-gray-600">{comment.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="max-w-4xl mx-auto mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Share Your Game Development Journey?</h2>
        <p className="mb-6">Join the conversation, showcase your projects, and connect with fellow game developers.</p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/projects"
            className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Create Project
          </Link>
          <Link
            href="/studios"
            className="bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
          >
            Start Studio
          </Link>
        </div>
      </div>
    </div>
  );
}
