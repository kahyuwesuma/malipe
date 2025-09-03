'use client';
import Image from "next/image";
import TeamData from "@/components/tentang-kami/TeamData";
import React from "react";
import { useAutoTranslate } from "@/components/translate/useAutoTranslate";
import { ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr";

export default function TeamDetail({ params }) {
  const { slug } = React.use(params);

  const person = TeamData.find((p) => p.slug === slug);

  if (!person)
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-blue-50 flex items-center justify-center pt-24">
        <div className="text-center space-y-4 px-4">
          <div className="w-24 h-24 mx-auto bg-gradient-to-r from-cyan-100 to-blue-100 rounded-full flex items-center justify-center mb-6">
            <svg className="w-12 h-12 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h1 className="text-3xl md:text-4xl font-AktivGrotesk-Regular text-slate-800 mb-2">
            {useAutoTranslate("Profil Tidak Ditemukan")}
          </h1>
          <p className="text-slate-600 max-w-md mx-auto font-AktivGrotesk-Regular">
            {useAutoTranslate("Maaf, profil yang Anda cari tidak dapat ditemukan. Silakan periksa kembali atau kembali ke halaman utama.")}
          </p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen pt-24">
      {/* Header Background */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10"></div>
        <svg className="absolute bottom-0 w-full h-20 text-white/50" preserveAspectRatio="none" viewBox="0 0 1200 120">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17..." opacity=".25" fill="currentColor" />
          <path d="M0,0V15.81C13,36.92,27.64,56.86..." opacity=".5" fill="currentColor" />
          <path d="M0,0V5.63C149.93,59,314.09,71.32..." fill="currentColor" />
        </svg>
      </div>

      {/* Main Content */}
      <div className="relative -mt-16 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
          <div className="flex flex-col lg:flex-row lg:items-start gap-8">
            {/* Profile Image */}
            <div className="flex justify-center lg:justify-start shrink-0">
              <div className="relative w-80 h-96 sm:w-96 sm:h-[480px] overflow-hidden rounded-3xl shadow-2xl">
                <div className="absolute inset-0 z-10"></div>
                <Image
                  src={person.image}
                  alt={person.title}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  sizes="(max-width: 640px) 320px, 384px"
                />
                
              </div>
            </div>

            {/* Profile Content */}
            <div className="flex-1 bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 overflow-hidden">
              <div className="p-8 sm:p-10 lg:p-12 space-y-6">
                <div className="space-y-3">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-AktivGrotesk-Regular text-slate-800 leading-tight">
                    {person.title}
                  </h1>
                  <p className="text-lg sm:text-xl text-cyan-600 font-AktivGrotesk-Regular font-semibold">
                    {useAutoTranslate(person.desc)}
                  </p>
                </div>

                {/* Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gradient-to-r from-transparent via-cyan-200 to-transparent"></div>
                  </div>
                  <div className="relative flex justify-center">
                    <div className="bg-white px-4">
                      <div className="w-8 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full"></div>
                    </div>
                  </div>
                </div>

                {/* Biography Content */}
                <div className="space-y-4">
                  <h2 className="text-xl font-AktivGrotesk-Regular text-slate-800 flex items-center">
                    <div className="w-1 h-6 bg-gradient-to-b from-cyan-500 to-blue-500 rounded-full mr-3"></div>
                    {useAutoTranslate("Profil Lengkap")}
                  </h2>
                  <div className="prose prose-slate prose-lg max-w-none">
                    <div className="text-slate-700 leading-relaxed space-y-4 text-justify font-AktivGrotesk-Regular">
                      {typeof person.content === "string" ? (
                        person.content.split("\n\n").map((para, idx) => (
                          <p key={idx}>{useAutoTranslate(para)}</p>
                        ))
                      ) : (
                        person.content
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Back Button */}
          <div className="mt-8 text-center">
            <a
              href="/tentang-kami"
              className="flex gap-3 hover:gap-4 transition-all items-center py-3 text-slate-600 hover:text-slate-800 font-AktivGrotesk-Regular duration-200 group"
            >
              <ArrowLeftIcon size={18}/>
              {useAutoTranslate("Kembali ke Tentang Kami")}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
