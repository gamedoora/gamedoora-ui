import ReactQueryProvider from './components/ReactQueryProvider';
import AuthContext from './context/AuthContext';
import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Welcome to Gamedoora',
  description: 'Gamedoora is here to revolutionize the gaming industry',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="bg-gray-100 min-h-screen w-screen">
          <AuthContext>
            <ReactQueryProvider>
              <main>{children}</main>
            </ReactQueryProvider>
          </AuthContext>
        </div>
      </body>
    </html>
  );
}
