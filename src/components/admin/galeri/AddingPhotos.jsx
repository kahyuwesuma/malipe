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
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import ImageDropzone from "../ImageDropzone";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useUploadThing } from "@/utils/uploadthing";
import { supabase } from "@/utils/supabaseClient";

const AddingPhotos = () => {
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

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

  const handleAddField = () => {
    setFields((prev) => [
      ...prev,
      { id: uuidv4(), type: "file", value: "" },
    ]);
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

    try {
      for (const field of fields) {
        if (field.value instanceof File) {
          const res = await startUpload([field.value]);
          if (res?.[0]?.ufsUrl) {
            const { error } = await supabase.from("gallery").insert([
              { image_url: res[0].ufsUrl },
            ]);
            if (error) console.error("Gagal menyimpan:", error.message);
          }
        } else if (typeof field.value === "string" && field.value !== "") {
          const { error } = await supabase.from("gallery").insert([
            { image_url: field.value },
          ]);
          if (error) console.error("Gagal menyimpan:", error.message);
        }
      }

      handleSuccess();
    } catch (err) {
      console.error("Error:", err);
      setLoading(false);
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
              + Tambah Foto
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
                  <DialogTitle>Tambah Foto Galeri</DialogTitle>
                </DialogHeader>

                <div className="max-h-[450px] overflow-y-auto grid gap-4 mt-4 font-AktivGrotesk-Regular">
                  <div className=" flex flex-col gap-4">
                    {!fields || fields.length === 0 ? (
                      <p className="lg:text-sm text-xs text-muted-foreground mx-1">
                        Tambahkan foto ke dalam galeri.
                      </p>
                    ) : null}
                    {fields.map((field, index) => (
                      <div
                        key={field.id}
                        className="relative grid gap-2 border rounded-md p-3"
                      >
                        <div className="flex justify-between items-center">
                          <Label>Foto {index + 1}</Label>
                          <Button
                            type="button"
                            variant="ghost"
                            onClick={() => handleRemoveField(field.id)}
                            title="Hapus foto"
                            className="cursor-pointer hover:bg-black hover:text-white"
                          >
                            <TrashIcon size={20} />
                          </Button>
                        </div>

                        <ImageDropzone
                          key={`dropzone-${field.id}`}
                          existingImage={field.value}
                          onFileUpload={(file) =>
                            handleChange(field.id, file[0])
                          }
                        />
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1">
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={handleAddField}
                      className="cursor-pointer hover:bg-zinc-200"
                    >
                      + Tambah Foto
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

export default AddingPhotos;
