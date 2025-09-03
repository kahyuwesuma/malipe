"use client";
import { Button } from "@/components/ui/button";
import { HandHeartIcon } from "@phosphor-icons/react/dist/ssr";
import donationCta from "@/asset/home/donationCta.jpg";
import Link from "next/link";
import Image from "next/image";
import { useAutoTranslate } from "../translate/useAutoTranslate";

const DonationCTA = () => {
  return (
    <div className="relative w-full mt-10 text-white font-WhitneyBook min-h-[22rem] sm:min-h-[28rem] lg:h-96">
      <Image
        src={donationCta}
        alt="donationCTA"
        fill
        className="object-cover w-full h-full"
        priority
      />

      <div className="absolute inset-0 bg-black/60 z-10" />

      <div className="absolute inset-0 z-20 flex items-center px-4 sm:px-10 lg:mx-20">
        <div className="flex flex-col gap-6 max-w-[700px]">
          <div>
            <h2 className="text-2xl capitalize sm:text-3xl lg:text-4xl font-bold mb-2">
              {useAutoTranslate("Dukung Konservasi Penyu Bersama Kami")}
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-white/90">
              {useAutoTranslate("Setiap donasi yang Anda berikan akan membantu program pelestarian alam, edukasi, dan aksi nyata di lapangan.")}
            </p>
          </div>
          <Link href="/donasi">
            <Button
              size="lg"
              className="bg-white cursor-pointer border border-white text-blue-ylbkd font-semibold hover:bg-blue-ylbkd hover:text-white"
            >
              <HandHeartIcon className="mr-1" size={24} />
              {useAutoTranslate("Donasi Sekarang")}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DonationCTA;
