# Fix: Checkout Logo Links to Shopify Storefront

## The Issue

When customers click the logo on the Shopify checkout page, it redirects them to your Shopify storefront (`bgttn.myshopify.com`) instead of your custom site (`begotten.shop`).

## Why This Happens

The checkout page is hosted by Shopify, and by default, the logo links to your Shopify storefront. This is standard behavior for all Shopify stores.

## Solutions

### Option 1: Set Custom Domain as Primary (Recommended - Free)

**This might work if Shopify recognizes your custom domain as the primary storefront:**

1. **Go to Shopify Admin** → **Settings** → **Domains**
2. **Find your custom domain** (`begotten.shop`)
3. **Set it as the primary domain** (if not already)
4. **Check if there's a "Storefront URL" setting** and set it to `https://begotten.shop`

**Note:** This may not work if Shopify still treats the checkout as separate from the storefront, but it's worth trying first.

### Option 2: Shopify Plus Customization (Requires Upgrade)

If you have **Shopify Plus** ($2,000+/month), you can:
- Customize the checkout logo link through `checkout.liquid`
- Set it to point to `https://begotten.shop`
- Full control over checkout branding

**This requires:**
- Shopify Plus subscription
- Access to checkout.liquid file
- Technical setup

### Option 3: Accept the Current Behavior (Recommended for Now)

**Why this might be okay:**
- Most customers complete checkout without clicking the logo
- The checkout page is secure and trusted (Shopify branding)
- Customers understand they're on a secure checkout page
- The logo still shows your brand

**You can still:**
- Customize checkout colors and fonts to match your brand
- Add your logo to the checkout page
- Make the checkout feel branded to your site

### Option 4: Check Shopify Settings

1. **Go to Shopify Admin** → **Settings** → **Checkout**
2. **Look for "Branding" or "Logo" settings**
3. **Check if there's a "Logo link URL" option**
4. **If available, set it to:** `https://begotten.shop`

**Note:** This setting may not exist on all Shopify plans.

## What You Can Do Right Now

1. **Customize checkout branding:**
   - Go to **Settings** → **Checkout**
   - Upload your logo
   - Match colors to your site
   - Add custom fonts if available

2. **Test the primary domain setting:**
   - Set `begotten.shop` as primary domain
   - See if checkout logo links to it

3. **Consider the user experience:**
   - Most customers don't click the logo during checkout
   - They're focused on completing the purchase
   - The checkout page is secure and trusted

## Recommendation

**For now, I'd recommend:**
1. Try setting `begotten.shop` as the primary domain in Shopify
2. Customize the checkout branding to match your site
3. Accept that the logo might link to the Shopify storefront (this is normal)

**If this becomes a real problem:**
- Consider Shopify Plus for full checkout customization
- Or contact Shopify Support to see if there's a workaround

## Next Steps

1. **Check Shopify Admin** → **Settings** → **Domains**
2. **Set `begotten.shop` as primary** (if not already)
3. **Test checkout** and see if logo links to your custom site
4. **If it still links to storefront**, that's expected behavior for non-Plus plans

Let me know what you find in the Shopify settings!

