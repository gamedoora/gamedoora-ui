import ReactQueryProvider from './components/ReactQueryProvider';
import './globals.css';
import { Inter } from 'next/font/google';
import { getServerSession } from 'next-auth';
import SessionProvider from './(auth)/components/SessionProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Welcome to Gamedoora',
  description: 'Gamedoora is here to revolutionize the gaming industry',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="bg-gray-100 min-h-screen w-screen">
          <SessionProvider>
            <ReactQueryProvider>
              <main>{children}</main>
            </ReactQueryProvider>
          </SessionProvider>
        </div>
      </body>
    </html>
  );
}
