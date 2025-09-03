"use client";

import {
  MagnifyingGlassIcon,
  SpinnerIcon,
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
import { useEffect, useState } from "react";
import { useUploadThing } from "@/utils/uploadthing";
import { supabase } from "@/utils/supabaseClient";
import ImageDropzone from "../ImageDropzone";
import { v4 as uuidv4 } from "uuid";
import { fetchAllDonations } from "@/utils/fetch/fecthDatabase";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AddingDonation = () => {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState(""); // 🆕 Tambah state caption
  const [title, setTitle] = useState("");
  const [nominal, setNominal] = useState("");
  const [category, setCategory] = useState(""); // kategori dipilih
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const uuid = uuidv4();

  useEffect(() => {
    const fetchCategories = async () => {
      const donations = await fetchAllDonations();

      const uniqueCategories = [
        ...new Set(donations.map((item) => item.category).filter(Boolean)),
      ];
    };

    fetchCategories();
  }, []);

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

  const createPaymentLink = async (order_id, gross_amount) => {
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        Authorization: process.env.NEXT_PUBLIC_AUTHORIZATION,
      },
      body: JSON.stringify({
        transaction_details: { order_id: order_id, gross_amount: gross_amount },
      }),
    };

    try {
      const res = await fetch(process.env.NEXT_PUBLIC_MIDTRANS_URL, options);
      const json = await res.json();
      return json;
    } catch (err) {
      console.error("Gagal membuat payment link:", err);
      return null;
    }
  };

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
    const orderId = uuid;

    const paymentRes = await createPaymentLink(orderId, nominal);
    const payment_url = paymentRes?.payment_url;

    if (!payment_url) {
      console.error("Gagal mendapatkan payment_url");
      setLoading(false);
      return;
    }

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
    const finalCategory = category;

    const { data, error } = await supabase.from("donations").insert([
      {
        title,
        desc,
        image: uploadedImageUrl,
        caption,
        nominal,
        payment_url,
        order_id: orderId,
        category: finalCategory,
      },
    ]);

    if (error) {
      console.error("Gagal menyimpan:", error.message);
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
              + Tambah Donasi
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
                  <DialogTitle>Tambah Paket Donasi</DialogTitle>
                  <DialogDescription>
                    Tambahkan gambar, judul, deskripsi, lokasi, dan link ke
                    program.
                  </DialogDescription>
                </DialogHeader>

                <div className="max-h-[450px] overflow-y-auto grid gap-4 mt-4 font-AktivGrotesk-Regular">
                  <Label>Gambar Donasi</Label>
                  <ImageDropzone onFileUpload={(file) => setImage(file[0])} />

                  {/* 🆕 Input Caption */}
                  <Label htmlFor="caption">Caption Gambar</Label>
                  <Input
                    className="text-sm lg:text-base"
                    id="caption"
                    type="text"
                    placeholder="Masukkan caption gambar..."
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                  />

                  <Label htmlFor="title">Judul Donasi</Label>
                  <Input
                    className="text-sm lg:text-base"
                    id="title"
                    type="text"
                    placeholder="Masukkan judul donasi..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                  {/* Kategori */}
                  <div className="flex flex-col gap-3">
                    <Label htmlFor="category">Biaya Per</Label>
                    <Select
                      value={category}
                      onValueChange={(value) => setCategory(value)}
                    >
                      <SelectTrigger id="category" className="cursor-pointer">
                        <SelectValue placeholder="Biaya per" />
                      </SelectTrigger>
                      <SelectContent className="font-AktivGrotesk-Regular">
                        <SelectGroup>
                          <SelectItem value="Patroli">Patroli</SelectItem>
                          <SelectItem value="Minggu">Minggu</SelectItem>
                          <SelectItem value="Acara">Acara</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>

                  <Label htmlFor="desc">Deskripsi</Label>
                  <Textarea
                    className="text-sm lg:text-base"
                    id="desc"
                    placeholder="Masukkan deskripsi..."
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    required
                  />
                  <Label htmlFor="nominal">Nominal</Label>
                  <Input
                    className="text-sm lg:text-base"
                    id="nominal"
                    type="number"
                    placeholder="Masukkan nominal donasi..."
                    value={nominal}
                    onChange={(e) => setNominal(e.target.value)}
                    required
                  />
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

export default AddingDonation;
