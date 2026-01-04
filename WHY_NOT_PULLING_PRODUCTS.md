# Why Products Aren't Pulling from Shopify

## The Issue

Your `.env.local` file had **placeholder values** instead of your actual credentials:
- ❌ `your-store.myshopify.com` (placeholder)
- ❌ `your-storefront-access-token` (placeholder)

## The Fix

I've updated your `.env.local` file with your actual credentials:
- ✅ `6tfp84-zr.myshopify.com` (your store)
- ✅ `shpat_YOUR_TOKEN_HERE` (your token)

## What Happens Now

1. **The code is already set up** to fetch from Shopify
2. **It was just missing the credentials**
3. **Now it should work!**

## Next Steps

1. **Restart your dev server**:
   ```bash
   # Stop current server (Ctrl+C)
   npm run dev
   ```

2. **Refresh your browser** (http://localhost:3000)

3. **Check the Products section** - you should see:
   - Products from your Shopify store
   - Product images from Shopify
   - Prices from Shopify
   - All 4 t-shirts (Armor of God, Chi Rho, Crown, Mary)

## How It Works

The code in `ProductShowcase.tsx`:
1. **Tries to fetch from Shopify** first
2. **If successful** → Shows Shopify products
3. **If fails** → Falls back to local products

Since you now have credentials, it should fetch from Shopify!

## Troubleshooting

### Still seeing local products?

1. **Check browser console** (F12 → Console):
   - Look for errors
   - Check if it says "Shopify credentials not configured"

2. **Verify .env.local**:
   - Should have your store domain
   - Should have your token (starts with `shpat_`)

3. **Restart server**:
   - Must restart after changing .env.local
   - Stop (Ctrl+C) and run `npm run dev` again

### Products not showing?

- Make sure products exist in your Shopify store
- Check that products are published (not drafts)
- Verify products have images in Shopify

## Test It Now!

1. Restart your dev server
2. Go to http://localhost:3000
3. Scroll to Products section
4. You should see your Shopify products! 🎉

Let me know if the products appear now!

