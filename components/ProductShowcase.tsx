'use client'

import { useState, useEffect } from 'react'
import ProductCard from './ProductCard'
import { fetchProducts } from '@/lib/shopify'

export interface Product {
  id: string
  name: string
  price: number
  image: string | string[] // Can be single image or array of images
  description: string
  category: 'tshirt' | 'hoodie'
  variantId?: string // Shopify variant ID for cart
}

// Local products (fallback if Shopify not connected)
const localProducts: Product[] = [
  {
    id: '1',
    name: 'Crown of Thorns Tee',
    price: 34.99,
    image: [
      '/products/crown-tee-front.png',
      '/products/crown-tee-back.png'
    ],
    description: 'Detailed black and white illustration on soft cotton',
    category: 'tshirt',
  },
  {
    id: '2',
    name: 'Chi Rho Tee',
    price: 34.99,
    image: [
      '/products/chirho-tee-front.png',
      '/products/chirho-tee-back.png'
    ],
    description: 'Classic Chi Rho symbol design on premium white cotton',
    category: 'tshirt',
  },
]

export default function ProductShowcase() {
  const [products, setProducts] = useState<Product[]>(localProducts)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Try to fetch from Shopify, fallback to local products
    const loadProducts = async () => {
      try {
        const shopifyProducts = await fetchProducts()
        console.log('Fetched products from Shopify:', shopifyProducts?.length || 0)
        
        if (shopifyProducts && shopifyProducts.length > 0) {
          // Convert Shopify products to our Product format
          const convertedProducts: Product[] = shopifyProducts.map((sp: any) => {
            const imageEdges = sp.images?.edges || []
            const images = imageEdges.map((edge: any) => ({
              url: edge.node.url,
              altText: edge.node.altText || ''
            }))
            
            const price = parseFloat(sp.priceRange?.minVariantPrice?.amount || sp.variants?.edges?.[0]?.node?.price?.amount || '0')
            const variantId = sp.variants?.edges?.[0]?.node?.id || ''
            
            // Try to determine category from title/tags (you may need to add tags in Shopify)
            const titleLower = sp.title?.toLowerCase() || ''
            const category: 'tshirt' | 'hoodie' = titleLower.includes('hoodie') ? 'hoodie' : 'tshirt'
            
            // Identify front and back images
            // Strategy: Look for "back" in altText, or use first 2 images if we have multiple
            let frontImage = images[0]?.url || ''
            let backImage = ''
            
            if (images.length > 1) {
              // Try to find back image by altText
              const backImageObj = images.find((img: any) => 
                img.altText?.toLowerCase().includes('back') || 
                img.altText?.toLowerCase().includes('rear')
              )
              
              if (backImageObj) {
                // Found explicit back image
                backImage = backImageObj.url
                // Front image is the first one that's not the back
                frontImage = images.find((img: any) => img.url !== backImageObj.url)?.url || images[0].url
              } else {
                // No explicit back image, assume first is front, second is back
                // But only if we have at least 2 images
                frontImage = images[0].url
                backImage = images[1].url
              }
            } else if (images.length === 1) {
              frontImage = images[0].url
            }
            
            // Return images as array if we have both, otherwise single string
            const productImages = backImage ? [frontImage, backImage] : frontImage
            
            return {
              id: sp.id,
              name: sp.title || 'Product',
              price: price,
              image: productImages,
              description: sp.description || sp.title || '',
              category: category,
              variantId: variantId,
            }
          })
          
          console.log('Converted products:', convertedProducts.length)
          setProducts(convertedProducts)
        } else {
          console.log('No products from Shopify, using local products')
        }
      } catch (error) {
        console.error('Error loading products from Shopify:', error)
        // Keep local products as fallback
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  // Show all products (no filtering needed)

  return (
    <section id="products" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 border-b border-gray-200 pb-6">
          <h2 className="text-2xl font-light tracking-wide text-black uppercase">
            Products
          </h2>
        </div>

        {/* Product Grid - YSL Style */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-sm uppercase tracking-wide">Loading products...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {products.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-sm uppercase tracking-wide">No products found in this category.</p>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}

