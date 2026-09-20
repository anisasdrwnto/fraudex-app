"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send, AlertCircle } from "lucide-react";
import { useMutation } from "@tanstack/react-query"; 
import { useAnalysisStore } from "@/store/useAnalysisStore"; 

const formSchema = z.object({
  smsText: z
    .string()
    .min(10, { message: "Pesan terlalu pendek, minimal 10 karakter." })
    .max(1500, { message: "Pesan maksimal 1500 karakter." }),
});

type FormValues = z.infer<typeof formSchema>;

export default function SMSInputForm() {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Memanggil fungsi dari Zustand untuk menyimpan hasil analisis
  const setResult = useAnalysisStore((state) => state.setResult);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const smsValue = watch("smsText");

  // Setup TanStack Query Mutation untuk mengirim data ke BFF API
  const analyzeMutation = useMutation({
    mutationFn: async (smsText: string) => {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ smsText }),
      });

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("text/html")) {
        throw new Error("Akses Ditolak: Anda wajib masuk (login) terlebih dahulu!");
      }

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Gagal menganalisis SMS");
      }

      return result.data; 
    },
    onSuccess: (data) => {
      setResult(data);
    },
    onError: (error) => {
      console.error("Terjadi kesalahan:", error);
    },
  });

  // Fungsi submit form sekarang diproses oleh mutation
  const onSubmit = (data: FormValues) => {
    // Reset hasil sebelumnya saat memulai analisis baru (opsional tapi disarankan)
    setResult(null); 
    analyzeMutation.mutate(data.smsText);
  };

  const handleBlur = () => {
    if (!smsValue || smsValue.trim() === "") {
      setIsExpanded(false);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit(onSubmit)} 
      className={`relative w-full transition-all duration-300 ease-in-out ${
        isExpanded ? "shadow-lg" : "shadow-md"
      } rounded-xl bg-white border border-gray-200`}
      noValidate
    >
      <div className="relative flex flex-col p-2">
        <textarea
          id="smsText"
          {...register("smsText", {
            onBlur: handleBlur,
          })}
          onFocus={() => setIsExpanded(true)}
          rows={isExpanded ? 5 : 1}
          placeholder="Ketik atau tempel SMS di sini..."
          // PERUBAHAN DI SINI: Menggunakan font Poppins via CSS Variable
          className="w-full resize-none rounded-lg p-3 text-base font-[family-name:var(--font-poppins)] text-gray-800 placeholder-gray-400 outline-none transition-all duration-300 disabled:opacity-50 disabled:bg-gray-50"
          aria-invalid={errors.smsText ? "true" : "false"}
          disabled={analyzeMutation.isPending} // Kunci input saat loading
        />

        {isExpanded && (
          <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-3 px-2">
            <div className="min-h-[20px] flex-1">
              {/* Tampilkan pesan error dari Zod */}
              {errors.smsText && (
                <span className="text-sm font-medium text-red-500" role="alert">
                  {errors.smsText.message}
                </span>
              )}

              {/* Tampilkan pesan error dari API (jika server down dll) */}
              {analyzeMutation.isError && !errors.smsText && (
                <span className="flex items-center text-sm font-medium text-red-500" role="alert">
                  <AlertCircle size={16} className="mr-1" />
                  {analyzeMutation.error.message}
                </span>
              )}
              
              {/* Teks bantuan default */}
              {!errors.smsText && !analyzeMutation.isError && !analyzeMutation.isPending && (
                <span className="text-sm text-gray-400">
                  Tekan tombol di samping untuk memulai analisis.
                </span>
              )}

              {/* Teks status loading */}
              {analyzeMutation.isPending && (
                <span className="text-sm font-medium text-blue-600 animate-pulse">
                  Sedang menganalisis pesan dengan AI...
                </span>
              )}
            </div>

            <button
              type="submit"
              disabled={analyzeMutation.isPending}
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#1D267D] text-white transition-transform hover:scale-105 hover:bg-[#0C134F] focus:outline-none focus:ring-4 focus:ring-blue-100 disabled:opacity-50 disabled:hover:scale-100"
              aria-label="Kirim teks untuk dianalisis"
            >
              <Send 
                size={20} 
                className={`${analyzeMutation.isPending ? "animate-bounce" : "-ml-1"}`} 
              />
            </button>
          </div>
        )}
      </div>
    </form>
  );
}