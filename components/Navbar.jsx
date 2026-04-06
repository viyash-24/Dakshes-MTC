'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const [isDark, setIsDark] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const saved = localStorage.getItem('theme')
    if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDark(true)
      document.documentElement.classList.add('dark')
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleDark = () => {
    const next = !isDark
    setIsDark(next)
    if (next) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Shop' },
    { href: '/admin', label: 'Admin' },
  ]

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/90 dark:bg-brand-950/90 backdrop-blur-md border-b border-brand-200 dark:border-brand-800 shadow-sm'
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            {/* Logo */}
            <Link href="/" className="group flex items-center gap-3">
              <div className="w-8 h-8 bg-brand-950 dark:bg-white flex items-center justify-center">
                <span className="text-white dark:text-brand-950 text-xs font-bold tracking-widest">D</span>
              </div>
              <span
                style={{ fontFamily: 'Cormorant Garamond, serif' }}
                className="text-md sm:text-xl md:text-2xl font-light tracking-[0.1em] text-brand-950 dark:text-white uppercase group-hover:tracking-[0.15em] transition-all duration-500 max-w-[120px] sm:max-w-none truncate sm:whitespace-normal"
              >
                Dakshes Multi Trade Center
              </span>
            </Link>

            {/* Desktop Links (center) */}
            <div className="hidden md:flex flex-1 justify-center">
              <div className="flex items-center gap-10 px-6 py-2 rounded-full backdrop-blur-xl backdrop-saturate-150 bg-white/45 dark:bg-white/10 border border-white/30 dark:border-white/10 ring-1 ring-white/20 dark:ring-white/10 shadow-md">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-xs font-medium tracking-widest uppercase transition-all duration-300 relative group ${
                      pathname === link.href
                        ? 'text-brand-950 dark:text-white'
                        : 'text-brand-700 dark:text-brand-200 hover:text-brand-950 dark:hover:text-white'
                    }`}
                  >
                    {link.label}
                    <span className={`absolute -bottom-1 left-0 h-px bg-brand-950 dark:bg-white transition-all duration-300 ${
                      pathname === link.href ? 'w-full' : 'w-0 group-hover:w-full'
                    }`} />
                  </Link>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 ml-auto">

              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDark}
                className="w-10 h-10 flex items-center justify-center rounded-full border border-brand-200 dark:border-brand-700 text-brand-600 dark:text-brand-300 hover:border-brand-950 dark:hover:border-white hover:text-brand-950 dark:hover:text-white transition-all duration-300"
                aria-label="Toggle dark mode"
              >
                {isDark ? (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden w-10 h-10 flex items-center justify-center"
                aria-label="Toggle menu"
              >
                <div className="w-5 flex flex-col gap-1.5">
                  <span className={`block h-px bg-brand-950 dark:bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                  <span className={`block h-px bg-brand-950 dark:bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
                  <span className={`block h-px bg-brand-950 dark:bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-500 ${isMenuOpen ? 'max-h-64' : 'max-h-0'}`}>
          <div className="bg-white dark:bg-brand-950 border-t border-brand-100 dark:border-brand-800 px-4 sm:px-6 py-6 flex flex-col gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={`text-sm font-medium tracking-widest uppercase transition-colors duration-300 ${
                  pathname === link.href
                    ? 'text-brand-950 dark:text-white'
                    : 'text-brand-500 dark:text-brand-400'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </>
  )
}
