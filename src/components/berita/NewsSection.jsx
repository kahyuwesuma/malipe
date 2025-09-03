"use client";
import Image from "next/image";
import { AspectRatio } from "../ui/aspect-ratio";
import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchAllNews } from "@/utils/fetch/fecthDatabase";
import { SpinnerIcon } from "@phosphor-icons/react/dist/ssr";
import { motion } from "framer-motion";
import { useAutoTranslate } from "../translate/useAutoTranslate";
import { useTranslation } from "../translate/TranslationContext";

const NewsSection = () => {
  const [news, setNews] = useState([]);
  const [translatedNews, setTranslatedNews] = useState([]);
  const [loading, setLoading] = useState(true);

  const { translateText, language } = useTranslation();

  const translatedBelumAdaBerita = useAutoTranslate("Belum ada berita.");
  const translatedTidakAdaGambar = useAutoTranslate("Tidak ada gambar");

  useEffect(() => {
    const loadData = async () => {
      const result = await fetchAllNews();

      const nonHighlightNews = result
        .filter((item) => item.isHighlight === false)
        .sort((a, b) => new Date(b.date) - new Date(a.date));

      setNews(nonHighlightNews);
      setLoading(false);
    };

    loadData();
  }, []);

  useEffect(() => {
    const translateContent = async () => {
      if (news.length > 0) {
        const translated = await Promise.all(
          news.map(async (item) => {
            const date = new Date(item.date);
            const formattedDate = date.toLocaleDateString("id-ID", {
              month: "long",
              year: "numeric",
            });

            return {
              ...item,
              translatedTitle: await translateText(item.title),
              translatedDescription: await translateText(item.desc),
              translatedDate: await translateText(formattedDate),
            };
          })
        );
        setTranslatedNews(translated);
      }
    };
    translateContent();
  }, [news, language]);

  if (loading || (news.length > 0 && translatedNews.length === 0)) {
    return (
      <div className="text-center h-[60vh] text-sm text-muted-foreground flex justify-center items-center">
        <SpinnerIcon className="animate-spin" size={42} />
      </div>
    );
  }

  if (!loading && news.length === 0) {
    return (
      <div className="text-center py-20 text-sm text-muted-foreground">
        {translatedBelumAdaBerita}
      </div>
    );
  }

  return (
    <div className="px-4 md:px-8 lg:px-12 max-w-screen-xl mx-auto mb-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {translatedNews.map((item, index) => {
          const firstImage = item.content.find((c) => c.type === "file")?.value;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <Link
                href={`/berita/${item.id}`}
                className="font-AktivGrotesk-Regular hover:bg-zinc-100 rounded-md p-4 text-sm flex flex-col gap-3 transition-colors"
              >
                <AspectRatio ratio={4 / 3}>
                  {firstImage ? (
                    <Image
                      src={firstImage}
                      width={200}
                      height={200}
                      className="w-full h-full object-cover rounded"
                      alt={item.title}
                    />
                  ) : (
                    <div className="bg-zinc-200 w-full h-full flex items-center justify-center text-xs text-zinc-500 rounded">
                      {translatedTidakAdaGambar}
                    </div>
                  )}
                </AspectRatio>

                <span className="text-sm tracking-wide">
                  {item.translatedDate}
                </span>
                <h2 className="font-AktivGrotesk-Bold tracking-tighter text-blue-ylbkd text-lg sm:text-xl">
                  {item.translatedTitle || item.title}
                </h2>
                <p className="tracking-tight text-sm sm:text-base">
                  {item.translatedDescription || item.desc}
                </p>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default NewsSection;
