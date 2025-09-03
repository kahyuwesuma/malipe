"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { fetchAllProjects } from "@/utils/fetch/fecthDatabase";

const ProjectContent = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const result = await fetchAllProjects();
      setProjects(result);
      setLoading(false);
    };

    loadData();
  }, []);

  if (loading) return <p className="text-center my-10">Memuat projek...</p>;
  if (projects.length === 0)
    return <p className="text-center my-10">Tidak ada data projek.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-15 px-1">
      {projects.map((item, index) => (
        <Link
          href={`/admin/projek-kami/edit/${item.id}`}
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
            {item.desc.length > 100
              ? item.desc.split(" ").slice(0, 15).join(" ") + "..."
              : item.desc}
          </p>
        </Link>
      ))}
    </div>
  );
};

export default ProjectContent;
