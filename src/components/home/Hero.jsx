"use client";
import Image from "next/image";
import hero1 from "@/asset/home/hero1.jpg";
import hero2 from "@/asset/home/hero2.webp";
import hero3 from "@/asset/home/hero2.jpg";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";
import Link from "next/link";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useAutoTranslate } from "../translate/useAutoTranslate";

const Hero = () => {
  const slide = [
    {
      image: hero1,
      title: "Menjaga Pulau Balembangan",
      subtitle: "Konservasi berbasis masyarakat untuk keberlanjutan ekosistem laut",
      caption: "© MALIPE | 2025",
    },
    {
      image: hero2,
      title: "Ekowisata untuk Semua",
      subtitle: "Mengenal alam sambil mendukung kesejahteraan lokal",
      caption: "© MALIPE | 2025",
    },
    {
      image: hero3,
      title: "Bersama Kita Bisa",
      subtitle: "Ayo bergabung melestarikan laut dan pesisir",
      caption: "© MALIPE | 2025",
    },
  ];

  return (
    <div className="relative">
      <Carousel
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
      >
        <CarouselContent className="lg:h-[88vh] h-[60vh] flex">
          {slide.map((item, index) => (
            <CarouselItem
              key={index}
              className="relative flex items-center h-full"
            >
              <Image
                src={item.image}
                alt={`slide-${index}`}
                width={1600}
                height={800}
                className="w-full font-AktivGrotesk-Regular h-full object-cover"
                priority={index === 0}
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40"></div>

              {/* Text content */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="absolute font-AktivGrotesk-Regular text-white z-10 px-6 lg:px-28"
              >
                <div className="max-w-2xl flex flex-col gap-4">
                  <h1 className="text-2xl lg:text-5xl font-AktivGrotesk-Bold drop-shadow-lg">
                    {useAutoTranslate(item.title)}
                  </h1>
                  <p className="text-sm lg:text-lg font-light drop-shadow-md">
                    {useAutoTranslate(item.subtitle)}
                  </p>
                  <div className="flex gap-4 mt-4">
                    <Link
                      href="/ekowisata"
                      className="bg-blue-ylbkd hover:bg-white text-white hover:text-blue-ylbkd border border-blue-ylbkd px-4 py-2 lg:px-6 lg:py-3 rounded-lg font-medium transition-colors duration-300"
                    >
                      {useAutoTranslate("Jelajahi Ekowisata")}
                    </Link>
                    <Link
                      href="https://paypal.me/Malipe2021"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white hover:bg-blue-ylbkd text-blue-ylbkd hover:text-white border border-blue-ylbkd px-4 py-2 lg:px-6 lg:py-3 rounded-lg font-medium transition-colors duration-300"
                    >
                      {useAutoTranslate("Donasi Sekarang")}
                    </Link>
                  </div>
                </div>
              </motion.div>

              {/* Caption */}
              <p className="absolute bottom-4 left-6 lg:left-28 text-xs lg:text-sm text-gray-200 font-light z-10">
                {useAutoTranslate(item.caption)}
              </p>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="cursor-pointer left-2 lg:left-10 opacity-75 scale-75 lg:scale-100" />
        <CarouselNext className="cursor-pointer right-2 lg:right-10 opacity-75 scale-75 lg:scale-100" />
      </Carousel>
    </div>
  );
};

export default Hero;
