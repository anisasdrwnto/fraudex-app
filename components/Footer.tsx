import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full bg-[#01081B] py-12 px-6 md:px-12 flex justify-center">
      <div className="w-full max-w-6xl rounded-3xl bg-[#081450] text-white p-10 md:p-14 shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-8 h-8">
                <Image 
                  src="/logo.png" 
                  alt="Fraudex Logo" 
                  fill 
                  className="object-contain"
                />
              </div>
              <span className="text-xl font-bold tracking-wide text-white">Fraudex</span>
            </div>
            
            <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
              Platform deteksi dan pencegahan penipuan online berbasis SMS secara real-time untuk melindungi masyarakat Indonesia.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#93A5FF] hover:text-[#01081B] transition">
                <span className="text-xs font-bold">ig</span>
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#93A5FF] hover:text-[#01081B] transition">
                <span className="text-xs font-bold">fb</span>
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#93A5FF] hover:text-[#01081B] transition">
                <span className="text-xs font-bold">x</span>
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#93A5FF] hover:text-[#01081B] transition">
                <span className="text-xs font-bold">yt</span>
              </a>
            </div>
          </div>

          <div className="md:col-span-3 space-y-4">
            <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">Tautan Utama</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link href="/" className="hover:text-white transition">Beranda</Link>
              </li>
              <li>
                <Link href="/#tentang-kami" className="hover:text-white transition">Tentang Kami</Link>
              </li>
              <li>
                <Link href="/#ciri-ciri" className="hover:text-white transition">Ciri Penipuan</Link>
              </li>
              <li>
                <Link href="/#tips-pencegahan" className="hover:text-white transition">Tips Pencegahan</Link>
              </li>
              <li>
                <Link href="/#umpan-balik" className="hover:text-white transition">Umpan Balik</Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3 space-y-4">
            <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">Kontak</h4>
            <div className="space-y-3 text-sm text-slate-400">
              <p className="leading-relaxed">
                Jalan Imam Bonjol, Sumbersoko, Pandean, Kecamatan Mejayan,<br />
                Kabupaten Madiun, Jawa Timur 63153
              </p>
              <p className="hover:text-white transition">support@fraudex.id</p>
              <p className="hover:text-white transition">+62 812-1940-2940</p>
            </div>
          </div>

        </div>

        <div className="mt-12 pt-6 border-t border-white/10 text-center text-xs text-slate-500">
          &copy; {new Date().getFullYear()} Fraudex. Hak cipta dilindungi undang-undang.
        </div>

      </div>
    </footer>
  );
}