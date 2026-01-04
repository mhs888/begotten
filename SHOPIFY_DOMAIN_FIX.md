# Fix: Checkout 404 - Shopify Domain Settings

## The Problem

The checkout is failing with a 404 error because Shopify might be returning URLs with your custom domain (`begotten.shop`) instead of the Shopify store domain (`6tfp84-zr.myshopify.com`).

## Root Cause

If your **custom domain is set as the primary domain** in Shopify, the Storefront API will return checkout URLs pointing to your custom domain. Since your custom domain points to Vercel (not Shopify), those URLs don't exist and return 404.

## Solution: Set Shopify Store Domain as Primary

1. **Go to Shopify Admin**
   - Log in at: https://admin.shopify.com

2. **Navigate to Settings → Domains**
   - Click "Settings" in the bottom left
   - Click "Domains"

3. **Set `.myshopify.com` as Primary**
   - Find `6tfp84-zr.myshopify.com` in the list
   - Click "Set as primary" next to it
   - This ensures Shopify generates checkout URLs with the `.myshopify.com` domain

4. **Verify Custom Domain is Still Connected**
   - Your custom domain (`begotten.shop`) should still be connected
   - It just won't be the primary domain
   - This is fine - your Vercel site will still work

## Why This Works

- **Primary domain** = What Shopify uses for checkout URLs
- **Custom domain** = What customers see (points to your Vercel site)
- By setting `.myshopify.com` as primary, checkout URLs will always use the Shopify domain
- Your custom domain still works for the main site (it's on Vercel)

## After Making This Change

1. **Wait 5-10 minutes** for Shopify to update
2. **Try checkout again** on your site
3. **Check the console** - you should see checkout URLs with `myshopify.com` instead of `begotten.shop`

## Alternative: Check GraphQL Errors

If changing the primary domain doesn't help, the GraphQL API might be failing for another reason:

1. **Open browser console** when clicking checkout
2. **Expand the GraphQL errors** (click the arrow)
3. **Share the full error message** - it will tell us what's wrong

Common GraphQL errors:
- Invalid variant ID format
- Product not available
- Inventory issues
- API permissions

## Need Help?

Share:
1. What the GraphQL error says (expand it in console)
2. Whether you changed the primary domain
3. What happens when you try checkout after the change

