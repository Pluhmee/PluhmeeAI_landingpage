import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './loader.css'

export default function Loader({ onDone }: { onDone: () => void }) {
  const [count, setCount] = useState(0)
  const [open, setOpen] = useState(true)

  useEffect(() => {
    let raf = 0
    const start = performance.now()
    const DUR = 1900

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / DUR)
      // easeOutExpo so the number races then settles
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -9 * t)
      setCount(Math.round(eased * 100))
      if (t < 1) raf = requestAnimationFrame(tick)
      else {
        setTimeout(() => {
          setOpen(false)
          setTimeout(onDone, 100)
        }, 340)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [onDone])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="loader"
          exit={{ y: '-100%' }}
          transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="loader__grid">
            {Array.from({ length: 5 }).map((_, i) => (
              <motion.span
                key={i}
                className="loader__col"
                initial={{ scaleY: 1 }}
                exit={{ scaleY: 0 }}
                transition={{ duration: 0.9, delay: i * 0.06, ease: [0.76, 0, 0.24, 1] }}
              />
            ))}
          </div>

          <div className="loader__body">
            <motion.div
              className="loader__mark"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="loader__dots">
                <i /><i /><i /><i />
              </span>
              Pluhmme AI
            </motion.div>

            <div className="loader__count">
              <span>{String(count).padStart(3, '0')}</span>
              <em>%</em>
            </div>

            <div className="loader__bar">
              <motion.span style={{ width: `${count}%` }} />
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Calibrating ambient intelligence
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
