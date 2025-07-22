'use client'

import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { Button } from '../../../components/ui/button';

interface CheckoutModalProps {
  isOpen: boolean
  onClose: () => void
  order: {
    itemName: string
    quantity: number
    bonus: number
    nickname: string
    userId: string
    method: string
    price: number
    tax: number
  }
}

export default function ModalCheckout({ isOpen, onClose, order }: CheckoutModalProps) {
  const total = order.price + order.tax

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md rounded-xl bg-black text-white p-6 shadow-xl">
          <Dialog.Title className="text-xl font-semibold mb-2">Detail Pesanan</Dialog.Title>
          <p className="text-sm text-gray-300 mb-4">Mohon konfirmasi detail pesanan anda sudah benar.</p>

          <div className="mb-4">
            <div className="bg-purple-800 text-purple-200 rounded px-3 py-2 text-sm font-medium w-fit mb-2">POPULAR</div>
            <div className="text-lg font-bold">{order.quantity + order.bonus} Item</div>
            <div className="text-sm text-gray-300">
              ({order.quantity} + {order.bonus} Bonus)
            </div>
          </div>

          <div className="space-y-2 text-sm">
            <div><strong>Nickname:</strong> {order.nickname}</div>
            <div><strong>ID:</strong> {order.userId}</div>
            <div><strong>Bayar dengan:</strong> {order.method}</div>
            <div><strong>Harga:</strong> Rp. {order.price.toLocaleString()}</div>
            <div><strong>Pajak (11%):</strong> Rp. {order.tax.toLocaleString()}</div>
          </div>

          <div className="mt-4 font-semibold text-lg text-red-400">
            Total pembayaran: Rp. {total.toLocaleString()}
          </div>

          <div className="mt-6 flex justify-end">
            <Button onClick={onClose}>Konfirmasi</Button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}
