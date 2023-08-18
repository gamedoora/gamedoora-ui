import Navbar from '@/app/components/Navbar';

export default function ProfileLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    slug: string;
  };
}) {
  return (
    <main>
      <Navbar />
      {children}
    </main>
  );
}
