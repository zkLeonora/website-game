'use client';
import { useEffect, useState } from 'react';
import { Press_Start_2P } from 'next/font/google';

const pressStart = Press_Start_2P({
  subsets: ['latin'],
  weight: '400',
});

export default function InfoGameSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Membuat observer untuk mendeteksi apakah section berada di viewport
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        setIsVisible(entry.isIntersecting); // Mengubah state saat section terlihat
      });
    }, {
      threshold: 0.2, // Memastikan 20% dari section terlihat untuk memulai fade
    });

    const target = document.querySelector("#info-game"); // Menggunakan id info-game sebagai target
    if (target) {
      observer.observe(target);
    }

    return () => {
      if (target) {
        observer.unobserve(target); // Clean up observer
      }
    };
  }, []);

  return (
    <section
      id="info-game"
      className="min-h-screen text-white px-4 py-12"
      style={{
        backgroundImage: 'url("/images/info-game.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="max-w-6xl mx-auto">
        <h2
          className={`text-4xl font-bold mb-6 text-center ${pressStart.className}`}
          style={{ marginTop: '4rem' }}
        >
          Tentang Game
        </h2>

        {/* Kartu Animasi (Parent Div memiliki animasi fade) */}
        <div
          className={`flex justify-center transition-opacity duration-1500 ${ // Mengubah durasi fade-in
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="group w-70 h-96 [perspective:1000px]"> {/* Menyesuaikan ukuran kartu ke vertikal */}
            <div
              className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]"
            >
              {/* Bagian Belakang Kartu */}
              <div className="absolute w-full h-full bg-white rounded-xl overflow-hidden shadow-lg backface-hidden">
                <img
                  src="/images/kartu-belakang.png"
                  alt="Kartu Depan"
                  className="w-full h-full object-cover object-center"
                />
              </div>

              {/* Bagian Depan Kartu */}
              <div className="absolute w-full h-full bg-white rounded-xl overflow-hidden shadow-lg [transform:rotateY(180deg)] backface-hidden">
                <img
                  src="/images/kartu-depan.png"
                  alt="Kartu Belakang"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
