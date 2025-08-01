import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export async function POST(req: Request) {
    const body = await req.json();
    console.log('Body yang diterima:', body);

  const { user_id, game_id, metode_pembayaran } = body;

  if (!user_id || !game_id || !metode_pembayaran) {
    return NextResponse.json({ error: 'Data tidak lengkap' }, { status: 400 });
  }

    const conn = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    });


  try {
    const [result]: any = await conn.query(
      'INSERT INTO transaksi (user_id, game_id, metode_pembayaran) VALUES (?, ?, ?)',
      [user_id, game_id, metode_pembayaran]
    );

    await conn.end();

    return NextResponse.json({ message: 'Transaksi berhasil dibuat', id: result.insertId });
  } catch (error) {
    await conn.end();
    return NextResponse.json({ error: 'Gagal membuat transaksi', detail: error }, { status: 500 });
  }
}
export async function GET() {
  const conn = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });


  try {
    const [rows] = await conn.query(`
      SELECT 
        transaksi.id, 
        users.username, 
        game.nama_game, 
        transaksi.metode_pembayaran, 
        transaksi.tanggal_transaksi,
        transaksi.status
      FROM transaksi 
      JOIN users ON transaksi.user_id = users.id 
      JOIN game ON transaksi.game_id = game.id
      ORDER BY transaksi.tanggal_transaksi ASC
    `);

    await conn.end();

    return NextResponse.json(rows);
  } catch (error) {
    await conn.end();
    return NextResponse.json({ error: 'Gagal mengambil data transaksi', detail: error }, { status: 500 });
  }
}

