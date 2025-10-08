"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DatePicker from "./DatePicker";
import ImageDropzone from "../ImageDropzone";
import { useAutoTranslate } from "@/components/translate/useAutoTranslate";

export default function SendEmailSheet({ email, name, trigger }) {
  const [formData, setFormData] = useState({
    donorName: name || "", // otomatis dari database (tidak bisa diubah)
    email,
    nestLocation: "",
    eggCount: "",
    hatchStatus: "",
    updateDate: "",
    message: "",
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  // handle input text
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // handle date picker
  const handleDateChange = (value) => {
    setFormData((prev) => ({ ...prev, updateDate: value }));
  };

  // handle submit kirim ke endpoint sendUpdateEmail
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => data.append(key, value));
      if (image) data.append("image", image);

      const res = await fetch("/api/sendUpdateEmail", {
        method: "POST",
        body: data,
      });

      if (!res.ok) throw new Error("Gagal mengirim email");
      const result = await res.json();

      alert(result.message || "Email pembaruan berhasil dikirim!");
      setOpen(false);

      // reset form (kecuali donorName)
      setFormData({
        donorName: name || "",
        email,
        nestLocation: "",
        eggCount: "",
        hatchStatus: "",
        updateDate: "",
        message: "",
      });
      setImage(null);
    } catch (err) {
      console.error(err);
      alert("Gagal mengirim email. Silakan coba lagi nanti.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{trigger}</SheetTrigger>

      <SheetContent className="font-AktivGrotesk-Regular overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <SheetHeader className="mt-3">
            <SheetTitle>Kirim Pembaruan Sarang Penyu</SheetTitle>
            <SheetDescription>
              Email ini akan dikirim ke donatur <strong>{name}</strong>.
            </SheetDescription>
          </SheetHeader>

          <div className="grid flex-1 auto-rows-min gap-6 px-4 mt-3">
            <div className="grid gap-2">
              <Label htmlFor="nestLocation">Lokasi Sarang</Label>
              <Input
                id="nestLocation"
                name="nestLocation"
                value={formData.nestLocation}
                onChange={handleChange}
                placeholder="Contoh: Pantai Maratua Timur"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="eggCount">Jumlah Telur</Label>
              <Input
                id="eggCount"
                name="eggCount"
                type="number"
                value={formData.eggCount}
                onChange={handleChange}
                placeholder="Contoh: 87"
                required
              />
            </div>

            <div className="grid gap-2">
              <DatePicker value={formData.updateDate} onChange={handleDateChange} required />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="hatchStatus">Status Penetasan</Label>
              <Select
                value={formData.hatchStatus}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, hatchStatus: value }))
                }
              >
                <SelectTrigger className="cursor-pointer">
                  <SelectValue placeholder="Pilih status" />
                </SelectTrigger>
                <SelectContent className="font-AktivGrotesk-Regular">
                  <SelectGroup>
                    <SelectLabel>Pilih status</SelectLabel>
                    <SelectItem value="During the incubation process">Dalam proses inkubasi</SelectItem>
                    <SelectItem value="Has hatched">Telah menetas</SelectItem>
                    <SelectItem value="Has been released into the sea">Telah dilepaskan ke laut</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="message">Pesan Tambahan</Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tuliskan pesan singkat atau catatan kondisi sarang..."
                rows={3}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="image">Gambar Pembaruan</Label>
              <ImageDropzone onFileUpload={(file) => setImage(file[0])} />
            </div>
          </div>

          <SheetFooter className="mt-6 flex gap-3">
            <Button
              type="submit"
              className="text-white cursor-pointer flex items-center"
              disabled={loading}
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {loading ? "Mengirim..." : "Kirim Email"}
            </Button>

            <SheetClose asChild>
              <Button variant="outline" className="cursor-pointer">
                Tutup
              </Button>
            </SheetClose>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
