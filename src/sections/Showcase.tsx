import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { SplitText } from '../components/Reveal'
import './showcase.css'

const ROWS = [
  { t: 'The Kitchen', d: 'Tracks what ran low and reorders before you notice.', img: '/hero-bot.png' },
  { t: 'The Garden', d: 'Reads soil moisture and light, waters on its own schedule.', img: '/bot-detail.png' },
  { t: 'The Studio', d: 'Keeps the room lit and the temperature honest while you work.', img: '/hero-bot.png' },
  { t: 'The Night Shift', d: 'Locks up, dims down and stands watch until morning.', img: '/bot-detail.png' },
]

export default function Showcase() {
  const [active, setActive] = useState<number | null>(null)
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <section className="show section" id="partners">
      <div className="shell">
        <div className="show__head">
          <span className="eyebrow">In the wild</span>
          <SplitText as="h2" className="show__title" text="Everywhere you already are." />
        </div>

        <div className="show__list" ref={ref} onPointerLeave={() => setActive(null)}>
          {ROWS.map((r, i) => (
            <motion.a
              className="show__row"
              key={r.t}
              href="#cta"
              onPointerEnter={() => setActive(i)}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-12%' }}
              transition={{ duration: 0.9, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              data-cursor="View"
            >
              <em>0{i + 1}</em>
              <h3>{r.t}</h3>
              <p>{r.d}</p>
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M7 17L17 7M9 7h8v8" />
              </svg>
              <span className="show__rowFill" />
            </motion.a>
          ))}

          <AnimatePresence>
            {active !== null && (
              <motion.div
                className="show__preview"
                style={{ y }}
                initial={{ opacity: 0, scale: 0.86, rotate: -5 }}
                animate={{ opacity: 1, scale: 1, rotate: -3 }}
                exit={{ opacity: 0, scale: 0.9, rotate: -6 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                <img src={ROWS[active].img} alt="" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
