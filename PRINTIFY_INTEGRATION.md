# Printify Integration Guide

Yes! You can absolutely integrate Printify with your website. The best way is through **Shopify** - Printify connects to Shopify, and your website connects to Shopify. Here's how:

## How It Works

```
Your Website (Next.js) 
    ↓
Shopify Store (handles products, cart, checkout)
    ↓
Printify (handles printing & fulfillment)
```

**Flow:**
1. Customer visits your website
2. Customer adds product to cart (via Shopify)
3. Customer checks out on Shopify
4. Order automatically goes to Printify
5. Printify prints and ships the product
6. You never touch inventory!

## Step-by-Step Setup

### Step 1: Set Up Shopify Store

1. **Create Shopify Account**:
   - Go to [shopify.com](https://shopify.com)
   - Start 14-day free trial
   - Choose **Basic Shopify** plan ($29/month) - perfect for starting

2. **Complete Store Setup**:
   - Add store name
   - Set up payment processing (Shopify Payments, Stripe, etc.)
   - Configure basic settings

### Step 2: Connect Printify to Shopify

1. **Create Printify Account**:
   - Go to [printify.com](https://printify.com)
   - Sign up for free account

2. **Install Printify App in Shopify**:
   - In Printify dashboard, go to "My Stores"
   - Click "Connect new store"
   - Select "Shopify"
   - Authorize the connection
   - Your Shopify store is now connected!

### Step 3: Add Products to Printify

1. **In Printify Dashboard**:
   - Click "Create product"
   - Choose product type (T-Shirt, Hoodie, etc.)
   - Select print provider (Printify will show options)
   - Upload your design files:
     - Front design image
     - Back design image (if applicable)
   - Set print areas and positioning
   - Choose product colors and sizes
   - Set your profit margin (this determines your selling price)

2. **Push to Shopify**:
   - After creating product in Printify
   - Click "Publish to Shopify"
   - Product automatically appears in your Shopify store
   - Printify handles inventory automatically

### Step 4: Connect Your Website to Shopify

Your website already has Shopify integration code! Here's how to complete it:

1. **Get Shopify Storefront API Credentials**:
   - In Shopify Admin, go to **Apps** → **Develop apps**
   - Click **"Create an app"**
   - Name it (e.g., "Website Storefront")
   - Click **"Create app"**

2. **Configure Storefront API**:
   - Click **"Configure Storefront API scopes"**
   - Enable these scopes:
     - ✅ `unauthenticated_read_product_listings`
     - ✅ `unauthenticated_read_product_inventory`
     - ✅ `unauthenticated_read_checkouts`
     - ✅ `unauthenticated_write_checkouts`
   - Click **"Save"**

3. **Install App and Get Token**:
   - Click **"Install app"**
   - Copy the **"Storefront API access token"**
   - Also note your store domain (e.g., `your-store.myshopify.com`)

4. **Add Credentials to Your Website**:
   - Create `.env.local` file in your project root:
     ```bash
     cp env.template .env.local
     ```
   - Edit `.env.local` and add:
     ```
     NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
     NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-storefront-token-here
     ```

5. **Update Your Website to Use Shopify Products**:
   - The code in `lib/shopify.ts` is ready
   - You'll need to update `components/ProductShowcase.tsx` to fetch from Shopify instead of using local products
   - (I can help with this if needed!)

### Step 5: Test the Flow

1. **Test Product Display**:
   - Products from Printify → Shopify should appear on your website
   - Check that images, prices, and descriptions are correct

2. **Test Checkout**:
   - Add product to cart
   - Go through checkout process
   - Complete a test order

3. **Verify Printify Fulfillment**:
   - Check Printify dashboard - order should appear
   - Printify will automatically fulfill the order

## Alternative: Direct Printify Integration

If you want to skip Shopify, Printify has a **Direct API**, but it's more complex:

- Requires Printify API access
- You'd need to build cart/checkout yourself
- More development work required
- **Recommendation**: Use Shopify as the middle layer (easier and more reliable)

## Benefits of This Setup

✅ **No Inventory**: Printify handles everything  
✅ **Automatic Fulfillment**: Orders go straight to Printify  
✅ **Multiple Products**: Easy to add new designs  
✅ **Professional Checkout**: Shopify handles payments securely  
✅ **Your Brand**: Website looks like your brand, not Printify's  
✅ **Profit Control**: You set your profit margins in Printify  

## Cost Breakdown

- **Shopify**: $29/month (Basic plan)
- **Printify**: Free (they take a cut per order)
- **Your Website**: Free (hosted on Vercel)
- **Domain**: ~$10-15/year

**Total**: ~$29/month + per-order fees

## Workflow Example

1. **You create design** → Upload to Printify
2. **Printify creates product** → Pushes to Shopify
3. **Shopify shows product** → Your website displays it
4. **Customer buys** → Shopify processes payment
5. **Order sent to Printify** → Automatically fulfilled
6. **Product shipped** → Customer receives it
7. **You get profit** → Minus Printify's fees

## Next Steps

1. ✅ Set up Shopify store
2. ✅ Connect Printify to Shopify
3. ✅ Add your t-shirt designs to Printify
4. ✅ Push products to Shopify
5. ✅ Connect website to Shopify (using credentials above)
6. ✅ Test end-to-end flow
7. ✅ Launch!

## Need Help?

I can help you:
- Update the website code to pull products from Shopify
- Set up the cart/checkout integration
- Configure the product display
- Test the full flow

Just let me know when you're ready to connect Shopify to your website!

## Resources

- **Printify**: https://printify.com
- **Shopify**: https://shopify.com
- **Printify + Shopify Guide**: https://help.printify.com/en/articles/3199501-how-to-connect-printify-to-shopify
- **Shopify Storefront API**: https://shopify.dev/api/storefront

