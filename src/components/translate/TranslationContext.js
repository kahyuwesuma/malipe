"use client";
import { createContext, useContext, useState, useEffect } from "react";

const TranslationContext = createContext();

export function TranslationProvider({ children }) {
  const [language, setLanguage] = useState("id");
  const [translations, setTranslations] = useState({});

  useEffect(() => {
    const savedLang = sessionStorage.getItem("language");
    if (savedLang) setLanguage(savedLang);

    const savedTrans = sessionStorage.getItem("translations");
    if (savedTrans) setTranslations(JSON.parse(savedTrans));
  }, []);

  useEffect(() => {
    sessionStorage.setItem("language", language);
  }, [language]);

  const translateText = async (text) => {
    if (language === "id") return text;

    if (translations[language]?.[text]) return translations[language][text];

    const res = await fetch(
      `https://translate.plausibility.cloud/api/v1/id/en/${encodeURIComponent(text)}`
      // `https://simplytranslate.org/api/translate/?engine=google&from=id&to=${language}&text=${encodeURIComponent(
      //   text
      // )}`
    );
    const data = await res.json();

    const translated = data.translation || text;

    // console.log("translatenya:", translated);

    setTranslations((prev) => {
      const updated = {
        ...prev,
        [language]: {
          ...(prev[language] || {}),
          [text]: translated,
        },
      };
      sessionStorage.setItem("translations", JSON.stringify(updated));
      return updated;
    });

    return translated;
  };

  return (
    <TranslationContext.Provider
      value={{ language, setLanguage, translateText }}
    >
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  return useContext(TranslationContext);
}
