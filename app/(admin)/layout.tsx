"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, MessageSquare, Users, Key, Moon, Sun, LogOut, Menu, X, AlertTriangle } from "lucide-react";
import { signOut } from "next-auth/react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const savedTheme = localStorage.getItem("fraudex_admin_theme");
      if (savedTheme === "dark") {
        setIsDarkMode(true);
      }
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const toggleDarkMode = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem("fraudex_admin_theme", newTheme ? "dark" : "light");
  };

    const handleConfirmLogout = () => {
    // Hapus localStorage kustom jika ada
    localStorage.removeItem("fraudex_users_db");
    localStorage.removeItem("fraudex_admin_theme");

    // Panggil signOut dari NextAuth agar cookie sesi terhapus, 
    // lalu arahkan callbackUrl ke landing page "/"
    signOut({ callbackUrl: "/" });
    };

  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { name: "Manajemen Laporan Pengguna", icon: MessageSquare, path: "/dashboard/reports", badge: 1 },
    { name: "Manajemen Data Pengguna", icon: Users, path: "/dashboard/users" },
    { name: "Manajemen Kata Kunci", icon: Key, path: "/dashboard/keywords" },
  ];

  return (
    <div className={`flex min-h-screen font-[family-name:var(--font-poppins)] transition-colors duration-300 ${
      isDarkMode ? "dark bg-[#111827] text-white" : "bg-[#F8F9FA] text-gray-900"
    }`}>
      
      {/* HEADER MOBILE */}
      <div className={`md:hidden fixed top-0 left-0 right-0 h-16 z-20 flex items-center justify-between px-6 shadow-md ${
        isDarkMode ? "bg-[#1F2937] text-white" : "bg-[#0C134F] text-white"
      }`}>
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="Logo" width={28} height={28} className="object-contain" />
          <span className="text-3xl tracking-wider font-normal" style={{ fontFamily: "var(--font-jersey)" }}>Fraudex</span>
        </div>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 bg-white/10 rounded-md">
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isSidebarOpen && (
        <div className="md:hidden fixed inset-0 bg-black/50 z-30" onClick={() => setIsSidebarOpen(false)} />
      )}

      {/* SIDEBAR */}
      <aside className={`flex flex-col justify-between fixed h-full z-40 transition-transform duration-300 w-72 shadow-xl ${
        isDarkMode ? "bg-[#1F2937] text-white border-r border-gray-800" : "bg-[#0C134F] text-white"
      } ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>
        <div>
          <div className="p-8 flex items-center gap-3">
            <Image src="/logo.png" alt="Logo Fraudex" width={36} height={36} className="object-contain" />
            <span className="text-4xl tracking-wider font-normal pt-1" style={{ fontFamily: "var(--font-jersey)" }}>
              Fraudex
            </span>
          </div>

          <nav className="mt-4 flex flex-col gap-2 px-4">
            {menuItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.name}
                  href={item.path}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`flex items-center justify-between px-4 py-3.5 rounded-xl transition-all ${
                    isActive ? "bg-white/10 font-bold" : "text-gray-300 hover:bg-white/5 hover:text-white font-medium"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <item.icon size={20} className={isActive ? "text-white" : "text-gray-400"} />
                    <span className="text-sm">{item.name}</span>
                  </div>
                  {item.badge && (
                    <span className="bg-white text-[#0C134F] text-xs font-bold px-2 py-0.5 rounded-md">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-3 text-gray-300">
              {isDarkMode ? <Moon size={20} /> : <Sun size={20} />}
              <span className="text-sm">{isDarkMode ? "Dark Mode" : "Light Mode"}</span>
            </div>
            <button 
              onClick={toggleDarkMode}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                isDarkMode ? "bg-blue-600 justify-end" : "bg-gray-500 justify-start"
              }`}
            >
              <div className="bg-white w-4 h-4 rounded-full shadow-md transform transition-transform"></div>
            </button>
          </div>

          {/* Tombol Logout Membuka Modal */}
          <button
            onClick={() => setIsLogoutModalOpen(true)}
            className="w-full flex items-center gap-3 bg-[#C72C2C] hover:bg-red-700 text-white px-4 py-3.5 rounded-xl transition-colors font-bold text-sm cursor-pointer"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* KONTEN UTAMA */}
      <main className={`md:ml-72 flex-1 p-6 md:p-10 mt-16 md:mt-0 w-full overflow-x-hidden transition-colors duration-300 ${
        isDarkMode ? "bg-[#111827] text-white" : "bg-[#F8F9FA] text-gray-900"
      }`}>
        {children}
      </main>

      {/* MODAL KONFIRMASI LOGOUT */}
      {isLogoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className={`w-full max-w-sm rounded-3xl shadow-2xl p-8 text-center space-y-4 animate-in zoom-in-95 duration-200 border ${
            isDarkMode ? "bg-[#1F2937] border-gray-800 text-white" : "bg-white border-gray-100 text-gray-900"
          }`}>
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/40 text-red-500 rounded-full flex items-center justify-center mx-auto mb-2">
              <AlertTriangle size={32} />
            </div>
            
            <h3 className="text-2xl font-bold text-[#0C134F] dark:text-white">Konfirmasi Keluar</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Apakah Anda yakin ingin keluar dari sesi admin ini? Anda akan diarahkan kembali ke halaman utama.
            </p>

            <div className="flex gap-3 pt-4">
              <button 
                onClick={() => setIsLogoutModalOpen(false)}
                className="w-1/2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 py-3 rounded-xl text-sm font-bold transition-colors cursor-pointer"
              >
                Batal
              </button>
              <button 
                onClick={handleConfirmLogout}
                className="w-1/2 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl text-sm font-bold shadow-md transition-colors cursor-pointer"
              >
                Ya, Keluar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}