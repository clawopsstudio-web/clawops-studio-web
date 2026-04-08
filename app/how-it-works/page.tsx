import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/sections/Footer";
import HowItWorksClient from "./HowItWorksClient";

export default function HowItWorksPage() {
  return (
    <>
      <Navbar />
      <HowItWorksClient />
      <Footer />
    </>
  );
}
export const dynamic = 'force-dynamic';
