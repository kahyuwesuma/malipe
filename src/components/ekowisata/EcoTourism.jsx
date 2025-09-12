'use client';
import { useState } from "react"
import { Clock, MapPin, Users, Camera, Waves, TreePine, Phone, ChevronDown, ChevronUp, AlertCircle, CheckCircle2, Calendar, Info, Shield, Sun, Moon, Sunrise, Sunset, ChevronLeft, ChevronRight, Star, Award, Compass, Anchor } from "lucide-react"

const TimelineCard = ({ item, isActive, index }) => {
  return (
    <div className={`flex-shrink-0 w-80 mx-4 transition-all duration-300 scale-80 ${
      isActive ? 'scale-90' : 'scale-95 opacity-60'
    }`}>
      <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-200 h-48 flex flex-col justify-between">
        {/* Time and Number */}
        <div className="flex items-center justify-between mb-4">
          <div className="bg-[#1B602F] text-white px-3 py-2 rounded-lg font-AktivGrotesk-Regular text-sm">
            {item.time}
          </div>
          <div className="w-8 h-8 bg-[#1B602F] rounded-full flex items-center justify-center text-white text-sm font-AktivGrotesk-Regular">
            {index + 1}
          </div>
        </div>
        
        {/* Activity Category */}
        {getActivityCategory(item.desc) && (
          <div className="bg-green-100 text-[#1B602F] px-3 py-1 rounded-full text-xs font-AktivGrotesk-Regular inline-block mb-4 w-fit">
            <div className="flex items-center gap-1">
              {getCategoryIcon(getActivityCategory(item.desc))}
              {getActivityCategory(item.desc)}
            </div>
          </div>
        )}
        
        {/* Description */}
        <div className="flex-1 flex items-center">
          <p className="text-gray-700 text-sm font-AktivGrotesk-Regular leading-relaxed">{item.desc}</p>
        </div>
      </div>
    </div>
  )
}

const HorizontalTimeline = ({ items, currentIndex, onIndexChange }) => {
  const canGoLeft = currentIndex > 0
  const canGoRight = currentIndex < items.length - 1
  
  return (
    <div className="relative">
      {/* Navigation Arrows */}
      <button
        onClick={() => canGoLeft && onIndexChange(currentIndex - 1)}
        className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full shadow-lg flex items-center justify-center transition-all duration-200 ${
          canGoLeft 
            ? 'bg-[#1B602F] text-white hover:shadow-xl' 
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
        }`}
        disabled={!canGoLeft}
      >
        <ChevronLeft size={20} />
      </button>
      
      <button
        onClick={() => canGoRight && onIndexChange(currentIndex + 1)}
        className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full shadow-lg flex items-center justify-center transition-all duration-200 ${
          canGoRight 
            ? 'bg-[#1B602F] text-white hover:shadow-xl' 
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
        }`}
        disabled={!canGoRight}
      >
        <ChevronRight size={20} />
      </button>

      {/* Timeline Container */}
      <div className="overflow-hidden mx-16">
        <div 
          className="flex transition-transform duration-300 ease-out"
          style={{ transform: `translateX(-${currentIndex * 320}px)` }}
        >
          {items.map((item, idx) => (
            <TimelineCard
              key={idx}
              item={item}
              isActive={idx === currentIndex}
              index={idx}
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
            className={`transition-all duration-200 ${
              idx === currentIndex 
                ? 'w-6 h-3 bg-[#1B602F] rounded-full' 
                : 'w-3 h-3 bg-gray-300 hover:bg-gray-400 rounded-full'
            }`}
          />
        ))}
      </div>

      {/* Current Position Counter */}
      <div className="text-center mt-4">
        <div className="inline-flex items-center gap-2 text-sm font-AktivGrotesk-Regular text-[#1B602F] bg-green-50 px-3 py-2 rounded-full">
          <Clock size={16} />
          <span>{currentIndex + 1} dari {items.length} kegiatan</span>
        </div>
      </div>
    </div>
  )
}

const DayHeader = ({ day, title, subtitle, icon, stats }) => (
  <div className="bg-[#1B602F] rounded-lg p-6 mb-6 shadow-lg text-white">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
          {icon}
        </div>
        <div>
          <div className="text-green-200 text-xs font-AktivGrotesk-Regular mb-1">{day}</div>
          <h3 className="text-xl font-AktivGrotesk-Regular mb-1">{title}</h3>
          <p className="text-green-100 text-sm font-AktivGrotesk-Regular">{subtitle}</p>
        </div>
      </div>
      
      {/* Stats */}
      <div className="hidden md:flex gap-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white/20 rounded-lg px-3 py-2 text-center">
            <div className="text-lg font-AktivGrotesk-Regular">{stat.value}</div>
            <div className="text-xs font-AktivGrotesk-Regular text-green-200">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
)

