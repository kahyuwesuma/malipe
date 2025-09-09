'use client';
import { useState } from "react"
import { Clock, MapPin, Users, Camera, Waves, TreePine, Phone, ChevronDown, ChevronUp, AlertCircle, CheckCircle2, Calendar, Info, Shield, Sun, Moon, Sunrise, Sunset, ChevronLeft, ChevronRight, Star, Award, Compass, Anchor } from "lucide-react"

const TimelineCard = ({ item, dayColor, isActive, index }) => {
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <div 
      className={`flex-shrink-0 w-80 mx-4 transition-all duration-500 ${
        isActive ? 'scale-110 z-10' : 'scale-95 opacity-70'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`${dayColor.cardBg} rounded-2xl p-6 shadow-xl border-2 ${dayColor.border} hover:shadow-2xl transition-all duration-300 h-56 flex flex-col justify-between relative overflow-hidden group`}>
        {/* Decorative Background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${dayColor.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
        
        {/* Activity Number Badge */}
        <div className="absolute top-4 right-4">
          <div className={`w-8 h-8 ${dayColor.bg} rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg`}>
            {index + 1}
          </div>
        </div>

        {/* Time and Category */}
        <div className="relative">
          <div className="flex items-center justify-between mb-4">
            <div className={`${dayColor.timeBg} ${dayColor.timeText} px-4 py-2 rounded-xl font-bold text-lg shadow-md`}>
              {item.time}
            </div>
            <div className={`w-12 h-12 ${dayColor.bg} rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
              {getTimeIcon(item.time)}
            </div>
          </div>
          
          {/* Activity Category */}
          {getActivityCategory(item.desc) && (
            <div className={`px-3 py-1 ${dayColor.categoryBg} ${dayColor.categoryText} rounded-full text-sm font-medium inline-block mb-4 w-fit shadow-sm`}>
              <div className="flex items-center gap-1">
                {getCategoryIcon(getActivityCategory(item.desc))}
                {getActivityCategory(item.desc)}
              </div>
            </div>
          )}
        </div>
        
        {/* Description */}
        <div className="flex-1 flex items-center relative">
          <p className="text-gray-700 leading-relaxed text-base font-medium">{item.desc}</p>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-1">
            <div 
              className={`${dayColor.bg} h-1 rounded-full transition-all duration-300`}
              style={{ width: isActive ? '100%' : '0%' }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  )
}

const HorizontalTimeline = ({ items, dayColor, currentIndex, onIndexChange, dayTitle }) => {
  const canGoLeft = currentIndex > 0
  const canGoRight = currentIndex < items.length - 1
  
  return (
    <div className="relative">
      {/* Navigation Arrows */}
      <button
        onClick={() => canGoLeft && onIndexChange(currentIndex - 1)}
        className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 ${
          canGoLeft 
            ? `${dayColor.bg} text-white hover:shadow-2xl hover:scale-110 active:scale-95` 
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
        }`}
        disabled={!canGoLeft}
      >
        <ChevronLeft size={28} />
      </button>
      
      <button
        onClick={() => canGoRight && onIndexChange(currentIndex + 1)}
        className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 ${
          canGoRight 
            ? `${dayColor.bg} text-white hover:shadow-2xl hover:scale-110 active:scale-95` 
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
        }`}
        disabled={!canGoRight}
      >
        <ChevronRight size={28} />
      </button>

      {/* Timeline Container */}
      <div className="overflow-hidden mx-20">
        <div 
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentIndex * 320}px)` }}
        >
          {items.map((item, idx) => (
            <TimelineCard
              key={idx}
              item={item}
              dayColor={dayColor}
              isActive={idx === currentIndex}
              index={idx}
            />
          ))}
        </div>
      </div>

      {/* Progress Indicators */}
      <div className="flex justify-center mt-8 gap-3">
        {items.map((_, idx) => (
          <button
            key={idx}
            onClick={() => onIndexChange(idx)}
            className={`relative transition-all duration-300 ${
              idx === currentIndex 
                ? `w-8 h-4 ${dayColor.bg} rounded-full` 
                : 'w-4 h-4 bg-gray-300 hover:bg-gray-400 rounded-full hover:scale-110'
            }`}
          >
            {idx === currentIndex && (
              <div className="absolute inset-0 bg-white/30 rounded-full animate-pulse"></div>
            )}
          </button>
        ))}
      </div>

      {/* Current Position Counter */}
      <div className="text-center mt-6">
        <div className={`inline-flex items-center gap-2 text-sm font-bold ${dayColor.timeText} ${dayColor.timeBg} px-4 py-2 rounded-full shadow-md`}>
          <Clock size={16} />
          <span>{currentIndex + 1} dari {items.length} kegiatan</span>
        </div>
      </div>
    </div>
  )
}

const DayHeader = ({ day, title, subtitle, color, icon, stats }) => (
  <div className={`${color.headerBg} rounded-2xl p-8 mb-8 shadow-2xl border-2 ${color.headerBorder} relative overflow-hidden`}>
    {/* Decorative Elements */}
    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-bl-full"></div>
    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-tr-full"></div>
    
    <div className="relative flex items-center justify-between">
      <div className="flex items-center gap-6">
        <div className={`w-20 h-20 ${color.iconBg} rounded-2xl flex items-center justify-center shadow-xl backdrop-blur-sm`}>
          {icon}
        </div>
        <div>
          <div className={`inline-block px-3 py-1 bg-white/20 rounded-full text-sm font-medium ${color.headerSubtext} mb-2`}>
            {day}
          </div>
          <h3 className={`text-3xl font-bold ${color.headerText} mb-2`}>{title}</h3>
          <p className={`text-lg ${color.headerDesc} leading-relaxed max-w-md`}>{subtitle}</p>
        </div>
      </div>
      
      {/* Stats */}
      <div className="hidden lg:flex flex-col gap-3">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 text-center">
            <div className={`text-2xl font-bold ${color.headerText}`}>{stat.value}</div>
            <div className={`text-sm ${color.headerSubtext}`}>{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
)

const getTimeIcon = (time) => {
  const hour = parseInt(time.split('.')[0])
  if (hour >= 5 && hour < 10) return <Sunrise className="w-6 h-6 text-white" />
  if (hour >= 10 && hour < 17) return <Sun className="w-6 h-6 text-white" />
  if (hour >= 17 && hour < 20) return <Sunset className="w-6 h-6 text-white" />
  return <Moon className="w-6 h-6 text-white" />
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

const getCategoryIcon = (category) => {
  const iconMap = {
    'Transport': <Compass size={14} />,
    'Konservasi': <Shield size={14} />,
    'Penyu': <Waves size={14} />,
    'Rekreasi': <Star size={14} />,
    'Edukasi': <Award size={14} />,
    'Istirahat': <Moon size={14} />,
    'Aktivitas': <Anchor size={14} />
  }
  return iconMap[category] || <Anchor size={14} />
}

const Section = ({ title, children, icon, collapsible = false, defaultExpanded = true, gradient = false }) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)
  
  return (
    <div className={`rounded-3xl shadow-2xl border border-gray-200 overflow-hidden ${
      gradient ? 'bg-gradient-to-br from-white to-gray-50' : 'bg-white'
    }`}>
      <div 
        className={`p-8 ${collapsible ? 'cursor-pointer hover:bg-gray-50 transition-colors' : ''} border-b border-gray-100 ${
          gradient ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white' : ''
        }`}
        onClick={() => collapsible && setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg ${
              gradient ? 'bg-white/20' : 'bg-gradient-to-br from-emerald-400 to-teal-500 text-white'
            }`}>
              {icon}
            </div>
            <h2 className={`text-3xl font-bold ${gradient ? 'text-white' : 'text-gray-800'}`}>{title}</h2>
          </div>
          {collapsible && (
            <div className={`transition-colors hover:scale-110 transform duration-200 ${
              gradient ? 'text-white/80 hover:text-white' : 'text-gray-400 hover:text-gray-600'
            }`}>
              {isExpanded ? <ChevronUp size={28} /> : <ChevronDown size={28} />}
            </div>
          )}
        </div>
      </div>
      {(!collapsible || isExpanded) && (
        <div className="p-8">
          {children}
        </div>
      )}
    </div>
  )
}

