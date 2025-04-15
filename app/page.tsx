// components/DownloadButton.tsx
import Image from "next/image";
import DownloadButton from "./home/components/unduh";

export default function Home() {
  return (
    <div className="w-screen h-screen bg-[url('/images/base-bg.jpg')] bg-cover bg-center bg-no-repeat">
      <div className="flex justify-center items-center h-screen">
        <DownloadButton
          imgSrc="/images/unduh.png"
          imgHoverSrc="/images/unduh-2.png"
        />
      </div>
    </div>
  );
}