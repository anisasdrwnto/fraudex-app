'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, Navigation } from 'swiper/modules';

// Impor CSS Swiper
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const testimonials = [
    {
        id: 1, 
        name: 'Daniel',
        role: 'Senior Developer',
        content: 'Performa Fraudex dalam mencegah dan menangani modus penipuan lewat SMS sangat akurat dan membantu.',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    },
    {
        id: 2,
        name: 'Adelia Sudarman',
        role: 'Mahasiswa',
        content: 'Aplikasi Fraudex sangat membantu diriku untuk mengenali dan mendeteksi modus penipuan secara real-time. Thank you, Fraudex!',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    },
    {
        id: 3,
        name: 'Nayara',
        role: 'Masyarakat',
        content: 'Berkat Fraudex, saya jadi bisa lebih aware dan mengetahui berbagai modus penipuan online berbasis SMS. Terima kasih Fraudex!',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    },
    {
        id: 4,
        name: 'Rian Pratama',
        role: 'Pegawai Swasta',
        content: 'Sangat rekomendasikan platform ini untuk keluarga di rumah agar terhindar dari SMS phishing.',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    },
];

export default function Testimonials(){
    return(
        <section 
            id="ulasan-lainnya" 
            className="relative w-full bg-[#E3F2FD] py-24 px-6 md:px-12 flex justify-center"
        >
            <div className="w-full max-w-6xl mx-auto px-4 py-8">
                
                {/* Header Section dengan Tombol Navigasi Kustom (< dan >) */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold tracking-wide text-[#0C134F] mb-2">
                            Apa Kata Mereka Mengenai <span className="text-[#93A5FF]">Fraudex?</span>
                        </h2>
                        <p className="text-gray-600 text-sm md:text-base">
                            Dengarkan langsung ulasan dari para pengguna yang telah terlindungi.
                        </p>
                    </div>

                    {/* Tombol Navigasi Panah Sesuai Referensi */}
                    <div className="flex items-center gap-3 mt-4 md:mt-0">
                        {/* Tombol Prev (<) */}
                        <button className="swiper-button-prev-custom w-11 h-11 rounded-full bg-white border border-gray-200 flex items-center justify-center text-[#0C134F] hover:bg-[#0C134F] hover:text-white transition shadow-sm cursor-pointer">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        
                        {/* Tombol Next (>) - Aktif/Primary */}
                        <button className="swiper-button-next-custom w-11 h-11 rounded-full bg-[#0C134F] flex items-center justify-center text-white hover:bg-[#93A5FF] transition shadow-md cursor-pointer">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Swiper Container */}
                <Swiper
                    modules={[Pagination, Autoplay, Navigation]}
                    spaceBetween={24}
                    slidesPerView={1}
                    loop={true}
                    pagination={{ clickable: true, el: '.swiper-pagination-custom' }}
                    navigation={{
                        nextEl: '.swiper-button-next-custom',
                        prevEl: '.swiper-button-prev-custom',
                    }}
                    autoplay={{ delay: 4000, disableOnInteraction: false }}
                    breakpoints={{
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                    className="pb-16"
                >
                    {testimonials.map((item) => (
                        <SwiperSlide key={item.id} className="h-auto pb-4">
                            {/* Card dengan tinggi minimum tetap (min-h-[340px]) agar ukurannya seragam */}
                            <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-[0_10px_25px_rgba(12,19,79,0.08)] border border-[#93A5FF]/30 flex flex-col justify-between min-h-[340px] h-full relative overflow-hidden group hover:shadow-[0_15px_30px_rgba(12,19,79,0.12)] transition duration-300">
                                
                                {/* Aksen Garis Atas Kartu */}
                                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0C134F] to-[#93A5FF]"></div>

                                <div className="p-8 pb-4">
                                    {/* Icon Kutipan Besar */}
                                    <div className="text-[#93A5FF]/40 text-5xl font-serif font-bold mb-1 leading-none">
                                        “
                                    </div>

                                    {/* Rating Bintang */}
                                    <div className="flex gap-1 mb-3 text-amber-400 text-sm">
                                        ★★★★★
                                    </div>

                                    {/* Isi Testimoni */}
                                    <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                                        {item.content}
                                    </p>
                                </div>

                                {/* Profil Pengguna di Bagian Bawah yang Rata */}
                                <div className="flex items-center gap-4 p-8 pt-4 border-t border-gray-100 mt-auto">
                                    <img 
                                        src={item.avatar}
                                        alt={item.name}
                                        className="w-12 h-12 rounded-full object-cover border-2 border-[#93A5FF]"
                                    />
                                    <div>
                                        <h3 className="font-bold text-[#0C134F] text-base">{item.name}</h3>
                                        <p className="text-xs font-medium text-gray-500">{item.role}</p>
                                    </div>
                                </div>

                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Kustom Pagination Dot */}
                <div className="swiper-pagination-custom flex justify-center gap-2 mt-2"></div>

            </div>
        </section>
    );
}