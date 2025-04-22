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
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-y-12 gap-x-20 py-24 px-6">
    {/* KIRI: TEKS */}
    <div className="md:w-1/2 text-justify md:text-left space-y-6">
        <h2 className={`text-4xl font-bold mb-4 tracking-widest ${pressStart.className}`}>
            Fitur Game
          </h2>
        <p className={`text-gray-300 ${pressStart.className}`}>
        Mau terjun langsung ke medan pertempuran, mendukung rekan timmu, atau di antara keduanya, semua bisa kamu lakukan di Rift.
        </p>
    </div>

        {/* KANAN: GAMBAR / ILUSTRASI */}
        <div className="md:w-1/2 flex justify-center items-center">
            <div className="relative w-[400px] h-[400px]">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] 
                  border-[6px] border-white rounded-full z-10">
             </div>
                <img 
                src="/images/mc-1.png" 
                alt="Leyndell Preview" 
                className="w-full h-full object-contain rounded-lg z-0 relative"
                />
             </div>
        </div>
      </div>
    </section>
  );
}
