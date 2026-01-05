import Hero from '@/components/Hero'
import ProductShowcase from '@/components/ProductShowcase'
import HeroText from '@/components/HeroText'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <ProductShowcase />
      <HeroText />
      <Footer />
    </main>
  )
}

