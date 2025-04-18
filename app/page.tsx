'use client';

import Image from "next/image";
import DownloadButton from "./home/components/unduh";
import Header from "./components/header/index";

export default function Home() {
  return (
    <div className="w-screen h-screen bg-[url('/images/base-bg-1.jpg')] bg-cover bg-center bg-no-repeat">
      <Header />
      <div className="flex justify-center items-center h-screen pt-20"> {/* Tambahkan pt agar tidak ketimpa header */}
        <DownloadButton
          imgSrc="/images/unduh.png"
          imgHoverSrc="/images/unduh-hover.png"
        />
      </div>
    </div>
  );
}
