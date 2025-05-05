'use client';

import { useEffect, useState } from 'react';
import { Press_Start_2P } from 'next/font/google';

const pressStart = Press_Start_2P({
  subsets: ['latin'],
  weight: '400',
});

const fullText = [
  "Dunia ini telah diliputi kegelapan. Monster dan makhluk asing menguasai dungeon yang terlupakan. Tapi harapan belum padam.",
  "Kamu, seorang petualang misterius, bangkit dari reruntuhan untuk menantang takdir dan membangkitkan cahaya yang telah lama hilang.",
  "Kumpulkan item langka, kalahkan bos berbahaya, dan buktikan bahwa legenda tidak pernah mati!"
];

export default function InfoGameSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [typedText, setTypedText] = useState(["", "", ""]);
  const [currentParagraph, setCurrentParagraph] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [cursorVisible, setCursorVisible] = useState(true);

  // Observer trigger
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setIsVisible(true);
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

  // Efek typing menggunakan recursive timeout
  useEffect(() => {
    if (!isVisible || currentParagraph >= fullText.length) return;

    if (currentChar < fullText[currentParagraph].length) {
      const timeout = setTimeout(() => {
        setTypedText((prev) => {
          const updated = [...prev];
          updated[currentParagraph] += fullText[currentParagraph][currentChar];
          return updated;
        });
        setCurrentChar((prev) => prev + 1);
      }, 25);
      return () => clearTimeout(timeout);
    } else {
      // Jika selesai satu paragraf, lanjut ke berikutnya
      if (currentParagraph < fullText.length - 1) {
        const delay = setTimeout(() => {
          setCurrentParagraph((prev) => prev + 1);
          setCurrentChar(0);
        }, 500); // jeda antar paragraf
        return () => clearTimeout(delay);
      }
    }
  }, [isVisible, currentChar, currentParagraph]);

  // Cursor berkedip
  useEffect(() => {
    const blink = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 500);
    return () => clearInterval(blink);
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
          style={{ marginTop: '6rem' }}
        >
          Tentang Game
        </h2>

        <div
          className={`transition-all duration-700 ease-out transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          } ${pressStart.className}`}
        >
          <div className="bg-[#0c1c6f] border border-white rounded-lg px-6 py-5 shadow-xl max-w-3xl mx-auto text-xs sm:text-sm leading-relaxed mt-40 whitespace-pre-wrap min-h-[280px]">
            {typedText.map((paragraph, i) => (
              <p className="mb-4" key={i}>
                {paragraph}
                {i === currentParagraph && cursorVisible && <span className="animate-blink">|</span>}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
