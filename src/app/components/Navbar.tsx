'use client';
import Link from 'next/link';
import AuthButton from './AuthButton';
import { useSession } from 'next-auth/react';
import { useAuth } from '@/context/AuthContext';
/**
 * This is the global navbar which would be available on all screens expect the login
 * @returns Global navbar
 */
export default function Navbar() {
  const { data: session } = useSession();
  const { user } = useAuth();
  
  // Generate profile URL based on user data
  const getProfileUrl = () => {
    if (user?.username) {
      return `/profile/${user.username}`;
    } else if (session?.user?.name) {
      const username = session.user.name.toLowerCase().replace(/\s+/g, '_');
      return `/profile/${username}`;
    }
    return '/profile/user';
  };

  return (
    <div>
      <nav className="bg-white p-4 shadow">
        <div className="mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-xl font-bold text-blue-600">
              GameDoora
            </Link>
            <Link href="/home" className="text-gray-700 hover:text-blue-600">
              Home
            </Link>
          </div>
          <div className="space-x-4">
            {(session || user) && (
              <Link href={getProfileUrl()} className="text-gray-700 hover:text-blue-600">
                Profile
              </Link>
            )}
            <AuthButton />
          </div>
        </div>
      </nav>
    </div>
  );
}
