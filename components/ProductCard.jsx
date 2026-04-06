import Link from 'next/link'
import Image from 'next/image'
import { formatLkr } from '@/lib/products'

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
          <div className="absolute inset-0 bg-brand-950/20 product-overlay-reveal" />

          {/* Quick View indicator */}
          <div className="absolute bottom-4 max-sm:bottom-2 left-1/2 -translate-x-1/2 product-quickview w-[85%] text-center">
            <span className="bg-white dark:bg-brand-950 text-brand-950 dark:text-white text-xs max-sm:text-[9px] font-medium tracking-widest uppercase px-4 py-2 max-sm:px-2 max-sm:py-1.5 whitespace-nowrap shadow-lg">
              View Details
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="p-5 max-sm:p-2">
          <div className="flex flex-col max-sm:gap-0.5 sm:flex-row sm:justify-between sm:items-start gap-2">
            <div className="min-w-0 w-full">
              <p className="text-xs max-sm:text-[9px] text-brand-400 dark:text-brand-500 tracking-widest uppercase mb-1 max-sm:mb-0.5 truncate">{product.code}</p>
              <h3 className="text-sm max-sm:text-[10px] font-medium text-brand-900 dark:text-white leading-snug max-sm:leading-tight group-hover:text-brand-600 dark:group-hover:text-brand-300 transition-colors duration-300 truncate">
                {product.name}
              </h3>
            </div>
            <p
              style={{ fontFamily: 'Cormorant Garamond, serif' }}
              className="text-xl max-sm:text-[11px] font-light text-brand-950 dark:text-white shrink-0 sm:self-start"
            >
              {formatLkr(product.price)}
            </p>
          </div>

          {/* Bottom line animation */}
          <div className="mt-4 max-sm:mt-2 h-px bg-brand-100 dark:bg-brand-800 overflow-hidden">
            <div className="h-full bg-brand-950 dark:bg-white product-line-expand" />
          </div>
        </div>
      </div>
    </Link>
  )
}
