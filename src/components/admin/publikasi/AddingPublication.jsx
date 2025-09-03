"use client";

import { SpinnerIcon } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useUploadThing } from "@/utils/uploadthing";
import { supabase } from "@/utils/supabaseClient";
import ImageDropzone from "../ImageDropzone";
import DatePicker from "../DatePicker";

const AddingPublication = () => {
  const [image, setImage] = useState(null);
  const [image_caption, setImage_caption] = useState("");
  const [title, setTitle] = useState("");
  const [preview, setPreview] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [readDuration, setReadDuration] = useState("");
  const [author, setAuthor] = useState("");
  const [link, setLink] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const { startUpload } = useUploadThing("imageUploader", {
    onClientUploadComplete: async () => {
      console.log("Gambar berhasil diupload");
    },
    onUploadProgress: () => {
      console.log("Sedang mengunggah gambar...");
    },
    onUploadError: (error) => {
      console.error("Upload gagal:", error);
    },
  });

  const handleSuccess = () => {
    setSuccess(true);
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let uploadedImageUrl = "";

    if (image instanceof File) {
      const res = await startUpload([image]);
      if (res?.[0]?.ufsUrl) {
        uploadedImageUrl = res[0].ufsUrl;
      } else {
        console.error("Upload gagal atau tidak ada URL gambar");
        setLoading(false);
        return;
      }
    }

    const { data, error } = await supabase.from("publications").insert([
      {
        title,
        preview,
        date,
        category,
        read_duration: readDuration,
        author,
        image: uploadedImageUrl,
        link,
        image_caption,
      },
    ]);

    if (error) {
      console.error("Gagal menyimpan:", error.message);
    } else {
      console.log("Berhasil simpan:", data);
    }

    handleSuccess();
  };

  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="lg:px-5 w-full px-0 py-0">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="cursor-pointer lg:w-1/2 font-bold lg:font-normal border text-xxs lg:text-sm border-black rounded hover:bg-black hover:text-white transition-colors duration-200"
            >
              + Tambah Publikasi
            </Button>
          </DialogTrigger>

          {loading ? (
            <DialogContent>
              <DialogTitle className="flex justify-center">
                {success ? (
                  <span className="animate-pulse font-AktivGrotesk-Regular text-sm">
                    Berhasil diupload
                  </span>
                ) : (
                  <SpinnerIcon className="animate-spin" size={32} />
                )}
              </DialogTitle>
            </DialogContent>
          ) : (
            <DialogContent
              showCloseButton={false}
              className="sm:max-w-[600px] rounded"
            >
              <form onSubmit={handleSubmit}>
                <DialogHeader className="font-AktivGrotesk-Regular">
                  <DialogTitle>Tambah Publikasi</DialogTitle>
                  <DialogDescription>
                    Tambahkan data publikasi lengkap.
                  </DialogDescription>
                </DialogHeader>

                <div className="max-h-[500px] overflow-y-auto grid gap-4 mt-4 font-AktivGrotesk-Regular">
                  <Label>Gambar Publikasi</Label>
                  <ImageDropzone onFileUpload={(file) => setImage(file[0])} />

                  <Label htmlFor="image_caption">Caption Gambar</Label>
                  <Input
                    id="image_caption"
                    type="text"
                    placeholder="Masukkan keterangan gambar..."
                    value={image_caption}
                    onChange={(e) => setImage_caption(e.target.value)}
                  />

                  <Label htmlFor="title">Judul Publikasi</Label>
                  <Input
                    id="title"
                    type="text"
                    placeholder="Masukkan judul publikasi..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />

                  <Label htmlFor="preview">Tinjauan Publikasi</Label>
                  <Textarea
                    id="preview"
                    placeholder="Masukkan ringkasan..."
                    value={preview}
                    onChange={(e) => setPreview(e.target.value)}
                    required
                  />

                  <DatePicker value={date} onChange={setDate} required />

                  <Label htmlFor="category">Kategori Publikasi</Label>
                  <Input
                    id="category"
                    type="text"
                    placeholder="Kategori publikasi..."
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                  />

                  <Label htmlFor="readDuration">Durasi Baca (menit)</Label>
                  <Input
                    id="readDuration"
                    type="number"
                    placeholder="Durasi baca (cth: 5)"
                    value={readDuration}
                    onChange={(e) => setReadDuration(e.target.value)}
                    required
                  />

                  <Label htmlFor="author">Penulis</Label>
                  <Input
                    id="author"
                    type="text"
                    placeholder="Nama penulis..."
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    required
                  />

                  <Label htmlFor="link">Link Publikasi</Label>
                  <Input
                    id="link"
                    type="url"
                    placeholder="https://example.com"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    required
                  />
                </div>

                <DialogFooter className="mt-6 font-AktivGrotesk-Regular">
                  <DialogClose asChild>
                    <Button variant="outline">Batal</Button>
                  </DialogClose>
                  <Button type="submit">Simpan</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          )}
        </Dialog>
      </div>
    </div>
  );
};

export default AddingPublication;
