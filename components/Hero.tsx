'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Cart from './Cart'

export default function Hero() {
  const [logoError, setLogoError] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    const updateCartCount = () => {
      const savedCart = localStorage.getItem('begotten-cart')
      if (savedCart) {
        try {
          const items = JSON.parse(savedCart)
          const count = items.reduce((sum: number, item: any) => sum + item.quantity, 0)
          setCartCount(count)
        } catch (e) {
          setCartCount(0)
        }
      } else {
        setCartCount(0)
      }
    }

    updateCartCount()
    window.addEventListener('cartUpdated', updateCartCount)
    return () => window.removeEventListener('cartUpdated', updateCartCount)
  }, [])
  
  return (
    <div className="relative bg-white">
      {/* Navigation - Minimal */}
      <nav className="fixed top-0 w-full z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              {!logoError ? (
                <Image
                  src="/logo/begotten-logo.png"
                  alt="Begotten"
                  width={400}
                  height={120}
                  className="h-20 md:h-24 lg:h-28 w-auto"
                  priority
                  onError={() => setLogoError(true)}
                />
              ) : (
                <div className="text-4xl md:text-5xl lg:text-6xl font-light tracking-wider text-black">
                  BEGOTTEN
                </div>
              )}
            </Link>
            
            {/* Cart */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative text-black hover:text-gray-600 transition-colors"
              aria-label="Shopping cart"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Cart Sidebar */}
      <Cart isOpen={cartOpen} onClose={() => setCartOpen(false)} />

      {/* Hero Content - Minimal */}
      <div className="pt-32 pb-12 px-6 lg:px-8 flex items-center justify-center min-h-[40vh]">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-light tracking-wide text-black mb-6 leading-tight italic">
            <span className="whitespace-nowrap">&ldquo;God so loved the world, that he gave his only <span className="font-semibold not-italic">Begotten</span> Son&rdquo;</span>
          </h1>
          <p className="text-xs text-gray-500 uppercase tracking-wider">
            100% of profits go to charity
          </p>
        </div>
      </div>
    </div>
  )
}

