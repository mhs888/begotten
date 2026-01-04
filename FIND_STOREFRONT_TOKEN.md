# Find Storefront API Token in New Shopify System

You're seeing **Client ID and Secret** - these are for Admin API, not Storefront API. We need a different token.

## What You're Seeing vs What You Need

**What you have:**
- Client ID: `YOUR_CLIENT_ID`
- Secret: `YOUR_SECRET`
- ❌ These are for Admin API (server-side operations)

**What you need:**
- Storefront API access token: `shpat_...`
- ✅ This is for displaying products on your website

## Where to Find Storefront API Token

### In Dev Dashboard Settings

1. **In your app's Settings tab**, scroll down
2. **Look for a section** that says:
   - **"Storefront API"**
   - **"Storefront API access token"**
   - **"Public API"**
   - **"API credentials"** (different from Client ID/Secret)

### After Installing App

The Storefront API token might only appear **after the app is installed** to your store:

1. **Go to "Versions"** tab in your app
2. **Make sure your version is "Active"**
3. **Click "Install"** or **"Test on development store"**
4. **Install to**: 6tfp84-zr.myshopify.com
5. **After installing**, check Settings again for Storefront API token

### Check Different Tabs

In Dev Dashboard, check:
- **"Settings"** tab (where you are now)
- **"Overview"** tab
- **"Versions"** → Click on your version → Look for API credentials

## Alternative: Use Shopify Buy Button

Since the new system is complex, **Shopify Buy Button** might be easier:

### Benefits:
- ✅ No API token needed
- ✅ Works with new Shopify system
- ✅ Simple embed code
- ✅ Still connects to Printify
- ✅ Products show on your website

### How It Works:
1. Get embed code from Shopify
2. Add to your website
3. Products display with "Buy" buttons
4. Customers checkout on Shopify
5. Orders go to Printify

## What to Check Now

**In Dev Dashboard Settings:**

1. **Scroll down** past Client ID/Secret
2. **Look for any other sections** mentioning:
   - Storefront
   - Public API
   - Access token
   - API credentials (separate section)

**OR**

1. **Go to "Versions"** tab
2. **Click on your active version**
3. **Look for API credentials** there

## Recommendation

Given the complexity of finding the Storefront API token in the new system, I'd suggest:

**Option 1**: Keep looking in Settings/Versions for Storefront API token
**Option 2**: Use Shopify Buy Button (much simpler, no token needed)

Would you like me to help you set up the Buy Button approach? It's actually simpler and works great for your use case!

Let me know what other sections you see in the Settings tab (scroll down and tell me what's there).

