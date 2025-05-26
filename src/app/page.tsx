'use client';

import { useSession } from 'next-auth/react';
import { useAuth } from '@/context/AuthContext';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function HomePage() {
  const { data: session } = useSession();
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Redirect authenticated users to home feed
    if (!loading && (isAuthenticated || session)) {
      router.push('/home');
    }
  }, [isAuthenticated, loading, session, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Show landing page for non-authenticated users
  if (!isAuthenticated && !session) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Welcome to <span className="text-blue-600">GameDoora</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              The collaborative platform where game makers, developers, designers, and enthusiasts 
              come together to create, connect, and build amazing games.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/sign-up" 
                className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Join GameDoora
              </Link>
              <Link 
                href="/sign-in" 
                className="px-8 py-3 bg-white text-blue-600 border border-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Create, Collaborate, and Connect
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Projects Feature */}
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Showcase Projects</h3>
              <p className="text-gray-600 mb-4">
                Share your game projects, get feedback, and find collaborators. From indie gems to AAA concepts.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">Unity</span>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Unreal</span>
                <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">Godot</span>
              </div>
            </div>

            {/* Studios Feature */}
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Form Studios</h3>
              <p className="text-gray-600 mb-4">
                Create or join game development studios. Build teams, manage projects, and grow together.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">Team Building</span>
                <span className="bg-pink-100 text-pink-800 px-2 py-1 rounded text-xs">Collaboration</span>
              </div>
            </div>

            {/* Ideas Feature */}
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-yellow-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Share Ideas</h3>
              <p className="text-gray-600 mb-4">
                Got a brilliant game concept? Share it with the community, get feedback, and find people to bring it to life.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">Innovation</span>
                <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs">Creativity</span>
              </div>
            </div>
          </div>
        </div>

        {/* Success Stories Section */}
        <div className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Success Stories
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                    PF
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">PixelForge Studios</h3>
                    <p className="text-gray-600">5 members • 3 active projects</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">
                  &ldquo;Started as a simple idea shared on GameDoora. Now we&rsquo;re a thriving studio with multiple successful game releases!&rdquo;
                </p>
                <div className="flex gap-2">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">Fantasy RPG</span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Unity</span>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                    CR
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Cyber Runner</h3>
                    <p className="text-gray-600">Solo project • 10k+ downloads</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">
                  &ldquo;Found amazing collaborators through GameDoora who helped bring my cyberpunk vision to life. The community feedback was invaluable!&rdquo;
                </p>
                <div className="flex gap-2">
                  <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">Cyberpunk</span>
                  <span className="bg-pink-100 text-pink-800 px-2 py-1 rounded text-xs">Godot</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-blue-600 text-white py-16">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h2 className="text-3xl font-bold mb-4">Ready to Build the Future of Gaming?</h2>
            <p className="text-xl mb-8 text-blue-100">
              Whether you&rsquo;re a developer, designer, artist, or just passionate about games - there&rsquo;s a place for you here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/sign-up" 
                className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Start Creating Today
              </Link>
              <Link 
                href="/projects" 
                className="px-8 py-3 bg-blue-700 text-white border border-blue-500 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
              >
                Explore Projects
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
} 