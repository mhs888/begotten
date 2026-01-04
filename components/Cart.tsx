'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
  variantId?: string
}

interface CartProps {
  isOpen: boolean
  onClose: () => void
}

export default function Cart({ isOpen, onClose }: CartProps) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // Load cart from localStorage on mount and when cart updates
  const loadCart = () => {
    const savedCart = localStorage.getItem('begotten-cart')
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart))
      } catch (e) {
        console.error('Error loading cart:', e)
      }
    } else {
      setItems([])
    }
  }

  useEffect(() => {
    loadCart()
    window.addEventListener('cartUpdated', loadCart)
    return () => window.removeEventListener('cartUpdated', loadCart)
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem('begotten-cart', JSON.stringify(items))
    } else {
      localStorage.removeItem('begotten-cart')
    }
  }, [items])

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      setItems(items.filter(item => item.id !== id))
    } else {
      setItems(items.map(item => 
        item.id === id ? { ...item, quantity } : item
      ))
    }
  }

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id))
  }

  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  const handleCheckout = async () => {
    setIsLoading(true)
    try {
      // Import the function to create cart
      const { createCartAndCheckout } = await import('@/lib/shopify')
      
      // Prepare cart items with variant IDs
      const cartItems = items
        .filter(item => item.variantId) // Only include items with variant IDs
        .map(item => ({
          variantId: item.variantId!,
          quantity: item.quantity
        }))

      if (cartItems.length === 0) {
        console.error('No valid items in cart')
        setIsLoading(false)
        return
      }

      // Create cart and get checkout URL
      const checkoutUrl = await createCartAndCheckout(cartItems)
      
      console.log('🔍 Checkout URL received:', checkoutUrl)
      
      if (checkoutUrl) {
        // CRITICAL: Never redirect to custom domain - always use Shopify store domain
        let safeUrl = checkoutUrl
        
        // Replace custom domain with Shopify store domain if present
        if (checkoutUrl.includes('begotten.shop')) {
          const shopifyDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || '6tfp84-zr.myshopify.com'
          safeUrl = checkoutUrl.replace(/https?:\/\/[^/]+/, `https://${shopifyDomain}`)
          console.warn('⚠️ Replaced custom domain in checkout URL:', checkoutUrl, '→', safeUrl)
        }
        
        // Validate URL before redirecting
        try {
          const url = new URL(safeUrl) // This will throw if URL is invalid
          
          // Double-check: never allow custom domain
          if (url.hostname.includes('begotten.shop')) {
            throw new Error('Custom domain detected in URL after sanitization')
          }
          
          console.log('✅ Redirecting to safe checkout URL:', safeUrl)
          window.location.href = safeUrl
        } catch (urlError) {
          console.error('❌ Invalid or unsafe checkout URL:', safeUrl, urlError)
          // Fallback to Shopify store cart (always safe)
          // HARDCODE the Shopify store domain to ensure we never use custom domain
          const shopifyStoreDomain = '6tfp84-zr.myshopify.com'
          const fallbackUrl = `https://${shopifyStoreDomain}/cart`
          console.log('🔄 Using fallback URL (URL validation failed, hardcoded):', fallbackUrl)
          window.location.href = fallbackUrl
        }
      } else {
        // Fallback: redirect to Shopify store cart page
        // HARDCODE the Shopify store domain to ensure we never use custom domain
        const shopifyStoreDomain = '6tfp84-zr.myshopify.com'
        const fallbackUrl = `https://${shopifyStoreDomain}/cart`
        console.error('❌ Failed to create cart via API, redirecting to Shopify cart page')
        console.log('🔄 Using fallback URL (hardcoded):', fallbackUrl)
        window.location.href = fallbackUrl
      }
    } catch (error) {
      console.error('❌ Checkout error:', error)
      // Fallback: redirect to Shopify cart page (not custom domain)
      // HARDCODE the Shopify store domain to ensure we never use custom domain
      const shopifyStoreDomain = '6tfp84-zr.myshopify.com'
      const fallbackUrl = `https://${shopifyStoreDomain}/cart`
      console.log('🔄 Using fallback URL (error handler, hardcoded):', fallbackUrl)
      window.location.href = fallbackUrl
      setIsLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />
      
      {/* Cart Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-lg font-light uppercase tracking-wide">Cart ({itemCount})</h2>
          <button
            onClick={onClose}
            className="text-black hover:text-gray-600 transition-colors"
            aria-label="Close cart"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-sm uppercase tracking-wide mb-4">Your cart is empty</p>
              <button
                onClick={onClose}
                className="text-black border border-black px-6 py-2 text-sm uppercase tracking-wide hover:bg-black hover:text-white transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => {
                const imageUrl = Array.isArray(item.image) ? item.image[0] : item.image
                return (
                  <div key={item.id} className="flex gap-4 pb-6 border-b border-gray-100">
                    <div className="relative w-20 h-20 bg-gray-50 flex-shrink-0">
                      <Image
                        src={imageUrl}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="80px"
                        unoptimized={imageUrl.includes('cdn.shopify.com')}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-light text-black uppercase tracking-wide mb-1">
                        {item.name}
                      </h3>
                      <p className="text-xs text-gray-500 mb-2">${item.price.toFixed(2)}</p>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center border border-gray-200">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-2 py-1 text-gray-600 hover:text-black"
                            aria-label="Decrease quantity"
                          >
                            −
                          </button>
                          <span className="px-3 py-1 text-sm min-w-[2rem] text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-2 py-1 text-gray-600 hover:text-black"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-xs text-gray-500 hover:text-black uppercase tracking-wide"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-200 p-6 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm uppercase tracking-wide text-gray-500">Subtotal</span>
              <span className="text-lg font-light text-black">${total.toFixed(2)}</span>
            </div>
            <button
              onClick={handleCheckout}
              disabled={isLoading}
              className="w-full bg-black text-white py-3 text-sm uppercase tracking-wide hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Processing...' : 'Checkout'}
            </button>
            <button
              onClick={onClose}
              className="w-full border border-black text-black py-3 text-sm uppercase tracking-wide hover:bg-black hover:text-white transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  )
}

// Export function to add items to cart (can be called from anywhere)
export function addToCart(item: Omit<CartItem, 'quantity'>) {
  const savedCart = localStorage.getItem('begotten-cart')
  const existingItems: CartItem[] = savedCart ? JSON.parse(savedCart) : []
  
  const existingItem = existingItems.find(i => i.id === item.id)
  
  if (existingItem) {
    existingItem.quantity += 1
  } else {
    existingItems.push({ ...item, quantity: 1 })
  }
  
  localStorage.setItem('begotten-cart', JSON.stringify(existingItems))
  
  // Dispatch custom event to update cart UI
  window.dispatchEvent(new CustomEvent('cartUpdated'))
}