const getActivityCategory = (desc) => {
  if (desc.includes('Perjalanan')) return 'Transport'
  if (desc.includes('patroli') || desc.includes('sensus')) return 'Konservasi'
  if (desc.includes('release') || desc.includes('tukik')) return 'Penyu'
  if (desc.includes('berenang') || desc.includes('mancing')) return 'Rekreasi'
  if (desc.includes('presentasi')) return 'Edukasi'
  if (desc.includes('istirahat') || desc.includes('bebas')) return 'Istirahat'
  return null
}

const getCategoryIcon = (category) => {
  const iconMap = {
    'Transport': <Compass size={12} />,
    'Konservasi': <Shield size={12} />,
    'Penyu': <Waves size={12} />,
    'Rekreasi': <Star size={12} />,
    'Edukasi': <Award size={12} />,
    'Istirahat': <Moon size={12} />
  }
  return iconMap[category]
}

const Section = ({ title, children, icon, collapsible = false, defaultExpanded = true }) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)
  
  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden mb-8">
      <div 
        className={`p-6 ${collapsible ? 'cursor-pointer hover:bg-gray-50' : ''} border-b border-gray-100`}
        onClick={() => collapsible && setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#1B602F] rounded-lg flex items-center justify-center text-white">
              {icon}
            </div>
            <h2 className="text-xl font-AktivGrotesk-Regular text-gray-800">{title}</h2>
          </div>
          {collapsible && (
            <div className="text-gray-400">
              {isExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
            </div>
          )}
        </div>
      </div>
      {(!collapsible || isExpanded) && (
        <div className="p-6">
          {children}
        </div>
      )}
    </div>
  )
}

const InfoCard = ({ icon, title, description, stats }) => (
  <div className="bg-white border border-gray-200 rounded-lg p-6 text-center hover:shadow-lg transition-shadow duration-200">
    <div className="w-12 h-12 bg-[#1B602F] rounded-lg flex items-center justify-center text-white mx-auto mb-4">
      {icon}
    </div>
    <h3 className="font-AktivGrotesk-Regular text-gray-800 text-lg mb-2">{title}</h3>
    <p className="text-gray-600 text-sm font-AktivGrotesk-Regular mb-3">{description}</p>
    {stats && (
      <div className="inline-block px-3 py-1 bg-green-50 text-[#1B602F] rounded-full font-AktivGrotesk-Regular text-sm">
        {stats}
      </div>
    )}
  </div>
)

const StatsCard = ({ label, value, icon, description }) => (
  <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-200 text-center hover:shadow-xl transition-shadow duration-200">
    <div className="w-12 h-12 bg-[#1B602F] rounded-lg flex items-center justify-center text-white mx-auto mb-3">
      {icon}
    </div>
    <div className="text-2xl font-AktivGrotesk-Regular text-[#1B602F] mb-1">{value}</div>
    <div className="text-sm text-gray-600 font-AktivGrotesk-Regular mb-1">{label}</div>
    {description && (
      <div className="text-xs text-gray-500 font-AktivGrotesk-Regular">{description}</div>
    )}
  </div>
)

