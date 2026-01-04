# Getting Storefront API Token with New Shopify System (2026)

Shopify changed their system on January 1, 2026. Custom apps must now be created through the Dev Dashboard. Here's how to get your Storefront API token:

## Step 1: Your App is Already Created

You've already created "Storefront" app in the Dev Dashboard - that's good!

## Step 2: Install App to Your Store

The app needs to be installed to your store to get the Storefront API token:

1. **In Dev Dashboard**, go to your "Storefront" app
2. **Click "Versions"** in the left sidebar
3. **Find your active version** (should show "Active" tag)
4. **Look for "Install" or "Test on development store"** button
5. **Install it to your store**: 6tfp84-zr.myshopify.com

## Step 3: Get Storefront API Token

After installing, the token should be available:

### Method A: In Dev Dashboard

1. **Go to your app** → **"Settings"** tab
2. **Look for "API credentials"** section
3. **Find "Storefront API access token"**
4. **Click "Reveal token"** and copy it

### Method B: In Regular Shopify Admin

1. **Go to regular Shopify admin**
2. **Settings → Apps and sales channels**
3. **Find your app** in installed apps
4. **Click on it**
5. **Look for API credentials** (might be in a different location now)

## Step 4: Configure Storefront API Scopes

Make sure your app has the right scopes:

1. **In Dev Dashboard** → Your app → **"Versions"**
2. **Click on your active version**
3. **In "Access" section**, make sure these scopes are listed:
   - `unauthenticated_read_product_listings`
   - `unauthenticated_read_product_inventory`
   - `unauthenticated_read_checkouts`
   - `unauthenticated_write_checkouts`
4. **If not, add them** and save

## Alternative: Use Shopify Buy Button

If getting the Storefront API token is too complex with the new system, we can use **Shopify Buy Button** instead:

### Benefits:
- ✅ Works with new Shopify system
- ✅ Simpler setup
- ✅ Still connects to Printify
- ✅ No API token needed
- ✅ Easier to implement

### How It Works:
- Embed Shopify product widgets on your website
- Customers click "Buy" → Goes to Shopify checkout
- Orders flow to Printify automatically

## What to Try Now

**In Dev Dashboard:**

1. **Go to your "Storefront" app**
2. **Click "Settings"** tab
3. **Look for any section** that mentions:
   - API credentials
   - Storefront API
   - Access tokens
   - Client credentials

**OR**

1. **Go to "Versions"** tab
2. **Click on your active version**
3. **Look for "API credentials"** or **"Install"** button
4. **Install the app** to your store first
5. **Then check for token**

## If Token Still Not Visible

The new system might require:
- App to be fully installed
- App to be "released" (not just in development)
- Different permissions or setup

## Recommendation

Given the complexity of the new system, I'd suggest:

**Option 1**: Try to find the token in Dev Dashboard Settings
**Option 2**: Use Shopify Buy Button (simpler, works great)
**Option 3**: Contact Shopify support to help locate the token

Which would you prefer? I can help implement the Buy Button approach if that's easier!

