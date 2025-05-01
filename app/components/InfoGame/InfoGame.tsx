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
          setIsVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.2 }
    );

    const target = document.querySelector('#info-game');
    if (target) observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
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
          className={`text-4xl font-bold mb-8 text-center ${pressStart.className}`}
          style={{ marginTop: '4rem' }}
        >
          Tentang Game
        </h2>

        <div
          className={`transition-all duration-700 ease-out transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          } ${pressStart.className}`}
        >
          <div className="bg-[#0c1c6f] border border-white rounded-lg px-6 py-5 shadow-xl max-w-3xl mx-auto text-xs sm:text-sm leading-relaxed">
            <p className="mb-4">
              Dunia ini telah diliputi kegelapan. Monster dan makhluk asing menguasai dungeon yang terlupakan. Tapi harapan belum padam.
            </p>
            <p className="mb-4">
              Kamu, seorang petualang misterius, bangkit dari reruntuhan untuk menantang takdir dan membangkitkan cahaya yang telah lama hilang.
            </p>
            <p>
              Kumpulkan item langka, kalahkan bos berbahaya, dan buktikan bahwa legenda tidak pernah mati!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
