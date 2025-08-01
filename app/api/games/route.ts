import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export async function GET() {
  const conn = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
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
