"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CekSMSSection from "@/components/CekSMSSection"; 
import TentangKami from "@/components/TentangKami";
import FeedbackSection from "@/components/FeedbackSection";
import Testimonials from "@/components/Testimonials";
import CiriDanTipsSection from "@/components/Edukasi";
import Footer from "@/components/Footer";
export default function Home(){
  // State untuk mengontrol status buka/tutup dialog umpan balik
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

  return(
    <main className="min-h-screen bg-white text-gray-900">
      <Navbar />
      <Hero />
      <CekSMSSection />
      <CiriDanTipsSection />
      <TentangKami />
      <Testimonials />
      <FeedbackSection />
      <Footer />
    </main>
  );
}