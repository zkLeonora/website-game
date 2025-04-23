"use client";

import { useState } from "react";
import { redirect } from "next/navigation";  // Import redirect dari next/navigation

export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      console.log("Signup successful:", data);
      redirect("/login");  // Arahkan ke halaman utama setelah berhasil daftar
    } else {
      console.error("Signup failed:", data.message);
      setError(data.message);
    }
  };

  return (
<div
  className="min-h-screen flex items-center justify-center bg-cover bg-center px-4 pt-15"
  style={{ backgroundImage: "url('/images/UI-9.png')" }}
>

      <div
        className="rounded-2xl shadow-xl p-6 w-full max-w-sm shadow-3x1"
        style={{ backgroundColor: "#1f1b38" }}
      >
        <h1 className="text-3xl font-bold text-center text-white mb-6">Daftar Akun</h1>

        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
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
            Daftar
          </button>
        </form>
      </div>
    </div>
  );
}
