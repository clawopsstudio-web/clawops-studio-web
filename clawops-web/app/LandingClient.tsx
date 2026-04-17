'use client'

import Problem from '@/components/sections/Problem'
import WhyClawOps from '@/components/sections/WhyClawOps'
import Features from '@/components/sections/Features'
import HowItWorks from '@/components/sections/HowItWorks'
import UseCases from '@/components/sections/UseCases'
import AIDepartments from '@/components/sections/AIDepartments'
import Integrations from '@/components/sections/Integrations'
import Pricing from '@/components/sections/Pricing'
import FAQ from '@/components/sections/FAQ'
import SocialProof from '@/components/sections/SocialProof'
import MissionControl from '@/components/sections/MissionControl'
import Deployment from '@/components/sections/Deployment'
import Trust from '@/components/sections/Trust'
import CTA from '@/components/sections/CTA'
import FinalCTA from '@/components/sections/FinalCTA'

export default function LandingClient() {
  return (
    <main>
      <Problem />
      <WhyClawOps />
      <Features />
      <HowItWorks />
      <UseCases />
      <AIDepartments />
      <Integrations />
      <SocialProof />
      <MissionControl />
      <Deployment />
      <Trust />
      <Pricing />
      <FAQ />
      <CTA />
      <FinalCTA />
    </main>
  )
}
