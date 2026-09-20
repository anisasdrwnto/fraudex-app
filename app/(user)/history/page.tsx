"use client";

import Link from "next/link";
import { MessageSquareOff, ArrowLeft } from "lucide-react";

export default function HistoryPage() {
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
        </div>

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
      </div>
    </div>
  );
}