"use client";

import { useState, useEffect, useRef } from "react";
import { useSession, SessionProvider } from "next-auth/react";
import { Pencil, CheckCircle2 } from "lucide-react";
import Link from "next/link";

function ProfileContent() {
  const { data: session, status } = useSession();
  
  // State untuk form
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [about, setAbout] = useState("");
  const [photo, setPhoto] = useState("/user-placeholder.png"); // Ganti dengan path ilustrasi 3D bawaan jika ada
  
  const [isSaved, setIsSaved] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Ambil data dari Session / LocalStorage
  useEffect(() => {
    // Membungkus dengan setTimeout untuk menghindari error "synchronous setState" dari compiler
    const timer = setTimeout(() => {
      const savedFirst = localStorage.getItem("fraudex_first_name");
      const savedLast = localStorage.getItem("fraudex_last_name");
      const savedAbout = localStorage.getItem("fraudex_about");
      const savedPhoto = localStorage.getItem("fraudex_photo");

      if (session?.user?.name) {
        const nameParts = session.user.name.split(" ");
        setFirstName(savedFirst || nameParts[0] || "");
        setLastName(savedLast || nameParts.slice(1).join(" ") || "");
      }

      if (savedAbout) setAbout(savedAbout);
      if (savedPhoto) setPhoto(savedPhoto);
    }, 0);

    return () => clearTimeout(timer);
  }, [session]);

  // Handle Upload Foto (Preview Realtime)
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPhoto(result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle Simpan
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("fraudex_first_name", firstName);
    localStorage.setItem("fraudex_last_name", lastName);
    localStorage.setItem("fraudex_about", about);
    localStorage.setItem("fraudex_photo", photo);
    
    window.dispatchEvent(new Event("profileUpdated"));
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  if (status === "loading") return null; // Sembunyikan saat loading session

  return (
    <div className="min-h-screen bg-[#F3F4F6] flex items-center justify-center p-4 md:p-8 font-[family-name:var(--font-poppins)]">
      
      <div className="w-full max-w-4xl bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 md:p-12 relative">
        
        {/* Label Top (Presented by Fraudex) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4 py-1.5 rounded-full shadow-sm text-xs font-bold text-gray-500 flex items-center gap-2 border border-gray-100">
          <span>presented by</span>
          <span className="text-[#0C134F] font-mono tracking-tighter">Fraudex</span>
        </div>

        <Link href="/" className="text-sm font-semibold text-gray-400 hover:text-[#0C134F] mb-6 inline-block transition-colors">
          &larr; Kembali
        </Link>

        <h1 className="text-2xl font-bold text-gray-900 mb-8">User Information</h1>

        <form onSubmit={handleSave} className="flex flex-col md:flex-row gap-8 md:gap-12">
          
          {/* BAGIAN KIRI: FOTO PROFIL */}
          <div className="shrink-0 flex flex-col items-center md:items-start">
            <div className="relative w-48 h-48 md:w-56 md:h-56">
              {/* Gambar Profil */}
              <div 
                className="w-full h-full rounded-[2rem] bg-blue-100 overflow-hidden shadow-inner flex items-center justify-center"
                style={{
                  backgroundImage: photo !== "/user-placeholder.png" ? `url(${photo})` : "none",
                  backgroundSize: "cover",
                  backgroundPosition: "center"
                }}
              >
                {/* Fallback jika tidak ada foto awal */}
                {photo === "/user-placeholder.png" && (
                  <span className="text-6xl text-blue-300 font-bold">{firstName.charAt(0)}</span>
                )}
              </div>

              {/* Tombol Pensil untuk Upload */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute -bottom-3 -right-3 bg-white p-3.5 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.1)] hover:scale-105 transition-transform text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#0C134F]"
              >
                <Pencil size={20} />
              </button>
              
              {/* Input File Tersembunyi */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handlePhotoChange}
                accept="image/*"
                className="hidden"
              />
            </div>
          </div>

          {/* BAGIAN KANAN: FORM INPUT */}
          <div className="flex-1 space-y-5">
            <div className="flex flex-col md:flex-row gap-5">
              <div className="flex-1">
                <label className="block text-xs font-bold text-gray-600 mb-1.5 ml-1">First name</label>
                <input 
                  type="text" 
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full bg-[#F3F4F6] text-gray-800 rounded-2xl px-5 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300 transition-shadow"
                  placeholder="First name"
                />
              </div>
              <div className="flex-1">
                <label className="block text-xs font-bold text-gray-600 mb-1.5 ml-1">Last name</label>
                <input 
                  type="text" 
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full bg-[#F3F4F6] text-gray-800 rounded-2xl px-5 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300 transition-shadow"
                  placeholder="Last name"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1.5 ml-1">Email Address (Unchangeable)</label>
              <input 
                type="email" 
                value={session?.user?.email || "email@contoh.com"}
                disabled
                className="w-full bg-[#E5E7EB] text-gray-500 rounded-2xl px-5 py-3.5 text-sm cursor-not-allowed border-none focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1.5 ml-1">About you</label>
              <textarea 
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                className="w-full bg-[#F3F4F6] text-gray-800 rounded-3xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300 transition-shadow resize-none min-h-[120px]"
                placeholder="I'm..."
              />
            </div>

            {/* Tombol Aksi */}
            <div className="flex items-center justify-end gap-4 pt-4">
              {isSaved && (
                <span className="text-green-600 text-sm font-semibold flex items-center gap-1.5 animate-pulse mr-auto">
                  <CheckCircle2 size={16} /> Saved
                </span>
              )}
              
              <Link 
                href="/"
                className="px-8 py-3.5 rounded-full bg-[#D1D5DB] text-gray-700 text-sm font-bold hover:bg-gray-300 transition-colors"
              >
                Cancel
              </Link>
              
              <button 
                type="submit"
                className="px-10 py-3.5 rounded-full bg-[#2B2B2B] text-white text-sm font-bold hover:bg-black transition-colors shadow-md"
              >
                Save
              </button>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}

// Wrapper Session Provider
export default function ProfilePage() {
  return (
    <SessionProvider>
      <ProfileContent />
    </SessionProvider>
  );
}