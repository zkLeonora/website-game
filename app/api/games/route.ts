import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export async function GET() {
  const conn = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'gengkapak12345',
    database: 'WEBSITE_LEYNDELL',
  });

  try {
    const [rows] = await conn.query('SELECT * FROM game ORDER BY tanggal_rilis DESC');
    await conn.end();
    return NextResponse.json(rows);
  } catch (error) {
    await conn.end();
    return NextResponse.json({ error: 'Gagal mengambil data game', detail: error }, { status: 500 });
  }
}
