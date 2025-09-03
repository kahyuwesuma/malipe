"use client";

import {
  SpinnerIcon,
  TrashIcon,
} from "@phosphor-icons/react/dist/ssr";
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
import { v4 as uuidv4 } from "uuid";

const AddingProject = () => {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [fields, setFields] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [geohex, setGeohex] = useState("");
  const [status, setStatus] = useState("");
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

  const handleAddField = (type) => {
    if (type === "file") {
      setFields((prev) => [
        ...prev,
        { id: uuidv4(), type, value: "", caption: "" },
      ]);
    } else if (type === "copyright") {
      setFields((prev) => [...prev, { id: uuidv4(), type, value: "" }]);
    }
  };

  const handleRemoveField = (id) => {
    setFields((prev) => prev.filter((field) => field.id !== id));
  };

  const handleChangeCaption = (id, caption) => {
    setFields((prev) =>
      prev.map((field) => (field.id === id ? { ...field, caption } : field))
    );
  };

  const handleChange = (id, value) => {
    setFields((prev) =>
      prev.map((field) => (field.id === id ? { ...field, value } : field))
    );
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

    const updatedFields = [];
    for (const field of fields) {
      if (field.type === "copyright") {
        updatedFields.push(field);
      } else if (field.type === "file" && field.value instanceof File) {
        const res = await startUpload([field.value]);
        if (res?.[0]?.ufsUrl) {
          updatedFields.push({
            ...field,
            value: res[0].ufsUrl,
            caption: field.caption || "",
          });
        }
      } else if (field.type === "file" && typeof field.value === "string") {
        updatedFields.push({
          ...field,
          caption: field.caption || "",
        });
      }
    }

    const { data, error } = await supabase.from("projects").insert([
      {
        title,
        desc,
        image: uploadedImageUrl,
        caption,
        status,
        geohex,
        additional_photos: updatedFields,
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
              + Tambah Projek
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
                  <DialogTitle>Tambah Projek</DialogTitle>
                  <DialogDescription>
                    Tambahkan gambar, caption, judul, status, deskripsi, geohex, dan gambar tambahan projek.
                  </DialogDescription>
                </DialogHeader>

                <div className="max-h-[450px] overflow-y-auto grid gap-4 mt-4 font-AktivGrotesk-Regular">
                  <Label>Gambar Projek</Label>
                  <ImageDropzone onFileUpload={(file) => setImage(file[0])} />

                  {/* ✅ Input caption */}
                  <Label htmlFor="caption">Caption Gambar</Label>
                  <Input
                    id="caption"
                    type="text"
                    placeholder="Masukkan keterangan gambar..."
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                  />

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

                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={status}
                    onValueChange={(value) => setStatus(value)}
                  >
                    <SelectTrigger id="status" className="cursor-pointer">
                      <SelectValue placeholder="Pilih status projek" />
                    </SelectTrigger>
                    <SelectContent className="font-AktivGrotesk-Regular">
                      <SelectGroup>
                        <SelectItem value="Masih Berlangsung">
                          Masih Berlangsung
                        </SelectItem>
                        <SelectItem value="Sedang Dinilai">
                          Sedang Dinilai
                        </SelectItem>
                        <SelectItem value="Sudah Selesai">
                          Sudah Selesai
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>

                  <Label htmlFor="desc">Deskripsi</Label>
                  <Textarea
                    className="text-sm lg:text-base"
                    id="desc"
                    placeholder="Masukkan deskripsi..."
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    required
                  />
                  <Label htmlFor="geohex">Geohex</Label>
                  <Input
                    className="text-sm lg:text-base"
                    id="geohex"
                    type="text"
                    placeholder="Latitude, longitude"
                    value={geohex}
                    onChange={(e) => setGeohex(e.target.value)}
                    required
                  />
                  {!fields || fields.length === 0 ? (
                    <p className="lg:text-sm text-xs text-muted-foreground mx-1">
                      Gambar Tambahan
                    </p>
                  ) : null}
                  {fields.map((field, index) => (
                    <div
                      key={field.id}
                      className="relative grid gap-2 border rounded-md p-3"
                    >
                      <div className="flex justify-between items-center">
                        <Label>Konten {index + 1}</Label>
                        <Button
                          type="button"
                          variant="ghost"
                          onClick={() => handleRemoveField(field.id)}
                          title="Hapus konten"
                          className="cursor-pointer hover:bg-black hover:text-white"
                        >
                          <TrashIcon size={20} />
                        </Button>
                      </div>

                      {field.type === "copyright" ? (
                        <Input
                          className="text-sm lg:text-base"
                          type="text"
                          value={field.value}
                          onChange={(e) =>
                            handleChange(field.id, e.target.value)
                          }
                          placeholder="Tambahkan hak cipta..."
                        />
                      ) : (
                        <>
                          <ImageDropzone
                            key={`dropzone-${field.id}`}
                            existingImage={field.value}
                            onFileUpload={(file) =>
                              handleChange(field.id, file[0])
                            }
                          />
                          <Input
                            className="text-xs lg:text-sm text-muted-foreground"
                            type="text"
                            placeholder="Tulis caption gambar..."
                            value={field.caption || ""}
                            onChange={(e) =>
                              handleChangeCaption(field.id, e.target.value)
                            }
                          />
                        </>
                      )}
                    </div>
                  ))}
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => handleAddField("file")}
                      className="cursor-pointer hover:bg-zinc-200"
                    >
                      + Tambah Gambar
                    </Button>
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => handleAddField("copyright")}
                      className="cursor-pointer hover:bg-zinc-200"
                    >
                      + Tambah Hak Cipta
                    </Button>
                  </div>
                </div>

                <DialogFooter className="mt-6 font-AktivGrotesk-Regular">
                  <DialogClose asChild>
                    <Button variant="outline" className="cursor-pointer">
                      Batal
                    </Button>
                  </DialogClose>
                  <Button type="submit" className="cursor-pointer">
                    Simpan
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          )}
        </Dialog>
      </div>
    </div>
  );
};

export default AddingProject;
