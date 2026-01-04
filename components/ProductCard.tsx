'use client'

import { useState } from 'react'
import { Product } from './ProductShowcase'
import Image from 'next/image'
import Link from 'next/link'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const [imageError, setImageError] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  // Handle both single image (string) and multiple images (array)
  const images = Array.isArray(product.image) ? product.image : [product.image]
  const hasMultipleImages = images.length > 1
  
  // For Shopify products, try to identify front/back images
  // Typically: first image is front, second is back (or we can check altText)
  const frontImage = images[0]
  const backImage = images.length > 1 ? images[1] : null
  
  // Check if we have a back image by looking at altText or assuming second image is back
  const hasBackImage = backImage !== null

  const handleAddToCart = () => {
    // This will be integrated with Shopify
    console.log('Add to cart:', product.id)
    // TODO: Integrate with Shopify cart
  }

  // Create a URL-friendly ID from Shopify GID or use the ID directly
  const productId = product.id.includes('/') 
    ? product.id.split('/').pop() || product.id 
    : product.id
  const productSlug = product.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
  
  return (
    <Link href={`/products/${productId}`} className="group bg-white block">
      {/* Product Image(s) */}
      <div 
        className="relative aspect-square bg-gray-50 overflow-hidden mb-4"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {!imageError ? (
          <>
            {hasBackImage ? (
              // Front and back images - hover shows back
              <div className="relative w-full h-full">
                {/* Front image */}
                <div
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    !isHovered ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
                >
                  <Image
                    src={frontImage}
                    alt={`${product.name} - front`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    onError={() => setImageError(true)}
                    unoptimized={frontImage.includes('cdn.shopify.com')}
                  />
                </div>
                {/* Back image */}
                <div
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    isHovered ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
                >
                  <Image
                    src={backImage}
                    alt={`${product.name} - back`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    onError={() => setImageError(true)}
                    unoptimized={backImage.includes('cdn.shopify.com')}
                  />
                </div>
              </div>
            ) : (
              // Single image
              <Image
                src={frontImage}
                alt={product.name}
                fill
                className="object-cover group-hover:opacity-95 transition-opacity duration-300"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                onError={() => setImageError(true)}
                unoptimized={frontImage.includes('cdn.shopify.com')}
              />
            )}
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <div className="text-5xl mb-2 opacity-30">👕</div>
              <p className="text-gray-400 text-xs uppercase tracking-wide">Image Not Found</p>
              <p className="text-gray-300 text-xs mt-1">Add image to /public/products/</p>
            </div>
          </div>
        )}
      </div>

      {/* Product Info - Minimal YSL Style */}
      <div className="space-y-1">
        <h3 className="text-sm font-light text-black uppercase tracking-wide">
          {product.name}
        </h3>
        <div className="pt-2">
          <span className="text-sm text-black font-light">${product.price.toFixed(2)}</span>
        </div>
      </div>
    </Link>
  )
}

