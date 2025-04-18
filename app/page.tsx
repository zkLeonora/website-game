'use client';

import Image from "next/image";
import DownloadButton from "./home/components/unduh";
import Nav from "./components/header/index";

export default function Home() {
  return (
    <main className="w-screen overflow-x-hidden">
      <Nav />

      {/* Section 1: Home */}
      <section id="home" className="w-screen h-screen bg-[url('/images/base-bg-1.jpg')] bg-cover bg-center bg-no-repeat">
        <div className="flex justify-center items-center h-full pt-20">
          <DownloadButton
            imgSrc="/images/unduh.png"
            imgHoverSrc="/images/unduh-hover.png"
          />
        </div>
      </section>

      {/* Section 2: Info Game */}
      <section id="info-game" className="min-h-screen bg-black text-white flex items-center justify-center">
        <h2 className="text-4xl font-bold">Info Game</h2>
      </section>

      {/* Section 3: Karakter */}
      <section id="karakter" className="min-h-screen bg-gray-800 text-white flex items-center justify-center">
        <h2 className="text-4xl font-bold">Karakter</h2>
      </section>

      {/* Section 4: Akun */}
      <section id="akun" className="min-h-screen bg-gray-700 text-white flex items-center justify-center">
        <h2 className="text-4xl font-bold">Akun</h2>
      </section>
    </main>
  );
}
