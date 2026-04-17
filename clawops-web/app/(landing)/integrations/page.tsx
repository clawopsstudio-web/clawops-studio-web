import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/sections/Footer";
import IntegrationsPageClient from "./IntegrationsPageClient";

export default function IntegrationsPage() {
  return (
    <>
      <Navbar />
      <IntegrationsPageClient />
      <Footer />
    </>
  );
}
export const dynamic = 'force-dynamic';
