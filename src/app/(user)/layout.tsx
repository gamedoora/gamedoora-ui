import Navbar from '@/app/components/Navbar';
import Sidebar from '@/app/components/Sidebar';

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
    <main className="flex">
      <Sidebar />
      <div className='w-full'>
        <Navbar />
        {children}
      </div>
    </main>
  );
}
