import type { Metadata } from 'next'
import './globals.css'
import { Inter, Poppins, Playfair_Display, Montserrat } from 'next/font/google'

// Modern, clean font for body text
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

// Professional, modern font for headings
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-poppins',
})

// Elegant serif font for hero and special headings
const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-playfair',
})

// Clean, professional font for UI elements
const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-montserrat',
})

export const metadata: Metadata = {
  title: 'NAPHTALI VENTURES - Professional Electrical Services in Ghana',
  description: 'Leading electrical contractor in Ghana providing residential, commercial, and industrial electrical services. 24/7 emergency support, solar installations, and smart electrical solutions.',
  generator: 'Next.js',
  keywords: 'electrical services, Ghana, electrical contractor, solar installation, emergency electrical, commercial electrical, residential electrical',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable} ${playfair.variable} ${montserrat.variable}`}>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
