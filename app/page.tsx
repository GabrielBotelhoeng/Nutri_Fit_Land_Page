import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Marquee from '@/components/Marquee'
import StatsSection from '@/components/StatsSection'
import ImpactSection from '@/components/ImpactSection'
import Situacoes from '@/components/Situacoes'
import HowItWorks from '@/components/HowItWorks'
import ComparisonSection from '@/components/ComparisonSection'
import TimelineSection from '@/components/TimelineSection'
import Features from '@/components/Features'
import Plans from '@/components/Plans'
import CtaFinal from '@/components/CtaFinal'
import Footer from '@/components/Footer'
import FloatingWhatsApp from '@/components/FloatingWhatsApp'

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <Marquee />
      <StatsSection />
      <ImpactSection />
      <Situacoes />
      <HowItWorks />
      <ComparisonSection />
      <TimelineSection />
      <Features />
      <Plans />
      <CtaFinal />
      <Footer />
      <FloatingWhatsApp />
    </main>
  )
}
