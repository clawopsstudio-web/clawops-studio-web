import Navbar from "@/components/ui/Navbar";
import HeroNew from "./HeroNew";
import Problem from "@/components/sections/Problem";
import Capabilities from "@/components/sections/Capabilities";
import HowItWorks from "@/components/sections/HowItWorks";
import Integrations from "@/components/sections/Integrations";
import UseCases from "@/components/sections/UseCases";
import SocialProof from "@/components/sections/SocialProof";
import AmpereStylePricing from "./pricing/AmpereStylePricing";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/sections/Footer";

function Section({
  children,
  className = '',
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div className={`relative ${className}`} style={style}>
      {children}
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero — full 3D scroll animation lives here */}
        <Section>
          <HeroNew />
        </Section>

        {/* Content sections — each with solid background */}
        <Section style={{ background: '#04040c' }}>
          <Problem />
        </Section>

        <Section style={{ background: '#04040c' }}>
          <Capabilities />
        </Section>

        <Section style={{ background: '#04040c' }}>
          <HowItWorks />
        </Section>

        <Section style={{ background: '#04040c' }}>
          <Integrations />
        </Section>

        <Section style={{ background: '#04040c' }}>
          <UseCases />
        </Section>

        <Section style={{ background: '#04040c' }}>
          <SocialProof />
        </Section>

        <Section style={{ background: '#04040c' }}>
          <AmpereStylePricing />
        </Section>

        <Section style={{ background: '#04040c' }}>
          <FinalCTA />
        </Section>
      </main>
      <Footer />
    </>
  );
}

export const dynamic = 'force-dynamic';
