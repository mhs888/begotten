# Get Out of Dev Dashboard - Create Custom App in Regular Admin

The dev dashboard is for building full Shopify apps with CLI. For your website, you need a **custom app** in the **regular Shopify admin**.

## Step 1: Go to Regular Shopify Admin

1. **Click "My Store"** button (top right, or look for a way to exit dev dashboard)
2. **OR** go directly to:
   ```
   https://6tfp84-zr.myshopify.com/admin
   ```

## Step 2: Go to Settings

1. **In regular Shopify admin**, click **"Settings"** (gear icon, bottom left)
2. **Click "Apps and sales channels"**

## Step 3: Find Custom Apps Section

1. **Scroll ALL the way to the bottom** of the page
2. **Look for a section** that says:
   - **"Custom apps"**
   - **"Your apps"**
   - **"App development"**
   - Or has a **"Create app"** button
3. **This is at the BOTTOM, separate from installed apps**

## Step 4: Create Custom App

1. **Click "Create app"** (in the custom apps section)
2. **Name it**: "Website Storefront"
3. **Click "Create app"**

## Step 5: Configure Storefront API

1. **You should now see tabs**: Overview, API credentials, Configuration
2. **Click "Configure Storefront API scopes"** or **"API credentials"** tab
3. **Enable scopes**:
   - ✅ `unauthenticated_read_product_listings`
   - ✅ `unauthenticated_read_product_inventory`
   - ✅ `unauthenticated_read_checkouts`
   - ✅ `unauthenticated_write_checkouts`
4. **Click "Save"**

## Step 6: Install App

1. **Click "Install app"**
2. **Confirm installation**

## Step 7: Get Token

1. **Go to "API credentials" tab**
2. **Find "Storefront API access token"**
3. **Click "Reveal token"**
4. **Copy it** (starts with `shpat_`)

## The Difference

- **Dev Dashboard** (where you are now):
  - For building full Shopify apps
  - Uses Shopify CLI
  - Creates app versions
  - ❌ Doesn't show Storefront API token easily

- **Regular Shopify Admin → Custom Apps** (where you need to go):
  - For getting API tokens
  - Simple interface
  - Shows Storefront API token directly
  - ✅ This is what you need!

## Quick Navigation

```
Dev Dashboard (Current)
    ↓
Click "My Store" or go to /admin
    ↓
Regular Shopify Admin
    ↓
Settings → Apps and sales channels
    ↓
Scroll to bottom
    ↓
Custom apps section
    ↓
Create app
    ↓
Get Storefront API token
```

## Direct URL to Try

If you can't find it, try:
```
https://6tfp84-zr.myshopify.com/admin/settings/apps/develop
```

This should take you to custom apps in regular admin (not dev dashboard).

## What You're Looking For

In regular Shopify admin → Settings → Apps and sales channels:
- Scroll past all the installed apps
- Look for a section at the very bottom
- Should say "Custom apps" or have "Create app" button
- This is DIFFERENT from the dev dashboard

Let me know when you're in regular Shopify admin (not dev dashboard) and we can continue!

