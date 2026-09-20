import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { User, Send } from "lucide-react";

export default function Hero() {
  return (
    <section 
      aria-labelledby="hero-heading" 
      className="relative w-full min-h-screen bg-[linear-gradient(160deg,#01081B_0%,#081450_40%,#4C7EFB_100%)] px-6 pb-16 pt-32 md:px-12 lg:pb-24 lg:pt-40 overflow-hidden"
    >
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:gap-8 items-center">
        <div className="flex flex-col items-start space-y-6 z-10">
          <h1 
            id="hero-heading"
            className="font-[family-name:var(--font-quantico)] text-4xl leading-tight tracking-wide text-white md:text-5xl lg:text-6xl"
          >
            Bingung SMS ini <br />
          </h1>
           <h1 
            id="hero-heading"
            className="font-[family-name:var(--font-quantico)] text-4xl font-bold leading-tight tracking-wide text-white md:text-5xl lg:text-6xl"
          >
            AMAN ATAU PENIPUAN <br />
          </h1>
         
          
          <p className="max-w-md text-base leading-relaxed text-gray-300 md:text-lg font-sans">
            Cukup tempel atau ketik pesan yang Anda terima dan Fraudex akan memberi tahu apakah SMS itu aman, waspada, atau berbahaya. Gratis dan gampang digunakan!
          </p>

        <Link 
            href="#cek-sms"
            className={buttonVariants({ 
                variant: "default", 
                size: "lg",
                className: "mt-4 rounded-xl !bg-[#161d4a] hover:!bg-[#161d4a] px-8 py-6 font-[family-name:var(--font-quantico)] text-lg font-bold text-white transition-all focus-visible:ring-2 focus-visible:ring-white border-none" 
            })}
            >
            Cek Sekarang
        </Link>
        </div>

        <div className="relative mx-auto flex w-full max-w-md items-center justify-center z-10 mt-10 lg:mt-0">
          <div 
            aria-hidden="true" 
            className="absolute -right-8 top-24 z-20 text-9xl drop-shadow-2xl md:-right-16 md:top-32 animate-bounce"
            >
            🔔
        </div>

         <div 
            aria-hidden="true" 
            className="absolute -left-6 bottom-10 z-20 flex h-28 w-28 items-center justify-center rounded-full bg-red-600 font-[family-name:var(--font-quantico)] text-7xl font-bold text-white shadow-2xl md:-left-12 md:h-36 md:w-36 md:text-8xl"
            >
            !
        </div>

          <article className="relative z-10 flex h-[500px] w-full max-w-[320px] flex-col overflow-hidden rounded-[2.5rem] border-8 border-white bg-gray-50 shadow-2xl">
            <header className="flex items-center gap-3 bg-[#69439b] px-4 py-5 text-white">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white/40 bg-white/20">
                <User size={24} />
              </div>
              <span className="font-sans text-sm font-semibold tracking-wide">
                +62 812-3456-7890
              </span>
            </header>

            <main className="flex-1 p-4">
              <div className="rounded-2xl rounded-tl-sm border border-gray-100 bg-white p-4 text-sm leading-relaxed text-gray-700 shadow-sm">
                Paket Anda tertahan di gudang karena data alamat kurang lengkap. Lengkapi data & bayar biaya admin Rp5.000 di: <br />
                <a href="#" className="text-blue-500 underline" tabIndex={-1}>kurir-cepat-site/lacak</a>
              </div>
              <div className="mt-2 flex h-6 w-6 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-400 shadow-sm">
                <User size={14} />
              </div>
            </main>

            <footer className="flex items-center gap-3 border-t border-gray-200 bg-white p-3">
              <div className="flex-1 rounded-full bg-gray-100 px-4 py-2.5 text-xs text-gray-400">
                Balasan pesan Anda...
              </div>
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#69439b] text-white shadow-md">
                <Send size={18} className="-ml-0.5" />
              </div>
            </footer>

          </article>
        </div>
      </div>
    </section>
  );
}