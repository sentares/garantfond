import Anniversary from '@/components/Anniversary/Anniversary'
import Calculator from '@/components/Calculator/Calculator'
import Contact from '@/components/Contact/Contact'
import Footer from '@/components/Footer/Footer'
import Hero from '@/components/Hero/Hero'
import HowItWorks from '@/components/HowItWorks/HowItWorks'
import MapSection from '@/components/Map/MapSection'
import Navbar from '@/components/Navbar/Navbar'
import News from '@/components/News/News'
import Partners from '@/components/Partners/Partners'
import Products from '@/components/Products/Products'
import RevealInit from '@/components/RevealInit'
import Stats from '@/components/Stats/Stats'
import Stories from '@/components/Stories/Stories'
import Ticker from '@/components/Ticker/Ticker'

export default function HomePage() {
    return (
        <main>
            <RevealInit />
            <Navbar />
            <Hero />
            <Ticker />
            <Stats />
            <Products />
            <HowItWorks />
            <Anniversary />
            <Partners />
            <Calculator />
            <Stories />
            <News />
            <MapSection />
            <Contact />
            <Footer />
            {/* <FloatingCTA /> */}
        </main>
    )
}