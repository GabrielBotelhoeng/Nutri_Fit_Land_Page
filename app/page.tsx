import Header from '@/components/Header'
import Hero from '@/components/Hero'
import ImpactSection from '@/components/ImpactSection'
import StatsSection from '@/components/StatsSection'
import HowItWorks from '@/components/HowItWorks'
import WhatItDoes from '@/components/WhatItDoes'
import ComparisonSection from '@/components/ComparisonSection'
import TimelineSection from '@/components/TimelineSection'
import Features from '@/components/Features'
import Testimonials from '@/components/Testimonials'
import Plans from '@/components/Plans'
import CtaFinal from '@/components/CtaFinal'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <ImpactSection />
      <StatsSection />
      <HowItWorks />
      <WhatItDoes />
      <ComparisonSection />
      <TimelineSection />
      <Features />
      <Testimonials />
      <Plans />
      <CtaFinal />
      <Footer />
    </main>
  )
}
