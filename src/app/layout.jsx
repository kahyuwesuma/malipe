import "./globals.css";
import "leaflet/dist/leaflet.css";
import ClientWrapper from "./ClientWrapper";

export const metadata = {
  title: "Maratua Peduli Penyu",
  description:
    "Maratua Peduli Penyu adalah organisasi nirlaba yang berfokus pada konservasi penyu dan perlindungan ekosistem pesisir di Pulau Balembangan, Kepulauan Derawan, Kalimantan Timur, Indonesia.",
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
