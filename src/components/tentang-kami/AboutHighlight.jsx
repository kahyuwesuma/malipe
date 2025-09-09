"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const activities = [
  {
    title: "Penjagaan Pulau Balembangan",
    desc: "Program penjagaan pulau penting di Maratua, Kabupaten Berau. Generasi muda dilibatkan untuk menjaga habitat penyu.",
    img: "/images/penjagaan.jpg",
  },
  {
    title: "Survei Habitat Penyu",
    desc: "Melakukan survei ke pulau-pulau kecil di Kalimantan untuk memantau habitat penyu yang belum terdata dengan baik.",
    img: "/images/survei.jpg",
  },
  {
    title: "Patroli Laut",
    desc: "Patroli bersama masyarakat lokal untuk mengurangi praktik illegal fishing dan menjaga ekosistem laut.",
    img: "/images/patroli.jpg",
  },
  {
    title: "Kunjungan Sekolah",
    desc: "Edukasi pelajar mengenai pentingnya konservasi penyu melalui presentasi, diskusi, dan permainan.",
    img: "/images/sekolah.jpg",
  },
  {
    title: "Survei Perdagangan Penyu",
    desc: "Kunjungan ke pasar untuk memantau perdagangan penyu dan memberikan laporan jika ditemukan indikasi perdagangan ilegal.",
    img: "/images/perdagangan.jpg",
  },
];

export default function AboutHighlight() {
  return (
    <section className="py-16 bg-gray-50">
      {/* Hero */}
      <div className="relative bg-[url('/images/hero-bg.jpg')] bg-cover bg-center h-72 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/50" />
        <h1 className="relative text-4xl md:text-5xl font-bold text-white z-10">
          Tentang Kami
        </h1>
      </div>

      {/* Terkait Organisasi */}
      <div className="max-w-5xl mx-auto px-6 mt-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Terkait Organisasi
        </h2>
        <ul className="list-disc list-inside text-gray-600 space-y-2">
          <li>MALIPE adalah Lembaga konservasi penyu yang bekerja untuk melindungi penyu dan habitatnya</li>
          <li>Seluruh program MALIPE peduli lingkungan hidup dan generasi masa depan</li>
          <li>MALIPE sebagai organisasi legal didirikan oleh aktivis dan tokoh konservasi dengan komitmen perlindungan</li>
          <li>MALIPE melakukan edukasi, survei lapangan, patroli laut, serta penelitian berbasis masyarakat</li>
          <li>Semua anggota MALIPE tergerak sebagai sukarelawan yang saling bahu-membahu mencapai tujuan organisasi</li>
        </ul>
      </div>

      {/* Activities */}
      <div className="max-w-6xl mx-auto px-6 mt-16 grid gap-10">
        {activities.map((act, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`grid md:grid-cols-2 gap-6 items-center ${
              i % 2 === 1 ? "md:flex-row-reverse" : ""
            }`}
          >
            <div className="relative w-full h-72">
              <Image
                src={act.img}
                alt={act.title}
                fill
                className="rounded-xl object-cover shadow-md"
              />
            </div>
            <Card className="border-none shadow-md rounded-xl">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  {act.title}
                </h3>
                <p className="text-gray-600 mb-4">{act.desc}</p>
                <Button variant="default" className="bg-[#1B602F] hover:bg-[#155026] text-white">
                  Pelajari Lebih Lanjut
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
