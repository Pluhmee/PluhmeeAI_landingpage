import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import './cursor.css'

export default function Cursor() {
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const [label, setLabel] = useState<string | null>(null)
  const [hot, setHot] = useState(false)
  const [visible, setVisible] = useState(false)

  const ring = { damping: 26, stiffness: 320, mass: 0.45 }
  const sx = useSpring(x, ring)
  const sy = useSpring(y, ring)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return

    const move = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setVisible(true)

      const el = (e.target as HTMLElement)?.closest<HTMLElement>('[data-cursor]')
      if (el) {
        const v = el.dataset.cursor
        setHot(true)
        setLabel(v && v !== 'hover' ? v : null)
      } else {
        setHot(false)
        setLabel(null)
      }
    }
    const leave = () => setVisible(false)

    window.addEventListener('pointermove', move)
    document.addEventListener('pointerleave', leave)
    return () => {
      window.removeEventListener('pointermove', move)
      document.removeEventListener('pointerleave', leave)
    }
  }, [x, y])

  return (
    <>
      <motion.div
        className="cursor-dot"
        style={{ x, y }}
        animate={{ opacity: visible && !hot ? 1 : 0, scale: hot ? 0 : 1 }}
        transition={{ duration: 0.18 }}
      />
      <motion.div
        className={`cursor-ring ${label ? 'is-label' : ''}`}
        style={{ x: sx, y: sy }}
        animate={{
          opacity: visible ? 1 : 0,
          scale: hot ? 1 : 0.42,
          backgroundColor: hot ? 'rgba(198,242,78,1)' : 'rgba(198,242,78,0)',
        }}
        transition={{ type: 'spring', damping: 22, stiffness: 300 }}
      >
        {label && <span>{label}</span>}
      </motion.div>
    </>
  )
}