const InfoCard = ({ icon, title, description, color = "emerald", stats }) => (
  <div className={`bg-gradient-to-br from-${color}-50 to-${color}-100 border-2 border-${color}-200 rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group relative overflow-hidden`}>
    <div className={`absolute inset-0 bg-gradient-to-br from-${color}-400/10 to-${color}-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
    <div className="relative">
      <div className={`w-16 h-16 bg-gradient-to-br from-${color}-400 to-${color}-500 rounded-2xl flex items-center justify-center text-white mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
        {icon}
      </div>
      <h3 className={`font-bold text-${color}-900 text-xl mb-4`}>{title}</h3>
      <p className={`text-${color}-700 text-sm leading-relaxed mb-4`}>{description}</p>
      {stats && (
        <div className={`inline-block px-4 py-2 bg-${color}-200 rounded-full text-${color}-800 font-bold text-sm`}>
          {stats}
        </div>
      )}
    </div>
  </div>
)

const StatsCard = ({ label, value, icon, color, description }) => (
  <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-200 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group">
    <div className={`w-16 h-16 bg-gradient-to-br from-${color}-400 to-${color}-500 rounded-2xl flex items-center justify-center text-white mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
      {icon}
    </div>
    <div className={`text-3xl font-bold bg-gradient-to-r from-${color}-600 to-${color}-700 bg-clip-text text-transparent mb-2`}>{value}</div>
    <div className="text-sm text-gray-600 font-medium mb-1">{label}</div>
    {description && (
      <div className="text-xs text-gray-500">{description}</div>
    )}
  </div>
)

const RulesCard = ({ rule, index }) => (
  <div className={`p-6 rounded-2xl border-2 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group ${
    rule.type === 'warning' 
      ? 'bg-gradient-to-br from-red-50 to-red-100 border-red-200 hover:from-red-100 hover:to-red-200' 
      : 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:from-blue-100 hover:to-blue-200'
  }`}>
    <div className="flex items-start gap-4">
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300 ${
        rule.type === 'warning' ? 'bg-gradient-to-br from-red-400 to-red-500' : 'bg-gradient-to-br from-blue-400 to-blue-500'
      }`}>
        {rule.type === 'warning' ? 
          <AlertCircle className="w-6 h-6 text-white" /> : 
          <Info className="w-6 h-6 text-white" />
        }
      </div>
      <div className="flex-1">
        <div className={`px-3 py-1 rounded-full text-xs font-bold mb-3 inline-block shadow-sm ${
          rule.type === 'warning' 
            ? 'bg-red-200 text-red-800' 
            : 'bg-blue-200 text-blue-800'
        }`}>
          {rule.type === 'warning' ? '⚠️ LARANGAN' : '✅ WAJIB'} #{index + 1}
        </div>
        <p className={`text-sm leading-relaxed font-medium ${
          rule.type === 'warning' ? 'text-red-800' : 'text-blue-800'
        }`}>
          {rule.text}
        </p>
      </div>
    </div>
  </div>
)

const FacilityCard = ({ facility, index }) => (
  <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group">
    <div className="flex items-start gap-4">
      <div className="flex-shrink-0">
        <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-teal-500 rounded-2xl flex items-center justify-center text-3xl mb-3 shadow-lg group-hover:scale-110 transition-transform duration-300">
          {facility.icon}
        </div>
        <div className="text-center">
          <span className="text-xs font-bold text-teal-600 bg-teal-100 px-3 py-1 rounded-full">
            #{index + 1}
          </span>
        </div>
      </div>
      <div className="flex-1">
        <p className="text-gray-700 text-sm leading-relaxed mb-3 font-medium">{facility.text}</p>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-green-600" />
          <span className="text-xs font-bold text-green-700 bg-green-100 px-2 py-1 rounded-full">
            ✅ Tersedia
          </span>
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
    { text: "Kirim foto KTP untuk registrasi sebelum keberangkatan", type: "info" },
    { text: "Ijin ketika ingin berjalan-jalan keliling pulau untuk keamanan bersama", type: "info" },
    { text: "Mengikuti semua kegiatan yang telah disusun demi pengalaman optimal", type: "info" },
    { text: "DILARANG mengambil, memakan, atau menyimpan apapun terkait penyu (blacklist pengunjung)", type: "warning" },
    { text: "DILARANG merusak habitat satwa liar dan lingkungan sekitar", type: "warning" },
  ]

  const fasilitas = [
    { text: "Speedboat PP + lifejacket keselamatan standar internasional", icon: "🚤" },
    { text: "Makanan sederhana (nasi + lauk, cukup mengenyangkan) 3x sehari", icon: "🍽️" },
    { text: "Tempat berteduh minimalis (pos monitoring) untuk istirahat", icon: "🏠" },
    { text: "Air bersih terbatas (minum bebas, mandi 1×/hari)", icon: "💧" },
    { text: "Spot foto alami Pulau Balembangan yang Instagram-worthy", icon: "📸" },
    { text: "Bawa perlengkapan tenda, snorkeling, pancing, kamera diperbolehkan", icon: "🎒" },
  ]

  // Enhanced color schemes
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
      <div className="space-y-16">
        {/* Day 1 */}
        <div>
          <DayHeader 
            day="HARI PERTAMA"
            title="Perjalanan & Pengenalan"
            subtitle="Memulai petualangan menuju pulau tak berpenghuni dengan perjalanan laut yang menakjubkan"
            color={dayColors.day1}
            icon={<MapPin className="w-10 h-10 text-white" />}
            stats={dayStats.day1}
          />
          <div className="mt-8">
            <HorizontalTimeline
              items={day1}
              dayColor={dayColors.day1}
              currentIndex={day1Index}
              onIndexChange={setDay1Index}
              dayTitle="Hari Pertama"
            />
          </div>
        </div>

        {/* Day 2 */}
        <div>
          <DayHeader 
            day="HARI KEDUA"
            title="Aktivitas Konservasi"
            subtitle="Hari yang penuh dengan aktivitas konservasi penyu dan edukasi lingkungan"
            color={dayColors.day2}
            icon={<Waves className="w-10 h-10 text-white" />}
            stats={dayStats.day2}
          />
          <div className="mt-8">
            <HorizontalTimeline
              items={day2}
              dayColor={dayColors.day2}
              currentIndex={day2Index}
              onIndexChange={setDay2Index}
              dayTitle="Hari Kedua"
            />
          </div>
        </div>

        {/* Day 3 */}
        <div>
          <DayHeader 
            day="HARI KETIGA"
            title="Perjalanan Pulang"
            subtitle="Mengakhiri petualangan dengan kenangan indah tentang konservasi alam"
            color={dayColors.day3}
            icon={<Sun className="w-10 h-10 text-white" />}
            stats={dayStats.day3}
          />
          <div className="mt-8">
            <HorizontalTimeline
              items={day3}
              dayColor={dayColors.day3}
              currentIndex={day3Index}
              onIndexChange={setDay3Index}
              dayTitle="Hari Ketiga"
            />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-blue-200/15 rounded-full blur-2xl animate-bounce"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12">
        
        {/* Hero Header */}
        <div className="text-center mb-20">
          <div className="mb-10">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full mb-8 shadow-2xl animate-bounce">
              <TreePine className="w-12 h-12 text-white" />
            </div>
            <div className="mb-6">
              <div className="inline-block px-6 py-2 bg-emerald-100 rounded-full text-emerald-800 font-bold text-sm mb-4">
                🌊 EKOWISATA PREMIUM
              </div>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 bg-clip-text text-transparent mb-6">
              Pulau Balembangan
            </h1>
            <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-10">
              Jelajahi pulau tak berpenghuni seluas 9,3 hektar dan saksikan habitat alami penyu hijau di Kalimantan Timur
            </p>
          </div>
          
          {/* Enhanced Stats Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-12">
            <StatsCard 
              label="Luas Pulau"
              value="9.3 Ha"
              icon={<MapPin size={28} />}
              color="emerald"
              description="Tak berpenghuni"
            />
            <StatsCard 
              label="Durasi Trip"
              value="3D2N"
              icon={<Calendar size={28} />}
              color="blue"
              description="Pengalaman lengkap"
            />
            <StatsCard 
              label="Total Aktivitas"
              value="16+"
              icon={<Waves size={28} />}
              color="teal"
              description="Kegiatan seru"
            />
            <StatsCard 
              label="Fokus Konservasi"
              value="100%"
              icon={<Shield size={28} />}
              color="purple"
              description="Ramah lingkungan"
            />
          </div>
          
          {/* Enhanced Key Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <InfoCard 
              icon={<MapPin size={28} />}
              title="Lokasi Eksotis"
              description="Pulau tak berpenghuni dengan panorama alami yang menakjubkan dan pantai berpasir putih"
              color="emerald"
              stats="9.3 Hektar"
            />
            <InfoCard 
              icon={<Waves size={28} />}
              title="Konservasi Penyu"
              description="Habitat alami penyu hijau yang terlindungi dengan program pelestarian berkelanjutan"
              color="teal"
              stats="Penyu Hijau"
            />
            <InfoCard 
              icon={<Users size={28} />}
              title="Pengalaman Edukatif"
              description="Belajar langsung tentang konservasi laut dan berpartisipasi dalam program pelestarian"
              color="blue"
              stats="Hands-On"
            />
          </div>
        </div>

        {/* Timeline Schedule */}
        <div className="mb-16">
          <Section 
            title="Timeline Kegiatan Ekowisata" 
            icon={<Clock size={28} />}
            collapsible={true}
            defaultExpanded={true}
            gradient={true}
          >
            {renderTimeline()}
            <div className="mt-12 p-8 bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-2xl shadow-lg">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-lg font-bold text-amber-800 mb-3">
                    ⚠️ Catatan Penting Timeline:
                  </p>
                  <p className="text-amber-700 leading-relaxed">
                    Timeline dapat berubah sesuai kondisi lapangan, cuaca, dan pasang surut air laut. 
                    Tim profesional kami akan memberikan informasi terkini dan penyesuaian jadwal 
                    sebelum keberangkatan untuk memastikan pengalaman terbaik dan keamanan peserta.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-amber-200 text-amber-800 rounded-full text-sm font-medium">
                      🌊 Tergantung Pasang Surut
                    </span>
                    <span className="px-3 py-1 bg-amber-200 text-amber-800 rounded-full text-sm font-medium">
                      ☀️ Sesuai Cuaca
                    </span>
                    <span className="px-3 py-1 bg-amber-200 text-amber-800 rounded-full text-sm font-medium">
                      🐢 Aktivitas Penyu Alami
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Section>
        </div>

        {/* Enhanced Tata Tertib */}
        <div className="mb-16">
          <Section title="Tata Tertib & Ketentuan" icon={<Shield size={28} />}>
            <div className="mb-8">
              <p className="text-gray-600 text-lg leading-relaxed">
                Untuk menjaga kelestarian alam dan keamanan bersama, mohon patuhi ketentuan berikut:
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {tataTertib.map((rule, idx) => (
                <RulesCard key={idx} rule={rule} index={idx} />
              ))}
            </div>
            <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl">
              <div className="flex items-center gap-3 mb-3">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
                <h4 className="font-bold text-green-800 text-lg">Komitmen Konservasi</h4>
              </div>
              <p className="text-green-700 leading-relaxed">
                Setiap peserta berkontribusi langsung pada upaya konservasi penyu dan ekosistem laut. 
                Pelanggaran serius akan mengakibatkan blacklist permanen untuk melindungi habitat alami.
              </p>
            </div>
          </Section>
        </div>

        {/* Enhanced Fasilitas */}
        <div className="mb-16">
          <Section title="Fasilitas yang Disediakan" icon={<Camera size={28} />}>
            <div className="mb-8">
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Kami menyediakan fasilitas dasar yang diperlukan untuk pengalaman ekowisata yang nyaman dan aman:
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                <span className="px-4 py-2 bg-teal-100 text-teal-800 rounded-full font-medium">
                  ✅ Keamanan Terjamin
                </span>
                <span className="px-4 py-2 bg-teal-100 text-teal-800 rounded-full font-medium">
                  🌱 Ramah Lingkungan
                </span>
                <span className="px-4 py-2 bg-teal-100 text-teal-800 rounded-full font-medium">
                  👥 Kapasitas Terbatas
                </span>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {fasilitas.map((f, idx) => (
                <FacilityCard key={idx} facility={f} index={idx} />
              ))}
            </div>
            <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-teal-50 border-2 border-blue-200 rounded-2xl">
              <div className="flex items-start gap-4">
                <Info className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-blue-800 text-lg mb-2">💡 Tips Persiapan:</h4>
                  <ul className="text-blue-700 space-y-1">
                    <li>• Bawa pakaian ganti secukupnya dan perlengkapan mandi</li>
                    <li>• Sunscreen dan topi untuk perlindungan dari matahari</li>
                    <li>• Kamera tahan air untuk dokumentasi bawah laut</li>
                    <li>• Obat-obatan pribadi dan P3K sederhana</li>
                  </ul>
                </div>
              </div>
            </div>
          </Section>
        </div>

        {/* Enhanced Contact Section */}
        <div className="relative">
          <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 rounded-3xl p-12 text-center text-white shadow-2xl relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-bl-full"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-tr-full"></div>
            
            <div className="relative">
              <div className="mb-8">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-6">
                  <Phone className="w-10 h-10" />
                </div>
                <h3 className="text-4xl font-bold mb-4">Siap untuk Petualangan?</h3>
                <p className="text-xl text-emerald-100 mb-8 max-w-3xl mx-auto leading-relaxed">
                  Bergabunglah dengan pengalaman ekowisata yang tak terlupakan dan berkontribusi 
                  langsung pada konservasi penyu hijau di habitat aslinya
                </p>
              </div>
              
              {/* Enhanced Contact Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <Phone className="w-8 h-8 mx-auto mb-3" />
                  <p className="font-bold text-lg mb-1">Reservasi</p>
                  <p className="text-emerald-100 text-sm">24/7 Customer Service</p>
                </div>
                <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <Users className="w-8 h-8 mx-auto mb-3" />
                  <p className="font-bold text-lg mb-1">Grup Kecil</p>
                  <p className="text-emerald-100 text-sm">Max 15 orang/trip</p>
                </div>
                <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <Shield className="w-8 h-8 mx-auto mb-3" />
                  <p className="font-bold text-lg mb-1">Asuransi</p>
                  <p className="text-emerald-100 text-sm">Keamanan terjamin</p>
                </div>
              </div>

              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 inline-block border border-white/30">
                <p className="font-bold text-3xl mb-2">🐢 MALIPE Call Center</p>
                <p className="text-emerald-100 text-lg mb-4">Pusat Informasi & Reservasi</p>
                <div className="flex flex-wrap justify-center gap-4">
                  <span className="px-4 py-2 bg-white/20 rounded-full text-sm font-medium">
                    📞 WhatsApp Ready
                  </span>
                  <span className="px-4 py-2 bg-white/20 rounded-full text-sm font-medium">
                    ⚡ Respon Cepat
                  </span>
                  <span className="px-4 py-2 bg-white/20 rounded-full text-sm font-medium">
                    🎯 Konsultasi Gratis
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}