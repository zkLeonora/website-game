"use client";

import { useState } from "react";
import { redirect } from "next/navigation";  // Import redirect dari next/navigation

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");  // Untuk menampilkan pesan error

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const response = await fetch("/api/admin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
  
    const data = await response.json();
    if (response.ok) {
      console.log("Login successful:", data);
      localStorage.setItem("admin", JSON.stringify(data.admin)); // Ganti 'user' menjadi 'admin'
      // Redirect ke path root ("/") setelah login berhasil
      redirect("/admin/dashboard");  // Arahkan ke halaman dashboard admin
    } else {
      console.error("Login failed:", data.message);  // Periksa pesan error yang diterima
      setError(data.message);  // Menampilkan pesan error di UI
    }
  };
  
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center px-4"
      style={{ backgroundImage: "url('/images/UI-9.png')" }}
    >
      <div
        className="rounded-2xl shadow-xl p-8 w-full max-w-md shadow-3x1"
        style={{ backgroundColor: "#1f1b38" }}
      >
        <h1 className="text-3xl font-bold text-center text-white mb-6">Masuk sebagai Admin</h1>

        {/* Tampilkan pesan error jika login gagal */}
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"  // Ubah menjadi 'text' untuk input username
            placeholder="Username"
            className="w-full p-3 border border-gray-300 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-[#463996] text-white font-bold py-3 rounded-lg hover:bg-[#3a2f80] transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
