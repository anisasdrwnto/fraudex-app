import type { Metadata } from "next";
import { Quantico, Jersey_15, Poppins } from 'next/font/google';
import './globals.css';
import QueryProvider from "@/components/QueryProvider"; 

export const metadata: Metadata = {
  title: "Fraudex - Deteksi Penipuan",
  description: "Aplikasi deteksi SMS penipuan",
};

const quantico = Quantico({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-quantico',
});

const jersey = Jersey_15({
  weight: ['400'], // Diubah menjadi array agar konsisten
  subsets: ['latin'],
  variable: '--font-jersey',
});

const poppins = Poppins({
  weight: ['400', '500', '600', '700'], // Bobot untuk teks dan tombol
  subsets: ['latin'],
  variable: '--font-poppins',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${quantico.variable} ${jersey.variable} ${poppins.variable}`}>
      <body className="antialiased font-sans">
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}