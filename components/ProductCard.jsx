import Link from 'next/link'
import Image from 'next/image'

export default function ProductCard({ product }) {
  return (
    <Link href={`/products/${product.id}`} className="group block">
      <div className="product-card-enhanced relative overflow-hidden bg-white dark:bg-brand-900 border border-brand-100 dark:border-brand-800 rounded-[20px]">
        {/* Image Container */}
        <div className="relative overflow-hidden aspect-[4/5] bg-brand-100 dark:bg-brand-800">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover product-img-zoom"
          />
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-brand-950/0 product-overlay-reveal bg-brand-950/20" />

          {/* Quick View indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 product-quickview">
            <span className="bg-white dark:bg-brand-950 text-brand-950 dark:text-white text-xs font-medium tracking-widest uppercase px-4 py-2 whitespace-nowrap shadow-lg">
              View Details
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="p-5">
          <div className="flex justify-between items-start gap-2">
            <div>
              <p className="text-xs text-brand-400 dark:text-brand-500 tracking-widest uppercase mb-1">{product.code}</p>
              <h3 className="text-sm font-medium text-brand-900 dark:text-white leading-snug group-hover:text-brand-600 dark:group-hover:text-brand-300 transition-colors duration-300">
                {product.name}
              </h3>
            </div>
            <p
              style={{ fontFamily: 'Cormorant Garamond, serif' }}
              className="text-xl font-light text-brand-950 dark:text-white shrink-0"
            >
              ${product.price.toFixed(2)}
            </p>
          </div>

          {/* Bottom line animation */}
          <div className="mt-4 h-px bg-brand-100 dark:bg-brand-800 overflow-hidden">
            <div className="h-full bg-brand-950 dark:bg-white product-line-expand" />
          </div>
        </div>
      </div>
    </Link>
  )
}
