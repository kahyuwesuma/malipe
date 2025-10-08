"use client";
import {
  HeartIcon,
  PaypalLogoIcon,
  ShieldIcon,
  WavesIcon,
} from "@phosphor-icons/react/dist/ssr";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, AlertCircle } from "lucide-react";
import FormDonation from "./FormDonation";
import { useAutoTranslate } from "@/components/translate/useAutoTranslate";
import { useTranslation } from "../translate/TranslationContext";
import { useState } from "react";
import Link from "next/link";

const Donation = () => {
  const { translateText } = useTranslation();
  const successMessage = useAutoTranslate("Bukti donasi Anda berhasil dikirim!")
  const successTitle = useAutoTranslate("Berhasil")
  const failedMessage = useAutoTranslate("Gagal mengirim bukti donasi. Silakan coba lagi.")
  const failedTitle = useAutoTranslate("Gagal")
  const [alert, setAlert] = useState({ type: "", message: "" });

  const handleSuccess = () => {
    setAlert({
      type: "success",
      message: successMessage,
    });
  };
  
  const handleError = () => {
    setAlert({
      type: "error",
      message: failedMessage,
    });
  };  

  return (
    <div className="min-h-screen py-20 bg-gradient-to-br font-AktivGrotesk-Regular flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-100 via-green-200 to-green-100 p-8 text-black relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <WavesIcon className="absolute top-4 right-4 w-32 h-32" />
            <WavesIcon className="absolute bottom-4 left-4 w-24 h-24" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center justify-center mb-4">
              <ShieldIcon className="w-16 h-16" />
            </div>
            <h1 className="text-3xl font-bold text-center mb-2">
              Maratua Peduli Penyu
            </h1>
            <p className="text-center text-zinc-700 text-lg">
              {useAutoTranslate("Selamatkan Penyu Indonesia dari Kepunahan")}
            </p>
          </div>
        </div>

        {/* Konten utama */}
        <div className="p-8">
          <div className="mb-8 text-center">
            <p className="text-gray-700 leading-relaxed mb-4">
              {useAutoTranslate(
                "Penyu adalah bagian penting dari ekosistem laut kita. Setiap tahunnya, ribuan penyu kehilangan habitat mereka akibat sampah plastik dan perburuan liar."
              )}
            </p>
            <p className="text-gray-700 leading-relaxed font-semibold">
              {useAutoTranslate(
                "Donasi Anda akan membantu melindungi sarang penyu, membersihkan pantai, dan mengedukasi masyarakat lokal."
              )}
            </p>
          </div>

          {/* Tombol donasi */}
          <div className="mb-6">
            <FormDonation
              onSuccess={handleSuccess}
              onError={handleError}
              trigger={
                <button
                  className="w-full cursor-pointer bg-gradient-to-r from-green-100 via-green-200 to-green-300 text-black py-4 rounded-xl font-bold text-lg hover:from-green-200 hover:via-green-300 hover:to-green-400 transition-colors duration-300 transform shadow-lg flex items-center justify-center gap-2"
                >
                  <HeartIcon className="w-6 h-6" />
                  {useAutoTranslate("Donasi Sekarang via PayPal")}
                </button>
              }
            />
          </div>

          {/* Alert */}
          {alert.type === "success" && (
            <Alert className="mb-4 border-green-300 bg-green-50">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <AlertTitle className="font-semibold text-green-700">
                {successTitle}
              </AlertTitle>
              <AlertDescription>{alert.message}</AlertDescription>
            </Alert>
          )}
          {alert.type === "error" && (
            <Alert className="mb-4 border-red-300 bg-red-50">
              <AlertCircle className="h-5 w-5 text-red-600" />
              <AlertTitle className="font-semibold text-red-700">
                {failedTitle}
              </AlertTitle>
              <AlertDescription>{alert.message}</AlertDescription>
            </Alert>
          )}

          {/* Info PayPal */}
          <div className="bg-teal-50 border border-teal-200 rounded-lg p-4 text-center">
            <p className="text-sm text-gray-600 mb-2">
              {useAutoTranslate("Metode Pembayaran:")}
            </p>
            <div className="flex items-center justify-center">
              <Link
                href="https://www.paypal.com/paypalme/Malipe2021"
                target="_blank"
                className="hover:scale-110 transition-all"
              >
                <PaypalLogoIcon size={40} />
              </Link>
            </div>
          </div>

          {/* Dampak donasi */}
          <div className="mt-8 bg-teal-50 rounded-xl p-6">
            <h3 className="font-bold text-gray-800 mb-4 text-center">
              {useAutoTranslate("Dampak Donasi Anda")}
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700 text-sm">
                  {useAutoTranslate(
                    "Melindungi dan memantau sarang penyu di pantai Maratua"
                  )}
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700 text-sm">
                  {useAutoTranslate("Program pembersihan pantai dari sampah plastik")}
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700 text-sm">
                  {useAutoTranslate("Edukasi masyarakat tentang konservasi penyu")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donation;
