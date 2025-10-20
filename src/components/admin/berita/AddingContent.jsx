"use client";
import {
  MagnifyingGlassIcon,
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import ImageDropzone from "../ImageDropzone";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useUploadThing } from "@/utils/uploadthing";
import { supabase } from "@/utils/supabaseClient";
import DatePicker from "../DatePicker";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

const AddingContent = () => {
  const [fields, setFields] = useState([]);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState();
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isHighlight, setIsHighlight] = useState(false);

  const router = useRouter();

  const { startUpload } = useUploadThing("imageUploader", {
    onClientUploadComplete: async () => {
      console.log("gambar terupload");
    },
    onUploadProgress: () => {
      console.log("Sedang mengunggah...");
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
    } else {
      setFields((prev) => [...prev, { id: uuidv4(), type, value: "" }]);
    }
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

  const handleRemoveField = (id) => {
    setFields((prev) => prev.filter((field) => field.id !== id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const updatedFields = [];

    for (const field of fields) {
      if (field.type === "subtitle" || field.type === "text" || field.type === "link") {
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

    const formattedDate = date ? format(date, "yyyy-MM-dd") : null;

    const { data, error } = await supabase.from("news").insert([
      {
        title,
        content: updatedFields,
        date: formattedDate,
        desc,
        isHighlight,
      },
    ]);

    if (error) {
      console.error("Gagal menyimpan:", error.message);
      handleSuccess();
    } else {
      console.log("Berhasil simpan:", data);
      handleSuccess();
    }
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
              + Tambah Berita
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
                  <DialogTitle>Tambah Konten</DialogTitle>
                  <DialogDescription>
                    Tambahkan deskripsi teks atau gambar ke berita.
                  </DialogDescription>
                </DialogHeader>

                <div className="max-h-[450px] overflow-y-auto grid gap-4 mt-4 font-AktivGrotesk-Regular">
                  <div className="grid gap-3">
                    <Label htmlFor="title">Judul Berita</Label>
                    <Input
                      className="text-sm lg:text-base"
                      id="title"
                      name="title"
                      type="text"
                      placeholder="Masukkan judul berita..."
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                    <DatePicker value={date} onChange={setDate} required />
                    <Label htmlFor="desc">Deskripsi</Label>
                    <Textarea
                      className="text-sm lg:text-base"
                      id="desc"
                      name="desc"
                      placeholder="Masukkan deskripsi..."
                      value={desc}
                      onChange={(e) => setDesc(e.target.value)}
                      required
                    />
                  </div>

                  <div className=" flex flex-col gap-4">
                    {!fields || fields.length === 0 ? (
                      <p className="lg:text-sm text-xs text-muted-foreground mx-1">
                        Tambahkan konten teks atau gambar sesuai urutan yang
                        akan ditampilkan.
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

                        {field.type === "text" || field.type === "subtitle" ? (
                          field.type === "text" ? (
                            <Textarea
                              className="text-sm lg:text-base"
                              rows={4}
                              value={field.value}
                              onChange={(e) =>
                                handleChange(field.id, e.target.value)
                              }
                              placeholder="Tulis paragraf berita..."
                            />
                          ) : (
                            <Input
                              className="text-sm lg:text-base"
                              type="text"
                              value={field.value}
                              onChange={(e) =>
                                handleChange(field.id, e.target.value)
                              }
                              placeholder="Tulis subjudul..."
                            />
                          )
                        ) : field.type === "link" ? (
                          <Input
                            className="text-sm lg:text-base"
                            type="url"
                            value={field.value}
                            onChange={(e) =>
                              handleChange(field.id, e.target.value)
                            }
                            placeholder="Masukkan URL..."
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
                  </div>
                  <Label
                    htmlFor="highlight"
                    className="flex items-center gap-2 text-xs lg:text-sm"
                  >
                    <input
                      type="checkbox"
                      id="highlight"
                      checked={isHighlight}
                      onChange={(e) => setIsHighlight(e.target.checked)}
                      className="accent-blue-ylbkd"
                    />
                    Tampilkan sebagai highlight
                  </Label>

                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => handleAddField("subtitle")}
                      className="cursor-pointer hover:bg-zinc-200"
                    >
                      + Tambah Subjudul
                    </Button>
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => handleAddField("text")}
                      className="cursor-pointer hover:bg-zinc-200"
                    >
                      + Tambah Teks
                    </Button>
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
                      onClick={() => handleAddField("link")}
                      className="cursor-pointer hover:bg-zinc-200"
                    >
                      + Tambah Link
                    </Button>
                  </div>
                </div>

                <DialogFooter className="mt-6 font-AktivGrotesk-Regular">
                  <DialogClose asChild>
                    <Button variant="outline" className="cursor-pointer">
                      Batal
                    </Button>
                  </DialogClose>
                  <Button type="submit" className="cursor-pointer text-white">
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

export default AddingContent;
