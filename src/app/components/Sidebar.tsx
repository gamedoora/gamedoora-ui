import Link from "next/link";

export default function Sidebar() {
  return (
    <nav>
      <span>THis is a sidebar</span>
      <Link href="/"> Home </Link>
    </nav>
  );
}
