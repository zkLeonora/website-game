'use client';

import { useState, useEffect } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';

const Nav = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState<{ id: number, username: string } | null>(null);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  useEffect(() => {
    if (showMessageModal && user) {
      const fetchMessages = async () => {
        try {
          const res = await fetch(`/api/users/messages?user_id=${user.id}`);
          const data = await res.json();
          setMessages(data);
        } catch (error) {
          console.error("Gagal mengambil pesan:", error);
        }
      };
      fetchMessages();
    }
  }, [showMessageModal, user]);

  return (
    <>
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
            <a href="#preview" className="px-4 py-2 rounded-full hover:bg-white/20 transition">Preview</a>

            {!isScrolled && (
              <div className="relative group p-2 hover:bg-white/20 rounded-full">
                <FaUserCircle className="text-2xl cursor-pointer hover:text-white/80" />
                <div className="absolute right-0 mt-2 hidden group-hover:block bg-white text-black rounded-lg shadow-lg py-2 px-4 text-sm w-40 z-50 transition-all ease-in-out duration-300 transform scale-95 group-hover:scale-100">
                  {user ? (
                    <>
                      <span className="block py-1 font-bold">{user.username}</span>
                      <button
                        onClick={() => setShowMessageModal(true)}
                        className="block w-full text-left py-1 hover:text-blue-600"
                      >
                        Pesan
                      </button>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left py-1 hover:text-red-600"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link href="/login" className="block py-1 hover:text-[#0B3775]">Login</Link>
                      <Link href="/signup" className="block py-1 hover:text-[#0B3775]">Daftar</Link>
                    </>
                  )}
                </div>
              </div>
            )}
          </nav>
        </div>
      </header>

      {showMessageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white text-black p-6 rounded-lg shadow-lg w-96 max-h-[80vh] overflow-y-auto">
            <h3 className="text-xl font-semibold mb-4">Pesan dari Admin</h3>
            {messages.length > 0 ? (
              messages.map((msg, i) => (
                <div key={i} className="border-b border-gray-300 mb-3 pb-2">
                  <p className="text-sm font-semibold">{msg.subjek}</p>
                  <p className="text-sm">{msg.pesan}</p>
                  <p className="text-xs text-gray-500">{new Date(msg.created_at).toLocaleString()}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-600">Tidak ada pesan.</p>
            )}
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setShowMessageModal(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Nav;
