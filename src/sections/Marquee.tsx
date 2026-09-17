import { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import './marquee.css'

const ITEMS = ['Ambient Intelligence', 'Zero Setup', 'On-Device Privacy', 'Spatial Mapping', 'Adaptive Routines', 'Always Learning']

export default function Marquee() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const raw = useTransform(scrollYProgress, [0, 1], [4, -22])
  const x = useSpring(raw, { damping: 40, stiffness: 90 })

  return (
    <div className="marquee" ref={ref}>
      <motion.div className="marquee__track" style={{ x: useTransform(x, (v) => `${v}%`) }}>
        {Array.from({ length: 3 }).map((_, r) => (
          <div className="marquee__row" key={r}>
            {ITEMS.map((it) => (
              <span key={`${r}-${it}`}>
                {it}
                <i>✦</i>
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  )
}
