'use client';
import { useState } from 'react';
import { Press_Start_2P } from 'next/font/google';

const pressStart = Press_Start_2P({ 
  subsets: ['latin'], 
  weight: '400'
});

const images = [
  '/images/preview-game.jpg',
  '/images/preview-game-2.jpg',
  '/images/preview-game-3.jpg'
];

export default function FiturGameSection() {
  const [index, setIndex] = useState(0);

  const nextImage = () => setIndex((prev) => (prev + 1) % images.length);
  const prevImage = () => setIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <section
      id="fitur-game"
      className="min-h-screen text-white px-4 py-12 flex items-center justify-center"
      style={{
        backgroundImage: 'url("/images/UI-6.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8">
        {/* KIRI: TEKS */}
        <div className="md:w-1/2 text-center md:text-left">
          <h2 className={`text-4xl font-bold mb-4 ${pressStart.className}`}>
            Fitur Game
          </h2>
          <p className={`text-gray-300 ${pressStart.className}`}>
            Fitur2 yang ada di game
          </p>
        </div>

        {/* KANAN: GAMBAR / ILUSTRASI */}
        <div className="md:w-1/2 flex flex-col items-center">
          <img 
            src={images[index]} 
            alt={`Preview ${index + 1}`} 
            className="w-full h-auto rounded-lg shadow-lg"
          />
          <div className="flex gap-4 mt-4">
            <button 
              onClick={prevImage} 
              className="bg-white/10 hover:bg-white/20 px-3 py-1 rounded"
            >
              ←
            </button>
            <button 
              onClick={nextImage} 
              className="bg-white/10 hover:bg-white/20 px-3 py-1 rounded"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
