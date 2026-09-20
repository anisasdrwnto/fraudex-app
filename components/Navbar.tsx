"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import AuthButton from "./AuthButton";

export default function Navbar(){
    const pathname = usePathname();
    const [activeHash, setActiveHash] = useState("");
    
    // 1. Pisahkan state dan ref untuk masing-masing dropdown
    const [isTentangOpen, setIsTentangOpen] = useState(false);
    const [isUmpanOpen, setIsUmpanOpen] = useState(false);
    
    const tentangRef = useRef<HTMLLIElement>(null);
    const umpanRef = useRef<HTMLLIElement>(null);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setActiveHash(window.location.hash);

        const handleHashChange = () => setActiveHash(window.location.hash);
        window.addEventListener("hashchange", handleHashChange);
        
        // 2. Perbarui logika klik di luar untuk kedua dropdown secara independen
        const handleClickOutside = (event: MouseEvent) => {
            if (tentangRef.current && !tentangRef.current.contains(event.target as Node)) {
                setIsTentangOpen(false);
            }
            if (umpanRef.current && !umpanRef.current.contains(event.target as Node)) {
                setIsUmpanOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            window.removeEventListener("hashchange", handleHashChange);
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [pathname]);

    const isActive = (path: string) => {
        if (path.includes("#")) {
            const hashPart = path.substring(path.indexOf("#"));
            return pathname === "/" && activeHash === hashPart;
        } 
        if (path === "/") {
            return pathname === "/" && activeHash === "";
        }
        return pathname === path;
    };

    const handleClick = (path: string) => {
        if (path.includes("#")) {
            setActiveHash(path.substring(path.indexOf("#")));
        } else if (path === "/") {
            setActiveHash(""); 
        }
        // Tutup semua dropdown saat salah satu menu diklik
        setIsTentangOpen(false);
        setIsUmpanOpen(false);
    };

    return(
        <header className="absolute top-0 left-0 z-50 w-full bg-transparent px-6 py-5 md:px-12">
            <nav aria-label="Navigasi Utama" className="mx-auto flex w-full max-w-7xl items-center justify-between">
                <Link 
                    href="/" 
                    onClick={() => handleClick("/")}
                    className="flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-white" 
                    aria-label="Kembali ke Beranda Fraudex"
                >
                    <Image 
                        src="/logo.png"
                        alt="Logo Fraudex"
                        width={33}
                        height={32}
                        className="object-contain rounded-md"
                    />
                    
                    <span className="text-2xl font-bold tracking-wide text-white">
                        Fraudex
                    </span>
                </Link>
                
                <ul className="hidden items-center gap-8 md:flex">
                    <li>
                        <Link 
                            href="/" 
                            onClick={() => handleClick("/")}
                            className={`text-sm font-medium transition-colors hover:text-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white pb-1 ${
                                isActive("/") ? "border-b-2 border-orange-400 text-white" : "text-white/80"
                            }`}
                        >
                            Beranda
                        </Link>
                    </li>
                    <li>
                        <Link 
                            href="/#cek-sms" 
                            onClick={() => handleClick("/#cek-sms")}
                            className={`text-sm font-medium transition-colors hover:text-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white pb-1 ${
                                isActive("/#cek-sms") ? "border-b-2 border-orange-400 text-white" : "text-white/80"
                            }`}
                        >
                            Cek SMS
                        </Link>
                    </li>
                    
                    {/* Dropdown 1: Tentang Kami */}
                    <li className="relative" ref={tentangRef}>
                        <button
                            onClick={() => {
                                setIsTentangOpen(!isTentangOpen);
                                setIsUmpanOpen(false); // Tutup menu lain jika sedang buka ini
                            }}
                            className={`flex items-center gap-1 text-sm font-medium transition-colors hover:text-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white pb-1 ${
                                isActive("/#tentang-kami") || isActive("/#ciri-ciri") || isActive("/#tips-pencegahan") ? "border-b-2 border-orange-400 text-white" : "text-white/80"
                            }`}
                            aria-expanded={isTentangOpen}
                            aria-haspopup="true"
                        >
                            <span>Tentang Kami</span>
                            <svg
                                className={`w-4 h-4 transform transition-transform duration-200 ${
                                    isTentangOpen ? "rotate-180" : ""
                                }`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {isTentangOpen && (
                            <div className="absolute right-0 mt-2 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                                <Link
                                    href="/#tentang-kami"
                                    onClick={() => handleClick("/#tentang-kami")}
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                                >
                                    Tentang Kami
                                </Link>
                                <Link
                                    href="/#ciri-ciri"
                                    onClick={() => handleClick("/#ciri-ciri")}
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                                >
                                    Ciri-Ciri Penipuan
                                </Link>
                                <Link
                                    href="/#tips-pencegahan"
                                    onClick={() => handleClick("/#tips-pencegahan")}
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                                >
                                    Tips Pencegahan
                                </Link>
                            </div>
                        )}
                    </li>

                    {/* Dropdown 2: Umpan Balik */}
                    <li className="relative" ref={umpanRef}>
                        <button
                            onClick={() => {
                                setIsUmpanOpen(!isUmpanOpen);
                                setIsTentangOpen(false); // Tutup menu lain jika sedang buka ini
                            }}
                            className={`flex items-center gap-1 text-sm font-medium transition-colors hover:text-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white pb-1 ${
                                isActive("/#umpan-balik") || isActive("/#ulasan-lainnya") ? "border-b-2 border-orange-400 text-white" : "text-white/80"
                            }`}
                            aria-expanded={isUmpanOpen}
                            aria-haspopup="true"
                        >
                            <span>Umpan Balik</span>
                            <svg
                                className={`w-4 h-4 transform transition-transform duration-200 ${
                                    isUmpanOpen ? "rotate-180" : ""
                                }`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {isUmpanOpen && (
                            <div className="absolute right-0 mt-2 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                                <Link
                                    href="/#umpan-balik"
                                    onClick={() => handleClick("/#umpan-balik")}
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                                >
                                    Kirim Ulasan
                                </Link>
                                <Link
                                    href="/#ulasan-lainnya"
                                    onClick={() => handleClick("/#ulasan-lainnya")}
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                                >
                                    Lihat Testimoni
                                </Link>
                            </div>
                        )}
                    </li>
                </ul>

                <div className="flex items-center">
                   <AuthButton />
                </div>
            </nav>
        </header>
    );
}