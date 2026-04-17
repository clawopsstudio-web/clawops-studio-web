import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/sections/Footer";
import UseCasesPageClient from "./UseCasesPageClient";

export default function UseCasesPage() {
  return (
    <>
      <Navbar />
      <UseCasesPageClient />
      <Footer />
    </>
  );
}
export const dynamic = 'force-dynamic';
