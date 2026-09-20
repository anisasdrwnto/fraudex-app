"use client";

import { useState, useEffect } from "react";
import { CheckCircle, XCircle, X } from "lucide-react";

type ReportData = {
  id: string;
  userName: string;
  smsContent: string;
  systemResult: "Aman" | "Waspada" | "Berbahaya";
  feedbackNote: string;
  date: string;
  status: "Menunggu" | "Disetujui" | "Ditolak";
  replyMessage?: string;
};

export default function ReportsManagementPage() {
  const [reports, setReports] = useState<ReportData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"acc" | "tolak">("acc");
  const [selectedReport, setSelectedReport] = useState<ReportData | null>(null);
  const [replyText, setReplyText] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      const saved = localStorage.getItem("fraudex_reports_db");
      if (saved) {
        setReports(JSON.parse(saved) as ReportData[]);
      } else {
        const dummy: ReportData[] = [
          { id: "FB001", userName: "Anisa S", smsContent: "Selamat! Anda menang...", systemResult: "Berbahaya", feedbackNote: "Terima kasih!", date: "27/08/2026", status: "Menunggu" },
          { id: "FB002", userName: "Daniel Y", smsContent: "Pengiriman paket...", systemResult: "Waspada", feedbackNote: "Seharusnya ini berbahaya", date: "27/08/2026", status: "Menunggu" },
        ];
        setReports(dummy);
        localStorage.setItem("fraudex_reports_db", JSON.stringify(dummy));
      }
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const saveToDB = (newData: ReportData[]) => {
    setReports(newData);
    localStorage.setItem("fraudex_reports_db", JSON.stringify(newData));
  };

  const openModal = (type: "acc" | "tolak", report: ReportData) => {
    setModalType(type);
    setSelectedReport(report);
    setReplyText("");
    setIsModalOpen(true);
  };

  const handleAction = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedReport) {
      const updated = reports.map((r) =>
        r.id === selectedReport.id
          ? {
              ...r,
              status: modalType === "acc" ? "Disetujui" : "Ditolak",
              replyMessage: replyText,
            }
          : r
      );
      saveToDB(updated as ReportData[]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="w-full">
      <h1 className="text-3xl font-extrabold text-[#0C134F] dark:text-white mb-8">Manajemen Laporan Pengguna</h1>

      <div className="bg-white dark:bg-[#1F2937] rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap min-w-max">
          <thead className="bg-white dark:bg-[#1F2937] border-b border-gray-100 dark:border-gray-800 text-gray-700 dark:text-gray-300 font-bold">
            <tr>
              <th className="px-6 py-4">ID Feedback</th>
              <th className="px-6 py-4">Nama Pengguna</th>
              <th className="px-6 py-4">SMS terkait</th>
              <th className="px-6 py-4">Hasil Sistem</th>
              <th className="px-6 py-4">Catatan Feedback</th>
              <th className="px-6 py-4">Tanggal Kirim</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 dark:divide-gray-800 text-gray-600 dark:text-gray-300 font-medium">
            {reports.map((report) => (
              <tr key={report.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors">
                <td className="px-6 py-4">{report.id}</td>
                <td className="px-6 py-4">{report.userName}</td>
                <td className="px-6 py-4 truncate max-w-[150px]">{report.smsContent}</td>
                <td className="px-6 py-4">
                  <span className={`${
                    report.systemResult === "Berbahaya" ? "text-red-500 font-bold" :
                    report.systemResult === "Waspada" ? "text-orange-500 font-bold" : "text-green-500 font-bold"
                  }`}>{report.systemResult}</span>
                </td>
                <td className="px-6 py-4 truncate max-w-[150px]">{report.feedbackNote}</td>
                <td className="px-6 py-4">{report.date}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    report.status === "Menunggu" ? "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300" :
                    report.status === "Disetujui" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                  }`}>
                    {report.status}
                  </span>
                </td>
                <td className="px-6 py-4 flex justify-center gap-2">
                  <button 
                    onClick={() => openModal("acc", report)} 
                    disabled={report.status !== "Menunggu"}
                    className={`p-1.5 border border-gray-200 dark:border-gray-700 rounded-md transition ${report.status === "Menunggu" ? "bg-white dark:bg-gray-800 text-green-500 hover:bg-green-50" : "bg-gray-100 dark:bg-gray-900 text-gray-400 cursor-not-allowed"}`}
                    title="Setujui (Acc)"
                  >
                    <CheckCircle size={18} />
                  </button>
                  <button 
                    onClick={() => openModal("tolak", report)}
                    disabled={report.status !== "Menunggu"} 
                    className={`p-1.5 border border-gray-200 dark:border-gray-700 rounded-md transition ${report.status === "Menunggu" ? "bg-white dark:bg-gray-800 text-red-500 hover:bg-red-50" : "bg-gray-100 dark:bg-gray-900 text-gray-400 cursor-not-allowed"}`}
                    title="Tolak"
                  >
                    <XCircle size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && selectedReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-4">
          <div className="bg-white dark:bg-[#1F2937] text-gray-900 dark:text-white w-full max-w-md rounded-3xl shadow-2xl p-6 relative">
            <button onClick={() => setIsModalOpen(false)} className="absolute right-6 top-6 text-gray-400 hover:text-gray-700">
              <X size={24} />
            </button>
            
            <h2 className="text-2xl font-bold text-[#0C134F] dark:text-white mb-2">
              {modalType === "acc" ? "Setujui Laporan" : "Tolak Laporan"}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Laporan dari: {selectedReport.userName}</p>

            <form onSubmit={handleAction} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                  Balasan untuk Pengguna (Opsional)
                </label>
                <textarea 
                  value={replyText} 
                  onChange={(e) => setReplyText(e.target.value)} 
                  className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#0C134F] resize-none h-28" 
                  placeholder="Ketik balasan..." 
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 mt-6 border-t border-gray-100 dark:border-gray-800">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2.5 rounded-full text-sm font-bold text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800">
                  Batal
                </button>
                <button type="submit" className={`px-6 py-2.5 rounded-full text-sm font-bold text-white shadow-md ${modalType === "acc" ? "bg-green-600" : "bg-red-600"}`}>
                  {modalType === "acc" ? "Acc Laporan" : "Tolak Laporan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}