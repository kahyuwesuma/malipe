"use client";

import { useState } from "react";
import Image from "next/image";
import { useAutoTranslate } from "@/components/translate/useAutoTranslate";

export default function Hero() {
  const [imageLoaded, setImageLoaded] = useState(false);

  // Hero section translations
  const translatedTitle = useAutoTranslate("Fakta Unik Penyu Hijau");
  const translatedDesc = useAutoTranslate(
    "Menyelami kehidupan reptil laut legendaris yang telah menjelajahi samudra selama jutaan tahun"
  );
  const imageCaption = useAutoTranslate("Penyu hijau sedang berenang mencari makanan di terumbu karang");

  return (
    <div className="font-AktivGrotesk-Regular">
      {/* Header */}
      <header className="px-6 py-12 max-w-4xl mx-auto">
        <div className="text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            {translatedTitle}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {translatedDesc}
          </p>
        </div>
      </header>

      {/* Hero Image */}
      <section className="px-6 mb-16 max-w-4xl mx-auto">
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
          <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
            <div className={`transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}>
              <Image
                src="/images/penyu-hijau.jpg"
                alt="Penyu Hijau berenang di lautan biru"
                fill
                className="object-cover"
                onLoad={() => setImageLoaded(true)}
                priority
              />
            </div>
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                <div className="text-gray-400">Loading...</div>
              </div>
            )}
            
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            
            {/* Image caption */}
            <div className="absolute bottom-6 left-6 text-white">
              <p className="text-sm opacity-90">
                {imageCaption}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}