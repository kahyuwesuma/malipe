"use client"
import Link from "next/link";
import { useAutoTranslate } from "../translate/useAutoTranslate";

const PublicationCTA = () => {
  return (
    <div className="my-16 mx-4 text-center font-AktivGrotesk-Regular">
      <div className="bg-white rounded-2xl shadow border border-gray-100 p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          {useAutoTranslate("Ingin Karyamu Dipublikasikan?")}
        </h3>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          {useAutoTranslate(
            "Kami mengundang individu dan organisasi yang memiliki cerita, riset, atau karya visual tentang konservasi laut Indonesia untuk berkontribusi di platform ini."
          )}
        </p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-300 shadow-sm hover:shadow-md">
          <Link
            href="/kontak-kami#contact"
            className="flex items-center justify-center capitalize"
          >
            {useAutoTranslate("Hubungi Kami")}
          </Link>
        </button>
      </div>
    </div>
  );
};

export default PublicationCTA;
