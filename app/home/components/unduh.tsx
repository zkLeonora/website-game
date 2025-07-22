'use client';

import { useEffect, useState } from 'react';

interface ButtonProps {
  imgSrc: string;
  imgHoverSrc: string;
  width?: string;
  height?: string;
}

const DownloadButton: React.FC<ButtonProps> = ({
  imgSrc,
  imgHoverSrc,
  width = '300px',
  height = '120px',
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100); // Delay fade-in
    return () => clearTimeout(timer);
  }, []);

  return (
    <a
      href="/transaksi"
      className={`relative group block transition-opacity duration-[2000ms] ease-out ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ width, height }}
    >
      <img
        src={imgSrc}
        alt="Unduh"
        className="absolute inset-0 w-full h-full object-contain group-hover:opacity-0 transition-opacity duration-700"
      />
      <img
        src={imgHoverSrc}
        alt="Unduh Hover"
        className="absolute inset-0 w-full h-full object-contain opacity-0 group-hover:opacity-100 transition-opacity duration-700"
      />
    </a>
  );
};

export default DownloadButton;
