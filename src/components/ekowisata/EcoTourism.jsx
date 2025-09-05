'use client';
import { useState } from "react"
import { Clock, MapPin, Users, Camera, Waves, TreePine, Phone, ChevronDown, ChevronUp, AlertCircle, CheckCircle2, Calendar, Info, Shield, Sun, Moon, Sunrise, Sunset, ChevronLeft, ChevronRight } from "lucide-react"

const TimelineCard = ({ item, dayColor, isActive }) => (
  <div className={`flex-shrink-0 w-80 mx-4 transition-all duration-300 ${isActive ? 'scale-105' : 'scale-95 opacity-70'}`}>
    <div className={`${dayColor.cardBg} rounded-xl p-6 shadow-lg border-2 ${dayColor.border} hover:shadow-xl transition-all h-48 flex flex-col justify-between`}>
      {/* Time and Category */}
      <div className="flex items-center justify-between mb-3">
        <div className={`${dayColor.timeBg} ${dayColor.timeText} px-4 py-2 rounded-lg font-bold text-lg`}>
          {item.time}
        </div>
        <div className={`w-10 h-10 ${dayColor.bg} rounded-full flex items-center justify-center shadow-md`}>
          {getTimeIcon(item.time)}
        </div>
      </div>
      
      {/* Activity Category */}
      {getActivityCategory(item.desc) && (
        <div className={`px-3 py-1 ${dayColor.categoryBg} ${dayColor.categoryText} rounded-full text-sm font-medium inline-block mb-3 w-fit`}>
          {getActivityCategory(item.desc)}
        </div>
      )}
      
      {/* Description */}
      <div className="flex-1 flex items-center">
        <p className="text-gray-700 leading-relaxed text-base">{item.desc}</p>
      </div>
    </div>
  </div>
)

const HorizontalTimeline = ({ items, dayColor, currentIndex, onIndexChange }) => {
  const canGoLeft = currentIndex > 0
  const canGoRight = currentIndex < items.length - 1
  
  return (
    <div className="relative">
      {/* Navigation Arrows */}
      <button
        onClick={() => canGoLeft && onIndexChange(currentIndex - 1)}
        className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all ${
          canGoLeft 
            ? `${dayColor.bg} text-white hover:shadow-xl hover:scale-110` 
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
        }`}
        disabled={!canGoLeft}
      >
        <ChevronLeft size={24} />
      </button>
      
      <button
        onClick={() => canGoRight && onIndexChange(currentIndex + 1)}
        className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all ${
          canGoRight 
            ? `${dayColor.bg} text-white hover:shadow-xl hover:scale-110` 
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
        }`}
        disabled={!canGoRight}
      >
        <ChevronRight size={24} />
      </button>

      {/* Timeline Container */}
      <div className="overflow-hidden mx-16">
        <div 
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 320}px)` }}
        >
          {items.map((item, idx) => (
            <TimelineCard
              key={idx}
              item={item}
              dayColor={dayColor}
              isActive={idx === currentIndex}
            />
          ))}
        </div>
      </div>

      {/* Progress Indicators */}
      <div className="flex justify-center mt-6 gap-2">
        {items.map((_, idx) => (
          <button
            key={idx}
            onClick={() => onIndexChange(idx)}
            className={`w-3 h-3 rounded-full transition-all ${
              idx === currentIndex 
                ? `${dayColor.bg} scale-125` 
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>

      {/* Current Position Counter */}
      <div className="text-center mt-4">
        <span className={`text-sm font-medium ${dayColor.timeText} ${dayColor.timeBg} px-3 py-1 rounded-full`}>
          {currentIndex + 1} dari {items.length}
        </span>
      </div>
    </div>
  )
}

const DayHeader = ({ day, title, subtitle, color, icon }) => (
  <div className={`${color.headerBg} rounded-xl p-6 mb-6 shadow-lg border-2 ${color.headerBorder}`}>
    <div className="flex items-center gap-4">
      <div className={`w-16 h-16 ${color.iconBg} rounded-full flex items-center justify-center shadow-md`}>
        {icon}
      </div>
      <div>
        <h3 className={`text-2xl font-bold ${color.headerText} mb-1`}>{day}</h3>
        <p className={`text-lg ${color.headerSubtext} font-semibold`}>{title}</p>
        <p className={`text-sm ${color.headerDesc}`}>{subtitle}</p>
      </div>
    </div>
  </div>
)

