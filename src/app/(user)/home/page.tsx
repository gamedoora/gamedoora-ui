'use client';

import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { redirect } from 'next/navigation';

const feed = [
  {
    id: '1',
    author: 'John Doe',
    title: 'Launched a New Open Source Project',
    description:
      'Excited to share my new open-source project on GitHub that simplifies state management in React. Check it out and give it a star if you find it helpful!',
    tags: ['React', 'Open Source', 'GitHub'],
    date: '2 hours ago',
    image:
      'https://burst.shopifycdn.com/photos/man-controls-all-video-games.jpg?width=925&format=pjpg&exif=0&iptc=0', // Image from Unsplash
    comments: [
      { author: 'Sara Lee', text: 'This looks awesome! Will check it out.' },
      {
        author: 'James Clark',
        text: 'Great initiative! Will definitely contribute.',
      },
    ],
  },
  {
    id: '2',
    author: 'Jane Smith',
    title: 'My Latest Blog Post',
    description:
      'Just published my thoughts on "The Future of AI in Software Development." Would love to hear your thoughts!',
    tags: ['AI', 'Blog', 'Technology'],
    date: '5 hours ago',
    image:
      'https://burst.shopifycdn.com/photos/man-controls-all-video-games.jpg?width=925&format=pjpg&exif=0&iptc=0', // Image from Unsplash
    comments: [
      {
        author: 'Anna White',
        text: 'AI is really shaping the future! Excited to read your blog.',
      },
      {
        author: 'Tom Green',
        text: 'Can’t wait to dive into this. Great topic!',
      },
    ],
  },
  {
    id: '3',
    author: 'Alex Johnson',
    title: 'Product Launch: TaskFlow',
    description:
      'Proud to announce the launch of TaskFlow, a task management tool designed for developers. Your feedback means the world to us!',
    tags: ['Product', 'Task Management', 'Launch'],
    date: '1 day ago',
    image: '', // No image for this post
    comments: [
      {
        author: 'Emily Black',
        text: 'This tool is exactly what I’ve been looking for! Great work.',
      },
    ],
  },
];

export default function Home() {
  const { data: session } = useSession();
  if (!session) {
    redirect('/sign-in');
  }
  return (
    <div className="min-h-screen py-8 px-4">
      {/* Dynamic Feed Content - Stacked Layout */}
      <div className="max-w-screen-xl mx-auto mt-8 space-y-6 mt-4">
        {feed.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
          >
            {/* Author and Title */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {item.author}
              </h3>
              <p className="text-sm text-gray-500">{item.date}</p>
            </div>

            {/* Title */}
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {item.title}
            </h2>

            {/* Description */}
            <p className="text-gray-600 mb-4">{item.description}</p>

            {/* Image (conditionally rendered) */}
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
                  className="bg-blue-100 text-blue-700 text-xs font-medium py-1 px-2 rounded"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
              <button className="flex items-center gap-1 text-blue-500 hover:text-blue-600">
                👍 Like
              </button>
              <button className="flex items-center gap-1 text-blue-500 hover:text-blue-600">
                💬 Comment ({item.comments.length})
              </button>
              <button className="flex items-center gap-1 text-blue-500 hover:text-blue-600">
                🔗 Share
              </button>
            </div>

            {/* Comments Section - Expanded */}
            <div className="mt-4">
              {item.comments.length > 0 && (
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    Comments:
                  </h4>
                  <div className="space-y-2">
                    {item.comments.map((comment, idx) => (
                      <div key={idx} className="border-t pt-2">
                        <p className="text-gray-800 font-semibold">
                          {comment.author}
                        </p>
                        <p className="text-gray-600">{comment.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
