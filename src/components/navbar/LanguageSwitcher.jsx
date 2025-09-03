"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { TranslateIcon } from "@phosphor-icons/react/dist/ssr";
import { useTranslation } from "../translate/TranslationContext"; // sesuaikan path
import { Separator } from "../ui/separator";
import { he } from "date-fns/locale";

const LanguageSwitcher = () => {
  const { language, setLanguage } = useTranslation();

  const handleChange = (lang) => {
    setLanguage(lang);
  };

  return (
    <div className="flex items-center gap-3 font-AktivGrotesk-Regular">
      <TranslateIcon size={18} weight="bold" />
      <button
        className={`text-xs cursor-pointer ${language == "id"? "text-blue-ylbkd":"text-black"}`}
        variant={language === "id" ? "default" : "outline"}
        onClick={() => handleChange("id")}
        aria-label="Ganti bahasa ke Indonesia"
      >
        ID
      </button>
      <Separator orientation="vertical"/>
      <button
        className={`text-xs cursor-pointer ${language == "en"? "text-blue-ylbkd":"text-black"}`}
        variant={language === "en" ? "default" : "outline"}
        onClick={() => handleChange("en")}
        aria-label="Switch language to English"
      >
        EN
      </button>
    </div>
  );
};

export default LanguageSwitcher;
