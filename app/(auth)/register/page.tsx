'use client';

import { useState } from 'react';
import Image from 'next/image'; // Direkomendasikan Next.js untuk gambar
import Link from 'next/link';
export default function RegisterPage() {
  const [name, setName]   = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email, password });
    // Tambahkan logika autentikasi login di sini
  };

  return (
    <main 
      className="relative min-h-screen w-full bg-cover bg-center bg-no-repeat flex items-center justify-center px-6 md:px-16"
      style={{ backgroundImage: "url('/background_5.png')" }}
    >
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* SISI KIRI: Teks Sambutan & Brand Fraudex */}
        <div className="lg:col-span-6 space-y-4 text-left">
          {/* PERBAIKAN: Ganti ukuran teks dari 4xl/5xl ke 5xl/6xl dan tambah italic */}
          <h1 className="text-5xl md:text-6xl font-extrabold italic text-[#0C134F] tracking-tight leading-tight">
            Selamat datang di <br />
            <span className="flex items-center gap-4 mt-4 not-italic"> {/* not-italic agar nama brand tetap tegak */}
              
              {/* PERBAIKAN: Ganti logo kotak kecil dengan logo.png */}
              <Image 
                src="/logo.png" 
                alt="Logo Fraudex" 
                width={60} 
                height={60} 
                className="object-contain"
              />
              
              <span className="font-mono font-normal tracking-normal text-6xl md:text-7xl">
                Fraudex
              </span>
            </span>
          </h1>
          <p className="text-gray-700 text-lg md:text-xl font-medium mt-4">
            Cegah SMS penipuan dan deteksi dengan satu <span className="font-bold text-[#0C134F]">klik</span>
          </p>
        </div>

        {/* SISI KANAN: Kotak Form Login */}
        <div className="lg:col-span-6 flex justify-end">
          <div className="w-full max-w-md bg-white/80 backdrop-blur-md p-8 md:p-10 rounded-3xl shadow-[0_20px_50px_rgba(12,19,79,0.15)] border border-white/60">
            
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-[#0C134F]">Buat Akun Anda</h2>
              {/* PERBAIKAN: Tambah font-poppins */}
              <p className="text-sm text-gray-500 mt-2 font-poppins">
                Sebelum akses sistem ini, silahkan isi form login berikut ya!
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 font-poppins">
                  Nama Lengkap Anda
                </label>
                <input 
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Contoh:Andi Budiman"
                  className="w-full rounded-xl border border-gray-200 bg-[#EEF2FA] px-4 py-3.5 text-sm text-gray-800 placeholder-gray-500 focus:border-[#93A5FF] focus:outline-none focus:ring-2 focus:ring-[#93A5FF]/20 transition font-poppins"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 font-poppins">
                  Email Anda
                </label>
                <input 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@fraudex.com"
                  className="w-full rounded-xl border border-gray-200 bg-[#EEF2FA] px-4 py-3.5 text-sm text-gray-800 placeholder-gray-500 focus:border-[#93A5FF] focus:outline-none focus:ring-2 focus:ring-[#93A5FF]/20 transition font-poppins"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 font-poppins">
                  Kata Sandi
                </label>
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••"
                    className="w-full rounded-xl border border-gray-200 bg-[#EEF2FA] px-4 py-3.5 pr-12 text-lg tracking-widest text-gray-800 placeholder-gray-500 focus:border-[#93A5FF] focus:outline-none focus:ring-2 focus:ring-[#93A5FF]/20 transition font-poppins"
                    required
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </button>
                </div>
              </div>

              <button 
                type="submit"
                className="w-full rounded-xl bg-[#0C134F] py-4 text-sm font-bold text-white shadow-md hover:bg-[#151f6e] transition duration-200 cursor-pointer font-poppins mt-2"
              >
                Masuk Sekarang
              </button>

              <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-gray-200"></div>
                <span className="flex-shrink mx-4 text-xs text-gray-400 uppercase tracking-wider font-poppins font-medium">Atau</span>
                <div className="flex-grow border-t border-gray-200"></div>
              </div>

              <button 
                type="button"
                className="w-full flex items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white py-4 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50 transition duration-200 cursor-pointer font-poppins"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
                  <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.19v3.15C3.17 21.32 7.23 24 12 24z"/>
                  <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.19C.43 8.12 0 9.87 0 11.7c0 1.83.43 3.58 1.19 5.12l4.09-2.55z"/>
                  <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.23 0 3.17 2.68 1.19 6.58l4.09 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                </svg>
                Lanjutkan dengan Google
              </button>

              <div className="mt-6 text-center text-sm font-poppins text-gray-600">
                Sudah punya akun?{' '}
                <Link href="/login" className="font-bold text-[#0C134F] hover:underline hover:text-[#151f6e] transition-colors">
                  Masuk Sekarang
                </Link>
              </div>
            </form>
          </div>
        </div>

      </div>
    </main>
  );
}