import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// 1. Skema validasi Zod di sisi Server
const smsSchema = z.object({
  smsText: z.string().min(10).max(1500),
});

// 2. Fungsi POST untuk menerima data dari form
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ route: string[] }> }
) {
  const resolvedParams = await params;
  const route = resolvedParams.route;

  // Jika URL nya /api/analyze
  if (route[0] === "analyze") {
    try {
      // Ambil data dari body request
      const body = await req.json();

      // PERBAIKAN UTAMA: Gunakan safeParse, bukan parse biasa
      const validation = smsSchema.safeParse(body); 

      // Jika validasi gagal, kembalikan error 400
      if (!validation.success) {
        return NextResponse.json(
          { success: false, error: validation.error.flatten().fieldErrors }, 
          { status: 400 }
        );
      }

      // Jika sukses, kita ambil datanya dengan aman
      const parsedData = validation.data;

      // Simulasi delay proses AI
      await new Promise((resolve) => setTimeout(resolve, 1500));

      return NextResponse.json({
        success: true,
        data: {
          riskLevel: "HIGH_RISK",
          message: "Pesan terindikasi penipuan(Phising/Scam)",
          analyzedText: parsedData.smsText,
        },
      });
        
    } catch (error) {
      return NextResponse.json(
        { success: false, error: "Internal Server Error" }, 
        { status: 500 }
      );
    }
  }
  
  // jika URL not found
  return NextResponse.json({ error: "Endpoint Not Found " }, { status: 404 });
}