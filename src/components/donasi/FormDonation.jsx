"use client";

import React, { useState } from "react";
import { PaypalLogoIcon } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import ImageDropzone from "../admin/ImageDropzone";
import { supabase } from "@/utils/supabaseClient";
import { useUploadThing } from "@/utils/uploadthing";
import Link from "next/link";
import { useAutoTranslate } from "../translate/useAutoTranslate";

export default function FormDonation({ trigger, onSuccess, onError, donationType }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    nominal: "",
    message: "",
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const paypalLink = "https://www.paypal.com/paypalme/Malipe2021";

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const { startUpload } = useUploadThing("imageUploader", {
    onClientUploadComplete: () =>
      console.log("Bukti pembayaran berhasil diupload"),
    onUploadError: (err) => console.error("Upload gagal:", err),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = null;

      if (image instanceof File) {
        const uploaded = await startUpload([image]);
        if (uploaded?.[0]?.ufsUrl) {
          imageUrl = uploaded[0].ufsUrl;
        } else {
          throw new Error("Gagal mengunggah bukti pembayaran");
        }
      }

      const { error } = await supabase.from("donations").insert([
        {
          name: formData.name,
          email: formData.email,
          nominal: parseInt(formData.nominal),
          message: formData.message,
          payment_receipt_image: imageUrl,
          donation_type: donationType === "nest" ? "khusus" : "umum",
        },
      ]);

      if (error) throw error;

      setFormData({ name: "", email: "", nominal: "", message: "" });
      setImage(null);

      onSuccess?.();
      setOpen(false);
    } catch (err) {
      console.error(err);
      onError?.();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-blue-ylbkd font-AktivGrotesk-Regular">
            {useAutoTranslate("Formulir Donasi")}
          </DialogTitle>
          <DialogDescription className="text-center font-AktivGrotesk-Regular text-gray-500">
            {useAutoTranslate("Isi formulir di bawah ini untuk mendukung upaya pelestarian penyu.")}
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 mt-4 font-AktivGrotesk-Regular"
        >
          <div className="space-y-2">
            <Label htmlFor="name">{useAutoTranslate("Nama Lengkap")}</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={handleChange}
              placeholder={useAutoTranslate("Masukkan nama lengkap Anda")}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">{useAutoTranslate("Alamat Email")}</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={useAutoTranslate("Masukkan alamat email Anda")}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="nominal">{useAutoTranslate("Jumlah Donasi")} (USD)</Label>
            <Input
              id="nominal"
              type="number"
              min="1"
              value={formData.nominal}
              onChange={handleChange}
              placeholder={useAutoTranslate("Contoh: 25")}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="payment_receipt_image">{useAutoTranslate("Bukti Pembayaran")}</Label>
            <ImageDropzone onFileUpload={(file) => setImage(file[0])} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">{useAutoTranslate("Pesan (Opsional)")}</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={handleChange}
              placeholder={useAutoTranslate("Tulis pesan untuk tim konservasi (jika ada)")}
            />
          </div>

          <DialogFooter>
            <div className="flex w-full flex-col gap-3"> 
              <Button
                type="submit"
                disabled={loading}
                className="w-full cursor-pointer bg-gradient-to-r from-green-100 via-green-200 to-green-300 text-black hover:from-green-200 hover:via-green-300 hover:to-green-400 transition-colors duration-300 font-semibold py-3 rounded-full"
              >
                {loading ? useAutoTranslate("Mengirim...") : useAutoTranslate("Kirim")}
              </Button>
              <div className="mt-1 flex justify-center items-center gap-1 text-sm text-gray-600">
                <span>{useAutoTranslate("Belum melakukan pembayaran?")}{" "}</span>
                <Link
                  href={paypalLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-blue-600 hover:underline font-medium"
                >
                  <PaypalLogoIcon size={20} /> {useAutoTranslate("Donasi melalui PayPal")}
                </Link>
              </div>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
