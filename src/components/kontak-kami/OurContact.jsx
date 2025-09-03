"use client";
import { useState } from "react";
import { MapPin, Mail, Globe, Send, User, MessageSquare } from "lucide-react";
import { Button } from "../ui/button";
import { useAutoTranslate } from "../translate/useAutoTranslate";

const OurContact = () => {
  const contactInfo = [
    {
      icon: MapPin,
      title: useAutoTranslate("Alamat Kantor"),
      content: [
        "Jl. AMD, Gg. 5, Kel. Lempake",
        "Kec. Samarinda Utara",
        "Kota Samarinda, Provinsi Kalimantan Timur",
        "Indonesia",
      ],
    },
    {
      icon: Mail,
      title: useAutoTranslate("Email Kami"),
      content: ["yayasan.lautbiruderawan@gmail.com"],
      action: "mailto:yayasan.lautbiruderawan@gmail.com",
    },
    {
      icon: Globe,
      title: "Website",
      content: ["ylbkd.or.id"],
      action: "https://ylbkd.or.id",
    },
    {
      icon: Mail,
      title: useAutoTranslate("Direktur Indonesia Global Conservation"),
      content: ["dadang@globalconservation.org"],
      action: "mailto:dadang@globalconservation.org",
    },
    {
      icon: Globe,
      title: "Global Conservation",
      content: ["globalconservation.org"],
      action: "https://globalconservation.org",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center font-WhitneyMedium">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              {useAutoTranslate("Hubungi Kami")}
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed" id="contact">
              {useAutoTranslate(
                "Kami siap membantu Anda dalam upaya konservasi lingkungan laut dan darat. Jangan ragu untuk menghubungi kami untuk kemitraan, informasi, atau pertanyaan lainnya."
              )}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-AktivGrotesk-Regular">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 h-full">
            <h2 className="text-2xl sm:text-3xl font-AktivGrotesk-Medium text-gray-900 mb-6">
              {useAutoTranslate("Informasi Kontak")}
            </h2>

            <div className="space-y-6">
              {contactInfo.map((info, index) => {
                const IconComponent = info.icon;
                return (
                  <div
                    key={index}
                    className="flex items-start gap-4 lg:p-4 py-2 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {info.title}
                      </h3>
                      <div className="text-gray-600">
                        {info.content.map((line, idx) => (
                          <div key={idx} className="mb-1 last:mb-0">
                            {info.action ? (
                              <a
                                href={info.action}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 text-sm sm:text-base hover:text-blue-800 hover:underline transition-colors duration-200"
                              >
                                {line}
                              </a>
                            ) : (
                              <span>{line}</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white rounded-2xl font-AktivGrotesk-Regular shadow-xl p-6 sm:p-8 lg:p-10 h-full flex flex-col">
            <div className="mb-8">
              <h2 className="text-2xl sm:text-3xl font-AktivGrotesk-Medium text-gray-900 mb-2">
                {useAutoTranslate("Kirim Pesan")}
              </h2>
              <p className="text-gray-600">
                {useAutoTranslate("Isi form di bawah ini dan kami akan segera merespon pesan Anda.")}
              </p>
            </div>
            <form
              action="https://formsubmit.co/yayasan.lautbiruderawan@gmail.com"
              method="POST"
              target="_blank"
              className="space-y-6"
            >
              <input
                type="hidden"
                name="_subject"
                value="Pesan Baru dari Formulir Kontak"
              />
              <input type="hidden" name="_captcha" value="false" />

              <div>
                <label
                  htmlFor="name"
                  className="block text-sm text-gray-700 mb-2"
                >
                  {useAutoTranslate("Nama Lengkap")} *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder={useAutoTranslate("Masukkan nama lengkap Anda")}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm text-gray-700 mb-2"
                >
                  {useAutoTranslate("Email Anda")}*
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder={useAutoTranslate("nama@email.com")}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm text-gray-700 mb-2"
                >
                  {useAutoTranslate("Subjek")} *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  placeholder={useAutoTranslate("Topik pesan Anda")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm text-gray-700 mb-2"
                >
                  {useAutoTranslate("Pesan")} *
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-4 text-gray-400 w-5 h-5" />
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    placeholder={useAutoTranslate("Tulis pesan Anda di sini...")}
                    className="w-full min-h-[160px] pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500 resize-y"
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                {useAutoTranslate("Kirim Pesan")}
              </Button>
            </form>
          </div>
        </div>

        <div className="w-full">
          <div className="bg-gradient-to-br font-AktivGrotesk-Regular from-blue-600 to-green-600 rounded-2xl shadow-xl p-6 sm:p-8 text-white">
            <h3 className="text-xl sm:text-2xl font-bold mb-4 capitalize">
              {useAutoTranslate("Dukung Yayasan Kami")}
            </h3>
            <div className="space-y-4">
              <p className="text-blue-100 leading-relaxed">
                <strong className="text-white uppercase">
                  {useAutoTranslate("BERSAMA, KITA BISA MENJAGA LAUT DAN PESISIR PALING BERNILAI DI INDONESIA.")}
                </strong>
              </p>
              <p className="text-blue-200 leading-relaxed">
                {useAutoTranslate("Setiap kontribusi Anda langsung mendukung rangers dan masyarakat lokal yang bekerja di garis depan untuk melindungi ekosistem laut dan spesies yang terancam punah.")}
              </p>
              <Button className="mt-5 bg-white text-blue-600 hover:bg-blue-50 font-semibold py-6 px-8 rounded-lg transition-all duration-200">
                <a
                  href="/donasi"
                  className="flex items-center capitalize justify-center gap-2"
                >
                  💙 {useAutoTranslate("Donasi Sekarang")}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurContact;
