import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

export async function GET() {
  try {
    const conn = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "gengkapak12345",
      database: "WEBSITE_LEYNDELL",
    });

    const [rows] = await conn.query(`
      SELECT pesan_admin.id, users.username, pesan_admin.subjek, pesan_admin.pesan, pesan_admin.created_at
      FROM pesan_admin
      JOIN users ON pesan_admin.user_id = users.id
      ORDER BY pesan_admin.created_at DESC
    `);

    await conn.end();
    return NextResponse.json(rows);
  } catch (err) {
    console.error("❌ Error mengambil pesan:", err);
    return NextResponse.json({ error: "Gagal mengambil pesan" }, { status: 500 });
  }
}
