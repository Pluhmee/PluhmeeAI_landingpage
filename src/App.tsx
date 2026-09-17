import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { useLenis } from './hooks/useLenis'
import Cursor from './components/Cursor'
import Loader from './sections/Loader'
import Nav from './sections/Nav'
import Hero from './sections/Hero'
import Marquee from './sections/Marquee'
import About from './sections/About'
import Capabilities from './sections/Capabilities'
import System from './sections/System'
import Showcase from './sections/Showcase'
import Faq from './sections/Faq'
import Cta from './sections/Cta'
import Footer from './sections/Footer'
import './App.css'

export default function App() {
  const [ready, setReady] = useState(false)
  useLenis()

  const { scrollYProgress } = useScroll()
  const bar = useSpring(scrollYProgress, { stiffness: 140, damping: 28, restDelta: 0.001 })

  useEffect(() => {
    document.body.style.overflow = ready ? '' : 'hidden'
  }, [ready])

  return (
    <>
      <Cursor />
      <div className="grain" />
      <Loader onDone={() => setReady(true)} />
      <motion.div className="scrollbar" style={{ scaleX: bar }} />

      <Nav />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Capabilities />
        <System />
        <Showcase />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </>
  )
}
