'use client';
import Link from 'next/link';
import AuthButton from './AuthButton';
import { useSession } from 'next-auth/react';
/**
 * This is the global navbar which would be available on all screens expect the login
 * @returns Global navbar
 */
export default function Navbar() {
  const { data: session } = useSession();
  return (
    <div>
      <nav className="bg-white p-4 shadow">
        <div className="mx-auto flex justify-between items-center">
          <div></div>
          <div className="space-x-4">
            <Link href={`/profile/${session?.user?.name}`}>Profile </Link>
            <AuthButton />
          </div>
        </div>
      </nav>
    </div>
  );
}
