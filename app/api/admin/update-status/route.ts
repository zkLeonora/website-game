import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

export async function POST(req: Request) {
  const { id, status } = await req.json();

  const conn = await mysql.createConnection({
    host: process.env.DB_HOST!,
    user: process.env.DB_USER!,
    password: process.env.DB_PASSWORD!,
    database: process.env.DB_NAME!,
  });

  await conn.execute(
    "UPDATE transaksi SET status = ? WHERE id = ?",
    [status, id]
  );

  await conn.end();
  return NextResponse.json({ success: true });
}
