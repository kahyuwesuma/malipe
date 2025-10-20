"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

import penjagaan from "@/asset/tentang-kami/penjagaan.jpeg";
import survei from "@/asset/tentang-kami/survei.jpg";
import patroli from "@/asset/tentang-kami/patroli.jpeg";
import sekolah from "@/asset/tentang-kami/sekolah.jpg";
import perdagangan from "@/asset/tentang-kami/perdagangan.jpg";
import profile1 from "@/asset/tentang-kami/profile1.jpeg";
import profile2 from "@/asset/tentang-kami/profile2.jpg";
import about1 from "@/asset/tentang-kami/about1.jpg";

const activities = [
  {
    title: "Penjagaan Pulau Balembangan",
    desc: "Program penjagaan pulau penting di Maratua, Kabupaten Berau. Generasi muda dilibatkan untuk menjaga habitat penyu.",
    img: penjagaan,
  },
  {
    title: "Survei Habitat Penyu",
    desc: "Melakukan survei ke pulau-pulau kecil di Kalimantan untuk memantau habitat penyu yang belum terdata dengan baik.",
    img: survei,
  },
  {
    title: "Patroli Laut",
    desc: "Patroli bersama masyarakat lokal untuk mengurangi praktik illegal fishing dan menjaga ekosistem laut.",
    img: patroli,
  },
  {
    title: "Kunjungan Sekolah",
    desc: "Edukasi pelajar mengenai pentingnya konservasi penyu melalui presentasi, diskusi, dan permainan.",
    img: sekolah,
  },
  {
    title: "Survei Perdagangan Penyu",
    desc: "Kunjungan ke pasar untuk memantau perdagangan penyu dan memberikan laporan jika ditemukan indikasi perdagangan ilegal.",
    img: perdagangan,
  },
];

const organizationPoints = [
  "MALIPE adalah Lembaga konservasi penyu yang bekerja untuk melindungi penyu dan habitatnya",
  "Seluruh program MALIPE peduli lingkungan hidup dan generasi masa depan",
  "MALIPE sebagai organisasi legal didirikan oleh aktivis dan tokoh konservasi dengan komitmen perlindungan",
  "MALIPE melakukan edukasi, survei lapangan, patroli laut, serta penelitian berbasis masyarakat",
  "Semua anggota MALIPE tergerak sebagai sukarelawan yang saling bahu-membahu mencapai tujuan organisasi"
];

