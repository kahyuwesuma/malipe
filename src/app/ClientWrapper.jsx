"use client";

import { TranslationProvider } from "@/components/translate/TranslationContext";

export default function ClientWrapper({ children }) {
  return <TranslationProvider>{children}</TranslationProvider>;
}
