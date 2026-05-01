'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import ScrollAnimations from '@/components/ScrollAnimations'
import { formatLkr } from '@/lib/products'

export default function ProductDetailPage() {
  const params = useParams()
  const [product, setProduct] = useState(null)
  const [selectedSize, setSelectedSize] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [activeTab, setActiveTab] = useState('description')

  useEffect(() => {
    const fetchProduct = async () => {
    try {
      const res = await fetch('/api/products')
      const result = await res.json()
      if (result.success) {
        const found = result.data.find(p => p._id === params.id || p.id === params.id)
        setProduct(found || null)
      }
    } catch (error) {
      console.error(error)
    }
  }
  fetchProduct()
  }, [params.id])

  if (!product) {
    return (
      <div className="min-h-screen bg-brand-50 dark:bg-brand-950 flex items-center justify-center">
        <Navbar />
        <div className="text-center">
          <p className="text-brand-400 dark:text-brand-600 text-sm tracking-widest uppercase mb-4">Product not found</p>
          <Link href="/products" className="btn-outline">← Back to Shop</Link>
        </div>
      </div>
    )
  }

  const isOrderable = selectedSize && quantity > 0

  return (
    <ScrollAnimations>
      <div className="min-h-screen bg-brand-50 dark:bg-brand-950">
        <Navbar />

        {/* Breadcrumb */}
        <div className="pt-24 pb-4 bg-white dark:bg-brand-950 border-b border-brand-100 dark:border-brand-900">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <nav className="flex items-center gap-2 text-xs tracking-widest uppercase text-brand-400 dark:text-brand-600 gsap-reveal-up">
              <Link href="/" className="hover:text-brand-950 dark:hover:text-white transition-colors duration-200">Home</Link>
              <span>/</span>
              <Link href="/products" className="hover:text-brand-950 dark:hover:text-white transition-colors duration-200">Shop</Link>
              <span>/</span>
              <span className="text-brand-700 dark:text-brand-300">{product.name}</span>
            </nav>
          </div>
        </div>

        {/* Product Layout */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20">

              {/* Image */}
              <div className="relative gsap-reveal-left">
                <div className="aspect-[3/4] bg-brand-100 dark:bg-brand-900 overflow-hidden sticky top-24">
                  <img
                    src={product.image}
                    alt={product.name}
                    className={`w-full h-full object-cover transition-all duration-700 ${imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
                    onLoad={() => setImageLoaded(true)}
                  />
                  {!imageLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-8 h-8 border border-brand-300 dark:border-brand-700 border-t-transparent rounded-full animate-spin" />
                    </div>
                  )}

                  {/* Code badge */}
                  <div className="absolute top-4 left-4 bg-white/90 dark:bg-brand-950/90 backdrop-blur-sm px-3 py-1.5">
                    <p className="text-xs tracking-widest uppercase text-brand-600 dark:text-brand-400 font-medium">{product.code}</p>
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="flex flex-col py-2 gsap-reveal-right">
                {/* Category & Code */}
                <div className="flex items-center gap-3 mb-4">
                  {product.category && (
                    <span className="text-xs tracking-widest uppercase text-brand-400 dark:text-brand-600 border border-brand-200 dark:border-brand-700 px-2 py-1">
                      {product.category}
                    </span>
                  )}
                  <span className="text-xs tracking-widest uppercase text-brand-400 dark:text-brand-600">#{product.code}</span>
                </div>

                {/* Product Name */}
                <h1
                  style={{ fontFamily: 'Cormorant Garamond, serif' }}
                  className="text-4xl md:text-5xl font-light text-brand-950 dark:text-white mb-4 leading-tight"
                >
                  {product.name}
                </h1>

                {/* Price */}
                <p
                  style={{ fontFamily: 'Cormorant Garamond, serif' }}
                  className="text-4xl font-light text-brand-950 dark:text-white mb-8"
                >
                  {formatLkr(product.price)}
                </p>

                {/* Divider */}
                <div className="h-px bg-brand-100 dark:bg-brand-800 mb-8 gsap-line-reveal" />

                {/* Size Selection */}
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-4">
                    <p className="text-xs font-medium tracking-widest uppercase text-brand-700 dark:text-brand-300">
                      Select Size
                    </p>
                    {!selectedSize && (
                      <span className="text-xs text-brand-400 dark:text-brand-600 italic">Required to order</span>
                    )}
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {product.sizes?.map(size => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(selectedSize === size ? '' : size)}
                        className={`w-12 h-12 text-sm font-medium border transition-all duration-200 ${
                          selectedSize === size
                            ? 'bg-brand-950 dark:bg-white border-brand-950 dark:border-white text-white dark:text-brand-950'
                            : 'border-brand-200 dark:border-brand-700 text-brand-700 dark:text-brand-300 hover:border-brand-950 dark:hover:border-white'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity */}
                <div className="mb-8">
                  <p className="text-xs font-medium tracking-widest uppercase text-brand-700 dark:text-brand-300 mb-4">Quantity</p>
                  <div className="flex items-center border border-brand-200 dark:border-brand-700 w-fit">
                    <button
                      onClick={() => setQuantity(q => Math.max(1, q - 1))}
                      className="w-12 h-12 flex items-center justify-center text-brand-600 dark:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-800 transition-colors duration-200"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 12H4" />
                      </svg>
                    </button>
                    <span className="w-12 h-12 flex items-center justify-center text-brand-950 dark:text-white font-medium border-x border-brand-200 dark:border-brand-700">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(q => q + 1)}
                      className="w-12 h-12 flex items-center justify-center text-brand-600 dark:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-800 transition-colors duration-200"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* WhatsApp Order Button */}
                <div className="mb-8">
                  <WhatsAppButton
                    product={product}
                    selectedSize={selectedSize}
                    quantity={quantity}
                    disabled={!isOrderable}
                  />
                </div>

                {/* Order Summary (when orderable) */}
                {isOrderable && (
                  <div className="bg-brand-50 dark:bg-brand-900 border border-brand-100 dark:border-brand-800 p-4 mb-8 animate-slide-up">
                    <p className="text-xs tracking-widest uppercase text-brand-500 dark:text-brand-500 mb-3">Order Summary</p>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-brand-500 dark:text-brand-400">Product</span>
                        <span className="text-brand-900 dark:text-white font-medium">{product.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-brand-500 dark:text-brand-400">Code</span>
                        <span className="text-brand-900 dark:text-white font-medium">{product.code}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-brand-500 dark:text-brand-400">Size</span>
                        <span className="text-brand-900 dark:text-white font-medium">{selectedSize}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-brand-500 dark:text-brand-400">Qty</span>
                        <span className="text-brand-900 dark:text-white font-medium">{quantity}</span>
                      </div>
                      <div className="border-t border-brand-200 dark:border-brand-700 pt-1 mt-1 flex justify-between font-medium">
                        <span className="text-brand-700 dark:text-brand-300">Total</span>
                        <span
                          style={{ fontFamily: 'Cormorant Garamond, serif' }}
                          className="text-brand-950 dark:text-white text-lg"
                        >
                          {formatLkr(product.price * quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Description Tabs */}
                <div>
                  <div className="flex border-b border-brand-100 dark:border-brand-800 mb-6">
                    {['description', 'details'].map(tab => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`text-xs tracking-widest uppercase pb-3 mr-6 border-b-2 transition-all duration-200 ${
                          activeTab === tab
                            ? 'border-brand-950 dark:border-white text-brand-950 dark:text-white'
                            : 'border-transparent text-brand-400 dark:text-brand-600 hover:text-brand-700 dark:hover:text-brand-300'
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>

                  {activeTab === 'description' && (
                    <p className="text-sm text-brand-600 dark:text-brand-400 leading-relaxed animate-fade-in">
                      {product.description}
                    </p>
                  )}

                  {activeTab === 'details' && (
                    <div className="space-y-3 animate-fade-in">
                      {[
                        { label: 'Product Code', value: product.code },
                        { label: 'Category', value: product.category || 'Uncategorised' },
                        { label: 'Available Sizes', value: product.sizes?.join(', ') || 'See options above' },
                        { label: 'Price', value: formatLkr(product.price) },
                      ].map(detail => (
                        <div key={detail.label} className="flex justify-between py-2 border-b border-brand-100 dark:border-brand-900">
                          <span className="text-xs tracking-widest uppercase text-brand-400 dark:text-brand-600">{detail.label}</span>
                          <span className="text-sm text-brand-700 dark:text-brand-300">{detail.value}</span>
                        </div>
                      ))}
                    </div>
                  )}
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
