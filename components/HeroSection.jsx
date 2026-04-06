'use client'

import { useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1920&q=80&auto=format&fit=crop'

export default function HeroSection() {
  const heroRef = useRef(null)
  const curtainRef = useRef(null)
  const bgImageRef = useRef(null)
  const overlayRef = useRef(null)
  const eyebrowRef = useRef(null)
  const headlineRef = useRef(null)
  const headlineLineRefs = useRef([])
  const subtitleRef = useRef(null)
  const ctaRef = useRef(null)
  const scrollIndicatorRef = useRef(null)
  const particlesRef = useRef(null)
  const decorLineRef = useRef(null)
  const morphingShapeRef = useRef(null)
  const magneticBtns = useRef([])

  // Magnetic button effect for desktop
  const handleMouseMove = useCallback((e) => {
    if (window.innerWidth < 768) return
    magneticBtns.current.forEach((btn) => {
      if (!btn) return
      const rect = btn.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const dist = Math.sqrt(dx * dx + dy * dy)
      const maxDist = 120

      if (dist < maxDist) {
        const pull = 1 - dist / maxDist
        gsap.to(btn, {
          x: dx * pull * 0.25,
          y: dy * pull * 0.2,
          duration: 0.4,
          ease: 'power2.out',
        })
      } else {
        gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' })
      }
    })
  }, [])

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      const bg = bgImageRef.current
      const overlay = overlayRef.current
      const hero = heroRef.current
      const heroContent = hero?.querySelector('.hero-content')
      const curtain = curtainRef.current

      if (reduceMotion) {
        if (curtain) gsap.set(curtain, { scaleX: 0 })
        if (bg) gsap.set(bg, { scale: 1, opacity: 1, filter: 'none', y: 0 })
        if (overlay) gsap.set(overlay, { opacity: 1 })
        if (morphingShapeRef.current) gsap.set(morphingShapeRef.current, { scale: 1, opacity: 1, rotation: 0 })
        if (eyebrowRef.current) gsap.set(eyebrowRef.current, { opacity: 1, clipPath: 'none', filter: 'none' })
        headlineLineRefs.current.forEach((line) => {
          if (line) gsap.set(line, { y: 0, opacity: 1, filter: 'none', rotateX: 0 })
        })
        if (decorLineRef.current) gsap.set(decorLineRef.current, { scaleX: 1, opacity: 1 })
        if (subtitleRef.current) gsap.set(subtitleRef.current, { y: 0, opacity: 1, letterSpacing: '0.02em' })
        if (ctaRef.current?.children?.length) {
          gsap.set(ctaRef.current.children, { y: 0, opacity: 1, scale: 1, filter: 'none' })
        }
        if (scrollIndicatorRef.current) gsap.set(scrollIndicatorRef.current, { opacity: 1, y: 0 })
        return
      }

      // === Master Timeline ===
      const master = gsap.timeline({
        defaults: { ease: 'power3.out' },
      })

      // Phase 1: Curtain wipe reveal
      master.fromTo(
        curtain,
        { scaleX: 1, transformOrigin: 'right center' },
        { scaleX: 0, duration: 1.4, ease: 'power4.inOut' },
        0
      )

      // Phase 2: Background image reveal (slightly starts before curtain finishes)
      master.fromTo(
        bg,
        { scale: 1.18, opacity: 0, filter: 'blur(8px)' },
        { scale: 1, opacity: 1, filter: 'blur(0px)', duration: 2, ease: 'power2.out' },
        0.5
      )

      // Overlay fades in
      master.fromTo(
        overlay,
        { opacity: 0 },
        { opacity: 1, duration: 1.5, ease: 'power1.inOut' },
        0.6
      )

      // Phase 3: Combined circle enters (pop-up effect)
      master.fromTo(
        morphingShapeRef.current,
        { scale: 0.5, opacity: 0, rotation: -15 },
        {
          scale: 1,
          opacity: 1,
          rotation: 0,
          duration: 1.2,
          ease: 'back.out(1.5)',
        },
        0.8
      )

      // Continuous floating animation for the circle
      gsap.to(morphingShapeRef.current, {
        y: '-=16',
        duration: 3,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: 2.0,
      })

      // Phase 4: Eyebrow reveal
      master.fromTo(
        eyebrowRef.current,
        {
          clipPath: 'inset(0 100% 0 0)',
          opacity: 0,
          filter: 'blur(4px)',
        },
        {
          clipPath: 'inset(0 0% 0 0)',
          opacity: 1,
          filter: 'blur(0px)',
          duration: 0.9,
          ease: 'power3.inOut',
        },
        1.0
      )

      // Phase 5: Headline lines — word-by-word cinematic reveal
      headlineLineRefs.current.forEach((line, i) => {
        if (!line) return

        // Split words for stagger effect
        const text = line.textContent
        const words = text.split(/\s+/)
        line.innerHTML = ''
        const wordSpans = words.map((word, wi) => {
          const span = document.createElement('span')
          // Add non-breaking space after word unless it's the last word on the line
          span.textContent = (wi < words.length - 1) ? word + '\u00A0' : word
          span.style.display = 'inline-block'
          span.style.opacity = '0'
          span.style.transform = 'translateY(80px) rotateX(-80deg)'
          span.style.transformOrigin = '50% 100%'
          span.style.filter = 'blur(10px)'
          
          // Preserve italic styling for the second line
          if (i === 1) {
            span.style.fontStyle = 'italic'
            span.className = 'hero-headline-accent'
          }
          line.appendChild(span)
          return span
        })

        // Set parent to visible since children handle their own opacity
        gsap.set(line, { opacity: 1 })

        master.to(wordSpans, {
          y: 0,
          rotateX: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 0.9,
          stagger: 0.08,
          ease: 'power3.out',
        }, 1.15 + i * 0.25)
      })

      // Phase 6: Decorative line
      master.fromTo(
        decorLineRef.current,
        { scaleX: 0, transformOrigin: 'left center', opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.8, ease: 'power2.inOut' },
        1.8
      )

      // Phase 7: Subtitle with letter-spacing animation
      master.fromTo(
        subtitleRef.current,
        { y: 32, opacity: 0, letterSpacing: '0.2em', filter: 'blur(6px)' },
        { y: 0, opacity: 1, letterSpacing: '0.02em', filter: 'blur(0px)', duration: 0.9, ease: 'power2.out' },
        1.95
      )

      // Phase 8: CTA buttons with spring entrance
      master.fromTo(
        ctaRef.current?.children || [],
        { y: 30, opacity: 0, scale: 0.92, filter: 'blur(6px)' },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          filter: 'blur(0px)',
          duration: 0.75,
          stagger: 0.14,
          ease: 'back.out(1.7)',
        },
        2.2
      )

      // Phase 9 removed as badge is now combined with the morphing shape

      // Phase 10: Scroll indicator
      master.fromTo(
        scrollIndicatorRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        2.6
      )

      // Continuous scroll indicator bounce
      gsap.to(scrollIndicatorRef.current, {
        y: '+=12',
        duration: 1.5,
        ease: 'power1.inOut',
        repeat: -1,
        yoyo: true,
        delay: 3.2,
      })

      // === Parallax scrolling ===
      if (bg && hero) {
        const setBgY = gsap.quickSetter(bg, 'y', 'px')
        const setBgScale = gsap.quickSetter(bg, 'scale')
        const setContentY = heroContent ? gsap.quickSetter(heroContent, 'y', 'px') : null
        const setContentOpacity = heroContent ? gsap.quickSetter(heroContent, 'opacity') : null

        ScrollTrigger.create({
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.5,
          onUpdate: (self) => {
            const p = self.progress
            setBgY(p * 120)
            setBgScale(1 + p * 0.1)
            if (heroContent) {
              setContentY(p * -55)
              setContentOpacity(Math.max(0, 1 - p * 1.5))
            }
            if (morphingShapeRef.current) {
              gsap.set(morphingShapeRef.current, {
                y: p * -80,
                scale: 1 - p * 0.15,
              })
            }
          },
        })
      }

      // === Floating particles ===
      const particles = particlesRef.current?.querySelectorAll('.hero-particle')
      if (particles?.length) {
        particles.forEach((p) => {
          const size = gsap.utils.random(1.5, 4)
          const startX = gsap.utils.random(0, window.innerWidth)
          const startY = gsap.utils.random(window.innerHeight * 0.2, window.innerHeight * 0.9)
          const alpha = gsap.utils.random(0.15, 0.55)

          gsap.set(p, {
            width: size,
            height: size,
            x: startX,
            y: startY,
            opacity: 0,
            background: `radial-gradient(circle, rgba(251, 191, 36, ${alpha}) 0%, rgba(245, 158, 11, ${alpha * 0.4}) 100%)`,
            boxShadow: `0 0 ${size * 3}px rgba(251, 191, 36, ${alpha * 0.3})`,
          })

          // Entrance with delay
          gsap.to(p, {
            opacity: alpha,
            duration: gsap.utils.random(1, 2.5),
            delay: gsap.utils.random(2, 5),
            ease: 'power1.in',
          })

          // Float upward with drift
          gsap.to(p, {
            y: `-=${gsap.utils.random(100, 280)}`,
            x: `+=${gsap.utils.random(-60, 60)}`,
            opacity: 0,
            duration: gsap.utils.random(7, 14),
            delay: gsap.utils.random(3, 7),
            repeat: -1,
            ease: 'sine.inOut',
          })
        })
      }

      // === Primary button glow pulse (desktop only) ===
      const glowMq = window.matchMedia('(min-width: 768px)')
      if (glowMq.matches) {
        gsap.to('.hero-btn-primary', {
          boxShadow: '0 0 32px rgba(251, 191, 36, 0.4), 0 0 8px rgba(251, 191, 36, 0.2)',
          duration: 2.4,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          delay: 2.8,
        })
      }
    }, heroRef)

    // Magnetic button listeners
    if (window.innerWidth >= 768) {
      window.addEventListener('mousemove', handleMouseMove)
    }

    return () => {
      ctx.revert()
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [handleMouseMove])

  return (
    <section
      ref={heroRef}
      className="hero-section relative min-h-[100dvh] flex items-center overflow-hidden"
      id="hero"
    >
      {/* Cinematic Curtain */}
      <div
        ref={curtainRef}
        className="hero-curtain"
      />

      {/* Background Image */}
      <div
        ref={bgImageRef}
        className="absolute inset-0 overflow-hidden will-change-transform"
        style={{ opacity: 0 }}
      >
        <div className="relative h-full w-full">
          <Image
            src={HERO_IMAGE}
            alt="VOID Studio — premium fashion collection"
            fill
            priority
            sizes="100vw"
            quality={85}
            className="object-cover object-center"
          />
        </div>
      </div>

      {/* Gradient Overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 hero-overlay"
        style={{ opacity: 0 }}
      />

      {/* Grain / Noise Texture Overlay */}
      <div className="absolute inset-0 hero-grain pointer-events-none" />

      {/* Combined Unified Badge / Shape */}
      <div
        ref={morphingShapeRef}
        className="hidden md:flex absolute top-1/4 right-[4%] md:right-[6%] lg:right-[8%] w-32 h-32 md:w-48 md:h-48 rounded-full border border-amber-300/30 items-center justify-center transition-transform hover:scale-105 duration-500"
        style={{ 
          opacity: 0,
          background: 'radial-gradient(circle, rgba(251,191,36,0.15) 0%, rgba(245,158,11,0.05) 100%)',
          backdropFilter: 'blur(8px)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
        }}
      >
        <div className="text-center">
          <p className="text-[10px] md:text-xs tracking-widest uppercase text-amber-300/90 mb-1">Since</p>
          <p
            style={{ fontFamily: 'Cormorant Garamond, serif' }}
            className="text-xl md:text-3xl font-light text-white"
          >
            2026
          </p>
        </div>
      </div>

      {/* Floating Particles (desktop / tablet only) */}
      <div
        ref={particlesRef}
        className="absolute inset-0 pointer-events-none overflow-hidden hidden md:block"
      >
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="hero-particle absolute rounded-full"
          />
        ))}
      </div>

      {/* Decorative Grid Lines */}
      <div className="absolute inset-0 pointer-events-none hero-grid-lines" />

      {/* Hero Content */}
      <div className="hero-content relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <div ref={eyebrowRef} className="flex items-center gap-3 mb-6" style={{ opacity: 0 }}>
            <span className="inline-block w-10 h-px bg-gradient-to-r from-amber-400 to-amber-200" />
            <p className="text-[10px] sm:text-xs tracking-[0.4em] uppercase text-amber-300/90 font-medium">
              New Collection — 2026
            </p>
          </div>

          {/* Main Headline */}
          <h1
            ref={headlineRef}
            style={{ fontFamily: 'Cormorant Garamond, serif' }}
            className="text-5xl sm:text-6xl md:text-8xl font-light text-white leading-[0.95] mb-5"
          >
            <span
              ref={(el) => (headlineLineRefs.current[0] = el)}
              className="block overflow-hidden"
              style={{ opacity: 0 }}
            >
              Dress in
            </span>
            <span
              ref={(el) => (headlineLineRefs.current[1] = el)}
              className="block overflow-hidden"
              style={{ opacity: 0 }}
            >
              silence.
            </span>
          </h1>

          {/* Decorative Line */}
          <div
            ref={decorLineRef}
            className="w-24 h-px bg-gradient-to-r from-amber-400 via-amber-300 to-transparent mb-6"
            style={{ transform: 'scaleX(0)' }}
          />

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className="text-brand-300 dark:text-brand-400 text-sm sm:text-base md:text-lg font-light leading-relaxed mb-8 md:mb-10 max-w-md"
            style={{ opacity: 0 }}
          >
            Discover the latest fashion collections and new arrivals. Stylish, modern clothing designed to elevate your everyday look with timeless elegance.
          </p>

          {/* CTA Buttons */}
          <div
            ref={ctaRef}
            className="flex flex-col sm:flex-row flex-wrap gap-4 w-full sm:w-auto"
          >
            <Link
              href="/products"
              ref={(el) => (magneticBtns.current[0] = el)}
              className="hero-btn-primary magnetic-btn w-full sm:w-auto text-center"
            >
              <span className="hero-btn-text">Shop Collection</span>
              <span className="hero-btn-shine" />
            </Link>
            <a
              href="#contact"
              ref={(el) => (magneticBtns.current[1] = el)}
              className="hero-btn-outline magnetic-btn w-full sm:w-auto text-center"
            >
              Contact Me
            </a>
          </div>
        </div>
      </div>



      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <div
          ref={scrollIndicatorRef}
          className="flex flex-col items-center gap-2"
          style={{ opacity: 0 }}
        >
          <span className="text-[10px] tracking-[0.3em] uppercase text-brand-400/70 font-medium">
            Scroll
          </span>
          <div className="relative w-5 h-8 border border-white/20 rounded-full flex justify-center">
            <div className="hero-scroll-dot w-1 h-1.5 bg-amber-400 rounded-full mt-1.5" />
          </div>
        </div>
      </div>
    </section>
  )
}
