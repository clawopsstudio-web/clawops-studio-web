import Navbar from "@/components/ui/Navbar";
import HeroNew from "./HeroNew";
import Problem from "@/components/sections/Problem";
import Capabilities from "@/components/sections/Capabilities";
import Deployment from "@/components/sections/Deployment";
import HowItWorks from "@/components/sections/HowItWorks";
import Integrations from "@/components/sections/Integrations";
import UseCases from "@/components/sections/UseCases";
import WhyClawOps from "@/components/sections/WhyClawOps";
import SocialProof from "@/components/sections/SocialProof";
import AmpereStylePricing from "./pricing/AmpereStylePricing";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <main>
        <HeroNew />
        <Problem />
        <Capabilities />
        <Deployment />
        <HowItWorks />
        <Integrations />
        <UseCases />
        <WhyClawOps />
        <SocialProof />
        <AmpereStylePricing />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
export const dynamic = 'force-dynamic';
