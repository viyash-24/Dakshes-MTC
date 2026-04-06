import './globals.css'
import Script from 'next/script'

export const metadata = {
  title: 'Dakshes Multi Trade Center',
  description: 'Premium modern fashion, crafted with intention.',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script id="theme-init" strategy="beforeInteractive">
          {`(() => {
  try {
    const saved = localStorage.getItem('theme')
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    const shouldBeDark = saved === 'dark' || (!saved && prefersDark)
    if (shouldBeDark) document.documentElement.classList.add('dark')
    else document.documentElement.classList.remove('dark')
  } catch (e) {
    // ignore
  }
})()`}
        </Script>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-brand-50 dark:bg-brand-950 text-brand-900 dark:text-brand-50 antialiased">
        {children}
      </body>
    </html>
  )
}
