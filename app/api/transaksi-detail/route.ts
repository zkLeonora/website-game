import { NextResponse } from 'next/server'
import mysql from 'mysql2/promise'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  const conn = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'gengkapak12345',
    database: 'WEBSITE_LEYNDELL',
  })

  const [rows]: any = await conn.query('SELECT * FROM game WHERE id = ?', [id])
  await conn.end()

  if (!rows || rows.length === 0) {
    return NextResponse.json({ error: 'Game tidak ditemukan' }, { status: 404 })
  }

  return NextResponse.json(rows[0])
}
