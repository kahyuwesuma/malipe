"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import logo_ylbkd from "@/asset/home/logo-300x124.webp";
import { useAutoTranslate } from "../translate/useAutoTranslate";
import { EnvelopeSimpleIcon, FacebookLogoIcon, InstagramLogoIcon, MapPinIcon, WhatsappLogoIcon, YoutubeLogoIcon } from "@phosphor-icons/react/dist/ssr";

const Footer = () => {
  const navLinks = [
    { label: useAutoTranslate("Beranda"), href: "/" },
    { label: useAutoTranslate("Tentang Kami"), href: "/tentang-kami" },
    { label: useAutoTranslate("Berita"), href: "/berita" },
    { label: useAutoTranslate("Ekowisata"), href: "/ekowisata" },
    { label: useAutoTranslate("Galeri"), href: "/galeri" },
    { label: useAutoTranslate("Publikasi"), href: "/publikasi" },
    { label: useAutoTranslate("Kontak Kami"), href: "/kontak-kami" },
  ];

  const contactInfo = [
    {
      label: "Malipemaratuapedulipenyu@gmail.com",
      href: "mailto:Malipemaratuapedulipenyu@gmail.com",
      icon: EnvelopeSimpleIcon,
      type: "email",
    },
    {
      label: "Malipe",
      href: "https://wa.me/6282213324114?text=Hallo...",
      icon: WhatsappLogoIcon,
      type: "website",
    },
    {
      label: "Maratua Peduli Penyu",
      href: "https://www.facebook.com/maratuapedulipenyu",
      icon: FacebookLogoIcon,
      type: "website",
    },
    {
      label: "@maratuapedulipenyu",
      href: "https://www.instagram.com/maratuapedulipenyu",
      icon: InstagramLogoIcon,
      type: "website",
    },
    {
      label: "MALIPE (Maratua Peduli Penyu)",
      href: "https://www.youtube.com/@malipemaratuapedulipenyu791",
      icon: YoutubeLogoIcon,
      type: "website",
    },
  ];

  return (
    <footer className="relative w-full overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50">
        <div className="absolute inset-0 opacity-30">
          <svg
            className="absolute bottom-0 w-full h-20"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,60 C150,100 350,20 600,60 C850,100 1050,20 1200,60 L1200,120 L0,120 Z"
              fill="rgba(59, 130, 246, 0.1)"
            />
          </svg>
          <svg
            className="absolute bottom-0 w-full h-16"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,80 C200,40 400,120 600,80 C800,40 1000,120 1200,80 L1200,120 L0,120 Z"
              fill="rgba(6, 182, 212, 0.08)"
            />
          </svg>
        </div>
      </div>

      <div className="relative z-10 px-4 sm:px-6 lg:px-14 font-AktivGrotesk-Regular">
        <div className="max-w-7xl mx-auto">
          <div className="pt-10 lg:pt-16 pb-12">
            <div className="grid grid-cols-1 lg:grid-cols-10 gap-10 lg:gap-8">
              <div className="lg:col-span-6 space-y-6">
                <div className="flex flex-col items-start lg:flex-row lg:items-center gap-6">
                  <Image
                    src={logo_ylbkd}
                    alt="Logo YLBKD"
                    width={180}
                    height={60}
                    className="h-14 w-auto"
                  />
                  <p className="text-gray-700 leading-relaxed max-w-sm">
                    {useAutoTranslate(
                      "Berdedikasi untuk pelestarian ekosistem laut dan darat melalui pendekatan kolaboratif dan berkelanjutan di Indonesia."
                    )}
                  </p>
                </div>
                <div className="mt-10">
                  <h3 className="font-semibold text-gray-900 lg:mb-3 mb-2 text-lg font-AktivGrotesk-Regular">
                    {useAutoTranslate("Navigasi")}
                  </h3>
                  <ul className="flex flex-col lg:flex-row gap-2">
                    {navLinks.map((link, idx) => (
                      <li
                        key={idx}
                        className="flex gap-2 font-AktivGrotesk-Light text-gray-600"
                      >
                        <Link
                          href={link.href}
                          className="text-gray-600 hover:text-blue-600 transition-colors duration-200 items-center group font-AktivGrotesk-Regular"
                        >
                          {link.label}
                        </Link>
                        <span className="hidden lg:block">|</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-5 mt-10">
                  <div>
                    <h3 className="font-semibold capitalize text-gray-900 mb-3 text-lg font-AktivGrotesk-Regular">
                      {useAutoTranslate("Lokasi Kami")}
                    </h3>
                    <div className="flex items-start gap-3 text-gray-600">
                      <div className="w-10 h-10 bg-white/60 backdrop-blur-sm rounded-xl flex items-center justify-center border border-blue-100">
                        <MapPinIcon className="w-5 h-5" />
                      </div>
                      <address className="not-italic leading-relaxed lg:pt-2 flex-1 font-AktivGrotesk-Regular">
                        AKB. Sanipah 1 Gang. 3 No. 30 RT. 19
                        <br />
                        Kel. Bugis, Kec. Tanjung Redeb,
                        <br />
                        Kabupaten Berau, Kalimantan Timur,
                        <br />
                        Indonesia
                      </address>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col-reverse lg:flex-col">
                <div className="bg-white/60 h-fit w-fit mt-10 lg:mt-0 backdrop-blur-sm rounded-2xl p-6 border border-blue-100 shadow-sm">
                  <h3 className="font-semibold text-gray-900 font-AktivGrotesk-Regular">
                    {useAutoTranslate("Dukung Yayasan Kami")}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 font-AktivGrotesk-Regular">
                    {useAutoTranslate(
                      "Setiap kontribusi membantu melindungi keajaiban bawah laut Indonesia"
                    )}
                  </p>
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-medium py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 font-AktivGrotesk-Regular">
                    <Link
                      href="/donasi"
                      className="flex items-center justify-center gap-2"
                    >
                      {useAutoTranslate("Donasi Sekarang")}
                    </Link>
                  </Button>
                </div>

                <div className="flex flex-col lg:items-end lg:mt-10">
                  <h3 className="font-semibold capitalize text-gray-900 mb-3 text-lg font-AktivGrotesk-Regular">
                    {useAutoTranslate("Hubungi Kami")}
                  </h3>
                  <div className="space-y-4">
                    {contactInfo.map((contact) => {
                      const IconComponent = contact.icon;
                      return (
                        <a
                          key={contact.href}
                          href={contact.href}
                          target={
                            contact.type === "website" ? "_blank" : undefined
                          }
                          rel={
                            contact.type === "website"
                              ? "noopener noreferrer"
                              : undefined
                          }
                          className="flex items-start flex-row-reverse lg:flex-row gap-3 text-gray-600 hover:text-blue-600 transition-colors duration-200 group font-AktivGrotesk-Regular"
                        >
                          <div className="flex-1 pt-2">
                            <span className="break-words flex lg:justify-end leading-relaxed">
                              {contact.label}
                            </span>
                          </div>
                          <div className="w-10 h-10 bg-white/60 backdrop-blur-sm rounded-xl flex items-center justify-center border border-blue-100 group-hover:border-blue-200 group-hover:bg-blue-50/60 transition-all duration-200">
                            <IconComponent className="w-5 h-5" />
                          </div>
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-blue-200/50 py-8">
            <div className="text-sm text-gray-600 font-AktivGrotesk-Regular">
              <div className="flex justify-start md:justify-center">
                <p className="text-left md:text-center">
                  &copy; {new Date().getFullYear()}{" "}
                  {useAutoTranslate("MALIPE. Seluruh hak cipta dilindungi.")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
