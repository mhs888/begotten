# Debug: Products Not Showing from Shopify

## Check Browser Console

1. **Open browser console**: Press `F12` or `Cmd+Option+I` (Mac)
2. **Go to "Console" tab**
3. **Look for messages**:
   - "Fetched products from Shopify: X" - shows how many products were fetched
   - "Converted products: X" - shows how many were converted
   - Any error messages

## Common Issues

### Issue 1: Products Not Published in Shopify

**Check:**
- Go to Shopify Admin → Products
- Make sure products are **Published** (not Draft)
- Products must be published to appear via Storefront API

### Issue 2: Products Have No Images

**Check:**
- Products in Shopify must have images
- Images should be uploaded in Shopify product settings
- Products without images might not display correctly

### Issue 3: Products Filtered Out

**Check:**
- The filter might be hiding products
- Try clicking "ALL" in the filter buttons
- Check if products have correct category (tshirt/hoodie)

### Issue 4: API Credentials Issue

**Check:**
- Verify `.env.local` has correct credentials
- Make sure you restarted server after adding credentials
- Check console for "Shopify credentials not configured" warning

## What to Check

1. **How many products in Shopify?**
   - Go to Shopify Admin → Products
   - Count how many published products you have

2. **What does console say?**
   - Look for "Fetched products from Shopify: X"
   - This tells you if products are being fetched

3. **Are products published?**
   - Draft products won't show via Storefront API
   - Only published products appear

## Quick Test

1. **Open browser console** (F12)
2. **Refresh the page**
3. **Look for**:
   - "Fetched products from Shopify: 4" (or however many you have)
   - Any error messages

4. **Tell me what you see** in the console!

## If Products Still Don't Show

Share with me:
1. How many products you have in Shopify
2. What the console says (any messages?)
3. Are products published or drafts?

This will help me figure out what's wrong!

