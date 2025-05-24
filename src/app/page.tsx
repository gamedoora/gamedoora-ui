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
              The premier platform for game developers to showcase their work, connect with others, 
              and build the future of gaming together.
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
            Discover Amazing Game Developers
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Sample Profiles */}
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  JD
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">John Doe</h3>
                  <p className="text-gray-600">@john_doe</p>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    ✓ Verified
                  </span>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                Experienced game developer specializing in Unity 3D and Unreal Engine development.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">Unity 3D</span>
                <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">Unreal Engine</span>
                <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">Game Design</span>
              </div>
              <Link 
                href="/profile/john_doe" 
                className="text-blue-600 hover:text-blue-800 font-semibold"
              >
                View Profile →
              </Link>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-pink-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  JS
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Jane Smith</h3>
                  <p className="text-gray-600">@jane_smith</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                Indie game developer and artist creating beautiful pixel art games and interactive experiences.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">Pixel Art</span>
                <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">Unity 2D</span>
                <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">Animation</span>
              </div>
              <Link 
                href="/profile/jane_smith" 
                className="text-blue-600 hover:text-blue-800 font-semibold"
              >
                View Profile →
              </Link>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-blue-600 text-white py-16">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h2 className="text-3xl font-bold mb-4">Ready to Join the Community?</h2>
            <p className="text-xl mb-8 text-blue-100">
              Connect with game developers, showcase your projects, and build the future of gaming.
            </p>
            <Link 
              href="/sign-up" 
              className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Get Started Today
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return null;
} 