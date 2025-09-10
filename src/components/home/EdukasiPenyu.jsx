"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronRight, Heart, Waves, Thermometer, Leaf, Navigation, Clock } from "lucide-react";

export default function EdukasiPenyu() {
  const [imageLoaded, setImageLoaded] = useState(false);

  const facts = [
    {
      icon: <Leaf className="w-5 h-5 text-emerald-600" />,
      text: "Nama penyu hijau berasal dari lapisan lemak hijau di bawah tempurung"
    },
    {
      icon: <Navigation className="w-5 h-5 text-blue-600" />,
      text: "Kembali bertelur di pantai tempat mereka lahir dengan navigasi magnetik"
    },
    {
      icon: <Clock className="w-5 h-5 text-purple-600" />,
      text: "Mampu menahan napas hingga 5 jam saat beristirahat"
    },
    {
      icon: <Heart className="w-5 h-5 text-red-500" />,
      text: "Satu-satunya penyu herbivora dewasa di dunia"
    },
    {
      icon: <Thermometer className="w-5 h-5 text-orange-600" />,
      text: "Jenis kelamin bayi ditentukan oleh temperatur sarang"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-cyan-50 via-emerald-50 to-blue-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-emerald-400"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 rounded-full bg-blue-400"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 rounded-full bg-cyan-400"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Enhanced Heading */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full border border-emerald-200 mb-6">
            <Waves className="w-5 h-5 text-emerald-600" />
            <span className="text-emerald-700 font-medium text-sm">Konservasi Laut Indonesia</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-emerald-800 via-teal-700 to-blue-800 bg-clip-text text-transparent mb-6 leading-tight">
            Mengenal Penyu Hijau
            <br />
            <span className="text-3xl md:text-4xl lg:text-5xl">dan Fakta Uniknya</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Jelajahi kehidupan menakjubkan reptil laut purba yang telah mengarungi samudra selama jutaan tahun
          </p>
        </div>

        {/* Enhanced Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Enhanced Image Section */}
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
            <div className="relative">
              <div className="relative w-full h-96 lg:h-[500px] overflow-hidden rounded-2xl shadow-2xl">
                <div className={`absolute inset-0 bg-gradient-to-t from-emerald-900/20 to-transparent z-10 transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}></div>
                
                {/* Placeholder while loading */}
                {!imageLoaded && (
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-200 to-blue-200 animate-pulse flex items-center justify-center">
                    <Waves className="w-16 h-16 text-emerald-400 animate-bounce" />
                  </div>
                )}
                
                <Image
                  src="/images/penyu-hijau.jpg"
                  alt="Penyu Hijau berenang di perairan tropis Indonesia"
                  fill
                  className={`object-cover transition-all duration-700 ${imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
                  onLoad={() => setImageLoaded(true)}
                  priority
                />
                
                {/* Floating Badge */}
                {imageLoaded && (
                  <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg z-20 animate-fade-in">
                    <span className="text-emerald-700 font-semibold text-sm">Chelonia mydas</span>
                  </div>
                )}
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-full opacity-20"></div>
              <div className="absolute -top-6 -left-6 w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full opacity-30"></div>
            </div>
          </div>

          {/* Enhanced Text Content */}
          <div className="space-y-8">
            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 group">
              <CardContent className="p-8">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-emerald-700 transition-colors">
                    Reptil Laut Legendaris
                  </h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Penyu hijau (<em className="font-semibold text-emerald-700">Chelonia mydas</em>) adalah reptil laut yang
                    menjadi satwa endemik di perairan Indonesia. Mereka hidup di
                    kawasan tropis dan subtropis Samudera Atlantik dan Pasifik, menjadi saksi bisu perjalanan evolusi laut selama jutaan tahun.
                  </p>
                </div>

                {/* Enhanced Facts List */}
                <div className="space-y-4 mb-8">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Fakta Menakjubkan:</h4>
                  {facts.map((fact, index) => (
                    <div 
                      key={index}
                      className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors group/fact"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex-shrink-0 p-2 bg-gray-50 rounded-lg group-hover/fact:bg-white transition-colors">
                        {fact.icon}
                      </div>
                      <p className="text-gray-700 leading-relaxed group-hover/fact:text-gray-900 transition-colors">
                        {fact.text}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Enhanced CTA */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/fakta-penyu" className="flex-1">
                    <Button 
                      className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group/button text-lg"
                    >
                      <span>Jelajahi Lebih Dalam</span>
                      <ChevronRight className="ml-2 w-5 h-5 group-hover/button:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  
                  <Button 
                    variant="outline" 
                    className="border-2 border-emerald-200 hover:border-emerald-300 hover:bg-emerald-50 text-emerald-700 font-semibold py-4 px-8 rounded-xl transition-all duration-300"
                  >
                    <Heart className="mr-2 w-5 h-5" />
                    Dukung Konservasi
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 text-center border border-emerald-100 hover:bg-white/80 transition-all">
                <div className="text-2xl font-bold text-emerald-600">80+</div>
                <div className="text-sm text-gray-600">Tahun Hidup</div>
              </div>
              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 text-center border border-blue-100 hover:bg-white/80 transition-all">
                <div className="text-2xl font-bold text-blue-600">35 mph</div>
                <div className="text-sm text-gray-600">Kecepatan Renang</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
      `}</style>
    </section>
  );
}