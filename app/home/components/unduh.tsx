// components/DownloadButton.tsx
import Image from "next/image";

interface ButtonProps {
  imgSrc: string;
  imgHoverSrc: string;
  width?: string;
  height?: string;
}

const DownloadButton: React.FC<ButtonProps> = ({
  imgSrc,
  imgHoverSrc,
  width = "300px",
  height = "120px",
}) => {
  return (
    <a className="relative group block" style={{ width, height }}>
      <img
        src={imgSrc}
        className="block group-hover:hidden absolute inset-0 w-full h-full object-contain"
        alt="Unduh"
      />
      <img
        src={imgHoverSrc}
        className="hidden group-hover:block absolute inset-0 w-full h-full object-contain"
        alt="Unduh Hover"
      />
    </a>
  );
};

export default DownloadButton;
