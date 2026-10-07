import { HeroSection } from '@/components/sections/hero'
import { HowItWorksQuick } from '@/components/sections/how-it-works-quick'
import { ProjectsPreview } from '@/components/sections/projects-preview'
import { GuaranteesBlock } from '@/components/sections/guarantees-block'
import { ProtectionPillars } from '@/components/sections/protection-pillars'
import { ValuationPreview } from '@/components/sections/valuation-preview'
import { ProcessSteps } from '@/components/sections/process-steps'
import { SimulatorCompact } from '@/components/sections/simulator-compact'
import { TrackRecord } from '@/components/sections/track-record'
import { TeamSection } from '@/components/sections/team-section'
import { FaqRisks } from '@/components/sections/faq-risks'
import { CtaFinal } from '@/components/sections/cta-final'
import { RiskBanner } from '@/components/sections/risk-banner'

export default function HomePage() {
  return (
    <>
      <HeroSection variant="A" />
      <HowItWorksQuick />
      <ProjectsPreview />
      <GuaranteesBlock />
      <ProtectionPillars />
      <ValuationPreview />
      <ProcessSteps />
      <SimulatorCompact />
      <TrackRecord />
      <TeamSection />
      <FaqRisks />
      <CtaFinal />
      <RiskBanner />
    </>
  )
}
