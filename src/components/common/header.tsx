import React from 'react';
import Link from 'next/link';
import Image from 'next/image'

const Header: React.FC = () => {
  return (
    <header>
      <div className="bg-base-600 border border-base-700 rounded-lg mt-8 container mx-auto z-50 shadow-md px-8 py-4 flex justify-between items-center">
        {/* Logo Section */}
        <Link href='/' className="flex items-center">
          <Image
            src="/logo.svg"
            alt="Logo"
            className="h-10 w-auto"
            width={100}
            height={50}
          />
          
        </Link>

        {/* Menu Section */}
        <nav className="flex space-x-8">
          <Link href="/characters/list">Characters
          </Link>
          <Link href="/comics"  className="text-foreground font-medium">
            Comics
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
