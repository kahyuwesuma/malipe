"use client"

import { MapPin, Calendar, Waves, Shield, TreePine, Users } from "lucide-react"

const InfoCard = ({ icon, title, description, stats }) => (
  <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 text-center hover:shadow-lg transition-shadow duration-200">
    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#1B602F] rounded-lg flex items-center justify-center text-white mx-auto mb-3 sm:mb-4">
      {icon}
    </div>
    <h3 className="font-AktivGrotesk-Regular text-gray-800 text-base sm:text-lg mb-2">{title}</h3>
    <p className="text-gray-600 text-xs sm:text-sm font-AktivGrotesk-Regular mb-3 leading-relaxed">{description}</p>
    {stats && (
      <div className="inline-block px-2 sm:px-3 py-1 bg-green-50 text-[#1B602F] rounded-full font-AktivGrotesk-Regular text-xs sm:text-sm">
        {stats}
      </div>
    )}
  </div>
)

const StatsCard = ({ label, value, icon, description }) => (
  <div className="bg-white rounded-lg p-4 sm:p-6 shadow-lg border border-gray-200 text-center hover:shadow-xl transition-shadow duration-200">
    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#1B602F] rounded-lg flex items-center justify-center text-white mx-auto mb-2 sm:mb-3">
      {icon}
    </div>
    <div className="text-lg sm:text-2xl font-AktivGrotesk-Regular text-[#1B602F] mb-1">{value}</div>
    <div className="text-xs sm:text-sm text-gray-600 font-AktivGrotesk-Regular mb-1">{label}</div>
    {description && (
      <div className="text-xs text-gray-500 font-AktivGrotesk-Regular">{description}</div>
    )}
  </div>
)

export default function Hero() {
  return (
    <div className="text-center mb-8 sm:mb-12">
      <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#1B602F] rounded-lg flex items-center justify-center mx-auto mb-4 sm:mb-6">
        <TreePine className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
      </div>
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-AktivGrotesk-Regular text-[#1B602F] mb-3 sm:mb-4 px-2">
        Pulau Balembangan
      </h1>
      <p className="text-sm sm:text-base md:text-lg font-AktivGrotesk-Regular text-gray-600 max-w-3xl mx-auto mb-6 sm:mb-8 px-4 leading-relaxed">
        Jelajahi pulau tak berpenghuni seluas 9,3 hektar dan saksikan habitat alami penyu hijau di Kalimantan Timur
      </p>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
        <StatsCard label="Luas Pulau" value="9.3 Ha" icon={<MapPin size={20} className="sm:w-6 sm:h-6" />} description="Tak berpenghuni" />
        <StatsCard label="Durasi Trip" value="3D2N" icon={<Calendar size={20} className="sm:w-6 sm:h-6" />} description="Pengalaman lengkap" />
        <StatsCard label="Total Aktivitas" value="16+" icon={<Waves size={20} className="sm:w-6 sm:h-6" />} description="Kegiatan seru" />
        <StatsCard label="Fokus Konservasi" value="100%" icon={<Shield size={20} className="sm:w-6 sm:h-6" />} description="Ramah lingkungan" />
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        <InfoCard icon={<MapPin size={20} className="sm:w-6 sm:h-6" />} title="Lokasi Eksotis" description="Pulau tak berpenghuni dengan panorama alami yang menakjubkan dan pantai berpasir putih" stats="9.3 Hektar" />
        <InfoCard icon={<Waves size={20} className="sm:w-6 sm:h-6" />} title="Konservasi Penyu" description="Habitat alami penyu hijau yang terlindungi dengan program pelestarian berkelanjutan" stats="Penyu Hijau" />
        <InfoCard icon={<Users size={20} className="sm:w-6 sm:h-6" />} title="Pengalaman Edukatif" description="Belajar langsung tentang konservasi laut dan berpartisipasi dalam program pelestarian" stats="Hands-On" />
      </div>
    </div>
  )
}