const RulesCard = ({ rule, index }) => (
  <div className={`p-4 rounded-lg border transition-shadow duration-200 hover:shadow-md ${
    rule.type === 'warning' 
      ? 'bg-red-50 border-red-200' 
      : 'bg-blue-50 border-blue-200'
  }`}>
    <div className="flex items-start gap-3">
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
        rule.type === 'warning' ? 'bg-red-500' : 'bg-blue-500'
      }`}>
        {rule.type === 'warning' ? 
          <AlertCircle className="w-4 h-4 text-white" /> : 
          <Info className="w-4 h-4 text-white" />
        }
      </div>
      <div className="flex-1">
        <div className={`px-2 py-1 rounded text-xs font-AktivGrotesk-Regular mb-2 inline-block ${
          rule.type === 'warning' 
            ? 'bg-red-200 text-red-800' 
            : 'bg-blue-200 text-blue-800'
        }`}>
          {rule.type === 'warning' ? 'LARANGAN' : 'WAJIB'} #{index + 1}
        </div>
        <p className={`text-sm font-AktivGrotesk-Regular ${
          rule.type === 'warning' ? 'text-red-800' : 'text-blue-800'
        }`}>
          {rule.text}
        </p>
      </div>
    </div>
  </div>
)

const FacilityCard = ({ facility, index }) => (
  <div className="bg-white rounded-lg p-4 shadow border border-gray-200 hover:shadow-lg transition-shadow duration-200">
    <div className="flex items-start gap-3">
      <div className="flex-shrink-0">
        <div className="w-12 h-12 bg-[#1B602F] rounded-lg flex items-center justify-center text-2xl mb-2">
          {facility.icon}
        </div>
        <div className="text-center">
          <span className="text-xs font-AktivGrotesk-Regular text-[#1B602F] bg-green-100 px-2 py-1 rounded">
            #{index + 1}
          </span>
        </div>
      </div>
      <div className="flex-1">
        <p className="text-gray-700 text-sm font-AktivGrotesk-Regular mb-2">{facility.text}</p>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-green-600" />
          <span className="text-xs font-AktivGrotesk-Regular text-green-700 bg-green-100 px-2 py-1 rounded">
            Tersedia
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
      <div className="space-y-12">
        {/* Day 1 */}
        <div>
          <DayHeader 
            day="HARI PERTAMA"
            title="Perjalanan & Pengenalan"
            subtitle="Memulai petualangan menuju pulau tak berpenghuni"
            icon={<MapPin className="w-6 h-6 text-white" />}
            stats={dayStats.day1}
          />
          <HorizontalTimeline
            items={day1}
            currentIndex={day1Index}
            onIndexChange={setDay1Index}
          />
        </div>

        {/* Day 2 */}
        <div>
          <DayHeader 
            day="HARI KEDUA"
            title="Aktivitas Konservasi"
            subtitle="Hari penuh aktivitas konservasi penyu dan edukasi"
            icon={<Waves className="w-6 h-6 text-white" />}
            stats={dayStats.day2}
          />
          <HorizontalTimeline
            items={day2}
            currentIndex={day2Index}
            onIndexChange={setDay2Index}
          />
        </div>

        {/* Day 3 */}
        <div>
          <DayHeader 
            day="HARI KETIGA"
            title="Perjalanan Pulang"
            subtitle="Mengakhiri petualangan dengan kenangan indah"
            icon={<Sun className="w-6 h-6 text-white" />}
            stats={dayStats.day3}
          />
          <HorizontalTimeline
            items={day3}
            currentIndex={day3Index}
            onIndexChange={setDay3Index}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">

        {/* Hero Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-[#1B602F] rounded-lg flex items-center justify-center mx-auto mb-6">
            <TreePine className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-AktivGrotesk-Regular text-[#1B602F] mb-4">
            Pulau Balembangan
          </h1>
          <p className="text-base sm:text-lg font-AktivGrotesk-Regular text-gray-600 max-w-3xl mx-auto mb-8 px-2">
            Jelajahi pulau tak berpenghuni seluas 9,3 hektar dan saksikan habitat alami penyu hijau di Kalimantan Timur
          </p>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            <StatsCard label="Luas Pulau" value="9.3 Ha" icon={<MapPin size={24} />} description="Tak berpenghuni" />
            <StatsCard label="Durasi Trip" value="3D2N" icon={<Calendar size={24} />} description="Pengalaman lengkap" />
            <StatsCard label="Total Aktivitas" value="16+" icon={<Waves size={24} />} description="Kegiatan seru" />
            <StatsCard label="Fokus Konservasi" value="100%" icon={<Shield size={24} />} description="Ramah lingkungan" />
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <InfoCard icon={<MapPin size={24} />} title="Lokasi Eksotis" description="Pulau tak berpenghuni dengan panorama alami yang menakjubkan dan pantai berpasir putih" stats="9.3 Hektar" />
            <InfoCard icon={<Waves size={24} />} title="Konservasi Penyu" description="Habitat alami penyu hijau yang terlindungi dengan program pelestarian berkelanjutan" stats="Penyu Hijau" />
            <InfoCard icon={<Users size={24} />} title="Pengalaman Edukatif" description="Belajar langsung tentang konservasi laut dan berpartisipasi dalam program pelestarian" stats="Hands-On" />
          </div>
        </div>

        {/* Timeline */}
        <Section 
          title={<span className="font-AktivGrotesk-Regular">Jadwal Kegiatan</span>}
          icon={<Clock size={24} />}
          collapsible={true}
          defaultExpanded={true}
        >
          {renderTimeline()}
          <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 font-AktivGrotesk-Regular">
              <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
              <div>
                <p className="text-amber-800 mb-2">Catatan Penting Timeline:</p>
                <p className="text-amber-700 text-sm">
                  Timeline dapat berubah sesuai kondisi cuaca dan pasang surut air laut. 
                  Tim akan memberikan informasi terkini sebelum keberangkatan.
                </p>
              </div>
            </div>
          </div>
        </Section>

        {/* Tata Tertib */}
        <Section title={<span className="font-AktivGrotesk-Regular">Tata Tertib & Ketentuan</span>} icon={<Shield size={24} />}>
          <p className="text-gray-600 font-AktivGrotesk-Regular mb-6">
            Untuk menjaga kelestarian alam dan keamanan bersama, mohon patuhi ketentuan berikut:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tataTertib.map((rule, idx) => (
              <RulesCard key={idx} rule={rule} index={idx} />
            ))}
          </div>
        </Section>

        {/* Fasilitas */}
        <Section title={<span className="font-AktivGrotesk-Regular">Fasilitas yang Disediakan</span>} icon={<Camera size={24} />}>
          <p className="text-gray-600 font-AktivGrotesk-Regular mb-6">
            Fasilitas dasar yang diperlukan untuk pengalaman ekowisata yang nyaman dan aman:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 font-AktivGrotesk-Regular">
            {fasilitas.map((f, idx) => (
              <FacilityCard key={idx} facility={f} index={idx} />
            ))}
          </div>
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg font-AktivGrotesk-Regular">
            <div className="flex flex-col sm:flex-row items-start gap-3">
              <Info className="w-5 h-5 text-blue-600 flex-shrink-0" />
              <div>
                <h4 className="font-AktivGrotesk-Regular text-blue-800 mb-2">Tips Persiapan:</h4>
                <ul className="text-blue-700 text-sm space-y-1">
                  <li>• Bawa pakaian ganti dan perlengkapan mandi</li>
                  <li>• Sunscreen dan topi untuk perlindungan matahari</li>
                  <li>• Kamera tahan air untuk dokumentasi</li>
                  <li>• Obat-obatan pribadi dan P3K sederhana</li>
                </ul>
              </div>
            </div>
          </div>
        </Section>

        {/* Contact */}
        <div className="bg-[#1B602F] rounded-lg p-8 text-center text-white">
          <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-6">
            <Phone className="w-8 h-8" />
          </div>
          <h3 className="text-2xl sm:text-3xl mb-4 font-AktivGrotesk-Regular">Siap untuk Petualangan?</h3>
          <p className="text-base sm:text-lg font-AktivGrotesk-Regular text-green-100 mb-8 max-w-2xl mx-auto px-2">
            Bergabunglah dengan pengalaman ekowisata yang tak terlupakan dan berkontribusi 
            langsung pada konservasi penyu hijau di habitat aslinya
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white/10 rounded-lg p-4">
              <Phone className="w-6 h-6 mx-auto mb-2" />
              <p className="font-AktivGrotesk-Regular">Reservasi</p>
              <p className="text-green-100 text-sm">24/7 Customer Service</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <Users className="w-6 h-6 mx-auto mb-2" />
              <p className="font-AktivGrotesk-Regular">Grup Kecil</p>
              <p className="text-green-100 text-sm">Max 15 orang/trip</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <Shield className="w-6 h-6 mx-auto mb-2" />
              <p className="font-AktivGrotesk-Regular">Asuransi</p>
              <p className="text-green-100 text-sm">Keamanan terjamin</p>
            </div>
          </div>

          <div className="bg-white/10 rounded-lg p-6 inline-block font-AktivGrotesk-Regular">
            <p className="text-xl sm:text-2xl mb-2">🐢 MALIPE Call Center</p>
            <p className="text-green-100 mb-4">Pusat Informasi & Reservasi</p>
            <div className="flex flex-wrap justify-center gap-2">
              <span className="px-3 py-1 bg-white/20 rounded-full text-sm">📞 WhatsApp Ready</span>
              <span className="px-3 py-1 bg-white/20 rounded-full text-sm">⚡ Respon Cepat</span>
              <span className="px-3 py-1 bg-white/20 rounded-full text-sm">🎯 Konsultasi Gratis</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}