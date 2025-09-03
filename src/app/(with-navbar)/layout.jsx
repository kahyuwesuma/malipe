import Navbar from "@/components/navbar/navbar";
import "../globals.css";
import Footer from "@/components/footer/footer";

export default function RootLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="h-full overflow-x-hidden flex flex-col items-center">
        {children}
      </main>
      <Footer />
    </>
  );
}