import DonationCTA from "@/components/home/DonationCTA";
import Hero from "@/components/home/Hero";
import LastestNews from "@/components/home/LastestNews";
import Navigation from "@/components/home/Navigation";
import EdukasiPenyu from "@/components/home/EdukasiPenyu";

export default function Home() {
  return (
    <div>
      <Hero />
      <Navigation />
      <EdukasiPenyu />   
      <LastestNews />
      <DonationCTA />
    </div>
  );
}
