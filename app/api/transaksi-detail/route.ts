import { NextResponse } from 'next/server'
import mysql from 'mysql2/promise'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

    const conn = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    });

  const [rows]: any = await conn.query('SELECT * FROM game WHERE id = ?', [id])
  await conn.end()

  if (!rows || rows.length === 0) {
    return NextResponse.json({ error: 'Game tidak ditemukan' }, { status: 404 })
  }

  return NextResponse.json(rows[0])
}
