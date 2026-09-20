"use client";

import { useAnalysisStore } from "@/store/useAnalysisStore";
import { ShieldAlert, ShieldCheck, AlertTriangle, X } from "lucide-react";

export default function DetectionResultCard() {
  const { result, setResult } = useAnalysisStore();

  // Jika tidak ada hasil analisis, jangan render apa pun
  if (!result) return null;

  // Logika dinamis untuk menentukan warna dan ikon berdasarkan level risiko
  const getTheme = (level: string) => {
    switch (level) {
      case "HIGH_RISK":
        return {
          color: "text-red-700",
          bgColor: "bg-red-50",
          borderColor: "border-red-200",
          icon: <ShieldAlert className="h-10 w-10 text-red-600" />,
          label: "Bahaya: Terindikasi Penipuan",
        };
      case "SAFE":
        return {
          color: "text-green-700",
          bgColor: "bg-green-50",
          borderColor: "border-green-200",
          icon: <ShieldCheck className="h-10 w-10 text-green-600" />,
          label: "Aman: Tidak Ditemukan Ancaman",
        };
      default: 
        return {
          color: "text-amber-700",
          bgColor: "bg-amber-50",
          borderColor: "border-amber-200",
          icon: <AlertTriangle className="h-10 w-10 text-amber-600" />,
          label: "Peringatan: Pesan Mencurigakan",
        };
    }
  };

  const theme = getTheme(result.riskLevel);

  return (
    <div 
      className={`relative w-full mt-6 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out rounded-2xl border ${theme.borderColor} ${theme.bgColor} p-6 shadow-sm font-[family-name:var(--font-poppins)]`}
      role="alert"
      aria-live="assertive"
    >
      {/* Tombol Tutup (Reset State) */}
      <button
        onClick={() => setResult(null)}
        className="absolute right-4 top-4 rounded-full p-1.5 text-gray-400 transition-colors hover:bg-black/5 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
        aria-label="Tutup hasil analisis"
      >
        <X size={20} />
      </button>

      <div className="flex flex-col sm:flex-row gap-5 items-start">
        <div className="shrink-0 p-2 bg-white rounded-full shadow-sm border border-black/5">
          {theme.icon}
        </div>
        
        <div className="flex-1 w-full">
          <h3 className={`text-xl font-bold tracking-tight ${theme.color}`}>
            {theme.label}
          </h3>
          <p className="mt-1 text-base font-medium text-gray-800">
            {result.message}
          </p>
          
          <div className="mt-5 rounded-xl border border-white/60 bg-white/60 p-4 backdrop-blur-md shadow-inner">
            <p className="mb-2 text-xs font-bold text-gray-500 uppercase tracking-wider">
              Teks yang Dianalisis:
            </p>
            {/* Mengganti font-mono dengan font-poppins */}
            <p className="text-sm text-gray-700 font-[family-name:var(--font-poppins)] break-words">
              `{result.analyzedText}`
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}