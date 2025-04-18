// app/components/infoGame/InfoGameSection.tsx
'use client';
import Image from "next/image";
import FeatureCard from "./FeatureCard";

export default function InfoGameSection() {
  return (
    <section id="info-game" className="min-h-screen bg-black text-white px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-center">Tentang Game</h2>

        <p className="text-gray-300 text-center">
            Setiap petualangan dimulai dari sebuah langkah kecil. Temukan dasar dunia Leyndell lewat panduan RPG di bawah ini.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          <FeatureCard title="Eksplorasi Dungeon" description="Masuki dungeon berbahaya dan temukan harta tersembunyi." />
          <FeatureCard title="Beragam Karakter" description="Gunakan berbagai karakter unik dengan skill yang berbeda." />
          <FeatureCard title="Upgrade Senjata" description="Tingkatkan senjatamu untuk menghadapi boss yang kuat!" />
        </div>
      </div>
    </section>
  );
}
