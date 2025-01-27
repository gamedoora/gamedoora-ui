'use client';

import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import HomeIcon from '@mui/icons-material/Home';
import BusinessIcon from '@mui/icons-material/Business';
import AssignmentIcon from '@mui/icons-material/Assignment';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import InventoryIcon from '@mui/icons-material/Inventory';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import { useState } from 'react';
import { useSession } from 'next-auth/react';

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, status } = useSession();

  const links = [
    { name: 'Home', href: '/', icon: <HomeIcon className="mr-2" /> },
    {
      name: 'Studio',
      href: '/studio',
      icon: <BusinessIcon className="mr-2" />,
    },
    {
      name: 'Projects',
      href: '/projects',
      icon: <AssignmentIcon className="mr-2" />,
    },
    { name: 'Ideas', href: '/ideas', icon: <LightbulbIcon className="mr-2" /> },
    {
      name: 'Assets',
      href: '/#',
      icon: <InventoryIcon className="mr-2" />,
    },
    {
      name: 'Market',
      href: '/#',
      icon: <ShoppingCartIcon className="mr-2" />,
    },
  ];

  return (
    <aside className='h-[100dvh] sticky top-0'>
      {/* Mobile Menu Toggle */}
      {!isOpen && (
        <button
          className="lg:hidden p-2 fixed top-4 left-4 z-20 bg-white shadow rounded-lg"
          onClick={() => setIsOpen(!isOpen)}
        >
          <MenuIcon />
        </button>
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:static top-0 left-0 z-10 h-full w-64 bg-white shadow-lg p-6 transform transition-transform duration-300 ease-in-out flex flex-col 
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
      >
        {/* Logo Section */}
        <Link
          href="/"
          className="flex items-center text-4xl font-bold text-gray-700 mb-8"
        >
          <Image src="/gamedoora.png" alt="Gamedoora" width={50} height={50} />
          <span className="ml-2 text-2xl font-semibold">Gamedoora</span>
        </Link>

        {/* Navigation Links */}
        <ul className="space-y-4 flex-1">
          {links.map((link) => (
            <li
              key={link.name}
              className={`flex items-center text-lg px-2 py-2 rounded-lg 
                ${
                  pathname === link.href
                    ? 'bg-gray-100 text-gray-900 font-medium'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
            >
              {link.icon}
              <Link href={link.href} className="w-full">
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* User Profile Section */}
        <div className="flex items-center border-t pt-4 mt-4">
          <PersonIcon />
          <div className="ml-3">
            <p className="text-gray-800 font-medium">{session?.user?.name}</p>
            <p className="text-gray-500 text-sm">{session?.user?.email}</p>
          </div>
        </div>
      </div>

      {/* Overlay for Mobile Menu */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-0 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </aside>
  );
}
