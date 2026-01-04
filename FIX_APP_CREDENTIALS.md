# Fix: App Shows "Example Domain" - Get API Credentials

The "Example Domain" message is just a placeholder - your app is created but needs to be accessed differently to get the Storefront API token.

## Solution: Access Through Settings

Instead of clicking on the app itself, you need to access it through **Settings**:

### Method 1: Through Apps Settings (Recommended)

1. **In Shopify Admin**, click **"Settings"** (gear icon, bottom left)
2. **Click "Apps and sales channels"**
3. **Scroll down** to find **"Develop apps"** or **"Custom apps"**
4. **Click on "Begotten Website"** (your app)
5. **You should now see**:
   - API credentials
   - Storefront API section
   - Configuration options

### Method 2: Direct URL

Try going directly to:
```
https://YOUR-STORE.myshopify.com/admin/settings/apps/[APP-ID]
```

Or:
```
https://YOUR-STORE.myshopify.com/admin/apps/manage
```

Then find your app in the list.

## What You Should See

Once in the right place, you should see:
- **"Configure Storefront API scopes"** button/link
- **"API credentials"** section
- **"Storefront API access token"** with a "Reveal token" button

## Step-by-Step: Configure Storefront API

1. **Go to Settings → Apps and sales channels**
2. **Find "Begotten Website"** in the custom apps section
3. **Click on it**
4. **Click "Configure Storefront API scopes"**
5. **Enable these scopes**:
   - ✅ `unauthenticated_read_product_listings`
   - ✅ `unauthenticated_read_product_inventory`
   - ✅ `unauthenticated_read_checkouts`
   - ✅ `unauthenticated_write_checkouts`
6. **Click "Save"**
7. **Click "Install app"** (if not already installed)
8. **Go to "API credentials"** tab
9. **Find "Storefront API access token"**
10. **Click "Reveal token"** and copy it

## Alternative: Create Custom App in Regular Admin

If the dev dashboard app isn't working, you can create a custom app directly in regular admin:

1. **Go to Settings → Apps and sales channels**
2. **Scroll to bottom**
3. **Click "Develop apps"** or **"Custom apps"**
4. **Click "Create an app"**
5. **Name it** (e.g., "Website Storefront")
6. **Configure Storefront API scopes**
7. **Install and get token**

## Why This Happened

The app you created in the dev dashboard is a "development app" which shows that placeholder page. You need to:
- Access it through Settings to configure it
- OR create a custom app in regular admin instead

## Quick Fix

**Right now, try this:**

1. Click **"Settings"** (bottom left, gear icon)
2. Click **"Apps and sales channels"**
3. Scroll down to **"Develop apps"** or **"Custom apps"**
4. Find **"Begotten Website"**
5. Click on it
6. Look for **"Storefront API"** or **"API credentials"**

Let me know what you see when you go to Settings → Apps and sales channels!

