import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export async function POST(req: Request) {
  const { username, password } = await req.json();

  try {
    const [rows] = await pool.execute<mysql.RowDataPacket[]>(
      "SELECT * FROM users WHERE username = ?",
      [username]
    );

    if (rows.length === 0) {
      return NextResponse.json({ message: "User not found" }, { status: 400 });
    }

    const user = rows[0];

    if (password !== user.password) {
      return NextResponse.json({ message: "Invalid password" }, { status: 400 });
    }

    const response = new NextResponse(JSON.stringify({
      message: "Login successful",
      user: { id: user.id, username: user.username },
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });

    response.cookies.set("user_id", String(user.id), {
      path: "/",
      httpOnly: true,
    });
    response.cookies.set("username", user.username, {
      path: "/",
      httpOnly: true,
    });

    return response;

  } catch (error: unknown) {
    console.error("Database error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
