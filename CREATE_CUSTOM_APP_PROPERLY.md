# Create Custom App Properly in Shopify Admin

The app from the dev dashboard doesn't show API credentials. Let's create a proper custom app directly in Shopify admin.

## Step-by-Step: Create Custom App

### Step 1: Go to Settings

1. **Click "Settings"** (gear icon, bottom left)
2. **Click "Apps and sales channels"**

### Step 2: Find Custom Apps Section

1. **Scroll ALL the way down** to the very bottom of the page
2. **Look for a section** that says:
   - **"Custom apps"**
   - **"Your apps"**
   - Or has a **"Create app"** button
3. **This is DIFFERENT from the "Develop apps" button at the top**

### Step 3: Create New App

1. **Click "Create app"** (in the custom apps section at the bottom)
2. **Enter app name**: "Website Storefront" or "Storefront API"
3. **Click "Create app"**

### Step 4: Configure Storefront API

1. **You should now see** tabs or sections:
   - Overview
   - API credentials
   - Configuration

2. **Click "Configure Storefront API scopes"** or go to **"API credentials"** tab

3. **Enable these scopes** (check the boxes):
   - ✅ `unauthenticated_read_product_listings`
   - ✅ `unauthenticated_read_product_inventory`
   - ✅ `unauthenticated_read_checkouts`
   - ✅ `unauthenticated_write_checkouts`

4. **Click "Save"**

### Step 5: Install the App

1. **Go to "Overview" tab** or look for **"Install app"** button
2. **Click "Install app"**
3. **Review and confirm** the installation

### Step 6: Get Your Token

1. **Go to "API credentials" tab**
2. **Find "Storefront API access token"**
3. **Click "Reveal token"** or **"Show token"**
4. **Copy the token** - it starts with `shpat_`
5. **Save it securely** - you can only see it once!

### Step 7: Get Your Store Domain

Your store domain is: **6tfp84-zr.myshopify.com**

(You can see this in the URL or in Settings → General)

## What You Should See

After creating the app, you should see:
- ✅ Tabs: Overview, API credentials, Configuration
- ✅ "Storefront API" section
- ✅ "Configure Storefront API scopes" button
- ✅ After installing: "Storefront API access token"

## If You Don't See "Custom Apps" Section

### Try This URL Directly:
```
https://6tfp84-zr.myshopify.com/admin/settings/apps/develop
```

This should take you to the custom apps section.

### Or Look For:
- A button that says **"Allow custom app development"**
- Click it first, then you'll see "Create app"

## After You Get the Token

1. **Create `.env.local` file**:
   ```bash
   cd /Users/mschepis/Desktop/Begotten
   cp env.template .env.local
   ```

2. **Edit `.env.local`**:
   ```
   NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=6tfp84-zr.myshopify.com
   NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-token-here
   ```

3. **Restart dev server**:
   ```bash
   npm run dev
   ```

## Why This Works

Creating a custom app directly in Shopify admin (not dev dashboard) gives you:
- ✅ Proper API credentials access
- ✅ Storefront API configuration
- ✅ Token that works with your website

The dev dashboard app is for building full apps, not just getting API tokens.

## Quick Checklist

- [ ] Settings → Apps and sales channels
- [ ] Scroll to very bottom
- [ ] Find "Custom apps" section
- [ ] Click "Create app"
- [ ] Name it
- [ ] Configure Storefront API scopes
- [ ] Install app
- [ ] Get Storefront API token
- [ ] Add to `.env.local`
- [ ] Restart dev server

Let me know when you've created the app and I can help with the next steps!

