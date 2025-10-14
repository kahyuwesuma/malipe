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
  Globe,
  Waves
} from "lucide-react";
import { useTranslation } from "@/components/translate/TranslationContext";
import { useAutoTranslate } from "@/components/translate/useAutoTranslate";

// Import gambar dari src/asset/home menggunakan alias
import penyuHijauImage from "@/asset/home/penyu-hijau.jpg";

export default function TurtleFact() {
  const { translateText } = useTranslation();
  const [imageLoaded, setImageLoaded] = useState(false);

  // Section titles translations
  const introTitle = useAutoTranslate("Pengenalan");
  const introText = useAutoTranslate(
    "Penyu hijau (Chelonia mydas) adalah reptil penyu laut yang menjadi satwa endemik di seluruh perairan Indonesia. Penyu ini termasuk keluarga Cheloniidae dan tinggal di perairan laut tropis serta subtropis di Samudera Atlantik dan Pasifik."
  );
  const faktaTitle = useAutoTranslate("Fakta Menakjubkan");
  const faktaDesc = useAutoTranslate(
    "Temukan keunikan yang membuat penyu hijau begitu istimewa"
  );
  const habitatTitle = useAutoTranslate("Habitat & Sebaran");
  const klasifikasiTitle = useAutoTranslate("Klasifikasi Ilmiah");
  const localNameTitle = useAutoTranslate("Nama Lokal di Indonesia");
  const localNameDesc = useAutoTranslate(
    "Di berbagai daerah di Indonesia, penyu hijau dikenal dengan nama yang berbeda, mencerminkan kekayaan budaya dan kedekatan masyarakat lokal."
  );

  const uniqueFacts = [
    {
      icon: <Leaf className="w-5 h-5" />,
      title: useAutoTranslate("Warna Hijau Misterius"),
      description: useAutoTranslate(
        "Nama penyu hijau bukan diambil dari warna cangkang, tapi dari lemak hijau di bawah tempurungnya."
      )
    },
    {
      icon: <Navigation className="w-5 h-5" />,
      title: useAutoTranslate("Navigator Alami"),
      description: useAutoTranslate(
        "Penyu hijau kembali bertelur di pantai tempat mereka lahir dengan bantuan medan magnet bumi."
      )
    },
    {
      icon: <Clock className="w-5 h-5" />,
      title: useAutoTranslate("Master Menahan Nafas"),
      description: useAutoTranslate(
        "Mampu menahan napas hingga berjam-jam dan tidur di laut selama 4–7 jam."
      )
    },
    {
      icon: <Fish className="w-5 h-5" />,
      title: useAutoTranslate("Vegetarian Laut"),
      description: useAutoTranslate(
        "Satu-satunya penyu herbivora, memakan lamun dan alga laut saat dewasa."
      )
    },
    {
      icon: <Thermometer className="w-5 h-5" />,
      title: useAutoTranslate("Temperatur Menentukan"),
      description: useAutoTranslate(
        "Jenis kelamin bayi penyu ditentukan oleh suhu sarang tempat bertelur."
      )
    }
  ];

  const habitats = [
    {
      icon: <TreePine className="w-5 h-5" />,
      region: useAutoTranslate("Perairan Barat"),
      locations: useAutoTranslate("Aceh, Sumatera Barat, Kepulauan Riau, Bangka Belitung")
    },
    {
      icon: <Mountain className="w-5 h-5" />,
      region: useAutoTranslate("Perairan Tengah"),
      locations: useAutoTranslate("Kepulauan Seribu, Jawa, Kalimantan, Karimun Jawa")
    },
    {
      icon: <Compass className="w-5 h-5" />,
      region: useAutoTranslate("Perairan Timur"),
      locations: useAutoTranslate("Sulawesi, Bali, NTB, NTT, Maluku, Papua")
    }
  ];

  const classification = [
    { label: useAutoTranslate("Kingdom"), value: "Animalia" },
    { label: useAutoTranslate("Filum"), value: "Chordata" },
    { label: useAutoTranslate("Kelas"), value: "Reptilia" },
    { label: useAutoTranslate("Ordo"), value: "Testudines" },
    { label: useAutoTranslate("Famili"), value: "Cheloniidae" },
    { label: useAutoTranslate("Genus"), value: "Chelonia" },
    { label: useAutoTranslate("Spesies"), value: "Chelonia mydas" }
  ];

  const localNames = [
    useAutoTranslate("Penyu Daging (Bali)"),
    useAutoTranslate("Penyu Sala (Sumbawa)"),
    useAutoTranslate("Penyu Pendok (Karimun Jawa)"),
    useAutoTranslate("Katuwang (Sumatera Barat)"),
    useAutoTranslate("Panyo' Kambau (Paloh)")
  ];

  return (
    <div className="px-6 max-w-4xl mx-auto space-y-16 font-AktivGrotesk-Regular">
      
      {/* Hero Image Section */}
      <section className="relative w-full h-96 rounded-2xl overflow-hidden shadow-xl">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
            <Waves className="w-8 h-8 text-[#1B602F] animate-pulse" />
          </div>
        )}
        
        <Image
          src={penyuHijauImage}
          alt="Penyu Hijau (Chelonia mydas) berenang di perairan Indonesia"
          fill
          className={`object-cover transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(true)}
          priority
        />
        
        {imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
            <div className="absolute bottom-8 left-8">
              <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-sm mb-3">
                <span className="text-[#1B602F] font-semibold text-sm italic">Chelonia mydas</span>
              </div>
              <h1 className="text-4xl font-bold text-white drop-shadow-lg">
                Penyu Hijau
              </h1>
            </div>
          </div>
        )}
      </section>

      {/* Introduction */}
      <section className="bg-gray-50 rounded-2xl p-8">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-[#1B602F] rounded-lg">
            <Globe className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">{introTitle}</h2>
            <p className="text-gray-700 leading-relaxed">{introText}</p>
          </div>
        </div>
      </section>

      {/* Facts */}
      <section>
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-[#1B602F]">
            {faktaTitle}
          </h2>
          <p className="text-gray-600 text-lg">{faktaDesc}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {uniqueFacts.map((fact, index) => (
            <div key={index} className="group p-8 bg-white border border-gray-200 rounded-2xl hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-6">
                <div className="p-3 bg-[#1B602F]/10 rounded-xl text-[#1B602F]">
                  {fact.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-xl mb-3 text-[#1B602F]">
                    {fact.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {fact.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Habitat */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-12">
          {habitatTitle}
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {habitats.map((habitat, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-[#1B602F]/10 rounded-lg text-[#1B602F]">
                  {habitat.icon}
                </div>
                <h3 className="font-bold text-lg text-[#1B602F]">
                  {habitat.region}
                </h3>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                {habitat.locations}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Classification */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-12">
          {klasifikasiTitle}
        </h2>
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
          {classification.map((item, index) => (
            <div 
              key={index} 
              className={`flex justify-between items-center px-6 py-4 ${
                index !== classification.length - 1 ? 'border-b border-gray-200' : ''
              } ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
            >
              <span className="font-semibold text-[#1B602F]">
                {item.label}
              </span>
              <span className="text-gray-700 italic">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Local Names */}
      <section className="bg-gray-50 rounded-2xl p-8">
        <div className="flex items-start gap-4 mb-8">
          <div className="p-2 bg-[#1B602F] rounded-lg">
            <MapPin className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">{localNameTitle}</h2>
            <p className="text-gray-700 leading-relaxed">{localNameDesc}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {localNames.map((name, index) => (
            <div key={index} className="px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm">
              {name}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}