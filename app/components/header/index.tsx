'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link'; // Import Link

const Nav = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100); // Ganti angka 100 sesuai titik scroll yang kamu inginkan
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-transparent transition-all duration-300">
      <div className={`w-full px-3 md:px-6 py-3 flex items-center transition-all duration-500 ${
          isScrolled ? 'justify-center' : 'justify-between'
        }`}>
        
        {/* Link ke halaman Home */}
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
            isScrolled ? 'mx-auto flex gap-6 justify-center' : 'flex gap-4'
          }`}
        >
          <a href="#home" className="px-4 py-2 rounded-full hover:bg-white/20 transition">
            Home
          </a>
          <a href="#info-game" className="px-4 py-2 rounded-full hover:bg-white/20 transition">
            Info Game
          </a>
          <a href="#fitur-game" className="px-4 py-2 rounded-full hover:bg-white/20 transition">
            Fitur Game
          </a>
          <a href="#karakter" className="px-4 py-2 rounded-full hover:bg-white/20 transition">
            Karakter
          </a>
          <a href="#akun" className="px-4 py-2 rounded-full hover:bg-white/20 transition">
            Akun
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Nav;
