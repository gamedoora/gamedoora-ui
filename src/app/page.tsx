'use client';

import { useFetchFeed } from '../../services/feed';
import { TFeed } from '../../services/feed/type';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';

export default function Home() {
  const { data, isError, isLoading } = useFetchFeed('hybridx');
  const { data: session } = useSession();
  if (!session) {
    redirect('/sign-in');
  }
  return (
    <main className="flex gap-2">
      <Sidebar />
      <div className="w-full">
        <Navbar />
        <div>
          <div className="p-2 m-2">The following is some feed data</div>
          {data?.feed.map((f: TFeed) => (
            <div className="p-4 m-4 bg-blue-200" key={f.id}>
              <p>{f.title}</p>
              <p>{f.author}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
