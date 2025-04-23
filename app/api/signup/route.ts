// app/api/signup/route.ts
import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

// Koneksi pool ke database
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "gengkapak12345",
  database: "WEBSITE_LEYNDELL",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export async function POST(req: Request) {
  const { username, email, password } = await req.json();

  try {
    // Cek apakah username atau email sudah digunakan
    const [existing] = await pool.execute<mysql.RowDataPacket[]>(
      "SELECT * FROM users WHERE username = ? OR email = ?",
      [username, email]
    );

    if (existing.length > 0) {
      return NextResponse.json(
        { message: "Username atau email sudah digunakan" },
        { status: 400 }
      );
    }

    // Simpan user baru (tanpa hashing untuk sekarang)
    await pool.execute(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [username, email, password]
    );

    return NextResponse.json(
      { message: "Pendaftaran berhasil!" },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("Database error:", error);
    if (error instanceof Error) {
      return NextResponse.json(
        { message: "Terjadi kesalahan pada server", error: error.message },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { message: "Unknown error occurred" },
      { status: 500 }
    );
  }
}
