import HeroSection from "@/components/hero-section"
import { BranchesOverview } from "@/components/branches-overview"
import { WhyChooseMescoe } from "@/components/why-choose-mescoe"
import { AdmissionProcess } from "@/components/admission-process"
import { CallToAction } from "@/components/call-to-action"
import { PlaacementStats } from "@/components/placement-stats"
import { FeaturesSection } from "@/components/features-section"
import { InnovationShowcase } from "@/components/innovation-showcase"
import { StudentTestimonials } from "@/components/student-testimonials"
import { FaqSection } from "@/components/faq-section"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <BranchesOverview />
      <PlaacementStats />
      <FeaturesSection />
      <WhyChooseMescoe />
      <InnovationShowcase />
      <StudentTestimonials />
      <AdmissionProcess />
      <FaqSection />
      <CallToAction />
    </div>
  )
}
