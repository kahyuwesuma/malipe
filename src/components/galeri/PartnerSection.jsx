"use client"
import Image from "next/image";
import Link from "next/link";
import { AspectRatio } from "../ui/aspect-ratio";
import Unk from "@/asset/kemitraan/unk.png";
import logo1 from "@/asset/kemitraan/GC.png";
import logo2 from "@/asset/kemitraan/PS.png";
import logo3 from "@/asset/kemitraan/DKPK.png";
import logo4 from "@/asset/kemitraan/DKPB.png"
import logo5 from "@/asset/kemitraan/PSDKP.png";
import logo6 from "@/asset/kemitraan/DPPK.png";
import logo7 from "@/asset/kemitraan/TNIAL.png";
import logo8 from "@/asset/kemitraan/BKSDA.png";
import logo9 from "@/asset/kemitraan/MALIPE.png";
import logo10 from "@/asset/kemitraan/POKMASWAS.png";
import logo11 from "@/asset/kemitraan/CP.png";
import logo12 from "@/asset/kemitraan/MAPRODIV.png";
import logo13 from "@/asset/kemitraan/POKDARWIS.png";
import logo14 from "@/asset/kemitraan/LPM.png";
import logo15 from "@/asset/kemitraan/PBLMB.png";
import logo17 from "@/asset/kemitraan/KNTB.png";
import logo18 from "@/asset/kemitraan/KNKM.png";
import logo19 from "@/asset/kemitraan/KNBPD.png";
import { useAutoTranslate } from "../translate/useAutoTranslate";

const PartnerSection = () => {
  const partnerCategories = [
    {
      title: useAutoTranslate("Mitra Utama"),
      partners: [
        {
          image: logo1,
          name: "Global Conservation"
        },
        {
          image: logo2,
          name: "ProtectedSeas"
        }
      ]
    },
    {
      title: useAutoTranslate("Mitra Strategis Pengawasan"),
      partners: [
        {
          image: logo3,
          name: "DKP Provinsi Kalimatan Timur"
        },
        {
          image: logo4,
          name: "DKP Kabupaten Berau"
        },
        {
          image: logo5,
          name: "PSDKP Kalimantan Timur dan Tarakan"
        },
        {
          image: logo6,
          name: "Direktorat Polairud Polda Kaltim"
        },
        {
          image: logo7,
          name: "TNI Angkatan Laut"
        }
      ]
    },
    {
      title: useAutoTranslate("Mitra Konservasi & Perlindungan Lingkungan"),
      partners: [
        {
          image: logo8,
          name: "Balai Konservasi Sumber Daya Alam Kalimantan Timur"
        },
        {
          image: logo9,
          name: "Maratua Peduli Penyu"
        },
        {
          image: logo10,
          name: "Maratua Peduli Lingkungan"
        },
        {
          image: logo11,
          name: "Coral Planteners"
        },
        {
          image: logo12,
          name: "Maratua Pro-dive Master"
        },
        {
          image: logo13,
          name: "PokDarWis Sumping Nusa"
        },
        {
          image: logo14,
          name: "Lembaga Pemberdayaan Masyarakat Pulau Derawan"
        },
        {
          image: logo15,
          name: "Pokmaswas Bina Lestari Muara Badak, Kutai Kartanegara"
        },
        // {
        //   image: Unk,
        //   name: "PokMasWas Biduk Biduk"
        // },
        // {
        //   image: Unk,
        //   name: "Forlika"
        // }
      ]
    },
    {
      title: useAutoTranslate("Mitra Pemberdayaan Masyarakat"),
      partners: [
        {
          image: logo17,
          name: "Kelompok Nelayan Tabung Maratua"
        },
        {
          image: logo18,
          name: "Kelompok Nelayan Kerapu Maratua"
        },
        {
          image: logo19,
          name: "Kelompok Nelayan Bubu Pulau Derawan"
        }
      ]
    }
  ];

  return (
    <div className="flex-1 py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 font-AktivGrotesk-Regular">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
            {useAutoTranslate("Kemitraan Strategis untuk Konservasi Berkelanjutan")}
          </h2>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
            {useAutoTranslate("Melalui kolaborasi dengan berbagai mitra strategis, kami membangun ekosistem konservasi yang kuat untuk melindungi keanekaragaman hayati laut di Kepulauan Derawan dan sekitarnya.")}
          </p>
        </div>

        <div className="space-y-16">
          {partnerCategories.map((category, categoryIdx) => (
            <div key={categoryIdx} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-ylbkd to-blue-400 px-8 py-6">
                <h3 className="text-2xl font-bold text-white">
                  {category.title}
                </h3>
              </div>
              <div className="p-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {category.partners.map((partner, partnerIdx) => (
                    <div
                      key={partnerIdx}
                      className="group flex flex-col items-center text-center p-6 rounded-xl border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all duration-300 bg-white hover:bg-blue-50"
                    >
                      <div className="mb-4 w-36 h-36 flex items-center justify-center">
                        <AspectRatio ratio={1} className="w-full">
                          <Image
                            src={partner.image}
                            alt={partner.name}
                            className="object-contain w-full h-full filter group-hover:brightness-110 transition-all duration-300"
                          />
                        </AspectRatio>
                      </div>
                      <h4 className="text-sm font-semibold text-gray-900 leading-tight group-hover:text-blue-700 transition-colors duration-300">
                        {partner.name}
                      </h4>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {useAutoTranslate("Bergabung dalam Misi Konservasi")}
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              {useAutoTranslate("Kami terbuka untuk menjalin kemitraan baru dengan organisasi yang memiliki visi serupa dalam melestarikan ekosistem laut Indonesia.")}
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-300 shadow-sm hover:shadow-md">
              <Link href="/kontak-kami" className="flex items-center justify-center">
              {useAutoTranslate("Hubungi Kami")}
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerSection;