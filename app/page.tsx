import HeroSection from "@/components/hero-section"
import { BranchesOverview } from "@/components/branches-overview"
import { WhyChooseMescoe } from "@/components/why-choose-mescoe"
import { AdmissionProcess } from "@/components/admission-process"
import { CallToAction } from "@/components/call-to-action"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <BranchesOverview />
      <WhyChooseMescoe />
      <AdmissionProcess />
      <CallToAction />
    </div>
  )
}
