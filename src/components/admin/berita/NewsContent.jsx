"use client";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { fetchAllNews } from "@/utils/fetch/fecthDatabase";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const NewsContent = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const result = await fetchAllNews();

      const sortedResult = result.sort((a, b) => {
        return new Date(b.date) - new Date(a.date); 
      });

      setNews(sortedResult);
      setLoading(false);
    };

    loadData();
  }, []);

  if (loading) return <p className="text-center my-10">Memuat berita...</p>;
  if (news.length === 0)
    return <p className="text-center my-10">Tidak ada data berita.</p>;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-0 gap-15">
      {news.map((item, index) => {
        const firstImage = item.content.find((c) => c.type === "file")?.value;

        const caption =
          item.content
            .find((c) => c.type === "file")?.caption;

        const date = new Date(item.date);
        const formattedDate = date.toLocaleDateString("id-ID", {
          month: "long",
          year: "numeric",
        });

        return (
          <Link
            href={`/admin/berita/edit/${item.id}`}
            key={index}
            className="font-AktivGrotesk-Regular hover:bg-zinc-100 lg:p-5 p-1 text-sm flex flex-col gap-2"
          >
            {firstImage ? (
              <AspectRatio ratio={4 / 3}>
                <Image
                  src={firstImage}
                  width={200}
                  height={200}
                  className="w-full h-full object-cover"
                  alt={item.title || "Berita"}
                />
              </AspectRatio>
            ) : (
              <AspectRatio
                ratio={4 / 3}
                className="bg-gray-200 w-full h-full flex items-center justify-center text-gray-500 text-sm"
              >
                Tidak ada gambar
              </AspectRatio>
            )}
            <p className="text-muted-foreground text-xs">{caption?caption:"Belum ada caption"}</p>
            <span className="text-xs tracking-wide">{formattedDate}</span>
            <h2 className="font-AktivGrotesk-Bold tracking-tighter text-blue-ylbkd text-lg">
              {item.title}
            </h2>
          </Link>
        );
      })}
    </div>
  );
};

export default NewsContent;