import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Reveal } from '../components/Reveal'
import './about.css'

const COPY =
  'Pluhmme is a quiet kind of intelligence. It maps the room, reads the rhythm of your day and handles the small things before you think to ask — no dashboards, no commands, no setup.'

export default function About() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.4'] })
  const words = COPY.split(' ')

  return (
    <section className="section about" id="about">
      <div className="about__glow" />
      <div className="shell">
        <Reveal>
          <span className="eyebrow">The Idea</span>
        </Reveal>

        <div className="about__text" ref={ref}>
          <p>
            {words.map((w, i) => {
              const start = i / words.length
              const end = start + 1 / words.length
              return (
                <Word key={i} progress={scrollYProgress} range={[start, end]}>
                  {w}
                </Word>
              )
            })}
          </p>
        </div>

        <div className="about__meta">
          {[
            { k: '01', t: 'Perceives', d: 'Depth, sound and motion fused into one live model of the room.' },
            { k: '02', t: 'Predicts', d: 'Learns your patterns on-device and acts a step ahead of them.' },
            { k: '03', t: 'Performs', d: 'Executes quietly in the background, then gets out of the way.' },
          ].map((m, i) => (
            <Reveal key={m.k} delay={i * 0.1} className="about__cell">
              <em>{m.k}</em>
              <h4>{m.t}</h4>
              <p>{m.d}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Word({
  children,
  progress,
  range,
}: {
  children: string
  progress: ReturnType<typeof useScroll>['scrollYProgress']
  range: [number, number]
}) {
  const opacity = useTransform(progress, range, [0.12, 1])
  const blur = useTransform(progress, range, [6, 0])
  return (
    <span className="about__word">
      <motion.span style={{ opacity, filter: useTransform(blur, (b) => `blur(${b}px)`) }}>
        {children}{' '}
      </motion.span>
    </span>
  )
}
