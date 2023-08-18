import Link from 'next/link';

export default function Home() {
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
    </main>
  );
}
