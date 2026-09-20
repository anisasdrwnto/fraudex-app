import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fraudex - Platform Deteksi & Pencegahan SMS Penipuan",
  description: "Cek nomor telepon dan SMS mencurigakan secara instan untuk melindungi diri dari penipuan online.",
  keywords: ["fraudex", "cek sms penipuan", "deteksi penipuan online", "keamanan siber"],
  authors: [{ name: "Anisa Sudarwanto" }],
  openGraph: {
    title: "Fraudex - Platform Deteksi & Pencegahan SMS Penipuan",
    description: "Lindungi diri Anda dari ancaman SMS penipuan bersama Fraudex.",
    url: "https://fraudex.vercel.app",
    siteName: "Fraudex",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="antialiased font-[family-name:var(--font-poppins)]">
        {children}
      </body>
    </html>
  );
}