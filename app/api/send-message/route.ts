import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";

export async function POST(req: NextRequest) {
  try {
    const { subject, message } = await req.json();

    if (!subject || !message || subject.trim() === "" || message.trim() === "") {
      return NextResponse.json({ error: "Subject dan pesan tidak boleh kosong" }, { status: 400 });
    }

    const userId = req.cookies.get("user_id")?.value;

    if (!userId) {
      return NextResponse.json({ error: "User belum login" }, { status: 401 });
    }

    const conn = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "gengkapak12345",
      database: "WEBSITE_LEYNDELL",
    });

    await conn.execute(
      "INSERT INTO pesan_admin (subjek, pesan, created_at, user_id) VALUES (?, ?, NOW(), ?)",
      [subject, message, userId]
    );

    await conn.end();

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("❌ Error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
