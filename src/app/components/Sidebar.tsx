import Image from 'next/image';
import Link from 'next/link';

export default function Sidebar() {
  return (
    <aside className="bg-white w-64 p-6 shadow h-[100vh]">
      <Link
        href={'/'}
        className="flex items-center text-4xl font-bold text-center text-gray-700"
      >
        <Image src="/gamedoora.png" alt="Gamedoora" width={50} height={50} />
        <span className="ml-2 text-2xl font-semibold">Gamedoora</span>
      </Link>
      <ul className="space-y-2 mt-12">
        <li>
          <Link href={'/'}>Home </Link>
        </li>
        <li>
          <Link href={'/settings'}>Settings </Link>
        </li>
      </ul>
    </aside>
  );
}
