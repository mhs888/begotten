'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Cart from './Cart'

export default function Hero() {
  const [logoError, setLogoError] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const updateCartCount = () => {
      const savedCart = localStorage.getItem('begotten-cart')
      if (savedCart) {
        try {
          const items = JSON.parse(savedCart)
          const count = items.reduce((sum: number, item: any) => sum + (item.quantity || 0), 0)
          setCartCount(count)
        } catch (e) {
          console.error('Error parsing cart:', e)
          setCartCount(0)
        }
      } else {
        setCartCount(0)
      }
    }

    // Update immediately on mount
    updateCartCount()
    
    // Listen for cart updates
    window.addEventListener('cartUpdated', updateCartCount)
    
    // Also check periodically in case events are missed
    const interval = setInterval(updateCartCount, 1000)
    
    return () => {
      window.removeEventListener('cartUpdated', updateCartCount)
      clearInterval(interval)
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY
      setScrollY(currentScroll)
      // Debug: log scroll values to verify it's working
      console.log('Scroll Y:', currentScroll, 'Color will be:', Math.round(255 * Math.min(Math.max(currentScroll / 600, 0), 1)))
    }

    // Set initial scroll position
    handleScroll()
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  return (
    <div className="relative bg-white">
      {/* Navigation - Minimal */}
      <nav className="fixed top-0 w-full z-50 bg-white pt-3 pb-3">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              {!logoError ? (
                <Image
                  src="/logo/begotten-logo.png"
                  alt="Begotten"
                  width={400}
                  height={120}
                  className="h-20 md:h-28 lg:h-32 w-auto"
                  priority
                  onError={() => setLogoError(true)}
                />
              ) : (
                <div className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold tracking-wider text-black">
                  BEGOTTEN
                </div>
              )}
            </Link>
            
            {/* Navigation Links */}
            <div className="flex items-center gap-6">
              {/* Purpose Button */}
              <Link 
                href="/purpose"
                className="text-lg font-display text-black hover:text-gray-600 uppercase tracking-wide transition-all duration-300 hover:scale-110"
              >
                Purpose
              </Link>
              
              {/* Cart */}
              <button
                onClick={() => setCartOpen(true)}
                className="relative text-black hover:text-gray-600 transition-all duration-300 hover:scale-110"
                aria-label="Shopping cart"
              >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-sans">
                  {cartCount}
                </span>
              )}
              </button>
            </div>
          </div>
        </div>
        {/* Border line below logo */}
        <div className="border-b border-gray-200 mt-3"></div>
      </nav>

      {/* Cart Sidebar */}
      <Cart isOpen={cartOpen} onClose={() => setCartOpen(false)} />

      {/* Spacer for fixed nav */}
      <div className="pt-36"></div>

      {/* Hero Text Section */}
      <div className="pt-32 pb-8 px-6 lg:px-8 flex items-center justify-center">
        <div className="max-w-4xl mx-auto text-center">
          <h1 
            className="text-3xl md:text-4xl lg:text-5xl font-display tracking-wide uppercase"
            style={{
              color: (() => {
                // Fade from black (0,0,0) to white (255,255,255) over 600px of scroll
                const fadeDistance = 600
                const scrollProgress = Math.min(Math.max(scrollY / fadeDistance, 0), 1)
                const whiteValue = Math.round(255 * scrollProgress)
                const color = `rgb(${whiteValue}, ${whiteValue}, ${whiteValue})`
                console.log('Rendering text - Scroll:', scrollY, 'Progress:', scrollProgress.toFixed(2), 'Color:', color)
                return color
              })(),
              transition: 'color 0.1s linear'
            }}
          >
            Divine Garments With a Higher Purpose
          </h1>
        </div>
      </div>
    </div>
  )
}

