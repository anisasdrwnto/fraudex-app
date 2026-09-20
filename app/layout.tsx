import type { Metadata } from "next";
import "./globals.css";
import QueryProvider from "@/components/QueryProvider"; // <-- Import provider yang baru dibuat

export const metadata: Metadata = {
  title: "Fraudex - Platform Deteksi & Pencegahan SMS Penipuan",
  description: "Cek nomor telepon dan SMS mencurigakan secara instan untuk melindungi diri dari penipuan online.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="antialiased">
        <QueryProvider> {/* <-- Bungkus aplikasi di sini */}
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}