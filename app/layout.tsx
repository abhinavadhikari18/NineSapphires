import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import { Providers } from './providers'
import './globals.css'

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'NineSapphires — Digital Craftsmanship, Refined to Perfection',
  description:
    'NineSapphires delivers premium, tech-driven websites for restaurants, cafés, consultancies, gyms, salons, and businesses. Elegant design meets powerful functionality.',
  keywords: ['web development', 'website design', 'digital craftsmanship', 'NineSapphires', 'Nepal'],
  authors: [{ name: 'NineSapphires' }],
  creator: 'NineSapphires',
  openGraph: {
    title: 'NineSapphires — Digital Craftsmanship, Refined to Perfection',
    description: 'Premium website development refined to perfection.',
    type: 'website',
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F5F0E8' },
    { media: '(prefers-color-scheme: dark)', color: '#0E1A2E' },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${playfairDisplay.variable} ${inter.variable} font-sans antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
