import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { ServicesSection } from "@/components/services-section"
import { WhyUsSection } from "@/components/why-us-section"
import { PortfolioSection } from "@/components/portfolio-section"
import { RatingsSection } from "@/components/ratings-section"
import { AboutSection } from "@/components/about-section"
import { FooterSection } from "@/components/footer-section"

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <WhyUsSection />
      <PortfolioSection />
      <RatingsSection />
      <AboutSection />
      <FooterSection />
    </main>
  )
}
