'use client';

import Image from 'next/image';
import { useState } from 'react';
import ModalCheckout from '../home/components/checkoutmodal/checkoutmodal';

const paymentMethods = [
  { name: 'Gopay', icon: '/images/gopay.png', note: '' },
  { name: 'DANA', icon: '/images/dana.jpg', note: '' },
  { name: 'OVO', icon: '/images/ovo.jpg', note: '' },
  { name: 'ATM/Bank Transfer', icon: '/images/bank.png', note: 'Transfer antar bank 1x24 jam' },
];

const bankOptions = ['BCA'];

export default function TransaksiPage() {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [selectedBank, setSelectedBank] = useState<string | null>(null);
  const [agree, setAgree] = useState(false);
  const [showModal, setShowModal] = useState(false);

const handlePlaceOrder = () => {
  if (!agree) return alert('Harap menyetujui syarat.');
  if (!selectedMethod) return alert('Pilih metode pembayaran terlebih dahulu.');
  if (selectedMethod === 'ATM/Bank Transfer' && !selectedBank) {
    return alert('Pilih bank terlebih dahulu.');
  }

  setShowModal(true); // tampilkan modal
};


  return (
    <main className="min-h-screen w-full bg-[#0d0d0d] text-white flex flex-col lg:flex-row justify-center p-4 gap-6">
      {/* Left: Payment Methods */}
      <div className="flex-1 max-w-3xl bg-[#1a1a1a] p-6 rounded-md">
        <h2 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">CHECKOUT</h2>
        <div className="mb-4">
          <p className="font-medium text-gray-300 mb-2">PAYMENT METHODS</p>
          <div className="space-y-3">
            {paymentMethods.map((method) => (
              <div key={method.name}>
                <label
                  className="flex items-center gap-4 p-3 rounded-md cursor-pointer border border-gray-700 hover:border-blue-500 transition"
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={selectedMethod === method.name}
                    onChange={() => {
                      setSelectedMethod(method.name);
                      setSelectedBank(null); // Reset bank selection
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

                {/* Tampilkan dropdown jika ATM/Bank Transfer dipilih */}
                {method.name === 'ATM/Bank Transfer' &&
                  selectedMethod === 'ATM/Bank Transfer' && (
                    <div className="mt-2 ml-12">
                      <label className="block text-sm mb-1 text-gray-300">
                        Pilih Bank:
                      </label>
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

      {/* Right: Order Summary */}
      <div className="w-full lg:w-[400px] bg-[#1a1a1a] p-6 rounded-md">
        <h2 className="text-lg font-semibold mb-4">ORDER SUMMARY</h2>

        <div className="flex items-center mb-4">
          <Image
            src="/images/logo.png"
            alt="Leyndell"
            width={80}
            height={100}
            className="rounded-md"
          />
          <div className="ml-4 text-sm">
            <p className="font-semibold">Leyndell</p>
            <p className="text-gray-400">ZK Games Studio</p>
            <p className="text-sm text-white mt-2">IDR 50.000</p>
          </div>
        </div>

        <div className="text-sm border-t border-gray-700 pt-4 space-y-2">
          <div className="flex justify-between">
            <span>Price</span>
            <span>IDR 50.000</span>
          </div>
          <div className="flex justify-between text-green-400">
            <span>Discount</span>
            <span>-IDR 20.000</span>
          </div>
          <div className="flex justify-between font-bold border-t border-gray-700 pt-2">
            <span>Total</span>
            <span>IDR 30.000</span>
          </div>
        </div>

        {/* Email Agreement */}
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

        <button
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
          onClick={handlePlaceOrder}
        >
          PLACE ORDER
        </button>
        <ModalCheckout
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            order={{
                itemName: 'Leyndell',
                quantity: 1,
                bonus: 0,
                nickname: '1 only',
                userId: '52797843(2085)',
                method: selectedMethod ?? '',
                price: 76000,
                tax: 8360,
            }}
            />
      </div>
    </main>
  );
}
