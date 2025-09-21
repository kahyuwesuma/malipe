import {
  BookIcon,
  NewspaperIcon,
  ImagesIcon,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

const NavigationDashboard = () => {
  const menus = [
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
  ];
  return (
    <div className="flex flex-col">
      <h1 className="text-2xl font-AktivGrotesk-Regular mb-10 text-center">Menu Admin</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {menus.map((menu, index) => (
          <Link href={menu.url} className="h-fit" key={index}>
            <Card className="py-16 border hover:border-blue-ylbkd hover:bg-blue-ylbkd transition-colors duration-200 hover:text-white">
              <CardContent className="p-6 flex flex-col items-center justify-center gap-3 text-center">
                <div className="">{menu.icon}</div>
                <h2 className="font-semibold text-lg">{menu.title}</h2>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NavigationDashboard;
