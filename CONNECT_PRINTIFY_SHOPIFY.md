# Connect Printify to Shopify - Step by Step

## Part 1: Connect Printify to Shopify

### Step 1: Set Up Printify Account
1. Go to [printify.com](https://printify.com)
2. Sign up for a free account
3. Complete your profile

### Step 2: Connect Your Shopify Store
1. **In Printify Dashboard**:
   - Click on **"My Stores"** in the left sidebar
   - Click **"Connect new store"** button
   - Select **"Shopify"** from the list

2. **Authorize Connection**:
   - You'll be redirected to Shopify
   - Log in to your Shopify account
   - Click **"Install app"** to authorize Printify
   - You'll be redirected back to Printify

3. **Verify Connection**:
   - You should see your Shopify store listed in "My Stores"
   - Status should show as "Connected"

### Step 3: Add Products to Printify
1. **Create Product in Printify**:
   - Click **"Create product"** in Printify
   - Choose product type (T-Shirt, Hoodie, etc.)
   - Select a print provider
   - Upload your design files (front and back)
   - Set print areas and positioning
   - Choose colors and sizes
   - Set your profit margin (this determines your selling price)

2. **Publish to Shopify**:
   - After creating the product, click **"Publish to Shopify"**
   - The product will appear in your Shopify store automatically
   - Printify will handle inventory automatically

## Part 2: Connect Your Website to Shopify

Now that Printify → Shopify is connected, let's connect your website → Shopify.

### Step 1: Get Shopify Storefront API Credentials

Follow the detailed guide in `GET_SHOPIFY_CREDENTIALS.md` or follow these quick steps:

1. **In Shopify Admin**:
   - Go to **Apps** → **Develop apps**
   - Click **"Create an app"**
   - Name it (e.g., "Website Storefront")
   - Click **"Configure Storefront API scopes"**
   - Enable these scopes:
     - ✅ `unauthenticated_read_product_listings`
     - ✅ `unauthenticated_read_product_inventory`
     - ✅ `unauthenticated_read_checkouts`
     - ✅ `unauthenticated_write_checkouts`
   - Click **"Save"**
   - Click **"Install app"**
   - Copy the **"Storefront API access token"**
   - Note your store domain (e.g., `your-store.myshopify.com`)

### Step 2: Add Credentials to Your Website

1. **Create `.env.local` file**:
   ```bash
   cd /Users/mschepis/Desktop/Begotten
   cp env.template .env.local
   ```

2. **Edit `.env.local`** and add:
   ```
   NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
   NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-token-here
   ```

3. **Restart your dev server**:
   ```bash
   npm run dev
   ```

### Step 3: Verify It Works

1. **Check your website** - Products from Shopify should appear
2. **If products don't show**:
   - Make sure you have products in Shopify (from Printify)
   - Check browser console for errors
   - Verify `.env.local` file has correct credentials
   - Make sure you restarted the dev server

## Complete Flow

✅ **Printify** → Creates products with your designs  
✅ **Shopify** → Receives products from Printify  
✅ **Your Website** → Displays products from Shopify  
✅ **Customer** → Buys on your website → Shopify processes → Printify fulfills  

## What Happens Now

- Products you create in Printify automatically appear on your website
- When customers click "Add to Cart", it goes to Shopify checkout
- Orders automatically go to Printify for fulfillment
- You never touch inventory!

## Next: Implement Checkout

Once products are showing, we can implement the "Add to Cart" functionality to redirect to Shopify checkout. Let me know when you're ready!

