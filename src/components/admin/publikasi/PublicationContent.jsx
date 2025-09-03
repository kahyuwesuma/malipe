"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { fetchAllPublications } from "@/utils/fetch/fecthDatabase";

const PublicationContent = () => {
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const result = await fetchAllPublications();
      setPublications(result);
      setLoading(false);
    };

    loadData();
  }, []);

  if (loading) return <p className="text-center my-10">Memuat publikasi...</p>;
  if (publications.length === 0)
    return <p className="text-center my-10">Tidak ada data publikasi.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-1">
      {publications.map((item, index) => (
        <Link
          href={`/admin/publikasi/edit/${item.id}`}
          key={item.id || index}
          className="flex flex-col gap-3 font-AktivGrotesk-Regular hover:bg-zinc-100 p-4 rounded transition"
        >
          <AspectRatio ratio={4 / 3} className="rounded overflow-hidden">
            {item.image ? (
              <Image
                src={item.image}
                alt={item.title}
                width={800}
                height={800}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
                Gambar tidak tersedia
              </div>
            )}
          </AspectRatio>

          {item.caption && (
            <p className="text-muted-foreground text-xs italic">
              {item.caption}
            </p>
          )}

          <h2 className="font-AktivGrotesk-Bold text-lg text-blue-ylbkd tracking-tight">
            {item.title}
          </h2>

          <p className="text-sm text-gray-700">
            {item.preview?.length > 100
              ? item.preview.split(" ").slice(0, 15).join(" ") + "..."
              : item.preview}
          </p>

          <div className="flex justify-between items-center text-xs text-muted-foreground mt-1">
            <span>{item.date}</span>
            <span>{item.read_duration} min read</span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default PublicationContent;
