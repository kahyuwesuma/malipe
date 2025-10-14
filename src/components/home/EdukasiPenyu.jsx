"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronRight, Heart, Waves, Thermometer, Leaf, Navigation, Clock } from "lucide-react";

// Import the image from src/asset/home
import penyuHijauImage from "../../asset/home/penyu-hijau.jpg";

export default function EdukasiPenyu() {
  const [imageLoaded, setImageLoaded] = useState(false);

  const facts = [
    {
      icon: <Leaf className="w-4 h-4" />,
      text: "Nama dari lapisan lemak hijau di bawah tempurung"
    },
    {
      icon: <Navigation className="w-4 h-4" />,
      text: "Kembali bertelur di pantai tempat lahir"
    },
    {
      icon: <Clock className="w-4 h-4" />,
      text: "Mampu menahan napas hingga 5 jam"
    },
    {
      icon: <Heart className="w-4 h-4" />,
      text: "Satu-satunya penyu herbivora dewasa"
    },
    {
      icon: <Thermometer className="w-4 h-4" />,
      text: "Jenis kelamin ditentukan suhu sarang"
    }
  ];

  return (
    <section className="py-16 bg-white font-AktivGrotesk-Regular">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1B602F] mb-4 leading-tight">
            Mengenal Penyu Hijau
          </h1>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Reptil laut purba yang telah mengarungi samudra selama jutaan tahun
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="grid lg:grid-cols-5 gap-0">
            
            {/* Image Section */}
            <div className="lg:col-span-2 relative">
              <div className="relative w-full h-80 lg:h-full lg:min-h-[500px]">
                {!imageLoaded && (
                  <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                    <Waves className="w-8 h-8 text-[#1B602F] animate-pulse" />
                  </div>
                )}
                
                <Image
                  src={penyuHijauImage}
                  alt="Penyu Hijau berenang di perairan Indonesia"
                  fill
                  className={`object-cover transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                  onLoad={() => setImageLoaded(true)}
                  priority
                />
                
                {imageLoaded && (
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-sm">
                    <span className="text-[#1B602F] font-medium text-sm">Chelonia mydas</span>
                  </div>
                )}
              </div>
            </div>

            {/* Content Section */}
            <div className="lg:col-span-3 p-8 lg:p-12 flex flex-col justify-center">
              
              {/* Description */}
              <div className="mb-8">
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                  Reptil Laut Legendaris
                </h2>
                <p className="text-gray-600 leading-relaxed text-lg">
                  Penyu hijau (<em className="text-[#1B602F] font-medium">Chelonia mydas</em>) adalah reptil laut 
                  yang hidup di perairan tropis Indonesia. Mereka menjadi saksi perjalanan evolusi 
                  laut selama jutaan tahun.
                </p>
              </div>

              {/* Facts */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Fakta Menarik</h3>
                <div className="space-y-4">
                  {facts.map((fact, index) => (
                    <div key={index} className="flex items-center gap-4 group">
                      <div className="flex-shrink-0 w-10 h-10 bg-[#1B602F]/10 rounded-xl flex items-center justify-center text-[#1B602F] group-hover:bg-[#1B602F]/20 transition-colors">
                        {fact.icon}
                      </div>
                      <p className="text-gray-700 leading-relaxed">{fact.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#1B602F] mb-1">80+</div>
                  <div className="text-sm text-gray-600">Tahun Hidup</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#1B602F] mb-1">35</div>
                  <div className="text-sm text-gray-600">mph Renang</div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/fakta-penyu" className="flex-1">
                  <Button className="w-full bg-[#1B602F] hover:bg-[#144a25] text-white font-medium py-3 px-6 rounded-lg transition-colors group">
                    Jelajahi Lebih Dalam
                    <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                
                <Button 
                  variant="outline" 
                  className="border-2 border-[#1B602F]/30 hover:border-[#1B602F]/50 hover:bg-[#1B602F]/10 text-[#1B602F] font-medium py-3 px-6 rounded-lg transition-colors"
                >
                  <Heart className="mr-2 w-4 h-4" />
                  Dukung Konservasi
                </Button>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}