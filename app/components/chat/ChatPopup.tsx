"use client";

import { useState, useEffect } from "react";

const ChatPopup = () => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<null | "loading" | "sent" | "error">(null);
  const [user, setUser] = useState<{ id: number; username: string } | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleSend = async () => {
    if (!user) {
      alert("Harap login terlebih dahulu.");
      return;
    }

    if (!message.trim() || !subject.trim()) return;
    setStatus("loading");

    try {
      const res = await fetch("/api/send-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject,
          message,
          user_id: user.id, // kirim user_id ke API kalau dibutuhkan
        }),
      });

      if (res.ok) {
        setStatus("sent");
        setSubject("");
        setMessage("");
        setTimeout(() => setStatus(null), 2000);
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {open ? (
        <div className="bg-white shadow-lg rounded-lg p-4 w-64">
          <input
            type="text"
            className="w-full p-2 border rounded text-black mb-2"
            placeholder="Subjek pesan"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
          <textarea
            className="w-full p-2 border rounded resize-none text-black"
            rows={3}
            placeholder="Ketik pesan untuk admin..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <div className="flex justify-between items-center mt-2">
            <button
              onClick={handleSend}
              style={{ backgroundColor: "#FED34E" }}
              className="text-black px-3 py-1 rounded text-sm"
              disabled={status === "loading"}
            >
              {status === "loading" ? "Mengirim..." : "Kirim"}
            </button>
            <button
              onClick={() => setOpen(false)}
              className="text-gray-500 text-sm"
            >
              Tutup
            </button>
          </div>
          {status === "sent" && <p className="text-green-600 text-sm mt-1">Terkirim!</p>}
          {status === "error" && <p className="text-red-600 text-sm mt-1">Gagal mengirim</p>}
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          style={{ backgroundColor: "#FED34E" }}
          className="text-black px-4 py-2 rounded-full shadow-lg"
        >
          Kirim Pesan
        </button>
      )}
    </div>
  );
};

export default ChatPopup;
