"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Waves, 
  MapPin, 
  Thermometer, 
  Clock, 
  Leaf, 
  Navigation,
  Heart,
  Globe,
  Fish,
  TreePine,
  Mountain,
  Compass,
  BookOpen
} from "lucide-react";

export default function FaktaPenyuPage() {
  const [imageLoaded, setImageLoaded] = useState(false);

  const uniqueFacts = [
    {
      icon: <Leaf className="w-6 h-6 text-emerald-500" />,
      title: "Warna Hijau Misterius",
      description: "Nama penyu hijau bukan diambil dari warna cangkang, tapi dari lemak hijau di bawah tempurungnya.",
      color: "emerald"
    },
    {
      icon: <Navigation className="w-6 h-6 text-blue-500" />,
      title: "Navigator Alami",
      description: "Penyu hijau kembali bertelur di pantai tempat mereka lahir dengan bantuan medan magnet bumi.",
      color: "blue"
    },
    {
      icon: <Clock className="w-6 h-6 text-purple-500" />,
      title: "Master Menahan Nafas",
      description: "Mampu menahan napas hingga berjam-jam dan tidur di laut selama 4–7 jam.",
      color: "purple"
    },
    {
      icon: <Fish className="w-6 h-6 text-teal-500" />,
      title: "Vegetarian Laut",
      description: "Satu-satunya penyu herbivora, memakan lamun dan alga laut saat dewasa.",
      color: "teal"
    },
    {
      icon: <Thermometer className="w-6 h-6 text-orange-500" />,
      title: "Temperatur Menentukan",
      description: "Jenis kelamin bayi penyu ditentukan oleh suhu sarang tempat bertelur.",
      color: "orange"
    }
  ];

  const habitats = [
    {
      icon: <TreePine className="w-5 h-5 text-green-600" />,
      region: "Perairan Barat",
      locations: "Aceh, Sumatera Barat, Kepulauan Riau, Bangka Belitung",
      gradient: "from-green-100 to-emerald-100"
    },
    {
      icon: <Mountain className="w-5 h-5 text-blue-600" />,
      region: "Perairan Tengah", 
      locations: "Kepulauan Seribu, Jawa, Kalimantan, Karimun Jawa",
      gradient: "from-blue-100 to-cyan-100"
    },
    {
      icon: <Compass className="w-5 h-5 text-purple-600" />,
      region: "Perairan Timur",
      locations: "Sulawesi, Bali, NTB, NTT, Maluku, Papua (dominan di Sumbawa Barat & Bali)",
      gradient: "from-purple-100 to-pink-100"
    }
  ];

  const classification = [
    { label: "Kingdom", value: "Animalia", icon: "🌍" },
    { label: "Filum", value: "Chordata", icon: "🦴" },
    { label: "Kelas", value: "Reptilia", icon: "🦎" },
    { label: "Subkelas", value: "Anapsida", icon: "🔬" },
    { label: "Ordo", value: "Testudines", icon: "🐢" },
    { label: "Famili", value: "Cheloniidae", icon: "👨‍👩‍👧‍👦" },
    { label: "Genus", value: "Chelonia", icon: "🧬" },
    { label: "Spesies", value: "Chelonia mydas", icon: "⭐" }
  ];

  const localNames = [
    "Penyu Daging (Bali)",
    "Penyu Sala (Sumbawa)", 
    "Penyu Pendok (Karimun Jawa)",
    "Katuwang (Sumatera Barat)",
    "Panyo' Kambau (Paloh)"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-emerald-400 blur-3xl"></div>
        <div className="absolute bottom-32 left-16 w-80 h-80 rounded-full bg-blue-400 blur-3xl"></div>
        <div className="absolute top-1/2 right-1/3 w-32 h-32 rounded-full bg-cyan-400 blur-2xl"></div>
      </div>

      <section className="py-20 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Enhanced Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full border border-emerald-200 mb-8 shadow-lg">
              <BookOpen className="w-6 h-6 text-emerald-600" />
              <span className="text-emerald-700 font-semibold">Ensiklopedia Laut Indonesia</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-emerald-800 via-teal-700 to-blue-800 bg-clip-text text-transparent mb-8 leading-tight">
              Fakta Unik
              <br />
              <span className="text-4xl md:text-5xl lg:text-6xl">Penyu Hijau</span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Menyelami kehidupan reptil laut legendaris yang telah menjelajahi samudra selama jutaan tahun
            </p>
          </div>

          {/* Enhanced Cover Image */}
          <div className="relative mb-16 group">
            <div className="absolute -inset-6 bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-500 rounded-3xl blur-2xl opacity-25 group-hover:opacity-40 transition duration-500"></div>
            <div className="relative">
              <div className="relative w-full h-[500px] lg:h-[600px] overflow-hidden rounded-3xl shadow-2xl">
                {!imageLoaded && (
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-200 to-blue-200 animate-pulse flex items-center justify-center">
                    <Waves className="w-20 h-20 text-emerald-400 animate-bounce" />
                  </div>
                )}
                
                <Image
                  src="/images/penyu-hijau.jpg"
                  alt="Penyu Hijau berenang di habitat alaminya di perairan Indonesia"
                  fill
                  className={`object-cover transition-all duration-700 ${imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
                  onLoad={() => setImageLoaded(true)}
                  priority
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                
                {imageLoaded && (
                  <div className="absolute bottom-8 left-8 right-8">
                    <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-xl">
                      <h2 className="text-2xl font-bold text-gray-800 mb-2">Chelonia mydas</h2>
                      <p className="text-gray-600">Reptil laut endemik perairan Indonesia</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Enhanced Introduction */}
          <Card className="mb-16 shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8 lg:p-12">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-emerald-100 rounded-full">
                  <Globe className="w-8 h-8 text-emerald-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Pengenalan</h2>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    Penyu hijau (<em className="font-semibold text-emerald-700">Chelonia mydas</em>) adalah reptil penyu laut yang
                    menjadi satwa endemik di seluruh perairan Indonesia. Penyu ini
                    termasuk keluarga <em className="font-semibold text-blue-700">Cheloniidae</em> dan tinggal di perairan laut
                    tropis serta subtropis di Samudera Atlantik dan Pasifik, menjadi saksi hidup evolusi laut selama jutaan tahun.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Facts Section */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Fakta Menakjubkan</h2>
              <p className="text-gray-600 text-lg">Temukan keunikan yang membuat penyu hijau begitu istimewa</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {uniqueFacts.map((fact, index) => (
                <Card 
                  key={index} 
                  className="group hover:shadow-2xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm overflow-hidden"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-6 h-full">
                    <div className="flex flex-col h-full">
                      <div className={`p-4 rounded-2xl bg-${fact.color}-50 w-fit mb-4 group-hover:scale-110 transition-transform`}>
                        {fact.icon}
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-emerald-700 transition-colors">
                        {fact.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed flex-grow">
                        {fact.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Enhanced Habitat Section */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Habitat & Sebaran</h2>
              <p className="text-gray-600 text-lg">Penyu hijau tersebar di seluruh perairan Indonesia dalam tiga wilayah utama</p>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-8">
              {habitats.map((habitat, index) => (
                <Card 
                  key={index}
                  className={`group hover:shadow-2xl transition-all duration-300 border-0 bg-gradient-to-br ${habitat.gradient} overflow-hidden`}
                >
                  <CardContent className="p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 bg-white rounded-full shadow-lg group-hover:scale-110 transition-transform">
                        {habitat.icon}
                      </div>
                      <h3 className="text-xl font-bold text-gray-800">{habitat.region}</h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{habitat.locations}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Enhanced Classification */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Klasifikasi Ilmiah</h2>
              <p className="text-gray-600 text-lg">Taksonomi lengkap penyu hijau dalam sistem klasifikasi biologis</p>
            </div>
            
            <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm overflow-hidden">
              <CardContent className="p-0">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-0">
                  {classification.map((item, index) => (
                    <div 
                      key={index}
                      className="p-6 border-b lg:border-r border-gray-100 hover:bg-emerald-50 transition-colors group"
                    >
                      <div className="text-center">
                        <div className="text-3xl mb-3 group-hover:scale-125 transition-transform">
                          {item.icon}
                        </div>
                        <div className="font-bold text-gray-800 text-sm mb-1">{item.label}</div>
                        <div className="text-emerald-700 font-semibold">{item.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Local Names */}
          <Card className="shadow-2xl border-0 bg-gradient-to-r from-emerald-50 to-blue-50 overflow-hidden">
            <CardContent className="p-8 lg:p-12">
              <div className="flex items-start gap-6">
                <div className="p-4 bg-white rounded-full shadow-lg">
                  <MapPin className="w-8 h-8 text-emerald-600" />
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-gray-800 mb-6">Nama Lokal di Indonesia</h2>
                  <p className="text-gray-700 text-lg leading-relaxed mb-8">
                    Di berbagai daerah di Indonesia, penyu hijau dikenal dengan nama yang berbeda, 
                    mencerminkan kekayaan budaya dan kedekatan masyarakat lokal dengan satwa laut ini.
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {localNames.map((name, index) => (
                      <div 
                        key={index}
                        className="bg-white/80 backdrop-blur-sm hover:bg-white rounded-xl p-4 border border-emerald-200 hover:border-emerald-300 hover:shadow-lg transition-all duration-300 group"
                      >
                        <div className="text-gray-700 font-medium group-hover:text-emerald-700 transition-colors">
                          {name}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
}