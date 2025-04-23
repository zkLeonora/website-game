// app/login/page.tsx
"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Lakukan autentikasi di sini
    console.log("Login with:", email, password);
  };

  return (
    <div
        className="min-h-screen flex items-center justify-center bg-cover bg-center px-4"
        style={{ backgroundImage: "url('/images/UI-9.png')" }}
        >
    <div className="rounded-2xl shadow-xl p-8 w-full max-w-md shadow-3x1" style={{ backgroundColor: "#1f1b38" }}>
        <h1 className="text-3xl font-bold text-center text-white mb-6">
          Masuk ke Akun
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
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
