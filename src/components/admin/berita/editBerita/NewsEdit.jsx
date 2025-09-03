"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabaseClient";
import { useRouter, useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { fetchNewsById } from "@/utils/fetch/fecthDatabase";
import DatePicker from "../../DatePicker";
import DynamicContentRenderer from "./DynamicContentRenderer";
import { useUploadThing } from "@/utils/uploadthing";
import { format } from "date-fns";
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

const NewsEdit = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const [dataAwal, setDataAwal] = useState(null);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState("");
  const [content, setContent] = useState([]);
  const [isHighlight, setIsHighlight] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const { startUpload } = useUploadThing("imageUploader", {
    onClientUploadComplete: () => {
      console.log("gambar terupload");
    },
    onUploadProgress: () => {
      console.log("sedang mengunggah...");
    },
    onUploadError: (error) => {
      console.error("Upload gagal:", error);
    },
  });

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchNewsById(id);
      if (data) {
        setDataAwal(data);
        setTitle(data.title);
        setDesc(data.desc);
        setDate(data.date);
        setContent(data.content || []);
        setIsHighlight(data.isHighlight || false);
      }
    };

    if (id) loadData();
  }, [id]);

  const handleSuccess = () => {
    setSuccess(true);
    setTimeout(() => {
      router.push("/admin/berita");
    }, 1000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const updatedFields = [];
    const deletedImages = [];

    const oldFiles = (dataAwal.content || []).filter(
      (item) => item.type === "file"
    );
    const currentFileIds = content
      .filter((item) => item.type === "file")
      .map((item) => item.id);

    for (const oldFile of oldFiles) {
      if (!currentFileIds.includes(oldFile.id)) {
        deletedImages.push(oldFile.value);
      }
    }

    // 2. Proses update field & deteksi perubahan gambar
    for (const field of content) {
      if (field.type === "subtitle" || field.type === "text" || field.type === "link") {
        updatedFields.push(field);
      } else if (field.type === "file" && field.value instanceof File) {
        // cari versi lama dari field ini (dengan id yang sama)
        const oldField = (dataAwal.content || []).find(
          (f) => f.id === field.id
        );
        if (oldField && oldField.value) {
          deletedImages.push(oldField.value); // gambar lama perlu dihapus
        }

        const res = await startUpload([field.value]);
        if (res?.[0]?.ufsUrl) {
          updatedFields.push({
            ...field,
            value: res[0].ufsUrl,
          });
        } else {
          console.error("Upload gambar gagal.");
        }
      } else {
        updatedFields.push(field);
      }
    }

    // 3. Hapus semua gambar dari UploadThing
    for (const url of deletedImages) {
      await deleteImage(url);
    }

    // 4. Simpan ke database
    const formattedDate = date ? format(date, "yyyy-MM-dd") : null;

    const { error } = await supabase
      .from("news")
      .update({
        title,
        desc,
        date: formattedDate,
        content: updatedFields,
        isHighlight,
      })
      .eq("id", id);

    if (error) {
      console.error("Gagal menyimpan:", error.message);
    }

    handleSuccess();
  };

  const deleteImage = async (imageKey) => {
    const key = imageKey.split("/").pop();
    await fetch(`${process.env.NEXT_PUBLIC_API_UPLOADTHING}/deleteFiles`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-uploadthing-api-key": process.env.NEXT_PUBLIC_UPLOADTHING_TOKEN,
      },
      body: JSON.stringify({
        fileKeys: [key],
      }),
    });
  };

  const handleDelete = async () => {
    setLoading(true);

    try {
      const deletePromises = content
        .filter((item) => item.type === "file" && item.value)
        .map((item) => deleteImage(item.value));

      await Promise.all(deletePromises);
    } catch (err) {
      console.error("Gagal menghapus file dari UploadThing:", err);
    }

    const { error } = await supabase.from("news").delete().eq("id", id);

    if (error) {
      console.error("Gagal menghapus berita:", error.message);
    } else {
      handleSuccess();
    }
  };

  if (!dataAwal)
    return (
      <p className="text-sm text-muted-foreground">Memuat data berita...</p>
    );

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-10">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Edit Berita</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              type="button"
              className="cursor-pointer bg-red-500 border border-red-500 hover:bg-transparent hover:text-red-500"
            >
              Hapus Berita <TrashIcon size={20} />
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
                    Hapus Berita "{title}"
                  </DialogTitle>
                  <DialogDescription>
                    Anda akan akan menghapus berita "{title}" secara permanen!
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
        <Label htmlFor="title">Judul</Label>
        <Input
        className="text-sm lg:text-base"
          disabled={loading}
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={dataAwal.title}
        />
      </div>

      <div className="flex flex-col gap-3">
        <Label htmlFor="desc">Deskripsi</Label>
        <Textarea
        className="text-sm lg:text-base"
          id="desc"
          disabled={loading}
          rows={4}
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder={dataAwal.desc}
        />
      </div>

      <div className="flex flex-col gap-3">
        <DatePicker value={date} disabled={loading} onChange={setDate} />
      </div>

      <div className="flex flex-col gap-3">
        <Label>Konten Berita</Label>
        <DynamicContentRenderer
          loading={loading}
          content={content}
          onChange={setContent}
        />
      </div>

      <div className="flex flex-col gap-3">
        <Label htmlFor="isHighlight" className="flex items-center gap-2">
          <input
            type="checkbox"
            disabled={loading}
            id="isHighlight"
            checked={isHighlight}
            onChange={(e) => setIsHighlight(e.target.checked)}
          />
          Tampilkan sebagai highlight
        </Label>
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

export default NewsEdit;
