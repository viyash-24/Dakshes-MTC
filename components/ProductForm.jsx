'use client'

import { useState, useEffect } from 'react'

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

export default function ProductForm({ product, onSave, onCancel }) {
  const [form, setForm] = useState({
    name: '',
    price: '',
    code: '',
    image: '',
    description: '',
    sizes: ['S', 'M', 'L'],
    category: '',
  })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (product) {
      setForm({
        ...product,
        price: product.price.toString(),
        sizes: product.sizes || ['S', 'M', 'L'],
      })
    }
  }, [product])

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Product name is required'
    if (!form.price || isNaN(parseFloat(form.price))) e.price = 'Valid price is required'
    if (!form.code.trim()) e.code = 'Product code is required'
    if (!form.description.trim()) e.description = 'Description is required'
    return e
  }

  const handleSubmit = () => {
    const e = validate()
    if (Object.keys(e).length > 0) { setErrors(e); return }

    const saved = {
      ...form,
      id: product?.id || Date.now().toString(),
      price: parseFloat(form.price),
      image: form.image || `https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80`,
    }
    onSave(saved)
  }

  const toggleSize = (size) => {
    setForm(f => ({
      ...f,
      sizes: f.sizes.includes(size) ? f.sizes.filter(s => s !== size) : [...f.sizes, size]
    }))
  }

  const inputClass = (field) =>
    `w-full bg-brand-50 dark:bg-brand-900 border ${
      errors[field] ? 'border-red-400' : 'border-brand-200 dark:border-brand-700'
    } px-4 py-3 text-sm text-brand-900 dark:text-white placeholder:text-brand-400 dark:placeholder:text-brand-600 focus:outline-none focus:border-brand-950 dark:focus:border-white transition-colors duration-200`

  return (
    <div className="space-y-5">
      <h3
        style={{ fontFamily: 'Cormorant Garamond, serif' }}
        className="text-2xl font-light text-brand-900 dark:text-white"
      >
        {product ? 'Edit Product' : 'Add New Product'}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Product Name */}
        <div>
          <label className="block text-xs tracking-widest uppercase text-brand-500 dark:text-brand-400 mb-2">Product Name *</label>
          <input
            type="text"
            value={form.name}
            onChange={e => { setForm(f => ({ ...f, name: e.target.value })); setErrors(er => ({ ...er, name: '' })) }}
            placeholder="e.g. Obsidian Oversized Tee"
            className={inputClass('name')}
          />
          {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
        </div>

        {/* Product Code */}
        <div>
          <label className="block text-xs tracking-widest uppercase text-brand-500 dark:text-brand-400 mb-2">Product Code *</label>
          <input
            type="text"
            value={form.code}
            onChange={e => { setForm(f => ({ ...f, code: e.target.value })); setErrors(er => ({ ...er, code: '' })) }}
            placeholder="e.g. OOT-001"
            className={inputClass('code')}
          />
          {errors.code && <p className="text-red-400 text-xs mt-1">{errors.code}</p>}
        </div>

        {/* Price */}
        <div>
          <label className="block text-xs tracking-widest uppercase text-brand-500 dark:text-brand-400 mb-2">Price (USD) *</label>
          <input
            type="number"
            value={form.price}
            onChange={e => { setForm(f => ({ ...f, price: e.target.value })); setErrors(er => ({ ...er, price: '' })) }}
            placeholder="0.00"
            step="0.01"
            min="0"
            className={inputClass('price')}
          />
          {errors.price && <p className="text-red-400 text-xs mt-1">{errors.price}</p>}
        </div>

        {/* Category */}
        <div>
          <label className="block text-xs tracking-widest uppercase text-brand-500 dark:text-brand-400 mb-2">Category</label>
          <select
            value={form.category}
            onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
            className={inputClass('category') + ' cursor-pointer'}
          >
            <option value="">Select category</option>
            {['Tops', 'Bottoms', 'Outerwear', 'Knitwear', 'Accessories'].map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Image URL */}
      <div>
        <label className="block text-xs tracking-widest uppercase text-brand-500 dark:text-brand-400 mb-2">Image URL</label>
        <input
          type="url"
          value={form.image}
          onChange={e => setForm(f => ({ ...f, image: e.target.value }))}
          placeholder="https://images.unsplash.com/..."
          className={inputClass('image')}
        />
        {form.image && (
          <div className="mt-2 relative w-20 h-24 bg-brand-100 dark:bg-brand-800 overflow-hidden">
            <img src={form.image} alt="preview" className="w-full h-full object-cover" onError={(e) => e.target.style.display = 'none'} />
          </div>
        )}
      </div>

      {/* Description */}
      <div>
        <label className="block text-xs tracking-widest uppercase text-brand-500 dark:text-brand-400 mb-2">Description *</label>
        <textarea
          value={form.description}
          onChange={e => { setForm(f => ({ ...f, description: e.target.value })); setErrors(er => ({ ...er, description: '' })) }}
          placeholder="Product description..."
          rows={4}
          className={inputClass('description') + ' resize-none'}
        />
        {errors.description && <p className="text-red-400 text-xs mt-1">{errors.description}</p>}
      </div>

      {/* Sizes */}
      <div>
        <label className="block text-xs tracking-widest uppercase text-brand-500 dark:text-brand-400 mb-3">Available Sizes</label>
        <div className="flex gap-2 flex-wrap">
          {SIZES.map(size => (
            <button
              key={size}
              type="button"
              onClick={() => toggleSize(size)}
              className={`w-10 h-10 text-xs font-medium border transition-all duration-200 ${
                form.sizes.includes(size)
                  ? 'bg-brand-950 dark:bg-white border-brand-950 dark:border-white text-white dark:text-brand-950'
                  : 'border-brand-200 dark:border-brand-700 text-brand-600 dark:text-brand-400 hover:border-brand-500'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={handleSubmit}
          className="btn-primary flex-1"
        >
          {product ? 'Update Product' : 'Add Product'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="btn-outline"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}
