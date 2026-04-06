'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ScrollAnimations({ children, refreshKey }) {
  const containerRef = useRef(null)

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return

    const container = containerRef.current
    if (!container) return

    const ctx = gsap.context(() => {
      // --- Reveal Up animations ---
      const revealUpEls = container.querySelectorAll('.gsap-reveal-up')
      revealUpEls.forEach((el) => {
        gsap.to(el, {
          y: 0,
          opacity: 1,
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            once: true,
          },
        })
      })

      // --- Reveal Left animations ---
      const revealLeftEls = container.querySelectorAll('.gsap-reveal-left')
      revealLeftEls.forEach((el) => {
        gsap.to(el, {
          x: 0,
          opacity: 1,
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            once: true,
          },
        })
      })

      // --- Reveal Right animations ---
      const revealRightEls = container.querySelectorAll('.gsap-reveal-right')
      revealRightEls.forEach((el) => {
        gsap.to(el, {
          x: 0,
          opacity: 1,
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            once: true,
          },
        })
      })

      // --- Reveal Scale animations ---
      const revealScaleEls = container.querySelectorAll('.gsap-reveal-scale')
      revealScaleEls.forEach((el) => {
        gsap.to(el, {
          scale: 1,
          opacity: 1,
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            once: true,
          },
        })
      })

      // --- Text reveal (clip-path) animations ---
      const textRevealEls = container.querySelectorAll('.gsap-text-reveal')
      textRevealEls.forEach((el) => {
        gsap.to(el, {
          clipPath: 'inset(0 0% 0 0)',
          opacity: 1,
          duration: 0.9,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            once: true,
          },
        })
      })

      // --- Line reveal animations ---
      const lineRevealEls = container.querySelectorAll('.gsap-line-reveal')
      lineRevealEls.forEach((el) => {
        gsap.to(el, {
          scaleX: 1,
          duration: 0.85,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            once: true,
          },
        })
      })

      // --- Staggered item reveals (product cards, brand pillars, etc.) ---
      const staggerGroups = container.querySelectorAll('[data-gsap-stagger]')
      staggerGroups.forEach((group) => {
        const items = group.querySelectorAll('.gsap-stagger-item')
        if (!items.length) return

        gsap.to(items, {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: group,
            start: 'top 85%',
            once: true,
          },
        })
      })

      // --- Parallax background images ---
      const parallaxEls = container.querySelectorAll('[data-gsap-parallax]')
      parallaxEls.forEach((el) => {
        const img = el.querySelector('img')
        if (!img) return

        gsap.to(img, {
          y: 60,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.6,
          },
        })
      })

      // --- Section separator line animations ---
      const separators = container.querySelectorAll('.section-divider')
      separators.forEach((sep) => {
        gsap.fromTo(
          sep,
          { scaleX: 0, transformOrigin: 'center center' },
          {
            scaleX: 1,
            duration: 1.2,
            ease: 'power2.inOut',
            scrollTrigger: {
              trigger: sep,
              start: 'top 92%',
              once: true,
            },
          }
        )
      })

      // --- Navbar entrance ---
      const navbar = document.querySelector('nav')
      if (navbar) {
        gsap.fromTo(
          navbar,
          { y: -80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            delay: 0.2,
          }
        )
      }

      // --- Footer stagger reveal ---
      const footer = container.querySelector('footer')
      if (footer) {
        const footerCols = footer.querySelectorAll(':scope > div > div > div')
        if (footerCols.length) {
          gsap.fromTo(
            footerCols,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
              ease: 'power3.out',
              stagger: 0.12,
              scrollTrigger: {
                trigger: footer,
                start: 'top 90%',
                once: true,
              },
            }
          )
        }

        // Footer bottom bar
        const footerBottom = footer.querySelector('.border-t')
        if (footerBottom) {
          gsap.fromTo(
            footerBottom,
            { y: 20, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: footerBottom,
                start: 'top 95%',
                once: true,
              },
            }
          )
        }
      }
    }, container)

    return () => ctx.revert()
  }, [refreshKey])

  return (
    <div ref={containerRef}>
      {children}
    </div>
  )
}
