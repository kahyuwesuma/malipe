import DonationCTA from "@/components/home/DonationCTA";
import Hero from "@/components/home/Hero";
import LastestNews from "@/components/home/LastestNews";
import Navigation from "@/components/home/Navigation";

export default function Home() {
  return (
    <div className="">
      <Hero/>
      <Navigation/>
      <LastestNews/>
      <DonationCTA/>
    </div>
  );
}
