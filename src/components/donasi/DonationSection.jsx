"use client";
import Image from "next/image";
import { Card, CardContent } from "../ui/card";
import { AspectRatio } from "../ui/aspect-ratio";
import { useEffect, useState } from "react";
import { fetchAllDonations } from "@/utils/fetch/fecthDatabase";
import { SpinnerIcon } from "@phosphor-icons/react/dist/ssr";
import { motion } from "framer-motion";
import { useAutoTranslate } from "../translate/useAutoTranslate";
import { useTranslation } from "../translate/TranslationContext";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Alert, AlertDescription } from "../ui/alert";
import { Upload, CheckCircle, AlertCircle } from "lucide-react";

// ============= DONATION FORM MODAL COMPONENT =============
const DonationFormModal = ({ item, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    amount: "",
    message: "",
    proofImage: null,
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError("Ukuran file maksimal 5MB");
        return;
      }
      setFormData((prev) => ({ ...prev, proofImage: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Validasi
      if (!formData.name || !formData.email || !formData.amount) {
        throw new Error("Mohon lengkapi data wajib (Nama, Email, Jumlah Donasi)");
      }

      if (!formData.proofImage) {
        throw new Error("Mohon upload bukti transfer");
      }

      // Upload image ke Supabase Storage
      const fileExt = formData.proofImage.name.split(".").pop();
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
      
      const formDataToSend = new FormData();
      formDataToSend.append("file", formData.proofImage);
      formDataToSend.append("fileName", fileName);

      // Upload ke storage
      const uploadRes = await fetch("/api/upload-donation-proof", {
        method: "POST",
        body: formDataToSend,
      });

      if (!uploadRes.ok) throw new Error("Gagal upload bukti");

      const { url: imageUrl } = await uploadRes.json();

      // Simpan data donasi ke database
      const donationData = {
        donor_name: formData.name,
        donor_email: formData.email,
        donor_phone: formData.phone || null,
        donation_package_id: item.id,
        donation_package_title: item.translatedTitle || item.title,
        amount: parseFloat(formData.amount),
        message: formData.message || null,
        proof_image_url: imageUrl,
        status: "pending",
        created_at: new Date().toISOString(),
      };

      const saveRes = await fetch("/api/save-donation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(donationData),
      });

      if (!saveRes.ok) throw new Error("Gagal menyimpan data donasi");

      setSuccess(true);
      
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 3000);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardContent className="p-6">
          {success ? (
            <div className="flex flex-col items-center justify-center py-12 gap-4">
              <CheckCircle className="w-16 h-16 text-green-500" />
              <h3 className="text-2xl font-AktivGrotesk-Medium text-center">
                Donasi Berhasil Dikirim!
              </h3>
              <p className="text-center text-muted-foreground">
                Terima kasih atas donasi Anda. Tim kami akan menghubungi Anda segera melalui email.
              </p>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-AktivGrotesk-Medium mb-2">
                    Form Donasi
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {item.translatedTitle || item.title}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </Button>
              </div>

              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-4">
                {/* Nama */}
                <div>
                  <Label htmlFor="name">
                    Nama Lengkap <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Masukkan nama lengkap"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <Label htmlFor="email">
                    Email <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="email@example.com"
                    required
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Email akan digunakan untuk update perkembangan sarang
                  </p>
                </div>

                {/* Phone */}
                <div>
                  <Label htmlFor="phone">Nomor Telepon (Opsional)</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+62 xxx xxxx xxxx"
                  />
                </div>

                {/* Amount */}
                <div>
                  <Label htmlFor="amount">
                    Jumlah Donasi (USD) <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="amount"
                    name="amount"
                    type="number"
                    step="0.01"
                    value={formData.amount}
                    onChange={handleInputChange}
                    placeholder="0.00"
                    required
                  />
                </div>

                {/* PayPal Link */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <Label className="mb-2 block">Link PayPal:</Label>
                  <a
                    href="https://www.paypal.com/paypalme/Malipe2021"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline font-medium"
                  >
                    https://www.paypal.com/paypalme/Malipe2021
                  </a>
                  <p className="text-xs text-muted-foreground mt-2">
                    Klik link di atas untuk melakukan donasi via PayPal, lalu upload bukti transfer di bawah
                  </p>
                </div>

                {/* Upload Proof */}
                <div>
                  <Label htmlFor="proofImage">
                    Bukti Transfer <span className="text-red-500">*</span>
                  </Label>
                  <div className="mt-2">
                    <label
                      htmlFor="proofImage"
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50"
                    >
                      {previewImage ? (
                        <img
                          src={previewImage}
                          alt="Preview"
                          className="h-full object-contain"
                        />
                      ) : (
                        <div className="flex flex-col items-center">
                          <Upload className="w-8 h-8 text-gray-400" />
                          <p className="text-sm text-gray-500 mt-2">
                            Klik untuk upload bukti transfer
                          </p>
                          <p className="text-xs text-gray-400">
                            PNG, JPG, JPEG (Max 5MB)
                          </p>
                        </div>
                      )}
                    </label>
                    <input
                      id="proofImage"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      required
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <Label htmlFor="message">Pesan (Opsional)</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tulis pesan Anda..."
                    rows={3}
                  />
                </div>

                {/* Submit Button */}
                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onClose}
                    className="flex-1"
                  >
                    Batal
                  </Button>
                  <Button
                    type="button"
                    onClick={handleSubmit}
                    disabled={loading}
                    className="flex-1"
                  >
                    {loading ? "Mengirim..." : "Kirim Donasi"}
                  </Button>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

// ============= MAIN DONATION SECTION COMPONENT =============
const DonationSection = () => {
  const [donations, setDonations] = useState([]);
  const [translatedDonations, setTranslatedDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usdValues, setUsdValues] = useState({});
  const [selectedDonation, setSelectedDonation] = useState(null);

  const { translateText } = useTranslation();

  const translatedDonasi = useAutoTranslate("Donasi");
  const translatedBelumAdaPaket = useAutoTranslate("Belum ada paket donasi");
  const translatedTidakAdaGambar = useAutoTranslate("Tidak ada gambar");

  // Load data donasi
  useEffect(() => {
    const loadData = async () => {
      const result = await fetchAllDonations();
      setDonations(result);
      setLoading(false);
    };
    loadData();
  }, []);

  // Translate title + kategori
  useEffect(() => {
    const translateContent = async () => {
      if (donations.length > 0) {
        const translated = await Promise.all(
          donations.map(async (item) => {
            const translatedTitle = await translateText(item.title);
            const translatedCategory = await translateText(
              item.category || "Lainnya"
            );

            let idrSuffix = "";
            if (item.category?.toLowerCase() === "acara") {
              idrSuffix = await translateText("/Acara");
            } else if (item.category?.toLowerCase() === "minggu") {
              idrSuffix = await translateText("/Pekan");
            } else if (item.category?.toLowerCase() === "patroli") {
              idrSuffix = await translateText("/Patroli");
            }

            return {
              ...item,
              translatedTitle,
              translatedCategory,
              translatedIdrSuffix: idrSuffix,
            };
          })
        );
        setTranslatedDonations(translated);
      }
    };
    translateContent();
  }, [donations, translateText]);

  // Fetch konversi IDR → USD
  useEffect(() => {
    const fetchUsdValues = async () => {
      const results = {};
      for (const item of donations) {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_CURRENCY_CONVERT}amount=${item.nominal}&from=IDR&to=USD`
          );
          const data = await res.json();
          if (data && data.rates && data.rates.USD) {
            results[item.id] = data.rates.USD;
          }
        } catch (err) {
          console.error("Gagal fetch USD:", err);
        }
      }
      setUsdValues(results);
    };

    if (donations.length > 0) {
      fetchUsdValues();
    }
  }, [donations]);

  if (loading)
    return (
      <div className="text-center h-[80vh] text-sm text-muted-foreground flex justify-center items-center">
        <SpinnerIcon className="animate-spin" size={42} />
      </div>
    );

  if (!loading && translatedDonations.length === 0)
    return (
      <div className="w-full lg:mb-28 mb-16 lg:my-10 my-3">
        <div className="absolute z-20 w-full lg:px-12 px-2">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="w-full max-w-[290px]"
          >
            <Card className="rounded-4xl lg:px-5">
              <CardContent className="lg:pt-7 pt-4 flex flex-col gap-10">
                <h1 className="text-3xl font-AktivGrotesk-Medium">
                  {translatedDonasi}
                </h1>
                <div className="flex justify-center items-center font-AktivGrotesk-Regular pb-52">
                  <span>{translatedBelumAdaPaket}</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    );

  return (
    <div className="w-full lg:mb-28 mb-16 lg:my-10 my-3">
      <div className="z-20 lg:px-10 px-4">
        <Card className="rounded-4xl lg:px-5 px-1">
          <CardContent className="lg:py-7 py-5 flex flex-col gap-5">
            <h1 className="text-3xl font-AktivGrotesk-Medium">
              {translatedDonasi}
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {translatedDonations.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="w-full max-w-none mx-auto"
                >
                  <button
                    onClick={() => setSelectedDonation(item)}
                    className="group block h-full w-full text-left"
                  >
                    <Card className="h-full py-0 border-0 shadow-none flex flex-col rounded-t-3xl rounded-b-none overflow-hidden transition-all duration-200 group-hover:scale-[1.02]">
                      {/* Image Container */}
                      <div className="relative">
                        <AspectRatio ratio={2 / 3}>
                          <div className="w-full h-full">
                            {item.image ? (
                              <Image
                                src={item.image}
                                width={1000}
                                height={1000}
                                className="w-full h-full object-cover"
                                alt={item.title}
                              />
                            ) : (
                              <div className="font-AktivGrotesk-Regular w-full h-full flex items-center justify-center text-xs text-zinc-500">
                                {translatedTidakAdaGambar}
                              </div>
                            )}
                          </div>
                        </AspectRatio>
                      </div>

                      {/* Content Container */}
                      <div className="flex flex-col justify-between">
                        <div className="flex flex-col gap-2">
                          <h3 className="font-AktivGrotesk-Medium text-lg leading-tight line-clamp-2 text-gray-900">
                            {item.translatedTitle || item.title}
                          </h3>

                          <div className="flex flex-col gap-1.5">
                            <span className="font-AktivGrotesk-Bold text-lg capitalize text-gray-900">
                              IDR {item.nominal.toLocaleString("id-ID")}
                              {item.translatedIdrSuffix}
                            </span>
                            <span className="font-AktivGrotesk-Regular text-sm text-gray-500">
                              USD $
                              {usdValues[item.id]
                                ? `${usdValues[item.id].toFixed(2)}${
                                    item.category?.toLowerCase() === "acara"
                                      ? "/Event"
                                      : item.category?.toLowerCase() ===
                                        "minggu"
                                      ? "/Week"
                                      : item.category?.toLowerCase() ===
                                        "patroli"
                                      ? "/Patrol"
                                      : ""
                                  }`
                                : ""}
                            </span>
                          </div>
                        </div>

                        <div className="mt-4 pt-3">
                          <span className="text-xs text-muted-foreground/70 font-AktivGrotesk-Regular flex items-center gap-1">
                            Klik untuk donasi
                            <svg
                              className="w-3 h-3 transform group-hover:translate-x-1 transition-transform duration-300"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </Card>
                  </button>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modal Form */}
      {selectedDonation && (
        <DonationFormModal
          item={selectedDonation}
          onClose={() => setSelectedDonation(null)}
        />
      )}
    </div>
  );
};

export default DonationSection;