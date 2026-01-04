# Create Shopify App - Step by Step

You're in the right place! The Shopify dev dashboard is where you create apps. Follow these steps:

## Step 1: Click "Create app"

1. **Look at the top right** of the page
2. **Click the "Create app" button** (dark button with white text)
3. A popup or new page will appear

## Step 2: Choose How to Create App

You'll see two options:

### Option A: Create app manually (Recommended for your use case)
- Click **"Create app manually"** or **"Create an app"**
- This is simpler and what you need for Storefront API

### Option B: Use Shopify CLI (Skip this)
- This is for developers building full apps
- You don't need this for just getting API credentials

## Step 3: Name Your App

1. **Enter an app name**, for example:
   - "Website Storefront"
   - "Begotten Website"
   - "Storefront API"
2. **Click "Create app"** or **"Create"**

## Step 4: Configure Storefront API

1. **In your new app**, look for tabs or sections:
   - **"API credentials"** tab
   - **"Configuration"** section
   - **"Storefront API"** section

2. **Click on "Configure Storefront API scopes"** or **"Storefront API"**

3. **Enable these scopes** (check the boxes):
   - ✅ `unauthenticated_read_product_listings`
   - ✅ `unauthenticated_read_product_inventory`
   - ✅ `unauthenticated_read_checkouts`
   - ✅ `unauthenticated_write_checkouts`

4. **Click "Save"**

## Step 5: Install the App

1. **Go to the "Overview" tab** or look for **"Install app"** button
2. **Click "Install app"**
3. **Review permissions** and click **"Install"** to confirm

## Step 6: Get Your Credentials

After installing:

1. **Go to "API credentials"** tab or section
2. **Find "Storefront API access token"**
3. **Click "Reveal token"** or **"Show token"**
4. **Copy the token** - you'll need this!
   - ⚠️ **Important**: Save this token - you can only see it once!
   - It will look like: `shpat_abc123xyz789...`

5. **Note your store domain**:
   - Usually: `your-store-name.myshopify.com`
   - You can find this in the URL or in Settings → General

## Step 7: Add to Your Website

1. **Create `.env.local` file**:
   ```bash
   cd /Users/mschepis/Desktop/Begotten
   cp env.template .env.local
   ```

2. **Edit `.env.local`** and add:
   ```
   NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store-name.myshopify.com
   NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-token-here
   ```

3. **Restart dev server**:
   ```bash
   npm run dev
   ```

## What You Should See

After clicking "Create app", you should see:
- App name field
- Tabs like: Overview, API credentials, Configuration
- Storefront API section

## Troubleshooting

### Can't find "Storefront API" section
- Look for "API credentials" tab
- Or "Configuration" → "Storefront API"
- Make sure you've saved the app first

### "Install app" button is grayed out
- Make sure you've configured the API scopes
- Click "Save" on the scopes first

### Token not showing
- Make sure you've installed the app
- Check the "API credentials" tab
- Try refreshing the page

## Next Steps

Once you have the token:
1. ✅ Add it to `.env.local`
2. ✅ Restart your dev server
3. ✅ Products from Shopify should appear on your website!

Let me know when you've created the app and I can help with the next steps!

