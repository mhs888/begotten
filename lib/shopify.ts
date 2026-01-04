// Shopify integration utilities
// This file will be used to connect to Shopify Storefront API

export interface ShopifyProduct {
  id: string
  title: string
  description: string
  price: string
  handle?: string
  images: {
    edges: Array<{
      node: {
        url: string
        altText: string | null
      }
    }>
  }
  variants?: {
    edges: Array<{
      node: {
        id: string
        title: string
        price: {
          amount: string
          currencyCode: string
        }
        availableForSale: boolean
        quantityAvailable?: number | null
        image?: {
          url: string
          altText: string | null
        }
      }
    }>
  }
}

// TODO: Add your Shopify Storefront API credentials
// Get these from: Shopify Admin > Apps > Develop apps > Create an app > Configure Storefront API
const SHOPIFY_STORE_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || ''
const SHOPIFY_STOREFRONT_ACCESS_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN || ''

export async function fetchProducts(): Promise<ShopifyProduct[]> {
  if (!SHOPIFY_STORE_DOMAIN || !SHOPIFY_STOREFRONT_ACCESS_TOKEN) {
    console.warn('Shopify credentials not configured. Using placeholder data.')
    console.warn('Domain:', SHOPIFY_STORE_DOMAIN, 'Token:', SHOPIFY_STOREFRONT_ACCESS_TOKEN ? 'Present' : 'Missing')
    return []
  }
  
  console.log('Attempting to fetch from Shopify store:', SHOPIFY_STORE_DOMAIN)

  const query = `
    query {
      products(first: 50, query: "status:active") {
        edges {
          node {
            id
            title
            description
            handle
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 10) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            variants(first: 10) {
              edges {
                node {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                  availableForSale
                  quantityAvailable
                  image {
                    url
                    altText
                  }
                }
              }
            }
          }
        }
      }
    }
  `

  try {
    console.log('Fetching from Shopify:', SHOPIFY_STORE_DOMAIN)
    console.log('Token present:', SHOPIFY_STOREFRONT_ACCESS_TOKEN ? 'Yes' : 'No')
    
    // Try different API versions if 2025-01 doesn't work
    const apiVersions = ['2025-01', '2024-10', '2024-07', '2024-04']
    
    for (const version of apiVersions) {
      try {
        const response = await fetch(`https://${SHOPIFY_STORE_DOMAIN}/api/${version}/graphql.json`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_ACCESS_TOKEN,
          },
          body: JSON.stringify({ query }),
        })

        if (!response.ok) {
          if (response.status === 401) {
            console.error(`API ${version}: Unauthorized - Check token permissions`)
            continue // Try next version
          }
          console.error(`API ${version} error:`, response.status, response.statusText)
          const errorText = await response.text()
          console.error('Error response:', errorText)
          continue
        }

        const data = await response.json()
        
        if (data.errors) {
          console.error(`API ${version} GraphQL errors:`, data.errors)
          continue
        }
        
        const products = data.data?.products?.edges?.map((edge: any) => edge.node) || []
        if (products.length > 0) {
          console.log(`Successfully fetched ${products.length} products using API ${version}`)
          return products
        }
      } catch (error) {
        console.error(`Error with API ${version}:`, error)
        continue
      }
    }
    
    console.error('All API versions failed. Check token and permissions.')
    return []
  } catch (error) {
    console.error('Error fetching products from Shopify:', error)
    return []
  }
}

