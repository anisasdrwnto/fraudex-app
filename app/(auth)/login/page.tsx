"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    // Tentukan tujuan akhir berdasarkan role/email
    const targetUrl = email === "admin@fraudex.com" ? "/dashboard" : "/";

    // Gunakan konfigurasi native NextAuth dengan callbackUrl agar cookie sesi & router sinkron
    const result = await signIn("credentials", {
      email,
      password,
      redirect: true,
      callbackUrl: targetUrl,
    });

    // Jika karena suatu hal redirect gagal dan mengembalikan error
    if (result?.error) {
      setErrorMsg("Email atau kata sandi salah!");
      setIsLoading(false);
    }
  };

  return (
    <main
      className="relative min-h-screen w-full bg-cover bg-center bg-no-repeat flex items-center justify-center px-6 md:px-16"
      style={{ backgroundImage: "url('/background_5.png')" }}
    >
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* SISI KIRI: Teks Sambutan & Brand Fraudex */}
        <div className="lg:col-span-6 space-y-4 text-left">
          <h1 className="text-5xl md:text-6xl font-extrabold italic text-[#0C134F] tracking-tight leading-tight">
            Selamat datang di <br />
            <span className="flex items-center gap-4 mt-4 not-italic">
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

        {/* SISI KANAN: Form Login */}
        <div className="lg:col-span-6 flex justify-end">
          <div className="w-full max-w-md bg-white/80 backdrop-blur-md p-8 md:p-10 rounded-3xl shadow-[0_20px_50px_rgba(12,19,79,0.15)] border border-white/60">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-[#0C134F]">Masuk</h2>
              <p className="text-sm text-gray-500 mt-2 font-[family-name:var(--font-poppins)]">
                Sebelum akses sistem ini, silahkan isi form login berikut ya!
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 font-[family-name:var(--font-poppins)]">
                  Email Anda
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@fraudex.com"
                  className="w-full rounded-xl border border-gray-200 bg-[#EEF2FA] px-4 py-3.5 text-sm text-gray-800 placeholder-gray-500 focus:border-[#93A5FF] focus:outline-none focus:ring-2 focus:ring-[#93A5FF]/20 transition font-[family-name:var(--font-poppins)]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 font-[family-name:var(--font-poppins)]">
                  Kata Sandi
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••"
                    className="w-full rounded-xl border border-gray-200 bg-[#EEF2FA] px-4 py-3.5 pr-12 text-lg tracking-widest text-gray-800 placeholder-gray-500 focus:border-[#93A5FF] focus:outline-none focus:ring-2 focus:ring-[#93A5FF]/20 transition font-[family-name:var(--font-poppins)]"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      {showPassword ? (
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                      ) : (
                        <>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </>
                      )}
                    </svg>
                  </button>
                </div>
              </div>

              {errorMsg && (
                <p className="text-sm font-medium text-red-500 text-center animate-pulse">
                  {errorMsg}
                </p>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-xl bg-[#0C134F] py-4 text-sm font-bold text-white shadow-md hover:bg-[#151f6e] transition duration-200 cursor-pointer font-[family-name:var(--font-poppins)] mt-2 disabled:opacity-70"
              >
                {isLoading ? "Sedang masuk..." : "Masuk Sekarang"}
              </button>

              <div className="mt-6 text-center text-sm font-[family-name:var(--font-poppins)] text-gray-600">
                Belum punya akun?{" "}
                <Link href="/register" className="font-bold text-[#0C134F] hover:underline hover:text-[#151f6e] transition-colors">
                  Daftar Sekarang
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}