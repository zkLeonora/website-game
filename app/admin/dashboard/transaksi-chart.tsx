'use client'

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

interface TransactionData {
  tanggal: string
  jumlah_transaksi: number
}

const data: TransactionData[] = [
  { tanggal: '2025-07-18', jumlah_transaksi: 3 },
  { tanggal: '2025-07-19', jumlah_transaksi: 7 },
  { tanggal: '2025-07-20', jumlah_transaksi: 5 },
  { tanggal: '2025-07-21', jumlah_transaksi: 10 },
  { tanggal: '2025-07-22', jumlah_transaksi: 4 },
  { tanggal: '2025-07-23', jumlah_transaksi: 6 },
]

export default function TransactionBarChart() {
  return (
<div className="min-w-[750px] h-[400px] p-4 bg-[#171628] rounded-xl">
  <h2 className="text-lg font-semibold mb-4 text-white">Jumlah Transaksi / Hari</h2>
  <ResponsiveContainer width="100%" height="100%">
    <BarChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="tanggal" />
      <YAxis allowDecimals={false} />
      <Tooltip />
      <Bar dataKey="jumlah_transaksi" fill="#4f46e5" radius={[4, 4, 0, 0]} />
    </BarChart>
  </ResponsiveContainer>
</div>

  )
}
