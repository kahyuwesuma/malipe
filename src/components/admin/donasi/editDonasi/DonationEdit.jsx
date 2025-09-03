"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabaseClient";
import { useRouter, useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { fetchDonationsById } from "@/utils/fetch/fecthDatabase";
import { useUploadThing } from "@/utils/uploadthing";
import { SpinnerIcon, TrashIcon } from "@phosphor-icons/react/dist/ssr";
import ImageDropzone from "../../ImageDropzone";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { v4 as uuidv4 } from "uuid";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const DonationEdit = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const [dataAwal, setDataAwal] = useState(null);
  const [image, setImage] = useState([]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [desc, setDesc] = useState("");
  const [nominal, setNominal] = useState("");
  const [caption, setCaption] = useState("");
  const [initialNominal, setInitialNominal] = useState("");
  const [orderId, setOrderId] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const uuid = uuidv4();

  const { startUpload } = useUploadThing("imageUploader", {
    onClientUploadComplete: () => console.log("Gambar terupload"),
    onUploadProgress: () => console.log("Sedang mengunggah..."),
    onUploadError: (error) => console.error("Upload gagal:", error),
  });

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchDonationsById(id);
      if (data) {
        setDataAwal(data);
        setImage(data.image);
        setTitle(data.title);
        setCategory(data.category || "");
        setDesc(data.desc || "");
        setCaption(data.caption || "");
        setInitialNominal(data.nominal);
        setNominal(data.nominal);
        setOrderId(data.order_id);
      }
    };

    if (id) {
      loadData();
    }
  }, [id]);

  const handleSuccess = () => {
    setSuccess(true);
    setTimeout(() => {
      router.push("/admin/donasi");
    }, 1000);
  };

  const deletePaymentLink = async () => {
    const options = {
      method: "DELETE",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        Authorization: process.env.NEXT_PUBLIC_AUTHORIZATION,
      },
    };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_MIDTRANS_URL}/${orderId}`,
        options
      );
      const json = await res.json();
      return json;
    } catch (err) {
      console.error("Gagal delete payment link:", err);
      return null;
    }
  };

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

  const nominalCheck = async () => {
    const isNominalChanged = nominal !== initialNominal;
    const orderId = uuid;

    if (isNominalChanged) {
      await deletePaymentLink();
      const paymentRes = await createPaymentLink(orderId, nominal);
      const payment_url = paymentRes?.payment_url;
      const { error } = await supabase
        .from("donations")
        .update({
          nominal,
          order_id: orderId,
          payment_url,
        })
        .eq("id", id);

      if (error) {
        console.error("Gagal menyimpan:", error.message);
      }
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let imageUrl = image;
    await nominalCheck();

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

    const { error } = await supabase
      .from("donations")
      .update({
        title,
        category,
        desc,
        image: imageUrl,
        caption,
      })
      .eq("id", id);

    if (error) {
      console.error("Gagal menyimpan:", error.message);
    } else {
      handleSuccess();
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    await deletePaymentLink();
    const key = image.split("/").pop();
    key ? await deleteImage(key) : "";

    const { error } = await supabase.from("donations").delete().eq("id", id);

    if (error) {
      console.error("Gagal menghapus program:", error.message);
    } else {
      handleSuccess();
    }
  };

  if (!dataAwal)
    return (
      <p className="text-sm text-muted-foreground">Memuat data donasi...</p>
    );

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-10">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Edit Donasi</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              type="button"
              disabled={loading}
              className="cursor-pointer bg-red-500 border border-red-500 hover:bg-transparent hover:text-red-500"
            >
              Hapus Donasi <TrashIcon size={20} />
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
                    Hapus "{title}"
                  </DialogTitle>
                  <DialogDescription>
                    Anda akan menghapus "{title}" secara permanen!
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
          disabled={loading}
          existingImage={image}
          onFileUpload={(file) => setImage(file[0])}
        />
      </div>

      <div className="flex flex-col gap-3">
        <Label>Caption Gambar</Label>
        <Input
          className="text-sm lg:text-base"
          disabled={loading}
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-3">
        <Label>Judul Donasi</Label>
        <Input
          className="text-sm lg:text-base"
          disabled={loading}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-3">
        <Label>Biaya Per</Label>
        <Select
          value={category}
          onValueChange={(value) => setCategory(value)}
          disabled={loading}
        >
          <SelectTrigger className="cursor-pointer">
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

      <div className="flex flex-col gap-3">
        <Label>Deskripsi</Label>
        <Textarea
          className="text-sm lg:text-base"
          value={desc}
          rows={4}
          disabled={loading}
          onChange={(e) => setDesc(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-3">
        <Label>Nominal</Label>
        <Input
          className="text-sm lg:text-base"
          disabled={loading}
          type="number"
          value={nominal}
          onChange={(e) => setNominal(e.target.value)}
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

export default DonationEdit;
