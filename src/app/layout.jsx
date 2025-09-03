import { TranslationProvider } from "@/components/translate/TranslationContext";
import "./globals.css";
import "leaflet/dist/leaflet.css";
import ClientWrapper from "./ClientWrapper";

export const metadata = {
  title: "Yayasan Laut Biru Kepulauan Derawan",
  description:
    "Yayasan Laut Biru Kepulauan Derawan (YLBKD) adalah organisasi nirlaba yang berfokus pada konservasi laut dan perlindungan ekosistem pesisir di Kepulauan Derawan, Kalimantan Timur, Indonesia. Sebagai mitra resmi Global Conservation (GC), YLBKD bertanggung jawab dalam mengelola keuangan dan pelaksanaan proyek-proyek konservasi di Indonesia dengan pendekatan berbasis hasil",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`font-chronicles antialiased`}>
        <ClientWrapper>
          {children}
        </ClientWrapper>
      </body>
    </html>
  );
}
