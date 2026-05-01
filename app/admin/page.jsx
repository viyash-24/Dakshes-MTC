'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import ProductForm from '@/components/ProductForm'
import { GET, POST, formatLkr } from '@/lib/products'

const ADMIN_PASSWORD = 'admin123'

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState(false)
  const [products, setProducts] = useState([])
  const [view, setView] = useState('dashboard') // 'dashboard' | 'add' | 'edit'
  const [editingProduct, setEditingProduct] = useState(null)
  const [deleteConfirm, setDeleteConfirm] = useState(null)
  const [toast, setToast] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    const auth = sessionStorage.getItem('void_admin')
    if (auth === 'true') {
      setIsAuthenticated(true)
      setProducts(GET())
    }
  }, [])

  const showToast = (message, type = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  // To Fetch
const fetchProducts = async () => {
  const res = await fetch('/api/products')
  const result = await res.json()
  if (result.success) setProducts(result.data)
}

  const handleLogin = async () => {
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem('void_admin', 'true')
      setIsAuthenticated(true)
      await fetchProducts()
    } else {
      setPasswordError(true)
      setTimeout(() => setPasswordError(false), 2000)
    }
  }

  const handleLogout = () => {
    sessionStorage.removeItem('void_admin')
    setIsAuthenticated(false)
    setPassword('')
  }

  const handleSave = (product) => {
    const updated = editingProduct
      ? products.map(p => p.id === product.id ? product : p)
      : [...products, product]
    setProducts(updated)
    POST(updated)
    setView('dashboard')
    setEditingProduct(null)
    showToast(editingProduct ? 'Product updated successfully' : 'Product added successfully')
  }

  const handleDelete = (id) => {
    const updated = products.filter(p => p.id !== id)
    setProducts(updated)
    POST(updated)
    setDeleteConfirm(null)
    showToast('Product deleted', 'error')
  }

  const handleEdit = (product) => {
    setEditingProduct(product)
    setView('edit')
    setSidebarOpen(false)
  }

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-brand-950 flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="flex items-center justify-center gap-3 mb-12">
            <div className="w-8 h-8 bg-white flex items-center justify-center">
              <span className="text-brand-950 text-xs font-bold">D</span>
            </div>
            <span style={{ fontFamily: 'Cormorant Garamond, serif' }} className="text-3xl font-light text-white tracking-[0.2em] uppercase">
              Dakshes Admin
            </span>
          </div>

          <div className="bg-brand-900 border border-brand-800 p-8">
            <h2 className="text-sm tracking-widest uppercase text-brand-400 mb-8 text-center">Restricted Access</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-xs tracking-widest uppercase text-brand-500 mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleLogin()}
                  placeholder="Enter admin password"
                  className={`w-full bg-brand-950 border px-4 py-3 text-sm text-white placeholder:text-brand-600 focus:outline-none transition-all duration-300 ${
                    passwordError
                      ? 'border-red-500 shake'
                      : 'border-brand-700 focus:border-white'
                  }`}
                />
                {passwordError && (
                  <p className="text-red-400 text-xs mt-2 tracking-wide">Incorrect password. Try: void2024</p>
                )}
              </div>

              <button
                onClick={handleLogin}
                className="w-full bg-white text-brand-950 py-3 text-xs font-medium tracking-widest uppercase hover:bg-brand-100 transition-colors duration-200"
              >
                Enter Dashboard
              </button>
            </div>

            <div className="mt-6 text-center">
              <Link href="/" className="text-xs text-brand-600 hover:text-brand-400 tracking-widest uppercase transition-colors duration-200">
                ← Back to Store
              </Link>
            </div>
          </div>

          <p className="text-center text-xs text-brand-700 mt-6 tracking-wide">Demo password: void2024</p>
        </div>

        <style jsx>{`
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-8px); }
            75% { transform: translateX(8px); }
          }
          .shake { animation: shake 0.3s ease; }
        `}</style>
      </div>
    )
  }

  const navItems = [
    { id: 'dashboard', label: 'Products', icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    )},
    { id: 'add', label: 'Add Product', icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
      </svg>
    )},
  ]

  return (
    <div className="min-h-screen bg-brand-50 dark:bg-brand-950 flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-brand-950 dark:bg-black flex flex-col transform transition-transform duration-300 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 lg:static lg:z-auto`}>
        {/* Logo */}
        <div className="p-6 border-b border-brand-800">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 bg-white flex items-center justify-center shrink-0">
              <span className="text-brand-950 text-xs font-bold">D</span>
            </div>
            <span style={{ fontFamily: 'Cormorant Garamond, serif' }} className="text-xl font-light text-white tracking-widest">
              DAKSHES
            </span>
          </div>
          <p className="text-xs text-brand-600 tracking-widest mt-1 ml-10">ADMIN PANEL</p>
        </div>

        {/* Stats */}
        <div className="p-4 border-b border-brand-800">
          <div className="bg-brand-900 px-4 py-3">
            <p className="text-xs tracking-widest uppercase text-brand-500">Total Products</p>
            <p style={{ fontFamily: 'Cormorant Garamond, serif' }} className="text-3xl font-light text-white mt-1">
              {products.length}
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => {
                setView(item.id)
                setEditingProduct(null)
                setSidebarOpen(false)
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-medium tracking-widest uppercase transition-all duration-200 text-left ${
                view === item.id || (view === 'edit' && item.id === 'dashboard')
                  ? 'bg-white text-brand-950'
                  : 'text-brand-400 hover:bg-brand-900 hover:text-white'
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-brand-800 space-y-2">
          <Link
            href="/products"
            className="w-full flex items-center gap-3 px-4 py-3 text-xs font-medium tracking-widest uppercase text-brand-500 hover:text-white transition-colors duration-200"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            View Store
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-xs font-medium tracking-widest uppercase text-brand-500 hover:text-red-400 transition-colors duration-200"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </div>
      </aside>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-brand-950/60 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="bg-white dark:bg-brand-900 border-b border-brand-100 dark:border-brand-800 px-6 py-4 flex items-center gap-4 sticky top-0 z-20">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden w-8 h-8 flex items-center justify-center text-brand-600 dark:text-brand-400"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div>
            <h1 className="text-sm font-medium tracking-widest uppercase text-brand-950 dark:text-white">
              {view === 'dashboard' ? 'Product Management' : view === 'add' ? 'Add New Product' : 'Edit Product'}
            </h1>
            <p className="text-xs text-brand-400 dark:text-brand-600">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          <div className="ml-auto">
            {view === 'dashboard' && (
              <button
                onClick={() => { setView('add'); setEditingProduct(null) }}
                className="btn-primary py-2 text-xs"
              >
                + Add Product
              </button>
            )}
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-auto">

          {/* Products Table */}
          {view === 'dashboard' && (
            <div className="animate-fade-in">
              {/* Mobile Cards */}
              <div className="lg:hidden space-y-4">
                {products.map(product => (
                  <div key={product.id} className="bg-white dark:bg-brand-900 border border-brand-100 dark:border-brand-800 p-4">
                    <div className="flex gap-4">
                      <div className="w-16 h-20 bg-brand-100 dark:bg-brand-800 overflow-hidden shrink-0">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-brand-400 tracking-widest">{product.code}</p>
                        <p className="text-sm font-medium text-brand-900 dark:text-white truncate">{product.name}</p>
                        <p style={{ fontFamily: 'Cormorant Garamond, serif' }} className="text-xl text-brand-950 dark:text-white">{formatLkr(product.price)}</p>
                        <p className="text-xs text-brand-400 dark:text-brand-600 mt-1">{product.category}</p>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <button onClick={() => handleEdit(product)} className="flex-1 btn-outline py-2 text-xs">Edit</button>
                      <button onClick={() => setDeleteConfirm(product.id)} className="flex-1 py-2 text-xs border border-red-200 dark:border-red-900 text-red-500 hover:bg-red-50 dark:hover:bg-red-950 tracking-widest uppercase transition-colors duration-200">Delete</button>
                    </div>
                  </div>
                ))}
                {products.length === 0 && (
                  <div className="text-center py-16 text-brand-400 text-sm">No products yet. Add your first product!</div>
                )}
              </div>

              {/* Desktop Table */}
              <div className="hidden lg:block bg-white dark:bg-brand-900 border border-brand-100 dark:border-brand-800 overflow-hidden">
                <div className="overflow-x-auto"> {/* Added scrollable div */}
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-brand-100 dark:border-brand-800">
                        <th className="text-left text-xs tracking-widest uppercase text-brand-400 dark:text-brand-600 px-6 py-4 font-medium">Product</th>
                        <th className="text-left text-xs tracking-widest uppercase text-brand-400 dark:text-brand-600 px-6 py-4 font-medium">Code</th>
                        <th className="text-left text-xs tracking-widest uppercase text-brand-400 dark:text-brand-600 px-6 py-4 font-medium">Category</th>
                        <th className="text-left text-xs tracking-widest uppercase text-brand-400 dark:text-brand-600 px-6 py-4 font-medium">Price (LKR)</th>
                        <th className="text-left text-xs tracking-widest uppercase text-brand-400 dark:text-brand-600 px-6 py-4 font-medium">Sizes</th>
                        <th className="text-right text-xs tracking-widest uppercase text-brand-400 dark:text-brand-600 px-6 py-4 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product, i) => (
                        <tr
                          key={product.id}
                          className="border-b border-brand-50 dark:border-brand-800/50 hover:bg-brand-50 dark:hover:bg-brand-800/30 transition-colors duration-200"
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-12 bg-brand-100 dark:bg-brand-800 overflow-hidden shrink-0">
                                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                              </div>
                              <span className="text-sm font-medium text-brand-900 dark:text-white">{product.name}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-xs tracking-widest text-brand-500 dark:text-brand-400 font-mono">{product.code}</span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-xs border border-brand-200 dark:border-brand-700 px-2 py-1 text-brand-600 dark:text-brand-400 tracking-wide">
                              {product.category || '—'}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span style={{ fontFamily: 'Cormorant Garamond, serif' }} className="text-xl text-brand-950 dark:text-white">
                              {formatLkr(product.price)}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex gap-1 flex-wrap">
                              {product.sizes?.map(s => (
                                <span key={s} className="text-xs border border-brand-200 dark:border-brand-700 w-7 h-7 flex items-center justify-center text-brand-600 dark:text-brand-400">
                                  {s}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex justify-end gap-2">
                              <button
                                onClick={() => handleEdit(product)}
                                className="text-xs tracking-widest uppercase border border-brand-200 dark:border-brand-700 px-3 py-1.5 text-brand-600 dark:text-brand-400 hover:border-brand-950 dark:hover:border-white hover:text-brand-950 dark:hover:text-white transition-all duration-200"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => setDeleteConfirm(product.id)}
                                className="text-xs tracking-widest uppercase border border-red-200 dark:border-red-900/50 px-3 py-1.5 text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all duration-200"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div> {/* End of scrollable div */}

                {products.length === 0 && (
                  <div className="text-center py-16">
                    <p className="text-brand-400 text-sm tracking-widest">No products yet.</p>
                    <button
                      onClick={() => setView('add')}
                      className="btn-outline mt-4 text-xs py-2"
                    >
                      Add First Product
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Add / Edit Form */}
          {(view === 'add' || view === 'edit') && (
            <div className="max-w-2xl bg-white dark:bg-brand-900 border border-brand-100 dark:border-brand-800 p-8 animate-fade-in">
              <ProductForm
                product={editingProduct}
                onSave={handleSave}
                onCancel={() => { setView('dashboard'); setEditingProduct(null) }}
              />
            </div>
          )}
        </main>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-brand-950/60 z-50 flex items-center justify-center px-4">
          <div className="bg-white dark:bg-brand-900 border border-brand-200 dark:border-brand-700 p-8 max-w-sm w-full animate-slide-up">
            <h3 style={{ fontFamily: 'Cormorant Garamond, serif' }} className="text-2xl font-light text-brand-950 dark:text-white mb-2">
              Delete Product
            </h3>
            <p className="text-sm text-brand-500 dark:text-brand-400 mb-8">
              This action cannot be undone. Are you sure you want to delete this product?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 py-3 text-xs tracking-widest uppercase bg-red-600 text-white hover:bg-red-700 transition-colors duration-200 font-medium"
              >
                Delete
              </button>
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 btn-outline py-3 text-xs"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 px-5 py-3 text-sm font-medium tracking-wide animate-slide-up ${
          toast.type === 'error'
            ? 'bg-red-600 text-white'
            : 'bg-brand-950 dark:bg-white text-white dark:text-brand-950'
        }`}>
          {toast.message}
        </div>
      )}
    </div>
  )
}
