"use client";
import {
  HeartIcon,
  PaypalLogoIcon,
  ShieldIcon,
  WavesIcon,
  TrayIcon,
  EyeIcon,
} from "@phosphor-icons/react/dist/ssr";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, AlertCircle, Leaf, Heart } from "lucide-react";
import FormDonation from "./FormDonation";
import { useAutoTranslate } from "@/components/translate/useAutoTranslate";
import { useTranslation } from "../translate/TranslationContext";
import { useState } from "react";
import Link from "next/link";

const Donation = () => {
  const { translateText } = useTranslation();
  
  // Semua hooks dipanggil di awal, tidak kondisional
  const successMessage = useAutoTranslate("Bukti donasi Anda berhasil dikirim!");
  const successTitle = useAutoTranslate("Berhasil");
  const failedMessage = useAutoTranslate("Gagal mengirim bukti donasi. Silakan coba lagi.");
  const failedTitle = useAutoTranslate("Gagal");
  const headerText = useAutoTranslate("Selamatkan Penyu Indonesia dari Kepunahan");
  const introText = useAutoTranslate("Penyu adalah bagian penting dari ekosistem laut kita. Setiap tahunnya, ribuan penyu kehilangan habitat mereka akibat sampah plastik dan perburuan liar.");
  const impactText = useAutoTranslate("Donasi Anda akan membantu melindungi sarang penyu, membersihkan pantai, dan mengedukasi masyarakat lokal.");
  const chooseTypeText = useAutoTranslate("Pilih Jenis Donasi");
  const generalDonationTitle = useAutoTranslate("Donasi Umum");
  const generalDonationDesc = useAutoTranslate("Mendukung seluruh program konservasi Malipe di Pulau Maratua");
  const generalProgram1 = useAutoTranslate("Program konservasi penyu");
  const generalProgram2 = useAutoTranslate("Pembersihan pantai");
  const generalProgram3 = useAutoTranslate("Edukasi masyarakat");
  const nestDonationTitle = useAutoTranslate("Donasi Khusus Sarang");
  const nestDonationDesc = useAutoTranslate("Khusus untuk patroli dan perawatan sarang penyu di Pulau Balembangan");
  const nestProgram1 = useAutoTranslate("Patroli sarang 24/7");
  const nestProgram2 = useAutoTranslate("Pemantauan telur hingga menetas");
  const nestProgram3 = useAutoTranslate("Laporan perkembangan berkala melalui email");
  const benefitTitle = useAutoTranslate("Benefit Khusus Donatur Sarang");
  const benefit1 = useAutoTranslate("Laporan perkembangan sarang secara berkala (foto & video)");
  const benefit2 = useAutoTranslate("Sertifikat partisipasi konservasi penyu digital");
  const benefit3 = useAutoTranslate("Update khusus saat telur menetas dan tukik dilepas ke laut");
  const donateGeneralBtn = useAutoTranslate("Donasi Umum via PayPal");
  const donateNestBtn = useAutoTranslate("Donasi Khusus Sarang via PayPal");
  const selectTypeMsg = useAutoTranslate("Pilih jenis donasi di atas untuk melanjutkan");
  const paymentMethodText = useAutoTranslate("Metode Pembayaran:");
  const impactTitle = useAutoTranslate("Dampak Donasi Anda");
  const impact1 = useAutoTranslate("Melindungi dan memantau sarang penyu di pantai Maratua dan Balembangan");
  const impact2 = useAutoTranslate("Program pembersihan pantai dari sampah plastik");
  const impact3 = useAutoTranslate("Edukasi masyarakat tentang konservasi penyu");
  const impact4 = useAutoTranslate("Patroli 24 jam untuk melindungi telur dari predator dan pencurian");
  
  const [alert, setAlert] = useState({ type: "", message: "" });
  const [selectedType, setSelectedType] = useState(""); // '' | 'general' | 'nest'

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
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden">
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
              {headerText}
            </p>
          </div>
        </div>

        {/* Konten utama */}
        <div className="p-8">
          <div className="mb-8 text-center">
            <p className="text-gray-700 leading-relaxed mb-4">
              {introText}
            </p>
            <p className="text-gray-700 leading-relaxed font-semibold">
              {impactText}
            </p>
          </div>

          {/* Pilihan Jenis Donasi */}
          <div className="mb-8">
            <h3 className="font-bold text-gray-800 mb-4 text-center text-xl">
              {chooseTypeText}
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Donasi Umum */}
              <div
                onClick={() => setSelectedType("general")}
                className={`cursor-pointer border-2 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg ${
                  selectedType === "general"
                    ? "border-teal-500 bg-teal-50 shadow-md"
                    : "border-gray-200 bg-white hover:border-teal-300"
                }`}
              >
                <div className="flex flex-col items-center text-center">
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
                      selectedType === "general"
                        ? "bg-teal-500 text-white"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    <Heart className="w-8 h-8" />
                  </div>
                  <h4 className="font-bold text-lg mb-2 text-gray-800">
                    {generalDonationTitle}
                  </h4>
                  <p className="text-sm text-gray-600 mb-4">
                    {generalDonationDesc}
                  </p>
                  <div className="space-y-2 text-left w-full">
                    <div className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-teal-500 rounded-full mt-1.5 flex-shrink-0"></div>
                      <p className="text-xs text-gray-600">
                        {generalProgram1}
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-teal-500 rounded-full mt-1.5 flex-shrink-0"></div>
                      <p className="text-xs text-gray-600">
                        {generalProgram2}
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-teal-500 rounded-full mt-1.5 flex-shrink-0"></div>
                      <p className="text-xs text-gray-600">
                        {generalProgram3}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Donasi Khusus Sarang */}
              <div
                onClick={() => setSelectedType("nest")}
                className={`cursor-pointer border-2 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg ${
                  selectedType === "nest"
                    ? "border-green-500 bg-green-50 shadow-md"
                    : "border-gray-200 bg-white hover:border-green-300"
                }`}
              >
                <div className="flex flex-col items-center text-center">
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
                      selectedType === "nest"
                        ? "bg-green-500 text-white"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    <Leaf className="w-8 h-8" />
                  </div>
                  <h4 className="font-bold text-lg mb-2 text-gray-800">
                    {nestDonationTitle}
                  </h4>
                  <p className="text-sm text-gray-600 mb-4">
                    {nestDonationDesc}
                  </p>
                  <div className="space-y-2 text-left w-full">
                    <div className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 flex-shrink-0"></div>
                      <p className="text-xs text-gray-600">
                        {nestProgram1}
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 flex-shrink-0"></div>
                      <p className="text-xs text-gray-600">
                        {nestProgram2}
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 flex-shrink-0"></div>
                      <p className="text-xs text-gray-600">
                        {nestProgram3}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Benefit untuk Donatur Sarang */}
          {selectedType === "nest" && (
            <div className="mb-6 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
              <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                <EyeIcon className="w-5 h-5 text-green-600" />
                {benefitTitle}
              </h4>
              <div className="space-y-2">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-700">
                    {benefit1}
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-700">
                    {benefit2}
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-700">
                    {benefit3}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Tombol Donasi */}
          {selectedType && (
            <div className="mb-6">
              <FormDonation
                onSuccess={handleSuccess}
                onError={handleError}
                donationType={selectedType}
                trigger={
                  <button
                    className={`w-full cursor-pointer py-4 rounded-xl font-bold text-lg transition-all duration-300 transform shadow-lg flex items-center justify-center gap-2 ${
                      selectedType === "general"
                        ? "bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:from-teal-500 hover:via-teal-600 hover:to-teal-700 text-white"
                        : "bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:from-green-500 hover:via-green-600 hover:to-green-700 text-white"
                    }`}
                  >
                    <HeartIcon className="w-6 h-6" />
                    {selectedType === "general" ? donateGeneralBtn : donateNestBtn}
                  </button>
                }
              />
            </div>
          )}

          {!selectedType && (
            <div className="mb-6 text-center py-8 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
              <TrayIcon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500 font-medium">
                {selectTypeMsg}
              </p>
            </div>
          )}

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
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
            <p className="text-sm text-gray-600 mb-2">
              {paymentMethodText}
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
          <div className="mt-8 bg-gradient-to-br from-teal-50 to-green-50 rounded-xl p-6">
            <h3 className="font-bold text-gray-800 mb-4 text-center">
              {impactTitle}
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700 text-sm">
                  {impact1}
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700 text-sm">
                  {impact2}
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700 text-sm">
                  {impact3}
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700 text-sm">
                  {impact4}
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