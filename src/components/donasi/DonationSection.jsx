"use client";
import Image from "next/image";
import { Card, CardContent } from "../ui/card";
import { AspectRatio } from "../ui/aspect-ratio";
import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchAllDonations } from "@/utils/fetch/fecthDatabase";
import { SpinnerIcon } from "@phosphor-icons/react/dist/ssr";
import { motion } from "framer-motion";
import { useAutoTranslate } from "../translate/useAutoTranslate";
import { useTranslation } from "../translate/TranslationContext";

const DonationSection = () => {
  const [donations, setDonations] = useState([]);
  const [translatedDonations, setTranslatedDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usdValues, setUsdValues] = useState({}); // 🔑 simpan hasil konversi USD

  const { translateText } = useTranslation();

  const translatedDonasi = useAutoTranslate("Donasi");
  const translatedBelumAdaPaket = useAutoTranslate("Belum ada paket donasi");
  const translatedTidakAdaGambar = useAutoTranslate("Tidak ada gambar");
  const suffixMap = {
    acara: { idr: "/Acara", usd: "/Event" },
    minggu: { idr: "/Minggu", usd: "/Week" },
    patroli: { idr: "/Patroli", usd: "/Patrol" },
  };

  // 🔑 Load data donasi
  useEffect(() => {
    const loadData = async () => {
      const result = await fetchAllDonations();
      setDonations(result);
      setLoading(false);
    };
    loadData();
  }, []);

  // 🔑 Translate title + kategori
  useEffect(() => {
    const translateContent = async () => {
      if (donations.length > 0) {
        const translated = await Promise.all(
          donations.map(async (item) => {
            const translatedTitle = await translateText(item.title);
            const translatedCategory = await translateText(
              item.category || "Lainnya"
            );

            // mapping suffix IDR / USD
            let idrSuffix = "";
            if (item.category?.toLowerCase() === "acara") {
              idrSuffix = await translateText("/Acara");
            } else if (item.category?.toLowerCase() === "minggu") {
              idrSuffix = await translateText("/Pekan");
            } else if (item.category?.toLowerCase() === "patroli") {
              idrSuffix = await translateText("/Patroli");
            }

            return {
              ...item,
              translatedTitle,
              translatedCategory,
              translatedIdrSuffix: idrSuffix,
            };
          })
        );
        setTranslatedDonations(translated);
      }
    };
    translateContent();
  }, [donations, translateText]);

  // 🔑 Fetch konversi IDR → USD untuk setiap donasi
  useEffect(() => {
    const fetchUsdValues = async () => {
      const results = {};
      for (const item of donations) {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_CURRENCY_CONVERT}amount=${item.nominal}&from=IDR&to=USD`
          );
          const data = await res.json();
          if (data && data.rates && data.rates.USD) {
            results[item.id] = data.rates.USD;
          }
        } catch (err) {
          console.error("Gagal fetch USD:", err);
        }
      }
      setUsdValues(results);
    };

    if (donations.length > 0) {
      fetchUsdValues();
    }
  }, [donations]);

  if (loading)
    return (
      <div className="text-center h-[80vh] text-sm text-muted-foreground flex justify-center items-center">
        <SpinnerIcon className="animate-spin" size={42} />
      </div>
    );

  if (!loading && translatedDonations.length === 0)
    return (
      <div className="w-full lg:mb-28 mb-16 lg:my-10 my-3">
        <div className="absolute z-20 w-full lg:px-12 px-2">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="w-full max-w-[290px]"
          >
            <Card className="rounded-4xl lg:px-5">
              <CardContent className="lg:pt-7 pt-4 flex flex-col gap-10">
                <h1 className="text-3xl font-AktivGrotesk-Medium">
                  {translatedDonasi}
                </h1>
                <div className="flex justify-center items-center font-AktivGrotesk-Regular pb-52">
                  <span>{translatedBelumAdaPaket}</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    );

  return (
    <div className="w-full lg:mb-28 mb-16 lg:my-10 my-3">
      <div className="z-20 lg:px-10 px-4">
        <Card className="rounded-4xl lg:px-5 px-1">
          <CardContent className="lg:py-7 py-5 flex flex-col gap-5">
            <h1 className="text-3xl font-AktivGrotesk-Medium">
              {translatedDonasi}
            </h1>

            {/* Render all donations without category grouping */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {translatedDonations.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="w-full max-w-none mx-auto"
                >
                  <Link
                    href={item.payment_url}
                    target="_blank"
                    className="group block h-full"
                  >
                    <Card className="h-full py-0 border-0 shadow-none flex flex-col rounded-t-3xl rounded-b-none overflow-hidden transition-all duration-200 group-hover:scale-[1.02]">
                      {/* Image Container */}
                      <div className="relative">
                        <AspectRatio ratio={2 / 3}>
                          <div className="w-full h-full">
                            {item.image ? (
                              <Image
                                src={item.image}
                                width={1000}
                                height={1000}
                                className="w-full h-full object-cover"
                                alt={item.title}
                              />
                            ) : (
                              <div className="font-AktivGrotesk-Regular w-full h-full flex items-center justify-center text-xs text-zinc-500">
                                {translatedTidakAdaGambar}
                              </div>
                            )}
                          </div>
                        </AspectRatio>
                      </div>

                      {/* Content Container */}
                      <div className="flex flex-col justify-between">
                        <div className="flex flex-col gap-2">
                          <h3 className="font-AktivGrotesk-Medium text-lg leading-tight line-clamp-2 text-gray-900">
                            {item.translatedTitle || item.title}
                          </h3>

                          <div className="flex flex-col gap-1.5">
                            <span className="font-AktivGrotesk-Bold text-lg capitalize text-gray-900">
                              IDR {item.nominal.toLocaleString("id-ID")}
                              {item.translatedIdrSuffix}
                            </span>
                            <span className="font-AktivGrotesk-Regular text-sm text-gray-500">
                              USD $
                              {usdValues[item.id]
                                ? `${usdValues[item.id].toFixed(2)}${
                                    item.category?.toLowerCase() === "acara"
                                      ? "/Event"
                                      : item.category?.toLowerCase() ===
                                        "minggu"
                                      ? "/Week"
                                      : item.category?.toLowerCase() ===
                                        "patroli"
                                      ? "/Patrol"
                                      : ""
                                  }`
                                : ""}
                            </span>
                          </div>
                        </div>

                        {/* Optional: Add a call-to-action indicator */}
                        <div className="mt-4 pt-3">
                          <span className="text-xs text-muted-foreground/70 font-AktivGrotesk-Regular flex items-center gap-1">
                            Klik untuk donasi
                            <svg
                              className="w-3 h-3 transform group-hover:translate-x-1 transition-transform duration-300"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DonationSection;
