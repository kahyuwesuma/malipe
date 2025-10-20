"use client";
import logo_ylbkd from "@/asset/logo_ylbkd.png";
import Image from "next/image";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { HandHeartIcon, NewspaperIcon } from "@phosphor-icons/react";
import {
  BookIcon,
  ImagesIcon,
  SignOutIcon,
} from "@phosphor-icons/react/dist/ssr";
import { supabase } from "@/utils/supabaseClient";
import logo_malipe from "@/asset/home/logo-300x124.webp"

const items = [
  {
    title: "Berita",
    url: "/admin/berita",
    icon: <NewspaperIcon size={32} />,
  },
  {
    title: "Galeri",
    url: "/admin/galeri",
    icon: <ImagesIcon size={32} />,
  },
  {
    title: "Publikasi",
    url: "/admin/publikasi",
    icon: <BookIcon size={32} />,
  },
  {
    title: "Donasi",
    url: "/admin/donasi",
    icon: <HandHeartIcon size={32} />,
  },
];

const SidebarDashboard = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    document.cookie = "sb-sbazfnpvudwtrtsivxib-auth-token=; Max-Age=0; path=/";
    router.replace("/");
  };

  return (
    <>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="flex justify-start mx-4 lg:mx-8 py-14">
              <Link href="/admin/dashboard">
                <Image src={logo_malipe} width={130} alt="logo_ylbkd" />
              </Link>
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem
                    key={item.title}
                    className={`lg:mx-8 mx-4 rounded ${
                      pathname.startsWith(item.url)
                        ? "bg-zinc-200"
                        : "hover:bg-zinc-300"
                    }`}
                  >
                    <SidebarMenuButton
                      asChild
                      className={`flex items-center gap-2 px-2 py-1 hover:rounded hover:bg-transparent ${
                        pathname.startsWith(item.url)
                          ? "text-personal-button"
                          : ""
                      }`}
                    >
                      <Link href={item.url}>
                        {item.icon}
                        <span className="font-WhitneyMedium">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="mx-8 mb-7">
          <div className="flex flex-col gap-2 text-sm">
            <button
              onClick={handleSignOut}
              className="flex cursor-pointer gap-2 items-center p-2 hover:bg-personal-hover rounded-md hover:bg-zinc-300"
            >
              <SignOutIcon size={18} />
              <span className="font-WhitneyMedium">Keluar</span>
            </button>
          </div>
        </SidebarFooter>
      </Sidebar>
    </>
  );
};

export default SidebarDashboard;
