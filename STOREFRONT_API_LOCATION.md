# Where to Find Storefront API Token

You're in the **dev dashboard** (which is correct for creating apps), but the **Storefront API token** is actually in the **regular Shopify admin**, not the dev dashboard.

## You Need to Go to Regular Shopify Admin

The dev dashboard shows:
- Client ID and Secret (for building apps)
- App settings

But the **Storefront API access token** is in the **regular Shopify admin interface**.

## How to Get There

### Step 1: Go to Regular Shopify Admin

1. **Click "My Store"** button (top right, with "</>" icon)
   - This will take you to your regular Shopify admin

2. **OR** go directly to:
   ```
   https://YOUR-STORE.myshopify.com/admin
   ```

### Step 2: Find Your App

1. **In regular Shopify admin**, click **"Apps"** in the left sidebar
2. **Look for "Begotten Website"** in your apps list
3. **Click on it** to open the app details

### Step 3: Get Storefront API Token

1. **In the app details**, look for:
   - **"API credentials"** tab
   - **"Storefront API"** section
   - **"Configure Storefront API scopes"** link

2. **Click "Configure Storefront API scopes"** (if you haven't already)

3. **Enable the scopes**:
   - ✅ `unauthenticated_read_product_listings`
   - ✅ `unauthenticated_read_product_inventory`
   - ✅ `unauthenticated_read_checkouts`
   - ✅ `unauthenticated_write_checkouts`
   - Click **"Save"**

4. **Install the app** (if not already installed)

5. **Go to "API credentials"** tab or section

6. **Find "Storefront API access token"**

7. **Click "Reveal token"** and copy it

## Quick Navigation

**From Dev Dashboard → Regular Admin:**
1. Click **"My Store"** button (top right)
2. You'll be in regular Shopify admin
3. Go to **Apps** → **Begotten Website**
4. Find **Storefront API** section

## The Difference

- **Dev Dashboard** (where you are now):
  - For building/developing apps
  - Shows Client ID, Secret
  - App configuration

- **Regular Shopify Admin** (where you need to go):
  - For managing your store
  - Shows Storefront API token
  - Where you configure API scopes

## Visual Guide

```
Dev Dashboard (Current)
    ↓
Click "My Store" button
    ↓
Regular Shopify Admin
    ↓
Apps → Begotten Website
    ↓
API credentials / Storefront API
    ↓
Storefront API access token ← You need this!
```

## Alternative: Direct Link

If you know your app ID, you can try:
```
https://YOUR-STORE.myshopify.com/admin/apps/[APP-ID]/api_credentials
```

But the easiest is clicking "My Store" and navigating through Apps.

## What You're Looking For

Once in regular Shopify admin → Apps → Your app:
- **"Storefront API access token"** (not Client ID/Secret)
- Token starts with `shpat_`
- Button to "Reveal token"

Let me know once you click "My Store" and we can continue from there!

