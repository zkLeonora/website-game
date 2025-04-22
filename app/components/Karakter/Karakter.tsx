'use client';
import { Press_Start_2P } from 'next/font/google'

const pressStart = Press_Start_2P({ 
  subsets: ['latin'], 
  weight: '400'
});

export default function InfoGameSection() {
  return (
    <section
      id="karakter"
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
        <div className="md:w-1/2">
          <img 
            src="/images/mc-1.png" 
            alt="Leyndell Preview" 
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}
