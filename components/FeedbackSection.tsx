"use client";

import { useState } from "react";

export default function FeedbackSection() {
  const [selectedRating, setSelectedRating] = useState<string>("Good");
  const [selectedSms, setSelectedSms] = useState<string>("");
  const [reason, setReason] = useState<string>("");
  const [contactMe, setContactMe] = useState<boolean>(true);
  const [joinResearch, setJoinResearch] = useState<boolean>(false);

  const ratings = [
    { label: "Sangat Buruk", emoji: "😫" },
    { label: "Buruk", emoji: "🙁" },
    { label: "Biasa Saja", emoji: "😐" },
    { label: "Baik", emoji: "😊" },
    { label: "Luar Biasa", emoji: "😍" },
  ];

  const dummySmsList = [
    "SMS Penipuan Undian Berhadiah - 081234567890",
    "SMS OTP Bank Palsu - 089876543210",
    "SMS Pemberitahuan Paket Kurir - 085612345678",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      rating: selectedRating,
      smsTarget: selectedSms,
      reason,
      contactMe,
      joinResearch,
    });
    alert("Ulasan berhasil dikirim!");
  };

  return (
    <section 
    id="umpan-balik" 
    className="relative w-full bg-[#E3F2FD] py-24 px-6 md:px-12 flex justify-center"
    >
      <div className="w-full max-w-xl rounded-2xl bg-white p-8 shadow-xl border border-gray-100">
        <h3 className="text-2xl font-bold text-[#0C134F]">Berikan Ulasan</h3>
        <p className="mt-1 text-sm text-gray-600">
          Bagaimana pendapat Anda mengenai pengalaman pengecekan SMS di Fraudex?
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div>
            <div className="flex justify-between gap-2">
              {ratings.map((item) => {
                const isSelected = selectedRating === item.label;
                return (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => setSelectedRating(item.label)}
                    className={`flex flex-1 flex-col items-center rounded-xl border p-3 transition-all ${
                      isSelected
                        ? "border-blue-400 bg-blue-50/50 ring-2 ring-blue-400/20 shadow-sm"
                        : "border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    <span className="text-2xl">{item.emoji}</span>
                    <span className={`mt-2 text-[11px] font-medium text-center ${isSelected ? "text-blue-600 font-semibold" : "text-gray-600"}`}>
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1">
              Pilih SMS yang Ingin Anda Beri Masukan
            </label>
            <select
              value={selectedSms}
              onChange={(e) => setSelectedSms(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-800 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
              required
            >
              <option value="" disabled>-- Pilih SMS terkait --</option>
              {dummySmsList.map((sms, index) => (
                <option key={index} value={sms}>
                  {sms}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1">
              Apa alasan utama di balik penilaian Anda?
            </label>
            <textarea
              rows={3}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Tuliskan ulasan atau alasan kamu di sini..."
              className="w-full rounded-lg border border-gray-300 p-3 text-sm text-gray-800 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400 resize-none"
            />
          </div>

          <div className="space-y-2 pt-1">
            <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
              <input
                type="checkbox"
                checked={contactMe}
                onChange={(e) => setContactMe(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-blue-500 focus:ring-blue-400"
              />
              <span>Saya mungkin dihubungi terkait ulasan ini. <a href="#" className="text-blue-500 hover:underline">Kebijakan Privasi</a></span>
            </label>

            <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
              <input
                type="checkbox"
                checked={joinResearch}
                onChange={(e) => setJoinResearch(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-blue-500 focus:ring-blue-400"
              />
              <span>Saya ingin membantu peningkatan dengan bergabung dalam Grup Riset.</span>
            </label>
          </div>

          <div className="flex items-center justify-end pt-4 border-t border-gray-100">
            <button
              type="submit"
              className="rounded-lg bg-[#0C134F] px-6 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-[#4C7EFB] transition"
            >
              Kirim Ulasan
            </button>
          </div>

        </form>
      </div>
    </section>
  );
}