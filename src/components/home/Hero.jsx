"use client";
import Image from "next/image";
import hero1 from "@/asset/home/hero1.jpg";
import hero2 from "@/asset/home/hero2.webp";
import hero3 from "@/asset/home/hero2.jpg";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";

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
      caption: "© IPB | 2024",
    },
    {
      image: hero2,
      caption: "© IPB | 2024",
    },
    {
      image: hero3,
      caption: "© YLBKD | 2025",
    },
  ];

  return (
    <div className="">
      <Carousel
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <CarouselContent className="lg:h-[88.4vh] h-[50vh] flex">
            {slide.map((item, index) => (
              <CarouselItem
                key={index}
                className="relative flex items-center h-full"
              >
                <Image
                  src={item.image}
                  alt={`slide-${index}`}
                  width={1500}
                  className="w-full h-full object-cover"
                />
                <div className="absolute text-white z-10">
                  <div className="mx-6 lg:mx-28 mt-6 lg:mt-10 w-[80vw] lg:w-[50vw] flex flex-col items-start lg:gap-8 gap-2">
                    <p className="text-xl lg:text-5xl whitespace-pre-line font-AktivGrotesk-Bold">
                      {useAutoTranslate(item.title)}
                    </p>
                  </div>
                </div>
                <p className="text-muted absolute font-WhitneyLight text-xxs lg:text-xs mx-6 lg:mx-28 mt-6 lg:mt-10 w-[80vw] lg:w-[50vw] flex flex-col items-start lg:gap-8 gap-2 bottom-5">
                  {useAutoTranslate(item.caption)}
                </p>
              </CarouselItem>
            ))}
          </CarouselContent>
        </motion.div>
        <CarouselPrevious className="cursor-pointer left-2 lg:left-10 opacity-75 scale-60 lg:scale-100 " />
        <CarouselNext className="cursor-pointer right-2 lg:right-10 opacity-75 scale-60 lg:scale-100 " />
      </Carousel>
    </div>
  );
};
export default Hero;
