"use client";

import { useState, useEffect } from "react";
import { Edit, Trash2, X, Plus } from "lucide-react";

type KeywordData = {
  id: string;
  keyword: string;
  category: string;
  score: number;
  author: string;
  date: string;
};

export default function KeywordsManagementPage() {
  const [keywords, setKeywords] = useState<KeywordData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"add" | "edit" | "delete">("add");
  const [selectedKeyword, setSelectedKeyword] = useState<KeywordData | null>(null);

  // Form State
  const [formData, setFormData] = useState({ keyword: "", category: "Modus Penipuan Bank", score: 75 });

  useEffect(() => {
    const timer = setTimeout(() => {
      const saved = localStorage.getItem("fraudex_keywords_db");
      if (saved) {
        setKeywords(JSON.parse(saved) as KeywordData[]);
      } else {
        const dummy: KeywordData[] = [
          { id: "KK001", keyword: "Ada saldo di.....", category: "Modus Penipuan Bank", score: 70, author: "Angga", date: "27/08/2026" },
          { id: "KK002", keyword: "GQQq le HQTQ...", category: "Modus Phising", score: 89, author: "Raffa", date: "27/08/2026" },
        ];
        setKeywords(dummy);
        localStorage.setItem("fraudex_keywords_db", JSON.stringify(dummy));
      }
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const saveToDB = (newData: KeywordData[]) => {
    setKeywords(newData);
    localStorage.setItem("fraudex_keywords_db", JSON.stringify(newData));
  };

  const openModal = (type: "add" | "edit" | "delete", kw?: KeywordData) => {
    setModalType(type);
    if (kw) {
      setSelectedKeyword(kw);
      setFormData({ keyword: kw.keyword, category: kw.category, score: kw.score });
    } else {
      setFormData({ keyword: "", category: "Modus Penipuan Bank", score: 75 });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (modalType === "add") {
      const newKw: KeywordData = {
        id: `KK00${keywords.length + 1}`,
        keyword: formData.keyword,
        category: formData.category,
        score: Number(formData.score),
        author: "Admin Fraudex",
        date: new Date().toLocaleDateString("id-ID"),
      };
      saveToDB([...keywords, newKw]);
    } else if (modalType === "edit" && selectedKeyword) {
      const updated = keywords.map((k) =>
        k.id === selectedKeyword.id ? { ...k, keyword: formData.keyword, category: formData.category, score: Number(formData.score) } : k
      );
      saveToDB(updated);
    } else if (modalType === "delete" && selectedKeyword) {
      const filtered = keywords.filter((k) => k.id !== selectedKeyword.id);
      saveToDB(filtered);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-[#0C134F] dark:text-white">Manajemen Kata Kunci</h1>
        <button 
          onClick={() => openModal("add")}
          className="bg-[#0088FF] hover:bg-blue-600 text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-md transition-colors flex items-center gap-2"
        >
          <Plus size={18} /> Tambah Kata Kunci
        </button>
      </div>

      <div className="bg-white dark:bg-[#1F2937] rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap min-w-max">
          <thead className="bg-white dark:bg-[#1F2937] border-b border-gray-100 dark:border-gray-800 text-gray-700 dark:text-gray-300 font-bold">
            <tr>
              <th className="px-6 py-4">ID Kata Kunci</th>
              <th className="px-6 py-4">Kata Kunci</th>
              <th className="px-6 py-4">Kategori</th>
              <th className="px-6 py-4">Bobot Skor</th>
              <th className="px-6 py-4">Dikelola Oleh</th>
              <th className="px-6 py-4">Tanggal</th>
              <th className="px-6 py-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 dark:divide-gray-800 text-gray-600 dark:text-gray-300 font-medium">
            {keywords.map((kw) => (
              <tr key={kw.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors">
                <td className="px-6 py-4">{kw.id}</td>
                <td className="px-6 py-4 font-semibold text-gray-800 dark:text-white">{kw.keyword}</td>
                <td className="px-6 py-4 text-red-600 dark:text-red-400 font-bold">{kw.category}</td>
                <td className="px-6 py-4">{kw.score}</td>
                <td className="px-6 py-4">{kw.author}</td>
                <td className="px-6 py-4">{kw.date}</td>
                <td className="px-6 py-4 flex justify-center gap-2">
                  <button onClick={() => openModal("edit", kw)} className="p-1.5 border border-gray-200 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-400 dark:text-gray-300 hover:text-blue-600">
                    <Edit size={16} />
                  </button>
                  <button onClick={() => openModal("delete", kw)} className="p-1.5 border border-gray-200 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-red-400 hover:text-red-600">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-4">
          <div className="bg-white dark:bg-[#1F2937] text-gray-900 dark:text-white w-full max-w-md rounded-3xl shadow-2xl p-6 relative">
            <button onClick={() => setIsModalOpen(false)} className="absolute right-6 top-6 text-gray-400 hover:text-gray-700">
              <X size={24} />
            </button>
            
            <h2 className="text-2xl font-bold text-[#0C134F] dark:text-white mb-6">
              {modalType === "add" ? "Tambah Kata Kunci" : modalType === "edit" ? "Edit Kata Kunci" : "Hapus Kata Kunci"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {modalType !== "delete" ? (
                <>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5">Kata Kunci / Pola SMS</label>
                    <input type="text" required value={formData.keyword} onChange={(e) => setFormData({ ...formData, keyword: e.target.value })} className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#0C134F]" placeholder="Contoh: Menang hadiah..." />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5">Kategori Modus</label>
                    <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#0C134F]">
                      <option value="Modus Penipuan Bank">Modus Penipuan Bank</option>
                      <option value="Modus Phising">Modus Phising</option>
                      <option value="Modus Undian Berhadiah">Modus Undian Berhadiah</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5">Bobot Skor (0 - 100)</label>
                    <input type="number" required min="1" max="100" value={formData.score} onChange={(e) => setFormData({ ...formData, score: Number(e.target.value) })} className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#0C134F]" />
                  </div>
                </>
              ) : (
                <p className="text-gray-600 dark:text-gray-300">Apakah Anda yakin ingin menghapus kata kunci <span className="font-bold text-red-600">{selectedKeyword?.keyword}</span>?</p>
              )}

              <div className="flex justify-end gap-3 pt-4 mt-6 border-t border-gray-100 dark:border-gray-800">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2.5 rounded-full text-sm font-bold text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800">
                  Batal
                </button>
                <button type="submit" className={`px-6 py-2.5 rounded-full text-sm font-bold text-white shadow-md ${modalType === "delete" ? "bg-red-600" : "bg-[#0C134F]"}`}>
                  {modalType === "delete" ? "Ya, Hapus" : "Simpan Data"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}