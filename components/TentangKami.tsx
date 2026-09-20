import Image from "next/image";

export default function TentangKamiSection() {
  return (
    <section 
      id="tentang-kami" 
      aria-labelledby="tentang-kami-heading" 
      className="relative w-full bg-cover bg-center bg-no-repeat py-24 px-6 md:px-12 overflow-hidden"
      style={{ backgroundImage: "url('/background-4.png')" }}
    >
      <div className="mx-auto flex max-w-7xl flex-col lg:flex-row items-center justify-between gap-12">
        <div className="w-full lg:w-7/12 flex flex-col items-start text-left z-10">
          <h2 
            id="tentang-kami-heading" 
            className="font-[family-name:var(--font-quantico)] text-4xl md:text-5xl font-bold tracking-wide text-white mb-6"
          >
            Tentang Kami
          </h2>
          
          <div className="space-y-4 text-slate-200 text-base md:text-lg leading-relaxed font-normal">
            <p>
              Pernahkah kalian melihat permasalahan penipuan di sekitar Anda? Jika pernah, langkah apa yang kalian lakukan untuk menghindarinya?
            </p>
            <p>
              Tentunya, masalah ini bukanlah masalah yang sepele. Perlu adanya pencegahan dini agar kerugian yang lebih besar dapat dihindari. Sayangnya, banyak korban baru menyadari dirinya tertipu setelah semuanya terlambat.
            </p>
            <p>
              Dari permasalahan inilah, kami menghadirkan <strong>Fraudex</strong>, sebuah sistem pendeteksi penipuan online berbasis SMS yang mampu mengidentifikasi pesan mencurigakan secara otomatis dan <em>real-time</em>, sehingga masyarakat dapat terhindar dari jebakan penipuan digital sebelum menjadi korban.
            </p>
          </div>
        </div>

        <div className="w-full lg:w-5/12 flex justify-center items-center z-10">
          <div className="relative w-full max-w-lg aspect-square">
            <Image 
              src="/laptop.png" 
              alt="Ilustrasi Keamanan Siber Laptop Fraudex" 
              fill 
              className="object-contain animate-float drop-shadow-[0_20px_30px_rgba(0,0,0,0.5)]"
              priority
            />
          </div>
        </div>

      </div>
    </section>
  );
}