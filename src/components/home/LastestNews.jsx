"use client";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { fetchAllNews } from "@/utils/fetch/fecthDatabase";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CaretRightIcon } from "@phosphor-icons/react/dist/ssr";
import { motion } from "framer-motion";
import { useAutoTranslate } from "../translate/useAutoTranslate";
import { useTranslation } from "../translate/TranslationContext";

const LastestNews = () => {
  const [news, setNews] = useState([]);
  const [translatedNews, setTranslatedNews] = useState([]);
  const { translateText } = useTranslation();

  // Static translations menggunakan useAutoTranslate (aman karena di level teratas)
  const translatedBeritaTerkini = useAutoTranslate("Berita Terkini");
  const translatedBeritaSelengkapnya = useAutoTranslate("Berita Selengkapnya");
  const translatedTidakAdaGambar = useAutoTranslate("Tidak ada gambar");

  useEffect(() => {
    const loadData = async () => {
      const result = await fetchAllNews();

      const nonHighlightNews = result
        .filter(
          (item) =>
            !item.isHighlight &&
            item.content?.some((c) => c.type === "file" && c.value)
        )
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 3);

      setNews(nonHighlightNews);
    };

    loadData();
  }, []);

  useEffect(() => {
    const translateContent = async () => {
      if (news.length > 0) {
        const newsWithTranslatedContent = await Promise.all(
          news.map(async (item) => {
            return {
              ...item,
              translatedTitle: await translateText(item.title),
              translatedDescription: await translateText(item.desc),
            };
          })
        );
        setTranslatedNews(newsWithTranslatedContent);
      }
    };

    translateContent();
  }, [news, translateText]);

  return (
    <div className="flex flex-col justify-center lg:py-10 py-2 mt-20">
      <div className="flex justify-between items-center lg:mx-8 mx-4 font-WhitneyBold">
        <h2 className="lg:text-3xl capitalize text-xl">
          {translatedBeritaTerkini}
        </h2>
        <Link
          href="/berita"
          className="flex text-xxs lg:text-base font-AktivGrotesk-Medium items-center gap-1 hover:gap-4 transition-all duration-200"
        >
          {translatedBeritaSelengkapnya}
          <CaretRightIcon size={20} className="mb-0.5 lg:mb-0" />
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:px-8 px-4 mt-6">
        {translatedNews.map((item, index) => {
          const firstImage = item.content.find((c) => c.type === "file")?.value;
          const description =
            item.content
              .filter((c) => c.type === "text")
              .map((c) => c.value)
              .join(" ")
              .slice(0, 150) + "...";

          const date = new Date(item.date);
          const formattedDate = date.toLocaleDateString("id-ID", {
            month: "long",
            year: "numeric",
          });

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <Card className="h-full border-none shadow-none bg-transparent">
                <CardContent className="flex flex-col p-0 gap-3">
                  <Link
                    href={`/berita/${item.id}`}
                    className="font-AktivGrotesk-Regular text-sm flex flex-col gap-3"
                  >
                    <AspectRatio ratio={4 / 3} className="w-full">
                      {firstImage ? (
                        <Image
                          src={firstImage}
                          width={400}
                          height={300}
                          className="w-full h-full object-cover"
                          alt={item.title}
                        />
                      ) : (
                        <div className="bg-zinc-200 w-full h-full flex items-center justify-center text-xs text-zinc-500">
                          {translatedTidakAdaGambar}
                        </div>
                      )}
                    </AspectRatio>
                    <div className="px-1 flex flex-col gap-1">
                      <span className="text-xs text-muted-foreground">
                        {formattedDate}
                      </span>
                      <h2 className="font-AktivGrotesk-Bold text-blue-ylbkd text-base sm:text-lg">
                        {item.translatedTitle || item.title}
                      </h2>
                      <p className="tracking-tight text-xs sm:text-sm">
                        {item.translatedDescription || item.desc}
                      </p>
                    </div>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default LastestNews;
