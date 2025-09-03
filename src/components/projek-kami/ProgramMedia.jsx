import Image from "next/image";
import Link from "next/link";
import { AspectRatio } from "../ui/aspect-ratio";
import image1 from "@/asset/projek-kami/image1.jpg";
import { useAutoTranslate } from "../translate/useAutoTranslate";

const OurProject = () => {
  const program = [
    {
      image: image1,
      title:
        useAutoTranslate("Perlindungan Penyu"),
      desc:
        useAutoTranslate("Mendukung konservasi penyu di Pulau Balembangan dan Pulau Sangalaki melalui patroli, pengawasan, dan pemulihan habitat."),
    },
    {
      image: image1,
      title:
        useAutoTranslate("SMART Ocean Patrols"),
      desc:
        useAutoTranslate("Mendukung operasional aparat keamanan dan mitra terkait dalam patroli rutin dan bertarget di Kepulauan Derawan melawan Illegal, Unreported, and Unregulated Fishing (IUUF) dan pemburuan liar terhadap satwa dan turunannya yang dilindungi."),
    },
    {
      image: image1,
      title:
        useAutoTranslate("Pemberdayaan Nelayan"),
      desc:
        useAutoTranslate("Menyediakan alat tangkap yang ramah lingkungan guna mengurangi ketergantungan pada metode perikanan yang merusak."),
    },

    {
      image: image1,
      title:
        useAutoTranslate("Kawasan Konservasi Laut (MPA)"),
      desc:
        useAutoTranslate("Mendukung Dinas Kelautan dan Perikanan Kalimantan Timur dalam memperkuat regulasi di zona perlindungan bagi ekosistem laut, atau yang disebut dengan Berau Marine Protected Area."),
    },

    {
      image: image1,
      title:
        useAutoTranslate("Teknologi Konservasi"),
      desc:
        useAutoTranslate("Menghibahkan dan melatih aparat keamanan dan mitra terkait terkait dengan peralatan pengawas terkini untuk meningkatkan efektifitas dan efisiensi pemantauan serta respon cepat terhadap ancaman lingkungan."),
    }
  ];

  return (
    <div className="flex-1">
      <div className="text-[#3c3c3c] text-center w-full px-5">
        <h2 className="text-4xl font-semibold py-10 max-w-[800px] mx-auto">
          {useAutoTranslate("Kami mencari solusi untuk menghadapi tantangan terbesar yang dihadapi alam dan manusia saat ini")}
        </h2>
        <p className="font-AktivGrotesk-Regular mx-auto text-lg max-w-[1000px]">
          {useAutoTranslate("Dalam upaya menjaga keberlanjutan ekosistem pesisir dan laut di wilayah Kepulauan Derawan dan sekitarnya, berbagai langkah strategis telah diambil melalui program-program konservasi yang terfokus dan kolaboratif.")}
        </p>
      </div>

      <div className="mt-10 w-full px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {program.map((item, idx) => (
            <Link
              key={idx}
              href="#"
              className="group flex flex-col md:flex-row items-start gap-5 hover:bg-zinc-100 p-5 rounded-lg transition"
            >
              <div className="w-full md:w-[35%]">
                <AspectRatio ratio={4 / 3}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    className="object-cover w-full h-full rounded"
                  />
                </AspectRatio>
              </div>

              <div className="w-full md:w-[65%]">
                <h3 className="text-xl font-bold text-[#1a1a1a] mb-2 group-hover:text-blue-800 transition">
                  {item.title}
                </h3>
                <p className="text-sm md:text-base text-[#3c3c3c] leading-relaxed">
                  {item.desc}
                  {"   "}
                  <span className="text-blue-ylbkd font-semibold">
                    {useAutoTranslate("Info lebih lanjut")}
                  </span>
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurProject;
