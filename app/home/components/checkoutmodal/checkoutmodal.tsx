'use client'

import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { Button } from '../../../components/ui/button'
import Image from 'next/image'

// Tambahkan 'gameId' ke dalam order props
interface CheckoutModalProps {
  isOpen: boolean
  onClose: () => void
  order: {
    itemName: string
    image: string
    username: string
    userId: string
    gameId: number   
    method: string
    price: number
    bankName?: string
  }
}


export default function ModalCheckout({ isOpen, onClose, order }: CheckoutModalProps) {
  console.log("ORDER DATA:", order);
  const total = order.price
  const [showPaymentModal, setShowPaymentModal] = useState(false)

  const method = order.method.toLowerCase()

  // 🧠 Fungsi menentukan apakah metode adalah QR code
  const isQrMethod = ['gopay', 'dana'].includes(method)

  // 🧠 Fungsi menentukan gambar QR berdasarkan metode pembayaran
  const getQrImage = () => {
    switch (method) {
      case 'gopay':
        return '/images/Gopay-qr.jpg'
      case 'dana':
        return '/images/Dana-qr.jpg'
      default:
        return '/images/default-qr.jpg'
    }
  }

  // 💡 Simulasi nomor rekening berdasarkan metode bank
  const getBankInfo = () => {
    const bank = order.bankName?.toLowerCase()

    switch (bank) {
      case 'bca':
        return { bank: 'BCA', va: '0941646131', name: 'Azka Maulana Ramadhan' }
      default:
        return { bank: 'Bank Tidak Dikenal', va: '-', name: '-' }
    }
  }


  return (
    <>
      {/* Modal Checkout */}
      <Dialog open={isOpen} onClose={onClose} className="relative z-50">
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md rounded-xl bg-black text-white p-6 shadow-xl">
            <Dialog.Title className="text-xl font-semibold mb-2">Detail Pesanan</Dialog.Title>
            <p className="text-sm text-gray-300 mb-4">Mohon konfirmasi detail pesanan anda sudah benar.</p>

            <div className="mb-4">
              <div className="text-lg font-bold">Item</div>
              <div className="flex items-center gap-3 mt-1">
                <Image
                  src={order.image?.startsWith('/') ? order.image : '/images/logo.png'}
                  alt={order.itemName}
                  width={80}
                  height={80}
                />
                <span>{order.itemName}</span>
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <div><strong>Username:</strong> {order.username}</div>
              <div><strong>Bayar dengan:</strong> {order.method}</div>
              <div><strong>Harga:</strong> Rp. {order.price.toLocaleString()}</div>
            </div>

            <div className="mt-4 font-semibold text-lg text-green-400">
              Total pembayaran: IDR. {total.toLocaleString()}
            </div>

            <div className="mt-6 flex justify-end">
              <Button
                onClick={() => {
                  onClose()
                  setShowPaymentModal(true)
                }}
              >
                Konfirmasi
              </Button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* Modal Pembayaran: QR atau VA */}
      <Dialog open={showPaymentModal} onClose={() => setShowPaymentModal(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-sm rounded-xl bg-[#000000] text-white p-6 shadow-xl text-center relative">
            {/* Tombol Close di kanan atas */}
            <button
              className="absolute top-3 right-3 text-white hover:text-gray-400 text-xl font-bold"
              onClick={() => setShowPaymentModal(false)}
              aria-label="Close"
            >
              ×
            </button>

            {isQrMethod ? (
              <>
                <Dialog.Title className="text-xl font-bold mb-2">Pindai kode QR</Dialog.Title>
                <p className="text-sm text-gray-300 mb-4">
                  Gunakan {order.method.toUpperCase()} untuk melanjutkan pembayaran
                </p>
                <Image
                  src={getQrImage()}
                  alt="QR Code"
                  width={250}
                  height={250}
                  className="mx-auto rounded-md"
                />
              </>
            ) : (
              <>
                <Dialog.Title className="text-xl font-bold mb-2">
                  Pembayaran via {order.method.toUpperCase()}
                </Dialog.Title>
                <p className="text-sm text-gray-300 mb-2">Silakan transfer ke rekening berikut:</p>
                <div className="bg-white text-black p-4 rounded-lg text-left space-y-2">
                  <div><strong>Bank:</strong> {getBankInfo().bank}</div>
                  <div><strong>Nomor Rekening / VA:</strong> {getBankInfo().va}</div>
                  <div><strong>Atas Nama:</strong> {getBankInfo().name}</div>
                  <div><strong>Total:</strong> Rp. {total.toLocaleString()}</div>
                </div>
              </>
            )}

            {/* Tombol Checkout */}
            <div className="mt-6">
              <Button
                className="w-full"
                onClick={async () => {
                  try {
                    const response = await fetch('/api/transaksi', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify({
                        user_id: order.userId,
                        game_id: order.gameId,
                        metode_pembayaran: order.method
                      })
                    });

                    const data = await response.json();

                    if (!response.ok) {
                      throw new Error(data.error || 'Gagal melakukan transaksi');
                    }

                    alert('Transaksi berhasil dibuat dengan ID: ' + data.id);
                    setShowPaymentModal(false);

                    // link download otomatis
                    const link = document.createElement('a');
                    link.href = '/files/Leyndell.exe'; // path file sesuai
                    link.download = 'Leyndell.exe';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);

                    // Redirect ke homepage
                    window.location.href = '/';
                  } catch (error: any) {
                    alert('Terjadi kesalahan: ' + error.message);
                  }
                }}
              >
                Checkout
              </Button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  )
}