const getTimeIcon = (time) => {
  const hour = parseInt(time.split('.')[0])
  if (hour >= 5 && hour < 10) return <Sunrise className="w-5 h-5 text-white" />
  if (hour >= 10 && hour < 17) return <Sun className="w-5 h-5 text-white" />
  if (hour >= 17 && hour < 20) return <Sunset className="w-5 h-5 text-white" />
  return <Moon className="w-5 h-5 text-white" />
}

const getActivityCategory = (desc) => {
  if (desc.includes('Perjalanan')) return 'Transport'
  if (desc.includes('patroli') || desc.includes('sensus')) return 'Konservasi'
  if (desc.includes('release') || desc.includes('tukik')) return 'Penyu'
  if (desc.includes('berenang') || desc.includes('mancing')) return 'Rekreasi'
  if (desc.includes('presentasi')) return 'Edukasi'
  if (desc.includes('istirahat') || desc.includes('bebas')) return 'Istirahat'
  return 'Aktivitas'
}

const Section = ({ title, children, icon, collapsible = false, defaultExpanded = true }) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)
  
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      <div 
        className={`p-6 ${collapsible ? 'cursor-pointer hover:bg-gray-50 transition-colors' : ''} border-b border-gray-100`}
        onClick={() => collapsible && setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600">
              {icon}
            </div>
            <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
          </div>
          {collapsible && (
            <div className="text-gray-400 hover:text-gray-600 transition-colors">
              {isExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
            </div>
          )}
        </div>
      </div>
      {(!collapsible || isExpanded) && (
        <div className="p-6 pt-0">
          {children}
        </div>
      )}
    </div>
  )
}

const InfoCard = ({ icon, title, description, color = "emerald" }) => (
  <div className={`bg-${color}-50 border-2 border-${color}-200 rounded-xl p-6 text-center hover:shadow-md transition-shadow`}>
    <div className={`w-12 h-12 bg-${color}-100 rounded-xl flex items-center justify-center text-${color}-600 mx-auto mb-4`}>
      {icon}
    </div>
    <h3 className={`font-bold text-${color}-900 text-lg mb-2`}>{title}</h3>
    <p className={`text-${color}-700 text-sm leading-relaxed`}>{description}</p>
  </div>
)

const StatsCard = ({ label, value, icon, color }) => (
  <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200 text-center hover:shadow-lg transition-shadow">
    <div className={`w-12 h-12 bg-${color}-100 rounded-xl flex items-center justify-center text-${color}-600 mx-auto mb-3`}>
      {icon}
    </div>
    <div className={`text-2xl font-bold text-${color}-700 mb-1`}>{value}</div>
    <div className="text-sm text-gray-600">{label}</div>
  </div>
)

