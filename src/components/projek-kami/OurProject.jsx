"use client";
import Image from "next/image";
import Link from "next/link";
import { AspectRatio } from "../ui/aspect-ratio";
import { fetchAllProjects } from "@/utils/fetch/fecthDatabase";
import { useEffect, useState } from "react";
import { SpinnerIcon } from "@phosphor-icons/react/dist/ssr";
import dynamic from "next/dynamic";
import { Button } from "../ui/button";
import { motion } from "framer-motion";
import { useTranslation } from "../translate/TranslationContext";
import { useAutoTranslate } from "../translate/useAutoTranslate";

const OurProject = () => {
  const [projects, setProjects] = useState([]);
  const [translatedProjects, setTranslatedProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const LeafletMap = dynamic(() => import("./LeafletMap"), {
    ssr: false,
  });

  const { translateText } = useTranslation();

  // Text statis diterjemahkan langsung
  const translatedHeading = useAutoTranslate(
    "Kami mencari solusi untuk menghadapi tantangan terbesar yang dihadapi alam dan manusia saat ini"
  );
  const translatedSubHeading = useAutoTranslate(
    "Dalam upaya menjaga keberlanjutan ekosistem pesisir dan laut di wilayah Kepulauan Derawan dan sekitarnya, berbagai langkah strategis telah diambil melalui program-program konservasi yang terfokus dan kolaboratif."
  );
  const translatedNoProject = useAutoTranslate("Belum ada projek.");
  const translatedStatuses = [
    useAutoTranslate("Masih Berlangsung"),
    useAutoTranslate("Sedang Dinilai"),
    useAutoTranslate("Sudah Selesai"),
  ];
  const translatedReadMore = useAutoTranslate("Selengkapnya");
  const translatedNoImage = useAutoTranslate("Gambar tidak tersedia");

  useEffect(() => {
    const loadData = async () => {
      const result = await fetchAllProjects();

      // Terjemahkan konten dinamis
      const translatedData = await Promise.all(
        result.map(async (item) => ({
          ...item,
          title: item.title,
          desc: await translateText(item.desc),
        }))
      );

      setProjects(result);
      setTranslatedProjects(translatedData);
      setLoading(false);
    };

    loadData();
  }, [translateText]);

  if (loading)
    return (
      <div className="text-center h-[70vh] text-sm text-muted-foreground flex justify-center items-center">
        <SpinnerIcon className="animate-spin" size={42} />
      </div>
    );

  if (!loading && projects.length === 0)
    return (
      <div className="text-center py-20 text-sm text-muted-foreground">
        {translatedNoProject}
      </div>
    );

  return (
    <div>
      <div className="text-[#3c3c3c] text-center w-full lg:px-12 px-4 lg:py-5">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl font-semibold py-10"
        >
          {translatedHeading}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="font-AktivGrotesk-Regular text-lg"
        >
          {translatedSubHeading}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="pt-10 pb-5"
        >
          <LeafletMap projects={projects} />
        </motion.div>
      </div>

      <div className="lg:my-1 my-5 w-full px-5 lg:px-12">
        <div className="flex flex-col gap-5">
          {["Masih Berlangsung", "Sedang Dinilai", "Sudah Selesai"].map(
            (status, idx) => {
              const filteredProjects = translatedProjects.filter(
                (item) => item.status === status
              );

              if (filteredProjects.length === 0) return null;

              return (
                <div key={status} className="mb-10">
                  <h2 className="text-2xl font-AktivGrotesk-Medium mb-4">
                    {translatedStatuses[idx]}
                  </h2>

                  <div className="flex flex-col gap-5">
                    {filteredProjects.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                      >
                        <Link
                          href={`/projek-kami/${item.id}`}
                          className="group font-AktivGrotesk-Regular shadow-sm p-6 border flex flex-col md:flex-row items-start gap-5 hover:bg-zinc-100 rounded-lg transition"
                        >
                          <div className="w-full md:w-[35%]">
                            <AspectRatio ratio={4 / 3}>
                              {item.image ? (
                                <Image
                                  src={item.image}
                                  alt={item.title}
                                  width={800}
                                  height={800}
                                  className="w-full rounded h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 lg:text-xs text-xxs">
                                  {translatedNoImage}
                                </div>
                              )}
                            </AspectRatio>
                          </div>

                          <div className="w-full md:w-[65%]">
                            <h3 className="text-xl font-bold text-[#1a1a1a] mb-2 group-hover:text-blue-800 transition">
                              {item.title}
                            </h3>
                            <p className="text-sm md:text-base text-[#3c3c3c] leading-relaxed">
                              {item.desc.length > 100
                                ? item.desc.split(" ").slice(0, 15).join(" ") +
                                  "..."
                                : item.desc}
                            </p>
                            <Button className="lg:mt-5 mt-7 rounded bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 cursor-pointer">
                              {translatedReadMore}
                            </Button>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>
              );
            }
          )}
        </div>
      </div>
    </div>
  );
};

export default OurProject;
