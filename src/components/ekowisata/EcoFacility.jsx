"use client"

import { Camera, Info, CheckCircle2 } from "lucide-react"

export default function EcoFacility() {
  const fasilitas = [
    { text: "Speedboat PP + lifejacket keselamatan standar internasional", icon: "🚤" },
    { text: "Makanan sederhana (nasi + lauk, cukup mengenyangkan) 3x sehari", icon: "🍽️" },
    { text: "Tempat berteduh minimalis (pos monitoring) untuk istirahat", icon: "🏠" },
    { text: "Air bersih terbatas (minum bebas, mandi 1×/hari)", icon: "💧" },
    { text: "Spot foto alami Pulau Balembangan yang Instagram-worthy", icon: "📸" },
    { text: "Bawa perlengkapan tenda, snorkeling, pancing, kamera diperbolehkan", icon: "🎒" },
  ]

  return (
    <section id="facility" className="py-8">
      {/* Judul Section */}
      <div className="flex items-center gap-2 mb-6 sm:mb-8">
        <Camera size={20} className="sm:w-6 sm:h-6 text-emerald-600" />
        <h2 className="text-xl sm:text-2xl font-AktivGrotesk-Regular text-gray-900">
          Fasilitas yang Disediakan
        </h2>
      </div>

      {/* Deskripsi Singkat */}
      <p className="text-gray-600 font-AktivGrotesk-Regular mb-4 sm:mb-6 text-sm sm:text-base leading-relaxed">
        Fasilitas dasar yang diperlukan untuk pengalaman ekowisata yang nyaman dan aman:
      </p>

      {/* Grid Fasilitas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 font-AktivGrotesk-Regular">
        {fasilitas.map((f, idx) => (
          <div
            key={idx}
            className="bg-white rounded-lg p-3 sm:p-4 shadow border border-gray-200 hover:shadow-lg transition-shadow duration-200"
          >
            <div className="flex items-start gap-2 sm:gap-3">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#1B602F] rounded-lg flex items-center justify-center text-lg sm:text-2xl mb-2">
                  {f.icon}
                </div>
                <div className="text-center">
                  <span className="text-xs font-AktivGrotesk-Regular text-[#1B602F] bg-green-100 px-2 py-1 rounded">
                    #{idx + 1}
                  </span>
                </div>
              </div>
              <div className="flex-1">
                <p className="text-gray-700 text-xs sm:text-sm font-AktivGrotesk-Regular mb-2 leading-relaxed">
                  {f.text}
                </p>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
                  <span className="text-xs font-AktivGrotesk-Regular text-green-700 bg-green-100 px-2 py-1 rounded">
                    Tersedia
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tips Persiapan */}
      <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-blue-50 border border-blue-200 rounded-lg font-AktivGrotesk-Regular">
        <div className="flex flex-col sm:flex-row items-start gap-2 sm:gap-3">
          <Info className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0" />
          <div>
            <h4 className="font-AktivGrotesk-Regular text-blue-800 mb-2 text-sm sm:text-base">
              Tips Persiapan:
            </h4>
            <ul className="text-blue-700 text-xs sm:text-sm space-y-1 leading-relaxed">
              <li>• Bawa pakaian ganti dan perlengkapan mandi</li>
              <li>• Sunscreen dan topi untuk perlindungan matahari</li>
              <li>• Kamera tahan air untuk dokumentasi</li>
              <li>• Obat-obatan pribadi dan P3K sederhana</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
