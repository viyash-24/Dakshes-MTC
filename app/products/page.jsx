'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ProductGrid from '@/components/ProductGrid'
import ScrollAnimations from '@/components/ScrollAnimations'


const CATEGORIES = ['All', 'Tops', 'Bottoms', 'Outerwear', 'Knitwear', 'Accessories']

export default function ProductsPage() {
  const [products, setProducts] = useState([])
  const [activeCategory, setActiveCategory] = useState('All')
  const [sortBy, setSortBy] = useState('default')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products')
        const result = await res.json()
        if (result.success) {
          setProducts(result.data)
        }
      } catch (err) {
        console.error('Error fetching products', err)
      }
    }
    fetchProducts()
  }, [])

  const filtered = products
    .filter(p => activeCategory === 'All' || p.category === activeCategory)
    .filter(p =>
      !searchQuery ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.code.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price
      if (sortBy === 'price-desc') return b.price - a.price
      if (sortBy === 'name') return a.name.localeCompare(b.name)
      return 0
    })

  return (
    <ScrollAnimations>
      <div className="min-h-screen bg-brand-50 dark:bg-brand-950">
        <Navbar />

        {/* Page Header */}
        <section className="pt-32 pb-12 bg-white dark:bg-brand-950 border-b border-brand-100 dark:border-brand-900">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <p className="text-xs tracking-widest uppercase text-brand-400 dark:text-brand-600 mb-3 gsap-text-reveal">Catalogue</p>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <h1
                style={{ fontFamily: 'Cormorant Garamond, serif' }}
                className="text-5xl md:text-6xl font-light text-brand-950 dark:text-white gsap-reveal-up"
              >
                All Products
              </h1>
              <p className="text-sm text-brand-400 dark:text-brand-600 gsap-reveal-right">
                {filtered.length} piece{filtered.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="sticky top-16 z-30 bg-white/95 dark:bg-brand-950/95 backdrop-blur-md border-b border-brand-100 dark:border-brand-900">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row gap-4 py-4">
              {/* Search */}
              <div className="relative flex-1 max-w-xs">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full bg-brand-50 dark:bg-brand-900 border border-brand-200 dark:border-brand-800 pl-10 pr-4 py-2 text-sm text-brand-900 dark:text-white placeholder:text-brand-400 focus:outline-none focus:border-brand-950 dark:focus:border-white transition-colors duration-200"
                />
              </div>

              {/* Category Filters */}
              <div className="flex gap-2 overflow-x-auto pb-1 sm:pb-0 flex-1">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`whitespace-nowrap text-xs font-medium tracking-widest uppercase px-4 py-2 border transition-all duration-200 shrink-0 ${
                      activeCategory === cat
                        ? 'bg-brand-950 dark:bg-white border-brand-950 dark:border-white text-white dark:text-brand-950'
                        : 'border-brand-200 dark:border-brand-800 text-brand-500 dark:text-brand-400 hover:border-brand-500 dark:hover:border-brand-400'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="bg-brand-50 dark:bg-brand-900 border border-brand-200 dark:border-brand-800 px-4 py-2 text-xs tracking-widest uppercase text-brand-700 dark:text-brand-300 focus:outline-none focus:border-brand-950 dark:focus:border-white cursor-pointer transition-colors duration-200"
              >
                <option value="default">Sort: Default</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name">Name: A-Z</option>
              </select>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <ProductGrid products={filtered} />
          </div>
        </section>

        <Footer />
      </div>
    </ScrollAnimations>
  )
}
