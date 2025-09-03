"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchNewsById } from "@/utils/fetch/fecthDatabase";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { SpinnerIcon } from "@phosphor-icons/react/dist/ssr";
import { useAutoTranslate } from "@/components/translate/useAutoTranslate";
import { useTranslation } from "@/components/translate/TranslationContext";

const BeritaDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [translatedData, setTranslatedData] = useState(null);

  const { translateText } = useTranslation();

  // Static translation (kalau mau tambahkan teks lain)
  const translatedTidakAdaGambar = useAutoTranslate("Tidak ada gambar");

  useEffect(() => {
    const loadBerita = async () => {
      const result = await fetchNewsById(id);

      // Format tanggal (bulan & tahun)
      const formattedDate = new Date(result.date).toLocaleDateString("id-ID", {
        month: "long",
        year: "numeric",
      });

      // Terjemahkan semua bagian
      const translatedTitle = await translateText(result.title);
      const translatedDate = await translateText(formattedDate);

      // Terjemahkan setiap konten
      const translatedContent = await Promise.all(
        result.content.map(async (item) => {
          if (item.type === "subtitle" || item.type === "text") {
            return {
              ...item,
              value: await translateText(item.value),
            };
          }
          return item; // file tidak diterjemahkan
        })
      );

      setData(result);
      setTranslatedData({
        ...result,
        translatedTitle,
        translatedDate,
        content: translatedContent,
      });
    };

    if (id) loadBerita();
  }, [id, translateText]);

  if (!data || !translatedData)
    return (
      <div className="text-center h-screen text-sm text-muted-foreground flex justify-center items-center">
        <SpinnerIcon className="animate-spin" size={42} />
      </div>
    );

  return (
    <div className="max-w-5xl lg:mx-0 mb-20 px-4 py-10 font-AktivGrotesk-Regular">
      <h1 className="text-3xl font-AktivGrotesk-Bold">
        {translatedData.translatedTitle || data.title}
      </h1>
      <p className="text-sm text-gray-500">
        {translatedData.translatedDate}
      </p>

      <div className="space-y-6 mt-6">
        {translatedData.content?.map((item, index) => {
          if (item.type === "subtitle") {
            return (
              <h2
                key={item.id || index}
                className="text-xl font-AktivGrotesk-Bold text-blue-ylbkd"
              >
                {item.value}
              </h2>
            );
          }

          if (item.type === "text") {
            return (
              <p
                key={item.id || index}
                className="text-base leading-relaxed text-justify"
              >
                {item.value}
              </p>
            );
          }

          if (item.type === "link") {
            const isYouTube =
              item.value.includes("youtube.com") || item.value.includes("youtu.be");
          
            if (isYouTube) {
              // Ekstrak video ID dari link YouTube
              const videoIdMatch = item.value.match(
                /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
              );
              const videoId = videoIdMatch ? videoIdMatch[1] : null;
          
              if (videoId) {
                return (
                  <div key={item.id || index} className="w-full aspect-video rounded overflow-hidden">
                    <iframe
                      src={`https://www.youtube.com/embed/${videoId}`}
                      title={`YouTube Video ${index + 1}`}
                      className="w-full h-full"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                );
              }
            }
          
            // Jika bukan YouTube, tampilkan sebagai tautan biasa
            return (
              <div key={item.id || index}>
                <a
                  href={item.value}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline break-all"
                >
                  {item.value}
                </a>
              </div>
            );
          }

          if (item.type === "file" && item.value) {
            return (
              <div key={item.id || index} className="space-y-1">
                <AspectRatio ratio={16 / 9}>
                  <Image
                    fill
                    src={item.value}
                    alt={item.caption || `gambar-${index}`}
                    className="rounded-md object-cover"
                  />
                </AspectRatio>
                <p className="text-muted-foreground mt-2 text-sm italic">
                  {item.caption || ""}
                </p>
              </div>
            );
          }

          if (item.type === "file" && !item.value) {
            return (
              <div
                key={item.id || index}
                className="bg-zinc-200 w-full h-64 flex items-center justify-center text-xs text-zinc-500 rounded"
              >
                {translatedTidakAdaGambar}
              </div>
            );
          }

          return null;
        })}
      </div>
    </div>
  );
};

export default BeritaDetail;
