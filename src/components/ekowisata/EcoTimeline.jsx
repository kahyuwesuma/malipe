// src/components/ekowisata/EcoTimeline.jsx
"use client"

import { useState } from "react"
import { 
  Clock, MapPin, Waves, Sun, ChevronUp, ChevronDown, 
  AlertCircle, Camera, Users, TreePine 
} from "lucide-react"

// 🔹 Helper untuk kategori aktivitas
const getActivityCategory = (desc) => {
  if (/foto|kamera/i.test(desc)) return "Fotografi"
  if (/konservasi|penyu/i.test(desc)) return "Konservasi"
  if (/edukasi|belajar/i.test(desc)) return "Edukasi"
  if (/hiking|jelajah/i.test(desc)) return "Jelajah"
  return null
}

const getCategoryIcon = (category) => {
  switch (category) {
    case "Fotografi": return <Camera className="w-3 h-3 text-[#1B602F]" />
    case "Konservasi": return <TreePine className="w-3 h-3 text-[#1B602F]" />
    case "Edukasi": return <Users className="w-3 h-3 text-[#1B602F]" />
    case "Jelajah": return <MapPin className="w-3 h-3 text-[#1B602F]" />
    default: return null
  }
}

// 🔹 Jadwal
const jadwal = [
  { time: "08.00 – 14.00", desc: "Perjalanan dari Tanjung Redeb ke Pulau Balembangan" },
  { time: "14.00 – 16.00", desc: "Berenang, mancing, bebas, ISHOMA" },
  { time: "16.00 – 18.00", desc: "Pengenalan Pulau Balembangan" },
  { time: "18.00 – 21.00", desc: "Release tukik, berenang, mancing, bebas" },
  { time: "21.00 – 22.00", desc: "Patroli penyu (menyesuaikan pasang surut air)" },
  { time: "22.00", desc: "Istirahat bebas" },
  { time: "05.30 – 06.30", desc: "Sensus pagi penyu" },
  { time: "06.30 – 08.00", desc: "Berenang, mancing, bebas, ISHOMA" },
  { time: "08.00 – 10.00", desc: "Patroli sampah (pungut sampah sekitar pulau)" },
  { time: "10.00 – 12.00", desc: "Presentasi Maratua Peduli Penyu" },
  { time: "12.00 – 16.00", desc: "Berenang, mancing, bebas" },
  { time: "16.00 – 18.00", desc: "Patroli dan release tukik" },
  { time: "18.00 – 21.00", desc: "Berenang, mancing, bebas, ISHOMA" },
  { time: "21.00 – 22.00", desc: "Patroli penyu (menyesuaikan pasang surut air laut)" },
  { time: "22.00", desc: "Kegiatan bebas" },
  { time: "06.00 – selesai", desc: "Perjalanan kembali ke Tanjung Redeb" },
]

