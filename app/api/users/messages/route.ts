// app/api/users/messages/route.ts
import { NextResponse } from 'next/server'
import { pool } from '@/lib/db'

export async function GET(req: Request) {
const { searchParams } = new URL(req.url);
const userId = searchParams.get('user_id');

  if (!userId) {
    return NextResponse.json({ error: 'Username tidak diberikan' }, { status: 400 })
  }

  try {
    const [rows]: any = await pool.query(
  'SELECT * FROM pesan_user WHERE user_id = ? ORDER BY created_at DESC',
  [userId]
    )
    return NextResponse.json(rows)
  } catch (error) {
    console.error('❌ Error mengambil pesan:', error)
    return NextResponse.json({ error: 'Gagal mengambil pesan' }, { status: 500 })
  }
}
