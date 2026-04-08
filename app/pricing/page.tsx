import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/sections/Footer";
import PricingPageClient from "./PricingPageClient";

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <PricingPageClient />
      <Footer />
    </>
  );
}
export const dynamic = 'force-dynamic';
