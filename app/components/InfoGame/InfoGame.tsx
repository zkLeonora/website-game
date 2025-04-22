'use client';
import { Press_Start_2P } from 'next/font/google'

const pressStart = Press_Start_2P({ 
  subsets: ['latin'], 
  weight: '400' // Menambahkan properti weight
});

export default function InfoGameSection() {
  return (
    <section
      id="info-game"
      className="min-h-screen text-white px-4 py-12"
      style={{
        backgroundImage: 'url("/images/UI-8.png")',
        backgroundSize: 'full',
        backgroundPosition: 'center',
      }}
    >
<div className="max-w-6xl mx-auto">
  <h2 className={`text-4xl font-bold mb-4 text-center ${pressStart.className}`}>
    Apa itu 
  </h2>

  {/* Tambahkan logo di sini */}
  <div className="flex justify-center mb-6">
    <img src="/images/logo.png" alt="Logo Game" className="h-20" />
  </div>

  <p className={`text-gray-300 text-center ${pressStart.className}`}>
    deskripsi game di sini
  </p>
</div>

    </section>
  );
}
