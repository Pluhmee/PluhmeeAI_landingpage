import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { SplitText } from '../components/Reveal'
import './system.css'

const STEPS = [
  {
    k: 'Unbox',
    t: 'It wakes up already knowing.',
    d: 'Power on and Pluhmme scans the space in under ninety seconds. No app pairing, no QR codes, no calibration dance.',
    stat: '90s',
    statLabel: 'To first map',
  },
  {
    k: 'Observe',
    t: 'A week of quiet watching.',
    d: 'It learns the doors you use, the hours you keep and the tasks you repeat — all processed locally on the unit.',
    stat: '7 days',
    statLabel: 'Learning window',
  },
  {
    k: 'Act',
    t: 'Then it just starts helping.',
    d: 'Routines run themselves. You get a weekly digest of what it handled, and one tap to undo anything.',
    stat: '0',
    statLabel: 'Commands needed',
  },
]

export default function System() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const rot = useTransform(scrollYProgress, [0, 1], [0, 300])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1.06, 0.94])
  const hue = useTransform(scrollYProgress, [0, 1], [0, 40])

  return (
    <section className="sys" id="system" ref={ref}>
      <div className="sys__inner shell">
        <div className="sys__sticky">
          <span className="eyebrow">How it works</span>
          <SplitText as="h2" className="sys__title" text="Three steps. Then silence." />

          <motion.div className="sys__visual" style={{ scale }}>
            <motion.div className="sys__orbit" style={{ rotate: rot }}>
              <span className="sys__node" />
              <span className="sys__node" />
              <span className="sys__node" />
            </motion.div>
            <motion.div className="sys__core" style={{ filter: useTransform(hue, (h) => `hue-rotate(${h}deg)`) }}>
              <img src="/bot-detail.png" alt="Pluhmme AI detail" />
            </motion.div>
            <div className="sys__ring sys__ring--1" />
            <div className="sys__ring sys__ring--2" />
          </motion.div>
        </div>

        <div className="sys__steps">
          {STEPS.map((s, i) => (
            <motion.article
              className="sys__step"
              key={s.k}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-18%' }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="sys__stepTop">
                <em>0{i + 1}</em>
                <span>{s.k}</span>
              </div>
              <h3>{s.t}</h3>
              <p>{s.d}</p>
              <div className="sys__stat">
                <strong>{s.stat}</strong>
                <span>{s.statLabel}</span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
