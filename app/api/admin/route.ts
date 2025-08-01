import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

// Koneksi pool ke database pakai env
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT), // pastikan port berupa angka
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});


export async function POST(req: Request) {
  const { username, password } = await req.json();

  try {
    const [rows] = await pool.execute<mysql.RowDataPacket[]>(
      "SELECT * FROM admin WHERE username = ?",
      [username]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { message: "Admin not found" },
        { status: 400 }
      );
    }

    const admin = rows[0];

    if (password !== admin.password) {
      return NextResponse.json(
        { message: "Invalid password" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Login successful", admin: { username: admin.username } },
      { status: 200 }
    );
  } catch (error: unknown) {
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