export async function fetchProduct(handle: string): Promise<ShopifyProduct | null> {
  if (!SHOPIFY_STORE_DOMAIN || !SHOPIFY_STOREFRONT_ACCESS_TOKEN) {
    return null
  }

  const query = `
    query getProduct($handle: String!) {
      product(handle: $handle) {
        id
        title
        description
        handle
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        images(first: 20) {
          edges {
            node {
              url
              altText
            }
          }
        }
        variants(first: 20) {
          edges {
            node {
              id
              title
              price {
                amount
                currencyCode
              }
              availableForSale
              quantityAvailable
              image {
                url
                altText
              }
            }
          }
        }
      }
    }
  `

  try {
    const apiVersions = ['2025-01', '2024-10', '2024-07', '2024-04']
    
    for (const version of apiVersions) {
      try {
        const response = await fetch(`https://${SHOPIFY_STORE_DOMAIN}/api/${version}/graphql.json`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_ACCESS_TOKEN,
          },
          body: JSON.stringify({ 
            query,
            variables: { handle }
          }),
        })

        if (!response.ok) continue

        const data = await response.json()
        
        if (data.errors || !data.data?.product) {
          continue
        }
        
        return data.data.product
      } catch (error) {
        continue
      }
    }
    
    return null
  } catch (error) {
    console.error('Error fetching product from Shopify:', error)
    return null
  }
}

// Helper function to ensure URL uses Shopify store domain, not custom domain
function ensureShopifyDomain(url: string | null | undefined): string | null {
  if (!url || typeof url !== 'string') return null
  
  // Replace custom domain with Shopify store domain
  // This ensures we always use a URL that Shopify controls
  const shopifyStoreDomain = SHOPIFY_STORE_DOMAIN
  
  // If URL uses custom domain (begotten.shop or www.begotten.shop), replace with Shopify store domain
  if (url.includes('begotten.shop')) {
    try {
      // Replace the domain part, keeping the path and protocol
      // Handle both www.begotten.shop and begotten.shop
      const urlObj = new URL(url)
      const newUrl = url.replace(urlObj.hostname, shopifyStoreDomain)
      console.log('🔄 Replaced custom domain URL:', url, '→', newUrl)
      return newUrl
    } catch (e) {
      console.error('Error parsing URL in ensureShopifyDomain:', url, e)
      // If URL parsing fails, try simple string replacement
      const newUrl = url.replace(/begotten\.shop/g, shopifyStoreDomain)
      console.log('🔄 Replaced custom domain URL (fallback):', url, '→', newUrl)
      return newUrl
    }
  }
  
  return url
}

