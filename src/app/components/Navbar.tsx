'use client';
import Link from 'next/link';
import AuthButton from './AuthButton';

/**
 * This is the global navbar which would be available on all screens expect the login
 * @returns Global navbar
 */
export default function Navbar() {
  return (
    <div>
      <nav className="bg-white p-4 shadow">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="space-x-4">
            <Link href={'/profile/hybridx'}>Profile </Link>
            <AuthButton />
          </div>
        </div>
      </nav>
    </div>
  );
}
