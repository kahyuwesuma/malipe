"use client";
import Image from "next/image";
import { useRef } from "react";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import hero from "@/asset/publikasi/publicationHero.jpg";
import { useAutoTranslate } from "../translate/useAutoTranslate";

const Hero = () => {
  const scrollRef = useRef(null);

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
        <div className="absolute inset-0 bg-black/50 z-10" />
        <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-white text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl font-AktivGrotesk-Bold mb-4"
          >
            {useAutoTranslate("Publikasi Kami")}
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
            className="text-2xl font-AktivGrotesk-Medium"
          >
            {useAutoTranslate("Yayasan Laut Biru Kepulauan Derawan (YLBKD)")}
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
      <div ref={scrollRef}></div>
    </>
  );
};

export default Hero;
