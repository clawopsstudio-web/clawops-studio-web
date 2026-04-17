import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/sections/Footer";
import CompanyPageClient from "./CompanyPageClient";

export default function CompanyPage() {
  return (
    <>
      <Navbar />
      <CompanyPageClient />
      <Footer />
    </>
  );
}
export const dynamic = 'force-dynamic';
