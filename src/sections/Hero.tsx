import { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform, useMotionValue } from 'framer-motion'
import MagneticButton from '../components/MagneticButton'
import Dial from '../components/Dial'
import './hero.css'

const EASE = [0.16, 1, 0.3, 1] as const

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '22%'])
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.18])
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -110])
  const fade = useTransform(scrollYProgress, [0, 0.65], [1, 0])
  const radius = useTransform(scrollYProgress, [0, 0.5], [40, 0])

  // pointer parallax for the floating chips
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const sx = useSpring(px, { damping: 30, stiffness: 120 })
  const sy = useSpring(py, { damping: 30, stiffness: 120 })

  const onMove = (e: React.PointerEvent) => {
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect()
    px.set((e.clientX - r.left - r.width / 2) / r.width)
    py.set((e.clientY - r.top - r.height / 2) / r.height)
  }

  const chipA = { x: useTransform(sx, [-0.5, 0.5], [26, -26]), y: useTransform(sy, [-0.5, 0.5], [18, -18]) }
  const chipB = { x: useTransform(sx, [-0.5, 0.5], [-32, 32]), y: useTransform(sy, [-0.5, 0.5], [-20, 20]) }
  const botX = useTransform(sx, [-0.5, 0.5], [-18, 18])

  return (
    <section className="hero" id="top" ref={ref} onPointerMove={onMove}>
      <motion.div className="hero__frame" style={{ borderRadius: radius }}>
        <motion.div className="hero__media" style={{ y: imgY, scale: imgScale }}>
          <motion.img
            src="/hero-bot.png"
            alt="Pluhmme AI robot resting on sunlit grass"
            style={{ x: botX }}
            initial={{ scale: 1.25, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 2, ease: EASE, delay: 0.15 }}
          />
          <div className="hero__vignette" />
        </motion.div>

        <motion.div className="hero__content shell" style={{ y: contentY, opacity: fade }}>
          <motion.span
            className="eyebrow"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.9, ease: EASE }}
          >
            Intelligence, Naturally
          </motion.span>

          <h1 className="hero__title">
            {['Meet Pluhmme.', 'AI That Moves', 'With You.'].map((line, i) => (
              <span className="hero__line" key={line}>
                <motion.span
                  initial={{ y: '108%', rotate: 3 }}
                  animate={{ y: 0, rotate: 0 }}
                  transition={{ delay: 0.35 + i * 0.11, duration: 1.25, ease: EASE }}
                >
                  {i === 2 ? (
                    <>
                      With <span className="italic-serif">You.</span>
                    </>
                  ) : (
                    line
                  )}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.div
            className="hero__actions"
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 1, ease: EASE }}
          >
            <MagneticButton>Get Early Access</MagneticButton>
            <a className="hero__play" href="#about" data-cursor="Watch">
              <span className="hero__playRing">
                <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
              See it move
            </a>
          </motion.div>

          <div className="hero__stats">
            {[
              { v: '60%', l: 'Cost' },
              { v: '10M+', l: 'Data' },
            ].map((s, i) => (
              <motion.a
                key={s.l}
                className="hero__stat"
                href="#capabilities"
                initial={{ opacity: 0, y: 34, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ delay: 1.05 + i * 0.12, duration: 1, ease: EASE }}
                data-cursor="hover"
              >
                <strong>{s.v}</strong>
                <span>
                  {s.l}
                  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* floating labels */}
        <motion.div
          className="chip chip--a"
          style={chipA}
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.25, duration: 0.9, ease: EASE }}
        >
          <i className="chip__plus">+</i>
          <span>Learns Naturally</span>
        </motion.div>

        <motion.div
          className="chip chip--b"
          style={chipB}
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.4, duration: 0.9, ease: EASE }}
        >
          <span>Always Ready</span>
          <i className="chip__plus">+</i>
        </motion.div>

        {/* feature card */}
        <motion.a
          href="#capabilities"
          className="hero__feature"
          initial={{ opacity: 0, x: 60, filter: 'blur(14px)' }}
          animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
          transition={{ delay: 1.15, duration: 1.1, ease: EASE }}
          style={{ opacity: fade }}
          data-cursor="hover"
        >
          <div className="hero__featureCard">
            <span>See<br />Features</span>
            <i>
              <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17L17 7M9 7h8v8" />
              </svg>
            </i>
            <img src="/bot-detail.png" alt="" />
          </div>
          <h3>Feels Effortless</h3>
          <p>Designed to fit naturally into your everyday life.</p>
        </motion.a>

        {/* readiness card */}
        <motion.div
          className="hero__panel"
          initial={{ opacity: 0, y: 70, filter: 'blur(14px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ delay: 1.3, duration: 1.1, ease: EASE }}
          style={{ opacity: fade }}
        >
          <div className="hero__panelMain">
            <strong>87%</strong>
            <span>AI Readiness</span>
          </div>
          <Dial value={87} />
          <div className="hero__panelSide">
            <div>
              <em>&lt;1SEC</em>
              <span>Typical Response Target</span>
            </div>
            <div>
              <em>360°</em>
              <span>Environmental Awareness</span>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div className="hero__scroll" style={{ opacity: fade }}>
        <span>Scroll</span>
        <i />
      </motion.div>
    </section>
  )
}
