'use client';

import Link from 'next/link';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-transparent  border-b border-white/10 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <h1 className="text-orange text-xl font-bold">Leyndell</h1>
        <nav className="flex gap-4 text-white drop-shadow">
            <Link
                href="/"
                className="px-4 py-2 rounded-full hover:bg-white/20 transition"
                >
                Home
            </Link>
            <Link
                href="/games"
                className="px-4 py-2 rounded-full hover:bg-white/20 transition"
                >
                Games
            </Link>
            <Link
                href="/about"
                className="px-4 py-2 rounded-full hover:bg-white/20 transition"
                >
                About
            </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
