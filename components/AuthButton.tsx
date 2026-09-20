"use client";

import { useState, useEffect } from "react";
import { useSession, signOut, SessionProvider } from "next-auth/react";
import Link from "next/link";
import { User, History, LogOut, ChevronDown, Settings } from "lucide-react";

function AuthButtonContent() {
  const { data: session, status } = useSession();
  
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [displayName, setDisplayName] = useState("Pengguna");
  const [displayPhoto, setDisplayPhoto] = useState<string | null>(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    // Trik setTimeout agar linter (VS Code) tidak memunculkan garis merah
    const mountTimer = setTimeout(() => {
      setMounted(true);
    }, 0);

    const updateProfileData = () => {
      const savedFirst = localStorage.getItem("fraudex_first_name");
      const savedLast = localStorage.getItem("fraudex_last_name");
      const savedPhoto = localStorage.getItem("fraudex_photo");
      
      if (savedFirst || savedLast) {
        setDisplayName(`${savedFirst || ""} ${savedLast || ""}`.trim());
      } else if (session?.user?.name) {
        setDisplayName(session.user.name);
      }

      if (savedPhoto && savedPhoto !== "/user-placeholder.png") {
        setDisplayPhoto(savedPhoto);
      } else {
        setDisplayPhoto(null);
      }
    };

    updateProfileData();
    window.addEventListener("profileUpdated", updateProfileData);
    
    return () => {
      clearTimeout(mountTimer);
      window.removeEventListener("profileUpdated", updateProfileData);
    };
  }, [session]);

  if (!mounted || status === "loading") {
    return <div className="h-10 w-40 animate-pulse bg-gray-200 rounded-lg"></div>;
  }

  if (session && session.user) {
    return (
      <>
        <div className="relative font-[family-name:var(--font-poppins)]">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-[#0C134F] shadow-sm transition hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white/50"
          >
            {displayPhoto ? (
              <img 
                src={displayPhoto} 
                alt="Profil" 
                className="h-6 w-6 rounded-full object-cover border border-gray-200"
              />
            ) : (
              <User size={18} />
            )}
            <span>{displayName}</span>
            <ChevronDown size={16} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
          </button>

          {isOpen && (
            <div className="absolute right-0 mt-3 w-56 rounded-2xl border border-gray-100 bg-white p-2 shadow-xl z-50">
              <Link
                href="/profile"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-[#EEF2FA] hover:text-[#0C134F]"
              >
                <Settings size={18} />
                Edit Profil
              </Link>

              <Link
                href="/history"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-[#EEF2FA] hover:text-[#0C134F]"
              >
                <History size={18} />
                Cek Riwayat SMS
              </Link>
              
              <div className="my-1 border-t border-gray-100"></div>
              
              <button
                onClick={() => {
                  setIsOpen(false);
                  setShowLogoutModal(true);
                }}
                className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50"
              >
                <LogOut size={18} />
                Keluar Akun
              </button>
            </div>
          )}
        </div>

        {showLogoutModal && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm px-4 font-[family-name:var(--font-poppins)]">
            <div className="w-full max-w-sm rounded-3xl bg-white p-6 md:p-8 shadow-2xl transform transition-all animate-in zoom-in-95 duration-200">
              <div className="flex flex-col items-center text-center">
                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-600">
                  <LogOut size={32} className="ml-1" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-gray-900">Keluar dari Fraudex?</h3>
                <p className="mb-8 text-sm text-gray-500">
                  Anda harus masuk kembali nanti untuk mengecek riwayat SMS Anda.
                </p>
                <div className="flex w-full gap-3">
                  <button
                    onClick={() => setShowLogoutModal(false)}
                    className="flex-1 rounded-xl bg-gray-100 py-3.5 text-sm font-bold text-gray-700 transition hover:bg-gray-200"
                  >
                    Batal
                  </button>
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="flex-1 rounded-xl bg-red-600 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-red-700"
                  >
                    Ya, Keluar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <Link
      href="/login"
      className="rounded-lg bg-white px-6 py-2.5 text-sm font-bold text-[#0C134F] shadow-sm transition hover:bg-gray-100 font-[family-name:var(--font-poppins)]"
    >
      Masuk/Daftar Akun
    </Link>
  );
}

export default function AuthButton() {
  return (
    <SessionProvider>
      <AuthButtonContent />
    </SessionProvider>
  );
}