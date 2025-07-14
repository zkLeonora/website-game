import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

// Koneksi pool ke database
const pool = mysql.createPool({
  host: "localhost",  // Host
  user: "root",       // Username MySQL
  password: "gengkapak12345",  // Password MySQL
  database: "WEBSITE_LEYNDELL",  // Databse Name
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export async function POST(req: Request) {
  const { username, password } = await req.json();

  try {
    // select admin berdasarkan username
    const [rows] = await pool.execute<mysql.RowDataPacket[]>( 
      "SELECT * FROM admin WHERE username = ?", 
      [username]
    );

    // Cek data admin
    if (rows.length === 0) {
      return NextResponse.json(
        { message: "Admin not found" },
        { status: 400 }
      );
    }

    const admin = rows[0];

    // Verifikasi password
    if (password !== admin.password) {
      return NextResponse.json(
        { message: "Invalid password" },
        { status: 400 }
      );
    }

    // Jika login berhasil
    return NextResponse.json(
      { message: "Login successful", admin: { username: admin.username } },
      { status: 200 }
    );
  } catch (error: unknown) {
    // Menangani error 
    console.error("Database error:", error);
    if (error instanceof Error) {
      return NextResponse.json(
        { message: "Internal server error", error: error.message },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { message: "Unknown error occurred" },
      { status: 500 }
    );
  }
}
