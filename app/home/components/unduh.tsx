'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

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
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    const user = localStorage.getItem('user');
    if (user) {
      router.push('/transaksi');
    } else {
      router.push('/login');
    }
  };

  return (
    <button
      onClick={handleClick}
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
    </button>
  );
};

export default DownloadButton;
