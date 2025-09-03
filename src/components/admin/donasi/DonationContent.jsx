"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { fetchAllDonations } from "@/utils/fetch/fecthDatabase";

const DonationContent = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const result = await fetchAllDonations();
      setDonations(result);
      setLoading(false);
    };

    loadData();
  }, []);

  if (loading) return <p className="text-center my-10">Memuat donasi...</p>;
  if (donations.length === 0)
    return <p className="text-center my-10">Tidak ada data donasi.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-15 px-1">
      {donations.map((item, index) => (
        <Link
          href={`/admin/donasi/edit/${item.id}`}
          key={item.id || index}
          className="flex flex-col font-AktivGrotesk-Regular hover:bg-zinc-100 p-4 rounded transition"
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
          <p className="text-muted-foreground text-xs mt-1">
            {item.caption ? item.caption : "Belum ada caption"}
          </p>
          <h2 className="font-AktivGrotesk-Bold text-xl mt-2 text-blue-ylbkd tracking-tight">
            {item.title}
          </h2>
          <p className="text-xs tracking-tight text-muted-foreground mb-2">{item.category}</p>
          <p className="text-base tracking-wide">IDR {item.nominal}</p>
          <p className="text-xs text-muted-foreground">{item.desc}</p>
        </Link>
      ))}
    </div>
  );
};

export default DonationContent;
