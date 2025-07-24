// app/api/users/route.ts
import { NextResponse } from 'next/server'
import { pool } from '@/lib/db'

export async function GET() {
  try {
    const [rows] = await pool.query('SELECT * FROM users')
    return NextResponse.json(rows)
  } catch (error) {
    console.error('Error mengambil data users:', error)
    return NextResponse.json({ error: 'Gagal mengambil data users' }, { status: 500 })
  }
}
