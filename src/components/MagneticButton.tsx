import { useRef, type ReactNode } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import './button.css'

type Props = {
  children: ReactNode
  variant?: 'lime' | 'ghost' | 'dark'
  strength?: number
  className?: string
  href?: string
  onClick?: () => void
}

/** Button that leans toward the cursor, with a label that swaps on hover. */
export default function MagneticButton({
  children,
  variant = 'lime',
  strength = 0.35,
  className = '',
  href = '#',
  onClick,
}: Props) {
  const ref = useRef<HTMLAnchorElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const cfg = { damping: 15, stiffness: 220, mass: 0.4 }
  const x = useSpring(mx, cfg)
  const y = useSpring(my, cfg)

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    mx.set((e.clientX - (r.left + r.width / 2)) * strength)
    my.set((e.clientY - (r.top + r.height / 2)) * strength * 0.8)
  }
  const reset = () => {
    mx.set(0)
    my.set(0)
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      onClick={onClick}
      className={`mag-btn mag-${variant} ${className}`}
      style={{ x, y }}
      onPointerMove={onMove}
      onPointerLeave={reset}
      whileTap={{ scale: 0.96 }}
      data-cursor="hover"
    >
      <span className="mag-btn__inner">
        <span className="mag-btn__label">{children}</span>
        <span className="mag-btn__label mag-btn__label--ghost" aria-hidden>
          {children}
        </span>
      </span>
      <span className="mag-btn__fill" />
    </motion.a>
  )
}
