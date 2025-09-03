"use client";
import Link from "next/link";
import about2 from "@/asset/tentang-kami/about2.jpg";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Leaf,
  Fish,
  Globe,
  Satellite,
  Users,
  Heart,
  Waves,
  Target,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";
import { useAutoTranslate } from "../translate/useAutoTranslate";

const AboutSection = () => {
  const [expandedCard, setExpandedCard] = useState(null);

  const activities = [
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: useAutoTranslate("Pelatihan Aparat Penegak Hukum"),
      summary: useAutoTranslate(
        "Melatih aparat menggunakan SMART Patrol untuk meningkatkan efektivitas patroli kawasan laut."
      ),
      description: useAutoTranslate(
        "Dalam mengimplementasikan program kami, langkah awal yang dilakukan adalah melatih aparat penegak hukum agar dapat mengoperasikan perangkat lunak patroli bernama SMART Patrol (Spatial Monitoring and Reporting Tool)—sebuah sistem pelaporan berbasis data yang dirancang untuk meningkatkan efisiensi dan efektivitas patroli di kawasan perlindungan laut."
      ),
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Satellite className="w-6 h-6" />,
      title: useAutoTranslate("Hibah Peralatan Pengawasan"),
      summary: useAutoTranslate(
        "Menyediakan teknologi canggih seperti Marine Monitor, drone UAV, kamera jarak jauh, dan sistem satelit."
      ),
      description: useAutoTranslate(
        "Kami juga menghibahkan peralatan pendukung patroli kepada aparat penegak hukum. Peralatan ini mencakup mesin kapal, badan kapal, sistem pemantauan M2 (Marine Monitor), kamera jarak jauh (long-range camera), drone UAV, sistem satelit, handphone, laptop, dan perlengkapan lain yang menunjang pengawasan wilayah laut dan pesisir."
      ),
      color: "from-teal-500 to-green-500",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: useAutoTranslate("Koordinasi & Pendanaan Patroli"),
      summary: useAutoTranslate(
        "Berkoordinasi dengan instansi terkait dan mendanai patroli dengan skema 50:50."
      ),
      description: useAutoTranslate(
        "Selain itu, kami secara rutin berkoordinasi dengan instansi terkait guna mengidentifikasi kebutuhan operasional patroli, dan umumnya membantu pendanaannya melalui skema 50:50, di mana separuh biaya ditanggung oleh YLBKD dan sisanya oleh instansi pelaksana."
      ),
      color: "from-purple-500 to-indigo-500",
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: useAutoTranslate("Dukungan Konservasi Penyu"),
      summary: useAutoTranslate(
        "Melindungi penyu dan spesies terancam dengan bantuan biaya, logistik, dan petugas lapangan."
      ),
      description: useAutoTranslate(
        "Di sisi konservasi, kami memberikan dukungan pembiayaan untuk perlindungan penyu dan spesies laut yang terancam punah. Dukungan ini mencakup bantuan biaya bulanan, logistik, peralatan pemantauan, serta honor bagi petugas lapangan. Kami juga memberikan pendampingan manajemen dan administrasi, terutama bagi lembaga-lembaga yang belum memiliki struktur organisasi yang kuat."
      ),
      color: "from-rose-500 to-pink-500",
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: useAutoTranslate("Pendampingan Organisasi Terpencil"),
      summary: useAutoTranslate(
        "Mendukung organisasi di lokasi terpencil yang menjadi garda depan konservasi ekosistem."
      ),
      description: useAutoTranslate(
        "Banyak dari lembaga yang kami bantu merupakan organisasi masyarakat yang bekerja di lokasi terpencil, dengan akses terbatas terhadap air bersih, sinyal telekomunikasi, dan sumber pendanaan berkelanjutan. Namun justru merekalah yang berada di garis depan dalam menjaga keberlangsungan ekosistem yang paling rentan."
      ),
      color: "from-amber-500 to-orange-500",
    },
    {
      icon: <Waves className="w-6 h-6" />,
      title: useAutoTranslate("Program Transplantasi Karang"),
      summary: useAutoTranslate(
        "Mendukung anak muda dalam program restorasi karang untuk pariwisata berkelanjutan."
      ),
      description: useAutoTranslate(
        "Kami juga mendukung program transplantasi karang yang dijalankan oleh kelompok anak muda yang sangat peduli terhadap lingkungan sekitar mereka, dan sadar bahwa aktivitas pariwisata yang tidak berkelanjutan dapat membahayakan rumah mereka—baik saat ini maupun di masa depan."
      ),
      color: "from-cyan-500 to-blue-500",
    },
    {
      icon: <Leaf className="w-6 h-6" />,
      title: useAutoTranslate("Perawatan Lingkungan"),
      summary: useAutoTranslate(
        "Mendanai kegiatan bersih-bersih pantai dan laut oleh kelompok masyarakat terverifikasi."
      ),
      description: useAutoTranslate(
        "Dalam hal perawatan lingkungan, YLBKD turut memberikan pendanaan rutin kepada kelompok masyarakat yang telah diverifikasi oleh aparat desa, kampung, atau pihak terkait untuk melaksanakan kegiatan bersih-bersih pantai dan laut di berbagai wilayah intervensi."
      ),
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: <Fish className="w-6 h-6" />,
      title: useAutoTranslate("Perikanan Berkelanjutan"),
      summary: useAutoTranslate(
        "Membantu nelayan beralih ke alat tangkap ramah lingkungan dan praktik berkelanjutan."
      ),
      description: useAutoTranslate(
        "Sebagai bagian dari upaya mendorong perikanan yang berkelanjutan, kami memberikan bantuan berupa alat tangkap ramah lingkungan dan bibit ikan kepada nelayan lokal agar mereka dapat meninggalkan praktik perikanan yang merusak lingkungan. Untuk memastikan selaras dengan kebijakan lokal, kami berkonsultasi dengan Dinas Kelautan dan Perikanan serta mitra akademisi."
      ),
      color: "from-indigo-500 to-purple-500",
    },
  ];

  const toggleExpand = (index) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  return (
    <div className="">
      <div className="lg:px-5 py-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-AktivGrotesk-Medium sm:text-3xl text-xl lg:px-5 px-4 leading-relaxed">
              <span className="bg-blue-300 px-1 box-decoration-clone">
                {useAutoTranslate("Kami melatih aparat penegak hukum, membantu pendanaan patroli laut, menghibahkan perangkat pengawasan, mendukung kegiatan konservasi dan perawatan lingkungan, serta membiayai program pemberdayaan masyarakat untuk beralih dari aktivitas ilegal menuju usaha legal dan berkelanjutan.")}
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative bg-cover bg-center rounded min-h-[400px]"
            style={{ backgroundImage: `url(${about2.src})` }}
          >
            <div className="absolute inset-0 bg-black/60 rounded" />
            <div className="relative z-10 text-white px-6 py-10 text-center">
              <h3 className="text-3xl font-AktivGrotesk-Bold mb-4">
                {useAutoTranslate("Misi Kami")}
              </h3>
              <div className="text-lg flex flex-col font-AktivGrotesk-Medium leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">
                <div className="text-7xl leading-none">"</div>
                {useAutoTranslate("YLBKD bertujuan melestarikan laut dan ekosistem pesisir dengan mendukung upaya aparat, rangers, dan masyarakat dalam")}
                <span className="text-blue-400">
                  {" "}
                  {useAutoTranslate("melindungi kawasan konservasi serta spesies laut yang terancam punah dari perburuan liar, penangkapan ikan ilegal, dan pengrusakan lingkungan.")}
                </span>
                <div className="text-7xl leading-none py-5">"</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <div className="max-w-5xl mx-auto lg:px-6 py-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          <h2 className="text-4xl font-AktivGrotesk-Medium text-blue-ylbkd">
            {useAutoTranslate("Apa yang kami lakukan")}
          </h2>
          <p className="text-lg font-AktivGrotesk-Regular text-gray-600 max-w-2xl mx-auto">
            {useAutoTranslate("Berikut adalah berbagai program dan kegiatan yang kami laksanakan untuk mendukung konservasi laut dan pemberdayaan masyarakat pesisir")}
          </p>
        </motion.div>
      </div>
      <section className="w-full bg-gradient-to-br from-gray-50 to-blue-50/20 py-16 font-AktivGrotesk-Regular">
        <div className="max-w-6xl mx-auto lg:px-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
            {activities.map((activity, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05, duration: 0.4 }}
                viewport={{ once: true, margin: "-50px" }}
                className="group"
              >
                <div className="relative bg-white/60 rounded-2xl p-6 border border-white/60 hover:border-white/80 transition-all duration-300 shadow-lg hover:shadow-2xl backdrop-blur-sm">
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-r ${activity.color} flex items-center justify-center text-white shadow-sm`}
                    >
                      {activity.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-AktivGrotesk-Medium text-gray-800 mb-2 leading-tight">
                        {activity.title}
                      </h3>
                      <div
                        className={`w-12 h-0.5 bg-gradient-to-r ${activity.color} rounded-full`}
                      />
                    </div>
                  </div>
                  <div className="pl-16 mb-4">
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {activity.summary}
                    </p>
                  </div>
                  <motion.div
                    initial={false}
                    animate={{
                      height: expandedCard === idx ? "auto" : 0,
                      opacity: expandedCard === idx ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="pl-16 pb-4 border-t border-gray-200/50 pt-4">
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {activity.description}
                      </p>
                    </div>
                  </motion.div>
                  <button
                    onClick={() => toggleExpand(idx)}
                    className="w-full pl-16 flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors duration-200 pt-2"
                  >
                    <span>
                      {expandedCard === idx
                        ? useAutoTranslate("Sembunyikan detail")
                        : useAutoTranslate("Lihat detail")}
                    </span>
                    <motion.div
                      animate={{ rotate: expandedCard === idx ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </motion.div>
                  </button>
                  <div
                    className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl ${activity.color} opacity-3 rounded-2xl`}
                  />
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-16 max-w-4xl mx-auto"
          >
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-blue-200/30 text-center shadow-sm">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-white" />
                </div>
                <h4 className="text-xl font-AktivGrotesk-Medium text-blue-800">
                  {useAutoTranslate("Komitmen Berkelanjutan")}
                </h4>
              </div>
              <p className="text-gray-700 max-w-2xl mx-auto leading-relaxed text-sm">
                {useAutoTranslate("Untuk memastikan bahwa setiap bentuk bantuan selaras dengan kebijakan dan kebutuhan lokal, kami selalu berkonsultasi dan meminta arahan dari instansi terkait yang memiliki kewenangan di bidang pengawasan serta mitra akademisi atau ahli sebelum melaksanakan program tersebut.")}
              </p>
            </div>
          </motion.div>
        </div>
      </section>
      <section className="w-full relative overflow-hidden">
        <div
          className="relative bg-cover bg-center min-h-[500px] flex items-center"
          style={{ backgroundImage: `url(${about2.src})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/85 via-blue-800/75 to-transparent" />
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-white/20 rounded-full"
                animate={{
                  y: [-20, -100],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 3 + i * 0.5,
                  repeat: Infinity,
                  delay: i * 0.8,
                }}
                style={{
                  left: `${20 + i * 15}%`,
                  bottom: "10%",
                }}
              />
            ))}
          </div>

          <div className="relative z-10 max-w-6xl mx-auto px-4 lg:px-6 py-16">
            <div className="max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <div className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3 mb-6"
                  >
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center shadow-lg">
                      <Waves className="w-6 h-6 text-white" />
                    </div>
                    <div className="h-px bg-gradient-to-r from-cyan-400 to-transparent flex-1" />
                  </motion.div>

                  <h2 className="text-3xl lg:text-4xl font-AktivGrotesk-Bold text-white leading-tight">
                    <span className="block uppercase">{useAutoTranslate("BERSAMA,")}</span>
                    <span className="block text-cyan-300 uppercase">
                      {useAutoTranslate("KITA BISA MENJAGA")}
                    </span>
                    <span className="block uppercase">{useAutoTranslate("LAUT DAN PESISIR")}</span>
                    <span className="block text-cyan-300 uppercase">{useAutoTranslate("PALING BERNILAI")}</span>
                    <span className="block uppercase">{useAutoTranslate("DI INDONESIA.")}</span>
                  </h2>
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="space-y-6"
                >
                  <p className="text-xl text-gray-200 leading-relaxed">
                    <strong className="text-white">{useAutoTranslate("Donasikan hari ini")}</strong>{" "}
                    {useAutoTranslate("untuk memperluas dukungan perlindungan kawasan konservasi.")}
                  </p>

                  <p className="text-lg text-gray-300 leading-relaxed max-w-2xl">
                    {useAutoTranslate("Setiap kontribusi Anda langsung mendukung rangers dan masyarakat lokal yang bekerja di garis depan untuk melindungi ekosistem laut dan spesies yang terancam punah.")}
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="grid grid-cols-3 gap-6 py-8"
                >
                  {[
                    {
                      number: "100+",
                      label: useAutoTranslate("Rangers Didukung"),
                      icon: <Users className="w-5 h-5" />,
                    },
                    {
                      number: "8",
                      label: useAutoTranslate("Program Aktif"),
                      icon: <Target className="w-5 h-5" />,
                    },
                    {
                      number: "15+",
                      label: useAutoTranslate("Kawasan Dilindungi"),
                      icon: <Globe className="w-5 h-5" />,
                    },
                  ].map((stat, idx) => (
                    <div key={idx} className="text-center">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <div className="text-cyan-400">{stat.icon}</div>
                        <div className="text-2xl font-AktivGrotesk-Bold text-white">
                          {stat.number}
                        </div>
                      </div>
                      <div className="text-sm text-gray-300">{stat.label}</div>
                    </div>
                  ))}
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="flex flex-col sm:flex-row gap-4 pt-4"
                >
                  <button className="group bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-AktivGrotesk-Medium transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center gap-3">
                    <Heart className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                    <Link
                      href={"/donasi"}
                      className="font-AktivGrotesk-Regular"
                    >
                      <span>{useAutoTranslate("Donasi Sekarang")}</span>
                    </Link>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-6 pt-8 border-t border-white/20"
                ></motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutSection;
