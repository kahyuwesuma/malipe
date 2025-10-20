"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { fetchAllGallery } from "@/utils/fetch/fecthDatabase";
import { SpinnerIcon } from "@phosphor-icons/react/dist/ssr";

export default function GallerySection() {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadGallery() {
      const data = await fetchAllGallery();
      setGallery(data);
      setLoading(false);
    }
    loadGallery();
  }, []);

  if (loading) {
    return (
      <div className="flex gap-3 justify-center text-gray-500 text-base font-AktivGrotesk-Regular items-center h-[60vh]">
        <SpinnerIcon size={20} className="animate-spin"/>
        <p className="animate-pulse">Memuat galeri...</p>
      </div>
    );
  }

  if (!gallery.length) {
    return (
      <div className="flex justify-center items-center h-60">
        <p className="text-gray-500">Belum ada gambar di galeri.</p>
      </div>
    );
  }

  return (
    <section className="w-full py-20 px-4 md:px-8 lg:px-16">
      <h2 className="text-2xl font-AktivGrotesk-Medium md:text-3xl font-semibold text-center mb-10 text-gray-800">
        Galeri Kegiatan
      </h2>

      <div
        className="
          grid gap-4 
          grid-cols-2 
          sm:grid-cols-3 
          md:grid-cols-4 
          lg:grid-cols-4
        "
      >
        {gallery.map((item) => (
          <div
            key={item.id}
            className="
              relative aspect-square 
              overflow-hidden 
              rounded-xl 
              shadow-sm 
              hover:shadow-lg 
              transition 
              duration-300 
              group
            "
          >
            <Image
              src={item.image_url}
              alt="Foto galeri"
              fill
              className="
                object-cover 
                group-hover:scale-105 
                transition-transform 
                duration-300
              "
            />
            <div
              className="
                absolute inset-0 bg-black/0 
                group-hover:bg-black/20 
                transition
              "
            ></div>
          </div>
        ))}
      </div>
    </section>
  );
}
