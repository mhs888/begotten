# Get Storefront API Token After Installing App

Your scopes are correct! Now you need to **install/release the app** to get the Storefront API token.

## Step 1: Install App to Your Store

The token appears **after** the app is installed to your store:

1. **In Dev Dashboard**, go to your app
2. **Click "Versions"** tab
3. **Find your active version** (should show the scopes you configured)
4. **Look for one of these buttons**:
   - **"Release"** button (top right)
   - **"Install"** button
   - **"Test on development store"**
   - **"Install to store"**

5. **Click it** and install to: **6tfp84-zr.myshopify.com**

## Step 2: Find Token After Installation

After installing, the token should be available in one of these places:

### Option A: In Dev Dashboard

1. **Go to your app** → **"Settings"** tab
2. **Scroll down** - look for a new section that appeared after installation
3. **Look for**:
   - "Storefront API access token"
   - "Public API token"
   - "API access tokens" (separate from Client ID/Secret)

### Option B: In Regular Shopify Admin

1. **Go to regular Shopify admin**
2. **Settings → Apps and sales channels**
3. **Find your app** in installed apps (should appear after installation)
4. **Click on it**
5. **Look for API credentials** section

### Option C: In Versions Tab

1. **Go to "Versions"** tab
2. **Click on your installed/released version**
3. **Look for "API credentials"** or **"Access tokens"** section

## Step 3: Release the App (If Needed)

Some apps need to be "released" first:

1. **In "Versions"** tab
2. **Click "Release"** button (top right)
3. **Confirm release**
4. **Then install** to your store
5. **Token should appear**

## What the Token Looks Like

The Storefront API token will:
- Start with `shpat_` (not `shpss_` like the Secret)
- Be labeled "Storefront API access token"
- Have a "Reveal" or "Show" button

## Quick Checklist

- [x] Scopes configured correctly ✅
- [ ] App installed to store
- [ ] App released (if required)
- [ ] Token visible in Settings or after installation

## If Token Still Not Visible

Try:
1. **Refresh the page** after installing
2. **Check different tabs**: Settings, Versions, Overview
3. **Make sure app is fully installed** (not just in development)
4. **Check if app needs to be "published" or "released"**

## What to Do Now

**In Dev Dashboard:**

1. **Go to "Versions"** tab
2. **Do you see a "Release" button?** (top right)
3. **Or an "Install" button?**
4. **Click it and install to your store**
5. **Then check Settings tab again** for the token

Let me know what buttons you see in the Versions tab!

