"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchProjectsById } from "@/utils/fetch/fecthDatabase";
import { SpinnerIcon } from "@phosphor-icons/react/dist/ssr";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useAutoTranslate } from "../translate/useAutoTranslate";
import { useTranslation } from "../translate/TranslationContext";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [translatedProject, setTranslatedProject] = useState(null);
  const [loading, setLoading] = useState(true);

  const { translateText } = useTranslation();

  const translatedNotFound = useAutoTranslate("Proyek tidak ditemukan.");
  const translatedNoImage = useAutoTranslate("Gambar tidak tersedia");
  const translatedStatusLabel = useAutoTranslate("Status Projek");
  const translatedLocationLabel = useAutoTranslate("Lokasi Proyek");
  const translatedOtherPhotos = useAutoTranslate("Foto Lainnya");

  const LeafletMap = dynamic(() => import("./LeafletMap"), {
    ssr: false,
  });

  useEffect(() => {
    const loadProject = async () => {
      try {
        const result = await fetchProjectsById(id);
        if (result) {
          const translatedTitle = await translateText(result.title);
          const translatedDesc = await translateText(result.desc);
          const translatedStatus = await translateText(result.status);
          const translatedContent = await Promise.all(
            (result.additional_photos || []).map(async (item) => {
              if (item.type === "copyright") {
                return {
                  ...item,
                  value: await translateText(item.value),
                };
              }
              return item;
            })
          );
          setProject(result);
          setTranslatedProject({
            ...result,
            translatedTitle,
            translatedDesc,
            translatedStatus,
            content: translatedContent,
          });
        }
      } catch (err) {
        console.error("Error fetching project:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) loadProject();
  }, [id, translateText]);

  if (loading)
    return (
      <div className="h-[80vh] flex justify-center items-center text-muted-foreground text-sm">
        <SpinnerIcon className="animate-spin" size={42} />
      </div>
    );

  if (!project)
    return (
      <div className="text-center py-20 text-sm text-muted-foreground">
        {translatedNotFound}
      </div>
    );

  let lat = null;
  let lng = null;
  if (project.geohex) {
    const [latStr, lngStr] = project.geohex.split(",");
    lat = parseFloat(latStr);
    lng = parseFloat(lngStr);
  }

  return (
    <div className="px-4 lg:px-14 w-full py-10 mb-12 text-[#1a1a1a]">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-3xl lg:text-5xl font-AktivGrotesk-Bold tracking-tight mb-6"
      >
        {translatedProject?.translatedTitle || project.title}
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full relative aspect-[16/9] mb-4 rounded-lg overflow-hidden"
      >
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex justify-center items-center text-gray-500">
            {translatedNoImage}
          </div>
        )}
      </motion.div>

      {project.caption && (
        <p className="text-muted-foreground text-sm italic mb-6">
          {project.caption}
        </p>
      )}

      <motion.p
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-lg leading-relaxed mb-10 whitespace-pre-line text-justify"
      >
        {translatedProject?.translatedDesc || project.desc}
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-lg leading-relaxed mb-10 text-muted-foreground font-AktivGrotesk-Medium"
      >
        {translatedStatusLabel}:{" "}
        {translatedProject?.translatedStatus || project.status}
      </motion.p>

      {lat && lng && (
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mt-10"
        >
          <h2 className="text-xl mb-4 font-AktivGrotesk-Bold">
            {translatedLocationLabel}
          </h2>
          <LeafletMap latitude={lat} longitude={lng} zoom={12} />
        </motion.div>
      )}

      {translatedProject?.content?.length > 0 && (
        <>
          <motion.p
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-xl leading-relaxed mt-10 mb-10 font-AktivGrotesk-Bold"
          >
            {translatedOtherPhotos}
          </motion.p>

          <motion.div className="space-y-6">
            {translatedProject.content.map((item, index) => {
              if (item.type === "copyright") {
                return (
                  <p
                    key={item.id || index}
                    className="text-xl font-AktivGrotesk-Bold text-blue-ylbkd"
                  >
                    {item.value}
                  </p>
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
                    {item.caption && (
                      <p className="text-muted-foreground mt-2 text-sm italic">
                        {item.caption}
                      </p>
                    )}
                  </div>
                );
              }

              if (item.type === "file" && !item.value) {
                return (
                  <div
                    key={item.id || index}
                    className="bg-zinc-200 w-full h-64 flex items-center justify-center text-xs text-zinc-500 rounded"
                  >
                    {translatedNoImage}
                  </div>
                );
              }

              return null;
            })}
          </motion.div>
        </>
      )}
    </div>
  );
};

export default ProjectDetail;
