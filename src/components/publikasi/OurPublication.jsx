"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AspectRatio } from "../ui/aspect-ratio";
import { motion } from "framer-motion";
import { Calendar, Clock, User, ArrowRight, BookOpen } from "lucide-react";
import { supabase } from "@/utils/supabaseClient";
import { useAutoTranslate } from "../translate/useAutoTranslate";
import { useTranslation } from "../translate/TranslationContext";

const OurPublication = () => {
  const [publications, setPublications] = useState([]);
  const [translated, setTranslated] = useState([]);
  const { translateText } = useTranslation();

  const bacaSelengkapnya = useAutoTranslate("Baca Selengkapnya");
  const translatedTitle = useAutoTranslate("Publikasi Kami");
  const translatedDesc = useAutoTranslate("Temukan laporan, studi, dan panduan terbaru dari upaya konservasi laut dan pemberdayaan masyarakat pesisir");
  const translatedNote = useAutoTranslate("Dalam upaya menjaga keberlanjutan ekosistem pesisir dan laut di wilayah Kepulauan Derawan dan sekitarnya, berbagai langkah strategis telah diambil melalui program-program konservasi yang terfokus dan kolaboratif.");
  const translatedMinute = useAutoTranslate("Menit");

  const getCategoryColor = (category) => {
    const colors = {
      policy: "bg-orange-100 text-orange-700 border-orange-200",
      report: "bg-green-100 text-green-700 border-green-200",
    };
    return colors[category] || "bg-gray-100 text-gray-700 border-gray-200";
  };

  useEffect(() => {
    const fetchPublications = async () => {
      const { data, error } = await supabase
        .from("publications")
        .select("*")
        .order("date", { ascending: false });
  
      if (!error && data) {
        setPublications(data);
      }
    };
  
    fetchPublications();
  }, []);

  useEffect(() => {
    const doTranslate = async () => {
      const results = await Promise.all(
        publications.map(async (pub) => ({
          ...pub,
          translatedTitle: await translateText(pub.title),
          translatedPreview: await translateText(pub.preview),
        }))
      );
      setTranslated(results);
    };

    if (publications.length > 0) doTranslate();
  }, [publications, translateText]);

  return (
    <div className="flex-1 bg-gradient-to-br from-slate-50 to-blue-50/20 min-h-screen">
      <div className="text-center w-full px-5 py-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-AktivGrotesk-Bold text-gray-800">
              {translatedTitle}
            </h1>
          </div>
          <p className="text-xl font-AktivGrotesk-Regular text-gray-600 mb-8 leading-relaxed">
            {translatedDesc}
          </p>
          <div className="bg-blue-50/50 backdrop-blur-sm rounded-2xl p-6 border border-blue-100">
            <p className="text-gray-700 font-AktivGrotesk-Regular  leading-relaxed">
              {translatedNote}
            </p>
          </div>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {translated.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              viewport={{ once: true, margin: "-50px" }}
              className="group"
            >
              <Link href={item.link} target="_blank" rel="noopener noreferrer" className="block">
                <div className="bg-white/80 backdrop-blur-sm font-AktivGrotesk-Regular rounded-2xl overflow-hidden border border-white/60 hover:border-blue-200/50 transition-all duration-500 hover:shadow-xl hover:shadow-blue-100/20 hover:-translate-y-1">
                  <div className="relative overflow-hidden">
                    <AspectRatio ratio={16 / 9}>
                      <Image
                        src={item.image}
                        alt={item.title}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                        width={1000}
                        height={1000}
                      />
                    </AspectRatio>
                    <div
                      className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-AktivGrotesk-Regular border ${getCategoryColor(item.category)}`}
                    >
                      {item.category}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold capitalize text-gray-800 mb-3 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                      {item.translatedTitle || item.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{item.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{item.read_duration} {translatedMinute}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        <span>{item.author}</span>
                      </div>
                    </div>
                    <p className="text-gray-600 leading-relaxed mb-4 line-clamp-3">
                      {item.translatedPreview || item.preview}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-2 text-blue-600 font-medium group-hover:gap-3 transition-all duration-300">
                        <span>{bacaSelengkapnya}</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default OurPublication;
