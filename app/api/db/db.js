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
const connectToDatabase = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('Database Connected!');
    connection.release(); // Kembali ke pool
  } catch (err) {
    console.error('Gagal terhubung ke database:', err);
    throw new Error('Gagal terhubung ke database');
  }
};

export default async function handler(req, res) {
  try {
    await connectToDatabase(); // Coba koneksi ke database
    res.status(200).json({ message: 'Connected to database successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
