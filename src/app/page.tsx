import Link from "next/link";

export default function Home() {
  return (
    <main>
      <Link href={'/login'} className="text-[32px]">Goto login</Link>
    </main>
  );
}
