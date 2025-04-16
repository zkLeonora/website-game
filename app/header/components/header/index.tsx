'use client';

import Link from 'next/link';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-transparent backdrop-blur-md border-b border-white/10 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <h1 className="text-white text-xl font-bold">FireLink Knight</h1>
        <nav className="space-x-6 text-white">
          <Link href="/">Home</Link>
          <Link href="/games">Games</Link>
          <Link href="/about">About</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
