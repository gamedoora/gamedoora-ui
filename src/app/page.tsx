'use client';

import Link from 'next/link';
import { useFetchFeed } from '../../services/feed';
import { TFeed } from '../../services/feed/type';

export default function Home() {
  const { data, isError, isLoading } = useFetchFeed('hybridx');
  return (
    <main className="grid">
      <Link href={'/login'} className="text-[32px]">
        Goto login
      </Link>
      <Link href={'/sign-up'} className="text-[32px]">
        Goto Sign-up
      </Link>
      <Link href={'/profile/hybridx'} className="text-[32px]">
        Goto {`Hybridx's`} profile
      </Link>
      <div>The following is some feed data</div>
      <div>
        {data?.feed.map((f: TFeed) => (
          <div className='p-4 bg-blue-200 w-40' key={f.id}>
            <p>{f.title}</p>
            <p>{f.author}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
