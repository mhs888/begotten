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

// Create a cart and add items, return checkout URL
export async function createCartAndCheckout(items: Array<{ variantId: string; quantity: number }>): Promise<string | null> {
  if (!SHOPIFY_STORE_DOMAIN || !SHOPIFY_STOREFRONT_ACCESS_TOKEN) {
    console.error('Shopify credentials not configured')
    return null
  }

  const mutation = `
    mutation cartCreate($cartInput: CartInput!) {
      cartCreate(input: $cartInput) {
        cart {
          id
          checkoutUrl
        }
        userErrors {
          field
          message
        }
      }
    }
  `

  const variables = {
    cartInput: {
      lines: items.map(item => ({
        merchandiseId: item.variantId,
        quantity: item.quantity
      }))
    }
  }

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
            query: mutation,
            variables
          }),
        })

        if (!response.ok) continue

        const data = await response.json()
        
        if (data.errors) {
          console.error('GraphQL errors:', data.errors)
          continue
        }

        if (data.data?.cartCreate?.userErrors?.length > 0) {
          console.error('Cart creation errors:', data.data.cartCreate.userErrors)
          continue
        }

        const cart = data.data?.cartCreate?.cart
        const checkoutUrl = cart?.checkoutUrl
        
        if (checkoutUrl) {
          // The checkoutUrl should go directly to checkout
          console.log('Checkout URL from API:', checkoutUrl)
          
          // Validate the checkout URL format
          // Should be: https://checkout.shopify.com/... or https://your-store.myshopify.com/checkouts/...
          if (checkoutUrl.includes('/cart') || checkoutUrl.includes('myshopify.com/cart')) {
            // If it's a cart URL, we need to use the cart web URL instead
            const cartId = cart?.id
            if (cartId) {
              // Extract cart token from cart ID (gid://shopify/Cart/abc123 -> abc123)
              const cartToken = cartId.split('/').pop()
              // Use the web URL format for checkout
              return `https://${SHOPIFY_STORE_DOMAIN}/cart/${cartToken}:checkout`
            }
            // Fallback: return the URL as-is but log warning
            console.warn('Checkout URL appears to be a cart URL:', checkoutUrl)
            return checkoutUrl
          }
          
          // Return the checkout URL if it looks valid
          if (checkoutUrl.includes('checkout') || checkoutUrl.includes('checkouts')) {
            return checkoutUrl
          }
          
          // If URL doesn't look right, log and return null to use fallback
          console.error('Invalid checkout URL format:', checkoutUrl)
          return null
        }
      } catch (error) {
        console.error(`Error with API ${version}:`, error)
        continue
      }
    }
    
    return null
  } catch (error) {
    console.error('Error creating cart:', error)
    return null
  }
}
