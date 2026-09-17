import { motion } from 'framer-motion'
import './footer.css'

const COLS = [
  { h: 'Product', l: ['Capabilities', 'System', 'Specs', 'Pricing'] },
  { h: 'Company', l: ['About Us', 'Careers', 'Press', 'Contact'] },
  { h: 'Legal', l: ['Privacy', 'Terms of Service', 'Security', 'Cookies'] },
]

export default function Footer() {
  return (
    <footer className="foot">
      <div className="shell">
        <div className="foot__top">
          <div className="foot__brand">
            <span className="foot__dots"><i /><i /><i /><i /></span>
            <p>
              Ambient robotics for people who'd rather not think about robotics.
            </p>
            <div className="foot__socials">
              {['X', 'IG', 'IN', 'GH'].map((s) => (
                <a key={s} href="#top" data-cursor="hover">
                  {s}
                </a>
              ))}
            </div>
          </div>

          {COLS.map((c) => (
            <div className="foot__col" key={c.h}>
              <h5>{c.h}</h5>
              {c.l.map((l) => (
                <a key={l} href="#top" data-cursor="hover">
                  <span>{l}</span>
                </a>
              ))}
            </div>
          ))}
        </div>

        <motion.div
          className="foot__word"
          initial={{ y: 90, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          PLUHMME<em>AI</em>
        </motion.div>

        <div className="foot__base">
          <span>© {new Date().getFullYear()} Pluhmme AI. Concept project.</span>
          <span>Designed &amp; built for portfolio · Abuja, NG</span>
        </div>
      </div>
    </footer>
  )
}
