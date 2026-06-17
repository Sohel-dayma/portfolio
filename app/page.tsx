import Navbar          from '@/components/Navbar'
import Hero            from '@/components/Hero'
import Services        from '@/components/Services'
import About           from '@/components/About'
import Skills          from '@/components/Skills'
import Portfolio       from '@/components/Portfolio'
import Contact         from '@/components/Contact'
import Footer          from '@/components/Footer'
import ScrollTop       from '@/components/ScrollTop'
import FloatingWhatsApp from '@/components/FloatingWhatsApp'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <About />
        <Skills />
        <Portfolio />
        <Contact />
      </main>
      <Footer />
      <ScrollTop />
      <FloatingWhatsApp />
    </>
  )
}
