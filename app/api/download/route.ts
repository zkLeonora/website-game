import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const filePath = path.join(process.cwd(), 'public/files/leyndell.exe');// file .exe
  const fileBuffer = fs.readFileSync(filePath);

  return new Response(fileBuffer, {
    headers: {
      'Content-Type': 'application/octet-stream', // 
      'Content-Disposition': 'attachment; filename="Leyndell.exe"',
    },
  });
}