export default function AboutSection() {
  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white font-AktivGrotesk-Regular">
      {/* Enhanced Chairman Profile */}
      <motion.div 
        className="max-w-4xl mx-auto px-6 mb-20"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex flex-col md:flex-row items-center gap-8 bg-white rounded-2xl shadow-lg p-8">
          <div className="relative w-48 h-64 flex-shrink-0 rounded-xl overflow-hidden shadow-md">
            <Image
              src={profile1}
              alt="Muhammad Ardian"
              fill
              className="object-cover object-top"
            />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Muhammad Ardian</h2>
            <p className="text-lg text-[#1B602F] font-semibold mb-4">Chairman MALIPE</p>
            <p className="text-gray-600 leading-relaxed">
              Memimpin organisasi konservasi penyu dengan dedikasi tinggi untuk melindungi habitat penyu dan ekosistem laut. Berkomitmen membangun kesadaran masyarakat tentang pentingnya konservasi melalui program-program berkelanjutan.
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div 
        className="max-w-4xl mx-auto px-6 mb-20"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex flex-col md:flex-row items-center gap-8 bg-white rounded-2xl shadow-lg p-8">
          <div className="relative w-48 h-64 flex-shrink-0 rounded-xl overflow-hidden shadow-md">
            <Image
              src={profile2}
              alt="Yunda Zuliarsih"
              fill
              className="object-cover object-top"
            />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Yunda Zuliarsih</h2>
            <p className="text-lg text-[#1B602F] font-semibold mb-4">Ketua MALIPE</p>
            <p className="text-gray-600 leading-relaxed">
            Mendukung jalannya organisasi konservasi penyu dengan ketelitian dan tanggung jawab tinggi. Berperan aktif dalam mendukung kelancaran program konservasi serta menjaga koordinasi yang efektif antar anggota untuk mewujudkan tujuan pelestarian ekosistem laut yang berkelanjutan.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Enhanced Organization Info with YKAN Values Design */}
      <motion.div 
        className="max-w-5xl mx-auto px-6 mb-20"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">
          Terkait Organisasi
        </h2>
        <div className="space-y-8">
          {organizationPoints.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="flex gap-6 items-start">
                <div className="flex-shrink-0">
                  <span className="text-[#1B602F] font-bold text-lg">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="text-gray-600 leading-relaxed">
                    {point}
                  </p>
                </div>
              </div>
              {index < organizationPoints.length - 1 && (
                <Separator className="mt-8 bg-gray-200" />
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Donation Section */}
      <motion.div 
        className="max-w-6xl mx-auto px-6 mb-20"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Desktop Layout */}
        <div className="hidden lg:flex flex-row items-center gap-12">
          {/* Image Section */}
          <div className="flex-1 relative">
            <div className="relative w-full h-80 lg:h-96 rounded-2xl overflow-hidden">
              <Image
                src={about1}
                alt="Donasi MALIPE"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Content Section */}
          <div className="flex-1 text-left">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Dukung Konservasi Penyu Bersama MALIPE
            </h2>
            <p className="text-gray-600 leading-relaxed text-lg mb-8">
              Setiap donasi Anda membantu kami melindungi habitat penyu, melakukan patroli laut, 
              dan mengedukasi masyarakat tentang pentingnya konservasi. Mari bersama-sama 
              menjaga kelestarian penyu untuk generasi mendatang.
            </p>
            <a 
              href="https://paypal.me/Malipe2021"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#1B602F] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#145025] transition-colors duration-300"
            >
              Donasi Sekarang
            </a>
          </div>
        </div>

        {/* Mobile/Tablet Layout - Full Width with Overlay */}
        <div className="lg:hidden relative w-full h-80 rounded-2xl overflow-hidden">
          {/* Background Image */}
          <Image
            src={about1}
            alt="Donasi MALIPE"
            fill
            className="object-cover"
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
          
          {/* Content Overlay */}
          <div className="absolute inset-0 flex flex-col justify-center items-center p-6 text-white text-center">
            <h2 className="text-2xl font-bold mb-4">
              Dukung Konservasi Penyu Bersama MALIPE
            </h2>
            <p className="text-white/90 leading-relaxed mb-6 text-sm">
              Setiap donasi Anda membantu kami melindungi habitat penyu, melakukan patroli laut, 
              dan mengedukasi masyarakat tentang pentingnya konservasi.
            </p>
            <a 
              href="https://paypal.me/Malipe2021"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#1B602F] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#145025] transition-colors duration-300"
            >
              Donasi Sekarang
            </a>
          </div>
        </div>
      </motion.div>

      {/* Enhanced Activities with Responsive Design */}
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          className="text-3xl font-bold text-gray-800 mb-16 text-center px-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Program & Kegiatan
        </motion.h2>
        
        {/* Mobile/Tablet Layout - Full Width Cards */}
        <div className="lg:hidden space-y-0">
          {activities.map((act, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="relative w-full h-80 overflow-hidden"
            >
              {/* Background Image */}
              <Image
                src={act.img}
                alt={act.title}
                fill
                className="object-cover"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
              
              {/* Content Overlay */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-white font-bold text-sm">
                    {i + 1}
                  </span>
                  <div className="h-px bg-white/30 flex-1" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">
                  {act.title}
                </h3>
                <p className="text-white/90 leading-relaxed text-sm">
                  {act.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:block space-y-16 px-6">
          {activities.map((act, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className={`flex flex-col ${
                i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } items-center gap-12`}
            >
              {/* Image Section */}
              <div className="flex-1 relative">
                <div className="relative w-full h-80 lg:h-96 rounded-2xl overflow-hidden shadow-xl group">
                  <Image
                    src={act.img}
                    alt={act.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>

              <div className="flex-1">
                <Card className="border-none bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl hover:shadow-2xl transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-[#1B602F] font-bold text-sm">
                        {i + 1}
                      </span>
                      <div className="h-px bg-gradient-to-r from-[#1B602F] to-transparent flex-1" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-800">
                      {act.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-lg">
                      {act.desc}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}