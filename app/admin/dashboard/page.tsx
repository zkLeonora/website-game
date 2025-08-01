"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter, usePathname } from "next/navigation";
import TransactionBarChart from './transaksi-chart';
import clsx from "clsx";
import Link from "next/link";

type TimelineItem = {
  type: string;
  username: string;
  tanggal: string;
  message: string;
  game?: string;
  harga?: number;
};

export default function AdminDashboard() {
  const router = useRouter();
  const pathname = usePathname();
  const [admin, setAdmin] = useState<{ username: string } | null>(null);
  const [timeline, setTimeline] = useState<TimelineItem[]>([]);
  const [activePage, setActivePage] = useState("dashboard");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedMetode, setEditedMetode] = useState("");



  useEffect(() => {
    const adminData = localStorage.getItem("admin");
    if (!adminData) {
      router.push("/admin");
    } else {
      setAdmin(JSON.parse(adminData));
    }
  }, [router]);

  useEffect(() => {
    const fetchTimeline = async () => {
      try {
        const res = await fetch("/api/admin/aktivitas");
        const data = await res.json();
        setTimeline(data);
      } catch (err) {
        console.error("Gagal memuat timeline:", err);
      }
    };

    fetchTimeline();
  }, []);

  // Gunakan useMemo agar dihitung ulang setelah timeline berubah
  const [totalPendapatan, setTotalPendapatan] = useState(0);

  useEffect(() => {
    const fetchPendapatan = async () => {
      try {
        const res = await fetch('/api/pendapatan');
        const data = await res.json();
        setTotalPendapatan(data.total);
      } catch (err) {
        console.error('Gagal mengambil total pendapatan:', err);
      }
    };

    fetchPendapatan();
  }, []);


  const navLinks = [
    { label: "Dashboard", key: "dashboard" },
    { label: "Data User", key: "data-user" },
    { label: "Transaksi", key: "data-transaksi" },
    { label: "Informasi Game", key: "game" },
    { label: "Pesan User", key: "pesan-user" },
  ];

  const [users, setUsers] = useState([]);
  const [pesanUser, setPesanUser] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/users");
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error("Gagal mengambil data user:", err);
      }
    };

    if (activePage === "data-user") {
      fetchUsers();
    }
  }, [activePage]);

  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await fetch("/api/transaksi");
        const data = await res.json();
        setTransactions(data);
      } catch (err) {
        console.error("Gagal mengambil data transaksi:", err);
      }
    };

    if (activePage === "data-transaksi") {
      fetchTransactions();
    }
  }, [activePage]);


  const [games, setGames] = useState([]);

useEffect(() => {
  const fetchGames = async () => {
    try {
      const res = await fetch("/api/games");
      const data = await res.json();
      setGames(data);
    } catch (err) {
      console.error("Gagal mengambil data game:", err);
    }
  };

  if (activePage === "game") {
    fetchGames();
  }
}, [activePage]);

useEffect(() => {
  const fetchPesan = async () => {
    try {
      const res = await fetch("/api/admin/pesan");
      const data = await res.json();
      setPesanUser(data);
    } catch (err) {
      console.error("Gagal mengambil pesan user:", err);
    }
  };

  if (activePage === "pesan-user") {
    fetchPesan();
  }
}, [activePage]);

useEffect(() => {
  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/admin/users");
      const data = await res.json();
      setUsers(data); // pastikan setUsers berasal dari useState
    } catch (error) {
      console.error("Gagal fetch users:", error);
    }
  };

  fetchUsers();
}, []);

const handleEditStatus = async (id: number, currentStatus: string) => {
  const newStatus = prompt("Ubah status transaksi:", currentStatus);
  if (!newStatus || newStatus === currentStatus) return;

  const res = await fetch("/api/admin/update-status", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, status: newStatus }),
  });

  if (res.ok) {
    alert("Status berhasil diperbarui!");
    // Reload data transaksi
  } else {
    alert("Gagal memperbarui status.");
  }
};

