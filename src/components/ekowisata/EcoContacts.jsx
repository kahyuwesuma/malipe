"use client"

import { Phone, Users, Shield } from "lucide-react"

export default function EcoContacts() {
  return (
    <div className="bg-[#1B602F] rounded-lg p-6 sm:p-8 text-center text-white">
      <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-4 sm:mb-6">
        <Phone className="w-7 h-7 sm:w-8 sm:h-8" />
      </div>
      <h3 className="text-xl sm:text-2xl md:text-3xl mb-3 sm:mb-4 font-AktivGrotesk-Regular px-2">
        Siap untuk Petualangan?
      </h3>
      <p className="text-sm sm:text-base md:text-lg font-AktivGrotesk-Regular text-green-100 mb-6 sm:mb-8 max-w-2xl mx-auto px-4 leading-relaxed">
        Bergabunglah dengan pengalaman ekowisata yang tak terlupakan dan berkontribusi 
        langsung pada konservasi penyu hijau di habitat aslinya
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
        <div className="bg-white/10 rounded-lg p-3 sm:p-4">
          <Phone className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-2" />
          <p className="font-AktivGrotesk-Regular text-sm sm:text-base">Reservasi</p>
          <p className="text-green-100 font-AktivGrotesk-Regular text-xs sm:text-sm">24/7 Customer Service</p>
        </div>
        <div className="bg-white/10 rounded-lg p-3 sm:p-4">
          <Users className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-2" />
          <p className="font-AktivGrotesk-Regular text-sm sm:text-base">Grup Kecil</p>
          <p className="text-green-100 font-AktivGrotesk-Regular text-xs sm:text-sm">Max 15 orang/trip</p>
        </div>
        <div className="bg-white/10 rounded-lg p-3 sm:p-4">
          <Shield className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-2" />
          <p className="font-AktivGrotesk-Regular text-sm sm:text-base">Asuransi</p>
          <p className="text-green-100 font-AktivGrotesk-Regular text-xs sm:text-sm">Keamanan terjamin</p>
        </div>
      </div>

      <div className="bg-white/10 rounded-lg p-4 sm:p-6 inline-block font-AktivGrotesk-Regular max-w-full">
        <p className="text-lg sm:text-xl md:text-2xl mb-2">🐢 MALIPE Call Center</p>
        <p className="text-green-100 mb-3 sm:mb-4 text-sm sm:text-base">Pusat Informasi & Reservasi</p>
        <div className="flex flex-wrap justify-center gap-2">
          <span className="px-2 sm:px-3 py-1 bg-white/20 rounded-full text-xs sm:text-sm">📞 WhatsApp Ready</span>
          <span className="px-2 sm:px-3 py-1 bg-white/20 rounded-full text-xs sm:text-sm">⚡ Respon Cepat</span>
          <span className="px-2 sm:px-3 py-1 bg-white/20 rounded-full text-xs sm:text-sm">🎯 Konsultasi Gratis</span>
        </div>
      </div>
    </div>
  )
}
