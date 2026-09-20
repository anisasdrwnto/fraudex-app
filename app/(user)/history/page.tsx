"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { MessageSquareOff, ArrowLeft, Trash2, ShieldAlert, ShieldCheck } from "lucide-react";

interface HistoryItem {
  id: number;
  sms: string;
  status: string;
  date: string;
}

export default function HistoryPage() {
  const [historyList, setHistoryList] = useState<HistoryItem[]>([]);

  // Ambil data riwayat dari localStorage saat halaman dimuat
  useEffect(() => {
    const savedHistory = localStorage.getItem("fraudex_sms_history");
    if (savedHistory) {
      try {
        setHistoryList(JSON.parse(savedHistory) as HistoryItem[]);
      } catch (e) {
        console.error("Gagal memparsing data history:", e);
      }
    }
  }, []);

  const handleClearHistory = () => {
    localStorage.removeItem("fraudex_sms_history");
    setHistoryList([]);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12 font-[family-name:var(--font-poppins)]">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <Link href="/" className="inline-flex items-center text-sm font-semibold text-[#1D267D] hover:underline">
              <ArrowLeft size={16} className="mr-2" />
              Kembali ke Beranda
            </Link>
            <h1 className="mt-4 text-3xl font-extrabold text-[#0C134F]">Riwayat Pengecekan</h1>
            <p className="mt-2 text-gray-600">Lihat kembali pesan SMS yang pernah Anda periksa keamanannya.</p>
          </div>

          {historyList.length > 0 && (
            <button
              onClick={handleClearHistory}
              className="flex items-center gap-2 rounded-xl bg-red-100 px-4 py-2.5 text-sm font-bold text-red-600 transition hover:bg-red-200"
            >
              <Trash2 size={16} /> Hapus Riwayat
            </button>
          )}
        </div>

        {historyList.length === 0 ? (
          <div className="mt-12 flex flex-col items-center justify-center rounded-3xl border border-dashed border-gray-300 bg-white p-16 text-center shadow-sm">
            <div className="rounded-full bg-[#EEF2FA] p-6 text-[#1D267D]">
              <MessageSquareOff size={48} />
            </div>
            <h2 className="mt-6 text-xl font-bold text-gray-800">Riwayat Kosong</h2>
            <p className="mt-2 text-gray-500">Anda belum mengecek SMS apapun.</p>
            <Link 
              href="/" 
              className="mt-8 rounded-xl bg-[#0C134F] px-8 py-3 text-sm font-bold text-white shadow-md transition hover:bg-[#151f6e]"
            >
              Cek SMS Sekarang
            </Link>
          </div>
        ) : (
          <div className="space-y-4 mt-6">
            {historyList.map((item) => {
              const isDanger = item.status?.toLowerCase().includes("berbahaya") || item.status?.toLowerCase().includes("penipuan");
              return (
                <div 
                  key={item.id} 
                  className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition hover:shadow-md"
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-3">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${
                        isDanger ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"
                      }`}>
                        {isDanger ? <ShieldAlert size={14} /> : <ShieldCheck size={14} />}
                        {item.status}
                      </span>
                      <span className="text-xs text-gray-400">{item.date}</span>
                    </div>
                    <p className="text-gray-800 text-sm bg-gray-50 p-3 rounded-xl border border-gray-100 italic">
                      &ldquo;{item.sms}&rdquo;
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}