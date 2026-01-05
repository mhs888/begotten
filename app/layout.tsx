import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Begotten | Divine Garments',
  description: 'Quality Clothing for a Higher Purpose',
  icons: {
    icon: '/logo/favicon.png',
    shortcut: '/logo/favicon.png',
    apple: '/logo/favicon.png',
  },
  openGraph: {
    title: 'Begotten | Divine Garments',
    description: 'Quality Clothing for a Higher Purpose',
    url: 'https://www.begotten.shop',
    siteName: 'Begotten',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Begotten | Divine Garments',
    description: 'Quality Clothing for a Higher Purpose',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

