"use client";
import { useState, useEffect } from "react";
import { useTranslation } from "./TranslationContext";

export function useAutoTranslate(text) {
  const { translateText } = useTranslation();
  const [translated, setTranslated] = useState(text);

  useEffect(() => {
    let mounted = true;
    translateText(text).then((res) => {
      if (mounted && res) setTranslated(res);
    });
    return () => {
      mounted = false;
    };
  }, [text, translateText]);

  return translated;
}
