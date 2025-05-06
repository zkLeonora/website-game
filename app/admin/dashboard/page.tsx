"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import clsx from "clsx";

export default function AdminDashboard() {
  const router = useRouter();
  const pathname = usePathname();
  const [admin, setAdmin] = useState<{ username: string } | null>(null);

  useEffect(() => {
    const adminData = localStorage.getItem("admin");
    if (!adminData) {
      router.push("/admin");
    } else {
      setAdmin(JSON.parse(adminData));
    }
  }, [router]);

  const navLinks = [
    { label: "Dashboard", href: "/admin/dashboard" },
    { label: "Statistik User", href: "/admin/statistik" },
    { label: "Transaksi", href: "/admin/transaksi" },
    { label: "Game Terdownload", href: "/admin/game" },
  ];

  return (
    <div className="flex h-screen bg-[#171628] text-white">
      {/* Sidebar */}
      <aside className="w-64 p-6 flex flex-col justify-between bg-[#1f1e33] overflow-y-hidden">
        <div>
          <h2 className="text-2xl font-bold mb-6 text-red-500">Admin Panel</h2>
          <nav className="space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={clsx(
                  "block px-4 py-2 rounded transition",
                  pathname === link.href
                    ? "bg-red-600 text-white"
                    : "hover:bg-red-800 hover:text-white text-red-300"
                )}
              >
                {link.label}
              </a>
            ))}
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
      <main className="flex-1 p-8 overflow-auto scrollbar-hide">
        <h1 className="text-3xl font-bold mb-4 text-white">
          Selamat datang, <span className="text-red-400">{admin?.username}</span> 👋
        </h1>

        <div className="flex gap-6">
          {/* Kontainer A (Timeline) */}
          <div className="rounded-lg p-6 shadow-lg text-white w-full border-2 border-white bg-[#1f1e33] flex-1 h-[500px] overflow-y-auto">
            <div className="w-full max-w-3xl mx-auto text-left">
              <h2 className="text-2xl font-bold text-white text-center mb-8">Aktivitas Terbaru</h2>
              <ol className="relative border-l border-gray-200 dark:border-gray-700">
                <li className="mb-10 ml-6">
                  <span className="absolute w-3 h-3 bg-red-500 rounded-full -left-1.5 border border-white dark:border-gray-900"></span>
                  <h3 className="flex items-center mb-1 text-lg font-semibold text-white">
                    Login Admin
                    <span className="bg-red-100 text-red-800 text-xs font-medium ml-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-white">Baru</span>
                  </h3>
                  <time className="block mb-2 text-sm font-normal text-gray-400 dark:text-gray-500">5 Mei 2025, 10:00 WIB</time>
                  <p className="text-base font-normal text-gray-300">
                    Admin berhasil login ke sistem menggunakan akun <code>zkLeonora</code>.
                  </p>
                </li>
                <li className="mb-10 ml-6">
                  <span className="absolute w-3 h-3 bg-red-500 rounded-full -left-1.5 border border-white dark:border-gray-900"></span>
                  <h3 className="mb-1 text-lg font-semibold text-white">Transaksi berhasil</h3>
                  <time className="block mb-2 text-sm font-normal text-gray-400 dark:text-gray-500">5 Mei 2025, 09:45 WIB</time>
                  <p className="text-base font-normal text-gray-300">
                    Pengguna <code>rivaldo123</code> melakukan pembelian game <strong>"Leyndell"</strong> seharga Rp30.000.
                  </p>
                </li>
              </ol>
            </div>
          </div>

          {/* Kontainer B */}
          <div className="rounded-lg p-4 shadow-lg flex items-center justify-center text-center w-full border-2 border-white bg-[#1f1e33] flex-1 h-[500px]">
            <div>
              <h2 className="text-xl text-white-400 mb-4">Kontainer B</h2>
            </div>
          </div>
        </div>

        {/* Kontainer C */}
        <div className="mt-6 rounded-lg p-6 shadow bg-[#1f1e33] border-2 border-white w-full">
          <h2 className="text-xl text-white-400 mb-2">Kontainer C</h2>
        </div>

        {/* Kontainer D */}
        <div className="mt-6 rounded-lg p-6 shadow bg-[#1f1e33] border-2 border-white w-full">
          <h2 className="text-xl text-white-400 mb-2">Kontainer D</h2>
        </div>
      </main>
    </div>
  );
}
