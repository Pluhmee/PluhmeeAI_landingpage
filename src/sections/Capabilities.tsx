import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from '../components/Reveal'
import './capabilities.css'

gsap.registerPlugin(ScrollTrigger)

const CARDS = [
  { n: '01', t: 'Spatial Memory', d: 'Builds a persistent 3D map of your space and remembers where everything lives.', tag: 'LiDAR + Vision' },
  { n: '02', t: 'Silent Compute', d: 'A 40 TOPS on-device engine. Nothing leaves the room unless you say so.', tag: 'On-Device' },
  { n: '03', t: 'Routine Sense', d: 'Notices the shape of your week and quietly starts doing it for you.', tag: 'Adaptive' },
  { n: '04', t: 'Natural Voice', d: 'Full-duplex conversation with sub-second latency. Interrupt it any time.', tag: '<1s Latency' },
  { n: '05', t: 'Terrain Drive', d: 'Omni-wheels and active suspension handle rugs, thresholds and lawn.', tag: 'All-Surface' },
  { n: '06', t: 'Self Docking', d: 'Finds its own power, tops up in 22 minutes and returns to standby.', tag: '22 Min Charge' },
]

/** GSAP-pinned horizontal scroll rail. */
export default function Capabilities() {
  const root = useRef<HTMLElement>(null)
  const rail = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const track = rail.current
      if (!track) return
      if (window.matchMedia('(max-width: 900px)').matches) return

      const distance = () => track.scrollWidth - window.innerWidth + 120

      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      })

      // cards tilt slightly as they cross the viewport
      gsap.utils.toArray<HTMLElement>('.cap__card').forEach((card) => {
        gsap.fromTo(
          card,
          { rotate: 2.5, y: 34, opacity: 0.35 },
          {
            rotate: 0,
            y: 0,
            opacity: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              containerAnimation: tween,
              start: 'left 92%',
              end: 'left 52%',
              scrub: true,
            },
          },
        )
      })

      gsap.to('.cap__progress span', {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: () => `+=${distance()}`,
          scrub: true,
        },
      })
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section className="cap" id="capabilities" ref={root}>
      <div className="cap__head shell">
        <div>
          <span className="eyebrow">Capabilities</span>
          <SplitText
            as="h2"
            className="cap__title"
            text="Six systems, one calm machine."
            stagger={0.045}
          />
        </div>
        <p>
          Every subsystem was built to disappear. You notice the outcome, never
          the process.
        </p>
      </div>

      <div className="cap__viewport">
        <div className="cap__rail" ref={rail}>
          {CARDS.map((c) => (
            <article className="cap__card" key={c.n} data-cursor="hover">
              <header>
                <em>{c.n}</em>
                <span className="cap__tag">{c.tag}</span>
              </header>
              <div className="cap__cardBody">
                <h3>{c.t}</h3>
                <p>{c.d}</p>
              </div>
              <div className="cap__line" />
              <div className="cap__sheen" />
            </article>
          ))}
          <article className="cap__card cap__card--cta">
            <h3>
              Want the <span className="italic-serif">full</span> spec?
            </h3>
            <p>Technical brief, sensor stack and SDK preview.</p>
            <a href="#cta" data-cursor="hover">
              Request access
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </article>
        </div>
      </div>

      <div className="cap__progress shell">
        <span />
      </div>
    </section>
  )
}
