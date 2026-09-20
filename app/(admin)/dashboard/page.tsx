"use client";

import { useState } from "react";

type StatItem = {
  aman: number;
  waspada: number;
  bahaya: number;
  chart: number[];
};

type StatsMap = {
  [key: string]: StatItem;
};

export default function DashboardAdminPage() {
  const [selectedMonth, setSelectedMonth] = useState("Januari");

  const statsData: StatsMap = {
    Januari: { aman: 75, waspada: 12, bahaya: 80, chart: [40, 65, 85, 50, 95] },
    Februari: { aman: 60, waspada: 10, bahaya: 70, chart: [30, 50, 75, 45, 80] },
    Maret: { aman: 80, waspada: 13, bahaya: 90, chart: [50, 70, 90, 60, 100] },
  };

  const current: StatItem = statsData[selectedMonth]!;

  return (
    <div className="w-full space-y-8">
      <h1 className="text-3xl font-extrabold tracking-tight text-[#0C134F] dark:text-white">Dashboard</h1>

      {/* 3 KARTU STATISTIK */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-[#1F2937] p-6 rounded-3xl border-2 border-emerald-400 shadow-sm">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Total Pesan SMS</p>
          <h3 className="text-2xl font-extrabold text-emerald-500 mb-1">Aman</h3>
          <p className="text-3xl font-black text-gray-800 dark:text-white">{current.aman}</p>
        </div>

        <div className="bg-white dark:bg-[#1F2937] p-6 rounded-3xl border-2 border-amber-400 shadow-sm">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Total Pesan SMS</p>
          <h3 className="text-2xl font-extrabold text-amber-500 mb-1">Waspada</h3>
          <p className="text-3xl font-black text-gray-800 dark:text-white">{current.waspada}</p>
        </div>

        <div className="bg-white dark:bg-[#1F2937] p-6 rounded-3xl border-2 border-rose-400 shadow-sm">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Total Pesan SMS</p>
          <h3 className="text-2xl font-extrabold text-rose-500 mb-1">Berbahaya</h3>
          <p className="text-3xl font-black text-gray-800 dark:text-white">{current.bahaya}</p>
        </div>
      </div>

      {/* KOTAK GRAFIK STATISTIK */}
      <div className="bg-white dark:bg-[#1F2937] p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Total Pendeteksi SMS</h2>
          
          <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 p-1.5 rounded-2xl">
            <span className="text-xs font-bold px-3 py-1.5 bg-white dark:bg-gray-700 text-gray-800 dark:text-white rounded-xl shadow-sm">2026</span>
            {["Januari", "Februari", "Maret"].map((month) => (
              <button
                key={month}
                onClick={() => setSelectedMonth(month)}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedMonth === month
                    ? "bg-[#0C134F] dark:bg-blue-600 text-white shadow-md"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                {month}
              </button>
            ))}
          </div>
        </div>

        <div className="h-64 flex items-end justify-between gap-4 pt-8 px-4 border-b border-gray-100 dark:border-gray-800 relative">
          <div className="absolute inset-x-0 top-0 border-t border-dashed border-gray-200 dark:border-gray-700"></div>
          <div className="absolute inset-x-0 top-1/2 border-t border-dashed border-gray-200 dark:border-gray-700"></div>

          {current.chart.map((val: number, idx: number) => (
            <div key={idx} className="w-full flex flex-col items-center gap-3 h-full justify-end z-10 group">
              <div 
                className="w-full max-w-[60px] bg-[#3B82F6] dark:bg-blue-500 rounded-t-xl transition-all duration-500 group-hover:bg-blue-600 shadow-lg relative"
                style={{ height: `${val}%` }}
              >
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] font-bold py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {val} Kasus
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between px-4 pt-4 text-xs font-bold text-gray-400 uppercase tracking-widest">
          <span>Minggu 1</span>
          <span>Minggu 2</span>
          <span>Minggu 3</span>
          <span>Minggu 4</span>
          <span>Minggu 5</span>
        </div>
      </div>
    </div>
  );
}