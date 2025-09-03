"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabaseClient";
import { useRouter, useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { fetchProjectsById } from "@/utils/fetch/fecthDatabase";
import { useUploadThing } from "@/utils/uploadthing";
import { SpinnerIcon, TrashIcon } from "@phosphor-icons/react/dist/ssr";
import ImageDropzone from "../../ImageDropzone";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import DynamicContentRenderer from "./DynamicContentRenderer";

const ProjectEdit = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const [dataAwal, setDataAwal] = useState(null);
  const [image, setImage] = useState([]);
  const [caption, setCaption] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [status, setStatus] = useState("");
  const [geohex, setGeohex] = useState("");
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const { startUpload } = useUploadThing("imageUploader", {
    onClientUploadComplete: () => console.log("Gambar terupload"),
    onUploadProgress: () => console.log("Sedang mengunggah..."),
    onUploadError: (error) => console.error("Upload gagal:", error),
  });

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchProjectsById(id);
      if (data) {
        setDataAwal(data);
        setImage(data.image);
        setCaption(data.caption || "");
        setTitle(data.title);
        setDesc(data.desc);
        setStatus(data.status);
        setGeohex(data.geohex);
        setContent(data.additional_photos || []);
      }
    };
    if (id) loadData();
  }, [id]);

  const handleSuccess = () => {
    setSuccess(true);
    setTimeout(() => {
      router.push("/admin/projek-kami");
    }, 1000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let imageUrl = image;
    const isImageChanged = image instanceof File;

    if (isImageChanged) {
      const res = await startUpload([image]);
      if (res?.[0]?.ufsUrl) {
        imageUrl = res[0].ufsUrl;

        if (typeof dataAwal.image === "string") {
          const oldImageKey = dataAwal.image.split("/").pop();
          await deleteImage(oldImageKey);
        }
      } else {
        console.error("Upload gambar gagal.");
      }
    }

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

    // Proses update field & upload ulang bila ada file baru
    for (const field of content) {
      if (field.type === "copyright") {
        updatedFields.push(field);
      } else if (field.type === "file" && field.value instanceof File) {
        const oldField = (dataAwal.content || []).find(
          (f) => f.id === field.id
        );
        if (oldField && oldField.value) {
          deletedImages.push(oldField.value);
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

    for (const url of deletedImages) {
      await deleteImage(url);
    }

    const { error } = await supabase
      .from("projects")
      .update({
        image: imageUrl,
        caption,
        title,
        desc,
        status,
        geohex,
        additional_photos: updatedFields,
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
    const { error } = await supabase.from("projects").delete().eq("id", id);

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
              disabled={loading}
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
        <Label htmlFor="caption">Caption Gambar</Label>
        <Input
          id="caption"
          type="text"
          placeholder="Masukkan keterangan gambar..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-3">
        <Label htmlFor="title">Judul Projek</Label>
        <Input
          className="text-sm lg:text-base"
          id="title"
          type="text"
          placeholder="Masukkan judul projek..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="flex flex-col gap-3">
        <Label htmlFor="status">Status</Label>
        <Select value={status} onValueChange={(value) => setStatus(value)}>
          <SelectTrigger id="status" className="cursor-pointer">
            <SelectValue placeholder="Pilih status projek" />
          </SelectTrigger>
          <SelectContent className="font-AktivGrotesk-Regular">
            <SelectGroup>
              <SelectItem value="Masih Berlangsung">
                Masih Berlangsung
              </SelectItem>
              <SelectItem value="Sedang Dinilai">Sedang Dinilai</SelectItem>
              <SelectItem value="Sudah Selesai">Sudah Selesai</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-3">
        <Label>Deskripsi</Label>
        <Textarea
          className="text-sm lg:text-base"
          value={desc}
          rows={4}
          onChange={(e) => setDesc(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-3">
        <Label htmlFor="geohex">Geohex</Label>
        <Input
          className="text-sm lg:text-base"
          id="geohex"
          type="text"
          placeholder="Masukkan latitude & longitude..."
          value={geohex}
          onChange={(e) => setGeohex(e.target.value)}
          required
        />
      </div>

      <div className="flex flex-col gap-3">
        <Label>Konten Tambahan</Label>
        <DynamicContentRenderer
          loading={loading}
          content={content}
          onChange={setContent}
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

export default ProjectEdit;
