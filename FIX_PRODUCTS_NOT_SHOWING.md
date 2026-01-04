# Fix: Products Not Showing from Shopify

You have 6 published products but they're not appearing. Here's how to debug and fix it.

## Step 1: Check Browser Console

1. **Open browser console**: `F12` or `Cmd+Option+I`
2. **Go to Console tab**
3. **Refresh the page**
4. **Look for messages**:
   - "Attempting to fetch from Shopify store: 6tfp84-zr.myshopify.com"
   - "Successfully fetched products: X"
   - Any error messages

## Step 2: Check Common Issues

### Issue 1: Products Not in Online Store Sales Channel

**This is the most common issue!**

Storefront API only shows products that are:
- ✅ Published
- ✅ Added to "Online Store" sales channel

**To fix:**
1. Go to Shopify Admin → Products
2. Click on each product
3. Scroll to "Sales channels" section
4. Make sure "Online Store" is checked/enabled
5. Save the product

### Issue 2: API Version

The code uses API version `2025-01`. If that doesn't work, try:
- `2024-10`
- `2024-07`
- `2024-04`

### Issue 3: Token Permissions

Make sure your token has these scopes:
- `unauthenticated_read_product_listings`
- `unauthenticated_read_product_inventory`

## Step 3: Test the API Directly

You can test if the API is working by going to:
```
https://6tfp84-zr.myshopify.com/api/2025-01/graphql.json
```

But you'll need to use a tool like Postman or curl with your token.

## Most Likely Fix

**Check if products are in Online Store sales channel:**

1. Shopify Admin → Products
2. Click on a product (e.g., "Armor of God Tee Shirt")
3. Look for "Sales channels" section
4. Make sure "Online Store" is enabled
5. Do this for all 6 products
6. Refresh your website

## What to Check Now

1. **Browser console** - what messages do you see?
2. **Sales channels** - are products in "Online Store"?
3. **Product status** - all say "Active"?

Let me know what the console says and I can help further!

