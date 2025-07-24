import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

export async function GET() {
  try {
    // Ambil data transaksi
    const [transaksi] = await pool.query(
      `SELECT t.*, u.username, g.nama_game, g.harga
       FROM transaksi t
       JOIN users u ON t.user_id = u.id
       JOIN game g ON t.game_id = g.id
       ORDER BY t.tanggal_transaksi DESC`
    );

    // Ambil data user
    const [users] = await pool.query(
      `SELECT username, created_at FROM users ORDER BY created_at DESC`
    );

    const timeline = [
      ...(users as any[]).map(user => ({
        type: 'register',
        username: user.username,
        tanggal: user.created_at,
        message: `User ${user.username} mendaftar.`,
      })),
      ...(transaksi as any[]).map(trx => ({
        type: 'transaksi',
        username: trx.username,
        game: trx.nama_game,
        harga: trx.harga,
        tanggal: trx.tanggal_transaksi,
        message: `Pengguna ${trx.username} membeli "${trx.nama_game}" seharga Rp${trx.harga.toLocaleString()}.`,
      })),
    ];

    // Urutkan berdasarkan tanggal terbaru
    timeline.sort((a, b) => new Date(b.tanggal).getTime() - new Date(a.tanggal).getTime());

    return NextResponse.json(timeline);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Gagal mengambil data' }, { status: 500 });
  }
}
