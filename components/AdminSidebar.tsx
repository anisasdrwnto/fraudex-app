"use client";

import { useState, useEffect } from "react";
import { Edit, Trash2, X, Plus } from "lucide-react";

type UserData = {
  id: string;
  name: string;
  email: string;
  role: string;
  date: string;
};

export default function UsersManagementPage() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"add" | "edit" | "delete">("add");
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);

  // Form State
  const [formData, setFormData] = useState({ name: "", email: "", role: "USER" });

  // Load data awal dari LocalStorage (Simulasi DB)
  useEffect(() => {
    const timer = setTimeout(() => {
      const saved = localStorage.getItem("fraudex_users_db");
      if (saved) {
        setUsers(JSON.parse(saved) as UserData[]); 
      } else {
        const dummy: UserData[] = [
          { id: "USR001", name: "Anisa S", email: "ans123@gmail.com", role: "USER", date: "27/08/2026" },
          { id: "USR002", name: "Daniel Y", email: "daniely15@gmail.com", role: "USER", date: "27/08/2026" },
        ];
        setUsers(dummy);
        localStorage.setItem("fraudex_users_db", JSON.stringify(dummy));
      }
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  const saveToDB = (newData: UserData[]) => {
    setUsers(newData);
    localStorage.setItem("fraudex_users_db", JSON.stringify(newData));
  };

  const openModal = (type: "add" | "edit" | "delete", user?: UserData) => {
    setModalType(type);
    if (user) {
      setSelectedUser(user);
      setFormData({ name: user.name, email: user.email, role: user.role });
    } else {
      setFormData({ name: "", email: "", role: "USER" });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (modalType === "add") {
      const newUser: UserData = {
        id: `USR00${users.length + 1}`,
        name: formData.name,
        email: formData.email,
        role: formData.role,
        date: new Date().toLocaleDateString("id-ID"),
      };
      saveToDB([...users, newUser]);
    } else if (modalType === "edit" && selectedUser) {
      const updated = users.map((u) =>
        u.id === selectedUser.id ? { ...u, name: formData.name, email: formData.email, role: formData.role } : u
      );
      saveToDB(updated);
    } else if (modalType === "delete" && selectedUser) {
      const filtered = users.filter((u) => u.id !== selectedUser.id);
      saveToDB(filtered);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-[#0C134F] dark:text-white">Manajemen Data Pengguna</h1>
        <button 
          onClick={() => openModal("add")}
          className="bg-[#0088FF] hover:bg-blue-600 text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-md transition-colors flex items-center gap-2"
        >
          <Plus size={18} /> Tambah Pengguna
        </button>
      </div>

      {/* Tabel Data dengan Dukungan Dark Mode */}
      <div className="bg-white dark:bg-[#1F2937] rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-white dark:bg-[#1F2937] border-b border-gray-100 dark:border-gray-800 text-gray-700 dark:text-gray-200 font-bold">
            <tr>
              <th className="px-6 py-4">ID Pengguna</th>
              <th className="px-6 py-4">Nama Pengguna</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Tanggal</th>
              <th className="px-6 py-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 dark:divide-gray-800 text-gray-600 dark:text-gray-300 font-medium">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors">
                <td className="px-6 py-4">{user.id}</td>
                <td className="px-6 py-4">{user.name}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{user.role}</td>
                <td className="px-6 py-4">{user.date}</td>
                <td className="px-6 py-4 flex justify-center gap-3">
                  <button onClick={() => openModal("edit", user)} className="text-gray-400 hover:text-blue-600 p-1 border border-gray-200 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800">
                    <Edit size={16} />
                  </button>
                  <button onClick={() => openModal("delete", user)} className="text-red-400 hover:text-red-600 p-1 border border-gray-200 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL MODERN (Tambah / Edit / Hapus) dengan Dark Mode */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-[#1F2937] w-full max-w-md rounded-3xl shadow-2xl p-6 relative animate-in zoom-in-95 duration-200 border border-gray-100 dark:border-gray-800">
            <button onClick={() => setIsModalOpen(false)} className="absolute right-6 top-6 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
              <X size={24} />
            </button>
            
            <h2 className="text-2xl font-bold text-[#0C134F] dark:text-white mb-6">
              {modalType === "add" ? "Tambah Pengguna Baru" : modalType === "edit" ? "Edit Data Pengguna" : "Hapus Pengguna"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {modalType !== "delete" ? (
                <>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5">Nama Lengkap</label>
                    <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#0C134F]" placeholder="Masukkan nama" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5">Email</label>
                    <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#0C134F]" placeholder="email@contoh.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5">Role</label>
                    <select value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#0C134F]">
                      <option value="USER">USER</option>
                      <option value="ADMIN">ADMIN</option>
                    </select>
                  </div>
                </>
              ) : (
                <p className="text-gray-600 dark:text-gray-300">Apakah Anda yakin ingin menghapus pengguna <span className="font-bold text-red-600 dark:text-red-400">{selectedUser?.name}</span>? Tindakan ini tidak dapat dibatalkan.</p>
              )}

              <div className="flex justify-end gap-3 pt-4 mt-6 border-t border-gray-100 dark:border-gray-800">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2.5 rounded-full text-sm font-bold text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700">
                  Batal
                </button>
                <button type="submit" className={`px-6 py-2.5 rounded-full text-sm font-bold text-white shadow-md ${modalType === "delete" ? "bg-red-600 hover:bg-red-700" : "bg-[#0C134F] hover:bg-[#151f6e]"}`}>
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