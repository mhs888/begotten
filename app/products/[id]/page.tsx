'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { fetchProducts, fetchProduct } from '@/lib/shopify'
import { addToCart } from '@/components/Cart'
import Cart from '@/components/Cart'

export default function ProductPage() {
  const params = useParams()
  const router = useRouter()
  const productId = params.id as string
  
  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedVariant, setSelectedVariant] = useState<any>(null)
  const [selectedSize, setSelectedSize] = useState<string>('')
  const [selectedColor, setSelectedColor] = useState<string>('')
  const [quantity, setQuantity] = useState(1)
  const [variants, setVariants] = useState<any[]>([])
  const [cartOpen, setCartOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    const loadProduct = async () => {
      try {
        // Try to find product by ID from all products
        const allProducts = await fetchProducts()
        const foundProduct = allProducts.find((p: any) => {
          // Shopify IDs are like "gid://shopify/Product/123456"
          const pId = p.id.split('/').pop() || p.id
          const searchId = productId
          return p.id === searchId || p.id.includes(searchId) || pId === searchId || searchId.includes(pId)
        })

        if (foundProduct) {
          // Get handle and fetch full product details
          const handle = foundProduct.handle || foundProduct.title?.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
          if (handle) {
            const fullProduct = await fetchProduct(handle)
            if (fullProduct) {
              setProduct(fullProduct)
              const productVariants = fullProduct.variants?.edges?.map((edge: any) => edge.node) || []
              setVariants(productVariants)
              if (productVariants.length > 0) {
                setSelectedVariant(productVariants[0])
              }
            } else {
              setProduct(foundProduct)
              const productVariants = foundProduct.variants?.edges?.map((edge: any) => edge.node) || []
              setVariants(productVariants)
              if (productVariants.length > 0) {
                setSelectedVariant(productVariants[0])
              }
            }
          } else {
            setProduct(foundProduct)
            const productVariants = foundProduct.variants?.edges?.map((edge: any) => edge.node) || []
            setVariants(productVariants)
            if (productVariants.length > 0) {
              setSelectedVariant(productVariants[0])
            }
          }
        }
      } catch (error) {
        console.error('Error loading product:', error)
      } finally {
        setLoading(false)
      }
    }

    if (productId) {
      loadProduct()
    }
  }, [productId])

  // Extract size and color options from variants (needed before useEffect)
  // Detect format: most products use "Color / Size", but some may use "Size / Color"
  // Common size values to help detect format
  const commonSizes = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL', 'XXS', 'XXXL', 'Small', 'Medium', 'Large', 'Extra Large']
  const commonColors = ['Black', 'White', 'Grey', 'Gray', 'Navy', 'Red', 'Blue', 'Green', 'Brown', 'Beige', 'Cream']
  
  // Check first variant to determine format
  let isSizeFirstFormat = false
  if (variants.length > 0) {
    const firstVariantParts = variants[0].title.split(' / ')
    if (firstVariantParts.length === 2) {
      const firstPart = firstVariantParts[0].trim()
      const lastPart = firstVariantParts[1].trim()
      // If first part looks like a size, it's Size/Color format
      isSizeFirstFormat = commonSizes.some(size => firstPart === size || firstPart.includes(size)) &&
                          !commonColors.some(color => firstPart === color || firstPart.includes(color))
    }
  }
  
  const sizes = Array.from(new Set(variants.map((v: any) => {
    const parts = v.title.split(' / ')
    // If Size/Color format, first part is size; otherwise last part is size
    return isSizeFirstFormat ? parts[0] : parts[parts.length - 1]
  }))).filter(Boolean)

  const colors = Array.from(new Set(variants.map((v: any) => {
    const parts = v.title.split(' / ')
    // If Size/Color format, last part is color; otherwise first part is color
    return isSizeFirstFormat ? parts[parts.length - 1] : parts[0]
  }))).filter(Boolean)

  // Update variant when size/color changes - MUST be before early returns
  useEffect(() => {
    if (!product || variants.length === 0) {
      setSelectedVariant(null)
      return
    }
    
    // Only set variant if both color and size are selected (if product has variants)
    if (colors.length > 0 && sizes.length > 0) {
      if (selectedSize && selectedColor) {
        // Detect format again (same logic as above)
        const firstVariantParts = variants[0]?.title.split(' / ') || []
        const commonSizes = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL', 'XXS', 'XXXL', 'Small', 'Medium', 'Large', 'Extra Large']
        const commonColors = ['Black', 'White', 'Grey', 'Gray', 'Navy', 'Red', 'Blue', 'Green', 'Brown', 'Beige', 'Cream']
        let isSizeFirstFormat = false
        if (firstVariantParts.length === 2) {
          const firstPart = firstVariantParts[0].trim()
          isSizeFirstFormat = commonSizes.some(size => firstPart === size || firstPart.includes(size)) &&
                              !commonColors.some(color => firstPart === color || firstPart.includes(color))
        }
        
        const variant = variants.find((v: any) => {
          const parts = v.title.split(' / ')
          const variantColor = isSizeFirstFormat ? parts[parts.length - 1] : parts[0]
          const variantSize = isSizeFirstFormat ? parts[0] : parts[parts.length - 1]
          return variantColor === selectedColor && variantSize === selectedSize
        })
        if (variant && variant.availableForSale !== false) {
          setSelectedVariant(variant)
        } else if (variant) {
          // Variant exists but is not available
          setSelectedVariant(variant)
        } else {
          // No variant found for this combination
          setSelectedVariant(null)
        }
      } else {
        // Don't set variant if color or size is missing
        setSelectedVariant(null)
      }
    } else if (colors.length > 0) {
      // Only colors, no sizes
      if (selectedColor) {
        const variant = variants.find((v: any) => {
          const parts = v.title.split(' / ')
          const variantColor = parts[0]
          return variantColor === selectedColor && v.availableForSale !== false
        })
        if (variant) {
          setSelectedVariant(variant)
        } else {
          setSelectedVariant(null)
        }
      } else {
        setSelectedVariant(null)
      }
    } else if (sizes.length > 0) {
      // Only sizes, no colors
      if (selectedSize) {
        const variant = variants.find((v: any) => {
          const parts = v.title.split(' / ')
          const variantSize = parts[parts.length - 1]
          return variantSize === selectedSize && v.availableForSale !== false
        })
        if (variant) {
          setSelectedVariant(variant)
        } else {
          setSelectedVariant(null)
        }
      } else {
        setSelectedVariant(null)
      }
    } else {
      // No variants, use first available
      if (variants.length > 0 && variants[0].availableForSale !== false) {
        setSelectedVariant(variants[0])
      }
    }
  }, [selectedSize, selectedColor, variants, product])

  // Reset selected image when color changes - MUST be before early returns
  useEffect(() => {
    setSelectedImage(0)
  }, [selectedColor])

  // Update cart count - MUST be before early returns
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

  if (loading) {
    return (
      <div className="min-h-screen bg-white pt-32 pb-12 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-500 text-sm uppercase tracking-wide">Loading product...</p>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white pt-32 pb-12 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-500 text-sm uppercase tracking-wide mb-4">Product not found</p>
          <Link href="/" className="text-black border border-black px-6 py-2 text-sm uppercase tracking-wide hover:bg-black hover:text-white transition-colors inline-block">
            Back to Products
          </Link>
        </div>
      </div>
    )
  }

  // Get all product images with metadata
  const allImages = product.images?.edges?.map((edge: any) => ({
    url: edge.node.url,
    altText: (edge.node.altText || '').toLowerCase()
  })) || []
  
  // Filter images based on selected color
  const getColorImages = () => {
    if (!selectedColor) {
      return allImages.map((img: { url: string; altText: string }) => img.url)
    }
    
    const colorLower = selectedColor.toLowerCase().trim()
    
    // Handle color name variations (grey/gray, etc.)
    const colorVariations = [colorLower]
    if (colorLower === 'grey') colorVariations.push('gray')
    if (colorLower === 'gray') colorVariations.push('grey')
    
    // Try to find images that match the color in alt text
    const colorImages = allImages.filter((img: { url: string; altText: string }) => {
      const altText = img.altText.toLowerCase().trim()
      // Check if alt text contains any color variation
      return colorVariations.some(color => altText.includes(color))
    })
    
    if (colorImages.length > 0) {
      // Sort images: front first, then back
      const sortedImages = colorImages.sort((a: { url: string; altText: string }, b: { url: string; altText: string }) => {
        const aIsBack = a.altText.includes('back') || a.altText.includes('rear')
        const bIsBack = b.altText.includes('back') || b.altText.includes('rear')
        if (aIsBack && !bIsBack) return 1
        if (!aIsBack && bIsBack) return -1
        return 0
      })
      
      return sortedImages.map((img: { url: string; altText: string }) => img.url)
    }
    
    // If variant has its own image, use that
    if (selectedVariant?.image?.url) {
      const variantImage = selectedVariant.image.url
      // Try to find a matching back image
      const backImage = allImages.find((img: { url: string; altText: string }) => {
        const altText = img.altText.toLowerCase().trim()
        return img.url !== variantImage && 
               (altText.includes('back') || altText.includes('rear')) &&
               colorVariations.some(color => altText.includes(color))
      })
      
      if (backImage) {
        return [variantImage, backImage.url]
      }
      
      return [variantImage]
    }
    
    // Fallback: use all images
    return allImages.map((img: { url: string; altText: string }) => img.url)
  }
  
  const images = getColorImages()
  
  const price = selectedVariant 
    ? parseFloat(selectedVariant.price.amount)
    : parseFloat(product.priceRange?.minVariantPrice?.amount || '0')

  // Check if a size/color combination is available
  const isVariantAvailable = (color: string, size: string) => {
    const variant = variants.find((v: any) => {
      const parts = v.title.split(' / ')
      const variantColor = parts[0]
      const variantSize = parts[parts.length - 1]
      return variantColor === color && variantSize === size
    })
    
    if (!variant) return false
    
    // Check if variant is available for sale and has inventory
    const available = variant.availableForSale !== false
    const hasInventory = variant.quantityAvailable === null || variant.quantityAvailable > 0
    
    return available && hasInventory
  }

  // Check if a size is available for the selected color
  const isSizeAvailable = (size: string) => {
    if (!selectedColor) return true // If no color selected, show all sizes
    return isVariantAvailable(selectedColor, size)
  }

  // Check if a color is available for the selected size
  const isColorAvailable = (color: string) => {
    if (!selectedSize) return true // If no size selected, show all colors
    return isVariantAvailable(color, selectedSize)
  }

  // Get available sizes for selected color
  const availableSizes = selectedColor 
    ? sizes.filter(size => isSizeAvailable(size))
    : sizes

  // Get available colors for selected size
  const availableColors = selectedSize
    ? colors.filter(color => isColorAvailable(color))
    : colors

  const handleAddToCart = () => {
    // Require both color and size to be selected (if product has variants)
    if (colors.length > 0 && !selectedColor) {
      alert('Please select a color')
      return
    }
    
    if (sizes.length > 0 && !selectedSize) {
      alert('Please select a size')
      return
    }
    
    if (!selectedVariant) {
      alert('Please select a color and size')
      return
    }
    
    // Add multiple quantities
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: selectedVariant.id,
        name: product.title,
        price: price,
        image: images[0] || '',
        variantId: selectedVariant.id,
      })
    }
    
    // Show notification or open cart
    window.dispatchEvent(new CustomEvent('cartUpdated'))
  }
  
  // Check if both color and size are selected (if required)
  const canAddToCart = () => {
    if (!selectedVariant) return false
    if (colors.length > 0 && !selectedColor) return false
    if (sizes.length > 0 && !selectedSize) return false
    if (!selectedVariant.availableForSale) return false
    if (selectedVariant.quantityAvailable !== null && selectedVariant.quantityAvailable <= 0) return false
    return true
  }

  return (
    <div className="min-h-screen bg-white pt-32 pb-12 px-6 lg:px-8">
      {/* Navigation with Cart */}
      <nav className="fixed top-0 w-full z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="text-sm text-gray-500 hover:text-black uppercase tracking-wide">
              ← Back to Products
            </Link>
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

      <div className="max-w-7xl mx-auto">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square bg-gray-50">
              {images.length > 0 ? (
                <Image
                  src={images[selectedImage]}
                  alt={product.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                  unoptimized={images[selectedImage].includes('cdn.shopify.com')}
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-gray-400 text-sm">No image available</p>
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {images.map((img: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative aspect-square bg-gray-50 border-2 transition-colors ${
                      selectedImage === index ? 'border-black' : 'border-transparent'
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.title} - ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 25vw, 12.5vw"
                      unoptimized={img.includes('cdn.shopify.com')}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-light tracking-wide text-black uppercase mb-4">
                {product.title}
              </h1>
              <p className="text-2xl font-light text-black mb-6">
                ${price.toFixed(2)}
              </p>
            </div>

            {product.description && (
              <div className="prose prose-sm max-w-none">
                <p className="text-gray-600 text-sm leading-relaxed">
                  {product.description}
                </p>
              </div>
            )}

            {/* Variant Selection - Always show Color first, then Size */}
            {colors.length > 0 && (
              <div className="mb-6">
                <label className="block text-sm uppercase tracking-wide text-black mb-2">
                  Color
                </label>
                <div className="flex gap-2 flex-wrap">
                  {colors.map((color: string) => {
                    const isAvailable = isColorAvailable(color)
                    const isSelected = selectedColor === color
                    
                    return (
                      <button
                        key={color}
                        onClick={() => {
                          if (isAvailable) {
                            setSelectedColor(color)
                          }
                        }}
                        disabled={!isAvailable}
                        className={`px-4 py-2 text-sm border transition-colors relative ${
                          isSelected
                            ? 'border-black bg-black text-white'
                            : isAvailable
                              ? 'border-gray-300 text-black hover:border-black'
                              : 'border-gray-200 text-gray-400 cursor-not-allowed opacity-50'
                        }`}
                        title={!isAvailable ? 'Not available in selected size' : ''}
                      >
                        {color}
                        {!isAvailable && (
                          <span className="absolute -top-1 -right-1 text-xs">×</span>
                        )}
                      </button>
                    )
                  })}
                </div>
                {selectedSize && availableColors.length === 0 && (
                  <p className="text-xs text-gray-500 mt-2">No colors available in selected size</p>
                )}
              </div>
            )}

            {sizes.length > 0 && (
              <div>
                <label className="block text-sm uppercase tracking-wide text-black mb-2">
                  Size
                </label>
                <div className="flex gap-2 flex-wrap">
                  {sizes.map((size: string) => {
                    const isAvailable = isSizeAvailable(size)
                    const isSelected = selectedSize === size
                    
                    return (
                      <button
                        key={size}
                        onClick={() => {
                          if (isAvailable) {
                            setSelectedSize(size)
                          }
                        }}
                        disabled={!isAvailable}
                        className={`px-4 py-2 text-sm border transition-colors relative ${
                          isSelected
                            ? 'border-black bg-black text-white'
                            : isAvailable
                              ? 'border-gray-300 text-black hover:border-black'
                              : 'border-gray-200 text-gray-400 cursor-not-allowed opacity-50'
                        }`}
                        title={!isAvailable ? 'Not available in selected color' : ''}
                      >
                        {size}
                        {!isAvailable && (
                          <span className="absolute -top-1 -right-1 text-xs">×</span>
                        )}
                      </button>
                    )
                  })}
                </div>
                {selectedColor && availableSizes.length === 0 && (
                  <p className="text-xs text-gray-500 mt-2">No sizes available in selected color</p>
                )}
              </div>
            )}

            {/* Quantity */}
            <div>
              <label className="block text-sm uppercase tracking-wide text-black mb-2">
                Quantity
              </label>
              <div className="flex items-center border border-gray-300 w-fit">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 text-gray-600 hover:text-black"
                >
                  −
                </button>
                <span className="px-6 py-2 text-sm min-w-[3rem] text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 text-gray-600 hover:text-black"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              disabled={!canAddToCart()}
              className="w-full bg-black text-white py-4 text-sm uppercase tracking-wide hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {!selectedVariant || (colors.length > 0 && !selectedColor) || (sizes.length > 0 && !selectedSize)
                ? 'Select Size & Color' 
                : !selectedVariant.availableForSale || (selectedVariant.quantityAvailable !== null && selectedVariant.quantityAvailable <= 0)
                  ? 'Out of Stock'
                  : 'Add to Cart'
              }
            </button>
            
            {/* Stock Status */}
            {selectedVariant && (
              <div className="text-xs text-gray-500">
                {selectedVariant.quantityAvailable !== null && selectedVariant.quantityAvailable > 0 && (
                  <p className="uppercase tracking-wide">
                    {selectedVariant.quantityAvailable} {selectedVariant.quantityAvailable === 1 ? 'item' : 'items'} in stock
                  </p>
                )}
                {selectedVariant.quantityAvailable !== null && selectedVariant.quantityAvailable === 0 && (
                  <p className="text-red-500 uppercase tracking-wide">Out of stock</p>
                )}
              </div>
            )}

            {/* Product Details */}
            <div className="pt-6 border-t border-gray-200">
              <p className="text-xs text-gray-500 uppercase tracking-wide">
                100% of profits go to charity
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

