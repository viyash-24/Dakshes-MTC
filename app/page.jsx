'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ProductCard from '@/components/ProductCard'
import HeroSection from '@/components/HeroSection'
import ScrollAnimations from '@/components/ScrollAnimations'
import { getProducts, initialProducts } from '@/lib/products'

export default function HomePage() {
  const [products, setProducts] = useState(initialProducts)
  const pathname = usePathname()

  const loadProducts = useCallback(() => {
    setProducts(getProducts())
  }, [])

  useEffect(() => {
    loadProducts()

    const onFocus = () => loadProducts()
    const onVisibility = () => {
      if (document.visibilityState === 'visible') loadProducts()
    }

    window.addEventListener('focus', onFocus)
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      window.removeEventListener('focus', onFocus)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [loadProducts])

  useEffect(() => {
    // Ensure products refresh when navigating back to Home
    if (pathname === '/') loadProducts()
  }, [pathname, loadProducts])

  const safeProducts = Array.isArray(products) ? products : []
  const featured = safeProducts.length > 4 ? safeProducts.slice(0, 4) : safeProducts
  const refreshKey = featured.map(p => p.id).join('|')

  return (
    <ScrollAnimations refreshKey={refreshKey}>
      <div className="min-h-screen bg-brand-50 dark:bg-brand-950">
        <Navbar />

        {/* Hero Section */}
        <HeroSection />

        {/* Brand Statement */}
        <section className="py-16 md:py-24 bg-white dark:bg-brand-950 border-y border-brand-100 dark:border-brand-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 md:gap-6" data-gsap-stagger>
              {[
                { num: '01', title: 'Latest Fashion Collection', desc: 'Discover our newest arrivals featuring modern styles and trending designs. We regularly update our collection with fresh fashion pieces for every season.' },
                { num: '02', title: 'Trendy & Stylish', desc: 'Our store offers stylish clothing inspired by the latest fashion trends, helping you stay confident and fashionable every day.' },
                { num: '03', title: 'New Arrivals Every Week', desc: 'We constantly add new products so you can explore the latest clothing collections and find something unique every time you visit.' },
              ].map((item) => (
                <div key={item.num} className="group brand-pillar gsap-stagger-item">
                  <p className="text-xs tracking-widest text-brand-300 dark:text-brand-700 font-medium mb-4">{item.num}</p>
                  <h3
                    style={{ fontFamily: 'Cormorant Garamond, serif' }}
                    className="text-2xl font-light text-brand-900 dark:text-white mb-3"
                  >
                    {item.title}
                  </h3>
                  <div className="pillar-line w-8 h-px bg-brand-200 dark:bg-brand-800 transition-all duration-500 mb-4" />
                  <p className="text-sm text-brand-500 dark:text-brand-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section id="featured" className="py-12 md:py-16 bg-brand-50 dark:bg-brand-950">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
            <div className="flex items-end justify-between mb-6 md:mb-10">
              <div>
                <p className="text-xs tracking-widest uppercase text-brand-400 dark:text-brand-600 mb-2 gsap-text-reveal">Featured</p>
                <h2 className="section-title text-3xl md:text-4xl lg:text-5xl gsap-reveal-up">Selected Pieces</h2>
              </div>
              <Link
                href="/products"
                className="hidden md:flex items-center gap-2 text-xs tracking-widest uppercase text-brand-500 dark:text-brand-400 hover:text-brand-950 dark:hover:text-white transition-colors duration-300 group gsap-reveal-right"
              >
                View All
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            <div className="grid grid-cols-1 max-sm:grid-cols-3 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-sm:gap-2" data-gsap-stagger>
              {featured.map((product) => (
                <div key={product.id} className="gsap-stagger-item">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>

            <div className="text-center mt-12 md:hidden gsap-reveal-up">
              <Link href="/products" className="btn-outline">
                View All Products
              </Link>
            </div>
          </div>
        </section>

        {/* Shop Identity Banner */}
        <section className="relative py-24 md:py-32 bg-brand-950 dark:bg-black overflow-hidden" data-gsap-parallax>
          <div className="absolute inset-0 opacity-30">
            <img
              src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1600&q=80"
              alt=""
              className="w-full h-full object-cover mix-blend-luminosity"
            />
          </div>
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-[10px] sm:text-xs tracking-[0.5em] uppercase text-brand-400 mb-6 gsap-text-reveal">The Dakshes Philosophy</p>
            <h2
              style={{ fontFamily: 'Cormorant Garamond, serif' }}
              className="text-4xl sm:text-5xl md:text-7xl font-light text-white leading-tight mb-8 gsap-reveal-up"
            >
              &ldquo;Less is not
              <br />
              <em className="italic">merely less.&rdquo;</em>
            </h2>
            <p className="text-brand-400 text-base leading-relaxed max-w-xl mx-auto mb-10 gsap-reveal-up">
              We offer a wide range of modern clothing for every style. Discover trendy pieces and new arrivals that fit perfectly into your everyday wardrobe.
            </p>
            <div className="gsap-reveal-scale">
              <Link href="/products" className="btn-primary">
                Explore the Collection
              </Link>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16 md:py-24 bg-white dark:bg-brand-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <p className="text-xs tracking-widest uppercase text-brand-400 dark:text-brand-600 mb-3 gsap-text-reveal">Get in Touch</p>
                <h2 className="section-title mb-6 gsap-reveal-up">We&apos;d love to
                  <br />hear from you
                </h2>
                <p className="text-brand-500 dark:text-brand-500 leading-relaxed mb-10 max-w-md gsap-reveal-up">
                  Whether you have a question about sizes, styles, or placing an order, our team is here to help you find the perfect outfit.
                </p>

                <div className="space-y-5" data-gsap-stagger>
                  {[
                    { icon: 'phone', label: 'Call Us', value: '+94 77 518 6518', href: 'tel:+94775186518' },
                    { icon: 'email', label: 'Email', value: 'vigneshwaranvikki02@gmail.com', href: 'mailto:vigneshwaranvikki02@gmail.com' },
                    { icon: 'whatsapp', label: 'WhatsApp', value: 'Chat with us directly', href: 'https://wa.me/94775186518' },
                    { icon: 'location', label: 'Studio', value: '104/18 crystal market Keyzer st Colombo 11', href: 'https://www.google.com/maps/search/?api=1&query=104%2F18+crystal+market+Keyzer+st+Colombo+11' },
                  ].map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="flex items-center gap-4 group contact-item gsap-stagger-item"
                    >
                      <div className="w-10 h-10 border border-brand-200 dark:border-brand-700 flex items-center justify-center shrink-0 group-hover:border-brand-950 dark:group-hover:border-white transition-colors duration-300">
                        {item.icon === 'phone' && (
                          <svg className="w-4 h-4 text-brand-500 group-hover:text-brand-950 dark:group-hover:text-white transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                        )}
                        {item.icon === 'email' && (
                          <svg className="w-4 h-4 text-brand-500 group-hover:text-brand-950 dark:group-hover:text-white transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        )}
                        {item.icon === 'whatsapp' && (
                          <svg className="w-4 h-4 text-brand-500 group-hover:text-green-500 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.132.558 4.135 1.535 5.875L.057 23.447a.5.5 0 00.492.553h.062l5.7-1.498A11.955 11.955 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.99 0-3.859-.552-5.455-1.512l-.39-.232-4.028 1.059 1.076-3.937-.254-.41A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                          </svg>
                        )}
                        {item.icon === 'location' && (
                          <svg className="w-4 h-4 text-brand-500 group-hover:text-brand-950 dark:group-hover:text-white transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        )}
                      </div>
                      <div>
                        <p className="text-xs tracking-widest uppercase text-brand-400 dark:text-brand-600">{item.label}</p>
                        <p className="text-sm text-brand-700 dark:text-brand-300 group-hover:text-brand-950 dark:group-hover:text-white transition-colors duration-300 break-all sm:break-normal">{item.value}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Image */}
              <div className="relative gsap-reveal-right">
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1679453082290-c29188c88f7d?q=80&w=415&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Contact Dakshes Multi Trade Center"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 -left-4 w-40 h-40 bg-brand-950 dark:bg-white flex items-center justify-center p-4">
                  <div className="text-center text-white dark:text-brand-950">
                    <p
                      style={{ fontFamily: 'Cormorant Garamond, serif' }}
                      className="text-xl md:text-2xl font-light"
                    >
                      DAKSHES
                    </p>
                    <p className="text-[10px] tracking-widest mt-1">MULTI TRADE</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </ScrollAnimations>
  )
}
