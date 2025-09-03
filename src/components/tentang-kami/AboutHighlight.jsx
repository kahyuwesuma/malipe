"use client";

import { AspectRatio } from "../ui/aspect-ratio";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import Image from "next/image";
import { Card, CardContent } from "../ui/card";
import Link from "next/link";
import TeamData from "./TeamData";
import { Users, Award, ArrowRight } from "lucide-react";
import { useAutoTranslate } from "../translate/useAutoTranslate";

const AboutHighlight = () => {
  const about = TeamData.slice(0, 5);
  const advisors = TeamData.slice(5);

  const TeamCard = ({ item }) => (
    <Card className="group h-full p-0 bg-white border-0 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden hover:-translate-y-2 rounded-xl">
      <div className="h-full flex flex-col">
        <div className="relative overflow-hidden rounded-t-xl">
          <AspectRatio ratio={3 / 4} className="w-full">
            <Link href={`/tentang-kami/${item.slug}`}>
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover w-full h-full transform transition-all duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 flex items-center justify-center gap-2 text-sm font-medium text-gray-800 font-AktivGrotesk-Regular">
                  <span>{useAutoTranslate("Lihat Profil")}</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          </AspectRatio>
        </div>
        <div className="p-4 flex-1 flex flex-col justify-between">
          <div>
            <Link href={`/tentang-kami/${item.slug}`}>
              <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2 mb-2 font-AktivGrotesk-Regular">
              {useAutoTranslate(item.title)}
              </h3>
            </Link>
            <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed font-AktivGrotesk-Regular">
              {useAutoTranslate(item.desc)}
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-500" />
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide font-AktivGrotesk-Regular">
                {useAutoTranslate("Tim Inti")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );

  const AdvisorCard = ({ item }) => (
    <Card className="group h-full p-0 bg-white border-0 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden hover:-translate-y-2 rounded-xl">
      <CardContent className="p-0 h-full flex flex-col">
        <div className="relative overflow-hidden">
          <AspectRatio ratio={16 / 10} className="w-full">
            <Link href={`/tentang-kami/${item.slug}`}>
              <Image
                src={item.image}
                alt={item.title}
                className="object-cover w-full h-full transform transition-all duration-500 group-hover:scale-110 scale-110"
                width={640}
                height={400}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 flex items-center justify-center gap-2 text-sm font-medium text-gray-800 font-AktivGrotesk-Regular">
                  <span>{useAutoTranslate("Lihat Profil")}</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          </AspectRatio>
        </div>
        <div className="p-4 flex-1 flex flex-col justify-between">
          <div>
            <Link href={`/tentang-kami/${item.slug}`}>
              <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2 mb-2 font-AktivGrotesk-Regular">
                {item.title}
              </h3>
            </Link>
            <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed font-AktivGrotesk-Regular">
              {item.desc}
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-500" />
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide font-AktivGrotesk-Regular">
                {useAutoTranslate("Penasihat")}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const SectionHeader = ({ title, icon: Icon }) => (
    <div className="text-center mb-12">
      <div className="flex items-center justify-center gap-3 mb-4">
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
          <Icon className="w-6 h-6 text-blue-600" />
        </div>
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 font-AktivGrotesk-Regular">
          {useAutoTranslate(title)}
        </h2>
      </div>
    </div>
  );

  return (
    <div className="py-16 lg:py-24 bg-gradient-to-br from-blue-50/50 to-green-50/50">
      <div className="sm:px-6 lg:px-8">
        <section className="mb-20">
          <SectionHeader title="Tim Kami" icon={Users} />
          <div className="hidden lg:grid lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-8">
            {about.map((item, idx) => (
              <div key={idx} className="">
                <TeamCard item={item} />
              </div>
            ))}
          </div>
          <div className="lg:hidden">
            <Carousel className="w-screen px-6 sm:max-w-2xl mx-auto">
              <CarouselContent className="flex items-stretch">
                {about.map((item, idx) => (
                  <CarouselItem key={idx} className="mb-10">
                    <TeamCard item={item} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-5" />
              <CarouselNext className="right-5" />
            </Carousel>
          </div>
        </section>

        <section>
          <SectionHeader title="Dewan Penasihat" icon={Award} />
          <div className="">
            <div className="flex flex-col lg:flex-row px-4 lg:px-0 justify-center gap-4 lg:gap-8 max-w-6xl">
              {advisors.map((item, idx) => (
                <div key={idx} className="w-full max-w-sm">
                  <AdvisorCard item={item} />
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutHighlight;
