"use client";

import { FC, useEffect, useState } from "react";
import Nav from "./components/header/index";
import DownloadButton from "./home/components/unduh";
import InfoGame from "./components/InfoGame/InfoGame";
import FiturGame from "./components/FiturGame/FiturGame";
import Karakter from "./components/Karakter/Karakter";
import ShootingStars from "./components/effects/bintangjatuh";

const Home: FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const opacity = Math.max(0, 1 - scrollY / 500);  // Mengurangi opacity saat scroll ke bawah

  return (
    <main className="w-screen overflow-x-hidden">
      <Nav />

      {/* Section 1: Home */}
      <section
        id="home"
        className="relative w-screen h-screen bg-[url('/images/base-bg-1.png')] bg-cover bg-center bg-no-repeat overflow-hidden"
      >

        <ShootingStars />

        {/* Layer Awan (Efek scroll dihapus) */}
        <img
          src="/images/clouds.png"
          alt="Layer Awan"
          className="absolute top-0 left-0 w-screen h-screen object-cover pointer-events-none"
        />

        {/* Tombol Download */}
        <div
          className="flex justify-center items-center h-full pt-20 relative z-10"
          style={{
            opacity: opacity,  // Opacity berubah saat scroll
            transition: "opacity 0.3s ease-out",  // Transisi yang smooth
          }}
        >
          <DownloadButton
            imgSrc="/images/unduh.png"
            imgHoverSrc="/images/unduh-hover.png"
          />
        </div>
      </section>

      {/* Section 2: Info Game */}
      <InfoGame />

      {/* Section 3: Fitur Game */}
      <FiturGame />

      {/* Section 4: Karakter */}
      <Karakter />
    </main>
  );
};

export default Home;
