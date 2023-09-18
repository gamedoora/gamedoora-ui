'use client';
import { signOut, useSession, signIn } from 'next-auth/react';

export default function AuthButton() {
  const { data: session } = useSession();
  if (session) {
    return (
      <button
        className="w-28 px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
        onClick={() => signOut()}
      >
        Sign Out
      </button>
    );
  }
  return (
    <button
      className="w-24 px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
      onClick={() => signIn()}
    >
      Sign In
    </button>
  );
}
