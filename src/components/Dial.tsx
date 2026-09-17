import { motion, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

/** Ticked radial gauge that sweeps + counts up when scrolled into view. */
export default function Dial({ value = 87, size = 128 }: { value?: number; size?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!inView) return
    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / 1500)
      const eased = 1 - Math.pow(1 - t, 3)
      setN(Math.round(eased * value))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, value])

  const R = 42
  const C = 2 * Math.PI * R
  const ticks = 56

  return (
    <div className="dial" ref={ref} style={{ width: size, height: size }}>
      <svg viewBox="0 0 110 110">
        <defs>
          <linearGradient id="dialGrad" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#9ed432" />
            <stop offset="100%" stopColor="#e3ff9a" />
          </linearGradient>
        </defs>

        {Array.from({ length: ticks }).map((_, i) => {
          const a = (i / ticks) * Math.PI * 2 - Math.PI / 2
          const active = i / ticks <= n / 100
          return (
            <line
              key={i}
              x1={55 + Math.cos(a) * 49}
              y1={55 + Math.sin(a) * 49}
              x2={55 + Math.cos(a) * (active ? 42 : 45)}
              y2={55 + Math.sin(a) * (active ? 42 : 45)}
              stroke={active ? '#c6f24e' : 'rgba(10,13,9,0.22)'}
              strokeWidth={1.4}
              strokeLinecap="round"
            />
          )
        })}

        <circle cx="55" cy="55" r={R} fill="none" stroke="rgba(10,13,9,0.08)" strokeWidth="9" />
        <motion.circle
          cx="55"
          cy="55"
          r={R}
          fill="none"
          stroke="url(#dialGrad)"
          strokeWidth="9"
          strokeLinecap="round"
          strokeDasharray={C}
          initial={{ strokeDashoffset: C }}
          animate={inView ? { strokeDashoffset: C - (C * value) / 100 } : {}}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          transform="rotate(-90 55 55)"
        />
      </svg>
      <span className="dial__num">{n}%</span>
    </div>
  )
}
