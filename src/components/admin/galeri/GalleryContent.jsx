"use client";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { fetchAllGallery } from "@/utils/fetch/fecthDatabase";
import { supabase } from "@/utils/supabaseClient";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { SpinnerIcon, TrashIcon } from "@phosphor-icons/react/dist/ssr";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const GalleryContent = () => {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingFetch, setLoadingFetch] = useState(true);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      const result = await fetchAllGallery();

      // urutkan berdasarkan created_at atau date
      const sortedResult = result.sort((a, b) => {
        return new Date(b.created_at) - new Date(a.created_at);
      });

      setGallery(sortedResult);
      setLoadingFetch(false);
    };

    loadData();
  }, []);

  const deleteImage = async (imageKey) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_UPLOADTHING}/deleteFiles`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-uploadthing-api-key": process.env.NEXT_PUBLIC_UPLOADTHING_TOKEN,
      },
      body: JSON.stringify({
        fileKeys: [imageKey],
      }),
    });
  };

  const handleSuccess = async () => {
    setSuccess(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(false);
    }, 2000);
  };

  // Hapus foto
  const handleDelete = async (id, imageUrl) => {
    setLoading(true);
    try {
      const fileKey = imageUrl.split("/f/")[1];

      if (fileKey) {
        await deleteImage(fileKey);
      }

      const { error } = await supabase.from("gallery").delete().eq("id", id);

      if (error) {
        console.error("Gagal menghapus foto di database:", error.message);
      } else {
        await handleSuccess();
        setTimeout(() => {
          setGallery((prev) => prev.filter((item) => item.id !== id));
        }, 1000);
      }
    } catch (err) {
      console.error("Error saat menghapus foto:", err);
    }
  };
  if (loadingFetch)
    return <p className="text-center my-10">Memuat Gambar...</p>;
  if (gallery.length === 0)
    return <p className="text-center my-10">Tidak ada foto.</p>;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {gallery.map((item) => {
        const date = new Date(item.created_at);
        const formattedDate = date.toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
        });

        return (
          <div
            key={item.id}
            className="font-AktivGrotesk-Regular border rounded p-2 flex flex-col gap-2"
          >
            {item.image_url ? (
              <AspectRatio ratio={4 / 3}>
                <Image
                  src={item.image_url}
                  width={400}
                  height={300}
                  className="w-full h-full object-cover rounded"
                  alt="Foto galeri"
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

            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">
                {formattedDate}
              </span>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    type="button"
                    className="cursor-pointer text-xs text-white bg-red-500 border border-red-500 hover:bg-transparent hover:text-red-500"
                  >
                    Hapus <TrashIcon size={20} />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md font-AktivGrotesk-Regular">
                  {loading ? (
                    success ? (
                      <div className="flex justify-center">
                        <DialogHeader className="animate-pulse font-AktivGrotesk-Medium text-sm">
                          Berhasil Dihapus
                        </DialogHeader>
                      </div>
                    ) : (
                      <div className="flex justify-center">
                        <SpinnerIcon
                          size={32}
                          className="animate-spin flex justify-center"
                        />
                      </div>
                    )
                  ) : (
                    <>
                      <DialogHeader>
                        <DialogTitle className="leading-normal">
                          Hapus Foto?
                        </DialogTitle>
                        <DialogDescription>
                          Anda akan menghapus foto ini secara permanen!
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid grid-cols-2 gap-2">
                        <DialogClose asChild>
                          <Button className="cursor-pointer bg-white border text-red-500 border-red-500 hover:bg-red-500 hover:text-white">
                            Batal
                          </Button>
                        </DialogClose>
                        <Button
                          onClick={() => handleDelete(item.id, item.image_url)}
                          className="cursor-pointer bg-white text-blue-ylbkd border border-blue-ylbkd hover:bg-blue-ylbkd hover:text-white"
                        >
                          Ya
                        </Button>
                      </div>
                    </>
                  )}
                </DialogContent>
              </Dialog>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default GalleryContent;
