import { useState } from 'react'
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from 'framer-motion'
import MagneticButton from '../components/MagneticButton'
import './nav.css'

const LINKS = [
  { label: 'About Us', href: '#about' },
  { label: 'Capabilities', href: '#capabilities' },
  { label: 'System', href: '#system' },
  { label: 'Partners', href: '#partners' },
  { label: 'FAQ', href: '#faq' },
]

export default function Nav() {
  const { scrollY } = useScroll()
  const [hidden, setHidden] = useState(false)
  const [solid, setSolid] = useState(false)
  const [menu, setMenu] = useState(false)
  const [prev, setPrev] = useState(0)

  useMotionValueEvent(scrollY, 'change', (y) => {
    setSolid(y > 40)
    if (!menu) setHidden(y > prev && y > 320)
    setPrev(y)
  })

  return (
    <>
      <motion.header
        className={`nav ${solid ? 'is-solid' : ''}`}
        initial={{ y: -110 }}
        animate={{ y: hidden ? -110 : 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <a className="nav__brand" href="#top" data-cursor="hover">
          <span className="nav__dots"><i /><i /><i /><i /></span>
          <span className="nav__name">Pluhmme<em>AI</em></span>
        </a>

        <nav className="nav__links">
          {LINKS.map((l) => (
            <a key={l.label} href={l.href} data-cursor="hover">
              <span className="nav__linkInner">
                <span>{l.label}</span>
                <span aria-hidden>{l.label}</span>
              </span>
            </a>
          ))}
        </nav>

        <div className="nav__right">
          <MagneticButton className="nav__cta" strength={0.25}>
            Get Early Access
          </MagneticButton>
          <button
            className={`nav__burger ${menu ? 'is-open' : ''}`}
            onClick={() => setMenu((v) => !v)}
            aria-label="Menu"
            data-cursor="hover"
          >
            <span /><span />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {menu && (
          <motion.div
            className="menu"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="menu__list">
              {LINKS.map((l, i) => (
                <motion.a
                  key={l.label}
                  href={l.href}
                  onClick={() => setMenu(false)}
                  initial={{ y: 60, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 40, opacity: 0 }}
                  transition={{ delay: 0.2 + i * 0.07, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                  <em>0{i + 1}</em>
                  {l.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
