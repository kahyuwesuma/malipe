"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useAutoTranslate } from "../translate/useAutoTranslate";
import Image from "next/image";
import hero from "@/asset/news/hero.jpg";

const Hero = () => {
  const [isClient, setIsClient] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleScroll = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
    <div className="relative w-screen h-screen">
    <Image
          src={hero}
          alt="Hero"
          fill
          className="object-cover h-full"
          priority
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50 z-10" />

        {/* Text Content */}
        <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-white text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-3xl md:text-5xl font-AktivGrotesk-Bold mb-4"
          >
            {useAutoTranslate("Berita")}
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
            className="text-lg md:text-2xl font-AktivGrotesk-Medium"
          >
            {useAutoTranslate("Kenali Kegiatan Kami")}
          </motion.h2>

          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            onClick={handleScroll}
            className="mt-10 w-12 h-12 border border-white rounded-full flex items-center justify-center hover:bg-white hover:text-black transition"
            aria-label="Scroll to content"
          >
            <ChevronDown className="w-6 h-6" />
          </motion.button>
        </div>
      </div>

      {/* Scroll target */}
      <div ref={scrollRef}></div>
    </>
  );
};

export default Hero;
