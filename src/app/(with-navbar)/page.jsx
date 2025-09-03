import DonationCTA from "@/components/home/DonationCTA";
import Hero from "@/components/home/Hero";
import Highlights from "@/components/home/Highlights";
import LastestNews from "@/components/home/LastestNews";
import Navigation from "@/components/home/Navigation";

export default function Home() {
  return (
    <div className="">
      <Hero/>
      <Navigation/>
      {/* <Highlights/> */}
      <LastestNews/>
      <DonationCTA/>
    </div>
  );
}
