"use client";
import Image from "next/image";
import Link from "next/link";
import logo_ylbkd from "@/asset/home/logo-300x124.webp";
import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { ListIcon } from "@phosphor-icons/react/dist/ssr";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useAutoTranslate } from "../translate/useAutoTranslate";
import LanguageSwitcher from "./LanguageSwitcher";

const Navbar = () => {
  const menuItems = [
    { href: "/", label: "Beranda" },
    // { href: "/tentang-kami", label: "Tentang Kami" },
    { href: "/berita", label: "Berita" },
    { href: "/ekowisata", label: "Ekowisata" },
    { href: "/galeri", label: "Galeri" },
    { href: "/publikasi", label: "Publikasi" },
    // { href: "/kontak-kami", label: "Kontak Kami" },
  ];

  return (
    <nav className="sticky flex flex-col justify-between px-4 sm:px-0 items-center top-0 z-50 pb-2 lg:pb-4 sm:pt-0 bg-white overflow-hidden">
      <div className="w-full hidden sm:flex justify-end pt-2 sm:px-6 lg:px-14">
        <LanguageSwitcher/>
      </div>
      <div className="flex items-center w-screen justify-between px-6 sm:px-0">
        <NavigationMenu viewport={false}>
          <NavigationMenuList className="flex justify-between items-center sm:w-screen sm:px-5 lg:px-14">
            <Link href="/" className="">
              <Image
                src={logo_ylbkd}
                width={130}
                className="sm:pr-2 sm:mt-4 mt-3 w-[30vw] sm:w-auto"
                alt="logo ylkbd"
                priority
              />
            </Link>
            {menuItems.map(({ href, label }) => {
              const translatedLabel = useAutoTranslate(label);
              return (
                <NavigationMenuLink
                  key={href}
                  className="font-AktivGrotesk-Regular sm:text-xs lg:text-sm hidden sm:block"
                  href={href}
                >
                  {translatedLabel}
                </NavigationMenuLink>
              );
            })}
            <NavigationMenuLink
              className="hidden sm:block bg-blue-ylbkd lg:text-sm sm:text-xs rounded font-AktivGrotesk-Regular hover:bg-white text-white hover:text-blue-ylbkd border border-blue-ylbkd hover:border-blue-ylbkd font-medium"
              href="https://paypal.me/Malipe2021"
              target="_blank"
              rel="noopener noreferrer"
            >
              {useAutoTranslate("Donasi")}
            </NavigationMenuLink>
          </NavigationMenuList>
        </NavigationMenu>

        <Sheet>
          <div className="flex gap-3">
            <LanguageSwitcher/>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                className="block sm:hidden border-gray-300 hover:border-blue-ylbkd hover:text-blue-ylbkd transition-colors duration-200"
              >
                <ListIcon size={24} />
              </Button>
            </SheetTrigger>
          </div>
          <SheetContent className="w-full flex justify-center pb-12 items-center text-center font-AktivGrotesk-Regular">
            <SheetHeader>
              <SheetTitle className="text-2xl font-semibold text-left">
                {useAutoTranslate("Navigasi")}
              </SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-2">
              {menuItems.map(({ href, label }) => (
                <SheetClose asChild key={href}>
                  <Link
                    className="text-lg rounded-lg p-4 hover:bg-gray-50 transition-colors duration-200 border-b border-gray-100 last:border-b-0 font-medium"
                    href={href}
                  >
                    {useAutoTranslate(label)}
                  </Link>
                </SheetClose>
              ))}
              <SheetClose asChild>
                <Link
                  className="text-lg rounded-lg p-4 hover:bg-gray-50 transition-colors duration-200 border-b border-gray-100 font-medium"
                  href="/donasi"
                >
                  {useAutoTranslate("Donasi")}
                </Link>
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>

      </div>
    </nav>
  );
};

export default Navbar;
