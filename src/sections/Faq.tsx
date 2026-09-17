import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SplitText } from '../components/Reveal'
import './faq.css'

const QA = [
  {
    q: 'Does it send my data anywhere?',
    a: 'No. Perception, learning and inference all run on the unit. Cloud sync is opt-in and covers preferences only — never raw sensor data.',
  },
  {
    q: 'What if it gets something wrong?',
    a: 'Every autonomous action appears in a weekly digest with a one-tap undo. Correct it once and Pluhmme adjusts the underlying routine.',
  },
  {
    q: 'How much space does it need?',
    a: 'It clears a 12cm threshold and fits under most furniture. Indoor and outdoor surfaces are both supported out of the box.',
  },
  {
    q: 'When can I actually buy one?',
    a: 'Early access units ship to the first cohort in limited numbers. Join the list and you will get a slot with a locked-in founder price.',
  },
]

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="faq section" id="faq">
      <div className="shell faq__inner">
        <div className="faq__aside">
          <span className="eyebrow">FAQ</span>
          <SplitText as="h2" className="faq__title" text="The obvious questions." />
          <p>Anything else, just ask — a real human answers.</p>
        </div>

        <div className="faq__list">
          {QA.map((item, i) => {
            const isOpen = open === i
            return (
              <div className={`faq__item ${isOpen ? 'is-open' : ''}`} key={item.q}>
                <button onClick={() => setOpen(isOpen ? null : i)} data-cursor="hover">
                  <span>{item.q}</span>
                  <i>
                    <em />
                    <em />
                  </i>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      className="faq__panel"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <p>{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
