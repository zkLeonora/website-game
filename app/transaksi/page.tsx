'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import ModalCheckout from '../home/components/checkoutmodal/checkoutmodal';

// Daftar metode pembayaran yang tersedia
const paymentMethods = [
  { name: 'Gopay', icon: '/images/gopay.png', note: '' },
  { name: 'DANA', icon: '/images/dana.jpg', note: '' },
  { name: 'ATM/Bank Transfer', icon: '/images/bank.png', note: 'Transfer antar bank 1x24 jam' },
];

// Opsi bank jika user memilih metode transfer
const bankOptions = ['BCA'];

export default function TransaksiPage() {
  // State untuk menyimpan metode pembayaran yang dipilih
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

  // State untuk menyimpan bank yang dipilih jika metode = ATM
  const [selectedBank, setSelectedBank] = useState<string | null>(null);

  // State untuk checkbox persetujuan
  const [agree, setAgree] = useState(false);

  // State untuk mengontrol visibilitas modal checkout
  const [showModal, setShowModal] = useState(false);

  // State untuk menyimpan detail game yang akan dibeli
  const [gameData, setGameData] = useState<any>(null);

  // useEffect dijalankan saat komponen pertama kali dimuat
  useEffect(() => {
    // Ambil data user dari localStorage
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      console.error("User belum login.");
      return;
    }

    const user = JSON.parse(storedUser);

    // Ambil detail game dari API
    fetch('/api/transaksi-detail?id=1')
      .then(res => res.json())
      .then((data) => {
        // Simpan data game + user ke dalam state
        setGameData({
          ...data,
          username: user.username,
          userId: user.id ?? null, 
        });
      })
      .catch(err => console.error('Error fetch game:', err));
  }, []);

  // Fungsi untuk menangani klik tombol "Place Order"
  const handlePlaceOrder = () => {
    if (!agree) return alert('Harap menyetujui syarat.');
    if (!selectedMethod) return alert('Pilih metode pembayaran terlebih dahulu.');
    if (selectedMethod === 'ATM/Bank Transfer' && !selectedBank) {
      return alert('Pilih bank terlebih dahulu.');
    }

    // Tampilkan modal konfirmasi transaksi
    setShowModal(true);
  };

  return (
    <main className="min-h-screen w-full bg-[#0d0d0d] text-white flex flex-col lg:flex-row justify-center p-4 gap-6">
      
      {/* KIRI: Pilihan metode pembayaran */}
      <div className="flex-1 max-w-3xl bg-[#1a1a1a] p-6 rounded-md">
        <h2 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">CHECKOUT</h2>
        <div className="mb-4">
          <p className="font-medium text-gray-300 mb-2">PAYMENT METHODS</p>
          <div className="space-y-3">
            {/* Mapping semua metode pembayaran */}
            {paymentMethods.map((method) => (
              <div key={method.name}>
                <label className="flex items-center gap-4 p-3 rounded-md cursor-pointer border border-gray-700 hover:border-blue-500 transition">
                  <input
                    type="radio"
                    name="payment"
                    checked={selectedMethod === method.name}
                    onChange={() => {
                      setSelectedMethod(method.name);
                      setSelectedBank(null); // reset bank jika metode diganti
                    }}
                    className="accent-blue-500"
                  />
                  <Image src={method.icon} alt={method.name} width={40} height={40} />
                  <div>
                    <p>{method.name}</p>
                    {method.note && (
                      <p className="text-xs text-yellow-400">{method.note}</p>
                    )}
                  </div>
                </label>

                {/* Tampilkan pilihan bank jika user memilih ATM */}
                {method.name === 'ATM/Bank Transfer' &&
                  selectedMethod === 'ATM/Bank Transfer' && (
                    <div className="mt-2 ml-12">
                      <label className="block text-sm mb-1 text-gray-300">Pilih Bank:</label>
                      <select
                        className="bg-[#2c2c2c] border border-gray-600 p-2 rounded-md text-white w-full"
                        value={selectedBank || ''}
                        onChange={(e) => setSelectedBank(e.target.value)}
                      >
                        <option value="" disabled>
                          -- Pilih Bank --
                        </option>
                        {bankOptions.map((bank) => (
                          <option key={bank} value={bank}>
                            {bank}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* KANAN: Ringkasan pesanan */}
      <div className="w-full lg:w-[400px] bg-[#1a1a1a] p-6 rounded-md">
        <h2 className="text-lg font-semibold mb-4">ORDER SUMMARY</h2>

        {/* Jika game data berhasil diambil */}
        {gameData ? (
          <>
            {/* Info game */}
            <div className="flex items-center mb-4">
              <Image
                src="/images/logo.png"
                alt={gameData.nama_game}
                width={80}
                height={100}
                className="rounded-md"
              />
              <div className="ml-4 text-sm">
                <p className="font-semibold">{gameData.nama_game}</p>
                <p className="text-gray-400">ZK Games Studio</p>
                <p className="text-sm text-white mt-2">
                  IDR {Number(gameData.harga).toLocaleString()}
                </p>
              </div>
            </div>

            {/* Rincian harga */}
            <div className="text-sm border-t border-gray-700 pt-4 space-y-2">
              <div className="flex justify-between">
                <span>Price</span>
                <span>IDR {Number(gameData.harga).toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-bold border-t border-gray-700 pt-2">
                <span>Total</span>
                <span>IDR {Number(gameData.harga).toLocaleString()}</span>
              </div>
            </div>

            {/* Checkbox persetujuan */}
            <div className="mt-4 text-sm">
              <label className="flex items-start gap-2">
                <input
                  type="checkbox"
                  className="mt-1 accent-blue-500"
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                />
                <span>
                  Saya setuju untuk membagikan email saya ke ZK Games Studio untuk keperluan pembelian.{' '}
                  <a href="#" className="underline">Kebijakan Privasi</a>
                </span>
              </label>
            </div>

            {/* Tombol checkout */}
            <button
              className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
              onClick={handlePlaceOrder}
            >
              PLACE ORDER
            </button>

            {/* Modal konfirmasi pesanan */}
            <ModalCheckout
              isOpen={showModal}
              onClose={() => setShowModal(false)}
              order={{
                itemName: gameData.nama_game,
                image: '/images/logo.png',
                username: gameData.username,
                userId: gameData.userId,
                method: selectedMethod ?? '',
                price: gameData.harga,
                bankName: selectedBank ?? '',
                gameId: gameData.id // ← ID game untuk backend
              }}
            />
          </>
        ) : (
          // Saat data game belum dimuat
          <p className="text-gray-400">Loading game data...</p>
        )}
      </div>
    </main>
  );
}
