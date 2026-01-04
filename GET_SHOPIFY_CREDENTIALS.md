# How to Get Shopify Credentials for Your Website

Follow these steps to get your Shopify Storefront API credentials so your website can display products from Shopify.

## Step 1: Log into Shopify Admin

1. Go to [shopify.com](https://shopify.com) and log in
2. You'll be taken to your Shopify Admin dashboard

## Step 2: Navigate to Apps

1. In the left sidebar, click on **"Apps"**
2. Scroll down to the bottom
3. Click on **"Develop apps"** (or "App and sales channel settings" → "Develop apps")

## Step 3: Create a New App

1. Click the **"Create an app"** button
2. Enter a name for your app (e.g., "Website Storefront" or "Begotten Website")
3. Click **"Create app"**

## Step 4: Configure Storefront API

1. In your new app, click on **"Configure Storefront API scopes"**
2. You'll see a list of API scopes - enable these ones:
   - ✅ `unauthenticated_read_product_listings`
   - ✅ `unauthenticated_read_product_inventory`
   - ✅ `unauthenticated_read_checkouts`
   - ✅ `unauthenticated_write_checkouts`
3. Click **"Save"** at the bottom

## Step 5: Install the App

1. Click on **"Install app"** (or go to the "Overview" tab and click "Install app")
2. Review the permissions and click **"Install"** to confirm

## Step 6: Get Your Credentials

After installing, you'll see:

1. **API credentials** section
2. **Storefront API access token** - This is what you need!
   - Click **"Reveal token"** or **"Show token"**
   - **Copy this token** - you'll need it for your website
   - ⚠️ **Important**: Save this token securely - you can only see it once!

3. **Your store domain** - Usually looks like: `your-store-name.myshopify.com`
   - You can find this in the URL when you're in Shopify admin
   - Or in Settings → General

## Step 7: Add Credentials to Your Website

1. **Create `.env.local` file** in your project root:
   ```bash
   cd /Users/mschepis/Desktop/Begotten
   cp env.template .env.local
   ```

2. **Edit `.env.local`** and add your credentials:
   ```
   NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store-name.myshopify.com
   NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-storefront-access-token-here
   ```

   **Example:**
   ```
   NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=begotten.myshopify.com
   NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=shpat_abc123xyz789...
   ```

3. **Restart your dev server**:
   ```bash
   # Press Ctrl+C to stop, then:
   npm run dev
   ```

4. **Refresh your browser** - Products from Shopify should now appear!

## Troubleshooting

### "Storefront API access token" is not visible
- Make sure you've installed the app (Step 5)
- Check that you've configured the API scopes (Step 4)
- Try refreshing the page

### Products don't appear on website
- Check that `.env.local` file exists and has correct values
- Make sure you restarted the dev server after adding credentials
- Check browser console for errors (F12 → Console tab)
- Verify products exist in your Shopify store

### "Invalid API key" error
- Make sure you copied the **Storefront API access token**, not the Admin API token
- Check that there are no extra spaces in your `.env.local` file
- Verify the store domain is correct (should end with `.myshopify.com`)

## Security Note

- ⚠️ **Never commit `.env.local` to git** - it's already in `.gitignore`
- ⚠️ **Don't share your access token** publicly
- ⚠️ **If token is compromised**, regenerate it in Shopify

## Next Steps

Once credentials are set up:
1. Products from Shopify (via Printify) will appear on your website
2. "Add to Cart" buttons will work (we'll need to implement checkout next)
3. Products will update automatically when you add new ones in Printify

## Need Help?

If you're stuck:
1. Check the browser console for error messages
2. Verify your Shopify store has products published
3. Make sure Printify products are published to Shopify
4. Try the troubleshooting steps above

