import { connectToDatabase } from "@/lib/db"; // Import koneksi dari lib/db
import { FC } from "react";
import Nav from "./components/header/index";
import DownloadButton from "./home/components/unduh";
import InfoGame from "./components/InfoGame/InfoGame";
import FiturGame from "./components/FiturGame/FiturGame";
import Karakter from "./components/Karakter/Karakter";

const Home: FC = async () => {
  try {
    // Tes koneksi dengan database
    await connectToDatabase();
    console.log("Database Connected!"); // Log status koneksi di terminal
  } catch (error) {
    console.error("Error connecting to the database:", error); // Log jika gagal koneksi
  }

  return (
    <main className="w-screen overflow-x-hidden">
      <Nav />

      {/* Section 1: Home */}
      <section
        id="home"
        className="w-screen h-screen bg-[url('/images/base-bg-1.jpg')] bg-cover bg-center bg-no-repeat"
      >
        <div className="flex justify-center items-center h-full pt-20">
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
