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
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
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
            Preview Game
          </h2>
          <p className={`text-gray-300 ${pressStart.className}`}>
            Saksikan cuplikan pertarungan seru, karakter unik, dan dunia Leyndell yang memikat dalam PV resmi kami!
          </p>
        </div>

        {/* KANAN: VIDEO */}
        <div className="md:w-1/2 flex justify-center items-center">
          {isVisible && (
            <video
              className="rounded-lg w-[400px] h-[400px] object-cover shadow-lg"
              controls
              autoPlay
              muted
              loop
            >
              <source src="/videos/preview.mp4" type="video/mp4" />
              Browsermu tidak mendukung tag video.
            </video>
          )}
        </div>
      </div>
    </section>
  );
}
