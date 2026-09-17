import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import MagneticButton from '../components/MagneticButton'
import './cta.css'

export default function Cta() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] })
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1])
  const radius = useTransform(scrollYProgress, [0, 1], [80, 34])
  const [sent, setSent] = useState(false)
  const [email, setEmail] = useState('')

  return (
    <section className="cta" id="cta" ref={ref}>
      <motion.div className="cta__box shell" style={{ scale, borderRadius: radius }}>
        <div className="cta__aurora" />

        <motion.span
          className="eyebrow cta__eyebrow"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Early Access
        </motion.span>

        <h2 className="cta__title">
          {['Let it', 'move with you.'].map((line, i) => (
            <span key={line} className="cta__line">
              <motion.span
                initial={{ y: '110%' }}
                whileInView={{ y: 0 }}
                viewport={{ once: true, margin: '-15%' }}
                transition={{ duration: 1.15, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                {i === 1 ? (
                  <>
                    move <span className="italic-serif">with you.</span>
                  </>
                ) : (
                  line
                )}
              </motion.span>
            </span>
          ))}
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.25 }}
        >
          First cohort ships limited units. Founder pricing locked at signup.
        </motion.p>

        <motion.form
          className="cta__form"
          onSubmit={(e) => {
            e.preventDefault()
            if (email.trim()) setSent(true)
          }}
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.35 }}
        >
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div
                key="done"
                className="cta__done"
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="cta__check">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M4 12l5 5L20 6" />
                  </svg>
                </span>
                You're on the list — we'll be in touch.
              </motion.div>
            ) : (
              <motion.div key="form" className="cta__field" exit={{ opacity: 0, y: -12 }}>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@domain.com"
                  aria-label="Email address"
                />
                <MagneticButton strength={0.2} onClick={() => email.trim() && setSent(true)}>
                  Get Early Access
                </MagneticButton>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.form>

        <div className="cta__meta">
          <span>No spam</span>
          <i />
          <span>Cancel anytime</span>
          <i />
          <span>2,400+ on the list</span>
        </div>
      </motion.div>
    </section>
  )
}
