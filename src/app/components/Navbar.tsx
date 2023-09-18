import Link from 'next/link';

/**
 * This is the global navbar which would be available on all screens expect the login
 * @returns Global navbar
 */
export default function Navbar() {
  return (
    <div>
      <span>This is a demo navbar</span>
      <Link href={'/'}> Home </Link>
    </div>
  );
}
