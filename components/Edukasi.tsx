'use client';

export default function CiriDanTipsSection() {
    const ciriCiri = [
        {
            id: 1,
            title: "Janji Hadiah Palsu",
            desc: "SMS menyatakan Anda memenangkan undian berhadiah besar padahal tidak pernah mengikuti program tersebut.",
        },
        {
            id: 2,
            title: "Tautan/Link Mencurigakan",
            desc: "Berisi tautan pendek atau domain aneh yang mengarah ke situs tiruan (*phishing*) untuk mencuri data akun.",
        },
        {
            id: 3,
            title: "Desakan Waktu (Urgency)",
            desc: "Pesan memaksa Anda untuk segera merespons dalam waktu singkat karena alasan blokir akun atau ancaman hukum.",
        },
    ];

    const tipsPencegahan = [
        {
            id: 1,
            title: "Jangan Asal Klik Tautan",
            desc: "Selalu pastikan keaslian URL atau domain sebelum mengklik tautan apa pun yang dikirim melalui SMS.",
            icon: (
                <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
            ),
        },
        {
            id: 2,
            title: "Gunakan Fitur Pengecekan",
            desc: "Manfaatkan fitur 'Cek SMS' di Fraudex untuk mendeteksi apakah pesan tersebut aman atau indikasi penipuan.",
            icon: (
                <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            ),
        },
        {
            id: 3,
            title: "Jaga Kerahasiaan OTP",
            desc: "Jangan pernah memberitahukan kode OTP, PIN, atau kata sandi kepada siapa pun, termasuk pihak bank.",
            icon: (
                <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
            ),
        },
    ];

    return (
        <section 
            aria-labelledby="ciri-ciri-heading"
            className="relative w-full bg-cover bg-center bg-no-repeat py-24 px-6 md:px-12 overflow-hidden"
            style={{ backgroundImage: "url('/background_2.jpg')" }}
        >
            {/* Gradasi Transisi Smooth di Bagian Atas */}
            <div 
                className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white via-white/70 to-transparent pointer-events-none z-0" 
                aria-hidden="true"
            ></div>

            <div className="relative z-10 w-full max-w-6xl mx-auto space-y-20">
                <div id="ciri-ciri">
                    <div className="text-center max-w-2xl mx-auto mb-12">
                        <h2 id="ciri-ciri-heading" className="text-3xl md:text-4xl font-bold tracking-wide text-[#0C134F] mb-3">
                            Ciri-Ciri <span className="text-[#93A5FF]">Penipuan SMS</span>
                        </h2>
                        <p className="text-gray-600 text-sm md:text-base">
                            Kenali tanda-tanda umum pesan mencurigakan agar tidak mudah terjebak kejahatan digital.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {ciriCiri.map((item) => (
                            <div 
                                key={item.id} 
                                className="bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-md border border-[#93A5FF]/30 hover:shadow-lg transition flex flex-col justify-between"
                            >
                                <div>
                                    <div className="w-10 h-10 rounded-xl bg-[#0C134F] text-[#93A5FF] font-bold flex items-center justify-center mb-4">
                                        0{item.id}
                                    </div>
                                    <h3 className="text-lg font-bold text-[#0C134F] mb-2">{item.title}</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div id="tips-pencegahan" className="pt-8">
                    <div className="text-center max-w-2xl mx-auto mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold tracking-wide text-[#0C134F] mb-3">
                            Tips <span className="text-[#93A5FF]">Pencegahan</span>
                        </h2>
                        <p className="text-gray-600 text-sm md:text-base">
                            Langkah preventif yang bisa kamu lakukan sehari-hari untuk melindungi diri dari modus penipuan.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {tipsPencegahan.map((item) => (
                            <div 
                                key={item.id} 
                                className="bg-[#0C134F] backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-[#93A5FF]/30 hover:shadow-2xl transition flex flex-col justify-between"
                            >
                                <div>
                                    <div className="w-12 h-12 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center mb-4 shadow-sm">
                                        {item.icon}
                                    </div>
                                    <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                                    <p className="text-slate-200 text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}