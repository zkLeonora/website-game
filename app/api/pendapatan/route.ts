// app/api/pendapatan/route.ts
import { pool } from "@/lib/db"; // Pastikan ini sesuai path-mu
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const [rows]: any = await pool.query(`
      SELECT 
        SUM(g.harga) AS total_pendapatan
      FROM transaksi t
      JOIN game g ON t.game_id = g.id
      WHERE t.status IN ('success', 'selesai')
    `);

    console.log("Rows pendapatan:", rows);

    const total = rows[0]?.total_pendapatan || 0;

    return NextResponse.json({ total });
  } catch (err) {
    console.error("Error saat mengambil data pendapatan:", err);
    return NextResponse.json({ total: 0 }, { status: 500 });
  }
}
