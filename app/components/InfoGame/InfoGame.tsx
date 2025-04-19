// app/components/infoGame/InfoGameSection.tsx
'use client';
import FeatureCard from "./FeatureCard";

export default function InfoGameSection() {
  return (
    <section
      id="info-game"
      className="min-h-screen text-white px-4 py-12"
      style={{
        backgroundImage: 'url("/images/UI-5.png")', // Ganti dengan path gambar yang sesuai
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-center">Apa itu Leyndell?</h2>
        <p className="text-gray-300 text-center">
            deskripsi game di sini
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
