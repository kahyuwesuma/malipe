"use client"
import "../globals.css";
import { DataProvider } from "@/app/context/DataContext";
import SidebarDashboard from "@/components/admin/SidebarDashboard";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

export default function RootLayout({ children }) {
  return (
    <SidebarProvider>
      <SidebarDashboard />
      <main className="w-full">
        <SidebarTrigger/>
        <DataProvider>{children}</DataProvider>
      </main>
    </SidebarProvider>
  );
}
