"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabaseClient";
import { useRouter, useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { fetchPublicationsById } from "@/utils/fetch/fecthDatabase";
import { useUploadThing } from "@/utils/uploadthing";
import { SpinnerIcon, TrashIcon } from "@phosphor-icons/react/dist/ssr";
import ImageDropzone from "../../ImageDropzone";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import DatePicker from "../../DatePicker";
import { format } from "date-fns";

const PublicationEdit = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const [dataAwal, setDataAwal] = useState(null);
  const [image, setImage] = useState([]);
  const [image_caption, setImage_caption] = useState("");
  const [title, setTitle] = useState("");
  const [preview, setPreview] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [read_duration, setRead_duration] = useState("");
  const [author, setAuthor] = useState("");
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const { startUpload } = useUploadThing("imageUploader", {
    onClientUploadComplete: () => console.log("Gambar terupload"),
    onUploadProgress: () => console.log("Sedang mengunggah..."),
    onUploadError: (error) => console.error("Upload gagal:", error),
  });

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchPublicationsById(id);
      if (data) {
        setDataAwal(data);
        setImage(data.image);
        setImage_caption(data.image_caption || ""); // ✅ isi caption
        setTitle(data.title);
        setPreview(data.preview);
        setDate(data.date);
        setCategory(data.category);
        setRead_duration(data.read_duration);
        setAuthor(data.author);
        setLink(data.link);
      }
    };
    if (id) loadData();
  }, [id]);

  const handleSuccess = () => {
    setSuccess(true);
    setTimeout(() => {
      router.push("/admin/publikasi");
    }, 1000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let imageUrl = image;
    const isImageChanged = image instanceof File;

    if (isImageChanged) {
      // Upload gambar baru
      const res = await startUpload([image]);
      if (res?.[0]?.ufsUrl) {
        imageUrl = res[0].ufsUrl;

        // Hapus gambar lama jika ada dan bukan File baru
        if (typeof dataAwal.image === "string") {
          const oldImageKey = dataAwal.image.split("/").pop();
          await deleteImage(oldImageKey);
        }
      } else {
        console.error("Upload gambar gagal.");
      }
    }

    const formattedDate = date ? format(date, "yyyy-MM-dd") : null;

    const { error } = await supabase
      .from("publications")
      .update({
        image: imageUrl,
        image_caption,
        title,
        preview,
        date: formattedDate,
        category,
        read_duration,
        author,
        link,
      })
      .eq("id", id);

    if (error) {
      console.error("Gagal menyimpan:", error.message);
    } else {
      handleSuccess();
    }
  };

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

  const handleDelete = async () => {
    setLoading(true);
    const { error } = await supabase.from("publications").delete().eq("id", id);

    const key = image.split("/").pop();
    key ? await deleteImage(key) : "";

    if (error) {
      console.error("Gagal menghapus projek:", error.message);
    } else {
      handleSuccess();
    }
  };

  if (!dataAwal)
    return (
      <p className="text-sm text-muted-foreground">Memuat data projek...</p>
    );

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-10">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Edit Projek</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              type="button"
              className="cursor-pointer bg-red-500 border border-red-500 hover:bg-transparent hover:text-red-500"
            >
              Hapus Projek <TrashIcon size={20} />
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
                    Hapus Projek "{title}"
                  </DialogTitle>
                  <DialogDescription>
                    Anda akan menghapus projek "{title}" secara permanen!
                  </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-2">
                  <DialogClose asChild>
                    <Button className="cursor-pointer bg-white border text-red-500 border-red-500 hover:bg-red-500 hover:text-white">
                      Batal
                    </Button>
                  </DialogClose>
                  <Button
                    onClick={handleDelete}
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

      <div className="flex flex-col gap-3">
        <Label>Gambar</Label>
        <ImageDropzone
          existingImage={image}
          onFileUpload={(file) => setImage(file[0])}
        />
      </div>

      <div className="flex flex-col gap-3">
        <Label htmlFor="image_caption">Caption Gambar</Label>
        <Input
          id="image_caption"
          type="text"
          placeholder="Masukkan keterangan gambar..."
          value={image_caption}
          onChange={(e) => setImage_caption(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-3">
        <DatePicker value={date} disabled={loading} onChange={setDate} />
      </div>

      <div className="flex flex-col gap-3 font">
        <Label htmlFor="author">Penulis Publikasi</Label>
        <Input
          className="text-sm"
          id="author"
          type="text"
          placeholder="Masukkan penulis publikasi..."
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
      </div>

      <div className="flex flex-col gap-3 font">
        <Label htmlFor="title">Judul Publikasi</Label>
        <Input
          className="text-sm"
          id="title"
          type="text"
          placeholder="Masukkan judul publikasi..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="flex flex-col gap-3">
        <Label>Tinjauan Publikasi</Label>
        <Textarea
          className="text-sm"
          value={preview}
          rows={4}
          onChange={(e) => setPreview(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-3 font">
        <Label htmlFor="category">Kategori Publikasi</Label>
        <Input
          className="text-sm"
          id="category"
          type="text"
          placeholder="Masukkan kategori publikasi..."
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
      </div>

      <div className="flex flex-col gap-3 font">
        <Label htmlFor="duration">Durasi Baca</Label>
        <Input
          className="text-sm"
          id="duration"
          type="number"
          placeholder="Masukkan durasi baca dalam satuan menit (cth:5)..."
          value={read_duration}
          onChange={(e) => setRead_duration(e.target.value)}
          required
        />
      </div>

      <div className="flex flex-col gap-3 font">
        <Label htmlFor="link">Link Publikasi</Label>
        <Input
          className="text-sm"
          id="link"
          type="text"
          placeholder="Masukkan link publikasi..."
          value={link}
          onChange={(e) => setLink(e.target.value)}
          required
        />
      </div>

      <Button
        type="submit"
        className="bg-blue-ylbkd cursor-pointer"
        disabled={loading}
      >
        {loading
          ? success
            ? "Berhasil Diubah"
            : "Menyimpan..."
          : "Simpan Perubahan"}
      </Button>
    </form>
  );
};

export default PublicationEdit;