const [showSendMessageModal, setShowSendMessageModal] = useState(false);
const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
const [adminSubject, setAdminSubject] = useState("");
const [adminMessage, setAdminMessage] = useState("");
const [sending, setSending] = useState(false);
const [sendSuccess, setSendSuccess] = useState<boolean | null>(null);


  return (
    <div className="flex h-screen bg-[#171628] text-white">
      {/* Sidebar */}
      <aside className="w-64 p-6 flex flex-col justify-between bg-[#1f1e33] overflow-y-hidden">
        <div>
          <h2 className="text-2xl font-bold mb-6 text-red-500">Admin Panel</h2>
          <nav className="space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.key}
                onClick={() => setActivePage(link.key)}
                className={clsx(
                  "w-full text-left block px-4 py-2 rounded transition",
                  activePage === link.key
                    ? "bg-red-600 text-white"
                    : "hover:bg-red-800 hover:text-white text-red-300"
                )}
              >
                {link.label}
              </button>
            ))}
          </nav>
        </div>
        <button
          onClick={() => {
            localStorage.removeItem("admin");
            router.push("/admin");
          }}
          className="bg-red-500 hover:bg-red-600 py-2 px-4 rounded text-white"
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto scrollbar-hide">
        <h1 className="text-3xl font-bold mb-4 text-white">
          Selamat datang, <span className="text-red-400">{admin?.username}</span> 👋
        </h1>

        {activePage === "dashboard" && (
          <>
            {/* Timeline dan Chart */}
            <div className="flex gap-6">
              {/* Timeline */}
              <div className="rounded-lg p-6 shadow-lg text-white w-full border-2 border-white bg-[#1f1e33] flex-1 h-[500px] overflow-y-auto">
                <div className="w-full max-w-3xl mx-auto text-left">
                  <h2 className="text-2xl font-bold text-white text-center mb-8">Aktivitas Terbaru</h2>
                  <ol className="relative border-l border-gray-200 dark:border-gray-700">
                    {timeline.map((item, index) => (
                      <li key={index} className="mb-10 ml-6">
                        <span className="absolute w-3 h-3 bg-red-500 rounded-full -left-1.5 border border-white"></span>
                        <h3 className="flex items-center mb-1 text-lg font-semibold text-white capitalize">
                          {item.type === "register" ? "Pengguna Baru" : "Transaksi"}
                          <span className="bg-red-100 text-red-800 text-xs font-medium ml-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-white">
                            {item.type}
                          </span>
                        </h3>
                        <time className="block mb-2 text-sm text-gray-400">
                          {new Date(item.tanggal).toLocaleString("id-ID", {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })} WIB
                        </time>
                        <p className="text-base text-gray-300">{item.message}</p>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              {/* Chart */}
              <div className="rounded-lg p-4 shadow-lg flex items-center justify-center text-center w-full border-2 border-white bg-[#1f1e33] flex-1 h-[500px]">
                <div>
                  <TransactionBarChart />
                </div>
              </div>
            </div>

            {/* Total Pendapatan */}
            <div className="mt-6 rounded-lg p-6 shadow bg-[#1f1e33] border-2 border-white w-full text-center">
              <h2 className="text-2xl font-semibold text-white mb-2">Total Pendapatan</h2>
              <p>
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 0,
                }).format(totalPendapatan)}
              </p>
            </div>
          </>
        )}

        {activePage === "data-user" && (
          <div className="p-6 bg-[#1f1e33] border-2 border-white rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Data User</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-white text-white">
                <thead className="bg-[#2a2940]">
                  <tr>
                    <th className="border p-2">ID</th>
                    <th className="border p-2">Username</th>
                    <th className="border p-2">Email</th>
                    <th className="border p-2">Dibuat</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user: any) => (
                    <tr key={user.id} className="hover:bg-[#3a3955]">
                      <td className="border p-2">{user.id}</td>
                      <td className="border p-2">{user.username}</td>
                      <td className="border p-2">{user.email}</td>
                      <td className="border p-2">
                        {new Date(user.created_at).toLocaleString("id-ID")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {activePage === "pesan-user" && (
          <div className="p-6 bg-[#1f1e33] border-2 border-white rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Pesan dari User</h2>
            <div className="mb-4 flex justify-end">
              <button
                onClick={() => setShowSendMessageModal(true)}
                className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-300"
              >
                Kirim Pesan ke User
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-white text-white">
                <thead className="bg-[#2a2940]">
                  <tr>
                    <th className="border p-2">ID</th>
                    <th className="border p-2">Username</th>
                    <th className="border p-2">Subjek</th>
                    <th className="border p-2">Pesan</th>
                    <th className="border p-2">Tanggal</th>
                  </tr>
                </thead>
                <tbody>
                  {pesanUser.map((pesan: any) => (
                    <tr key={pesan.id} className="hover:bg-[#3a3955]">
                      <td className="border p-2">{pesan.id}</td>
                      <td className="border p-2">{pesan.username}</td>
                      <td className="border p-2">{pesan.subjek}</td>
                      <td className="border p-2">{pesan.pesan}</td>
                      <td className="border p-2">
                        {new Date(pesan.created_at).toLocaleString("id-ID")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {showSendMessageModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white text-black p-6 rounded-lg shadow-lg w-96">
                    <h3 className="text-xl font-semibold mb-4">Kirim Pesan ke User</h3>
                    
                    <label className="block mb-2 text-sm font-medium">Pilih User</label>
                    <select
                      className="w-full border border-gray-300 rounded p-2 mb-4"
                      value={selectedUserId || ""}
                      onChange={(e) => setSelectedUserId(Number(e.target.value))}
                    >
                      <option value="">-- Pilih User --</option>
                      {users.map((user: any) => (
                        <option key={user.id} value={user.id}>
                          {user.username}
                        </option>
                      ))}
                    </select>

                    <input
                      type="text"
                      placeholder="Subjek"
                      className="w-full border border-gray-300 rounded p-2 mb-2"
                      value={adminSubject}
                      onChange={(e) => setAdminSubject(e.target.value)}
                    />
                    <textarea
                      placeholder="Pesan"
                      rows={4}
                      className="w-full border border-gray-300 rounded p-2 mb-2"
                      value={adminMessage}
                      onChange={(e) => setAdminMessage(e.target.value)}
                    />
                    {sendSuccess === true && <p className="text-green-600 text-sm mb-2">Pesan terkirim!</p>}
                    {sendSuccess === false && <p className="text-red-600 text-sm mb-2">Gagal mengirim pesan</p>}
                    
                    <div className="flex justify-end gap-2 mt-4">
                      <button
                        onClick={() => setShowSendMessageModal(false)}
                        className="px-4 py-2 rounded bg-gray-400 text-white"
                      >
                        Batal
                      </button>
                      <button
                        onClick={async () => {
                          if (!selectedUserId || !adminSubject.trim() || !adminMessage.trim()) return;
                          setSending(true);
                          try {
                            const res = await fetch("/api/admin/kirim-pesan", {
                              method: "POST",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify({
                                user_id: selectedUserId,
                                subject: adminSubject,
                                message: adminMessage,
                              }),
                            });
                            if (res.ok) {
                              setSendSuccess(true);
                              setAdminSubject("");
                              setAdminMessage("");
                              setSelectedUserId(null);
                            } else {
                              setSendSuccess(false);
                            }
                          } catch (e) {
                            setSendSuccess(false);
                          } finally {
                            setSending(false);
                            setTimeout(() => setSendSuccess(null), 3000);
                          }
                        }}
                        disabled={sending}
                        className="px-4 py-2 rounded bg-yellow-500 hover:bg-yellow-400 text-black"
                      >
                        {sending ? "Mengirim..." : "Kirim"}
                      </button>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

        {activePage === "data-transaksi" && (
          <div className="p-6 bg-[#1f1e33] border-2 border-white rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Data Transaksi</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-white text-white">
                <thead className="bg-[#2a2940]">
                  <tr>
                    <th className="border p-2">ID</th>
                    <th className="border p-2">Username</th>
                    <th className="border p-2">Nama Game</th>
                    <th className="border p-2">Metode</th>
                    <th className="border p-2">Status</th>
                    <th className="border p-2">Tanggal</th>
                    <th className="border p-2">Aksi</th> 
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((trx: any) => (
                    <tr key={trx.id} className="hover:bg-[#3a3955]">
                      <td className="border p-2">{trx.id}</td>
                      <td className="border p-2">{trx.username}</td>
                      <td className="border p-2">{trx.nama_game}</td>
                      <td className="border p-2">{trx.metode_pembayaran}</td>
                      <td className="border p-2">{trx.status}</td>
                      <td className="border p-2">
                        {new Date(trx.tanggal_transaksi).toLocaleString("id-ID")}
                      </td>
                      <td className="border p-2">
                        <button
                          className="bg-red-500 hover:bg-yellow-600 text-white px-2 py-1 rounded"
                          onClick={() => handleEditStatus(trx.id, trx.status)}
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          </div>
        )}

        {activePage === "game" && (
          <div className="p-6 bg-[#1f1e33] border-2 border-white rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Informasi Game</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-white text-white">
                <thead className="bg-[#2a2940]">
                  <tr>
                    <th className="border p-2">ID</th>
                    <th className="border p-2">Nama Game</th>
                    <th className="border p-2">Harga</th>
                    <th className="border p-2">Versi</th>
                    <th className="border p-2">Tanggal Rilis</th>
                    <th className="border p-2">Link Download</th>
                  </tr>
                </thead>
                <tbody>
                  {games.map((game: any) => (
                    <tr key={game.id} className="hover:bg-[#3a3955]">
                      <td className="border p-2">{game.id}</td>
                      <td className="border p-2">{game.nama_game}</td>
                      <td className="border p-2">
                        {new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                          minimumFractionDigits: 0,
                        }).format(game.harga)}
                      </td>
                      <td className="border p-2">{game.versi}</td>
                      <td className="border p-2">
                        {new Date(game.tanggal_rilis).toLocaleDateString("id-ID", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        })}
                      </td>
                      <td className="border p-2">
                        <a
                          href={game.link_download}
                          download
                          className="text-blue-400 underline"
                        >
                          Download
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