// 🔹 Kartu aktivitas di timeline
const TimelineCard = ({ item, index }) => {
    return (
      <div className="flex-shrink-0 w-[85vw] max-w-xs sm:w-80 mx-auto sm:mx-4 snap-center">
        <div className="bg-white rounded-lg p-4 sm:p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-200 h-44 sm:h-48 flex flex-col justify-between">
          
          {/* Time and Number */}
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="bg-[#1B602F] text-white px-2 sm:px-3 py-1 sm:py-2 rounded-lg font-AktivGrotesk-Regular text-xs sm:text-sm">
              {item.time}
            </div>
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-[#1B602F] rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-AktivGrotesk-Regular">
              {index + 1}
            </div>
          </div>
          
          {/* Activity Category */}
          {getActivityCategory(item.desc) && (
            <div className="bg-green-100 text-[#1B602F] px-2 sm:px-3 py-1 rounded-full text-xs font-AktivGrotesk-Regular inline-block mb-3 sm:mb-4 w-fit">
              <div className="flex items-center gap-1">
                {getCategoryIcon(getActivityCategory(item.desc))}
                <span className="hidden sm:inline">{getActivityCategory(item.desc)}</span>
              </div>
            </div>
          )}
          
          {/* Description */}
          <div className="flex-1 flex items-center">
            <p className="text-gray-700 text-xs sm:text-sm font-AktivGrotesk-Regular leading-relaxed line-clamp-3">{item.desc}</p>
          </div>
        </div>
      </div>
    )
  }
  
// 🔹 Timeline horizontal (scroll-snap untuk mobile)
const HorizontalTimeline = ({ items }) => {
    return (
      <div className="overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar px-6 sm:px-16">
        <div className="flex gap-4">
          {items.map((item, idx) => (
            <TimelineCard key={idx} item={item} index={idx} />
          ))}
        </div>
      </div>
    )
  }  

// 🔹 Header tiap hari
const DayHeader = ({ day, title, subtitle, icon, stats }) => (
  <div className="bg-[#1B602F] rounded-lg p-4 sm:p-6 mb-4 sm:mb-6 shadow-lg text-white">
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="flex items-center gap-3 sm:gap-4">
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-lg flex items-center justify-center">
          {icon}
        </div>
        <div>
          <div className="text-green-200 text-xs font-AktivGrotesk-Regular mb-1">{day}</div>
          <h3 className="text-lg sm:text-xl font-AktivGrotesk-Regular mb-1">{title}</h3>
          <p className="text-green-100 text-xs sm:text-sm font-AktivGrotesk-Regular">{subtitle}</p>
        </div>
      </div>
      
      {/* Stats */}
      <div className="flex gap-2 sm:gap-4 w-full sm:w-auto">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white/20 rounded-lg px-2 sm:px-3 py-1 sm:py-2 text-center flex-1 sm:flex-initial">
            <div className="text-sm sm:text-lg font-AktivGrotesk-Regular">{stat.value}</div>
            <div className="text-xs font-AktivGrotesk-Regular text-green-200">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
)

// 🔹 Section wrapper
const Section = ({ title, children, icon, collapsible = false, defaultExpanded = true }) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)
  
  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden mb-6 sm:mb-8">
      <div 
        className={`p-4 sm:p-6 ${collapsible ? 'cursor-pointer hover:bg-gray-50' : ''} border-b border-gray-100`}
        onClick={() => collapsible && setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#1B602F] rounded-lg flex items-center justify-center text-white">
              {icon}
            </div>
            <h2 className="text-lg sm:text-xl font-AktivGrotesk-Regular text-gray-800">{title}</h2>
          </div>
          {collapsible && (
            <div className="text-gray-400">
              {isExpanded ? <ChevronUp size={20} className="sm:w-6 sm:h-6" /> : <ChevronDown size={20} className="sm:w-6 sm:h-6" />}
            </div>
          )}
        </div>
      </div>
      {(!collapsible || isExpanded) && (
        <div className="p-4 sm:p-6">
          {children}
        </div>
      )}
    </div>
  )
}

// 🔹 Komponen Utama
export default function EcoTimeline() {
  const day1 = jadwal.slice(0, 6)
  const day2 = jadwal.slice(6, 15)
  const day3 = jadwal.slice(15)

  const dayStats = {
    day1: [
      { label: "Aktivitas", value: "6" },
      { label: "Durasi", value: "14h" }
    ],
    day2: [
      { label: "Aktivitas", value: "9" },
      { label: "Durasi", value: "18h" }
    ],
    day3: [
      { label: "Aktivitas", value: "1" },
      { label: "Durasi", value: "8h" }
    ]
  }

  return (
    <Section 
      title={<span className="font-AktivGrotesk-Regular">Jadwal Kegiatan</span>}
      icon={<Clock size={20} className="sm:w-6 sm:h-6" />}
      collapsible={true}
      defaultExpanded={true}
    >
      <div className="space-y-8 sm:space-y-12">
        {/* Hari Pertama */}
        <div>
          <DayHeader 
            day="HARI PERTAMA"
            title="Perjalanan & Pengenalan"
            subtitle="Memulai petualangan menuju pulau tak berpenghuni"
            icon={<MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-white" />}
            stats={dayStats.day1}
          />
          <HorizontalTimeline items={day1} />
        </div>

        {/* Hari Kedua */}
        <div>
          <DayHeader 
            day="HARI KEDUA"
            title="Aktivitas Konservasi"
            subtitle="Hari penuh aktivitas konservasi penyu dan edukasi"
            icon={<Waves className="w-5 h-5 sm:w-6 sm:h-6 text-white" />}
            stats={dayStats.day2}
          />
          <HorizontalTimeline items={day2} />
        </div>

        {/* Hari Ketiga */}
        <div>
          <DayHeader 
            day="HARI KETIGA"
            title="Perjalanan Pulang"
            subtitle="Mengakhiri petualangan dengan kenangan indah"
            icon={<Sun className="w-5 h-5 sm:w-6 sm:h-6 text-white" />}
            stats={dayStats.day3}
          />
          <HorizontalTimeline items={day3} />
        </div>
      </div>

      {/* Catatan Penting */}
      <div className="mt-6 sm:mt-8 p-3 sm:p-4 bg-amber-50 border border-amber-200 rounded-lg">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 font-AktivGrotesk-Regular">
          <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 flex-shrink-0" />
          <div>
            <p className="text-amber-800 mb-2 text-sm sm:text-base">Catatan Penting Timeline:</p>
            <p className="text-amber-700 text-xs sm:text-sm leading-relaxed">
              Timeline dapat berubah sesuai kondisi cuaca dan pasang surut air laut. 
              Tim akan memberikan informasi terkini sebelum keberangkatan.
            </p>
          </div>
        </div>
      </div>
    </Section>
  )
}