const RulesCard = ({ rule, index }) => (
  <div className={`p-4 rounded-xl border-2 ${
    rule.type === 'warning' 
      ? 'bg-red-50 border-red-200 hover:bg-red-100' 
      : 'bg-blue-50 border-blue-200 hover:bg-blue-100'
  } transition-colors hover:shadow-md`}>
    <div className="flex items-start gap-3">
      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
        rule.type === 'warning' ? 'bg-red-100' : 'bg-blue-100'
      }`}>
        {rule.type === 'warning' ? 
          <AlertCircle className="w-4 h-4 text-red-600" /> : 
          <Info className="w-4 h-4 text-blue-600" />
        }
      </div>
      <div>
        <div className={`px-2 py-1 rounded-full text-xs font-bold mb-2 inline-block ${
          rule.type === 'warning' 
            ? 'bg-red-200 text-red-800' 
            : 'bg-blue-200 text-blue-800'
        }`}>
          {rule.type === 'warning' ? 'LARANGAN' : 'WAJIB'} #{index + 1}
        </div>
        <p className={`text-sm leading-relaxed ${
          rule.type === 'warning' ? 'text-red-800' : 'text-blue-800'
        }`}>
          {rule.text}
        </p>
      </div>
    </div>
  </div>
)

const FacilityCard = ({ facility, index }) => (
  <div className="bg-white rounded-xl p-4 shadow-md border border-gray-200 hover:shadow-lg transition-all hover:-translate-y-1">
    <div className="flex items-start gap-4">
      <div className="flex-shrink-0">
        <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center text-2xl mb-2">
          {facility.icon}
        </div>
        <div className="text-center">
          <span className="text-xs font-bold text-teal-600 bg-teal-100 px-2 py-1 rounded-full">
            #{index + 1}
          </span>
        </div>
      </div>
      <div className="flex-1">
        <p className="text-gray-700 text-sm leading-relaxed mb-2">{facility.text}</p>
        <div className="flex items-center gap-1">
          <CheckCircle2 className="w-3 h-3 text-green-600" />
          <span className="text-xs font-medium text-green-700">Tersedia</span>
        </div>
      </div>
    </div>
  </div>
)

export default function EkowisataBalembangan() {
  const [day1Index, setDay1Index] = useState(0)
  const [day2Index, setDay2Index] = useState(0) 
  const [day3Index, setDay3Index] = useState(0)
  
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

  const tataTertib = [
    { text: "Kirim foto KTP untuk registrasi", type: "info" },
    { text: "Ijin ketika ingin berjalan-jalan keliling pulau", type: "info" },
    { text: "Mengikuti semua kegiatan yang telah disusun", type: "info" },
    { text: "DILARANG mengambil, memakan, atau menyimpan apapun terkait penyu (blacklist pengunjung)", type: "warning" },
    { text: "DILARANG merusak habitat satwa liar", type: "warning" },
  ]

  const fasilitas = [
    { text: "Speedboat PP + lifejacket", icon: "🚤" },
    { text: "Makanan sederhana (nasi + lauk, cukup mengenyangkan)", icon: "🍽️" },
    { text: "Tempat berteduh minimalis (pos monitoring)", icon: "🏠" },
    { text: "Air bersih terbatas (minum bebas, mandi 1×/hari)", icon: "💧" },
    { text: "Spot foto alami Pulau Balembangan", icon: "📸" },
    { text: "Bawa perlengkapan tenda, snorkeling, pancing, kamera diperbolehkan", icon: "🎒" },
  ]

  // Define color schemes for each day
  const dayColors = {
    day1: {
      bg: 'bg-blue-500',
      gradient: 'from-blue-400 to-blue-600',
      cardBg: 'bg-blue-50',
      border: 'border-blue-200',
      timeBg: 'bg-blue-100',
      timeText: 'text-blue-800',
      categoryBg: 'bg-blue-200',
      categoryText: 'text-blue-800',
      headerBg: 'bg-gradient-to-r from-blue-500 to-blue-600',
      headerBorder: 'border-blue-300',
      headerText: 'text-white',
      headerSubtext: 'text-blue-100',
      headerDesc: 'text-blue-200',
      iconBg: 'bg-white/20'
    },
    day2: {
      bg: 'bg-purple-500',
      gradient: 'from-purple-400 to-purple-600',
      cardBg: 'bg-purple-50',
      border: 'border-purple-200',
      timeBg: 'bg-purple-100',
      timeText: 'text-purple-800',
      categoryBg: 'bg-purple-200',
      categoryText: 'text-purple-800',
      headerBg: 'bg-gradient-to-r from-purple-500 to-purple-600',
      headerBorder: 'border-purple-300',
      headerText: 'text-white',
      headerSubtext: 'text-purple-100',
      headerDesc: 'text-purple-200',
      iconBg: 'bg-white/20'
    },
    day3: {
      bg: 'bg-orange-500',
      gradient: 'from-orange-400 to-orange-600',
      cardBg: 'bg-orange-50',
      border: 'border-orange-200',
      timeBg: 'bg-orange-100',
      timeText: 'text-orange-800',
      categoryBg: 'bg-orange-200',
      categoryText: 'text-orange-800',
      headerBg: 'bg-gradient-to-r from-orange-500 to-orange-600',
      headerBorder: 'border-orange-300',
      headerText: 'text-white',
      headerSubtext: 'text-orange-100',
      headerDesc: 'text-orange-200',
      iconBg: 'bg-white/20'
    }
  }

  const renderTimeline = () => {
    const day1 = jadwal.slice(0, 6)
    const day2 = jadwal.slice(6, 15)
    const day3 = jadwal.slice(15)

    return (
      <div className="space-y-12">
        {/* Day 1 */}
        <div>
          <DayHeader 
            day="HARI PERTAMA"
            title="Perjalanan & Pengenalan"
            subtitle="Tanjung Redeb → Pulau Balembangan"
            color={dayColors.day1}
            icon={<MapPin className="w-8 h-8 text-white" />}
          />
          <div className="mt-8">
            <HorizontalTimeline
              items={day1}
              dayColor={dayColors.day1}
              currentIndex={day1Index}
              onIndexChange={setDay1Index}
            />
          </div>
        </div>

        {/* Day 2 */}
        <div>
          <DayHeader 
            day="HARI KEDUA"
            title="Aktivitas Konservasi"
            subtitle="Sensus penyu, edukasi & patroli"
            color={dayColors.day2}
            icon={<Waves className="w-8 h-8 text-white" />}
          />
          <div className="mt-8">
            <HorizontalTimeline
              items={day2}
              dayColor={dayColors.day2}
              currentIndex={day2Index}
              onIndexChange={setDay2Index}
            />
          </div>
        </div>

        {/* Day 3 */}
        <div>
          <DayHeader 
            day="HARI KETIGA"
            title="Perjalanan Pulang"
            subtitle="Pulau Balembangan → Tanjung Redeb"
            color={dayColors.day3}
            icon={<Sun className="w-8 h-8 text-white" />}
          />
          <div className="mt-8">
            <HorizontalTimeline
              items={day3}
              dayColor={dayColors.day3}
              currentIndex={day3Index}
              onIndexChange={setDay3Index}
            />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        
        {/* Hero Header */}
        <div className="text-center mb-16">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-100 rounded-full mb-6 shadow-lg">
              <TreePine className="w-10 h-10 text-emerald-600" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Ekowisata Pulau Balembangan
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
              Jelajahi pulau tak berpenghuni seluas 9,3 hektar dan saksikan habitat alami penyu hijau di Kalimantan Timur
            </p>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            <StatsCard 
              label="Luas Pulau"
              value="9.3 Ha"
              icon={<MapPin size={24} />}
              color="emerald"
            />
            <StatsCard 
              label="Durasi"
              value="3D2N"
              icon={<Calendar size={24} />}
              color="blue"
            />
            <StatsCard 
              label="Aktivitas"
              value="16+"
              icon={<Waves size={24} />}
              color="teal"
            />
            <StatsCard 
              label="Konservasi"
              value="100%"
              icon={<Shield size={24} />}
              color="purple"
            />
          </div>
          
          {/* Key Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <InfoCard 
              icon={<MapPin size={24} />}
              title="Lokasi Eksotis"
              description="Pulau tak berpenghuni dengan panorama alami yang menakjubkan"
              color="emerald"
            />
            <InfoCard 
              icon={<Waves size={24} />}
              title="Konservasi Penyu"
              description="Habitat alami penyu hijau yang terlindungi dan program pelestarian"
              color="teal"
            />
            <InfoCard 
              icon={<Users size={24} />}
              title="Pengalaman Edukatif"
              description="Belajar langsung tentang konservasi laut dan ekosistem"
              color="blue"
            />
          </div>
        </div>

        {/* Timeline Schedule */}
        <div className="mb-10">
          <Section 
            title="Timeline Kegiatan Ekowisata" 
            icon={<Clock size={24} />}
            collapsible={true}
            defaultExpanded={true}
          >
            {renderTimeline()}
            <div className="mt-8 p-4 bg-amber-50 border-2 border-amber-200 rounded-xl">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-amber-800 font-semibold mb-1">
                    Catatan Timeline:
                  </p>
                  <p className="text-sm text-amber-700 leading-relaxed">
                    Timeline dapat berubah sesuai kondisi lapangan, cuaca, dan pasang surut air laut. 
                    Tim akan memberikan informasi terkini sebelum keberangkatan.
                  </p>
                </div>
              </div>
            </div>
          </Section>
        </div>

        {/* Tata Tertib */}
        <div className="mb-10">
          <Section title="Tata Tertib & Ketentuan" icon={<Shield size={24} />}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tataTertib.map((rule, idx) => (
                <RulesCard key={idx} rule={rule} index={idx} />
              ))}
            </div>
          </Section>
        </div>

        {/* Fasilitas */}
        <div className="mb-10">
          <Section title="Fasilitas yang Disediakan" icon={<Camera size={24} />}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {fasilitas.map((f, idx) => (
                <FacilityCard key={idx} facility={f} index={idx} />
              ))}
            </div>
        </Section>
        </div>

        {/* Contact Section */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-8 text-center text-white shadow-xl">
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
              <Phone className="w-8 h-8" />
            </div>
            <h3 className="text-3xl font-bold mb-3">Siap untuk Petualangan?</h3>
            <p className="text-emerald-100 mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
              Hubungi kami sekarang untuk informasi lebih lanjut dan reservasi perjalanan ekowisata yang tak terlupakan
            </p>
          </div>
          <div className="bg-white/15 backdrop-blur-sm rounded-xl p-6 inline-block border border-white/20">
            <p className="font-bold text-2xl mb-1">MALIPE Call Center</p>
            <p className="text-emerald-100 text-base">Informasi & Reservasi 24/7</p>
          </div>
        </div>

      </div>
    </div>
  )
}