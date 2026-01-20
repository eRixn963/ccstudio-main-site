import Header from '@/components/header'
import HeroSection from '@/components/hero-section'
import PromptInterface from '@/components/prompt-interface'
import FeaturesSection from '@/components/features-section'
import ProjectsSection from '@/components/projects-section'
import Footer from '@/components/footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0f]">
      <Header />
      <div className="pt-20">
        <HeroSection />
        <PromptInterface />
        <FeaturesSection />
        <ProjectsSection />
        <Footer />
      </div>
    </main>
  )
}
