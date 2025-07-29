import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";

export async function POST(req: NextRequest) {
  try {
    const { user_id, subject, message } = await req.json();

    if (!user_id || !subject || !message) {
      return NextResponse.json({ error: "Data tidak lengkap" }, { status: 400 });
    }

    const conn = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    await conn.execute(
      "INSERT INTO pesan_user (subjek, pesan, created_at, user_id, pengirim) VALUES (?, ?, NOW(), ?, 'admin')",
      [subject, message, user_id]
    );

    await conn.end();

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("❌ Error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
