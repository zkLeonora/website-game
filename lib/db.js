import mysql from 'mysql2/promise';

// Membuat koneksi ke database MySQL menggunakan promise
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT, 
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Fungsi untuk menguji koneksi
export const connectToDatabase = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('Database Connected!');
    connection.release(); // Kembali ke pool
  } catch (err) {
    console.error('Gagal terhubung ke database:', err);
  }
};

export { pool };
