'use client'

const WHATSAPP_NUMBER = '1234567890' // Replace with your actual WhatsApp number

export default function WhatsAppButton({ product, selectedSize, quantity, disabled }) {
  const handleClick = () => {
    if (disabled) return
    const message = `Hello, I want to order this product:\n\nProduct: ${product.name}\nCode: ${product.code}\nSize: ${selectedSize}\nQuantity: ${quantity}`
    const encodedMessage = encodeURIComponent(message)
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="relative">
      <button
        onClick={handleClick}
        disabled={disabled}
        className={`w-full flex items-center justify-center gap-3 py-4 px-6 font-medium tracking-widest uppercase text-sm transition-all duration-300 ${
          disabled
            ? 'bg-brand-100 dark:bg-brand-800 text-brand-300 dark:text-brand-600 cursor-not-allowed'
            : 'bg-green-600 hover:bg-green-700 text-white active:scale-[0.98] shadow-lg shadow-green-600/20'
        }`}
      >
        <svg
          className={`w-5 h-5 transition-all duration-300 ${disabled ? 'opacity-30' : ''}`}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.132.558 4.135 1.535 5.875L.057 23.447a.5.5 0 00.492.553h.062l5.7-1.498A11.955 11.955 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.99 0-3.859-.552-5.455-1.512l-.39-.232-4.028 1.059 1.076-3.937-.254-.41A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
        </svg>
        {disabled ? 'Select Size & Quantity to Order' : 'Order via WhatsApp'}
      </button>

      {disabled && (
        <p className="text-center text-xs text-brand-400 dark:text-brand-600 mt-2 tracking-wide">
          Please select a size and quantity to enable ordering
        </p>
      )}
    </div>
  )
}
