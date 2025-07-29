import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "gengkapak12345",
  database: "WEBSITE_LEYNDELL",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export async function POST(req: Request) {
  const { username, password } = await req.json();
  console.log("Data yang diterima API:", { username, password });

  try {
    const [rows] = await pool.execute<mysql.RowDataPacket[]>(
      "SELECT * FROM users WHERE username = ?",
      [username]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 400 }
      );
    }

    const user = rows[0];

    if (password !== user.password) {
      return NextResponse.json(
        { message: "Invalid password" },
        { status: 400 }
      );
    }

    // ✅ Buat response secara manual
    const response = new NextResponse(JSON.stringify({
      message: "Login successful",
      user: { id: user.id, username: user.username },
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });

    // ✅ Set cookie dengan benar
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
    if (error instanceof Error) {
      return NextResponse.json(
        { message: "Internal server error", error: error.message },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { message: "Unknown error occurred" },
      { status: 500 }
    );
  }
}
