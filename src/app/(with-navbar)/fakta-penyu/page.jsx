"use client";

import { useState } from "react";
import Image from "next/image";
import { 
  Leaf, 
  Navigation, 
  Clock, 
  Fish, 
  Thermometer,
  TreePine,
  Mountain,
  Compass,
  MapPin,
  Globe
} from "lucide-react";

export default function FaktaPenyuPage() {
  const [imageLoaded, setImageLoaded] = useState(false);

  const uniqueFacts = [
    {
      icon: <Leaf className="w-5 h-5" />,
      title: "Warna Hijau Misterius",
      description: "Nama penyu hijau bukan diambil dari warna cangkang, tapi dari lemak hijau di bawah tempurungnya."
    },
    {
      icon: <Navigation className="w-5 h-5" />,
      title: "Navigator Alami", 
      description: "Penyu hijau kembali bertelur di pantai tempat mereka lahir dengan bantuan medan magnet bumi."
    },
    {
      icon: <Clock className="w-5 h-5" />,
      title: "Master Menahan Nafas",
      description: "Mampu menahan napas hingga berjam-jam dan tidur di laut selama 4–7 jam."
    },
    {
      icon: <Fish className="w-5 h-5" />,
      title: "Vegetarian Laut",
      description: "Satu-satunya penyu herbivora, memakan lamun dan alga laut saat dewasa."
    },
    {
      icon: <Thermometer className="w-5 h-5" />,
      title: "Temperatur Menentukan",
      description: "Jenis kelamin bayi penyu ditentukan oleh suhu sarang tempat bertelur."
    }
  ];

  const habitats = [
    {
      icon: <TreePine className="w-5 h-5" />,
      region: "Perairan Barat",
      locations: "Aceh, Sumatera Barat, Kepulauan Riau, Bangka Belitung"
    },
    {
      icon: <Mountain className="w-5 h-5" />,
      region: "Perairan Tengah", 
      locations: "Kepulauan Seribu, Jawa, Kalimantan, Karimun Jawa"
    },
    {
      icon: <Compass className="w-5 h-5" />,
      region: "Perairan Timur",
      locations: "Sulawesi, Bali, NTB, NTT, Maluku, Papua"
    }
  ];

  const classification = [
    { label: "Kingdom", value: "Animalia" },
    { label: "Filum", value: "Chordata" },
    { label: "Kelas", value: "Reptilia" },
    { label: "Ordo", value: "Testudines" },
    { label: "Famili", value: "Cheloniidae" },
    { label: "Genus", value: "Chelonia" },
    { label: "Spesies", value: "Chelonia mydas" }
  ];

  const localNames = [
    "Penyu Daging (Bali)",
    "Penyu Sala (Sumbawa)", 
    "Penyu Pendok (Karimun Jawa)",
    "Katuwang (Sumatera Barat)",
    "Panyo' Kambau (Paloh)"
  ];

  return (
    <div className="min-h-screen bg-white font-['AktivGrotesk-Regular'] text-[#1B602F]">
      {/* Header */}
      <header className="px-6 py-12 max-w-4xl mx-auto">
        <div className="text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Fakta Unik Penyu Hijau
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Menyelami kehidupan reptil laut legendaris yang telah menjelajahi samudra selama jutaan tahun
          </p>
        </div>
      </header>

      {/* Hero Image */}
      <section className="px-6 mb-16 max-w-4xl mx-auto">
        <div className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden bg-gray-100">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
              <div className="w-12 h-12 border-2 border-[#1B602F] border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          
          <Image
            src="/images/penyu-hijau.jpg"
            alt="Penyu Hijau berenang di habitat alaminya"
            fill
            className={`object-cover transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setImageLoaded(true)}
            priority
          />
          
          {imageLoaded && (
            <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm px-6 py-4 rounded-xl">
              <h2 className="font-bold text-lg mb-1">Chelonia mydas</h2>
              <p className="text-sm text-gray-600">Reptil laut endemik Indonesia</p>
            </div>
          )}
        </div>
      </section>

      <div className="px-6 max-w-4xl mx-auto space-y-16">
        {/* Introduction */}
        <section className="bg-gray-50 rounded-2xl p-8">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-[#1B602F] rounded-lg">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4">Pengenalan</h2>
              <p className="text-gray-700 leading-relaxed">
                Penyu hijau (<em className="font-semibold">Chelonia mydas</em>) adalah reptil penyu laut yang
                menjadi satwa endemik di seluruh perairan Indonesia. Penyu ini
                termasuk keluarga <em className="font-semibold">Cheloniidae</em> dan tinggal di perairan laut
                tropis serta subtropis di Samudera Atlantik dan Pasifik.
              </p>
            </div>
          </div>
        </section>

        {/* Facts */}
        <section>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-[#1B602F]">Fakta Menakjubkan</h2>
            <p className="text-gray-600 text-lg">Temukan keunikan yang membuat penyu hijau begitu istimewa</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {uniqueFacts.map((fact, index) => (
              <div 
                key={index} 
                className="group p-8 bg-white border border-gray-200 rounded-2xl hover:border-[#1B602F] hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start gap-6">
                  <div className="p-3 bg-[#1B602F]/10 rounded-xl text-[#1B602F] group-hover:bg-[#1B602F] group-hover:text-white transition-all duration-300">
                    {fact.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-xl mb-3 text-[#1B602F] group-hover:text-[#1B602F] transition-colors">
                      {fact.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">{fact.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Habitat */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-12">Habitat & Sebaran</h2>
          <div className="grid lg:grid-cols-3 gap-6">
            {habitats.map((habitat, index) => (
              <div key={index} className="p-6 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-[#1B602F] rounded-lg text-white">
                    {habitat.icon}
                  </div>
                  <h3 className="font-bold text-lg">{habitat.region}</h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{habitat.locations}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Classification */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-12">Klasifikasi Ilmiah</h2>
          <div className="bg-gray-50 rounded-2xl overflow-hidden">
            <div className="grid md:grid-cols-2 lg:grid-cols-4">
              {classification.map((item, index) => (
                <div 
                  key={index}
                  className="p-6 border-r border-b border-gray-200 last:border-r-0 lg:last:border-r md:last:border-r-0 lg:[&:nth-child(4n)]:border-r-0"
                >
                  <div className="text-center">
                    <div className="text-xs font-medium text-gray-500 mb-1">{item.label}</div>
                    <div className="font-semibold text-sm">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Local Names */}
        <section className="bg-gray-50 rounded-2xl p-8">
          <div className="flex items-start gap-4 mb-8">
            <div className="p-2 bg-[#1B602F] rounded-lg">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4">Nama Lokal di Indonesia</h2>
              <p className="text-gray-700 leading-relaxed">
                Di berbagai daerah di Indonesia, penyu hijau dikenal dengan nama yang berbeda, 
                mencerminkan kekayaan budaya dan kedekatan masyarakat lokal.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {localNames.map((name, index) => (
              <div 
                key={index}
                className="px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm"
              >
                {name}
              </div>
            ))}
          </div>
        </section>
      </div>
      
      {/* Bottom Spacing */}
      <div className="h-16"></div>
    </div>
  );
}