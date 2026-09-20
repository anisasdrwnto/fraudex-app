import SMSInputForm from "./SMSInputForm";
import DetectionResultCard from "./DetectionResultCard";

export default function CekSMSSection() {
  return (
    <section 
      id="cek-sms" 
      aria-labelledby="cek-sms-heading" 
      className="relative w-full bg-[#FFFFF] py-24 px-6 md:px-12 justify-center"
    >
      <div className="absolute inset-0" aria-hidden="true"></div>
      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-start text-left">
        <h2 
          id="cek-sms-heading" 
          className="font-[family-name:var(--font-quantico)] text-4xl font-bold tracking-wide text-[#0C134F]"
        >
          Cek SMSmu Di sini!
        </h2>
        
        <p className="mt-2 text-lg font-medium text-[#0C134F]">
          Ketik pesan SMS atau tempel pesannya di sini...
        </p>
        
        {/* PERBAIKAN DI SINI: flex-col items-center agar kartu ada di bawah form */}
        <div className="mt-8 w-full flex flex-col items-center">
          <SMSInputForm />
          
          {/* INI YANG TADI KELUPAAN DIMASUKKAN */}
          <DetectionResultCard />
        </div>
      </div>
    </section>
  );
}