"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();
  const [admin, setAdmin] = useState<{ username: string } | null>(null);

  useEffect(() => {
    const adminData = localStorage.getItem("admin");
    if (!adminData) {
      router.push("/admin");
    } else {
      setAdmin(JSON.parse(adminData));
    }
  }, [router]);

  return (
    <div className="flex h-screen" style={{ backgroundColor: "#171628", color: "white" }}>
      {/* Sidebar */}
      <aside className="w-64 p-6 flex flex-col justify-between" style={{ backgroundColor: "#1f1e33" }}>
        <div>
          <h2 className="text-2xl font-bold mb-6 text-red-500">Admin Panel</h2>
          <nav className="space-y-4">
            <a href="/admin/dashboard" className="block hover:text-red-400">
              Dashboard
            </a>
            <a href="#" className="block hover:text-red-400">
              Statistik User
            </a>
            <a href="#" className="block hover:text-red-400">
              Transaksi
            </a>
            <a href="#" className="block hover:text-red-400">
              Game Terdownload
            </a>
          </nav>
        </div>
        <button
          onClick={() => {
            localStorage.removeItem("admin");
            router.push("/admin");
          }}
          className="bg-red-500 hover:bg-red-600 py-2 px-4 rounded text-white"
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-4 text-white">
          Selamat datang, <span className="text-red-400">{admin?.username}</span> 👋
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="rounded-lg p-4 shadow" style={{ backgroundColor: "#1f1e33" }}>
            <h2 className="text-xl text-red-400 mb-2">Total Pengguna</h2>
            <p className="text-3xl font-bold text-white">128</p>
          </div>
          <div className="rounded-lg p-4 shadow" style={{ backgroundColor: "#1f1e33" }}>
            <h2 className="text-xl text-red-400 mb-2">Total Download</h2>
            <p className="text-3xl font-bold text-white">452</p>
          </div>
          <div className="rounded-lg p-4 shadow" style={{ backgroundColor: "#1f1e33" }}>
            <h2 className="text-xl text-red-400 mb-2">Transaksi Hari Ini</h2>
            <p className="text-3xl font-bold text-white">Rp 1.230.000</p>
          </div>
        </div>
      </main>
    </div>
  );
}
