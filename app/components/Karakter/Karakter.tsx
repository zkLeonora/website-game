'use client';
import { Press_Start_2P } from 'next/font/google'
import Image from 'next/image'

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
        backgroundImage: 'url("/images/UI-7.png")',
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
              Mau terjun langsung ke medan pertempuran, mendukung rekan timmu, atau di antara keduanya, semua bisa kamu lakukan di Rift.
          </p>
        </div>

        {/* KANAN: ILUSTRASI */}
        <div className="md:w-1/2 flex justify-center items-center">
          <div className="relative w-[400px] h-[400px]">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] 
                border-[3px] border-white rounded-full z-10">
            </div>
            <Image 
              src="/images/mc-1.png" 
              alt="Karakter Preview" 
              fill
              className="object-contain rounded-lg z-0 relative"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
