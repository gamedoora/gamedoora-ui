'use client';

import { Navigation } from '@/components/Navigation';

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {children}
      </main>
    </>
  );
}
