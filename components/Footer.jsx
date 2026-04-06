import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-brand-950 dark:bg-black text-brand-300 dark:text-brand-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-8 lg:gap-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-white dark:bg-brand-950 flex items-center justify-center">
                <span className="text-brand-950 dark:text-white text-xs font-bold tracking-widest">D</span>
              </div>
              <span
                style={{ fontFamily: 'Cormorant Garamond, serif' }}
                className="text-lg font-light tracking-[0.1em] text-white uppercase"
              >
                Dakshes Multi Trade Center
              </span>
            </div>
            <p className="text-sm leading-relaxed text-brand-400 dark:text-brand-600 max-w-xs">
              Premium essentials crafted for those who find meaning in the minimal. Every piece designed with intention, built to last.
            </p>
            <div className="flex gap-4 mt-8">
              {['Instagram', 'facebook'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="text-xs tracking-widest uppercase text-brand-500 footer-social-link"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs tracking-widest uppercase text-brand-500 dark:text-brand-600 mb-6 font-medium">Navigation</h4>
            <ul className="space-y-3">
              {[
                { href: '/', label: 'Home' },
                { href: '/products', label: 'Shop All' },
                { href: '/admin', label: 'Admin' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-brand-400 dark:text-brand-600 hover:text-white dark:hover:text-brand-200 transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs tracking-widest uppercase text-brand-500 dark:text-brand-600 mb-6 font-medium">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a href="tel:+94775186518" className="text-sm text-brand-400 dark:text-brand-600 hover:text-white transition-colors duration-300 flex items-center gap-2">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +94 77 518 6518
                </a>
              </li>
              <li>
                <a href="mailto:vigneshwaranvikki02@gmail.com" className="text-sm text-brand-400 dark:text-brand-600 hover:text-white transition-colors duration-300 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  vigneshwaranvikki02@gmail.com
                </a>
              </li>
              <li>
                <span className="text-sm text-brand-400 dark:text-brand-600 flex items-center gap-2">
                  <svg className="w-3 h-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  104/18 crystal market Keyzer st Colombo 11
                </span>
              </li>
              <li>
                <a
                  href="https://wa.me/+94775186518"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-brand-400 dark:text-brand-600 hover:text-green-400 transition-colors duration-300 flex items-center gap-2"
                >
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.132.558 4.135 1.535 5.875L.057 23.447a.5.5 0 00.492.553h.062l5.7-1.498A11.955 11.955 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.99 0-3.859-.552-5.455-1.512l-.39-.232-4.028 1.059 1.076-3.937-.254-.41A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                  </svg>
                  WhatsApp Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-brand-800 dark:border-brand-900 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] tracking-widest uppercase text-brand-500">
            <p>
              &copy; {new Date().getFullYear()} DAKSHES MULTI TRADE CENTER. ALL RIGHTS RESERVED.
            </p>
          </div>
          <p className="text-xs text-brand-600 dark:text-brand-700 tracking-widest">
            CRAFTED WITH INTENTION
          </p>
        </div>
      </div>
    </footer>
  )
}
