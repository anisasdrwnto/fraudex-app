"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export default function QueryProvider({ children }: { children: React.ReactNode }) {
  // Kita menggunakan useState agar QueryClient hanya dibuat satu kali per sesi (tidak ter-recreate saat render ulang)
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Syarat Bab 8: Mengatur staleTime (waktu kedaluwarsa cache)
            staleTime: 60 * 1000, // Data dianggap "fresh" selama 1 menit
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}