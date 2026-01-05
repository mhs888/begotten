'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { fetchProducts } from '@/lib/shopify'

export default function PurposePage() {
  const [totalProducts, setTotalProducts] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProductCount = async () => {
      try {
        const products = await fetchProducts()
        // For now, we'll use the number of products as a placeholder
        // In the future, you could track actual sales from Shopify orders
        setTotalProducts(products.length)
      } catch (error) {
        console.error('Error loading products:', error)
      } finally {
        setLoading(false)
      }
    }
    loadProductCount()
  }, [])

  return (
    <div className="min-h-screen bg-white pt-32 pb-12 px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <div className="mb-12">
          <Link href="/" className="text-base font-display text-gray-500 hover:text-black uppercase tracking-wide">
            ← Back to Home
          </Link>
        </div>

        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-display tracking-wide text-black uppercase mb-6">
            Our Purpose
          </h1>
        </div>

        {/* Mission Statement */}
        <div className="space-y-8 mb-16">
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Begotten is a profit-free, self-sustaining clothing brand dedicated to serving those in need, 
              in alignment with God's mission for us to love and care for one another.
            </p>
            
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Every garment we create is crafted with intention and quality, but our true purpose extends 
              far beyond fashion. We believe that business can be a force for good—a means to provide 
              for those who need it most, without seeking personal gain.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              <strong className="text-black">100% of our profits go directly to charitable causes.</strong> 
              This isn't a marketing slogan—it's our foundational principle. We operate at cost, ensuring 
              that every dollar beyond what's needed to sustain our operations goes to organizations and 
              individuals making a real difference in the world.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              When you purchase from Begotten, you're not just buying clothing. You're participating in 
              a mission to serve others, to extend God's love through action, and to create a sustainable 
              model of giving that can continue to make an impact for years to come.
            </p>
          </div>
        </div>

        {/* Impact Section */}
        <div className="border-t border-gray-200 pt-12 mb-16">
          <h2 className="text-2xl font-display tracking-wide text-black uppercase mb-8 text-center">
            Our Impact
          </h2>
          
          {loading ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Loading...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-display text-black mb-2">
                  {totalProducts}
                </div>
                <div className="text-sm text-gray-600 uppercase tracking-wide">
                  Products Available
                </div>
              </div>
              <div>
                <div className="text-4xl font-display text-black mb-2">
                  100%
                </div>
                <div className="text-sm text-gray-600 uppercase tracking-wide">
                  Profits to Charity
                </div>
              </div>
              <div>
                <div className="text-4xl font-display text-black mb-2">
                  ∞
                </div>
                <div className="text-sm text-gray-600 uppercase tracking-wide">
                  Commitment
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Call to Action */}
        <div className="border-t border-gray-200 pt-12 text-center">
          <p className="text-lg text-gray-700 mb-6">
            Join us in our mission to serve others through quality clothing and charitable giving.
          </p>
          <Link 
            href="/" 
            className="inline-block bg-black text-white px-8 py-3 text-sm font-display uppercase tracking-wide hover:bg-gray-800 transition-colors"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </div>
  )
}

