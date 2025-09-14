"use client"

import { AlertCircle, Info, Shield } from "lucide-react"

export default function EcoRules() {
  const tataTertib = [
    { text: "Kirim foto KTP untuk registrasi sebelum keberangkatan", type: "info" },
    { text: "Ijin ketika ingin berjalan-jalan keliling pulau untuk keamanan bersama", type: "info" },
    { text: "Mengikuti semua kegiatan yang telah disusun demi pengalaman optimal", type: "info" },
    { text: "DILARANG mengambil, memakan, atau menyimpan apapun terkait penyu (blacklist pengunjung)", type: "warning" },
    { text: "DILARANG merusak habitat satwa liar dan lingkungan sekitar", type: "warning" },
  ]

  return (
    <section id="rules">
      {/* Judul Section */}
      <div className="flex items-center gap-2 mb-6 sm:mb-8">
        <Shield size={20} className="sm:w-6 sm:h-6 text-emerald-600" />
        <h2 className="text-xl sm:text-2xl font-AktivGrotesk-Regular text-gray-900">
          Tata Tertib & Ketentuan
        </h2>
      </div>

      {/* Deskripsi Singkat */}
      <p className="text-gray-600 font-AktivGrotesk-Regular mb-4 sm:mb-6 text-sm sm:text-base leading-relaxed">
        Untuk menjaga kelestarian alam dan keamanan bersama, mohon patuhi ketentuan berikut:
      </p>

      {/* Grid Tata Tertib */}
      <div className="grid grid-cols-1 gap-3 sm:gap-4">
        {tataTertib.map((rule, idx) => (
          <div
            key={idx}
            className={`p-3 sm:p-4 rounded-lg border transition-shadow duration-200 hover:shadow-md ${
              rule.type === "warning"
                ? "bg-red-50 border-red-200"
                : "bg-blue-50 border-blue-200"
            }`}
          >
            <div className="flex items-start gap-2 sm:gap-3">
              <div
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  rule.type === "warning" ? "bg-red-500" : "bg-blue-500"
                }`}
              >
                {rule.type === "warning" ? (
                  <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                ) : (
                  <Info className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                )}
              </div>
              <div className="flex-1">
                <div
                  className={`px-2 py-1 rounded text-xs font-AktivGrotesk-Regular mb-2 inline-block ${
                    rule.type === "warning"
                      ? "bg-red-200 text-red-800"
                      : "bg-blue-200 text-blue-800"
                  }`}
                >
                  {rule.type === "warning" ? "LARANGAN" : "WAJIB"} #{idx + 1}
                </div>
                <p
                  className={`text-xs sm:text-sm font-AktivGrotesk-Regular leading-relaxed ${
                    rule.type === "warning" ? "text-red-800" : "text-blue-800"
                  }`}
                >
                  {rule.text}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
