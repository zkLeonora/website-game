'use client';

import { useEffect, useState } from 'react';
import { Press_Start_2P } from 'next/font/google';
import Image from 'next/image';

const pressStart = Press_Start_2P({
  subsets: ['latin'],
  weight: '400',
});

export default function InfoGameSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsFlipped(true); // Flip segera saat section muncul
          }
        });
      },
      { threshold: 0.3 }
    );

    const target = document.querySelector('#karakter');
    if (target) observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, []);

  return (
    <section
      id="karakter"
      className="min-h-screen text-white px-4 py-12 flex items-center justify-center"
      style={{
        backgroundImage: 'url("/images/UI-10.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-y-12 gap-x-20 py-24 px-6">
        {/* KIRI: TEKS */}
        <div className="md:w-1/2 text-center md:text-left space-y-6">
          <h2 className={`text-4xl font-bold mb-4 tracking-widest ${pressStart.className}`}>
            Karakter
          </h2>
          <p className={`text-gray-300 ${pressStart.className}`}>
            Mau terjun langsung ke medan pertempuran, mendukung rekan timmu, atau di antara keduanya, semua bisa kamu lakukan di Leyndell.
          </p>
        </div>

        {/* KANAN: KARTU */}
        <div className="md:w-1/2 flex justify-center items-center">
          <div className="relative w-[400px] h-[400px] [perspective:1000px]">
            <div
              className={`relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] ${
                isFlipped ? 'rotate-y-180' : ''
              }`}
            >
              {/* Sisi Belakang */}
              <div className="absolute w-full h-full rounded-lg overflow-hidden [backface-visibility:hidden]">
                <Image
                  src="/images/kartu-belakang.png"
                  alt="Kartu Belakang"
                  fill
                  className="object-contain"
                />
              </div>

              {/* Sisi Depan */}
              <div className="absolute w-full h-full rounded-lg overflow-hidden rotate-y-180 [backface-visibility:hidden]">
                <Image
                  src="/images/kartu-karakter-1.png"
                  alt="Kartu Depan"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
