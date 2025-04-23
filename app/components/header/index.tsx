'use client';

import { useState, useEffect } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';

const Nav = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-transparent transition-all duration-300">
      <div className={`w-full px-3 md:px-6 py-3 flex items-center transition-all duration-500 ${
          isScrolled ? 'justify-center' : 'justify-between'
        }`}>

        {!isScrolled && (
          <Link href="/" passHref>
            <Image
              src="/images/logo.png"
              alt="Leyndell Logo"
              width={200}
              height={50}
              className="object-contain"
            />
          </Link>
        )}

        <nav
          className={`text-white drop-shadow transition-all duration-500 ${
            isScrolled ? 'mx-auto flex gap-6 justify-center' : 'flex gap-4 items-center'
          }`}
        >
          <a href="#home" className="px-4 py-2 rounded-full hover:bg-white/20 transition">Home</a>
          <a href="#info-game" className="px-4 py-2 rounded-full hover:bg-white/20 transition">Info Game</a>
          <a href="#fitur-game" className="px-4 py-2 rounded-full hover:bg-white/20 transition">Fitur Game</a>
          <a href="#karakter" className="px-4 py-2 rounded-full hover:bg-white/20 transition">Karakter</a>

          {/* AKUN */}
          {!isScrolled && (
            <div className="relative group p-2 hover:bg-white/20 rounded-full">
              <FaUserCircle className="text-2xl cursor-pointer hover:text-white/80" />
              {/* Dropdown */}
              <div className="absolute right-0 mt-2 hidden group-hover:block bg-white text-black rounded-lg shadow-lg py-2 px-4 text-sm w-40 z-50 transition-all ease-in-out duration-300 transform scale-95 group-hover:scale-100">
                <Link href="/login" className="block py-1 hover:text-blue-900">Login</Link>
                <Link href="/signup" className="block py-1 hover:text-blue-900">Daftar</Link>
              </div>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Nav;