// Create a cart and add items, return checkout URL
export async function createCartAndCheckout(items: Array<{ variantId: string; quantity: number }>): Promise<string | null> {
  console.log('🚀 createCartAndCheckout called with items:', items)
  console.log('🚀 Store domain:', SHOPIFY_STORE_DOMAIN)
  console.log('🚀 Token present:', SHOPIFY_STOREFRONT_ACCESS_TOKEN ? 'Yes' : 'No')
  
  if (!SHOPIFY_STORE_DOMAIN || !SHOPIFY_STOREFRONT_ACCESS_TOKEN) {
    console.error('❌ Shopify credentials not configured')
    return null
  }

  const mutation = `
    mutation cartCreate($cartInput: CartInput!) {
      cartCreate(input: $cartInput) {
        cart {
          id
          checkoutUrl
          webUrl
        }
        userErrors {
          field
          message
        }
      }
    }
  `

  // Validate and format variant IDs
  const cartLines = items.map(item => {
    // Variant ID should be in GID format: gid://shopify/ProductVariant/123456789
    // If it's already in that format, use it; otherwise, we might need to convert it
    let variantId = item.variantId
    
    // Log the variant ID format for debugging
    console.log('📦 Processing item with variantId:', variantId, 'type:', typeof variantId)
    
    // Ensure variant ID is a string
    if (typeof variantId !== 'string') {
      console.error('❌ Invalid variant ID type:', typeof variantId, variantId)
      return null
    }
    
    // Check if it's already a GID
    if (!variantId.startsWith('gid://')) {
      console.warn('⚠️ Variant ID is not in GID format, attempting to convert:', variantId)
      // Try to convert if it's just a number or has a different format
      // This shouldn't happen, but let's handle it
    }
    
    return {
      merchandiseId: variantId,
      quantity: item.quantity
    }
  }).filter((line): line is { merchandiseId: string; quantity: number } => line !== null)

  if (cartLines.length === 0) {
    console.error('❌ No valid cart lines after processing')
    return null
  }

  const variables = {
    cartInput: {
      lines: cartLines
    }
  }
  
  console.log('📦 Cart lines being sent to API:', JSON.stringify(cartLines, null, 2))

  try {
    const apiVersions = ['2025-01', '2024-10', '2024-07', '2024-04']
    
    for (const version of apiVersions) {
      try {
        const apiUrl = `https://${SHOPIFY_STORE_DOMAIN}/api/${version}/graphql.json`
        console.log(`📡 Attempting API call to ${apiUrl} with version ${version}`)
        
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_ACCESS_TOKEN,
          },
          body: JSON.stringify({
            query: mutation,
            variables
          }),
        })

        console.log(`📡 API ${version} response status:`, response.status, response.statusText)
        
        if (!response.ok) {
          const errorText = await response.text()
          console.error(`❌ API ${version} failed:`, response.status, errorText)
          continue
        }

        const data = await response.json()
        
        // Log full response for debugging
        console.log('Full Shopify API response:', JSON.stringify(data, null, 2))
        
        if (data.errors) {
          console.error('❌ GraphQL errors:', JSON.stringify(data.errors, null, 2))
          // Log each error individually for clarity
          data.errors.forEach((error: any, index: number) => {
            console.error(`  Error ${index + 1}:`, error.message || error)
            if (error.extensions) {
              console.error(`  Extensions:`, JSON.stringify(error.extensions, null, 2))
            }
          })
          continue
        }

        if (data.data?.cartCreate?.userErrors?.length > 0) {
          console.error('Cart creation errors:', data.data.cartCreate.userErrors)
          continue
        }

        const cart = data.data?.cartCreate?.cart
        if (!cart) {
          console.error('No cart returned from API')
          continue
        }
        
        const checkoutUrl = cart?.checkoutUrl
        const webUrl = cart?.webUrl
        const cartId = cart?.id
        
        console.log('=== CART RESPONSE DEBUG ===')
        console.log('Cart ID:', cartId)
        console.log('Checkout URL:', checkoutUrl)
        console.log('Web URL:', webUrl)
        console.log('Checkout URL type:', typeof checkoutUrl)
        console.log('Web URL type:', typeof webUrl)
        
        // Always prefer checkoutUrl if it's a valid HTTP URL
        // The checkoutUrl should be a direct checkout URL from Shopify
        if (checkoutUrl && typeof checkoutUrl === 'string' && checkoutUrl.startsWith('http')) {
          const safeCheckoutUrl = ensureShopifyDomain(checkoutUrl)
          if (safeCheckoutUrl) {
            console.log('✅ Using checkoutUrl:', safeCheckoutUrl)
            return safeCheckoutUrl
          }
        }
        
        // Only use webUrl if it points to the Shopify store domain (not custom domain)
        // The webUrl might point to the custom domain's /cart which doesn't exist
        if (webUrl && typeof webUrl === 'string' && webUrl.startsWith('http')) {
          const safeWebUrl = ensureShopifyDomain(webUrl)
          if (safeWebUrl && safeWebUrl.includes('.myshopify.com')) {
            console.log('✅ Using webUrl (Shopify domain):', safeWebUrl)
            return safeWebUrl
          }
        }
        
        // Last resort: redirect to Shopify store cart page (not custom domain)
        // This ensures we always go to a valid Shopify page
        const fallbackUrl = `https://${SHOPIFY_STORE_DOMAIN}/cart`
        console.log('⚠️ Using fallback: Shopify store cart page:', fallbackUrl)
        return fallbackUrl
      } catch (error) {
        console.error(`❌ Error with API ${version}:`, error)
        // Log the full error for debugging
        if (error instanceof Error) {
          console.error(`Error message: ${error.message}`)
          console.error(`Error stack: ${error.stack}`)
        }
        continue
      }
    }
    
    // If all API versions failed, log why and return null
    console.error('❌ All API versions failed. Check:')
    console.error('  - Store domain:', SHOPIFY_STORE_DOMAIN)
    console.error('  - Token present:', SHOPIFY_STOREFRONT_ACCESS_TOKEN ? 'Yes' : 'No')
    console.error('  - Items being sent:', items)
    return null
  } catch (error) {
    console.error('Error creating cart:', error)
    return null
  }
}
